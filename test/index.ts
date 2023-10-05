const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("M2MPayments", function () {
  let M2MPayments:any;
  let m2mPayments:any;
  let owner:any;
  let user1:any;
  let user2:any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    M2MPayments = await ethers.getContractFactory("M2MPayments");
    m2mPayments = await M2MPayments.deploy();
    await m2mPayments.deployed();
  });

  it("should allow deposits", async function () {
    const depositAmount = ethers.utils.parseEther("1");
    await m2mPayments.connect(user1).deposit({ value: depositAmount });

    const balance = await m2mPayments.balances(user1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("should allow transfers", async function () {
    const depositAmount = ethers.utils.parseEther("1");
    const transferAmount = ethers.utils.parseEther("0.5");

    await m2mPayments.connect(user1).deposit({ value: depositAmount });
    await m2mPayments.connect(user1).transfer(user2.address, transferAmount);

    const senderBalance = await m2mPayments.balances(user1.address);
    const receiverBalance = await m2mPayments.balances(user2.address);

    expect(senderBalance).to.equal(depositAmount.sub(transferAmount));
    expect(receiverBalance).to.equal(transferAmount);
  });

  it("should allow the owner to withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("1");

    await m2mPayments.connect(user1).deposit({ value: depositAmount });

    const initialOwnerBalance = await user1.getBalance();
    
    const withdrawalAmount = ethers.utils.parseEther("1");

    await m2mPayments.connect(owner).withdraw(withdrawalAmount);

    const finalOwnerBalance = await owner.getBalance();
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(withdrawalAmount));
  });
});
