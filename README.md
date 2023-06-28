[![Twitter](https://img.shields.io/twitter/follow/lukso_io)](https://twitter.com/lukso_io)
[![Discord](https://img.shields.io/badge/Discord-7289da?logo=discord)](https://discord.com/invite/lukso)
[![Contracts](https://img.shields.io/badge/Smart-Contracts-555?logo=solidity)](https://github.com/lukso-network/lsp-smart-contracts/tree/v0.10.2)
[![LIPs](https://img.shields.io/badge/LIPs-555?logo=github)](https://github.com/lukso-network/LIPs)
[![Docs](https://img.shields.io/badge/Docs-007500?logo=readthedocs)](https://docs.lukso.tech)

# Table of Content

- [LUKSO audit details](#lukso-audit-details)
- [Automated Findings](#automated-findings)
- [Overview](#overview)
  - [LSP0ERC725Account](#lsp0erc725account)
  - [LSP1UniversalReceiver](#lsp1universalreceiver)
  - [LSP1UniversalReceiverDelegate](#lsp1universalreceiverdelegate)
  - [LSP6KeyManager](#lsp6keymanager)
  - [Tokens](#tokens)
    - [LSP4DigitalAssetMetadata](#lsp4digitalassetmetadata)
    - [LSP7DigitalAsset](#lsp7digitalasset)
    - [LSP8IdentifiableDigitalAsset](#lsp8identifiabledigitalasset)
  - [LSP14Ownable2Step](#lsp14ownable2step)
  - [LSP17ContractExtension](#lsp17contractextension)
  - [LSP20CallVerification](#lsp20callverification)
- [Scope](#scope)
  - [Summary](#summary)
  - [Contracts in scope](#contracts-in-scope)
  - [Out of scope](#out-of-scope)
- [Additional Context](#additional-context)
  - [`LSP7CompatibleERC20` and `LSP8CompatibleERC721`](#lsp7compatibleerc20-and-lsp8compatibleerc721)
  - [Scoping Details](#scoping-details)
- [Instructions](#instructions)
  - [Setup](#setup)
  - [Build](#build)
  - [Hardhat Tests](#hardhat-tests)
  - [Gas benchmark](#gas-benchmark)
  - [Foundry Tests](#foundry-tests)
  - [Code Coverage](#code-coverage)
  - [Contract Size](#contract-size)
  - [Deployment](#deployment)
- [Publicly Known Issues](#publicly-known-issues)
  - [Previous audits](#previous-audits)
  - [General](#general)
  - [`LSP0ERC725Account.sol`](#lsp0erc725accountsol)
  - [`LSP1UniversalReceiverDelegateUP.sol`](#lsp1universalreceiverdelegateupsol)
  - [`LSP6KeyManager.sol`](#lsp6keymanagersol)
  - [`LSP7DigitalAsset.sol`](#lsp7digitalassetsol)
  - [`LSP7CompatibleERC20.sol` and `LSP7CompatibleERC20InitAbstract.sol`](#lsp7compatibleerc20sol-and-lsp7compatibleerc20initabstractsol)
  - [`LSP8IdentifiableDigitalAsset.sol`](#lsp8identifiabledigitalassetsol)
  - [`LSP14Ownable2Step.sol`](#lsp14ownable2stepsol)
  - [`LSP17Extendable.sol`](#lsp17extendablesol)
  - [`LSP20CallVerification.sol`](#lsp20callverificationsol)
- [Slither Known Issues](#slither-known-issues)

# LUKSO audit details

- Total Prize Pool: $100,000 USDC
  - HM awards: $70,000 USDC
  - Analysis awards: $4,250 USDC
  - QA awards: $2,000 USDC
  - Bot Race awards: $6,250 USDC
  - Gas awards: $2,000 USDC
  - Judge awards: $9,000 USDC
  - Lookout awards: $6,000 USDC
  - Scout awards: $500 USDC
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2023-06-lukso/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts June 20, 2023 20:00 UTC
- Ends July 05, 2023 20:00 UTC

# Automated Findings

Automated findings output for the audit can be found within 24 hours of audit opening.

# Overview

![Universal Profile architecture overview](https://docs.lukso.tech/assets/images/universal-profile-architecture-335f9157e3ab222ff460c5816b2b90d3.jpeg)

## LSP0ERC725Account

_[LSP0ERC725Account]_ is an advanced smart contract-based account that offers a comprehensive range of essential features. It is composed of multiple and standards and modules:

- a generic data storage ([ERC725Y](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store))
- a generic execution medium ([ERC725X](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725x---generic-executor))
- signature validation via [ERC1271](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc1271)
- a universal function to be notified about different actions ([LSP1](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#lsp1---universalreceiver) `universalReceiver(bytes32,bytes)`), such as token transfers, followers, information, etc...
- it offers extensibility via [LSP17](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#lsp17---contract-extension) where you can add functions to the account as extensions after deployment to support new standards and functions
- it provides a full secure ownership control as a 2 step process (1st step for initiation, 2nd step for confirmation) using [LSP14](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#lsp14---ownable2step).
- finally, it allows to execute directly through the contract itself instead of resolving through the owner first using the [LSP20 standard](https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#lsp20---call-verification).

## LSP1UniversalReceiver

_[LSP1UniversalReceiver]_ is designed to facilitate a universally standardized way of receiving notifications about various actions, such as token transfers, new followers, or updated information. The core function of this standard, named `universalReceiver(..)`, operates as a common notification gateway. It standardizes the process of emitting data received, making the contract implementing the LSP1 standard the gateway of knowing various information, such which tokens or followers you own. LSP1UniversalReceiver standardizes as well an optional process of reacting to the action being notified about using the LSP1UniversalReceiverDelegate.

## LSP1UniversalReceiverDelegate

_[LSP1UniversalReceiverDelegate]_ standard formalize the procedure of reacting to specific actions. This standard is typically implemented once the `universalReceiver(..)` function is invoked.

The `universalReceiver(..)` function is called with a unique `bytes32 typeId` identifier. Subsequently, the `universalReceiver(...)` function forwards the call, along with the sender's address and the value sent, to the UniversalReceiverDelegate. The UniversalReceiverDelegate, in its role, identifies the `bytes32` as a specific action and performs a designated response. For instance, if a token transfer is recognized (represented by a unique `bytes32 typeId` like [`LSP7Tokens_RecipientNotification`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md#transfer)), the UniversalReceiverDelegate could contain logic that triggers a specific response such as reverting the entire transaction.

The UniversalReceiverDelegate address can be changed in the contract implementing the `universalReceiver(..)` function. Also there could be the case where multiple UniversalReceiverDelegates exist.

## LSP6KeyManager

_[LSP6KeyManager]_ is a smart contract that acts as a controller for another contract it is linked to (a smart contract based account, a token contract, etc...). It enables the linked contract to be controlled by multiple addresses. Such addresses called _"controllers"_ can be granted different permissions defined by the LSP6 standard that allow them to perform different type of actions, including setting data on the ERC725Y storage of the linked account, or using the linked account to interact with other addresses on the network (transferring LYX, interact with tokens or any other smart contracts, etc...). LSP6 enables meta transactions in its interface via the `executeRelayCall(...)` function, where any executor address can dispatch transactions signed by an other controller, and pay the gas fees on behalf of this controller. Finally, the LSP6KeyManager also allows batching transactions via both `executeBatch(...)` and `executeRelayCallBatch(...)`

## Tokens

The new token standards on LUKSO share the following similarities:

- flexible data key value store via LSP4
- similar interface for the `transfer(...)` function (only difference is the 3rd parameter where LSP7 takes a `uint256 amount` while LSP8 takes a `bytes32 tokenId`).
- notify the receiver of the token via LSP1, using the 4th parameter `bool allowNonLSP1Recipient` in the `transfer(...)` function.

![LSP4, LSP7 and LSP8 Diagram](https://docs.lukso.tech/assets/images/LUKSO-Tokens-NFT-Standards-e9dfdf720f0c776ef4d33a515ffdeaf8.jpeg)

### LSP4DigitalAssetMetadata

_[LSP4DigitalAssetMetadata]_ is a metadata standard that defines metadata keys to store information related to a digital asset inside its ERC725Y storage, including the token name (`LSP4TokenName`) and its symbol (`LSP4TokenSymbol`). It also defines a standard JSON structure that can contain information describing the asset. Such standard information include a description of the asset, an icon for the digital asset, links to find out more (e.g: website, ...), or any additional custom attributes. Finally, it defines a metadata key that can contain the list of creator addresses for this asset (`LSP4Creators[]`).

### LSP7DigitalAsset

_[LSP7DigitalAsset]_ is a standard that defines a fungible token, meaning tokens that are mutually interchangeable (one token has the same value as another token). Like ERC20, tokens can be transferred in quantities, where a token holder can transfer multiple tokens by specifying an `uint256 amount` when using the `transfer(...)` function. By default, LSP7 Digital Assets are divisible like fiat currencies, where 1 token can be divided in smaller units (e.g: 1/10th of a token), with their `decimals()` set to 18 by default. However, LSP7 includes a feature that enables to make the token non divisible via the `isNonDivisible` parameter on deployment.

### LSP8IdentifiableDigitalAsset

_[LSP8IdentifiableDigitalAsset]_ is a standard that defines a non fungible token, meaning tokens that are unique and distinguishable from each other (one token cannot be replaced by another token). Each tokens are uniquely represented by their `bytes32 tokenId`, and can be transfered via the `transfer(...)` function, where the given as a parameter to the `transfer(...)` function.

LSP8 includes a feature that enables to define different types of tokens IDs via the `LSP8TokenIdType` metadata key. Token ID type varies from simple to complex, for instance:

- the token Ids can be represented by an address that represent an ERC725Y smart contract that can holds metadata in its storage for this specific NFT (`LSP8TokenIdType == 1`).
- the token Ids can be represented by a number that increment on each newly minted NFT (`LSP8TokenIdType == 2`).
- the token Ids can be represented as `string` for unique NFT names (`LSP8TokenIdType == 5`).

## LSP14Ownable2Step

_[LSP14Ownable2Step]_ is an advanced ownership module designed to enable contracts to have a clear ownership structure. It introduces a crucial feature of two-step processes for both ownership transfer and renouncement, which significantly reduces the likelihood of accidental or unauthorized changes to the contract's ownership. This enhanced security mechanism ensures that ownership actions require deliberate and careful confirmation, minimizing the risk of unintended transfers or renouncements. Using a two-step process where the new owner has to accept ownership ensures that the contract is always owned by an address that has control over it since the new owner explicitly accepts ownership, proving that it has control over its address.

## LSP17ContractExtension

_[LSP17ContractExtension]_ is designed to extend a contract's functionality post-deployment. Once a contract with a set of functions is deployed on the blockchain, it becomes immutable, meaning that no additional functions can be added after deployment.

The LSP17ContractExtension standard provides a solution to this limitation. It does this by forwarding the call to an extension contract through the `fallback` function, instead of leading to a revert due to the invocation of an undefined function. This forwarding mechanism allows the contract to be extended and to add functionality after it has been deployed. The standard could be beneficial for contract that should support standards and functions that get standardized and discussed in the future.

## LSP20CallVerification

_[LSP20CallVerification]_ is an innovative module designed to simplify access control rules verification within smart contracts. By implementing a standardized approach, this module enables seamless validation of whether an address possesses the necessary permissions to initiate a specific call.

![LSP20 Diagram](https://docs.lukso.tech/assets/images/LSP20-example-LSP6-2af355425a5873f9474cf4329ce859a7.jpeg)

# Scope

Here are some examples of issues that we are mostly concerned about:

- Ownership bypassing.
- Executing without the right permission. (bypassing permissions)
- Permissions overlap. (meaning if i have permission X and added permission Y, i can execute an action only allowed by permission Z)
- Locking the account due to a certain chain of actions.
- Reentrancy without the right permissions. (bypassing permissions)
- `LSP1UniversalReceiverDelegateUP` will be set as a default UniversalReceiverDelegate for the UniversalProfiles deployed by the LUKSO foundation, is there a potential risk to deploy just 1 UniverrsalReceiverDelegate contract and grant it `SUPER_SETDATA` and `REENTRANCY` permission on all of these UniversalProfiles?

## Summary

| Scope                         | lines of code | 📄 Standard Specifications        | 📚 Documentation                                          |
| ----------------------------- | :------------ | --------------------------------- | --------------------------------------------------------- |
| ERC725                        | 503           | [ERC-725]                         | [ERC725]                                                  |
| LSP0ERC725Account             | 532           | [LSP-0-ERC725Account]             | [LSP0ERC725Account]                                       |
| UniversalProfile              | 47            | [LSP-3-UniversalProfile-Metadata] | [UniversalProfile]                                        |
| LSP1UniversalReceiverDelegate | 252           | [LSP-1-UniversalReceiver]         | [LSP1UniversalReceiver] & [LSP1UniversalReceiverDelegate] |
| LSP4DigitalAssetMetadata      | 116           | [LSP-4-DigitalAsset-Metadata]     | [LSP4DigitalAssetMetadata]                                |
| LSP6KeyManager                | 1439          | [LSP-6-KeyManager]                | [LSP6KeyManager]                                          |
| LSP7DigitalAsset              | 860           | [LSP-7-DigitalAsset]              | [LSP7DigitalAsset]                                        |
| LSP8IdentifiableDigitalAsset  | 1233          | [LSP-8-IdentifiableDigitalAsset]  | [LSP8IdentifiableDigitalAsset]                            |
| LSP14Ownable2Step             | 119           | [LSP-14-Ownable2Step]             | [LSP14Ownable2Step]                                       |
| LSP17ContractExtension        | 103           | [LSP-17-ContractExtension]        | [LSP17ContractExtension]                                  |
| LSP20CallVerification         | 81            | [LSP-20-CallVerification]         | [LSP20CallVerification]                                   |
| LSP2Utils                     | 51            | [LSP-2-ERC725YJSONSchema]         | [LSP2ERC725YJSONSchema]                                   |
| LSP5Utils                     | 126           | [LSP-4-DigitalAsset-Metadata]     | [LSP5ReceivedVaults]                                      |
| LSP10Utils                    | 116           | [LSP-10-ReceivedVaults]           | [LSP10ReceivedVaults]                                     |
| SUM                           | 5578          |                                   |                                                           |

---

## Contracts in scope

This is the complete list of the contracts in scope for this contest.

There are 3 type of contracts per LSP standard:

- **`Core` contracts**: contain the core implementation logic of the LSP standard.

_Example: `LSP7DigitalAssetCore.sol` contains the core logic of the LSP7 standard_.

- **Standard contracts**: standard version of the LSP standard, deployable via `constructor(...)`. They are written with the same name as the standard.

_Example: `LSP0ERC725Account.sol`_.

- **`Init` contracts**: proxy version of the LSP standard, to be used as base contracts behind proxies. Should be initialized via the public `initialize(...)` function.

_Example: `LSP0ERC725AccountInit.sol`_

- **`InitAbstract` contracts**: same as `Init` but without a public `initialize(...)` function. To be inherited for customization.

_Example: `LSP6KeyManagerInitAbstract.sol`_

> **Note:** the separation between `Core`, `Init` and `InitAbstract` does not apply to LSP14, LSP17 and LSP20.

| Contract                                              | SLOC | Purpose                                                                                                                                                                                              | Libraries used                                                                                                                                                                                                |
| ----------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ERC725**                                            |      | **These set of contracts are available as a dependency in the `node_modules/` folder, as `@erc725/smart-contracts`.**                                                                                |                                                                                                                                                                                                               |
| [`ERC725XCore.sol`]                                   | 194  | Core implementation logic of the ERC725X sub-standard, a generic executor contract.                                                                                                                  | `@openzeppelin/contracts`: \[[`Create2.sol`], [`Address.sol`]\], `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                     |
| [`ERC725YCore.sol`]                                   | 71   | Core implementation logic of the ERC725Y sub-standard, a generic data key-value store that uses a mapping of `bytes32` data keys mapped to their `bytes` value.                                      |                                                                                                                                                                                                               |
| [`OwnableUnset.sol`]                                  | 35   | Modified version of `Ownable` contract with an internal `_setOwner(address)` function that prevents setting the owner twice when both `ERC725X` and `ERC725Y` are inherited (_e.g: in `ERC725.sol`_) |                                                                                                                                                                                                               |
| [`ERC725InitAbstract.sol`]                            | 30   | Abstract proxy version without a public `initialize(...)` function, that bundles ERC725X and ERC725Y together into one smart contract.                                                               |                                                                                                                                                                                                               |
| [`IERC725X.sol`]                                      | 28   | Interface that describe the standard functions and events defined in the ERC725X sub-standard.                                                                                                       |                                                                                                                                                                                                               |
| [`ERC725.sol`]                                        | 23   | Standard version that bundles ERC725X and ERC725Y together into one smart contract.                                                                                                                  |                                                                                                                                                                                                               |
| [`IERC725Y.sol`]                                      | 16   | Interface that describe the standard functions and events defined in the ERC725Y sub-standard.                                                                                                       |                                                                                                                                                                                                               |
| [`ERC725XInitAbstract.sol`]                           | 15   | Abstract Proxy version of the ERC725X sub-standard without a public `initialize(...)` function.                                                                                                      |                                                                                                                                                                                                               |
| [`ERC725YInitAbstract.sol`]                           | 15   | Abstract Proxy version of the ERC725Y sub-standard without a public `initialize(...)` function.                                                                                                      |                                                                                                                                                                                                               |
| [`ERC725Y.sol`]                                       | 13   | Standard version of the ERC725Y sub-standard.                                                                                                                                                        |                                                                                                                                                                                                               |
| [`errors.sol`]                                        | 13   | List of custom errors related to the internal logic of `ERC725XCore.sol` and `ERC725YCore.sol`.                                                                                                      |                                                                                                                                                                                                               |
| [`ERC725X.sol`]                                       | 12   | Standard version of the ERC725X sub-standard.                                                                                                                                                        |                                                                                                                                                                                                               |
| [`ERC725Init.sol`]                                    | 10   | Proxy version that bundles ERC725X and ERC725Y together into one smart contract.                                                                                                                     |                                                                                                                                                                                                               |
| [`ERC725XInit.sol`]                                   | 10   | Proxy version of the ERC725X sub-standard.                                                                                                                                                           |                                                                                                                                                                                                               |
| [`ERC725YInit.sol`]                                   | 10   | Proxy version of the ERC725Y sub-standard.                                                                                                                                                           |                                                                                                                                                                                                               |
| [`constants.sol`]                                     | 8    | ERC165 interface IDs for ERC725X and ERC725Y + list of operation types defined in the ERC725X sub-standard.                                                                                          |                                                                                                                                                                                                               |
| **LSP0ERC725Account**                                 |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP0ERC725AccountCore.sol`]                         | 434  | Core implementation of the LSP0 standard, a smart contract based account.                                                                                                                            | `@openzeppelin/contracts`: \[[`ECDSA.sol`], [`ERC165Checker.sol`], [`Address.sol`]\] `@erc725/smart-contracts/`: \[[`ERC725YCore.sol`], [`ERC725XCore.sol`], [`OwnableUnset.sol`], [`ERC725.constants.sol`]\] |
| [`LSP0Utils.sol`]                                     | 23   | Utility functions to query metadata keys from the ERC725Y storage of an LSP0ERC725Account.                                                                                                           |                                                                                                                                                                                                               |
| [`LSP0ERC725AccountInitAbstract.sol`]                 | 21   | Abstract Proxy version of the LSP0 standard without a public `initialize(...)` function.                                                                                                             | `@openzeppelin/contracts-upgradeable`: [`Initializable.sol`]                                                                                                                                                  |
| [`ILSP0ERC725Account.sol`]                            | 19   | Interface that describes the standard functions and events defined in the LSP0 standard.                                                                                                             |                                                                                                                                                                                                               |
| [`LSP0ERC725Account.sol`]                             | 13   | Standard version of the LSP0 standard.                                                                                                                                                               |                                                                                                                                                                                                               |
| [`LSP0ERC725AccountInit.sol`]                         | 14   | Proxy version of the LSP0 standard.                                                                                                                                                                  |                                                                                                                                                                                                               |
| [`LSP0Constants.sol`]                                 | 8    | Contains the standard ERC725Y metadata keys and LSP1 type IDs defined in the LSP0 Standard as well as `bytes4` ERC165 interface ID.                                                                  |                                                                                                                                                                                                               |
| **UniversalProfile**                                  |      | **These 3 x contracts are implementations of LSP0 + set the metadata keys defined in the LSP3 standard on deployment/initialization.**                                                               |                                                                                                                                                                                                               |
| [`UniversalProfileInitAbstract.sol`]                  | 21   | Abstract Proxy version without a public `initialize(...)` function.                                                                                                                                  |                                                                                                                                                                                                               |
| [`UniversalProfile.sol`]                              | 14   | Standard version.                                                                                                                                                                                    |                                                                                                                                                                                                               |
| [`UniversalProfileInit.sol`]                          | 12   | Proxy version.                                                                                                                                                                                       |                                                                                                                                                                                                               |
| **LSP1UniversalReceiverDelegate**                     |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP1UniversalReceiverDelegateUP.sol`]               | 131  | Core implementation of the optional extension of LSP1 Universal Receiver Delegate to be used for a Universal Profile.                                                                                | `@openzeppelin/contracts/`: \[[`ERC165.sol`], [`ERC165Checker.sol`]\]                                                                                                                                         |
| [`LSP1Utils.sol`]                                     | 99   | Library of utility functions to interact with contracts that implement the LSP1 interface.                                                                                                           | `@openzeppelin/contracts/`: \[[`Address.sol`], [`ERC165Checker.sol`]\]                                                                                                                                        |
| [`ILSP1UniversalReceiver.sol`]                        | 14   | Interface that describe the standard function defined in the LSP1 standard.                                                                                                                          |                                                                                                                                                                                                               |
| [`LSP1Constants.sol`]                                 | 4    | Contains the standard ERC725Y metadata keys defined in the LSP1 Universal Receiver standard, as well as its ERC165 interface ID.                                                                     |                                                                                                                                                                                                               |
| [`LSP1Errors.sol`]                                    | 4    | Custom errors related to the internal logic of `LSP1UniversalReceiverDelegateUP.sol`.                                                                                                                |                                                                                                                                                                                                               |
| **LSP4DigitalAssetMetadata**                          |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP4DigitalAssetMetadataInitAbstract.sol`]          | 43   | Abstract Proxy version of the LSP4 standard, without a public `initialize(...)` function.                                                                                                            |                                                                                                                                                                                                               |
| [`LSP4DigitalAssetMetadata.sol`]                      | 40   | Standard version of LSP4 standard.                                                                                                                                                                   | `@erc725/smart-contracts`: [`ERC725Y.sol`], `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                          |
| [`LSP4Compatibility.sol`]                             | 14   | Contains backward compatible getters from ERC721Metadata that query the LSP4 metadata keys from the ERC725Y storage.                                                                                 | `@erc725/smart-contracts`: [`ERC725YCore.sol`]                                                                                                                                                                |
| [`LSP4Constants.sol`]                                 | 8    | Contains the standard ERC725Y metadata keys defined in the LSP4 Digital Asset Metadata standard.                                                                                                     |                                                                                                                                                                                                               |
| [`ILSP4Compatibility.sol`]                            | 8    | Interface for `name()` and `symbol()`.                                                                                                                                                               |                                                                                                                                                                                                               |
| [`LSP4Errors.sol`]                                    | 3    | Custom errors related to the internal logic of `LSP4DigitalAssetMetadata.sol` and `LSP4DigitalAssetMetadataInitAbstract.sol`.                                                                        |                                                                                                                                                                                                               |
| **LSP6KeyManager**                                    |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP6SetDataModule.sol`]                             | 447  | Logic used for verifying `ERC725Y.setData()` & `ERC725Y.setDataBatch()` permissions.                                                                                                                 | `@erc725/smart-contracts`: [`ERC725Y.sol`]                                                                                                                                                                    |
| [`LSP6KeyManagerCore.sol`]                            | 401  | Core implementation of the LSP6 standard, a smart contract that acts as a controller for an an ERC725 account.                                                                                       | `@openzeppelin/contracts`: \[[`ERC165.sol`], [`ECDSA.sol`], [`Address.sol`]\]                                                                                                                                 |
| [`LSP6ExecuteModule.sol`]                             | 273  | Logic used for verifying `ERC725X.execute()` & `ERC725X.executeBatch()` permissions.                                                                                                                 | `@erc725/smart-contracts`: [`ERC725Y.sol`], `solidity-bytes-utils`: [`BytesLib.sol`], `@openzeppelin/contracts/`: [`ERC165Checker.sol`]                                                                       |
| [`LSP6Utils.sol`]                                     | 160  | Library of utility functions to read, write and handle permissions for controllers.                                                                                                                  |                                                                                                                                                                                                               |
| [`LSP6Constants.sol`]                                 | 36   | Contains the standard ERC725Y metadata keys and permissions defined in the LSP6 Key Manager standard, as well as its ERC165 interface ID.                                                            |                                                                                                                                                                                                               |
| [`ILSP6KeyManager.sol`]                               | 36   | Interface that describes the standard functions and events defined in the LSP6 Key Manager standard.                                                                                                 |                                                                                                                                                                                                               |
| [`LSP6Errors.sol`]                                    | 28   | Custom errors related to the internal logic of `LSP6KeyManagerCore` and the modules in the `contracts/LSP6KeyManager/LSP6Modules/*.sol` folder`.                                                     |                                                                                                                                                                                                               |
| [`LSP6OwnershipModule.sol`]                           | 22   | Logic used for verifying `ERC725.acceptOwnership()` & `ERC725.transferOwnership()` permissions.                                                                                                      |                                                                                                                                                                                                               |
| [`LSP6KeyManagerInitAbstract.sol`]                    | 16   | Abstract Proxy version of the LSP6 standard, without a public `initialize(...)` function.                                                                                                            | `@openzeppelin/contracts-upgradeable`: [`Initializable.sol`]                                                                                                                                                  |
| [`LSP6KeyManager.sol`]                                | 10   | Standard version of LSP6 standard.                                                                                                                                                                   | Same as `LSP6KeyManagerCore.sol`                                                                                                                                                                              |
| [`LSP6KeyManagerInit.sol`]                            | 10   | Proxy version of the LSP6 standard.                                                                                                                                                                  | Same as `LSP6KeyManagerCore.sol` + `LSP6KeyManagerInitAbstract.sol`                                                                                                                                           |
| **LSP7DigitalAsset**                                  |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP7DigitalAssetCore.sol`]                          | 277  | Core implementation of the LSP7 standard, a smart contract that represents a fungible token.                                                                                                         | `@openzeppelin/contracts`: [`ERC165Checker.sol`]                                                                                                                                                              |
| [`LSP7CompatibleERC20InitAbstract.sol`]               | 113  | Extension (Abstract Proxy version without a public `initialize(...)` function) - of the `ILSP7CompatibleERC20` interface.                                                                            |                                                                                                                                                                                                               |
| [`LSP7CompatibleERC20.sol`]                           | 102  | Extension (Standard version) - of the `ILSP7CompatibleERC20` interface.                                                                                                                              |                                                                                                                                                                                                               |
| [`ILSP7DigitalAsset.sol`]                             | 44   | Interface that describes the standard functions and events defined in the LSP7 Digital Asset standard.                                                                                               |                                                                                                                                                                                                               |
| [`LSP7DigitalAssetInitAbstract.sol`]                  | 33   | Abstract Proxy version of the LSP7 standard, without a public `initialize(...)` function.                                                                                                            | `@erc725/smart-contracts`: [`ERC725YCore.sol`]                                                                                                                                                                |
| [`LSP7CappedSupply.sol`]                              | 27   | Extension (Standard version) - to define a maximum total supply of tokens.                                                                                                                           |                                                                                                                                                                                                               |
| [`LSP7CappedSupplyInitAbstract.sol`]                  | 31   | Extension (Abstract proxy version) - to define a maximum total supply of tokens.                                                                                                                     |                                                                                                                                                                                                               |
| [`LSP7DigitalAsset.sol`]                              | 28   | Standard version of the LSP7 standard.                                                                                                                                                               | `@erc725/smart-contracts`: [`ERC725YCore.sol`]                                                                                                                                                                |
| [`LSP7MintableInitAbstract.sol`]                      | 31   | Preset deployable contract (Abstract proxy version without a public `initialize(...)` function) - same as `LSP7Mintable.sol`.                                                                        |                                                                                                                                                                                                               |
| [`LSP7CompatibleERC20MintableInitAbstract.sol`]       | 23   | Preset deployable contract (Abstract Proxy version without a public `initialize(...)` function) - same as `LSP7Mintable.sol`.                                                                        |                                                                                                                                                                                                               |
| [`LSP7Mintable.sol`]                                  | 19   | Preset deployable contract (Standard version) - contains a public `mint(...)` only callable by the owner.                                                                                            |                                                                                                                                                                                                               |
| [`LSP7CompatibleERC20Mintable.sol`]                   | 17   | Preset deployable contract (Standard version) - same as `LSP7CompatibleERC20.sol` with a public `mint(...)` function only callable by the owner.                                                     |                                                                                                                                                                                                               |
| [`LSP7Errors.sol`]                                    | 22   | Custom errors related to the internal logic of `LSP7DigitalAssetCore.sol`.                                                                                                                           |                                                                                                                                                                                                               |
| [`LSP7CompatibleERC20MintableInit.sol`]               | 16   | Preset deployable contract (Abstract Proxy version without a public `initialize(...)` function) - same as `LSP7CompatibleERC20Mintable.sol`                                                          |                                                                                                                                                                                                               |
| [`LSP7MintableInit.sol`]                              | 20   | Preset deployable contract (Proxy version) - same as `LSP7Mintable.sol`                                                                                                                              |                                                                                                                                                                                                               |
| [`ILSP7CompatibleERC20.sol`]                          | 21   | Interface to enable backward compatibility between LSP7 and the functions from the ERC20 standard.                                                                                                   |                                                                                                                                                                                                               |
| [`ILSP7Mintable.sol`]                                 | 10   | Interface for a public `mint(...)` function for a LSP7 fungible token.                                                                                                                               |                                                                                                                                                                                                               |
| [`LSP7Burnable.sol`]                                  | 7    | Standard extension that implements a public `burn(...)` function to burn a specified `amount` of tokens.                                                                                             |                                                                                                                                                                                                               |
| [`LSP7BurnableInitAbstract.sol`]                      | 9    | Abstract Proxy extension that implements a public `burn(...)` function to burn a specified `amount` of tokens.                                                                                       |                                                                                                                                                                                                               |
| [`LSP7Constants.sol`]                                 | 4    | Contains the standard LSP1 type IDs defined in the LSP7 Digital Asset standard, as well as its ERC165 interface ID.                                                                                  |                                                                                                                                                                                                               |
| **LSP8IdentifiableDigitalAsset**                      |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP8IdentifiableDigitalAssetCore.sol`]              | 295  | Core implementation of the LSP8 standard, a smart contract that represents a non-fungible token.                                                                                                     | `@openzeppelin/contracts`: \[[`EnumerableSet.sol`], [`ERC165Checker.sol`]\]                                                                                                                                   |
| [`LSP8CompatibleERC721InitAbstract.sol`]              | 241  | Extension (Abstract Proxy version) - of the `ILSP8CompatibleERC721` interface, without a public `initialize(...)` function.                                                                          | `@openzeppelin/contracts`: [`EnumerableSet.sol`], `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                    |
| [`LSP8CompatibleERC721.sol`]                          | 231  | Extension (Standard version) - of the `ILSP8CompatibleERC721` interface.                                                                                                                             | `@openzeppelin/contracts`: [`EnumerableSet.sol`], `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                    |
| [`ILSP8IdentifiableDigitalAsset.sol`]                 | 54   | Interface that describes the standard functions and events defined in the LSP8 Identifiable Digital Asset standard.                                                                                  |                                                                                                                                                                                                               |
| [`LSP8EnumerableInitAbstract.sol`]                    | 34   | Extension (Abstract proxy version) - to enable enumerating over the list of tokenIds.                                                                                                                |                                                                                                                                                                                                               |
| [`LSP8Enumerable.sol`]                                | 36   | Extension (Standard version) - to enable enumerating over the list of tokenIds.                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP8CappedSupplyInitAbstract.sol`]                  | 33   | Extension (Abstract proxy version without a public `initialize(...)` function) - to define a maximum total supply of tokens.                                                                         |                                                                                                                                                                                                               |
| [`LSP8CappedSupply.sol`]                              | 29   | Extension (Standard version) - to define a maximum total supply of tokens.                                                                                                                           |                                                                                                                                                                                                               |
| [`LSP8IdentifiableDigitalAssetInitAbstract.sol`]      | 33   | Abstract Proxy version of the LSP8 standard without a public `initialize(...)` function.                                                                                                             | `@erc725/smart-contracts`: [`ERC725YCore.sol`]                                                                                                                                                                |
| [`LSP8MintableInitAbstract.sol`]                      | 29   | Preset deployable contract (Abstract proxy version without a public `initialize(...)` function) - same as `LSP8Mintable.sol`                                                                         |                                                                                                                                                                                                               |
| [`ILSP8CompatibleERC721.sol`]                         | 23   | Interface to enable backward compatibility between LSP8 and functions from the ERC721 standard.                                                                                                      |                                                                                                                                                                                                               |
| [`LSP8IdentifiableDigitalAsset.sol`]                  | 27   | Standard version of the LSP8 standard.                                                                                                                                                               | `erc725/smart-contracts`: [`ERC725YCore.sol`]                                                                                                                                                                 |
| [`LSP8CompatibleERC721MintableInitAbstract.sol`]      | 23   | Preset deployable contract (Abstract Proxy version without a public `initialize(...)` function) - same as `LSP8Mintable.sol`.                                                                        |                                                                                                                                                                                                               |
| [`LSP8Mintable.sol`]                                  | 20   | Preset deployable contract (Standard version) - contains a public `mint(...)` only callable by the owner.                                                                                            |                                                                                                                                                                                                               |
| [`LSP8CompatibleERC721Mintable.sol`]                  | 17   | Preset deployable contract (Standard version) - same as `LSP8CompatibleERC721.sol` with a public `mint(...)` function only callable by the owner.                                                    |                                                                                                                                                                                                               |
| [`LSP8CompatibleERC721MintableInit.sol`]              | 22   | Preset deployable contract (Abstract Proxy version without a public `initialize(...)` function) - same as `LSP8CompatibleERC721Mintable.sol`                                                         |                                                                                                                                                                                                               |
| [`LSP8Errors.sol`]                                    | 16   | Custom errors related to the internal logic of `LSP8IdentifiableDigitalAssetCore.sol`.                                                                                                               |                                                                                                                                                                                                               |
| [`LSP8MintableInit.sol`]                              | 14   | Preset deployable contract (Proxy version) - same as `LSP8Mintable.sol`                                                                                                                              |                                                                                                                                                                                                               |
| [`LSP8Burnable.sol`]                                  | 13   | Extension that implements a public `burn(...)` function for LSP8 to burn a specific `tokenId`.                                                                                                       |                                                                                                                                                                                                               |
| [`ILSP8Mintable.sol`]                                 | 12   | Interface for a public `mint(...)` function for a LSP8 non-fungible token.                                                                                                                           |                                                                                                                                                                                                               |
| [`LSP8Constants.sol`]                                 | 6    | Contains the standard ERC725Y metadata keys, LSP1 type IDs defined in the LSP8 standard, as well as its ERC165 interface ID.                                                                         |                                                                                                                                                                                                               |
| **LSP14Ownable2Step**                                 |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP14Ownable2Step.sol`]                             | 95   | Core implementation of the LSP14 standard.                                                                                                                                                           | `@erc725/smart-contracts/`: [`OwnableUnset.sol`]                                                                                                                                                              |
| [`ILSP14Ownable2Step.sol`]                            | 13   | Interface that describes the standard functions and events defined in the LSP14 Ownable 2 Step standard.                                                                                             |                                                                                                                                                                                                               |
| [`LSP14Constants.sol`]                                | 5    | Contains the LSP1 type IDs defined in the LSP14 standard, as well as its ERC165 interface ID.                                                                                                        |                                                                                                                                                                                                               |
| [`LSP14Errors.sol`]                                   | 6    | Custom errors related to the internal logic of `LSP14Ownable2Step.sol`.                                                                                                                              |                                                                                                                                                                                                               |
| **LSP17ContractExtension**                            |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP17Extendable.sol`]                               | 59   | Core implementation of the LSP17 standard. Extendable contract fallback logic.                                                                                                                       | `@openzeppelin/contracts/`: \[[`ERC165.sol`], [`ERC165Checker.sol`]\]                                                                                                                                         |
| [`LSP17Extension.sol`]                                | 29   | Core implementation of the LSP17 standard. Extension logic.                                                                                                                                          | `@openzeppelin/contracts/`: [`ERC165.sol`]                                                                                                                                                                    |
| [`LSP17Constants.sol`]                                | 4    | Contains the standard ERC725Y metadata keys & ERC165 interface ID defined in the LSP17 standard.                                                                                                     |                                                                                                                                                                                                               |
| [`LSP17Errors.sol`]                                   | 2    | Custom errors related to the internal logic of `LSP17Extendable.sol`.                                                                                                                                |                                                                                                                                                                                                               |
| [`LSP17Utils.sol`]                                    | 9    | Library of utility functions used to help handling LSP17 Contract Extensins                                                                                                                          |                                                                                                                                                                                                               |
| **LSP20CallVerification**                             |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP20CallVerification.sol`]                         | 60   | Core implementation of the LSP20 Standard.                                                                                                                                                           |                                                                                                                                                                                                               |
| [`ILSP20CallVerifier.sol`]                            | 12   | Interface that describes the standard functions and events defined in the LSP20 standard.                                                                                                            |                                                                                                                                                                                                               |
| [`LSP20Constants.sol`]                                | 6    | Contains the ERC165 interface ID and return values defined in the LSP20 standard.                                                                                                                    |                                                                                                                                                                                                               |
| [`LSP20Errors.sol`]                                   | 3    | Custom errors related to the internal logic of `LSP20CallVerification.sol`.                                                                                                                          |                                                                                                                                                                                                               |
| **Other Libraries & Constants**                       |      |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP2Utils.sol`] (only 4 functions in scope)         |      | Library of functions to construct ERC725Y Data Keys based on their key type defined by a LSP2 JSON Schema.                                                                                           | `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                                                                      |
| - [`generateArrayElementKeyAtIndex(bytes32,uint128)`] | 10   |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| - [`generateMappingKey(bytes10,bytes20)`]             | 11   |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| - [`generateMappingWithGroupingKey(bytes10,bytes20)`] | 11   |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| - [`isCompactBytesArray(bytes)`]                      | 19   |                                                                                                                                                                                                      |                                                                                                                                                                                                               |
| [`LSP5Utils.sol`]                                     | 123  | Library of functions to register and manage assets stored in an ERC725Y smart contract storage.                                                                                                      | `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                                                                      |
| [`LSP5Constants.sol`]                                 | 3    | Contains the standard ERC725Y metadata keys, defined in the LSP5 standard.                                                                                                                           |                                                                                                                                                                                                               |
| [`LSP10Utils.sol`]                                    | 113  | Library of functions to register and manage vaults stored in an ERC725Y smart contract storage.                                                                                                      | `solidity-bytes-utils`: [`BytesLib.sol`]                                                                                                                                                                      |
| [`LSP10Constants.sol`]                                | 3    | Contains the standard ERC725Y metadata keys, defined in the LSP10 standard.                                                                                                                          |                                                                                                                                                                                                               |

## Out of scope

| Out of Scope          | Details                                                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `contracts/LSP9Vault` | We decided to incude them in this repository in order for the wardens to get familiar with `LSP9Vault`, because it's used and mentioned in the `LSP1UniversalReceiverDelegateUP` to register the addresses of the received vaults to an `LSP0ERC725Account`. |
| `contracts/Mocks`     | Those contracts are only used for testing.                                                                                                                                                                                                                   |

# Additional Context

- The **LSP1UniversalReceiverDelegateUP** contract will be utilized as the primary UniversalReceiverDelegate (not a UniversalReceiverDelegate mapped to a specific typeId via the `LSP1UniversalReceiverDelegate:<typeId>` data key) for the majority of **UniversalProfiles** deployed on the network. Instead of deploying a UniversalReceiverDelegate for each individual UniversalProfile, this contract operates based on global variables and parameters. A single instance of this contract will be deployed and assigned to all UniversalProfiles.

  Additionally, this contract will be granted the `SUPER_SETDATA` and `REENTRANCY` permissions across all UniversalProfiles according to [LSP6KeyManager]. Given this design and architecture, it's essential to thoroughly investigate and identify potential bugs or vulnerabilities. Particular attention should be given to any possible loopholes that could allow for unintended write access to the storage of contracts beyond the `msg.sender` (the UniversalProfile initiating the call), bypassing of permissions, among other security concerns.

- The architecture implemented in this repository comprises a core contract that encapsulates the main logic, and two contracts that inherit from this core contract. One is designed for the standard constructor version, and the other is designed as an initializable version. The initializable version is intentionally created for the use of MinimalProxies, not for upgradeable proxies (as of the current state). Consequently, no gaps have been introduced or need to respect the use of a separate package.

  Meanwhile, the LUKSO team is developing a transpiler to streamline this process. This transpiler will eliminate the need for the core contract, allowing for constructor contracts in a repository. Then, the transpiler will convert all the code into an initializable version that is compatible with both upgradeable and minimal proxies in a separate repository.

- In the `execute(uint256,address,uint256,bytes)` function of **ERC725X**, no additional checks have been introduced to verify that the owner has not changed following a delegatecall. This is a design choice, as introducing such checks might give a false sense of security. It's possible that a malicious actor could momentarily alter the owner variable during the delegatecall, and do malicious action and reset it afterwards, thereby bypassing the check. Additionally, the importance of the owner variable may vary between different contracts and implementations. For instance, a delegatecall could modify the ERC725Y storage, which in certain cases might serve as the principal access point to the account. This is particularly relevant for when the account is owned by an **LSP6KeyManager**, where permissions are stored in the ERC725Y storage rather than being tied to the owner variable.

## `LSP7CompatibleERC20` and `LSP8CompatibleERC721`

LSP7 and LSP8 are different in terms of their interface and the way to interact with them compared to the traditional ERC20 and ERC721 token standards.
We have also included two contracts that can be used and interacted with the same way as you would interact with ERC20 / ERC721 tokens, while leveraging the core functionalities of the LSP7/8 standards.

- `LSP7CompatibleERC20`, which contains all the LSP7 public functions + the following ERC20 public functions: `allowance(...)`, `approve(...)`, `transfer(...)` and `transferFrom(...)`
- `LSP8CompatibleERC721`, which contains the LSP8 public functions + the following ERC721 public functions: `tokenURI(...)`, `ownerOf(...)`, `getApproved(...)`, `isApprovedForAll(...)`, `approve(...)`, `setApprovalForAll(...)`, `transferFrom(...)`, `safeTransferFrom(...)` and `authorizeOperator(...)`.

This means that all the logic of the native LSP7/LSP8 functions for token transfers and operator approvals are wrapped inside the ERC20/ERC721 related functions.

In details, in `LSP7CompatibleERC20`, for any of these transfer and approval functions.

- `LSP7.transfer(address,address,uint256,bool,bytes)`
- `LSP7.authorizeOperator(address,address,uint256)`
- `ERC20.transfer(address,uint256)`
- `ERC20.transferFrom(address,address,uint256)`
- `ERC20.approve(address,uint256)`

The behavior specific to this contract is as follow:

- the `LSP1.universalReceiver(...)` function on the `from` and `to` address is made when calling any of the transfer functions listed above (whether from LSP7 or ERC20).
- the ERC20 `Transfer` event is emitted for any of the transfer functions listed above (whether from LSP7 or ERC20).
- the ERC20 `Approval` event is emitted in both the `LSP7.authorizeOperator(...)` and the `ERC20.approve(...)` function.

In details, in `LSP8CompatibleERC721`, for any of these transfer and approval functions.

- `LSP8.transfer(address,address,bytes32,bool,bytes)`
- `LSP8.authorizeOperator(address,address,bytes32)`
- `ERC721.transferFrom(address,address,uint256)`
- `ERC721.safeTransferFrom(address,address,uint256)`
- `ERC721.safeTransferFrom(address,address,uint256,bytes)`
- `ERC721.approve(address,uint256)`

The behavior specific to this contract is as follow:

- the `LSP1.universalReceiver(...)` function on the `from` and `to` address is made when calling any of the transfer functions listed above (whether from LSP8 or ERC721).
- the ERC721 `Transfer` event is emitted for any of the transfer functions listed above (whether from LSP8 or ERC721).
- the ERC721 `Approval` event is emitted in both the `LSP8.authorizeOperator(...)` and the `ERC721.approve(...)` function.

## Scoping Details

```
- If you have a public code repo, please share it here:  https://github.com/lukso-network/lsp-smart-contracts/tree/v0.10.2
- How many contracts are in scope?:   53
- Total SLoC for these contracts?:  3469
- How many external imports are there?: 3
- How many separate interfaces and struct definitions are there for the contracts within scope?:  14
- Does most of your code generally use composition or inheritance?:   Inheritance
- How many external calls?:   0
- What is the overall line coverage percentage provided by your tests?:  90
- Is there a need to understand a separate part of the codebase / get context in order to audit this part of the protocol?:   True
- Please describe required context:   Understanding of ERC725 + the LSP standards
- Does it use an oracle?:  No
- Does the token conform to the ERC20 standard?:  True
- Are there any novel or unique curve logic or mathematical models?: The ERC725Account is a blockchain account, that can do several stuff execution, setting data, validating signatures, receiving and reacting on universalReceiver calls, extend the account with extensions.  The owner can execute certain functions, as well as addresses allowed by the logic of the owner. (If the caller is not the owner, verification is forwarded to the owner)  The LSP6KeyManager is a smart contract that can own the ERC725Account and allow certain calls to the account linked (ERC725Account) based on the permissions of the caller which are stored in the ERC725Account. Also this contract allows relay execution.  LSP1UniversalReceiverDelegate is a contract design to be set as a UniversalReceiverDelegate of the account to react on certain universalReceiver calls, to register the asset of the tokens and vaults received. LSP7 and LSP8 are new token standards based on LSP4 that allow adding metadata to the tokens contracts themselves. Their interface is built in a unified way, using the same functions for transferring tokens and approving operators, including the same number of parameters (and their types) for these functions. They also include features via LSP1 to notify the sender and the recipient on transfer of receiving tokens.
- Does it use a timelock function?:
- Is it an NFT?: True
- Does it have an AMM?:
- Is it a fork of a popular project?: False
- Does it use rollups?:
- Is it multi-chain?:
- Does it use a side-chain?:
```

# Instructions

### Setup

To clone the repo

```bash
git clone https://github.com/code-423n4/2023-06-lukso.git
```

npm install

```bash
cd 2023-06-lukso && npm i
```

### Build

To compile the contracts

```bash
npm run build
```

### Hardhat Tests

To run the mocha unit tests:

```bash
npm run test
```

While it take time to run the full tests using the command above, it is recommended to run the tests seperatly for each contract with the following commands:

```bash
npm run test:lsp1

## OR

npm run test:up

## OR

npm run test:lsp7
```

You can find the full list of tests commands in [package.json](https://github.com/code-423n4/2023-06-lukso/blob/main/package.json#L32-L49)

### Gas benchmark

> The test benchmark is for the standard version of the contract and not the proxy version.

To run the gas benchmark tests:

```bash
npm run test:benchmark
```

> The foundry tests will also output a gas report.

### Foundry Tests

To run foundry tests (with gas report)

Setup:

```bash
git submodule update --init --recursive --remote
yarn
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Test:

```bash
forge install

forge test
```

### Code Coverage

Additionally, you can run the coverage:

> Coverage might fail if the contract size exceeds the limit (coverage run without optimization)

```
npm run test:coverage
```

To view the report, open coverage/index.html in your browser.

### Contract Size

Get the contract size by running

```bash
npx hardhat size-contracts
```

### Deployment

> Before deployment, add a private key to `.env` file in the root of the project in this variable `DEPLOYER_PRIVATE_KEY= ".."` and make sure the EOA has enough LYXt to fund the deployment of the contracts on LUKSO's Testnet (Faucet link: https://faucet.testnet.lukso.network/)

It is possible to run the following commands to deploy few contracts according to the scripts in [./deploy](https://github.com/code-423n4/2023-06-lukso/tree/main/deploy) folder:

```bash
npx hardhat deploy --network luksoTestnet --tags UniversalProfile

npx hardhat deploy --network luksoTestnet --tags LSP6KeyManager

npx hardhat deploy --network luksoTestnet --tags LSP1UniversalReceiverDelegateUP

// The Mintable preset of LSP7
npx hardhat deploy --network luksoTestnet --tags LSP7Mintable

// The Mintable preset of LSP8
npx hardhat deploy --network luksoTestnet --tags LSP8Mintable

npx hardhat deploy --network luksoTestnet --tags LSP9Vault
```

It is also possible to verify the contracts deployed:

```bash
npx hardhat verify --network luksoTestnet --contract contracts/UniversalProfile.sol:UniversalProfile <address of the UniversalProfile deployed> <address of the deployer>

npx hardhat verify --network luksoTestnet --contract contracts/LSP6KeyManager/LSP6KeyManager.sol:LSP6KeyManager <address of the KeyManager deployed> <address of the target controlled (UP)>

npx hardhat verify --network luksoTestnet --contract contracts/LSP6KeyManager/LSP6KeyManager.sol:LSP6KeyManager <address of the KeyManager deployed> <address of the target controlled (UP)>

npx hardhat verify --network luksoTestnet --contract contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol:LSP1UniversalReceiverDelegateUP <address of the LSP1UniversalReceiverDelegateUP deployed>

npx hardhat verify --network luksoTestnet --contract contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol:LSP1UniversalReceiverDelegateUP <address of the LSP1UniversalReceiverDelegateUP deployed>

npx hardhat verify --network luksoTestnet --contract contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol:LSP7Mintable <address of the LSP7 deployed> 'LSP7 Mintable' 'LSP7M' <address of the deployer> false

npx hardhat verify --network luksoTestnet --contract contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol:LSP8Mintable <address of the LSP8 deployed> 'LSP8 Mintable' 'LSP8M' <address of the deployer>

npx hardhat verify --network luksoTestnet --contract contracts/LSP9Vault/LSP9Vault.sol:LSP9Vault <address of the LSP9 deployed> <address of the deployer>
```

# Publicly Known Issues

## Previous audits

The current contract have gone through multiple audits and formal verification previous to the contest. You can find all the previous audits reports under the [`./audits`](https://github.com/code-423n4/2023-06-lukso/tree/main/audits) folder.

Any issue mentioned in the report listed under the [`./audits`](https://github.com/code-423n4/2023-06-lukso/tree/main/audits) folder MUST be considered as a known issue.

- [Chainsulting audit report (06/07/2022)](./audits/Chainsulting_audit_2022_07_06.pdf)
- [Quantstamp audit (07/09/2022)](./audits/Quantstamp_audit_2022_09_07.pdf)
- [Watchpug audit (20/10/2022)](./audits/Watchpug_audit_2022_10_20.pdf)
- [Watchpug audit (15/12/2022)](./audits/Watchpug_audit_2022_12_15.pdf)
- [RuntimeVerification, Formal Verification audit (2023/02/20)](./audits/RuntimeVerification_formalVerification_2023_02_20.pdf)
- [Trust audit (2023/04/13)](./audits/Trust_audit_2023_04_13.pdf)
- [Watchpug audit (2023/04/21)](./audits/Watchpug_audit_2023_04_21.pdf)

## General

- No constructor in `OwnableUnset.sol` and `LSP14Ownable2Step.sol`. We cannot add a constructor at the moment since these 2 contracts are shared currently between the standard and proxy version (with initialize(...)). Once we have the `lsp-smart-contract-upgradeable` repo, we will add a constructor in the standard version and an `initialize(...)` function in the Init version.

- The contracts are using [`supportsERC165InterfaceUnchecked`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/a7a94c77463acea95d979aae1580fb0ddc3b6a1e/contracts/utils/introspection/ERC165Checker.sol#L110) to check for support of a single interfaceId for gas cost optimisation. It does not conform to the ERC165 standard but we do this out of gas optimisation as our implementations do a lot of external calls to check for interfaces IDs.

## `LSP0ERC725Account.sol`

- The effect of using `msg.value` with operation type DELEGATECALL in `execute(…)` functions is known. Similar to the issue mentioned in [Uniswap V3 Periphery](https://github.com/Uniswap/v3-periphery/issues/52).

- When the owner of the LSP0 is an EOA, if a caller calls the protected functions:

  1. the LSP20 call for `lsp20VerifyCall(...)` will pass (because it is a low level call, even if it is calling an EOA owner).
  2. but it will fail because the owner being an EOA cannot return the magic value.

- A potential collision can happen in the `universalReceiver(..)` function when 2 type IDs start with the same 20 bytes. _See Trust audit report finding M2 for more details._

- The UniversalReceiverDelegate of the receiver can consume a lot of gas, making the caller who initiated the transfer pay a lot in gas fees.

- You can have delegate call with selfdestruct that will bypass the second lsp20 check (`lsp20VerifyCallResult(…)`). Mentioned in Trust audit report, see finding M3 for more details.

## `LSP1UniversalReceiverDelegateUP.sol`

- The UniversalReceiverDelegateUP could be used to register spam assets, as currently, there is no whitelisting feature in the contract. It is always possible to spam via the LSP1 `universalReceiver(...)` function. For instance, by:
  1. faking the typeIDs of LSP7 and LSP8
  2. creating a contract that fakes the `balanceOf(…)` function for LSP7 or LSP8 assets transfer.

The caller will, however, have to pay for the gas of spamming the account.

- It is allowed with LSP7 token transfers to transfer `0` as an amount and that it calls the `universalReceiver(...)` function of the sender and recipient.

The reason is we want to allow to react on the `data` parameter, for instance.

- It is possible to spam fake vaults that you own in multiple ways:

> Example 1:
>
> 1. Do `Vault.execute(…)` (from ERC725X)
> 2. → the data payload would be the `universalReceiver(…)` function of the UP user you want to spam, passing the right `typeId` for VaultTransferRecipient.

> Example 2:
>
> On the Vault, under the LSP1Delegate address, put the address of the UP user as a LSP1Delegate you want to spam.

## `LSP6KeyManager.sol`

- The `executeBatch(..)` function (from ERC725X) is not yet supported in the KeyManager as a path for execution.

- The relayer can choose the amount of gas provided when interacting with the `executeRelayCall(...)` functions. For more details, see Trust audit report finding L3.

- The overlapping issue between the two permissions `ADDCONTROLLER` / `EDITPERMISSIONS` is known. For instance:

  - **if you have permission `ADDCONTROLLER`:** You can create a new wallet address you control and give it all the permissions via `ADDCONTROLLER`.
  - **if you have permission `EDITPERMISSIONS`:** You can grant yourself all the permissions and take control of the account (you can also grant yourself `ADDCONTROLLER`, and create a new wallet that you control).

  These two permissions are separated for legal reasons. In some implementations or use cases, applications or protocols might require giving a controller only one of the two permissions, not the other (and vice versa).

- It is possible to execute some code in the receive/fallback functions of the recipient by only having the permission transferValue/SuperTransferValue.

- It is not possible to call LSP17 extensions through the KeyManager.

- Possibility to lock the account by setting the KeyManager address as extension of `lsp20VerifyCall` selector.

- Failed relay calls (via `executeRelayCall(…)` don’t increase the nonce). Therefore if one would pre-sign 3 transactions in one channel and the first one is failing, one would have to re-sign the next 2 transactions with a different nonce in order to execute them. Another solution would be signing all 3 transactions in 3 different channels. See first audit report from Watchpug finding M3 for details.

- `REENTRANCY` permission is checked for the contract that reenters the KeyManager or for the signer if the reentrant call happens through `executeRelayCall(..)` & `executeRelayCallBatch(..)`. Initiator of the call doesn’t need to have `REENTRANCY` permission.

## `LSP7DigitalAsset.sol`

- `authorizeOperator(..)` CAN NOT avoid front-running and Allowance Double-Spend Exploit. This can be avoided by using the `increaseAllowance(..)` and `decreaseAllowance(..)` functions.

- We are aware that the `transferBatch(...)` function could be optimized for gas. For instance for scenarios where the balance of the sender (if it’s the same from address of every iterations) can be updated once instead of on every iterations (to avoid multiple storage writes). Same for operator allowances.

## `LSP7CompatibleERC20.sol` and `LSP7CompatibleERC20InitAbstract.sol`

`LSP7DigitalAssetCore.sol` includes the non-standard functions `increaseAllowance` and `decreaseAllowance` to mitigate the issues around double spend exploit. In `@openzeppelin/contracts`, the ERC20 implementation of these two functions returns a boolean `true`.

We do not return a boolean in LSP7 because we want to stay consistent with the other functions from the LSP7 interface (like `authorizeOperator(...)` and `transfer(...)`) that do not return anything, as defined in the `ILSP7DigitalAsset.sol` interface.

In `LSP7CompatibleERC20` and `LSP7CompatibleERC20InitAbstract`, we cannot override the LSP7 function to return a boolean in these two contracts, because we cannot override the function definitions _"from returning nothing to returning something"_ (the Solidity compiler does not allow this).

We are currently aware of this issue being not completely in-line with ERC20 in `LSP7CompatibleERC20` and `LSP7CompatibleERC20InitAbstract`.

One way we are planning to mitigate this issue is by adding an assembly block that returns a `true` boolean in these two functions in these two contracts. This will not change anything if these function are interacted with the Solidity function call syntax (_e.g: `LSP7CompatibleERC20.increaseAllowance(operatorAddress, 10 ether)`_), but if interacted via low level call, it will enable to decode the returned data as a `bool` and process it, as shown below:

```solidity
bytes memory increaseAllowanceCalldata = abi.encodeWithSelector(
    this.increaseAllowance.selector,
    operatorAddress,
    10 ether
);

(bool success, bytes memory result) = address(
    lsp7CompatibleContractAddress
).call(increaseAllowanceCalldata);

// if the external call completed successfully
if (success) {
    // decode the `result` as a boolean and ensure it is `true`
    bool booleanReturned = abi.decode(result, (bool));

    require(booleanReturned == true);
}
```

## `LSP8IdentifiableDigitalAsset.sol`

- We are aware that the `transferBatch(...)` function could be optimized for gas. For instance for scenarios where the balance of the sender (if it’s the same from address of every iterations) can be updated once instead of on every iterations (to avoid multiple storage writes). Same for operator allowances.

## `LSP14Ownable2Step.sol`

- When using the function `acceptOwnership(...)` , if the current owner is a contract that implements LSP1, the current owner can block the new owner from accepting ownership by reverting in its `universalReceiver(..)` function (the current owner’s UniversalReceiver function).

## `LSP17Extendable.sol`

- Setting extensions for functions that operate on `msg.sender` (eg: tokens transfer) is dangerous.

## `LSP20CallVerification.sol`

- Additional data can be returned after the first 32 bytes of the abi encoded magic value from LSP20 standardized functions.

# Slither Known Issues

Any known issues from Slither for each contract are listed under the [`slither/`](https://github.com/code-423n4/2023-06-lukso/tree/main/slither) folder in this repository. We encourage reporting any bugs around them and not just the errors on their own. Slither errors without some proven negative impact will be considered as known issues.

<!-- Global Links -->
<!-- prettier-ignore-start -->

[`LSP0ERC725AccountCore.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol
[`LSP0Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0Utils.sol
[`LSP0ERC725AccountInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol
[`ILSP0ERC725Account.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/ILSP0ERC725Account.sol
[`LSP0ERC725Account.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0ERC725Account.sol
[`LSP0ERC725AccountInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol
[`LSP0Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP0ERC725Account/LSP0Constants.sol

<!-- --- -->

[`UniversalProfileInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/UniversalProfileInitAbstract.sol
[`UniversalProfile.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/UniversalProfile.sol
[`UniversalProfileInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/UniversalProfileInit.sol

<!-- --- -->

[`LSP1UniversalReceiverDelegateUP.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol
[`LSP1Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/LSP1Utils.sol
[`LSP1UniversalReceiverDelegateVault.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol
[`ILSP1UniversalReceiver.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol
[`LSP1Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/LSP1Constants.sol
[`LSP1Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP1UniversalReceiver/LSP1Errors.sol

<!-- --- -->

[`LSP4DigitalAssetMetadataInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol
[`LSP4DigitalAssetMetadata.sol`]: chttps://github.com/code-423n4/2023-06-lukso/tree/main/ontracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol
[`LSP4Compatibility.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol
[`LSP4Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol
[`ILSP4Compatibility.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/ILSP4Compatibility.sol
[`LSP4Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Errors.sol

<!-- --- -->

[`LSP6SetDataModule.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol
[`LSP6KeyManagerCore.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol
[`LSP6ExecuteModule.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol
[`LSP6Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Utils.sol
[`LSP6Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Constants.sol
[`ILSP6KeyManager.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/ILSP6KeyManager.sol
[`LSP6Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Errors.sol
[`LSP6OwnershipModule.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol
[`LSP6KeyManagerInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInitAbstract.sol
[`LSP6KeyManager.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6KeyManager.sol
[`LSP6KeyManagerInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInit.sol

<!-- --- -->

[`LSP7DigitalAssetCore.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol
[`LSP7CompatibleERC20InitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol
[`LSP7CompatibleERC20.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol
[`ILSP7DigitalAsset.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol
[`LSP7DigitalAssetInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol
[`LSP7CappedSupply.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol
[`LSP7CappedSupplyInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol
[`LSP7DigitalAsset.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol
[`LSP7MintableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol
[`LSP7CompatibleERC20MintableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol
[`LSP7Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol
[`LSP7CompatibleERC20Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol
[`LSP7Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/LSP7Errors.sol
[`LSP7CompatibleERC20MintableInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol
[`LSP7MintableInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInit.sol
[`ILSP7CompatibleERC20.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol
[`ILSP7Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/presets/ILSP7Mintable.sol
[`LSP7Burnable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol
[`LSP7BurnableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol
[`LSP7Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP7DigitalAsset/LSP7Constants.sol

<!-- --- -->

[`LSP8IdentifiableDigitalAssetCore.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol
[`LSP8CompatibleERC721InitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol
[`LSP8CompatibleERC721.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol
[`ILSP8IdentifiableDigitalAsset.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol
[`LSP8EnumerableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol
[`LSP8Enumerable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol
[`LSP8CappedSupplyInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol
[`LSP8CappedSupply.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol
[`LSP8IdentifiableDigitalAssetInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol
[`LSP8MintableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol
[`ILSP8CompatibleERC721.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol
[`LSP8IdentifiableDigitalAsset.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol
[`LSP8CompatibleERC721MintableInitAbstract.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.s
[`LSP8Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol
[`LSP8CompatibleERC721Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol
[`LSP8CompatibleERC721MintableInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol
[`LSP8Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Errors.sol
[`LSP8MintableInit.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol
[`LSP8Burnable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol
[`ILSP8Mintable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol
[`LSP8Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.s

<!-- --- -->

[`LSP14Ownable2Step.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol
[`ILSP14Ownable2Step.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol
[`LSP14Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP14Ownable2Step/LSP14Constants.sol
[`LSP14Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP14Ownable2Step/LSP14Errors.sol

<!-- --- -->

[`LSP17Extendable.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP17ContractExtension/LSP17Extendable.sol
[`LSP17Extension.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP17ContractExtension/LSP17Extension.sol
[`LSP17Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP17ContractExtension/LSP17Constants.sol
[`LSP17Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP17ContractExtension/LSP17Errors.sol
[`LSP17Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP17ContractExtension/LSP17Utils.sol

<!-- --- -->

[`LSP20CallVerification.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP20CallVerification/LSP20CallVerification.sol
[`ILSP20CallVerifier.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP20CallVerification/ILSP20CallVerifier.sol
[`LSP20Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP20CallVerification/LSP20Constants.sol
[`LSP20Errors.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP20CallVerification/LSP20Errors.sol

<!-- --- -->

[`EIP191Signer.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/Custom/EIP191Signer.sol
[`LSP2Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol
[`generateArrayElementKeyAtIndex(bytes32,uint128)`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol#L48
[`generateMappingKey(bytes10,bytes20)`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol#L108
[`generateMappingWithGroupingKey(bytes10,bytes20)`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol#L165
[`isCompactBytesArray(bytes)`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol#L288
[`LSP5Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP5ReceivedAssets/LSP5Utils.sol
[`LSP5Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP5ReceivedAssets/LSP5Constants.sol
[`LSP10Utils.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP10ReceivedVaults/LSP10Utils.sol
[`LSP10Constants.sol`]: https://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP10ReceivedVaults/LSP10Constants.sol

<!-- Links to Specs -->

[ERC-725]: https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md
[LSP-0-ERC725Account]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md
[LSP-1-UniversalReceiver]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md
[LSP-2-ERC725YJSONSchema]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
[LSP-3-UniversalProfile-Metadata]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md
[LSP-4-DigitalAsset-Metadata]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[LSP-6-KeyManager]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
[LSP-5-ReceivedAssets]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md
[LSP-7-DigitalAsset]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md
[LSP-8-IdentifiableDigitalAsset]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md
[LSP-10-ReceivedVaults]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md
[LSP-14-Ownable2Step]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-14-Ownable2Step.md
[LSP-17-ContractExtension]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md
[LSP-20-CallVerification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-20-CallVerification.md

<!-- Links to Docs --->

[ERC725]: https://docs.lukso.tech/standards/lsp-background/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/universal-profile/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/nft-2.0/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/generic-standards/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/generic-standards/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/generic-standards/lsp20-call-verification

<!-- Links to Libraries -->

[`Create2.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Create2.sol
[`ECDSA.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/cryptography/ECDSA.sol
[`ERC165Checker.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165Checker.sol
[`Address.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Address.sol
[`ERC165.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165.sol
[`Initializable.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.9.2/contracts/proxy/utils/Initializable.sol
[`EnumerableSet.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/structs/EnumerableSet.sol
[`ERC725.constants.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/constants.sol
[`ERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Y.sol
[`ERC725YCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YCore.sol
[`ERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725X.sol
[`ERC725XCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XCore.sol
[`OwnableUnset.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/custom/OwnableUnset.sol
[`BytesLib.sol`]: https://github.com/GNSPS/solidity-bytes-utils/blob/v0.8.0/contracts/BytesLib.sol

[`ERC725InitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725InitAbstract 
[`IERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725X.sol
[`ERC725.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725.sol
[`IERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725Y.sol
[`ERC725XInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInitAbstract.sol
[`ERC725YInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInitAbstract.sol
[`errors.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/errors.sol
[`ERC725Init.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Init.sol
[`ERC725XInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInit.sol
[`ERC725YInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInit.sol 
[`constants.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/constants.sol

<!-- prettier-ignore-end -->
