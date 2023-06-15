
👋 Hello
⛽ I am the Gas Bot Reporter. I keep track of the gas costs of common interactions using Universal Profiles 🆙 !
📊 Here is a summary of the gas cost with the code introduced by this PR.

<details>
<summary>⛽📊 See Gas Benchmark report of Using UniversalProfile owned by an EOA</summary>

### 🔀 `execute` scenarios

| `execute` scenarios - 👑 UP Owner                 | ⛽ Gas Usage |
| :------------------------------------------------ | :---------: |
| Transfer 1 LYX to an EOA without data             |    37570    |
| Transfer 1 LYX to a UP without data               |    36672    |
| Transfer 1 LYX to an EOA with 256 bytes of data   |    42231    |
| Transfer 1 LYX to a UP with 256 bytes of data     |    44795    |
| Transfer 0.1 LYX to 3x EOA without data           |    70967    |
| Transfer 0.1 LYX to 3x UP without data            |    75785    |
| Transfer 0.1 LYX to 3x EOA with 256 bytes of data |    84955    |
| Transfer 0.1 LYX to 3x EOA with 256 bytes of data |   100111    |

### 🗄️ `setData` scenarios

| `setData` scenarios - 👑 UP Owner                                      | ⛽ Gas Usage |
| :--------------------------------------------------------------------- | :---------: |
| Set a 20 bytes long value                                              |    49984    |
| Set a 60 bytes long value                                              |    95318    |
| Set a 160 bytes long value                                             |   164480    |
| Set a 300 bytes long value                                             |   279681    |
| Set a 600 bytes long value                                             |   484153    |
| Change the value of a data key already set                             |    32884    |
| Remove the value of a data key already set                             |    27348    |
| Set 2 data keys of 20 bytes long value                                 |    78478    |
| Set 2 data keys of 100 bytes long value                                |   260642    |
| Set 3 data keys of 20 bytes long value                                 |   105220    |
| Change the value of three data keys already set of 20 bytes long value |    45520    |
| Remove the value of three data keys already set                        |    41380    |

### 🗄️ `Tokens` scenarios

| `Tokens` scenarios - 👑 UP Owner                                | ⛽ Gas Usage |
| :-------------------------------------------------------------- | :---------: |
| Minting a LSP7Token to a UP (No Delegate) from an EOA           |    91375    |
| Minting a LSP7Token to an EOA from an EOA                       |    59232    |
| Transferring an LSP7Token from a UP to another UP (No Delegate) |    98976    |
| Minting a LSP8Token to a UP (No Delegate) from an EOA           |   158331    |
| Minting a LSP8Token to an EOA from an EOA                       |   126188    |
| Transferring an LSP8Token from a UP to another UP (No Delegate) |   147520    |



## 📝 Notes

- The `execute` and `setData` scenarios are executed on a fresh UniversalProfile smart contract, deployed as standard contracts (not as proxy behind a base contract implementation).


</details>


<details>
<summary>⛽📊 See Gas Benchmark report of Using UniversalProfile owned by an LSP6KeyManager</summary>

This document contains the gas usage for common interactions and scenarios when using UniversalProfile smart contracts.

### 🔀 `execute` scenarios

#### 👑 unrestricted controller

| `execute` scenarios - 👑 main controller   | ⛽ Gas Usage |
| :----------------------------------------- | :---------: |
| transfer LYX to an EOA                     |    60594    |
| transfer LYX to a UP                       |    62196    |
| transfer tokens (LSP7) to an EOA (no data) |   107459    |
| transfer tokens (LSP7) to a UP (no data)   |   243524    |
| transfer a NFT (LSP8) to a EOA (no data)   |   171303    |
| transfer a NFT (LSP8) to a UP (no data)    |   290721    |

#### 🛃 restricted controller

| `execute` scenarios - 🛃 restricted controller                                                                                  | ⛽ Gas Usage |
| :------------------------------------------------------------------------------------------------------------------------------ | :---------: |
| transfer some LYXes to an EOA - restricted to 1 x allowed address only (TRANSFERVALUE + 1x AllowedCalls)                        |    72833    |
| transfers some tokens (LSP7) to an EOA - restricted to LSP7 + 2x allowed contracts only (CALL + 2x AllowedCalls) (no data)      |   123268    |
| transfers some tokens (LSP7) to an other UP - restricted to LSP7 + 2x allowed contracts only (CALL + 2x AllowedCalls) (no data) |   259333    |
| transfers a NFT (LSP8) to an EOA - restricted to LSP8 + 2x allowed contracts only (CALL + 2x AllowedCalls) (no data)            |   187100    |
| transfers a NFT (LSP8) to an other UP - restricted to LSP8 + 2x allowed contracts only (CALL + 2x AllowedCalls) (no data)       |   306518    |

### 🗄️ `setData` scenarios

#### 👑 unrestricted controller

| `setData` scenarios - 👑 main controller                                                                                                  | ⛽ Gas Usage |
| :---------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| updates profile details (LSP3Profile metadata)                                                                                            |   136958    |
| give permissions to a controller (AddressPermissions[] + AddressPermissions[index] + AddressPermissions:Permissions:<controller-address>) |   133032    |
| restrict a controller to some specific ERC725Y Data Keys                                                                                  |   139305    |
| restrict a controller to interact only with 3x specific addresses                                                                         |   162009    |
| remove a controller (its permissions + its address from the AddressPermissions[] array)                                                   |    67990    |
| write 5x LSP12 Issued Assets                                                                                                              |   233454    |

#### 🛃 restricted controller

| `setData` scenarios - 🛃 restricted controller                                                                                                               | ⛽ Gas Usage |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| `setData(bytes32,bytes)` -> updates 1x data key                                                                                                              |   102687    |
| `setData(bytes32[],bytes[])` -> updates 3x data keys (first x3)                                                                                              |   161587    |
| `setData(bytes32[],bytes[])` -> updates 3x data keys (middle x3)                                                                                             |   145630    |
| `setData(bytes32[],bytes[])` -> updates 3x data keys (last x3)                                                                                               |   170815    |
| `setData(bytes32[],bytes[])` -> updates 2x data keys + add 3x new controllers (including setting the array length + indexes under AddressPermissions[index]) |   250159    |


## 📝 Notes

- The `execute` and `setData` scenarios are executed on a fresh UniversalProfile and LSP6KeyManager smart contracts, deployed as standard contracts (not as proxy behind a base contract implementation).


</details>
