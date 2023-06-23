// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// interfaces
import {
    ILSP1UniversalReceiver
} from "../../LSP1UniversalReceiver/ILSP1UniversalReceiver.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {_INTERFACEID_LSP1} from "../../LSP1UniversalReceiver/LSP1Constants.sol";

/**
 * @dev This contract is used only for testing purposes
 */
contract UniversalReceiverDelegateRevert is ERC165, ILSP1UniversalReceiver {
    /**
     * @inheritdoc ILSP1UniversalReceiver
     * @dev Allows to register arrayKeys and Map of incoming vaults and assets and removing them after being sent
     * @return result the return value of keyManager's execute function
     */
    function universalReceiver(
        bytes32 /* typeId */,
        bytes memory /* data */
    ) public payable virtual returns (bytes memory) {
        revert("I Revert");
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == _INTERFACEID_LSP1 ||
            super.supportsInterface(interfaceId);
    }
}
