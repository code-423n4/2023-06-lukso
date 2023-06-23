import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { EIP191Signer } from '@lukso/eip191-signer.js';

import {
  FallbackInitializer,
  FallbackInitializer__factory,
  FallbackRevert,
  FallbackRevert__factory,
  TargetContract,
  TargetContract__factory,
} from '../../../types';

// constants
import {
  ERC725YDataKeys,
  ALL_PERMISSIONS,
  PERMISSIONS,
  LSP6_VERSION,
  OPERATION_TYPES,
  CALLTYPE,
} from '../../../constants';

// setup
import { LSP6TestContext } from '../../utils/context';
import { setupKeyManager } from '../../utils/fixtures';

// helpers
import { abiCoder, combineAllowedCalls, LOCAL_PRIVATE_KEYS } from '../../utils/helpers';

export const shouldBehaveLikePermissionCall = (buildContext: () => Promise<LSP6TestContext>) => {
  let context: LSP6TestContext;

  describe('when making an empty call via `ERC25X.execute(...)` -> (`data` = `0x`, `value` = 0)', () => {
    let addressCanMakeCallNoAllowedCalls: SignerWithAddress,
      addressCanMakeCallWithAllowedCalls: SignerWithAddress,
      addressCannotMakeCallNoAllowedCalls: SignerWithAddress,
      addressCannotMakeCallWithAllowedCalls: SignerWithAddress,
      addressWithSuperCall: SignerWithAddress;

    let allowedEOA: string;

    let allowedContractWithFallback: FallbackInitializer,
      allowedContractWithFallbackRevert: FallbackRevert;

    before(async () => {
      context = await buildContext();

      addressCannotMakeCallNoAllowedCalls = context.accounts[1];
      addressCannotMakeCallWithAllowedCalls = context.accounts[2];
      addressCanMakeCallNoAllowedCalls = context.accounts[3];
      addressCanMakeCallWithAllowedCalls = context.accounts[4];
      addressWithSuperCall = context.accounts[5];

      allowedEOA = context.accounts[6].address;

      allowedContractWithFallback = await new FallbackInitializer__factory(
        context.accounts[0],
      ).deploy();

      allowedContractWithFallbackRevert = await new FallbackRevert__factory(
        context.accounts[0],
      ).deploy();

      const permissionKeys = [
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCannotMakeCallNoAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCannotMakeCallWithAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCanMakeCallNoAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCanMakeCallWithAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressWithSuperCall.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
          addressCannotMakeCallWithAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
          addressCanMakeCallWithAllowedCalls.address.substring(2),
      ];

      const allowedCallsValues = combineAllowedCalls(
        [CALLTYPE.CALL, CALLTYPE.CALL, CALLTYPE.CALL, CALLTYPE.CALL],
        [
          allowedEOA,
          allowedContractWithFallback.address,
          allowedContractWithFallbackRevert.address,
        ],
        ['0xffffffff', '0xffffffff', '0xffffffff'],
        ['0xffffffff', '0xffffffff', '0xffffffff'],
      );

      const permissionsValues = [
        PERMISSIONS.SIGN,
        PERMISSIONS.SIGN,
        PERMISSIONS.CALL,
        PERMISSIONS.CALL,
        PERMISSIONS.SUPER_CALL,
        allowedCallsValues,
        allowedCallsValues,
      ];

      await setupKeyManager(context, permissionKeys, permissionsValues);
    });

    describe('when caller does not have permission CALL and no Allowed Calls', () => {
      it('should fail with `NotAuthorised` error when `to` is an EOA', async () => {
        const targetEOA = ethers.Wallet.createRandom().address;

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetEOA,
          0,
          '0x',
        ]);

        await expect(
          context.keyManager.connect(addressCannotMakeCallNoAllowedCalls).execute(payload),
        )
          .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
          .withArgs(addressCannotMakeCallNoAllowedCalls.address, 'CALL');
      });

      it('should fail with `NotAuthorised` error when `to` is a contract', async () => {
        const targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetContract.address,
          0,
          '0x',
        ]);

        await expect(
          context.keyManager.connect(addressCannotMakeCallNoAllowedCalls).execute(payload),
        )
          .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
          .withArgs(addressCannotMakeCallNoAllowedCalls.address, 'CALL');
      });
    });

    describe('when caller does not have permission CALL but have some Allowed Calls', () => {
      it('should fail with `NotAuthorised` error when `to` is an EOA', async () => {
        const targetEOA = ethers.Wallet.createRandom().address;

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetEOA,
          0,
          '0x',
        ]);

        await expect(
          context.keyManager.connect(addressCannotMakeCallWithAllowedCalls).execute(payload),
        )
          .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
          .withArgs(addressCannotMakeCallWithAllowedCalls.address, 'CALL');
      });

      it('should fail with `NotAuthorised` error when `to` is a contract', async () => {
        const targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetContract.address,
          0,
          '0x',
        ]);

        await expect(
          context.keyManager.connect(addressCannotMakeCallWithAllowedCalls).execute(payload),
        )
          .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
          .withArgs(addressCannotMakeCallWithAllowedCalls.address, 'CALL');
      });
    });

    describe('when caller has permission CALL, but no Allowed Calls', () => {
      it('should fail with `NoCallsAllowed` error when `to` is an EOA', async () => {
        const targetEOA = ethers.Wallet.createRandom().address;

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetEOA,
          0,
          '0x',
        ]);

        await expect(context.keyManager.connect(addressCanMakeCallNoAllowedCalls).execute(payload))
          .to.be.revertedWithCustomError(context.keyManager, 'NoCallsAllowed')
          .withArgs(addressCanMakeCallNoAllowedCalls.address);
      });

      it('should fail with `NoCallsAllowed` error when `to` is a contract', async () => {
        const targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetContract.address,
          0,
          '0x',
        ]);

        await expect(context.keyManager.connect(addressCanMakeCallNoAllowedCalls).execute(payload))
          .to.be.revertedWithCustomError(context.keyManager, 'NoCallsAllowed')
          .withArgs(addressCanMakeCallNoAllowedCalls.address);
      });
    });

    describe('when caller has permission CALL with some Allowed Calls', () => {
      describe('when `to` is an EOA', () => {
        describe('when `to` is NOT in the list of Allowed Calls', () => {
          it('should fail with `NotAllowedCall` error', async () => {
            const targetEOA = ethers.Wallet.createRandom().address;

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetEOA,
              0,
              '0x',
            ]);

            await expect(
              context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'NotAllowedCall')
              .withArgs(addressCanMakeCallWithAllowedCalls.address, targetEOA, '0x00000000');
          });
        });

        describe('when `to` is in the list of Allowed Calls', () => {
          it('should pass', async () => {
            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              allowedEOA,
              0,
              '0x',
            ]);

            await expect(
              context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload),
            ).to.not.be.reverted;
          });
        });
      });

      describe('when `to` is a contract', () => {
        describe('when `to` is NOT in the list of Allowed Calls', () => {
          it('should fail with `NotAllowedCall` error', async () => {
            const targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContract.address,
              0,
              '0x',
            ]);

            await expect(
              context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'NotAllowedCall')
              .withArgs(
                addressCanMakeCallWithAllowedCalls.address,
                targetContract.address,
                '0x00000000',
              );
          });
        });

        describe('when `to` is in the list of Allowed Calls', () => {
          describe('if the `fallback()` function of `to` update some state', () => {
            it("should pass and update `to` contract's storage", async () => {
              const payload = context.universalProfile.interface.encodeFunctionData('execute', [
                OPERATION_TYPES.CALL,
                allowedContractWithFallback.address,
                0,
                '0x',
              ]);

              await context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload);

              expect(await allowedContractWithFallback.caller()).to.equal(
                context.universalProfile.address,
              );
            });
          });

          describe('if the `fallback()` function of `to` reverts', () => {
            it('should fail and bubble the error back to the Key Manager', async () => {
              const payload = context.universalProfile.interface.encodeFunctionData('execute', [
                OPERATION_TYPES.CALL,
                allowedContractWithFallbackRevert.address,
                0,
                '0x',
              ]);

              await expect(
                context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload),
              ).to.be.revertedWith('fallback reverted');
            });
          });
        });
      });
    });

    describe('when caller has permission SUPER_CALL', () => {
      it('should pass and allow to call an EOA', async () => {
        const targetEOA = ethers.Wallet.createRandom().address;

        const payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetEOA,
          0,
          '0x',
        ]);

        await context.keyManager.connect(addressWithSuperCall).execute(payload);
      });

      describe('when `to` is a contract', () => {
        describe('if the `fallback()` function of `to` update some state', () => {
          it("should pass and update `to` contract's storage", async () => {
            const targetContractWithFallback = await new FallbackInitializer__factory(
              context.accounts[0],
            ).deploy();

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContractWithFallback.address,
              0,
              '0x',
            ]);

            await context.keyManager.connect(addressWithSuperCall).execute(payload);

            expect(await targetContractWithFallback.caller()).to.equal(
              context.universalProfile.address,
            );
          });
        });

        describe('if the `fallback()` function of `to` reverts', () => {
          it('should fail and bubble the error back to the Key Manager', async () => {
            const targetContractWithFallbackRevert = await new FallbackRevert__factory(
              context.accounts[0],
            ).deploy();

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContractWithFallbackRevert.address,
              0,
              '0x',
            ]);

            await expect(
              context.keyManager.connect(addressWithSuperCall).execute(payload),
            ).to.be.revertedWith('fallback reverted');
          });
        });
      });
    });
  });

  describe('when making a ERC25X.execute(...) call with some `data` payload', () => {
    let addressCanMakeCallNoAllowedCalls: SignerWithAddress,
      addressCanMakeCallWithAllowedCalls: SignerWithAddress,
      addressCannotMakeCall: SignerWithAddress;

    let targetContract: TargetContract;

    before(async () => {
      context = await buildContext();

      addressCanMakeCallNoAllowedCalls = context.accounts[1];
      addressCanMakeCallWithAllowedCalls = context.accounts[2];
      addressCannotMakeCall = context.accounts[3];

      targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

      const permissionKeys = [
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] + context.owner.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCanMakeCallNoAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCanMakeCallWithAllowedCalls.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
          addressCannotMakeCall.address.substring(2),
        ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
          addressCanMakeCallWithAllowedCalls.address.substring(2),
      ];

      const permissionsValues = [
        ALL_PERMISSIONS,
        PERMISSIONS.CALL,
        PERMISSIONS.CALL,
        PERMISSIONS.SETDATA,
        combineAllowedCalls(
          [CALLTYPE.CALL],
          [targetContract.address],
          ['0xffffffff'],
          ['0xffffffff'],
        ),
      ];

      await setupKeyManager(context, permissionKeys, permissionsValues);
    });

    describe("when the 'offset' of the `data` payload is not `0x00...80`", () => {
      it('should revert', async () => {
        let payload = context.universalProfile.interface.encodeFunctionData('execute', [
          OPERATION_TYPES.CALL,
          targetContract.address,
          0,
          '0xcafecafe',
        ]);

        // edit the `data` offset
        payload = payload.replace(
          '0000000000000000000000000000000000000000000000000000000000000080',
          '0000000000000000000000000000000000000000000000000000000000000040',
        );

        await expect(
          context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload),
        )
          .to.be.revertedWithCustomError(context.keyManager, 'InvalidPayload')
          .withArgs(payload);
      });
    });

    describe('when interacting via `execute(...)`', () => {
      describe('when caller has ALL PERMISSIONS', () => {
        it('should pass and change state at the target contract', async () => {
          const argument = 'new name';

          const targetPayload = targetContract.interface.encodeFunctionData('setName', [argument]);

          const payload = context.universalProfile.interface.encodeFunctionData('execute', [
            OPERATION_TYPES.CALL,
            targetContract.address,
            0,
            targetPayload,
          ]);

          await context.keyManager.connect(context.owner).execute(payload);

          const result = await targetContract.callStatic.getName();
          expect(result).to.equal(argument);
        });

        describe('when calling a function that returns some value', () => {
          it('should return the value to the Key Manager <- UP <- targetContract.getName()', async () => {
            const expectedName = await targetContract.callStatic.getName();

            const targetContractPayload = targetContract.interface.encodeFunctionData('getName');

            const executePayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const result = await context.keyManager
              .connect(context.owner)
              .callStatic.execute(executePayload);

            const [decodedResult] = abiCoder.decode(['string'], result);
            expect(decodedResult).to.equal(expectedName);
          });

          it('Should return the value to the Key Manager <- UP <- targetContract.getNumber()', async () => {
            const expectedNumber = await targetContract.callStatic.getNumber();

            const targetContractPayload = targetContract.interface.encodeFunctionData('getNumber');

            const executePayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const result = await context.keyManager
              .connect(context.owner)
              .callStatic.execute(executePayload);

            const [decodedResult] = abiCoder.decode(['uint256'], result);
            expect(decodedResult).to.equal(expectedNumber);
          });
        });

        describe('when calling a function that reverts', () => {
          it('should revert', async () => {
            const targetContractPayload = targetContract.interface.encodeFunctionData('revertCall');

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContract.address,
              0,
              targetContractPayload,
            ]);

            await expect(context.keyManager.execute(payload)).to.be.revertedWith(
              'TargetContract:revertCall: this function has reverted!',
            );
          });
        });
      });

      describe('when caller has permission CALL', () => {
        describe('when caller has no allowed calls set', () => {
          it('should revert with `NotAllowedCall(...)` error', async () => {
            const argument = 'another name';

            const targetPayload = targetContract.interface.encodeFunctionData('setName', [
              argument,
            ]);

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContract.address,
              0,
              targetPayload,
            ]);

            await expect(
              context.keyManager.connect(addressCanMakeCallNoAllowedCalls).execute(payload),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'NoCallsAllowed')
              .withArgs(addressCanMakeCallNoAllowedCalls.address);
          });
        });

        describe('when caller has some allowed calls set', () => {
          it('should pass and change state at the target contract', async () => {
            const argument = 'another name';

            const targetPayload = targetContract.interface.encodeFunctionData('setName', [
              argument,
            ]);

            const payload = context.universalProfile.interface.encodeFunctionData('execute', [
              OPERATION_TYPES.CALL,
              targetContract.address,
              0,
              targetPayload,
            ]);

            await context.keyManager.connect(addressCanMakeCallWithAllowedCalls).execute(payload);

            const result = await targetContract.callStatic.getName();
            expect(result).to.equal(argument);
          });
        });
      });

      describe('when caller does not have permission CALL', () => {
        it('should revert', async () => {
          const argument = 'another name';

          const targetPayload = targetContract.interface.encodeFunctionData('setName', [argument]);

          const payload = context.universalProfile.interface.encodeFunctionData('execute', [
            OPERATION_TYPES.CALL,
            targetContract.address,
            0,
            targetPayload,
          ]);

          await expect(context.keyManager.connect(addressCannotMakeCall).execute(payload))
            .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
            .withArgs(addressCannotMakeCall.address, 'CALL');
        });
      });
    });

    describe('when interacting via `executeRelayCall(...)`', () => {
      // Use channelId = 0 for sequential nonce
      const channelId = 0;

      describe('when signer has ALL PERMISSIONS', () => {
        describe('when signing tx with EIP191Signer `\\x19\\x00` prefix', () => {
          it('should execute successfully', async () => {
            const newName = 'New Name';

            const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
              newName,
            ]);
            const nonce = await context.keyManager.callStatic.getNonce(
              context.owner.address,
              channelId,
            );

            const validityTimestamps = 0;

            const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const HARDHAT_CHAINID = 31337;
            const valueToSend = 0;

            const encodedMessage = ethers.utils.solidityPack(
              ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
              [
                LSP6_VERSION,
                HARDHAT_CHAINID,
                nonce,
                validityTimestamps,
                valueToSend,
                executeRelayCallPayload,
              ],
            );

            const eip191Signer = new EIP191Signer();

            const { signature } = await eip191Signer.signDataWithIntendedValidator(
              context.keyManager.address,
              encodedMessage,
              LOCAL_PRIVATE_KEYS.ACCOUNT0,
            );

            await context.keyManager.executeRelayCall(
              signature,
              nonce,
              validityTimestamps,
              executeRelayCallPayload,
              { value: valueToSend },
            );

            const result = await targetContract.callStatic.getName();
            expect(result).to.equal(newName);
          });
        });

        describe('when signing with Ethereum Signed Message prefix', () => {
          it('should retrieve the incorrect signer address and revert with `InvalidRelayNonce` error', async () => {
            const newName = 'New Name';

            const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
              newName,
            ]);
            const nonce = await context.keyManager.callStatic.getNonce(
              context.owner.address,
              channelId,
            );

            const validityTimestamps = 0;

            const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const HARDHAT_CHAINID = 31337;
            const valueToSend = 0;

            const eip191Signer = new EIP191Signer();

            const encodedMessage = ethers.utils.solidityPack(
              ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
              [
                LSP6_VERSION,
                HARDHAT_CHAINID,
                nonce,
                validityTimestamps,
                valueToSend,
                executeRelayCallPayload,
              ],
            );

            const signature = await context.owner.signMessage(encodedMessage);

            const incorrectSignerAddress = eip191Signer.recover(
              eip191Signer.hashDataWithIntendedValidator(
                context.keyManager.address,
                encodedMessage,
              ),
              signature,
            );

            await expect(
              context.keyManager.executeRelayCall(
                signature,
                nonce,
                validityTimestamps,
                executeRelayCallPayload,
                { value: valueToSend },
              ),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'InvalidRelayNonce')
              .withArgs(incorrectSignerAddress, nonce, signature);
          });
        });
      });

      describe('when signer has permission CALL', () => {
        describe('when signing tx with EIP191Signer `\\x19\\x00` prefix', () => {
          describe('when caller has some allowed calls set', () => {
            it('should execute successfully', async () => {
              const newName = 'Another name';

              const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
                newName,
              ]);

              const nonce = await context.keyManager.callStatic.getNonce(
                addressCanMakeCallWithAllowedCalls.address,
                channelId,
              );

              const validityTimestamps = 0;

              const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
                'execute',
                [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
              );

              const HARDHAT_CHAINID = 31337;
              const valueToSend = 0;

              const encodedMessage = ethers.utils.solidityPack(
                ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
                [
                  LSP6_VERSION,
                  HARDHAT_CHAINID,
                  nonce,
                  validityTimestamps,
                  valueToSend,
                  executeRelayCallPayload,
                ],
              );

              const eip191Signer = new EIP191Signer();

              const { signature } = await eip191Signer.signDataWithIntendedValidator(
                context.keyManager.address,
                encodedMessage,
                LOCAL_PRIVATE_KEYS.ACCOUNT2,
              );

              await context.keyManager.executeRelayCall(
                signature,
                nonce,
                validityTimestamps,
                executeRelayCallPayload,
                { value: valueToSend },
              );

              const result = await targetContract.callStatic.getName();
              expect(result).to.equal(newName);
            });
          });

          describe('when caller has no allowed calls set', () => {
            it('should revert with `NotAllowedCall(...)` error', async () => {
              const newName = 'Another name';

              const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
                newName,
              ]);
              const nonce = await context.keyManager.callStatic.getNonce(
                addressCanMakeCallNoAllowedCalls.address,
                channelId,
              );

              const validityTimestamps = 0;

              const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
                'execute',
                [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
              );

              const HARDHAT_CHAINID = 31337;
              const valueToSend = 0;

              const encodedMessage = ethers.utils.solidityPack(
                ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
                [
                  LSP6_VERSION,
                  HARDHAT_CHAINID,
                  nonce,
                  validityTimestamps,
                  valueToSend,
                  executeRelayCallPayload,
                ],
              );

              const eip191Signer = new EIP191Signer();

              const { signature } = await eip191Signer.signDataWithIntendedValidator(
                context.keyManager.address,
                encodedMessage,
                LOCAL_PRIVATE_KEYS.ACCOUNT1,
              );

              await expect(
                context.keyManager.executeRelayCall(
                  signature,
                  nonce,
                  validityTimestamps,
                  executeRelayCallPayload,
                  { value: valueToSend },
                ),
              )
                .to.be.revertedWithCustomError(context.keyManager, 'NoCallsAllowed')
                .withArgs(addressCanMakeCallNoAllowedCalls.address);
            });
          });
        });

        describe('when signing tx with Ethereum Signed Message prefix', () => {
          it('should retrieve the incorrect signer address and revert with `InvalidRelayNonce` error', async () => {
            const newName = 'Another name';

            const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
              newName,
            ]);
            const nonce = await context.keyManager.callStatic.getNonce(
              addressCanMakeCallWithAllowedCalls.address,
              channelId,
            );

            const validityTimestamps = 0;

            const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const HARDHAT_CHAINID = 31337;
            const valueToSend = 0;

            const encodedMessage = ethers.utils.solidityPack(
              ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
              [
                LSP6_VERSION,
                HARDHAT_CHAINID,
                nonce,
                validityTimestamps,
                valueToSend,
                executeRelayCallPayload,
              ],
            );

            const signature = await addressCanMakeCallWithAllowedCalls.signMessage(encodedMessage);

            const eip191Signer = new EIP191Signer();
            const incorrectSignerAddress = eip191Signer.recover(
              eip191Signer.hashDataWithIntendedValidator(
                context.keyManager.address,
                encodedMessage,
              ),
              signature,
            );

            await expect(
              context.keyManager.executeRelayCall(
                signature,
                nonce,
                validityTimestamps,
                executeRelayCallPayload,
                { value: valueToSend },
              ),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'InvalidRelayNonce')
              .withArgs(incorrectSignerAddress, nonce, signature);
          });
        });
      });

      describe('when signer does not have permission CALL', () => {
        describe('when signing tx with EIP191Signer `\\x19\\x00` prefix', () => {
          it('should revert with `NotAuthorised` and permission CALL error', async () => {
            const initialName = await targetContract.callStatic.getName();

            const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
              'Random name',
            ]);
            const nonce = await context.keyManager.callStatic.getNonce(
              addressCannotMakeCall.address,
              channelId,
            );

            const validityTimestamps = 0;

            const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const HARDHAT_CHAINID = 31337;
            const valueToSend = 0;

            const encodedMessage = ethers.utils.solidityPack(
              ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
              [
                LSP6_VERSION,
                HARDHAT_CHAINID,
                nonce,
                validityTimestamps,
                valueToSend,
                executeRelayCallPayload,
              ],
            );

            const eip191Signer = new EIP191Signer();

            const { signature } = await eip191Signer.signDataWithIntendedValidator(
              context.keyManager.address,
              encodedMessage,
              LOCAL_PRIVATE_KEYS.ACCOUNT3,
            );

            await expect(
              context.keyManager.executeRelayCall(
                signature,
                nonce,
                validityTimestamps,
                executeRelayCallPayload,
                { value: valueToSend },
              ),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'NotAuthorised')
              .withArgs(addressCannotMakeCall.address, 'CALL');

            // ensure no state change at the target contract
            const result = await targetContract.callStatic.getName();
            expect(result).to.equal(initialName);
          });
        });

        describe('when signing tx with Ethereum Signed Message prefix', () => {
          it('should retrieve the incorrect signer address and revert with `NoPermissionSet`', async () => {
            const initialName = await targetContract.callStatic.getName();

            const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
              'Random name',
            ]);
            const nonce = await context.keyManager.callStatic.getNonce(
              addressCannotMakeCall.address,
              channelId,
            );

            const validityTimestamps = 0;

            const executeRelayCallPayload = context.universalProfile.interface.encodeFunctionData(
              'execute',
              [OPERATION_TYPES.CALL, targetContract.address, 0, targetContractPayload],
            );

            const HARDHAT_CHAINID = 31337;
            const valueToSend = 0;

            const encodedMessage = ethers.utils.solidityPack(
              ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
              [
                LSP6_VERSION,
                HARDHAT_CHAINID,
                nonce,
                validityTimestamps,
                valueToSend,
                executeRelayCallPayload,
              ],
            );

            const ethereumSignature = await addressCannotMakeCall.signMessage(encodedMessage);

            const eip191Signer = new EIP191Signer();

            const incorrectSignerAddress = await eip191Signer.recover(
              eip191Signer.hashDataWithIntendedValidator(
                context.keyManager.address,
                encodedMessage,
              ),
              ethereumSignature,
            );

            await expect(
              context.keyManager.executeRelayCall(
                ethereumSignature,
                nonce,
                validityTimestamps,
                executeRelayCallPayload,
                { value: valueToSend },
              ),
            )
              .to.be.revertedWithCustomError(context.keyManager, 'NoPermissionsSet')
              .withArgs(incorrectSignerAddress);

            // ensure state at target contract has not changed
            expect(await targetContract.callStatic.getName()).to.equal(initialName);
          });
        });
      });
    });
  });

  describe('`execute(...)` edge cases', async () => {
    let targetContract: TargetContract;
    let addressWithNoPermissions: SignerWithAddress;

    before(async () => {
      context = await buildContext();

      addressWithNoPermissions = context.accounts[1];

      targetContract = await new TargetContract__factory(context.accounts[0]).deploy();

      const permissionKeys = [
        ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] + context.owner.address.substring(2),
      ];

      const permissionValues = [ALL_PERMISSIONS];

      await setupKeyManager(context, permissionKeys, permissionValues);
    });

    it('Should revert when caller has no permissions set', async () => {
      const targetContractPayload = targetContract.interface.encodeFunctionData('setName', [
        'New Contract Name',
      ]);

      const executePayload = context.universalProfile.interface.encodeFunctionData('execute', [
        OPERATION_TYPES.CALL,
        targetContract.address,
        0,
        targetContractPayload,
      ]);

      await expect(context.keyManager.connect(addressWithNoPermissions).execute(executePayload))
        .to.be.revertedWithCustomError(context.keyManager, 'NoPermissionsSet')
        .withArgs(addressWithNoPermissions.address);
    });

    it('Should revert when caller calls the KeyManager through execute', async () => {
      const lsp20VerifyCallPayload = context.keyManager.interface.encodeFunctionData(
        'lsp20VerifyCall',
        [context.accounts[2].address, 0, '0xaabbccdd'], // random arguments
      );

      const executePayload = context.universalProfile.interface.encodeFunctionData('execute', [
        OPERATION_TYPES.CALL,
        context.keyManager.address,
        0,
        lsp20VerifyCallPayload,
      ]);

      await expect(
        context.keyManager.connect(context.owner).execute(executePayload),
      ).to.be.revertedWithCustomError(context.keyManager, 'CallingKeyManagerNotAllowed');
    });
  });
};
