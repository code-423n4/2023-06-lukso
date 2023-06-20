Summary

- [incorrect-equality](#--incorrect-equality--)

### incorrect-equality

- Impact: Medium
- Confidence: High

[LSP14Ownable2Step.\_renounceOwnership()](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L145-L168) uses a dangerous strict equality: - [currentBlock > confirmationPeriodEnd || \_renounceOwnershipStartedAt == 0](https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L154)

https://github.com/code-423n4/2023-06-lukso/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol#L145-L168
