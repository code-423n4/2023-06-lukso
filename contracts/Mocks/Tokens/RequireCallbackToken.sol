// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "../FallbackExtensions/OnERC721ReceivedExtension.sol";

/**
 * @dev This contract is used only for testing purposes
 */
contract RequireCallbackToken {
    event Minted();

    function mint(address to) public {
        // random arguments for onERC721Received
        require(
            bytes4(0x150b7a02) ==
                OnERC721ReceivedExtension(to).onERC721Received(
                    msg.sender,
                    msg.sender,
                    2,
                    "0xaabbccdd"
                ),
            "onERC721Received function not implemented"
        );
        emit Minted();
    }
}
