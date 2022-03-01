const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("NFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Flauuuschi = await ethers.getContractFactory("Flauuuschi");
    const flauuuschi = await Flauuuschi.deploy();
    await flauuuschi.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await flauuuschi.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await flauuuschi.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await flauuuschi.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await flauuuschi.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await flauuuschi.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
