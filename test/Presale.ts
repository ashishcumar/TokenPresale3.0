const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n: string) => {
  return ethers.parseUnits(n.toString(), "ether");
};

const contractInitialTokens = "2000000000000000000000000";

describe("Presale", () => {
  let tokenContract: {
    balanceOf(target: string): unknown;
    transfer(target: string, contractInitialTokens: string): unknown;
    target: string;
    owner: () => any;
  };
  let presaleContract: {
    address: string;
    withdrawTokens(): unknown;
    owner(): unknown;
    withdraw(): unknown;
    rate(): unknown;
    setRate(arg0: number): unknown;
    started(): unknown;
    startPresale(arg0: number): unknown;
    connect(buyer: any): any;
    buyTokens({ value }: { value: string }): unknown;
    target: string;
  };
  let deployer: { address: any };
  let buyer: any;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const tokenContractRef = await ethers.getContractFactory("AKToken");
    const presaleContractRef = await ethers.getContractFactory("Presale");
    tokenContract = await tokenContractRef.deploy(contractInitialTokens);
    presaleContract = await presaleContractRef.deploy(
      1000,
      tokenContract.target
    );
    await tokenContract?.transfer(
      presaleContract?.target,
      contractInitialTokens
    );
    await presaleContract.startPresale(86400);
  });

  describe("Deployment", () => {
    it("set the owner", async () => {
      const owner = await tokenContract?.owner();
      const presaleOwner = await presaleContract?.owner();
      expect(owner).to.equal(deployer.address);
      expect(presaleOwner).to.equal(deployer.address);
    });
  });

  describe("contract functions", () => {
    it("transfer all token from token contract to the presale contract", async () => {
      const presaleContractBalance = await tokenContract?.balanceOf(
        presaleContract?.target
      );
      expect(presaleContractBalance).to.equal(contractInitialTokens);
    });

    it("starts the presale", async () => {
      const isPresaleStarted = await presaleContract?.started();
      expect(isPresaleStarted).to.equal(true);
    });

    it("buy token using 1eth", async () => {
      await presaleContract?.connect(buyer).buyTokens({ value: tokens("1") });
      const buyerBalance = await tokenContract?.balanceOf(buyer.address);
      expect(buyerBalance).to.equal("1000000000000000000000");
    });

    it("set the rate of token to 2k", async () => {
      await presaleContract.setRate(2000);
      const rate = await presaleContract?.rate();
      expect(rate).to.equal(2000);
    });
  });

  describe("withdraw", () => {
    beforeEach(async () => {
      await presaleContract?.connect(buyer).buyTokens({ value: tokens("1") });
    });

    it("check withdraw", async () => {
      const initialOwnerBalance = await ethers.provider.getBalance(
        deployer.address
      );
      await presaleContract.withdraw();
      const finalOwnerBalance = await ethers.provider.getBalance(
        deployer.address
      );
      expect(finalOwnerBalance).to.be.above(initialOwnerBalance);
    });

    it("should withdraw remaining tokens from the contract", async () => {
      const initialOwnerTokenBalance = await tokenContract.balanceOf(
        deployer.address
      );
      await presaleContract.withdrawTokens();
      const finalOwnerTokenBalance = await tokenContract.balanceOf(
        deployer.address
      );
      const remainingTokens = await tokenContract.balanceOf(
        presaleContract.target
      );
      expect(finalOwnerTokenBalance).to.be.above(initialOwnerTokenBalance);
      expect(remainingTokens).to.equal(0);
    });
  });
});
