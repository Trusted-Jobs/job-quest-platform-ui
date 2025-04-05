import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    deleteCookie("email", { req, res });
    deleteCookie("name", { req, res });
    deleteCookie("isVerifiedLength", { req, res });
    deleteCookie("disclosures", { req, res });

    return res.status(200).json({ message: "Logout successful" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
