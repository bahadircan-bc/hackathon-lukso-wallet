const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomToken", function () {
  let CustomToken, customToken, owner, addr1;

  beforeEach(async function () {
    CustomToken = await ethers.getContractFactory("CustomToken");
    [owner, addr1] = await ethers.getSigners();
    customToken = await CustomToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await customToken.owner()).to.equal(owner.address);
    });

    it("Should have the correct decimals", async function () {
      expect(await customToken.decimals()).to.equal(18); // Assuming 18 decimals as standard
    });

    it("Should assign the initial total supply to the owner", async function () {
      const ownerBalance = await customToken.balanceOf(owner.address);
      expect(await customToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await customToken.transfer(owner.address, addr1.address, 50, true, "0x");
      const addr1Balance = await customToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await customToken.balanceOf(owner.address);
      await expect(customToken.transfer(owner.address, addr1.address, initialOwnerBalance + 1, true, "0x"))
          .to.be.reverted
    });

    it("Should update balances after transfers", async function () {
      await customToken.transfer(owner.address, addr1.address, 100, true, "0x");
      await customToken.transfer(owner.address, addr1.address, 50, true, "0x");

      const addr1Balance = await customToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(150);
    });
  });
});
