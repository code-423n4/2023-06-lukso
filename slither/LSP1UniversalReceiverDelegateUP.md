**Summary**

- [incorrect-equality](#incorrect-equality)
- [locked-ether](#locked-ether)
- [tx-origin](#tx-origin)

## incorrect-equality

- Impact: Medium
- Confidence: High

[LSP1UniversalReceiverDelegateUP.\_whenReceiving(bytes32,address,bytes32,bytes4)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L136-L176) uses a dangerous strict equality:

- [balance == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L152)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L136-L176

## locked-ether

- Impact: Medium
- Confidence: High

Contract locking ether found: Contract [LSP1UniversalReceiverDelegateUP](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L58-L242) has payable functions:

- [ILSP1UniversalReceiver.universalReceiver(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol#L32-L35)
- [LSP1UniversalReceiverDelegateUP.universalReceiver(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L74-L127) But does not have a function to withdraw the ether

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L58-L242

**Notes from the developers:**

We are aware of this issue (it might be a false positive from Slither). Solidity allows to override a function from nonpayable to payable ✅ but not the other way around from payable to payable ❌. Therefore, we implemented a custom error `NativeTokensNotAccepted` to catch this error at runtime.

## tx-origin

- Impact: Medium
- Confidence: Medium

[LSP1UniversalReceiverDelegateUP.universalReceiver(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L74-L127) uses tx.origin for authorization: [notifier == tx.origin](https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L95)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol#L74-L127

**Notes from the developers:**

We use `tx.origin` as a way to mitigate direct spamming from EOAs.
