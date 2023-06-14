# ✨ So you want to run an audit

This `README.md` contains a set of checklists for our audit collaboration.

Your audit will use two repos:

- **an _audit_ repo** (this one), which is used for scoping your audit and for providing information to wardens
- **a _findings_ repo**, where issues are submitted (shared with you after the audit)

Ultimately, when we launch the audit, this repo will be made public and will contain the smart contracts to be reviewed and all the information needed for audit participants. The findings repo will be made public after the audit report is published and your team has mitigated the identified issues.

Some of the checklists in this doc are for **C4 (🐺)** and some of them are for **you as the audit sponsor (⭐️)**.

---

# Repo setup

## ⭐️ Sponsor: Add code to this repo

- [ ] Create a PR to this repo with the below changes:
- [ ] Provide a self-contained repository with working commands that will build (at least) all in-scope contracts, and commands that will run tests producing gas reports for the relevant contracts.
- [ ] Make sure your code is thoroughly commented using the [NatSpec format](https://docs.soliditylang.org/en/v0.5.10/natspec-format.html#natspec-format).
- [ ] Please have final versions of contracts and documentation added/updated in this repo **no less than 24 hours prior to audit start time.**
- [ ] Be prepared for a 🚨code freeze🚨 for the duration of the audit — important because it establishes a level playing field. We want to ensure everyone's looking at the same code, no matter when they look during the audit. (Note: this includes your own repo, since a PR can leak alpha to our wardens!)

---

## ⭐️ Sponsor: Edit this README

Under "SPONSORS ADD INFO HERE" heading below, include the following:

- [ ] Modify the bottom of this `README.md` file to describe how your code is supposed to work with links to any relevent documentation and any other criteria/details that the C4 Wardens should keep in mind when reviewing. ([Here's a well-constructed example.](https://github.com/code-423n4/2022-08-foundation#readme))
  - [ ] When linking, please provide all links as full absolute links versus relative links
  - [ ] All information should be provided in markdown format (HTML does not render on Code4rena.com)
- [ ] Under the "Scope" heading, provide the name of each contract and:
  - [ ] source lines of code (excluding blank lines and comments) in each
  - [ ] external contracts called in each
  - [ ] libraries used in each
- [ ] Describe any novel or unique curve logic or mathematical models implemented in the contracts
- [ ] Does the token conform to the ERC-20 standard? In what specific ways does it differ?
- [ ] Describe anything else that adds any special logic that makes your approach unique
- [ ] Identify any areas of specific concern in reviewing the code
- [ ] Review the Gas award pool amount. This can be adjusted up or down, based on your preference - just flag it for Code4rena staff so we can update the pool totals across all comms channels.
- [ ] Optional / nice to have: pre-record a high-level overview of your protocol (not just specific smart contract functions). This saves wardens a lot of time wading through documentation.
- [ ] See also: [this checklist in Notion](https://code4rena.notion.site/Key-info-for-Code4rena-sponsors-f60764c4c4574bbf8e7a6dbd72cc49b4#0cafa01e6201462e9f78677a39e09746)
- [ ] Delete this checklist and all text above the line below when you're ready.

---

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

## Automated Findings / Publicly Known Issues

Automated findings output for the audit can be found [here](add link to report) within 24 hours of audit opening.

_Note for C4 wardens: Anything included in the automated findings output is considered a publicly known issue and is ineligible for awards._

[ ⭐️ SPONSORS ADD INFO HERE ]

# Overview

_Please provide some context about the code being audited, and identify any areas of specific concern in reviewing the code. (This is a good place to link to your docs, if you have them.)_

# Scope

_List all files in scope in the table below (along with hyperlinks) -- and feel free to add notes here to emphasize areas of focus._

_For line of code counts, we recommend using [cloc](https://github.com/AlDanial/cloc)._

## Summary

| Scope             | code |
| ----------------- | ---- |
| ERC725            | 428  |
| LSP0              | 406  |
| Universal Profile | 33   |
| LSP1              | 260  |
| LSP4              | 86   |
| LSP6              | 1236 |
| LSP7              | 656  |
| LSP8              | 964  |
| LSP14             | 99   |
| LSP20             | 60   |
| EIP191Signer      | 9    |
| LSP2Utils         | 33   |
| LSP5Utils         | 106  |
| LSP10Utils        | 101  |
| SUM               | 4477 |

## Contracts in scope

| Contract                                                                                                    | SLOC | Purpose | Libraries used |
| ----------------------------------------------------------------------------------------------------------- | ---- | ------- | -------------- |
| **LSP0ERC725Account**                                                                                       |      |         |                |
| `contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol`                                                     | 331  |         |                |
| `contracts/LSP0ERC725Account/LSP0Utils.sol`                                                                 | 23   |         |                |
| `contracts/LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol`                                             | 12   |         |                |
| `contracts/LSP0ERC725Account/ILSP0ERC725Account.sol`                                                        | 11   |         |                |
| `contracts/LSP0ERC725Account/LSP0ERC725Account.sol`                                                         | 11   |         |                |
| `contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol`                                                     | 10   |         |                |
| `contracts/LSP0ERC725Account/LSP0Constants.sol`                                                             | 8    |         |                |
| **UniversalProfile**                                                                                        |      |         |                |
| `contracts/UniversalProfileInitAbstract.sol`                                                                | 12   |         |                |
| `contracts/UniversalProfile.sol`                                                                            | 11   |         |                |
| `contracts/UniversalProfileInit.sol`                                                                        | 10   |         |                |
| **LSP1UniversalReceiverDelegate**                                                                           |      |         |                |
| `contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol`       | 107  |         |                |
| `contracts/LSP1UniversalReceiver/LSP1Utils.sol`                                                             | 71   |         |                |
| `contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol` | 60   |         |                |
| `contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol`                                                | 14   |         |                |
| `contracts/LSP1UniversalReceiver/LSP1Constants.sol`                                                         | 4    |         |                |
| `contracts/LSP1UniversalReceiver/LSP1Errors.sol`                                                            | 4    |         |                |
| **LSP4DigitalAssetMetadata**                                                                                |      |         |                |
| `contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol`                               | 30   |         |                |
| `contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol`                                           | 25   |         |                |
| `contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol`                                                  | 14   |         |                |
| `contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol`                                                      | 8    |         |                |
| `contracts/LSP4DigitalAssetMetadata/ILSP4Compatibility.sol`                                                 | 6    |         |                |
| `contracts/LSP4DigitalAssetMetadata/LSP4Errors.sol`                                                         | 3    |         |                |
| **LSP6KeyManager**                                                                                          |      |         |                |
| `contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol`                                                | 381  |         |                |
| `contracts/LSP6KeyManager/LSP6KeyManagerCore.sol`                                                           | 352  |         |                |
| `contracts/LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol`                                                | 218  |         |                |
| `contracts/LSP6KeyManager/LSP6Utils.sol`                                                                    | 145  |         |                |
| `contracts/LSP6KeyManager/LSP6Constants.sol`                                                                | 40   |         |                |
| `contracts/LSP6KeyManager/ILSP6KeyManager.sol`                                                              | 27   |         |                |
| `contracts/LSP6KeyManager/LSP6Errors.sol`                                                                   | 25   |         |                |
| `contracts/LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol`                                              | 17   |         |                |
| `contracts/LSP6KeyManager/LSP6KeyManagerInitAbstract.sol`                                                   | 11   |         |                |
| `contracts/LSP6KeyManager/LSP6KeyManager.sol`                                                               | 10   |         |                |
| `contracts/LSP6KeyManager/LSP6KeyManagerInit.sol`                                                           | 10   |         |                |
| **LSP7DigitalAsset**                                                                                        |      |         |                |
| `contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol`                                                       | 197  |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol`                                 | 85   |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol`                                             | 69   |         |                |
| `contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol`                                                          | 42   |         |                |
| `contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol`                                               | 27   |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol`                                                | 27   |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol`                                    | 27   |         |                |
| `contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol`                                                           | 21   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol`                                           | 21   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol`                            | 19   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol`                                                       | 19   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol`                                        | 17   |         |                |
| `contracts/LSP7DigitalAsset/LSP7Errors.sol`                                                                 | 16   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol`                                    | 16   |         |                |
| `contracts/LSP7DigitalAsset/presets/LSP7MintableInit.sol`                                                   | 15   |         |                |
| `contracts/LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol`                                            | 10   |         |                |
| `contracts/LSP7DigitalAsset/presets/ILSP7Mintable.sol`                                                      | 10   |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol`                                                    | 7    |         |                |
| `contracts/LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol`                                        | 7    |         |                |
| `contracts/LSP7DigitalAsset/LSP7Constants.sol`                                                              | 4    |         |                |
| **LSP8IdentifiableDigitalAsset**                                                                            |      |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol`                               | 222  |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol`                    | 179  |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol`                                | 177  |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol`                                  | 45   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol`                          | 34   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol`                                      | 32   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol`                        | 29   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol`                                    | 27   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol`                       | 25   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol`                               | 25   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol`                               | 23   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol`                                   | 21   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol`               | 19   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol`                                           | 18   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol`                           | 17   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol`                       | 16   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/LSP8Errors.sol`                                                     | 14   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol`                                       | 14   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol`                                        | 11   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol`                                          | 10   |         |                |
| `contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol`                                                  | 6    |         |                |
| **LSP14Ownable2Step**                                                                                       |      |         |                |
| `contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol`                                                         | 81   |         |                |
| `contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol`                                                        | 10   |         |                |
| `contracts/LSP14Ownable2Step/LSP14Constants.sol`                                                            | 5    |         |                |
| `contracts/LSP14Ownable2Step/LSP14Errors.sol`                                                               | 3    |         |                |
| **LSP20CallVerification**                                                                                   |      |         |                |
| `contracts/LSP20CallVerification/LSP20CallVerification.sol`                                                 | 42   |         |                |
| `contracts/LSP20CallVerification/ILSP20CallVerification.sol`                                                | 9    |         |                |
| `contracts/LSP20CallVerification/LSP20Constants.sol`                                                        | 6    |         |                |
| `contracts/LSP20CallVerification/LSP20Errors.sol`                                                           | 3    |         |                |
| **Other Libraries & Constants**                                                                             |      |         |                |
| `contracts/Custom/EIP191Signer.sol`                                                                         | 9    |         |                |
| `contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol` (only 4 functions in scope)                                 |      |         |                |
| - `generateArrayElementKeyAtIndex(bytes32,uint128)`                                                         | 7    |         |                |
| - `generateMappingKey(bytes10,bytes20)`                                                                     | 7    |         |                |
| - `generateMappingWithGroupingKey(bytes10,bytes20)`                                                         | 7    |         |                |
| - `isCompactBytesArray(bytes)`                                                                              | 12   |         |                |
| `contracts/LSP5ReceivedAssets/LSP5Utils.sol`                                                                | 103  |         |                |
| `contracts/LSP5ReceivedAssets/LSP5Constants.sol`                                                            | 3    |         |                |
| `contracts/LSP10ReceivedVaults/LSP10Utils.sol`                                                              | 98   |         |                |
| `contracts/LSP10ReceivedVaults/LSP10Constants.sol`                                                          | 3    |         |                |

## Out of scope

_List any files/contracts that are out of scope for this audit._

# Additional Context

_Describe any novel or unique curve logic or mathematical models implemented in the contracts_

_Sponsor, please confirm/edit the information below._

## Scoping Details

```
- If you have a public code repo, please share it here:  https://github.com/lukso-network/lsp-smart-contracts
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

# Tests

_Provide every step required to build the project from a fresh git clone, as well as steps to run the tests with a gas report._

_Note: Many wardens run Slither as a first pass for testing. Please document any known errors with no workaround._
