

// import { Buffer } from "buffer";

// import { TonClient, WalletContractV4 } from "ton";
// // import { mnemonicToPrivateKey } from "ton-crypto";

// // Create Client
// const client = new TonClient({
//     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
// });

// export const getTonBalance = async (publicKey: string) => {
//   // Assuming publicKey is in hex format. Convert to Buffer if needed.
//   const publicKeyBuffer = Buffer.from(publicKey, 'hex');
//   const wallet = WalletContractV4.create({ workchain: 0, publicKey: publicKeyBuffer });
//   const contract = client.open(wallet);

//   // Get balance
// //   const balance = await contract.getBalance();
//   const balance = await contract.getBalance();

// console.log(balance);

//   // Return balance in TON (convert from nanotons)
//   return Number(balance) / 1e9;
// };

import { TonClient, Address } from "ton";

// Create Client
const client = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});

export const getTonBalance = async (address: string) => {
  try {
    console.log(`Parsing address: ${address}`);
    const parsedAddress = Address.parse(address);
    console.log(`Parsed address: ${parsedAddress.toString()}`);
    const balance = await client.getBalance(parsedAddress);
    console.log(`Raw balance: ${balance}`);
    // Return balance in TON (convert from nanotons)
    return Number(balance) / 1e9;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};
