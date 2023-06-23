import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployKeyManager: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();

  const UniversalProfile = await deployments.get('UniversalProfile');

  await deploy('LSP6KeyManager', {
    from: owner,
    args: [UniversalProfile.address],
    gasPrice: ethers.BigNumber.from(20_000_000_000), // in wei
    log: true,
  });
};

export default deployKeyManager;
deployKeyManager.tags = ['LSP6KeyManager', 'standard'];
deployKeyManager.dependencies = ['UniversalProfile'];
