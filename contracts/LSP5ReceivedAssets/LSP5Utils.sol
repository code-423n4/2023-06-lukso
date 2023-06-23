// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// interfaces
import {
    IERC725Y
} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

// libraries
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";
import {LSP2Utils} from "../LSP2ERC725YJSONSchema/LSP2Utils.sol";

// constants
import "../LSP5ReceivedAssets/LSP5Constants.sol";
import "../LSP7DigitalAsset/LSP7Constants.sol";

/**
 * @dev reverts when the value stored under the 'LSP5ReceivedAssets[]' data key is not valid.
 *      The value stored under this data key should be exactly 16 bytes long.
 *
 *      Only possible valid values are:
 *      - any valid uint128 values
 *          i.e. 0x00000000000000000000000000000000 (zero), empty array, no assets received.
 *          i.e. 0x00000000000000000000000000000005 (non-zero), 5 array elements, 5 assets received.
 *
 *      - 0x (nothing stored under this data key, equivalent to empty array)
 *
 * @param invalidValueStored the invalid value stored under the LSP5ReceivedAssets[] data key
 * @param invalidValueLength the invalid number of bytes stored under the LSP5ReceivedAssets[] data key (MUST be exactly 16 bytes long)
 */
error InvalidLSP5ReceivedAssetsArrayLength(
    bytes invalidValueStored,
    uint256 invalidValueLength
);

/**
 * @dev reverts when the `LSP5ReceivedAssets[]` array reaches its maximum limit (max(uint128))
 * @param notRegisteredAsset the address of the asset that could not be registered
 */
error MaxLSP5ReceivedAssetsCountReached(address notRegisteredAsset);

/**
 * @dev reverts when the received assets index is superior to uint128
 * @param index the received assets index
 */
error ReceivedAssetsIndexSuperiorToUint128(uint256 index);

/**
 * @title LSP5Utils
 * @author Yamen Merhi <YamenMerhi>, Jean Cavallera <CJ42>
 * @dev LSP5Utils is a library of functions that are used to register and manage assets received by an ERC725Y smart contract
 *      based on the LSP5 - Received Assets standard
 *      https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md
 */
library LSP5Utils {
    /**
     * @dev Generating the data keys/values to be set on the receiver address after receiving assets
     * @param receiver The address receiving the asset and where the Keys should be added
     * @param asset The address of the asset being received
     * @param assetMapKey The map key of the asset being received containing the interfaceId of the
     * asset and the index in the array
     * @param interfaceID The interfaceID of the asset being received
     */
    function generateReceivedAssetKeys(
        address receiver,
        address asset,
        bytes32 assetMapKey,
        bytes4 interfaceID
    ) internal view returns (bytes32[] memory keys, bytes[] memory values) {
        keys = new bytes32[](3);
        values = new bytes[](3);

        IERC725Y account = IERC725Y(receiver);
        bytes memory encodedArrayLength = getLSP5ReceivedAssetsCount(account);

        // CHECK it's either the first asset received,
        // or the storage is already set with a valid `uint128` value
        if (encodedArrayLength.length != 0 && encodedArrayLength.length != 16) {
            revert InvalidLSP5ReceivedAssetsArrayLength({
                invalidValueStored: encodedArrayLength,
                invalidValueLength: encodedArrayLength.length
            });
        }

        uint128 oldArrayLength = uint128(bytes16(encodedArrayLength));

        if (oldArrayLength == type(uint128).max) {
            revert MaxLSP5ReceivedAssetsCountReached({
                notRegisteredAsset: asset
            });
        }

        // store the number of received assets incremented by 1
        keys[0] = _LSP5_RECEIVED_ASSETS_ARRAY_KEY;
        values[0] = bytes.concat(bytes16(oldArrayLength + 1));

        // store the address of the asset under the element key in the array
        keys[1] = LSP2Utils.generateArrayElementKeyAtIndex(
            _LSP5_RECEIVED_ASSETS_ARRAY_KEY,
            oldArrayLength
        );
        values[1] = bytes.concat(bytes20(asset));

        // store the interfaceId and the location in the array of the asset
        // under the LSP5ReceivedAssetMap key
        keys[2] = assetMapKey;
        values[2] = bytes.concat(interfaceID, bytes16(oldArrayLength));
    }

    /**
     * @dev Generating the data keys/values to be set on the sender address after sending assets
     * @param sender The address sending the asset and where the Keys should be updated
     * @param assetMapKey The map key of the asset being received containing the interfaceId of the
     * asset and the index in the array
     * @param assetIndex The index in the LSP5ReceivedAssets[] array
     */
    function generateSentAssetKeys(
        address sender,
        bytes32 assetMapKey,
        uint128 assetIndex
    ) internal view returns (bytes32[] memory keys, bytes[] memory values) {
        IERC725Y account = IERC725Y(sender);
        bytes memory lsp5ReceivedAssetsCountValue = getLSP5ReceivedAssetsCount(
            account
        );

        if (lsp5ReceivedAssetsCountValue.length != 16) {
            revert InvalidLSP5ReceivedAssetsArrayLength({
                invalidValueStored: lsp5ReceivedAssetsCountValue,
                invalidValueLength: lsp5ReceivedAssetsCountValue.length
            });
        }

        uint128 oldArrayLength = uint128(bytes16(lsp5ReceivedAssetsCountValue));

        // Updating the number of the received assets (decrementing by 1
        uint128 newArrayLength = oldArrayLength - 1;

        // Generate the element key in the array of the asset
        bytes32 assetInArrayKey = LSP2Utils.generateArrayElementKeyAtIndex(
            _LSP5_RECEIVED_ASSETS_ARRAY_KEY,
            assetIndex
        );

        // If the asset to remove is the last element in the array
        if (assetIndex == newArrayLength) {
            /**
             * We will be updating/removing 3 keys:
             * - Keys[0]: [Update] The arrayLengthKey to contain the new number of the received assets
             * - Keys[1]: [Remove] The element in arrayKey (Remove the address of the asset sent)
             * - Keys[2]: [Remove] The mapKey (Remove the interfaceId and the index of the asset sent)
             */
            keys = new bytes32[](3);
            values = new bytes[](3);

            // store the number of received assets decremented by 1
            keys[0] = _LSP5_RECEIVED_ASSETS_ARRAY_KEY;
            values[0] = bytes.concat(bytes16(newArrayLength));

            // remove the address of the asset from the element key
            keys[1] = assetInArrayKey;
            values[1] = "";

            // remove the interfaceId and the location in the array of the asset
            keys[2] = assetMapKey;
            values[2] = "";

            // Swapping last element in ArrayKey with the element in ArrayKey to remove || {Swap and pop} method;
            // check https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol#L80
        } else if (assetIndex < newArrayLength) {
            /**
             * We will be updating/removing 5 keys:
             * - Keys[0]: [Update] The arrayLengthKey to contain the new number of the received assets
             * - Keys[1]: [Remove] The mapKey of the asset to remove (Remove the interfaceId and the index of the asset sent)
             * - Keys[2]: [Update] The element in arrayKey to remove (Swap with the address of the last element in Array)
             * - Keys[3]: [Remove] The last element in arrayKey (Remove (pop) the address of the last element as it's already swapped)
             * - Keys[4]: [Update] The mapKey of the last element in array (Update the new index and the interfaceID)
             */
            keys = new bytes32[](5);
            values = new bytes[](5);

            // store the number of received assets decremented by 1
            keys[0] = _LSP5_RECEIVED_ASSETS_ARRAY_KEY;
            values[0] = bytes.concat(bytes16(newArrayLength));

            // remove the interfaceId and the location in the array of the asset
            keys[1] = assetMapKey;
            values[1] = "";

            if (newArrayLength >= type(uint128).max) {
                revert ReceivedAssetsIndexSuperiorToUint128(newArrayLength);
            }

            // Generate all data Keys/values of the last element in Array to swap
            // with data Keys/values of the asset to remove

            // Generate the element key of the last asset in the array
            bytes32 lastAssetInArrayKey = LSP2Utils
                .generateArrayElementKeyAtIndex(
                    _LSP5_RECEIVED_ASSETS_ARRAY_KEY,
                    newArrayLength
                );

            // Get the address of the asset from the element key of the last asset in the array
            bytes20 lastAssetInArrayAddress = bytes20(
                account.getData(lastAssetInArrayKey)
            );

            // Generate the map key of the last asset in the array
            bytes32 lastAssetInArrayMapKey = LSP2Utils.generateMappingKey(
                _LSP5_RECEIVED_ASSETS_MAP_KEY_PREFIX,
                lastAssetInArrayAddress
            );

            // Get the interfaceId and the location in the array of the last asset
            bytes memory lastAssetInterfaceIdAndIndex = account.getData(
                lastAssetInArrayMapKey
            );
            bytes memory interfaceID = BytesLib.slice(
                lastAssetInterfaceIdAndIndex,
                0,
                4
            );

            // Set the address of the last asset instead of the asset to be sent
            // under the element data key in the array
            keys[2] = assetInArrayKey;
            values[2] = bytes.concat(lastAssetInArrayAddress);

            // Remove the address swapped from the last element data key in the array
            keys[3] = lastAssetInArrayKey;
            values[3] = "";

            // Update the index and the interfaceId of the address swapped (last element in the array)
            // to point to the new location in the LSP5ReceivedAssets array
            keys[4] = lastAssetInArrayMapKey;
            values[4] = bytes.concat(interfaceID, bytes16(assetIndex));
        } else {
            // If index is bigger than the array length, out of bounds
            return (keys, values);
        }
    }

    function getLSP5ReceivedAssetsCount(
        IERC725Y account
    ) internal view returns (bytes memory) {
        return account.getData(_LSP5_RECEIVED_ASSETS_ARRAY_KEY);
    }
}
