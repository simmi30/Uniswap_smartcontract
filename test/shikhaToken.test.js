const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

describe('shikhaToken', function () {
  it('Should return the correct symbol', async function () {
    const ShikhaToken = await ethers.getContractFactory('ShikhaToken');
    const shikhaToken = await ShikhaToken.deploy();
    await shikhaToken.deployed();

    expect(await shikhaToken.symbol()).to.equal('SHI');
  });

  it('Should return the correct name', async function () {
    const ShikhaToken = await ethers.getContractFactory('ShikhaToken');
    const shikhaToken = await ShikhaToken.deploy();
    await shikhaToken.deployed();

    expect(await shikhaToken.name()).to.equal('ShikhaToken');
  });
});
