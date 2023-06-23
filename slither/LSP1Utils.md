Summary

- [unused-return](#unused-return)
- [low-level-calls](#low-level-calls-1)

## unused-return

- Impact: Medium
- Confidence: Medium

[LSP1Utils.tryNotifyUniversalReceiver(address,bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L20-L28) ignores return value by [ILSP1UniversalReceiver(lsp1Implementation).universalReceiver(typeId,data)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L26)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L20-L28

**Notes from the developers:**

This function is used inside LSP7 + LSP8 to notify the sender and the recipient on minting, burning or token transfers.

[LSP1Utils.callUniversalReceiverWithCallerInfos(address,bytes32,bytes,address,uint256)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L30-L50) ignores return value by [Address.verifyCallResult(success,result,Call to universalReceiver failed)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L48)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L30-L50

**Notes from the developers:**

This function is used in the `universalReceiver(...)` function of `LSP0ERC725AccountCore` to when calling the LSP1UniversalReceiverDelegates (both the default one, and the one associated with a specific typeId), to append the extra parameters in the calldata, these extra parameters being the `msg.sender` (that initially called the `universalReceiver(...)` function on the LSP0) + the `msg.value` that was sent to the `universalReceiver(...)` function on the LSP0.

## low-level-calls

- Impact: Informational
- Confidence: High

Low level call in [LSP1Utils.callUniversalReceiverWithCallerInfos(address,bytes32,bytes,address,uint256)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L30-L50): - [(success,result) = universalReceiverDelegate.call(callData)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L47)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1Utils.sol#L30-L50
