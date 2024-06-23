// import { toNano } from '@ton/core';
// import { mnemonicToWalletKey } from "ton-crypto";
// import { TonRun, TonRunConfig } from '../wrappers/TonRun';
// import { WalletContractV4 } from "@ton/ton";

// import { compile, NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {

//     const mnemonic = "drum worth sort drink soda flower brave fog project furnace virtual moment dream garbage fog keep broom put sure rival thought seed rescue siren"; 
//     const key = await mnemonicToWalletKey(mnemonic.split(" "));
//     const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
//     const config: TonRunConfig = {owner: wallet.address, cost: BigInt(2) };



//     const tonRun = provider.open(TonRun.createFromConfig(config, await compile('TonRun')));

//     await tonRun.sendDeploy(provider.sender(), toNano('0.05'));

//     await provider.waitForDeploy(tonRun.address);

//     // run methods on `tonRun`
// }
