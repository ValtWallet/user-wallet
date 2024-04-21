require("dotenv").config();
const { ethers, HDNodeWallet } = require("ethers");

const mnemonic = process.env.MNEMONIC;


function getWallet(index) {
    const path = "m/44'/60'/0'/0/" + `${index}`;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic,path);
    return wallet;
}

async function getAddressByIndex(index) {
    const path = "m/44'/60'/0'/0/" + `${index}`;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic,path);
    const address = await wallet.getAddress();
    return address;
}

module.exports = { getWallet, getAddressByIndex };