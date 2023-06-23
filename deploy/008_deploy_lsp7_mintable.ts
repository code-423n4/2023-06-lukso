import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployLSP7Mintable: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();

  await deploy('LSP7Mintable', {
    from: owner,
    args: ['LSP7 Mintable', 'LSP7M', owner, false],
    gasPrice: ethers.BigNumber.from(20_000_000_000), // in wei,
    log: true,
  });
};

export default deployLSP7Mintable;
deployLSP7Mintable.tags = ['LSP7Mintable', 'standard'];
