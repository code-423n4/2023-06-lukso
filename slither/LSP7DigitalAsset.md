Summary

- [immutable-states](#immutable-states-1)

## immutable-states

- Impact: Optimization
- Confidence: High

[LSP7DigitalAssetCore.\_isNonDivisible](https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L39) should be immutable

https://github.com/code-423n4/2023-06-lukso/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol#L39

**Notes from the developers:**

We currently cannot make this optimization because both the standard version (with `constructor`) and the Init version (with `initalize(...)` function) uses the `LSP7DigitalAssetCore` contract. Therefore this has to be a state variable not an `immutable` to allow compatibility with the Init version.

We are planning to separate both types of contracts (constructor vs proxy version) between two repositories. Once the contracts will be separated between two repos, we will be able to implement this optimisation in our “standard” contract version with `constructor`
