// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// interfaces
import {ILSP7Mintable} from "./ILSP7Mintable.sol";

// modules
import {
    LSP7DigitalAssetInitAbstract
} from "../LSP7DigitalAssetInitAbstract.sol";

/**
 * @dev LSP7 extension, mintable.
 */
abstract contract LSP7MintableInitAbstract is
    LSP7DigitalAssetInitAbstract,
    ILSP7Mintable
{
    function _initialize(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        bool isNonDivisible_
    ) internal virtual override onlyInitializing {
        LSP7DigitalAssetInitAbstract._initialize(
            name_,
            symbol_,
            newOwner_,
            isNonDivisible_
        );
    }

    /**
     * @inheritdoc ILSP7Mintable
     */
    function mint(
        address to,
        uint256 amount,
        bool allowNonLSP1Recipient,
        bytes memory data
    ) public virtual onlyOwner {
        _mint(to, amount, allowNonLSP1Recipient, data);
    }
}
