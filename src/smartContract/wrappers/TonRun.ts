import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode,  } from 'ton-core';

export type TonRunConfig = {
    owner :Address;
    cost : bigint;
};

export function tonRunConfigToCell(config: TonRunConfig): Cell {
    return beginCell().storeAddress(config.owner).storeUint(config.cost, 32).endCell();
}

export class TonRun implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonRun(address);
    }

    static createFromConfig(config: TonRunConfig, code: Cell, workchain = 0) {
        const data = tonRunConfigToCell(config);
        const init = { code, data };
        return new TonRun(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendGameMoney(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(1, 32)
                    .storeUint(queryId, 64)
                    .endCell(),
        });
    }

    async sendPlayerMoney(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint, opts: {
        gameType: bigint;
        p1Address: Address;
        p2Address: Address;
        p3Address: Address;
        p1Ratio: bigint;
        p2Ratio: bigint;
        p3Ratio: bigint;
    }) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(2, 32)
                    .storeUint(queryId, 64)
                    .storeUint(opts.gameType, 16)
                    .storeAddress(opts.p1Address)
                    .storeUint(opts.p1Ratio, 16)
                    .storeAddress(opts.p2Address)
                    .storeUint(opts.p2Ratio, 16)
                    .storeAddress(opts.p3Address)
                    .storeUint(opts.p3Ratio, 16)
                    .endCell(),
        });
    }

    async sendWithdrawMoney(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint, amount: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(3, 32)
                    .storeUint(queryId, 64)
                    .storeCoins(amount)
                    .endCell(),
        });
    }

    async sendChangeCost(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint, newCost: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(1, 32)
                    .storeUint(queryId, 64)
                    .storeUint(newCost, 32)
                    .endCell(),
        });
    }

    async getData(provider: ContractProvider) {
        const { stack } = await provider.get("get_contract_storage_data", []);
        return {
          recent_sender: stack.readAddress(),
          owner_address: stack.readNumber(),
        };
      }
      
    async getBalance(provider: ContractProvider) {
        const { stack } = await provider.get("balance", []);
        return {
          number: stack.readNumber(),
        };
    }
}
