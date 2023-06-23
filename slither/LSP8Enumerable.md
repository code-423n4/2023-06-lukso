**Summary**

- [costly-loop](#costly-loop)

> ℹ️ **Note:** also applies to `LSP8EnumerableInitAbstract`

## costly-loop

- Impact: Informational
- Confidence: Medium

[LSP8Enumerable.\_beforeTokenTransfer(address,address,bytes32)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L27-L48) has costly operations inside a loop:

- [delete \_tokenIndex[tokenId]](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L45)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L27-L48

[LSP8Enumerable.\_beforeTokenTransfer(address,address,bytes32)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L27-L48) has costly operations inside a loop:

- [delete \_indexToken[lastIndex]](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L44)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol#L27-L48
