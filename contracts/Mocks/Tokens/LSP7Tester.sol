// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {LSP7DigitalAsset} from "../../LSP7DigitalAsset/LSP7DigitalAsset.sol";
import {LSP7Burnable} from "../../LSP7DigitalAsset/extensions/LSP7Burnable.sol";

contract LSP7Tester is LSP7DigitalAsset, LSP7Burnable {
    constructor(
        string memory name,
        string memory symbol,
        address newOwner
    ) LSP7DigitalAsset(name, symbol, newOwner, false) {}

    function mint(
        address to,
        uint256 amount,
        bool allowNonLSP1Recipient,
        bytes memory data
    ) public {
        _mint(to, amount, allowNonLSP1Recipient, data);
    }
}
