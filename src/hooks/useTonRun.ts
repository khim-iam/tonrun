// import { useEffect, useState } from "react";
import { TonRun } from "../smartContract/wrappers/TonRun.ts";
import { useTonClient } from "./useTonClients.ts";
import { useAsyncInitialize } from "./useAsyncInitialize.ts";
import { Address, OpenedContract } from "ton-core";
import { useTonConnect } from "./useTonConnect.ts";
import { Contract } from "ton-core";

export function useTonRun() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  // const [contractData, setContractData] = useState<null | {
  //   owner_address: Address;
  //   cost: number;
  // }>();

  const tonRun = useAsyncInitialize(async () => {
    if (!client) return;
    const contract : Contract = new TonRun(Address.parse("EQDK3yFtTu15gvFqo8RsyYa9h7Hmlru-On48v8V2i9UecW7W"))  ;
    // const contract = TonRun.createFromAddress(Address.parse("EQDyfAlrcoKHSo-IeafeYjMBNdtUmrLkqV3iGNJqxixljROw");
    return client.open(contract) as OpenedContract<TonRun>;
  }, [client]);

  // useEffect(() => {
  //   async function getValue() {
  //     if (!tonRun) return;
  //     setContractData(null);
  //     const val = await tonRun.getData();
  //     setContractData({
  //       owner_address: val.owner_address,
  //       cost: val.cost
  //     });
  //   }
  //   getValue();
  // }, [tonRun]);

  return {
    // contract_address: tonRun?.address.toString(),
    // ...contractData,
    sendGameMoney: (league : bigint ) => {
      return tonRun?.sendGameMoney(sender, league, 12345n);
    },
  };
}