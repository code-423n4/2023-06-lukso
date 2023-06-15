// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// interfaces
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

// constants
import {_INTERFACEID_LSP1} from "../../LSP1UniversalReceiver/LSP1Constants.sol";

contract TokenReceiverWithoutLSP1WithERC721ReceivedRevert is ERC721Holder {
    event UniversalReceiverCalled(bytes32 typeId, bytes data);

    receive() external payable {}

    fallback() external payable {}

    function onERC721Received(
        address /* operator */,
        address /* from */,
        uint256 /* tokenId */,
        bytes memory /* data */
    ) public pure override returns (bytes4) {
        revert("TokenReceiverWithLSP1WithERC721ReceivedRevert: transfer rejected");
    }
}
