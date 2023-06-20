Summary

- [unused-return](#unused-return)
- [calls-loop](#calls-loop)

## unused-return

- Impact: Medium
- Confidence: Medium

[LSP8IdentifiableDigitalAssetCore.\_mint(address,bytes32,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L277-L305) ignores return value by [\_ownedTokens[to].add(tokenId)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L298)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L277-L305

[LSP8IdentifiableDigitalAssetCore.\_transfer(address,address,bytes32,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L346-L382) ignores return value by [\_ownedTokens[from].remove(tokenId)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L372)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L346-L382

[LSP8IdentifiableDigitalAssetCore.\_transfer(address,address,bytes32,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L346-L382) ignores return value by [\_ownedTokens[to].add(tokenId)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L373)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L346-L382

[LSP8IdentifiableDigitalAssetCore.\_notifyTokenReceiver(address,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L418-L432) ignores return value by [ILSP1UniversalReceiver(to).universalReceiver(\_TYPEID_LSP8_TOKENSRECIPIENT,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L424)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L418-L432

[LSP8IdentifiableDigitalAssetCore.\_notifyTokenSender(address,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L406-L410) ignores return value by [ILSP1UniversalReceiver(from).universalReceiver(\_TYPEID_LSP8_TOKENSSENDER,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L408)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L406-L410

[LSP8IdentifiableDigitalAssetCore.\_burn(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L316-L334) ignores return value by [\_ownedTokens[tokenOwner].remove(tokenId)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L327)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L316-L334

## calls-loop

- Impact: Low
- Confidence: Medium

[LSP8IdentifiableDigitalAssetCore.\_notifyTokenSender(address,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L406-L410) has external calls inside a loop: [ILSP1UniversalReceiver(from).universalReceiver(\_TYPEID_LSP8_TOKENSSENDER,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L408)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L406-L410

[LSP8IdentifiableDigitalAssetCore.\_notifyTokenReceiver(address,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L418-L432) has external calls inside a loop: [ILSP1UniversalReceiver(to).universalReceiver(\_TYPEID_LSP8_TOKENSRECIPIENT,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L424)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol#L418-L432
