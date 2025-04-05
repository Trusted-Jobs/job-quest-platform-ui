import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { signedTransaction } = req.body;

      const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER || "https://alfajores-forno.celo-testnet.org");

      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
      const txResponse = await wallet.sendTransaction(signedTransaction);
      await txResponse.wait();

      res.status(200).json({ message: "Tokens successfully transferred to contract!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to transfer tokens." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
