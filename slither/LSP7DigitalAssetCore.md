Summary

- [unused-return](#unused-return-1)
- [calls-loop](#calls-loop-2)

## unused-return

- Impact: Medium
- Confidence: Medium

[LSP7DigitalAssetCore.\_notifyTokenReceiver(address,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L413-L427) ignores return value by [ILSP1UniversalReceiver(to).universalReceiver(\_TYPEID_LSP7_TOKENSRECIPIENT,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L419)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L413-L427

[LSP7DigitalAssetCore.\_notifyTokenSender(address,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L401-L405) ignores return value by [ILSP1UniversalReceiver(from).universalReceiver(\_TYPEID_LSP7_TOKENSSENDER,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L403)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L401-L405

## calls-loop

- Impact: Low
- Confidence: Medium

[LSP7DigitalAssetCore.\_notifyTokenSender(address,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L401-L405) has external calls inside a loop: [ILSP1UniversalReceiver(from).universalReceiver(\_TYPEID_LSP7_TOKENSSENDER,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L403)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L401-L405

[LSP7DigitalAssetCore.\_notifyTokenReceiver(address,bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L413-L427) has external calls inside a loop: [ILSP1UniversalReceiver(to).universalReceiver(\_TYPEID_LSP7_TOKENSRECIPIENT,lsp1Data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L419)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L413-L427
