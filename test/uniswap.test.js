const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Uniswap', () => {
  let ShikhaToken;
  let shikhaToken;
  let Uniswap;
  let uniswap;
  let addr1;
  let addr2;
  let owner;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    ShikhaToken = await ethers.getContractFactory('ShikhaToken');
    ShikhaToken = await ShikhaToken.deploy();
    await shikhaToken.deployed();
    shikhaTokenAddress = shikhaToken.address;

    // Uniswap
    Uniswap = await ethers.getContractFactory('Uniswap');
    uniswap = await Uniswap.deploy(shikhaTokenAddress);
    await uniswap.deployed();
    uniswapAddress = uniswap.address;
  });

  it('Should mint the token ', async () => {
    await shikhaToken.mint(addr1.address, 10000000000);
    expect(await shikhaToken.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseUnits('10000000000', 18)
    );
  });

  it('Should approve the uniswap contract', async () => {
    await shikhaToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
  });

  it('Should transfer the token to uniswap contract', async () => {
    await shikhaToken.mint(addr1.address, 10000000000);
    await shikhaToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await shikhaToken
      .connect(addr1)
      .transfer(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
  });

  it('Should add liquidity', async function () {
    await shikhaToken.mint(addr1.address, 10000000000);
    await shikhaToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidity(ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
  });

  it('Should swap token for ETH ', async () => {
    await shikhaToken.mint(addr1.address, 100000000000000);
    await shikhaToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('100000000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidity(ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
    await uniswap
      .connect(addr1)
      .swapTokensForETH(ethers.utils.parseUnits('1000', 18));
  });

  it('Should add liquidity', async function () {
    await shikhaToken.mint(addr1.address, 100000000000000);
    await shikhaToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('100000000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidity(ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
    await uniswap
      .connect(addr1)
      .swapTokensForETH(ethers.utils.parseUnits('1000', 18));

    const amountBefore = await uniswap.ETHStored(addr1.address);
    await uniswap.connect(addr1).withdrawETH(amountBefore);

    const amountAfter = await uniswap.ETHStored(addr1.address);
    expect(amountBefore).to.be.not.equal(amountAfter);
  });
});
