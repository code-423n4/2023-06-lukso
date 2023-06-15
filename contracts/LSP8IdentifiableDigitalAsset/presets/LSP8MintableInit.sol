// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// modules
import {LSP8MintableInitAbstract} from "./LSP8MintableInitAbstract.sol";

/**
 * @dev LSP8 extension.
 */
contract LSP8MintableInit is LSP8MintableInitAbstract {
    /**
     * @dev initialize (= lock) base implementation contract on deployment
     */
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Sets the token-Metadata and register LSP8InterfaceId
     * @param name_ The name of the token
     * @param symbol_ The symbol of the token
     * @param newOwner_ The owner of the the token-Metadata
     */
    function initialize(
        string memory name_,
        string memory symbol_,
        address newOwner_
    ) external virtual initializer {
        LSP8MintableInitAbstract._initialize(name_, symbol_, newOwner_);
    }
}
