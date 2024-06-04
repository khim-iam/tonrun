import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TonRun, TonRunConfig } from '../wrappers/TonRun';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TonRun', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TonRun');
    });

    let blockchain: Blockchain;
    let owner: SandboxContract<TreasuryContract>;
    let tonRun: SandboxContract<TonRun>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        owner = await blockchain.treasury('deployer');

        const config: TonRunConfig = {owner: owner.address, cost: BigInt(2)};
        tonRun = blockchain.openContract(TonRun.createFromConfig(config, code));

        const deployResult = await tonRun.sendDeploy(owner.getSender(), toNano('0.05'));

        console.log('Deploy Result:', deployResult); // Add logging here

        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: tonRun.address,
            deploy: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonRun are ready to use
    });


    it('successfully deposits game money in contract', async () => {
        const sendersWallet = await blockchain.treasury('caller');
        
        const depositMessageResult = await tonRun.sendGameMoney(sendersWallet.getSender(), toNano(5.01), 12345n, );
        
        expect(depositMessageResult.transactions).toHaveTransaction({
            from: sendersWallet.address,
            to: tonRun.address,
            success: true,
          });
        
        const balanceRequest = await tonRun.getBalance();
        expect(balanceRequest.number).toBeGreaterThan(toNano("4.99"));
    });


    it("successfully withdraws funds on behalf of owner", async () => {
        const senderWallet = await blockchain.treasury("sender");
    
        await tonRun.sendGameMoney(senderWallet.getSender(), toNano(5.01), 12345n, );
    
        const withdrawalRequestResult = await tonRun.sendWithdrawMoney(
          owner.getSender(),
          toNano("0.05"),
          12345n,
          toNano("1")
        );
    
        expect(withdrawalRequestResult.transactions).toHaveTransaction({
          from: tonRun.address,
          to: owner.address,
          success: true,
          value: toNano(1),
        });
      });


    it("fails to withdraw funds because lack of balance", async () => {
        const withdrawalRequestResult = await tonRun.sendWithdrawMoney(
            owner.getSender(),
            toNano("0.05"),
            12345n,
            toNano("1")
        );
    
        expect(withdrawalRequestResult.transactions).toHaveTransaction({
          from: owner.address,
          to: tonRun.address,
          success: false,
          exitCode: 104,
        });
      });

      it('should send money to multiple addresses', async () => {
        const player1 = await blockchain.treasury('player1');
        const player2 = await blockchain.treasury('player2');
        const player3 = await blockchain.treasury('player3');

        const gameType = 20 ;


        const ratios = [20, 60, 20];
        const addresses = [player1.address, player2.address, player3.address];

        await tonRun.sendGameMoney(player1.getSender(), toNano(gameType), 12345n, );
        await tonRun.sendGameMoney(player1.getSender(), toNano(gameType), 12345n, );
        await tonRun.sendGameMoney(player1.getSender(), toNano(gameType), 12345n, );

        // const balance1 = player1.getBalance();
        // const balance2 = player1.getBalance();
        // const balance3 = player1.getBalance();

        
        

        const sendFundsResult = await tonRun.sendPlayerMoney(
            owner.getSender(),
            toNano("0.05"),
            12345n,
            {
                gameType: BigInt(gameType),
                p1Address: addresses[0],
                p2Address: addresses[1],
                p3Address: addresses[2],
                p1Ratio: BigInt(ratios[0]),
                p2Ratio: BigInt(ratios[1]),
                p3Ratio: BigInt(ratios[2]),
            }
        );



        
        // console.log(sendFundsResult);

        expect(sendFundsResult.transactions).toHaveTransaction({
            from: owner.address,
            to: tonRun.address,
            success: true,
        });




    });




});