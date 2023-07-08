# Report


## Gas Optimizations


| |Issue|Instances|
|-|:-|:-:|
| [GAS-1](#GAS-1) | Use assembly to check for `address(0)` | 36 |
| [GAS-2](#GAS-2) | Using bools for storage incurs overhead | 5 |
| [GAS-3](#GAS-3) | Cache array length outside of loop | 9 |
| [GAS-4](#GAS-4) | State variables should be cached in stack variables rather than re-reading them from storage | 1 |
| [GAS-5](#GAS-5) | Use calldata instead of memory for function arguments that do not get mutated | 166 |
| [GAS-6](#GAS-6) | Use Custom Errors | 7 |
| [GAS-7](#GAS-7) | Don't initialize variables with default value | 22 |
| [GAS-8](#GAS-8) | Functions guaranteed to revert when called by normal users can be marked `payable` | 2 |
| [GAS-9](#GAS-9) | `++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too) | 5 |
| [GAS-10](#GAS-10) | Using `private` rather than `public` for constants, saves gas | 2 |
| [GAS-11](#GAS-11) | Use != 0 instead of > 0 for unsigned integer comparison | 11 |
| [GAS-12](#GAS-12) | `internal` functions not called by the contract should be removed | 41 |
### <a name="GAS-1"></a>[GAS-1] Use assembly to check for `address(0)`
*Saves 6 gas per instance*

*Instances (36)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

801:         if (msg.sig == bytes4(0) && extension == address(0)) return;

801:         if (msg.sig == bytes4(0) && extension == address(0)) return;

804:         if (extension == address(0))

```

```solidity
File: LSP17ContractExtension/LSP17Extendable.sol

50:         if (erc165Extension == address(0)) return false;

91:         if (extension == address(0))

```

```solidity
File: LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol

116:         bool isMapValueSet = bytes20(notifierMapValue) != bytes20(0);

```

```solidity
File: LSP20CallVerification/LSP20CallVerification.sol

80:             bytes28(bytes32(returnedData) << 32) != bytes28(0)

```

```solidity
File: LSP2ERC725YJSONSchema/LSP2Utils.sol

266:             if (bytes12(key) != bytes12(0)) return false;

```

```solidity
File: LSP6KeyManager/LSP6KeyManager.sol

19:         if (target_ == address(0)) revert InvalidLSP6Target();

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

463:         if (permissions == bytes32(0)) revert NoPermissionsSet(from);

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerInitAbstract.sol

21:         if (target_ == address(0)) revert InvalidLSP6Target();

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol

345:         if (bytes12(executeCalldata[36:48]) != bytes12(0)) {

410:         bool isFunctionCall = requiredFunction != bytes4(0);

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol

97:             if (requiredPermission == bytes32(0)) return;

146:                 if (requiredPermission != bytes32(0)) {

392:             bytes32(

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

268:         if (operator == address(0)) {

300:         if (to == address(0)) {

343:         if (from == address(0)) {

406:         if (from == address(0) || to == address(0)) {

406:         if (from == address(0) || to == address(0)) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

84:         if (tokenOwner == address(0)) {

115:         if (operator == address(0)) {

139:         if (operator == address(0)) {

291:         return _tokenOwners[tokenId] != address(0);

319:         if (to == address(0)) {

410:         if (to == address(0)) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol

36:         if (from == address(0)) {

40:         } else if (to == address(0)) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol

38:         if (from == address(0)) {

42:         } else if (to == address(0)) {

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

142:         if (msg.sig == bytes4(0) && extension == address(0)) return;

142:         if (msg.sig == bytes4(0) && extension == address(0)) return;

145:         if (extension == address(0))

561:             if (target != address(0))

568:             if (target != address(0))

```

### <a name="GAS-2"></a>[GAS-2] Using bools for storage incurs overhead
Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).

*Instances (5)*:
```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

83:     bool private _reentrancyStatus;

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

47:     bool internal _isNonDivisible;

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

59:     mapping(address => mapping(address => bool)) private _operatorApprovals;

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

59:     mapping(address => mapping(address => bool)) private _operatorApprovals;

```

```solidity
File: Mocks/Security/Reentrancy.sol

10:     bool private _switchFallback;

```

### <a name="GAS-3"></a>[GAS-3] Cache array length outside of loop
If not cached, the solidity compiler will always read the length of the array during each iteration. That is, if it is a storage array, this is an extra sload operation (100 additional extra gas for each iteration except for the first) and if it is a memory array, this is an extra mload operation (3 additional gas for each iteration except for the first).

*Instances (9)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

175:         for (uint256 i; i < data.length; ) {

396:             for (uint256 i = 0; i < dataKeys.length; ) {

411:         for (uint256 i = 0; i < dataKeys.length; ) {

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

163:         for (uint256 ii = 0; ii < payloads.length; ) {

223:         for (uint256 ii = 0; ii < payloads.length; ) {

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol

272:         for (uint256 ii = 0; ii < allowedCalls.length; ii += 34) {

```

```solidity
File: LSP6KeyManager/LSP6Utils.sol

173:         for (uint256 i = 0; i < permissions.length; i++) {

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

238:         for (uint256 i; i < data.length; ) {

347:         for (uint256 i = 0; i < dataKeys.length; ) {

```

### <a name="GAS-4"></a>[GAS-4] State variables should be cached in stack variables rather than re-reading them from storage
The instances below point to the second+ access of a state variable within a function. Caching of a state variable replaces each Gwarmaccess (100 gas) with a much cheaper stack read. Other less obvious fixes/optimizations include having local memory caches of state variable structs, or having local caches of state variable contracts/addresses.

*Saves 100 gas per instance*

*Instances (1)*:
```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

476:                 _target,

```

### <a name="GAS-5"></a>[GAS-5] Use calldata instead of memory for function arguments that do not get mutated
Mark data types as `calldata` instead of `memory` where possible. This makes it so that the data is not automatically loaded into memory. If the data passed into the function does not need to be changed (like updating values in an array), it can be passed in as `calldata`. The one exception to this is if the argument must later be passed into another function that takes an argument that specifies `memory` storage.

*Instances (166)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

226:         bytes memory data

281:         uint256[] memory operationsType,

282:         address[] memory targets,

283:         uint256[] memory values,

284:         bytes[] memory datas

341:         bytes memory dataValue

381:         bytes32[] memory dataKeys,

382:         bytes[] memory dataValues

736:         bytes memory signature

```

```solidity
File: LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol

80:         bytes memory /* data */

```

```solidity
File: LSP20CallVerification/ILSP20CallVerifier.sol

22:         bytes memory receivedCalldata

33:         bytes memory result

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

120:         bytes memory signature

186:         bytes memory signature,

205:         bytes[] memory signatures,

305:         bytes memory /*result*/

```

```solidity
File: LSP7DigitalAsset/ILSP7DigitalAsset.sol

164:         bytes memory data

190:         address[] memory from,

191:         address[] memory to,

192:         uint256[] memory amount,

193:         bool[] memory allowNonLSP1Recipient,

194:         bytes[] memory data

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

129:         bytes memory data

155:         address[] memory from,

156:         address[] memory to,

157:         uint256[] memory amount,

158:         bool[] memory allowNonLSP1Recipient,

159:         bytes[] memory data

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
File: LSP7DigitalAsset/presets/ILSP7Mintable.sol

30:         bytes memory data

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol

8:         string memory name_,

9:         string memory symbol_,

17:         bytes memory data

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol

26:         string memory name_,

27:         string memory symbol_,

```

```solidity
File: LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol

27:         bytes memory data

```

```solidity
File: LSP7DigitalAsset/presets/LSP7Mintable.sol

25:         string memory name_,

26:         string memory symbol_,

38:         bytes memory data

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInit.sol

27:         string memory name_,

28:         string memory symbol_,

```

```solidity
File: LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol

41:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol

191:         bytes memory data

217:         address[] memory from,

218:         address[] memory to,

219:         bytes32[] memory tokenId,

220:         bool[] memory allowNonLSP1Recipient,

221:         bytes[] memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

196:         bytes memory data

211:         address[] memory from,

212:         address[] memory to,

213:         bytes32[] memory tokenId,

214:         bool[] memory allowNonLSP1Recipient,

215:         bytes[] memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol

84:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol

16:     function burn(bytes32 tokenId, bytes memory data) public {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

201:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

201:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol

32:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol

8:         string memory name_,

9:         string memory symbol_,

17:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol

26:         string memory name_,

27:         string memory symbol_,

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.sol

27:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol

24:         string memory name_,

25:         string memory symbol_,

36:         bytes memory data

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol

26:         string memory name_,

27:         string memory symbol_,

```

```solidity
File: LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol

38:         bytes memory data

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

280:         bytes memory data

292:         uint256[] memory operationsType,

293:         address[] memory targets,

294:         uint256[] memory values,

295:         bytes[] memory datas

311:         bytes memory dataValue

337:         bytes32[] memory dataKeys,

338:         bytes[] memory dataValues

```

```solidity
File: Mocks/Executor.sol

67:         bytes memory _value

151:         bytes memory _value

```

```solidity
File: Mocks/ExecutorLSP20.sol

55:         bytes memory _value

115:         bytes memory _value

```

```solidity
File: Mocks/FallbackExtensions/ReenterAccountExtension.sol

8:     function reenterAccount(bytes memory payload) public {

```

```solidity
File: Mocks/FallbackExtensions/RevertStringExtension.sol

8:     function revertString(string memory b) public view virtual {

```

```solidity
File: Mocks/GenericExecutor.sol

11:         bytes memory data

```

```solidity
File: Mocks/KeyManager/ERC725YDelegateCall.sol

11:     function updateStorage(bytes32 key, bytes memory value) public {

```

```solidity
File: Mocks/KeyManager/KeyManagerInternalsTester.sol

45:         bytes memory allowedCallsCompacted

51:         bytes memory allowedERC725YDataKeysCompacted

61:         bytes32[] memory inputDataKeys,

62:         bytes[] memory inputDataValues

76:         bytes memory allowedERC725YDataKeysFor

87:         bytes32[] memory inputKeys,

88:         bytes memory allowedERC725YDataKeysCompacted,

89:         bool[] memory validatedInputKeys,

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnExpandedInvalidValue.sol

22:         bytes memory data

```

```solidity
File: Mocks/LSP20Owners/FirstCallReturnInvalidMagicValue.sol

22:         bytes memory

```

```solidity
File: Mocks/LSP2UtilsLibraryTester.sol

9:     function isEncodedArray(bytes memory data) public pure returns (bool) {

13:     function isCompactBytesArray(bytes memory data) public pure returns (bool) {

```

```solidity
File: Mocks/MaliciousERC1271Wallet.sol

16:         bytes memory

```

```solidity
File: Mocks/Reentrancy/BatchReentrancyRelayer.sol

15:         bytes[] memory signatures,

16:         uint256[] memory nonces,

17:         uint256[] memory validityTimestamps,

18:         uint256[] memory values,

19:         bytes[] memory payloads

```

```solidity
File: Mocks/Reentrancy/LSP20ReentrantContract.sol

51:         string memory payloadType

```

```solidity
File: Mocks/Reentrancy/ReentrantContract.sol

84:         string memory payloadType

```

```solidity
File: Mocks/Reentrancy/SingleReentrancyRelayer.sol

14:         bytes memory signature,

17:         bytes memory payload

```

```solidity
File: Mocks/Security/Reentrancy.sol

16:     function loadPayload(bytes memory _dataPayload) public {

```

```solidity
File: Mocks/TargetContract.sol

25:     function setName(string memory name) public {

29:     function setNamePayable(string memory name) public payable {

```

```solidity
File: Mocks/Tokens/LSP4CompatibilityTester.sol

21:         string memory name,

22:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyInitTester.sol

15:         string memory name,

16:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP7CappedSupplyTester.sol

13:         string memory name,

14:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20InitTester.sol

20:         string memory name_,

21:         string memory symbol_,

```

```solidity
File: Mocks/Tokens/LSP7CompatibleERC20Tester.sol

13:         string memory name_,

14:         string memory symbol_,

```

```solidity
File: Mocks/Tokens/LSP7InitTester.sol

18:         string memory tokenName_,

19:         string memory tokenSymbol_,

35:         bytes memory data

```

```solidity
File: Mocks/Tokens/LSP7MintWhenDeployed.sol

8:         string memory name,

9:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP7Tester.sol

10:         string memory name,

11:         string memory symbol,

19:         bytes memory data

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyInitTester.sol

15:         string memory name_,

16:         string memory symbol_,

```

```solidity
File: Mocks/Tokens/LSP8CappedSupplyTester.sol

15:         string memory name_,

16:         string memory symbol_,

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721Tester.sol

20:         string memory name_,

21:         string memory symbol_,

23:         bytes memory tokenURIValue_

```

```solidity
File: Mocks/Tokens/LSP8CompatibleERC721TesterInit.sol

27:         string memory name_,

28:         string memory symbol_,

30:         bytes memory tokenURIValue_

```

```solidity
File: Mocks/Tokens/LSP8EnumerableInitTester.sol

15:         string memory name,

16:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP8EnumerableTester.sol

15:         string memory name,

16:         string memory symbol,

```

```solidity
File: Mocks/Tokens/LSP8InitTester.sol

18:         string memory name,

19:         string memory symbol,

33:         bytes memory data

```

```solidity
File: Mocks/Tokens/LSP8Tester.sol

15:         string memory name,

16:         string memory symbol,

24:         bytes memory data

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1.sol

26:         bytes memory data

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721Received.sol

37:         bytes memory data

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedInvalid.sol

37:         bytes memory data

48:         bytes memory /* data */

```

```solidity
File: Mocks/Tokens/TokenReceiverWithLSP1WithERC721ReceivedRevert.sol

37:         bytes memory data

48:         bytes memory /* data */

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedInvalid.sol

23:         bytes memory /* data */

```

```solidity
File: Mocks/Tokens/TokenReceiverWithoutLSP1WithERC721ReceivedRevert.sol

23:         bytes memory /* data */

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateDataUpdater.sol

37:         bytes memory /* data */

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateRevert.sol

22:         bytes memory /* data */

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateTokenReentrant.sol

42:         bytes memory data

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultMalicious.sol

45:         bytes memory data

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultReentrantA.sol

30:         bytes memory data

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultReentrantB.sol

30:         bytes memory data

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateVaultSetter.sol

31:         bytes memory value

```

### <a name="GAS-6"></a>[GAS-6] Use Custom Errors
[Source](https://blog.soliditylang.org/2021/04/21/custom-errors/)
Instead of using error strings, to reduce deployment and runtime cost, you should use Custom Errors. This would save both deployment and runtime cost.

*Instances (7)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

191:                     revert("LSP0: batchCalls reverted");

```

```solidity
File: LSP2ERC725YJSONSchema/LSP2Utils.sol

36:         require(dataKey.length >= 2, "MUST be longer than 2 characters");

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

254:                     revert("LSP9: batchCalls reverted");

```

```solidity
File: Mocks/FallbackRevert.sol

6:         revert("fallback reverted");

```

```solidity
File: Mocks/TargetContract.sol

30:         require(msg.value >= 50, "Not enough value provided");

35:         revert("TargetContract:revertCall: this function has reverted!");

```

```solidity
File: Mocks/UniversalReceivers/UniversalReceiverDelegateRevert.sol

24:         revert("I Revert");

```

### <a name="GAS-7"></a>[GAS-7] Don't initialize variables with default value

*Instances (22)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

396:             for (uint256 i = 0; i < dataKeys.length; ) {

411:         for (uint256 i = 0; i < dataKeys.length; ) {

```

```solidity
File: LSP2ERC725YJSONSchema/LSP2Utils.sol

261:         for (uint256 ii = 0; ii < arrayLength; ) {

292:         for (uint256 ii = 0; ii < arrayLength; ) {

328:         uint256 pointer = 0;

```

```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

163:         for (uint256 ii = 0; ii < payloads.length; ) {

223:         for (uint256 ii = 0; ii < payloads.length; ) {

256:         bool isSetData = false;

323:         bool isSetData = false;

369:         bool isSetData = false;

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol

272:         for (uint256 ii = 0; ii < allowedCalls.length; ii += 34) {

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol

127:         bool isSettingERC725YKeys = false;

129:         uint256 inputDataKeysAllowed = 0;

133:         uint256 ii = 0;

```

```solidity
File: LSP6KeyManager/LSP6Utils.sol

94:         uint256 pointer = 0;

123:         uint256 pointer = 0;

172:         uint256 result = 0;

173:         for (uint256 i = 0; i < permissions.length; i++) {

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

171:         for (uint256 i = 0; i < fromLength; ) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

227:         for (uint256 i = 0; i < fromLength; ) {

273:         for (uint256 i = 0; i < operatorListLength; ) {

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

347:         for (uint256 i = 0; i < dataKeys.length; ) {

```

### <a name="GAS-8"></a>[GAS-8] Functions guaranteed to revert when called by normal users can be marked `payable`
If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

*Instances (2)*:
```solidity
File: LSP6KeyManager/LSP6KeyManagerInitAbstract.sol

20:     function _initialize(address target_) internal virtual onlyInitializing {

```

```solidity
File: LSP9Vault/LSP9VaultInitAbstract.sol

39:     function _initialize(address newOwner) internal virtual onlyInitializing {

```

### <a name="GAS-9"></a>[GAS-9] `++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too)
*Saves 5 gas per loop*

*Instances (5)*:
```solidity
File: LSP6KeyManager/LSP6KeyManagerCore.sol

384:         _nonceStore[signer][nonce >> 128]++;

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol

156:                 inputDataKeysAllowed++;

743:                         allowedDataKeysFound++;

771:                 jj++;

```

```solidity
File: LSP6KeyManager/LSP6Utils.sol

173:         for (uint256 i = 0; i < permissions.length; i++) {

```

### <a name="GAS-10"></a>[GAS-10] Using `private` rather than `public` for constants, saves gas
If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table

*Instances (2)*:
```solidity
File: LSP14Ownable2Step/LSP14Ownable2Step.sol

39:     uint256 public constant RENOUNCE_OWNERSHIP_CONFIRMATION_DELAY = 200;

44:     uint256 public constant RENOUNCE_OWNERSHIP_CONFIRMATION_PERIOD = 200;

```

### <a name="GAS-11"></a>[GAS-11] Use != 0 instead of > 0 for unsigned integer comparison

*Instances (11)*:
```solidity
File: LSP0ERC725Account/LSP0ERC725AccountCore.sol

182:                 if (result.length > 0) {

741:         if (_owner.code.length > 0) {

```

```solidity
File: LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol

165:             if (notifier.code.length > 0) {

```

```solidity
File: LSP20CallVerification/LSP20CallVerification.sol

86:         if (returnedData.length > 0) {

```

```solidity
File: LSP7DigitalAsset/LSP7DigitalAssetCore.sol

491:             if (to.code.length > 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol

493:             if (to.code.length > 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol

313:         if (to.code.length > 0) {

```

```solidity
File: LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol

313:         if (to.code.length > 0) {

```

```solidity
File: LSP9Vault/LSP9VaultCore.sol

93:         if (msg.value > 0) emit ValueReceived(msg.sender, msg.value);

245:                 if (result.length > 0) {

```

```solidity
File: Mocks/GenericExecutor.sol

37:         if (returndata.length > 0) {

```

### <a name="GAS-12"></a>[GAS-12] `internal` functions not called by the contract should be removed
If the functions are required by an interface, the contract should inherit from that interface and use the `override` keyword

*Instances (41)*:
```solidity
File: LSP0ERC725Account/LSP0Utils.sol

24:     function getLSP1DelegateValue(

37:     function getLSP1DelegateValueForTypeId(

```

```solidity
File: LSP10ReceivedVaults/LSP10Utils.sol

63:     function generateReceivedVaultKeys(

115:     function generateSentVaultKeys(

```

```solidity
File: LSP17ContractExtension/LSP17Utils.sol

13:     function isExtension(

```

```solidity
File: LSP1UniversalReceiver/LSP1Utils.sol

22:     function tryNotifyUniversalReceiver(

40:     function callUniversalReceiverWithCallerInfos(

72:     function getTransferDetails(

```

```solidity
File: LSP2ERC725YJSONSchema/LSP2Utils.sol

22:     function generateSingletonKey(

32:     function generateArrayKey(

52:     function generateArrayElementKeyAtIndex(

71:     function generateMappingKey(

94:     function generateMappingKey(

115:     function generateMappingKey(

136:     function generateMappingWithGroupingKey(

161:     function generateMappingWithGroupingKey(

181:     function generateMappingWithGroupingKey(

199:     function generateJSONURLValue(

216:     function generateASSETURLValue(

251:     function isEncodedArrayOfAddresses(

283:     function isBytes4EncodedArray(

312:     function isCompactBytesArray(

```

```solidity
File: LSP5ReceivedAssets/LSP5Utils.sol

64:     function generateReceivedAssetKeys(

117:     function generateSentAssetKeys(

```

```solidity
File: LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol

14:     function _verifyOwnershipPermissions(

```

```solidity
File: LSP6KeyManager/LSP6Utils.sol

25:     function getPermissionsFor(

39:     function getAllowedCallsFor(

58:     function getAllowedERC725YDataKeysFor(

78:     function hasPermission(

91:     function isCompactBytesArrayOfAllowedCalls(

120:     function isCompactBytesArrayOfAllowedERC725YDataKeys(

150:     function setDataViaKeyManager(

169:     function combinePermissions(

194:     function generateNewPermissionsKeys(

226:     function getPermissionName(

```

```solidity
File: Mocks/Reentrancy/LSP20ReentrantContract.sol

58:     function _transferValue() internal returns (bytes memory) {

62:     function _setData() internal returns (bytes memory) {

71:     function _addController() internal returns (bytes memory) {

86:     function _editPermissions() internal returns (bytes memory) {

101:     function _addUniversalReceiverDelegate() internal returns (bytes memory) {

116:     function _changeUniversalReceiverDelegate()

```

