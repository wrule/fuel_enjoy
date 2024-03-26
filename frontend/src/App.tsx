import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
// Import the contract factory -- you can find the name in src/contracts/contracts/index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi__factory  } from "./sway-api"
import type { CounterContractAbi } from "./sway-api";
import { PixelCanvas } from "./components/PixelCanvas";

const CONTRACT_ID =
  "0x80edb0b8111d4236d269d0fd1950f432646dea2c8ea1d8535e3041cbb6bbb4e9";

export default function Home() {
  const [contract, setContract] = useState<CounterContractAbi>();
  const [counter, setCounter] = useState<number>();
  const { connect, setTheme, isConnecting } =
    useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();

  setTheme("dark");

  useEffect(() => {
    async function getInitialCount(){
      if(isConnected && wallet){
        const counterContract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);
        await getCount(counterContract);
        setContract(counterContract);
      }
    }

    getInitialCount();
  }, [isConnected, wallet]);

  const getCount = async (counterContract: CounterContractAbi) => {
    try{
      const { value } = await counterContract.functions
      .count()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .simulate();
      setCounter(value.toNumber());
    } catch(error) {
      console.error(error);
    }
  }

  const onIncrementPressed = async () => {
    if (!contract) {
      return alert("Contract not loaded");
    }
    try {
      await contract.functions
      .increment()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .call();
      await getCount(contract);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        {isConnected ? (
          <>
            <h3>Counter</h3>
            <div>
              {counter ?? 0}
            </div>
            <button
            onClick={onIncrementPressed}
            >
              Increment Counter
            </button>
          </>
        ) : (
          <button
          onClick={() => {
            connect();
          }}
          >
            {isConnecting ? 'Connecting' : 'Connect'}
          </button>
        )}
      </div>
      <PixelCanvas />
    </div>
  );
}
