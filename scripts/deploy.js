const hre = require('hardhat');

async function main() {
  const ShikhaToken = await hre.ethers.getContractFactory('ShikhaToken');
  const shikhaToken = await ShikhaToken.deploy();

  await shikhaToken.deployed();

  console.log('ShikhaToken deployed to:', shikhaToken.address);

  const Uniswap = await hre.ethers.getContractFactory('Uniswap');
  const uniswap = await Uniswap.deploy(shikhaToken.address);

  await uniswap.deployed();

  console.log('Uniswap Token deployed to:', uniswap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
