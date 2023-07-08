# Report


## Non Critical Issues


| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Missing checks for `address(0)` when assigning values to address state variables | 15 |
| [NC-2](#NC-2) | Constants in comparisons should appear on the left side | 33 |
| [NC-3](#NC-3) | Lines are too long | 11 |
| [NC-4](#NC-4) |  `require()` / `revert()` statements should have descriptive reason strings | 1 |
| [NC-5](#NC-5) | Event is missing `indexed` fields | 17 |
| [NC-6](#NC-6) | Constants should be defined rather than using magic numbers | 4 |
| [NC-7](#NC-7) | Functions not used internally could be marked external | 114 |
### <a name="NC-1"></a>[NC-1] Missing checks for `address(0)` when assigning values to address state variables

*Instances (15)*:
```solidity
File: LSP9Vault/LSP9VaultCore.sol

409:                 _reentrantDelegate = universalReceiverDelegate;

438:                 _reentrantDelegate = universalReceiverDelegate;

```

```solidity
File: Mocks/ImplementationTester.sol

12:         _owner = newOwner;

```

```solidity
File: Mocks/LSP20Owners/FallbackReturnMagicValue.sol

31:         target = newTarget;

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnExpandedInvalidValue.sol

30:         target = newTarget;

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnInvalidMagicValue.sol

30:         target = newTarget;

```

```solidity
File: Mocks/LSP20Owners/ImplementingFallback.sol

22:         target = newTarget;

```

```solidity
File: Mocks/LSP20Owners/NotImplementingVerifyCall.sol

15:         target = newTarget;

```

```solidity
File: Mocks/Reentrancy/LSP20ReentrantContract.sol

30:         _newControllerAddress = _newControllerAddress_;

32:         _newURDAddress = _newURDAddress_;

```

```solidity
File: Mocks/Reentrancy/ThreeReentrancy.sol

27:         universalProfile = _universalProfile;

47:         universalProfile = _universalProfile;

64:         keyManager = _keyManager;

92:         keyManager = _keyManager;

```

```solidity
File: Mocks/Security/Reentrancy.sol

13:         _target = _keyManager;

```

### <a name="NC-2"></a>[NC-2] Constants in comparisons should appear on the left side
Constants should appear on the left side of comparisons, to avoid accidental assignment

*Instances (33)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

751:                 result.length == 32 &&

```

```solidity
File: LSP14Ownable2Step/LSP14Ownable2Step.sol

161:             _renounceOwnershipStartedAt == 0

```

```solidity
File: LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol

170:                 if (balance == 0) return "LSP1: balance not updated";

227:             if (dataKeys.length == 0 && dataValues.length == 0)

227:             if (dataKeys.length == 0 && dataValues.length == 0)

245:             if (dataKeys.length == 0 && dataValues.length == 0)

245:             if (dataKeys.length == 0 && dataValues.length == 0)

```

```solidity
File: LSP20CallVerification/LSP20CallVerification.sol

42:         return bytes1(magicValue[3]) == 0x01 ? true : false;

```

```solidity
File: LSP2ERC725YJSONSchema/LSP2Utils.sol

38:             dataKey[dataKey.length - 2] == 0x5b && // "[" in utf8 encoded

39:                 dataKey[dataKey.length - 1] == 0x5d, // "]" in utf8

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol

262:         if (allowedCalls.length == 0) {

362:             executeCalldata.length == 164

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol

374:             ERC725Y(controlledContract).getData(inputDataKey).length == 0

426:             ERC725Y(controlledContract).getData(dataKey).length == 0

461:             ERC725Y(controlledContract).getData(dataKey).length == 0

479:             ERC725Y(controlledContract).getData(lsp1DelegateDataKey).length == 0

512:         if (allowedERC725YDataKeysCompacted.length == 0)

629:         if (allowedERC725YDataKeysCompacted.length == 0)

```

```solidity
File: LSP6KeyManager/LSP6Utils.sol

137:             if (elementLength == 0 || elementLength > 32) return false;

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CappedSupply.sol

24:         if (tokenSupplyCap_ == 0) {

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol

24:         if (tokenSupplyCap_ == 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol

26:         if (tokenSupplyCap_ == 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol

26:         if (tokenSupplyCap_ == 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

129:         if (operatorListLength == 0) {

324:                 if (reason.length == 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

129:         if (operatorListLength == 0) {

324:                 if (reason.length == 0) {

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultMalicious.sol

48:             if (data[0] == 0x00) {

58:             } else if (data[0] == 0x01) {

68:             } else if (data[0] == 0x02) {

77:             if (data[0] == 0x00) {

97:             } else if (data[0] == 0x01) {

117:             } else if (data[0] == 0x02) {

```

### <a name="NC-3"></a>[NC-3] Lines are too long
Recommended by solidity docs to keep lines to 120 characters or lesser

*Instances (11)*:
```solidity
File: LSP0ERC725Account/LSP0Constants.sol

18: bytes32 constant _TYPEID_LSP0_OwnershipTransferred_SenderNotification = 0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814;

21: bytes32 constant _TYPEID_LSP0_OwnershipTransferred_RecipientNotification = 0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538;

```

```solidity
File: LSP14Ownable2Step/LSP14Constants.sol

9: bytes32 constant _TYPEID_LSP14_OwnershipTransferStarted = 0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0;

12: bytes32 constant _TYPEID_LSP14_OwnershipTransferred_SenderNotification = 0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c;

15: bytes32 constant _TYPEID_LSP14_OwnershipTransferred_RecipientNotification = 0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c;

```

```solidity
File: LSP6KeyManager/LSP6Constants.sol

23: bytes10 constant _LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX = 0x4b80742de2bf82acb363; // AddressPermissions:Permissions:<address> --> bytes32

26: bytes10 constant _LSP6KEY_ADDRESSPERMISSIONS_AllowedERC725YDataKeys_PREFIX = 0x4b80742de2bf866c2911; // AddressPermissions:AllowedERC725YDataKeys:<address> --> bytes[CompactBytesArray]

29: bytes10 constant _LSP6KEY_ADDRESSPERMISSIONS_ALLOWEDCALLS_PREFIX = 0x4b80742de2bf393a64c7; // AddressPermissions:AllowedCalls:<address>

```

```solidity
File: LSP9Vault/LSP9Constants.sol

18: bytes32 constant _TYPEID_LSP9_OwnershipTransferStarted = 0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f;

21: bytes32 constant _TYPEID_LSP9_OwnershipTransferred_SenderNotification = 0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471;

24: bytes32 constant _TYPEID_LSP9_OwnershipTransferred_RecipientNotification = 0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c;

```

### <a name="NC-4"></a>[NC-4]  `require()` / `revert()` statements should have descriptive reason strings

*Instances (1)*:
```solidity
File: Mocks/FallbackExtensions/ReenterAccountExtension.sol

11:         require(success);

```

### <a name="NC-5"></a>[NC-5] Event is missing `indexed` fields
Index event fields make the field more quickly accessible to off-chain tools that parse events. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Each event should use three indexed fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three fields, all of the fields should be indexed.

*Instances (17)*:
```solidity
File: LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol

19:     event Transfer(address indexed from, address indexed to, uint256 value);

28:     event Approval(

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol

47:     event ApprovalForAll(

```

```solidity
File: Mocks/FallbackExtensions/GraffitiEventExtension.sol

8:     event GraffitiDataReceived(bytes graffitiData);

```

```solidity
File: Mocks/LSP20Owners/FallbackReturnMagicValue.sol

15:     event FallbackCalled(bytes data);

```

```solidity
File: Mocks/LSP20Owners/ImplementingFallback.sol

12:     event FallbackCalled(bytes data);

```

```solidity
File: Mocks/Reentrancy/LSP20ReentrantContract.sol

17:     event ValueReceived(uint256);

```

```solidity
File: Mocks/Reentrancy/ReentrantContract.sol

12:     event ValueReceived(uint256);

```

```solidity
File: Mocks/Tokens/IERC223.sol

47:     event Transfer(address indexed from, address indexed to, uint256 value);

53:     event TransferData(bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1.sol

18:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721Received.sol

25:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedInvalid.sol

25:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedRevert.sol

25:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721Received.sol

13:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedInvalid.sol

13:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedRevert.sol

13:     event UniversalReceiverCalled(bytes32 typeId, bytes data);

```

### <a name="NC-6"></a>[NC-6] Constants should be defined rather than using magic numbers

*Instances (4)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

815:             mstore(calldatasize(), shl(96, caller()))

```

```solidity
File: LSP17ContractExtension/LSP17Extendable.sol

102:             mstore(calldatasize(), shl(96, caller()))

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

156:             mstore(calldatasize(), shl(96, caller()))

```

```solidity
File: Mocks/Reentrancy/ReentrantContract.sol

41:             bytes.concat(bytes32(uint256(16)))

```

### <a name="NC-7"></a>[NC-7] Functions not used internally could be marked external

*Instances (114)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

171:     function batchCalls(

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

87:     function target() public view returns (address) {

107:     function getNonce(

118:     function isValidSignature(

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7Burnable.sol

17:     function burn(address from, uint256 amount, bytes memory data) public {

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol

19:     function burn(address from, uint256 amount, bytes memory data) public {

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol

13:     function mint(

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol

23:     function mint(

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol

16:     function burn(bytes32 tokenId, bytes memory data) public {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol

27:     function tokenAt(uint256 index) public view returns (bytes32) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol

29:     function tokenAt(uint256 index) public view returns (bytes32) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol

13:     function mint(

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol

23:     function mint(

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

234:     function batchCalls(

```

```solidity
File: Mocks/ERC165Interfaces.sol

79:     function calculateInterfaceLSP0() public pure returns (bytes4) {

98:     function calculateInterfaceLSP1() public pure returns (bytes4) {

108:     function calculateInterfaceLSP6KeyManager() public pure returns (bytes4) {

118:     function calculateInterfaceLSP7() public pure returns (bytes4) {

128:     function calculateInterfaceLSP8() public pure returns (bytes4) {

138:     function calculateInterfaceLSP9() public pure returns (bytes4) {

181:     function calculateInterfaceLSP17Extension() public pure returns (bytes4) {

192:     function calculateInterfaceLSP20CallVerification()

207:     function calculateInterfaceLSP20CallVerifier()

227:     function calculateInterfaceERC223() public pure returns (bytes4) {

231:     function calculateInterfaceERC20() public pure returns (bytes4) {

235:     function calculateInterfaceERC721() public pure returns (bytes4) {

239:     function calculateInterfaceERC721Metadata() public pure returns (bytes4) {

243:     function calculateInterfaceERC777() public pure returns (bytes4) {

247:     function calculateInterfaceERC1155() public pure returns (bytes4) {

251:     function calculateInterfaceERC1271() public pure returns (bytes4) {

260:     function supportsERC165InterfaceUnchecked(

```

```solidity
File: Mocks/Executor.sol

39:     function setHardcodedKey() public returns (bytes memory) {

52:     function setComputedKey() public returns (bytes memory) {

65:     function setComputedKeyFromParams(

78:     function sendOneLyxHardcoded() public returns (bytes memory) {

92:     function sendOneLyxToRecipient(

111:     function setHardcodedKeyRawCall() public returns (bool) {

130:     function setComputedKeyRawCall() public returns (bool) {

149:     function setComputedKeyFromParamsRawCall(

168:     function sendOneLyxHardcodedRawCall() public returns (bool) {

188:     function sendOneLyxToRecipientRawCall(

```

```solidity
File: Mocks/ExecutorLSP20.sol

37:     function setHardcodedKey() public returns (bytes memory) {

45:     function setComputedKey() public returns (bytes memory) {

53:     function setComputedKeyFromParams(

61:     function sendOneLyxHardcoded() public returns (bytes memory) {

73:     function sendOneLyxToRecipient(

85:     function setHardcodedKeyRawCall() public returns (bool) {

99:     function setComputedKeyRawCall() public returns (bool) {

113:     function setComputedKeyFromParamsRawCall(

127:     function sendOneLyxHardcodedRawCall() public returns (bool) {

142:     function sendOneLyxToRecipientRawCall(

```

```solidity
File: Mocks/FallbackExtensions/CheckerExtension.sol

13:     function checkMsgVariable(

```

```solidity
File: Mocks/FallbackExtensions/ReenterAccountExtension.sol

8:     function reenterAccount(bytes memory payload) public {

```

```solidity
File: Mocks/FallbackExtensions/TransferExtension.sol

10:     function transfer(uint256 amount) public {

```

```solidity
File: Mocks/GenericExecutor.sol

8:     function call(

```

```solidity
File: Mocks/KeyManager/ERC725YDelegateCall.sol

11:     function updateStorage(bytes32 key, bytes memory value) public {

```

```solidity
File: Mocks/KeyManager/KeyManagerInternalsTester.sol

21:     function getPermissionsFor(address _address) public view returns (bytes32) {

25:     function getAllowedCallsFor(

31:     function getAllowedERC725YDataKeysFor(

37:     function verifyAllowedCall(

44:     function isCompactBytesArrayOfAllowedCalls(

50:     function isCompactBytesArrayOfAllowedERC725YDataKeys(

58:     function verifyCanSetData(

73:     function verifyAllowedERC725YSingleKey(

85:     function verifyAllowedERC725YDataKeys(

101:     function hasPermission(

108:     function extractExecuteParameters(

```

```solidity
File: Mocks/KeyManager/TargetPayableContract.sol

7:     function updateState(uint256 newValue) public payable {

```

```solidity
File: Mocks/LSP2UtilsLibraryTester.sol

9:     function isEncodedArray(bytes memory data) public pure returns (bool) {

13:     function isCompactBytesArray(bytes memory data) public pure returns (bool) {

```

```solidity
File: Mocks/MaliciousERC1271Wallet.sol

14:     function isValidSignature(

```

```solidity
File: Mocks/PayableContract.sol

10:     function payableTrue() public payable {}

12:     function payableFalse() public {}

```

```solidity
File: Mocks/Reentrancy/ThreeReentrancy.sol

31:     function firstTarget() public {

50:     function secondTarget() public {

68:     function firstTarget() public {

95:     function secondTarget() public {

```

```solidity
File: Mocks/Security/Reentrancy.sol

16:     function loadPayload(bytes memory _dataPayload) public {

```

```solidity
File: Mocks/TargetContract.sol

13:     function getNumber() public view returns (uint256) {

17:     function setNumber(uint256 newNumber) public {

21:     function getName() public view returns (string memory) {

25:     function setName(string memory name) public {

29:     function setNamePayable(string memory name) public payable {

34:     function revertCall() public pure {

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyInitTester.sol

24:     function mint(address to, uint256 amount) public {

29:     function burn(address from, uint256 amount) public {

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyTester.sol

22:     function mint(address to, uint256 amount) public {

27:     function burn(address from, uint256 amount) public {

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20InitTester.sol

19:     function initialize(

27:     function mint(address to, uint256 amount, bytes calldata data) public {

32:     function burn(address from, uint256 amount, bytes calldata data) public {

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20Tester.sol

18:     function mint(address to, uint256 amount, bytes calldata data) public {

23:     function burn(address from, uint256 amount, bytes calldata data) public {

```

```solidity
File: Mocks/Tokens/LSP7InitTester.sol

17:     function initialize(

31:     function mint(

```

```solidity
File: Mocks/Tokens/LSP7Tester.sol

15:     function mint(

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyInitTester.sol

28:     function mint(address to, bytes32 tokenId) public {

32:     function burn(bytes32 tokenId) public {

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyTester.sol

24:     function mint(address to, bytes32 tokenId) public {

28:     function burn(bytes32 tokenId) public {

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721Tester.sol

28:     function mint(address to, uint256 tokenId, bytes calldata data) public {

33:     function burn(uint256 tokenId, bytes calldata data) public {

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721TesterInit.sol

37:     function mint(address to, uint256 tokenId, bytes calldata data) public {

42:     function burn(uint256 tokenId, bytes calldata data) public {

```

```solidity
File: Mocks/Tokens/LSP8EnumerableTester.sol

20:     function mint(address to, bytes32 tokenId) public {

24:     function burn(bytes32 tokenId) public {

```

```solidity
File: Mocks/Tokens/LSP8InitTester.sol

17:     function initialize(

29:     function mint(

```

```solidity
File: Mocks/Tokens/LSP8Tester.sol

20:     function mint(

```

```solidity
File: Mocks/Tokens/RequireCallbackToken.sol

13:     function mint(address to) public {

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedInvalid.sol

44:     function onERC721Received(

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedRevert.sol

44:     function onERC721Received(

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedInvalid.sol

19:     function onERC721Received(

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedRevert.sol

19:     function onERC721Received(

```


## Low Issues


| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) |  `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()` | 7 |
| [L-2](#L-2) | Empty Function Body - Consider commenting why | 40 |
| [L-3](#L-3) | Initializers could be front-run | 77 |
| [L-4](#L-4) | ERC20 tokens that do not implement optional decimals method cannot be used | 3 |
| [L-5](#L-5) | _safeMint() should be used rather than _mint() | 41 |
### <a name="L-1"></a>[L-1]  `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()`
Use `abi.encode()` instead which will pad items to 32 bytes, which will [prevent hash collisions](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#non-standard-packed-mode) (e.g. `abi.encodePacked(0x123,0x456)` => `0x123456` => `abi.encodePacked(0x1,0x23456)`, but `abi.encode(0x123,0x456)` => `0x0...1230...456`). "Unless there is a compelling reason, `abi.encode` should be preferred". If there is only one argument to `abi.encodePacked()` it can often be cast to `bytes()` or `bytes32()` [instead](https://ethereum.stackexchange.com/questions/30912/how-to-compare-strings-in-solidity#answer-82739).
If all arguments are strings and or bytes, `bytes.concat()` should be used instead

*Instances (7)*:
```solidity
File: LSP20CallVerification/LSP20CallVerification.sol

56:                 keccak256(abi.encodePacked(msg.sender, msg.value, msg.data)),

```

```solidity
File: Mocks/Executor.sol

53:         bytes32 key = keccak256(abi.encodePacked("Some Key"));

131:         bytes32 key = keccak256(abi.encodePacked("Some Key"));

```

```solidity
File: Mocks/ExecutorLSP20.sol

46:         bytes32 key = keccak256(abi.encodePacked("Some Key"));

100:         bytes32 key = keccak256(abi.encodePacked("Some Key"));

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultMalicious.sol

47:         if (typeId == keccak256(abi.encodePacked("setData"))) {

76:         } else if (typeId == keccak256(abi.encodePacked("setData[]"))) {

```

### <a name="L-2"></a>[L-2] Empty Function Body - Consider commenting why

*Instances (40)*:
```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

446:     ) internal virtual {}

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol

36:     ) LSP7DigitalAsset(name_, symbol_, newOwner_, false) {}

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol

11:     ) LSP7CompatibleERC20(name_, symbol_, newOwner_) {}

```

```solidity
File: LSP7DigitalAsset/presets/LSP7Mintable.sol

29:     ) LSP7DigitalAsset(name_, symbol_, newOwner_, isNonDivisible_) {}

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol

40:     ) LSP4DigitalAssetMetadata(name_, symbol_, newOwner_) {}

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

448:     ) internal virtual {}

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

71:     ) LSP8IdentifiableDigitalAsset(name_, symbol_, newOwner_) {}

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol

11:     ) LSP8CompatibleERC721(name_, symbol_, newOwner_) {}

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol

27:     ) LSP8IdentifiableDigitalAsset(name_, symbol_, newOwner_) {}

```

```solidity
File: Mocks/KeyManager/ERC725YDelegateCall.sol

9:     constructor(address newOwner) ERC725Y(newOwner) {}

```

```solidity
File: Mocks/KeyManager/KeyManagerInternalsTester.sol

19:     constructor(address _account) LSP6KeyManager(_account) {}

```

```solidity
File: Mocks/NonPayableFallback.sol

6:     fallback() external {}

```

```solidity
File: Mocks/PayableContract.sol

8:     constructor() payable {}

10:     function payableTrue() public payable {}

12:     function payableFalse() public {}

```

```solidity
File: Mocks/Reentrancy/BatchReentrancyRelayer.sol

28:     receive() external payable {}

```

```solidity
File: Mocks/Reentrancy/SingleReentrancyRelayer.sol

25:     receive() external payable {}

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyTester.sol

20:     {}

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20Tester.sol

16:     ) LSP7CompatibleERC20(name_, symbol_, newOwner_) {}

```

```solidity
File: Mocks/Tokens/LSP7Tester.sol

13:     ) LSP7DigitalAsset(name, symbol, newOwner, false) {}

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyTester.sol

22:     {}

```

```solidity
File: Mocks/Tokens/LSP8EnumerableTester.sol

18:     ) LSP8IdentifiableDigitalAsset(name, symbol, newOwner) {}

```

```solidity
File: Mocks/Tokens/LSP8Tester.sol

18:     ) LSP8IdentifiableDigitalAsset(name, symbol, newOwner) {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1.sol

33:     receive() external payable {}

35:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721Received.sol

31:     receive() external payable {}

33:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedInvalid.sol

31:     receive() external payable {}

33:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedRevert.sol

31:     receive() external payable {}

33:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1.sol

5:     receive() external payable {}

7:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721Received.sol

15:     receive() external payable {}

17:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedInvalid.sol

15:     receive() external payable {}

17:     fallback() external payable {}

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedRevert.sol

15:     receive() external payable {}

17:     fallback() external payable {}

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverTester.sol

48:     receive() external payable {}

```

### <a name="L-3"></a>[L-3] Initializers could be front-run
Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment

*Instances (77)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountInit.sol

62:     function initialize(

64:     ) external payable virtual initializer {

65:         LSP0ERC725AccountInitAbstract._initialize(initialOwner);

```

```solidity
File: LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol

59:     function _initialize(

```

```solidity
File: LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol

27:     function _initialize(

32:         ERC725YInitAbstract._initialize(newOwner_);

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerInit.sol

24:     function initialize(address target_) external virtual initializer {

24:     function initialize(address target_) external virtual initializer {

25:         LSP6KeyManagerInitAbstract._initialize(target_);

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerInitAbstract.sol

20:     function _initialize(address target_) internal virtual onlyInitializing {

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol

28:     function _initialize(

35:         LSP4DigitalAssetMetadataInitAbstract._initialize(

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol

21:     function _initialize(

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol

33:     function _initialize(

38:         LSP7DigitalAssetInitAbstract._initialize(

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol

25:     function initialize(

29:     ) external virtual initializer {

30:         LSP7CompatibleERC20MintableInitAbstract._initialize(

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol

15:     function _initialize(

20:         LSP7CompatibleERC20InitAbstract._initialize(name_, symbol_, newOwner_);

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInit.sol

26:     function initialize(

31:     ) external virtual initializer {

32:         LSP7MintableInitAbstract._initialize(

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol

20:     function _initialize(

26:         LSP7DigitalAssetInitAbstract._initialize(

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol

30:     function _initialize(

35:         LSP4DigitalAssetMetadataInitAbstract._initialize(

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol

23:     function _initialize(

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

61:     function _initialize(

66:         LSP8IdentifiableDigitalAssetInitAbstract._initialize(

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol

25:     function initialize(

29:     ) external virtual initializer {

30:         LSP8CompatibleERC721MintableInitAbstract._initialize(

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol

15:     function _initialize(

20:         LSP8CompatibleERC721InitAbstract._initialize(name_, symbol_, newOwner_);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol

25:     function initialize(

29:     ) external virtual initializer {

30:         LSP8MintableInitAbstract._initialize(name_, symbol_, newOwner_);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol

19:     function _initialize(

24:         LSP8IdentifiableDigitalAssetInitAbstract._initialize(

```

```solidity
File: LSP9Vault/LSP9VaultInit.sol

25:     function initialize(address newOwner) external payable virtual initializer {

25:     function initialize(address newOwner) external payable virtual initializer {

26:         LSP9VaultInitAbstract._initialize(newOwner);

```

```solidity
File: LSP9Vault/LSP9VaultInitAbstract.sol

39:     function _initialize(address newOwner) internal virtual onlyInitializing {

```

```solidity
File: Mocks/FallbackInitializer.sol

11:         _initialize();

15:         _initialize();

18:     function _initialize() internal {

```

```solidity
File: Mocks/ImplementationTester.sol

11:     function initialize(address newOwner) public virtual initializer {

11:     function initialize(address newOwner) public virtual initializer {

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyInitTester.sol

14:     function initialize(

19:     ) public virtual initializer {

20:         LSP7DigitalAssetInitAbstract._initialize(name, symbol, newOwner, true);

21:         LSP7CappedSupplyInitAbstract._initialize(tokenSupplyCap);

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20InitTester.sol

19:     function initialize(

23:     ) public initializer {

24:         LSP7CompatibleERC20InitAbstract._initialize(name_, symbol_, newOwner_);

```

```solidity
File: Mocks/Tokens/LSP7InitTester.sol

17:     function initialize(

22:     ) public initializer {

23:         LSP7DigitalAssetInitAbstract._initialize(

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyInitTester.sol

14:     function initialize(

19:     ) public virtual initializer {

20:         LSP8IdentifiableDigitalAssetInitAbstract._initialize(

25:         LSP8CappedSupplyInitAbstract._initialize(tokenSupplyCap_);

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721TesterInit.sol

26:     function initialize(

31:     ) public virtual initializer {

32:         LSP8CompatibleERC721InitAbstract._initialize(name_, symbol_, newOwner_);

```

```solidity
File: Mocks/Tokens/LSP8EnumerableInitTester.sol

14:     function initialize(

18:     ) public virtual initializer {

19:         LSP8IdentifiableDigitalAssetInitAbstract._initialize(

```

```solidity
File: Mocks/Tokens/LSP8InitTester.sol

17:     function initialize(

21:     ) public initializer {

22:         LSP8IdentifiableDigitalAssetInitAbstract._initialize(

```

```solidity
File: UniversalProfileInit.sol

34:     function initialize(

36:     ) external payable virtual initializer {

37:         UniversalProfileInitAbstract._initialize(initialOwner);

```

```solidity
File: UniversalProfileInitAbstract.sol

27:     function _initialize(

30:         LSP0ERC725AccountInitAbstract._initialize(initialOwner);

```

### <a name="L-4"></a>[L-4] ERC20 tokens that do not implement optional decimals method cannot be used
Underlying token that does not implement optional decimals method cannot be used 
 
 > [EIP-20](https://eips.ethereum.org/EIPS/eip-20#decimals) OPTIONAL - This method can be used to improve usability, but interfaces and other contracts MUST NOT expect these values to be present.

*Instances (3)*:
```solidity
File: LSP7DigitalAsset/ILSP7DigitalAsset.sol

65:     function decimals() external view returns (uint8);

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

54:     function decimals() public view virtual returns (uint8) {

```

```solidity
File: Mocks/Tokens/IERC223.sol

16:     function decimals() public view virtual returns (uint8);

```

### <a name="L-5"></a>[L-5] _safeMint() should be used rather than _mint()
_mint() is discouraged in favor of _safeMint() which ensures that the recipient is either an EOA or implements IERC721Receiver. Both OpenZeppelin and solmate have versions of this function

*Instances (41)*:
```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

294:     function _mint(

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CappedSupply.sol

53:     function _mint(

63:         super._mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol

53:     function _mint(

63:         super._mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol

127:     function _mint(

134:         super._mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol

135:     function _mint(

142:         super._mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol

19:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol

29:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/presets/LSP7Mintable.sol

40:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol

43:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

313:     function _mint(

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol

56:     function _mint(

66:         super._mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol

56:     function _mint(

66:         super._mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

259:     function _mint(

266:         super._mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

259:     function _mint(

266:         super._mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol

19:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol

29:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol

38:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol

40:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyInitTester.sol

26:         _mint(to, amount, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyTester.sol

24:         _mint(to, amount, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20InitTester.sol

29:         _mint(to, amount, true, data);

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20Tester.sol

20:         _mint(to, amount, true, data);

```

```solidity
File: Mocks/Tokens/LSP7InitTester.sol

37:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: Mocks/Tokens/LSP7MintWhenDeployed.sol

12:         _mint(newOwner, 1_000, true, "");

```

```solidity
File: Mocks/Tokens/LSP7Tester.sol

21:         _mint(to, amount, allowNonLSP1Recipient, data);

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyInitTester.sol

29:         _mint(to, tokenId, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyTester.sol

25:         _mint(to, tokenId, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721Tester.sol

30:         _mint(to, bytes32(tokenId), true, data);

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721TesterInit.sol

39:         _mint(to, bytes32(tokenId), true, data);

```

```solidity
File: Mocks/Tokens/LSP8EnumerableInitTester.sol

27:         _mint(to, tokenId, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP8EnumerableTester.sol

21:         _mint(to, tokenId, true, "token printer go brrr");

```

```solidity
File: Mocks/Tokens/LSP8InitTester.sol

35:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```

```solidity
File: Mocks/Tokens/LSP8Tester.sol

26:         _mint(to, tokenId, allowNonLSP1Recipient, data);

```


## Medium Issues


| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | Centralization Risk for trusted owners | 34 |
### <a name="M-1"></a>[M-1] Centralization Risk for trusted owners

#### Impact:
Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.

*Instances (34)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

102:     LSP14Ownable2Step,

559:     ) public virtual override(LSP14Ownable2Step, OwnableUnset) {

658:         override(LSP14Ownable2Step, OwnableUnset)

```

```solidity
File: LSP14Ownable2Step/ILSP14Ownable2Step.sol

7: interface ILSP14Ownable2Step {

```

```solidity
File: LSP14Ownable2Step/LSP14Ownable2Step.sol

32: abstract contract LSP14Ownable2Step is ILSP14Ownable2Step, OwnableUnset {

32: abstract contract LSP14Ownable2Step is ILSP14Ownable2Step, OwnableUnset {

68:     ) public virtual override(OwnableUnset, ILSP14Ownable2Step) onlyOwner {

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol

18:     ) public onlyOwner {

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol

28:     ) public onlyOwner {

```

```solidity
File: LSP7DigitalAsset/presets/LSP7Mintable.sol

39:     ) public virtual onlyOwner {

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol

42:     ) public virtual onlyOwner {

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol

18:     ) public onlyOwner {

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol

28:     ) public onlyOwner {

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol

37:     ) public virtual onlyOwner {

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol

39:     ) public virtual onlyOwner {

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

75:     LSP14Ownable2Step,

281:     ) public payable virtual override onlyOwner returns (bytes memory) {

296:     ) public payable virtual override onlyOwner returns (bytes[] memory) {

473:     ) public virtual override(LSP14Ownable2Step, OwnableUnset) onlyOwner {

473:     ) public virtual override(LSP14Ownable2Step, OwnableUnset) onlyOwner {

521:         override(LSP14Ownable2Step, OwnableUnset)

```

```solidity
File: Mocks/ERC165Interfaces.sol

42:     ILSP14Ownable2Step as ILSP14

```

```solidity
File: Mocks/LSP20Owners/FallbackReturnMagicValue.sol

32:         ILSP14Ownable2Step(target).acceptOwnership();

36:         ILSP14Ownable2Step(target).transferOwnership(newOwner);

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnExpandedInvalidValue.sol

31:         ILSP14Ownable2Step(target).acceptOwnership();

35:         ILSP14Ownable2Step(target).transferOwnership(newOwner);

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnInvalidMagicValue.sol

31:         ILSP14Ownable2Step(target).acceptOwnership();

35:         ILSP14Ownable2Step(target).transferOwnership(newOwner);

```

```solidity
File: Mocks/LSP20Owners/ImplementingFallback.sol

23:         ILSP14Ownable2Step(target).acceptOwnership();

27:         ILSP14Ownable2Step(target).transferOwnership(newOwner);

```

```solidity
File: Mocks/LSP20Owners/NotImplementingVerifyCall.sol

16:         ILSP14Ownable2Step(target).acceptOwnership();

20:         ILSP14Ownable2Step(target).transferOwnership(newOwner);

```

```solidity
File: Mocks/UPWithInstantAcceptOwnership.sol

39:             LSP14Ownable2Step(msg.sender).acceptOwnership();

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateDataUpdater.sol

40:             address keyManager = LSP14Ownable2Step(msg.sender).owner();

```

