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
  "0xdddecf45a15c743934d38aad9aa5e04329185781724c382ea77138db05b059f1";

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
        whichIsMax(counterContract);
        await getCount(counterContract);
        setContract(counterContract);
        const { value } = await counterContract.functions
        .loop_always()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .simulate();
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

  const whichIsMax = async (counterContract: CounterContractAbi) => {
    try{
      const { value } = await counterContract.functions
        .which_is_max(322, 28)
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .simulate();
      console.log(1234, value.toNumber());
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
