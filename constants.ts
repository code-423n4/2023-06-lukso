/**
 * Set of constants values as defined in each LUKSO Standards Proposals (LSPs).
 * @see https://github.com/lukso-network/LIPs/tree/main/LSPs
 */

export * from './contracts';

// ERC165
// ---------

/**
 * @dev ERC165 interface IDs for the LSP interface standards + some backward compatible ERC token standards.
 * These `bytes4` values can be used to detect if a contract implements a specific interface
 * with `supportsInterface(interfaceId)`.
 */
export const INTERFACE_IDS = {
  ERC165: '0x01ffc9a7',
  ERC1271: '0x1626ba7e',
  ERC20: '0x36372b07',
  ERC223: '0x87d43052',
  ERC721: '0x80ac58cd',
  ERC721Metadata: '0x5b5e139f',
  ERC777: '0xe58e113c',
  ERC1155: '0xd9b67a26',
  ERC725X: '0x7545acac',
  ERC725Y: '0x629aa694',
  LSP0ERC725Account: '0x3e89ad98',
  LSP1UniversalReceiver: '0x6bb56a14',
  LSP6KeyManager: '0x38bb3cdb',
  LSP7DigitalAsset: '0xda1f85e4',
  LSP8IdentifiableDigitalAsset: '0x622e7a01',
  LSP9Vault: '0x28af17e6',
  LSP14Ownable2Step: '0x94be5999',
  LSP17Extendable: '0xa918fa6b',
  LSP17Extension: '0xcee78b40',
  LSP20CallVerification: '0x1a0eb6a5',
  LSP20CallVerifier: '0x480c0ec2',
};

// ERC1271
// ----------

/**
 * @dev values returned by the `isValidSignature` function of the ERC1271 standard.
 * Can be used to check if a signature is valid or not.
 */
export const ERC1271_VALUES = {
  MAGIC_VALUE: '0x1626ba7e',
  FAIL_VALUE: '0xffffffff',
};

// LSP20
// ----------

/**
 * @dev values returned by the `lsp20VerifyCall` and `lsp20VerifyCallResult` functions of the LSP20 standard.
 * Can be used to check if a calldata payload was check and verified.
 */
export const LSP20_MAGIC_VALUES = {
  VERIFY_CALL: {
    // bytes3(keccak256("lsp20VerifyCall(address,uint256,bytes)")) + "0x01"
    WITH_POST_VERIFICATION: '0x9bf04b01',
    // bytes3(keccak256("lsp20VerifyCall(address,uint256,bytes)")) + "0x00"
    NO_POST_VERIFICATION: '0x9bf04b00',
  },
  // bytes4(keccak256("lsp20VerifyCallResult(bytes32,bytes)"))
  VERIFY_CALL_RESULT: '0xd3fc45d3',
};

// ERC725X
// ----------

/**
 * @dev list of ERC725X operation types.
 * @see https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md#execute
 */
export const OPERATION_TYPES = {
  CALL: 0,
  CREATE: 1,
  CREATE2: 2,
  STATICCALL: 3,
  DELEGATECALL: 4,
};

// ERC725Y
// ----------

export type LSP2ArrayKey = { length: string; index: string };
export type LSPSupportedStandard = { key: string; value: string };

/**
 * @dev list of ERC725Y keys from the LSP standards.
 * Can be used to detect if a contract implements a specific LSP Metadata standard
 * and contain a set of pre-defined ERC725Y Data Keys.
 */
export const SupportedStandards = {
  LSP3UniversalProfile: {
    key: '0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38',
    value: '0xabe425d6',
  } as LSPSupportedStandard,
  LSP4DigitalAsset: {
    key: '0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c',
    value: '0xa4d96624',
  } as LSPSupportedStandard,
  LSP9Vault: {
    key: '0xeafec4d89fa9619884b600007c0334a14085fefa8b51ae5a40895018882bdb90',
    value: '0x7c0334a1',
  } as LSPSupportedStandard,
};

/**
 * @dev list of ERC725Y Metadata keys from the LSP standards.
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 */
export const ERC725YDataKeys = {
  LSP1: {
    // bytes10(keccak256('LSP1UniversalReceiverDelegate')) + bytes2(0)
    LSP1UniversalReceiverDelegatePrefix: '0x0cfc51aec37c55a4d0b10000',

    // keccak256('LSP1UniversalReceiverDelegate')
    LSP1UniversalReceiverDelegate:
      '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
  },
  LSP3: {
    SupportedStandards_LSP3: SupportedStandards.LSP3UniversalProfile.key,

    // keccak256('LSP3Profile')
    LSP3Profile: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
  },
  LSP4: {
    SupportedStandards_LSP4: SupportedStandards.LSP4DigitalAsset.key,

    // keccak256('LSP4TokenName')
    LSP4TokenName: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',

    // keccak256('LSP4TokenSymbol')
    LSP4TokenSymbol: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',

    // keccak256('LSP4Metadata')
    LSP4Metadata: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',

    // LSP4CreatorsMap:<address>  + bytes2(0)
    LSP4CreatorsMap: '0x6de85eaf5d982b4e5da00000',

    // keccak256('"LSP4Creators[]')
    'LSP4Creators[]': {
      length: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
      index: '0x114bd03b3a46d48759680d81ebb2b414',
    } as LSP2ArrayKey,
  },
  LSP5: {
    // LSP5ReceivedAssetsMap:<address>  + bytes2(0)
    LSP5ReceivedAssetsMap: '0x812c4334633eb816c80d0000',

    // keccak256('LSP5ReceivedAssets[]')
    'LSP5ReceivedAssets[]': {
      length: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
      index: '0x6460ee3c0aac563ccbf76d6e1d07bada',
    } as LSP2ArrayKey,
  },
  LSP6: {
    // keccak256('AddressPermissions[]')
    'AddressPermissions[]': {
      length: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
      index: '0xdf30dba06db6a30e65354d9a64c60986',
    } as LSP2ArrayKey,

    AddressPermissionsPrefix: '0x4b80742de2bf',

    // AddressPermissions:Permissions:<address>  + bytes2(0)
    'AddressPermissions:Permissions': '0x4b80742de2bf82acb3630000',

    // AddressPermissions:AllowedERC725YDataKeys:<address>  + bytes2(0)
    'AddressPermissions:AllowedERC725YDataKeys': '0x4b80742de2bf866c29110000',

    // AddressPermissions:AllowedCalls:<address>  + bytes2(0)
    'AddressPermissions:AllowedCalls': '0x4b80742de2bf393a64c70000',
  },
  LSP9: {
    SupportedStandards_LSP9: SupportedStandards.LSP9Vault.key,
  },
  LSP10: {
    // keccak256('LSP10VaultsMap') + bytes2(0)
    LSP10VaultsMap: '0x192448c3c0f88c7f238c0000',

    // keccak256('LSP10Vaults[]')
    'LSP10Vaults[]': {
      length: '0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06',
      index: '0x55482936e01da86729a45d2b87a6b1d3',
    } as LSP2ArrayKey,
  },
  LSP12: {
    // LSP12IssuedAssetsMap:<address>  + bytes2(0)
    LSP12IssuedAssetsMap: '0x74ac2555c10b9349e78f0000',

    // keccak256('LSP12IssuedAssets[]')
    'LSP12IssuedAssets[]': {
      length: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
      index: '0x7c8c3416d6cda87cd42c71ea1843df28',
    } as LSP2ArrayKey,
  },
  LSP17: {
    // bytes10(keccak256('LSP17Extension')) + bytes2(0)
    LSP17ExtensionPrefix: '0xcee78b4094da860110960000',
  },
};

// LSP6
// ----------

/**
 * @dev LSP6 version number for signing `executeRelayCall(...)` transaction using EIP191
 * @see for details see: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#executerelaycall
 */
export const LSP6_VERSION = 6;

/**
 * @dev The types of calls for an AllowedCall
 */
export const CALLTYPE = {
  VALUE: '0x00000001',
  CALL: '0x00000002',
  STATICCALL: '0x00000004',
  DELEGATECALL: '0x00000008',
};

/**
 * @dev `bytes32` hex value for all the LSP6 permissions excluding REENTRANCY, DELEGATECALL and SUPER_DELEGATECALL for security (these should be set manually)
 */
export const ALL_PERMISSIONS = '0x00000000000000000000000000000000000000000000000000000000003f3f7f';

export type LSP6PermissionName = keyof typeof PERMISSIONS;

/**
 * @dev List of `bytes32` permissions from LSP6 Key Manager Standard
 */
// prettier-ignore
export const PERMISSIONS = {
  CHANGEOWNER: "0x0000000000000000000000000000000000000000000000000000000000000001",
  ADDCONTROLLER: "0x0000000000000000000000000000000000000000000000000000000000000002",
  EDITPERMISSIONS: "0x0000000000000000000000000000000000000000000000000000000000000004",
  ADDEXTENSIONS: "0x0000000000000000000000000000000000000000000000000000000000000008",
  CHANGEEXTENSIONS: "0x0000000000000000000000000000000000000000000000000000000000000010",
  ADDUNIVERSALRECEIVERDELEGATE: "0x0000000000000000000000000000000000000000000000000000000000000020",
  CHANGEUNIVERSALRECEIVERDELEGATE: "0x0000000000000000000000000000000000000000000000000000000000000040",
  REENTRANCY: "0x0000000000000000000000000000000000000000000000000000000000000080",
  SUPER_TRANSFERVALUE: "0x0000000000000000000000000000000000000000000000000000000000000100",
  TRANSFERVALUE: "0x0000000000000000000000000000000000000000000000000000000000000200",
  SUPER_CALL: "0x0000000000000000000000000000000000000000000000000000000000000400",
  CALL: "0x0000000000000000000000000000000000000000000000000000000000000800",
  SUPER_STATICCALL: "0x0000000000000000000000000000000000000000000000000000000000001000",
  STATICCALL: "0x0000000000000000000000000000000000000000000000000000000000002000",
  SUPER_DELEGATECALL: "0x0000000000000000000000000000000000000000000000000000000000004000",
  DELEGATECALL: "0x0000000000000000000000000000000000000000000000000000000000008000",
  DEPLOY: "0x0000000000000000000000000000000000000000000000000000000000010000",
  SUPER_SETDATA: "0x0000000000000000000000000000000000000000000000000000000000020000",
  SETDATA: "0x0000000000000000000000000000000000000000000000000000000000040000",
  ENCRYPT: "0x0000000000000000000000000000000000000000000000000000000000080000",
  DECRYPT: "0x0000000000000000000000000000000000000000000000000000000000100000",
  SIGN: "0x0000000000000000000000000000000000000000000000000000000000200000",
}

/**
 * @dev list of standard type IDs ("hooks") defined in the LSPs that can be used to notify
 * a LSP1 compliant contract about certain type of transactions or information
 * (e.g: token transfer, vault transfer, ownership transfer, etc...)
 */
export const LSP1_TYPE_IDS = {
  // keccak256('LSP0OwnershipTransferStarted')
  LSP0OwnershipTransferStarted:
    '0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926',

  // keccak256('LSP0OwnershipTransferred_SenderNotification')
  LSP0OwnershipTransferred_SenderNotification:
    '0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814',

  // keccak256('LSP0OwnershipTransferred_RecipientNotification')
  LSP0OwnershipTransferred_RecipientNotification:
    '0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538',

  // keccak256('LSP7Tokens_SenderNotification')
  LSP7Tokens_SenderNotification:
    '0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea',

  // keccak256('LSP7Tokens_RecipientNotification')
  LSP7Tokens_RecipientNotification:
    '0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c',

  // keccak256('LSP8Tokens_SenderNotification')
  LSP8Tokens_SenderNotification:
    '0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00',

  // keccak256('LSP8Tokens_RecipientNotification')
  LSP8Tokens_RecipientNotification:
    '0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d',

  // keccak256('LSP9OwnershipTransferStarted')
  LSP9OwnershipTransferStarted:
    '0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f',

  // keccak256('LSP9OwnershipTransferred_SenderNotification')
  LSP9OwnershipTransferred_SenderNotification:
    '0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471',

  // keccak256('LSP9OwnershipTransferred_RecipientNotification')
  LSP9OwnershipTransferred_RecipientNotification:
    '0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c',

  // keccak256('LSP14OwnershipTransferStarted')
  LSP14OwnershipTransferStarted:
    '0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0',

  // keccak256('LSP14OwnershipTransferred_SenderNotification')
  LSP14OwnershipTransferred_SenderNotification:
    '0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c',

  // keccak256('LSP14OwnershipTransferred_RecipientNotification')
  LSP14OwnershipTransferred_RecipientNotification:
    '0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c',
};
