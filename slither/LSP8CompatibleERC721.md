Summary

- [unused-return](#unused-return-3)
- [assembly](#assembly-2)

> ℹ️ **Note:** also applies to `LSP8CompatibleERC721InitAbstract`, `LSP8CompatibleERC721Mintable`, `LSP8CompatibleERC721Init` and `LSP8CompatibleERC721InitAbstract`

## unused-return

- Impact: Medium
- Confidence: Medium

[LSP8CompatibleERC721.\_checkOnERC721Received(address,address,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L271-L296) ignores return value by [IERC721Receiver(to).onERC721Received(msg.sender,from,tokenId,data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L278-L292)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L271-L296

## assembly

- Impact: Informational
- Confidence: High

[LSP8CompatibleERC721.\_checkOnERC721Received(address,address,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L271-L296) uses assembly

- [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L288-L290)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol#L271-L296
