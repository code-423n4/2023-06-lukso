Summary

- [msg-value-loop](#msg-value-loop)
- [reentrancy-eth](#reentrancy-eth)
- [calls-loop](#calls-loop-1)
- [timestamp](#timestamp)
- [assembly](#assembly-1)
- [costly-loop](#costly-loop)
- [low-level-calls](#low-level-calls-2)
- [immutable-states](#immutable-states)

## msg-value-loop

- Impact: High
- Confidence: Medium

[LSP6KeyManagerCore.executeBatch(uint256[],bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L145-L175) use msg.value in a loop: [revert LSP6BatchInsufficientValueSent(uint256,uint256)(totalValues,msg.value)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L160)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L145-L175

[LSP6KeyManagerCore.executeBatch(uint256[],bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L145-L175) use msg.value in a loop: [(totalValues += values[ii]) > msg.value](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L159)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L145-L175

[LSP6KeyManagerCore.executeRelayCallBatch(bytes[],uint256[],uint256[],uint256[],bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L192-L234) use msg.value in a loop: [(totalValues += values[ii]) > msg.value](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L212)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L192-L234

[LSP6KeyManagerCore.executeRelayCallBatch(bytes[],uint256[],uint256[],uint256[],bytes[])](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L192-L234) use msg.value in a loop: [revert LSP6BatchInsufficientValueSent(uint256,uint256)(totalValues,msg.value)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L213)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L192-L234

## reentrancy-eth

- Impact: High
- Confidence: Medium

Reentrancy in [LSP6KeyManagerCore.\_execute(uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L300-L326): External calls:

- [result = \_executePayload(msgValue,payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L319)
  - [(success,returnData) = \_target.call{gas: gasleft()(),value: msgValue}(payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L401-L403) State variables written after the call(s):
- [\_nonReentrantAfter()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L322)
  - [\_reentrancyStatus = false](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L513) [LSP6KeyManagerCore.\_reentrancyStatus](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L83) can be used in cross function reentrancies:
- [LSP6KeyManagerCore.\_nonReentrantAfter()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L510-L514)
- [LSP6KeyManagerCore.\_nonReentrantBefore(bool,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L486-L504)
- [LSP6KeyManagerCore.lsp20VerifyCall(address,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L239-L283)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L300-L326

Reentrancy in [LSP6KeyManagerCore.\_executeRelayCall(bytes,uint256,uint256,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L328-L389): External calls:

- [result = \_executePayload(msgValue,payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L382)
  - [(success,returnData) = \_target.call{gas: gasleft()(),value: msgValue}(payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L401-L403) State variables written after the call(s):
- [\_nonReentrantAfter()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L385)
  - [\_reentrancyStatus = false](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L513) [LSP6KeyManagerCore.\_reentrancyStatus](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L83) can be used in cross function reentrancies:
- [LSP6KeyManagerCore.\_nonReentrantAfter()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L510-L514)
- [LSP6KeyManagerCore.\_nonReentrantBefore(bool,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L486-L504)
- [LSP6KeyManagerCore.lsp20VerifyCall(address,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L239-L283)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L328-L389

## calls-loop

- Impact: Low
- Confidence: Medium

[LSP6SetDataModule.\_getPermissionToSetLSP1Delegate(address,bytes32)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L420-L428) has external calls inside a loop: [ERC725Y(controlledContract).getData(lsp1DelegateDataKey).length == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L424-L427)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L420-L428

[LSP6Utils.getPermissionsFor(IERC725Y,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L23-L32) has external calls inside a loop: [permissions = target.getData(LSP2Utils.generateMappingWithGroupingKey(\_LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX,bytes20(caller)))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L24-L29)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L23-L32

[LSP6SetDataModule.\_getPermissionToSetLSP17Extension(address,bytes32)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L436-L444) has external calls inside a loop: [ERC725Y(controlledContract).getData(lsp17ExtensionDataKey).length == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L440-L443)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L436-L444

[LSP6SetDataModule.\_getPermissionToSetControllerPermissions(address,bytes32)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L333-L343) has external calls inside a loop: [bytes32(ERC725Y(controlledContract).getData(inputPermissionDataKey)) == bytes32(0)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L337-L342)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L333-L343

[LSP6Utils.getAllowedERC725YDataKeysFor(IERC725Y,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L54-L66) has external calls inside a loop: [target.getData(LSP2Utils.generateMappingWithGroupingKey(\_LSP6KEY_ADDRESSPERMISSIONS_AllowedERC725YDataKeys_PREFIX,bytes20(caller)))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L59-L65)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L54-L66

[LSP6SetDataModule.\_getPermissionToSetAllowedERC725YDataKeys(address,bytes32,bytes,bool)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L384-L410) has external calls inside a loop: [ERC725Y(controlledContract).getData(dataKey).length == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L406-L409)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L384-L410

[LSP6SetDataModule.\_getPermissionToSetPermissionsArray(address,bytes32,bytes,bool)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L290-L325) has external calls inside a loop: [newLength > uint128(bytes16(ERC725Y(controlledContract).getData(inputDataKey)))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L304-L307)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L290-L325

[LSP6SetDataModule.\_getPermissionToSetAllowedCalls(address,bytes32,bytes,bool)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L352-L375) has external calls inside a loop: [ERC725Y(controlledContract).getData(dataKey).length == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L371-L374)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L352-L375

[LSP6Utils.getAllowedCallsFor(IERC725Y,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L34-L46) has external calls inside a loop: [target.getData(LSP2Utils.generateMappingWithGroupingKey(\_LSP6KEY_ADDRESSPERMISSIONS_ALLOWEDCALLS_PREFIX,bytes20(from)))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L39-L45)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Utils.sol#L34-L46

[LSP6SetDataModule.\_getPermissionToSetPermissionsArray(address,bytes32,bytes,bool)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L290-L325) has external calls inside a loop: [ERC725Y(controlledContract).getData(inputDataKey).length == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L321-L324)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L290-L325

[LSP6KeyManagerCore.\_executePayload(uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L396-L411) has external calls inside a loop: [(success,returnData) = \_target.call{gas: gasleft()(),value: msgValue}(payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L401-L403)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L396-L411

## timestamp

- Impact: Low
- Confidence: Medium

[LSP6KeyManagerCore.\_executeRelayCall(bytes,uint256,uint256,uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L328-L389) uses timestamp for comparisons Dangerous comparisons:

- [block.timestamp < startingTimestamp](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L371)
- [block.timestamp > endingTimestamp](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L374)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L328-L389

## assembly

- Impact: Informational
- Confidence: High

[LSP6SetDataModule.\_verifyAllowedERC725YDataKeys(address,bytes32[],bytes,bool[],uint256)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L563-L708) uses assembly

- [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L651-L657)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L563-L708

[LSP6SetDataModule.\_verifyAllowedERC725YSingleKey(address,bytes32,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L452-L553) uses assembly

- [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L535-L542)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol#L452-L553

## costly-loop

- Impact: Informational
- Confidence: Medium

[LSP6KeyManagerCore.\_nonReentrantAfter()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L510-L514) has costly operations inside a loop:

- [\_reentrancyStatus = false](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L513)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L510-L514

[LSP6KeyManagerCore.\_nonReentrantBefore(bool,address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L486-L504) has costly operations inside a loop:

- [\_reentrancyStatus = true](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L501)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L486-L504

## low-level-calls

- Impact: Informational
- Confidence: High

Low level call in [LSP6KeyManagerCore.\_executePayload(uint256,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L396-L411):

- [(success,returnData) = \_target.call{gas: gasleft()(),value: msgValue}(payload)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L401-L403)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L396-L411

## immutable-states

- Impact: Optimization
- Confidence: High

[LSP6KeyManagerCore.\_target](https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L79) should be immutable

https://github.com/code-423n4/2023-06-lukso/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol#L79

**Notes from the developers:**

We currently cannot make this optimization because both the standard version (with `constructor`) and the Init version (with `initalize(...)` function) uses the `LSP6KeyManagerCore` contract. Therefore this has to be a state variable not an `immutable` to allow compatibility with the Init version.

We are planning to separate both types of contracts (constructor vs proxy version) between two repositories. Once the contracts will be separated between two repos, we will be able to implement this optimisation in our “standard” contract version with `constructor`.
