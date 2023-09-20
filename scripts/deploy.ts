import { ethers } from "hardhat";

async function main() {

  const m2MPayments = await ethers.deployContract("M2MPayments");

  await m2MPayments.waitForDeployment();

  console.log("M2MPayments deployed to : ",await m2MPayments.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
