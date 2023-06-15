import { ethers } from "hardhat";
import { expect } from "chai";
import { LSP8MintableInit, LSP8MintableInit__factory } from "../../../types";

import { shouldInitializeLikeLSP8 } from "../LSP8IdentifiableDigitalAsset.behaviour";
import {
  shouldBehaveLikeLSP8Mintable,
  LSP8MintableTestContext,
  getNamedAccounts,
} from "../LSP8Mintable.behaviour";

import { deployProxy } from "../../utils/fixtures";

describe("LSP8MintableInit with proxy", () => {
  const buildTestContext = async () => {
    const accounts = await getNamedAccounts();
    const deployParams = {
      name: "LSP8 Mintable - deployed with proxy",
      symbol: "MNTBL",
      newOwner: accounts.owner.address,
    };

    const LSP8MintableInit: LSP8MintableInit = await new LSP8MintableInit__factory(
      accounts.owner,
    ).deploy();

    const lsp8MintableProxy = await deployProxy(LSP8MintableInit.address, accounts.owner);
    const lsp8Mintable: LSP8MintableInit = LSP8MintableInit.attach(lsp8MintableProxy);

    return { accounts, lsp8Mintable, deployParams };
  };

  const initializeProxy = async (context: LSP8MintableTestContext) => {
    return context.lsp8Mintable["initialize(string,string,address)"](
      context.deployParams.name,
      context.deployParams.symbol,
      context.deployParams.newOwner,
    );
  };

  describe("when deploying the base implementation contract", () => {
    it("prevent any address from calling the initialize(...) function on the implementation", async () => {
      const accounts = await ethers.getSigners();

      const lsp8Mintable = await new LSP8MintableInit__factory(accounts[0]).deploy();

      const randomCaller = accounts[1];

      await expect(
        lsp8Mintable["initialize(string,string,address)"](
          "XXXXXXXXXXX",
          "XXX",
          randomCaller.address,
        ),
      ).to.be.revertedWith("Initializable: contract is already initialized");
    });
  });

  describe("when deploying the contract as proxy", () => {
    let context: LSP8MintableTestContext;

    before(async () => {
      context = await buildTestContext();
    });

    describe("when initializing the contract", () => {
      shouldInitializeLikeLSP8(async () => {
        const { lsp8Mintable: lsp8, deployParams } = context;
        const initializeTransaction = await initializeProxy(context);

        return {
          lsp8,
          deployParams,
          initializeTransaction,
        };
      });
    });

    describe("when calling initialize more than once", () => {
      it("should revert", async () => {
        await expect(initializeProxy(context)).to.be.revertedWith(
          "Initializable: contract is already initialized",
        );
      });
    });
  });

  describe("when testing deployed contract", () => {
    shouldBehaveLikeLSP8Mintable(() =>
      buildTestContext().then(async (context) => {
        await initializeProxy(context);
        return context;
      }),
    );
  });
});
