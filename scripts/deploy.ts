import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("AKToken");
  const myToken = await MyToken.deploy("2000000000000000000000000");
  const Presale = await ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(1000, myToken.target);

  const transferTx = await myToken?.transfer(
    presale.target,
    "2000000000000000000000000"
  );
  await transferTx.wait();
  const startPresaleTx = await presale.startPresale(3628800);
  await startPresaleTx.wait();
  console.log("MyToken deployed to:", myToken.target);
  console.log("Presale deployed to:", presale.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
