require("dotenv").config();
const { ethers } = require("ethers");
const utils = require('./utils');
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);
const mnemonic = process.env.MNEMONIC;

const account1 = utils.getAddressByIndex(1) // Your account address 1
const account2 = utils.getAddressByIndex(0) // Your account address 2

const privateKey1 =  utils.getWallet(1).privateKey;
const wallet = new ethers.Wallet(privateKey1, provider);

//const address = "0xdA2685Ff4c390551899BB81Ad9f92EBb21488D22";

// Gunakan async function untuk menggunakan await
const main = async () => {    
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    const gasPrice = await provider.getGasPrice();
    const gasLimit = 40000; // jumlah gas yang digunakan untuk transaksi standar
    const gasCost = gasPrice.mul(gasLimit);
    const value = senderBalanceBefore.sub(gasCost);
    const valueToSend = value.mul(99).div(100);

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: valueToSend
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()