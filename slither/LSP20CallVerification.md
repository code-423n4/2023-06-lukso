**Summary**

- [assembly](#assembly)
- [low-level-calls](#low-level-calls)

## assembly

[LSP20CallVerification.\_revert(bool,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L69-L82) uses assembly - [INLINE ASM](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L75-L78)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L69-L82

## low-level-calls

- Impact: Informational
- Confidence: High

Low level call in [LSP20CallVerification.\_verifyCall(address)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L22-L35):

- [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCall.selector,msg.sender,msg.value,msg.data))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L23-L25)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L22-L35

Low level call in [LSP20CallVerification.\_verifyCallResult(address,bytes)](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L41-L54):

- [(success,returnedData) = logicVerifier.call(abi.encodeWithSelector(ILSP20CallVerification.lsp20VerifyCallResult.selector,keccak256(bytes)(abi.encodePacked(msg.sender,msg.value,msg.data)),callResult))](https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L42-L48)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP20CallVerification/LSP20CallVerification.sol#L41-L54
