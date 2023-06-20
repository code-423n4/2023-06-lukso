Summary

- [uninitialized-local](#uninitialized-local)
- [calls-loop](#calls-loop)
- [reentrancy-benign](#reentrancy-benign)
- [reentrancy-events](#reentrancy-events)
- [assembly](#assembly)
- [low-level-calls](#low-level-calls)

## uninitialized-local

- Impact: Medium
- Confidence: Medium

[LSP0ERC725AccountCore.universalReceiver(bytes32,bytes).resultTypeIdDelegate](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L466) is a local variable never initialized

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L466

[LSP0ERC725AccountCore.universalReceiver(bytes32,bytes).resultDefaultDelegate](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L440) is a local variable never initialized

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L440

**Notes from the developers:**

We decided to not initialize these variables to a default value (as `bytes memory resultTypeIdDelegate = ""` or `bytes memory resultDegaultDelegate = ""` ) because this increases too much the deployment cost of a `LSP0ERC725Account` and a `UniversalProfile` (+7,768 gas). We want to keep the deployment cost low and consider there is too much of a tradeoff here and no benefit here in initializing it to a default value. However, we will accept any findings that justify initializing these local variables, if having them no initialized creates a potential bug.

## calls-loop

- Impact: Low
- Confidence: Medium

[LSP0ERC725AccountCore.batchCalls(bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183) has external calls inside a loop: [(success,result) = address(this).delegatecall(data[i])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L160)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183

**Notes from the developers:**

This is intended behaviour and how the function is built to enable this feature.

## reentrancy-benign

- Impact: Low
- Confidence: Medium

Reentrancy in [LSP0ERC725AccountCore.renounceOwnership()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L604-L624):

External calls:

- [verifyAfter = \_verifyCall(\_owner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L614)

- [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25) State variables written after the call(s): - [LSP14Ownable2Step.\_renounceOwnership()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L617) - [delete \_pendingOwner](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L156) - [LSP14Ownable2Step.\_renounceOwnership()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L617) - [\_renounceOwnershipStartedAt = currentBlock](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L155) - [delete \_renounceOwnershipStartedAt](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L166)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L604-L624

Reentrancy in [LSP0ERC725AccountCore.transferOwnership(address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L508-L555):

External calls:

- [verifyAfter = \_verifyCall(currentOwner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L533)

- [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25) State variables written after the call(s): - [LSP14Ownable2Step.\_transferOwnership(\_pendingOwner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L536) - [\_pendingOwner = newOwner](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L127) - [LSP14Ownable2Step.\_transferOwnership(\_pendingOwner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L536) - [delete \_renounceOwnershipStartedAt](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L128)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L508-L555

## reentrancy-events

- Impact: Low
- Confidence: Medium

Reentrancy in [LSP0ERC725AccountCore.universalReceiver(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L428-L486): External calls: - [resultDefaultDelegate = universalReceiverDelegate.callUniversalReceiverWithCallerInfos(typeId,receivedData,msg.sender,msg.value)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L448-L454) - [resultTypeIdDelegate = universalReceiverDelegate_scope_0.callUniversalReceiverWithCallerInfos(typeId,receivedData,msg.sender,msg.value)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L474-L480) Event emitted after the call(s): - [UniversalReceiver(msg.sender,msg.value,typeId,receivedData,returnedValues)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L485)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L428-L486

**Notes from the developers:**

The `UniversalReceiver` event needs both `bytes` values returned by both external calls made to the default LSP1Delegate + the LSP1Delegate associated with a specific typeId. Both of these values after being returned are emitted in the `UniversalReceiver` event. Therefore because the UniversalReceiver emits these values, we cannot place the event before the external calls.

Reentrancy in [LSP0ERC725AccountCore.transferOwnership(address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L508-L555): External calls: - [verifyAfter = \_verifyCall(currentOwner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L533) - [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25) Event emitted after the call(s): - [OwnershipTransferStarted(currentOwner,\_pendingOwner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L537)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L508-L555

Reentrancy in [LSP0ERC725AccountCore.setDataBatch(bytes32[],bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L343-L389): External calls: - [verifyAfter = \_verifyCall(\_owner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L374) - [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25) Event emitted after the call(s): - [DataChanged(dataKey,dataValue)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L812-L815) - [\_setData(dataKeys[i_scope_0],dataValues[i_scope_0])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L377) - [DataChanged(dataKey,BytesLib.slice(dataValue,0,256))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L812-L815) - [\_setData(dataKeys[i_scope_0],dataValues[i_scope_0])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L377)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L343-L389

Reentrancy in [LSP0ERC725AccountCore.setData(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L304-L327): External calls: - [verifyAfter = \_verifyCall(\_owner)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L318) - [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25) Event emitted after the call(s): - [DataChanged(dataKey,dataValue)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L812-L815) - [\_setData(dataKey,dataValue)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L320) - [DataChanged(dataKey,BytesLib.slice(dataValue,0,256))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L812-L815) - [\_setData(dataKey,dataValue)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L320)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L304-L327

## assembly

- Impact: Informational
- Confidence: High

[LSP0ERC725AccountCore.\_fallbackLSP17Extendable()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L738-L776) uses assembly - [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L751-L775)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L738-L776

[LSP0ERC725AccountCore.batchCalls(bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183) uses assembly - [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L168-L171)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183

## low-level-calls

- Impact: Informational
- Confidence: High

Low level call in [LSP0ERC725AccountCore.isValidSignature(bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L680-L716):

- [(success,result) = \_owner.staticcall(abi.encodeWithSelector(IERC1271.isValidSignature.selector,dataHash,signature))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L690-L692)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L680-L716

Low level call in [LSP0ERC725AccountCore.batchCalls(bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183):

- [(success,result) = address(this).delegatecall(data[i])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L160)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L157-L183
