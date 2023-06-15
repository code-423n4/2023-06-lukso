import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { UniversalProfileInit__factory, LSP6KeyManagerInit__factory } from "../../types";

import { deployProxy } from "../utils/fixtures";
import { LSP6TestContext } from "../utils/context";

import { shouldBehaveLikeLSP6ReentrancyScenarios } from "./LSP6/LSP6Reentrancy.test";
import { shouldBehaveLikeLSP20WithLSP6ReentrancyScenarios } from "./LSP20/LSP20WithLSP6Reentrancy.test";

describe("Reentrancy scenarios with proxy", () => {
  const buildProxyTestContext = async (initialFunding?: BigNumber): Promise<LSP6TestContext> => {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];

    const baseUP = await new UniversalProfileInit__factory(owner).deploy();
    const upProxy = await deployProxy(baseUP.address, owner);
    const universalProfile = await baseUP.attach(upProxy);

    const baseKM = await new LSP6KeyManagerInit__factory(owner).deploy();
    const kmProxy = await deployProxy(baseKM.address, owner);
    const keyManager = await baseKM.attach(kmProxy);

    return { accounts, owner, universalProfile, keyManager, initialFunding };
  };

  const initializeProxies = async (context: LSP6TestContext) => {
    await context.universalProfile["initialize(address)"](context.owner.address, {
      value: context.initialFunding,
    });

    await context.keyManager["initialize(address)"](context.universalProfile.address);

    return context;
  };

  describe("when testing Reentrancy scenarios for LSP6", () => {
    shouldBehaveLikeLSP6ReentrancyScenarios(async (initialFunding?: BigNumber) => {
      let context = await buildProxyTestContext(initialFunding);
      await initializeProxies(context);
      return context;
    });
  });

  describe("when testing Reentrancy scenarios for LSP20 + LSP6", () => {
    shouldBehaveLikeLSP20WithLSP6ReentrancyScenarios(async (initialFunding?: BigNumber) => {
      let context = await buildProxyTestContext(initialFunding);
      await initializeProxies(context);
      return context;
    });
  });
});
