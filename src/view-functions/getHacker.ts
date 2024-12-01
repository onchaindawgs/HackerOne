import { aptosClient } from "@/utils/aptosClient";

export const getHacker = async (address: `0x${string}`) => {
  try {
    console.log("get hackers fxn run");
    console.log("Contract Address", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const hacker = await aptosClient().view({
      payload: {
        function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::HackerOneCore::getHacker`,
        typeArguments: [],
        functionArguments: [address],
      },
    });
    console.log(hacker[0]);
    if (hacker[0]) return hacker[0];
    else return null;
  } catch (error: any) {
    if (error.message.includes("112")) {
      console.error("Account not present");
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null;
  }
};
