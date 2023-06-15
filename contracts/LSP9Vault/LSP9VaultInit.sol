// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// modules
import {LSP9VaultInitAbstract} from "./LSP9VaultInitAbstract.sol";

/**
 * @title Deployable Proxy Implementation of LSP9Vault built on top of ERC725, LSP1UniversalReceiver
 * @author Fabian Vogelsteller, Yamen Merhi, Jean Cavallera
 * @dev Could be owned by a UniversalProfile and able to register received asset with UniversalReceiverDelegateVault
 */
contract LSP9VaultInit is LSP9VaultInitAbstract {
    /**
     * @dev initialize (= lock) base implementation contract on deployment
     */
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializing the contract owner to: `newOwner`
     * @dev Sets the owner of the contract and sets the SupportedStandards:LSP9Vault key
     * @param newOwner the owner of the contract
     */
    function initialize(address newOwner) external payable virtual initializer {
        LSP9VaultInitAbstract._initialize(newOwner);
    }
}
