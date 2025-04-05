import { NextApiRequest, NextApiResponse } from 'next';
import { 
    SelfBackendVerifier,
} from '@selfxyz/core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { proof, publicSignals } = req.body;

            if (!proof || !publicSignals) {
                return res.status(400).json({ message: 'Proof and publicSignals are required' });
            }

            console.log("Proof:", proof);
            console.log("Public signals:", publicSignals);

            // Uncomment this to use the Self backend verifier for offchain verification instead
            const selfdVerifier = new SelfBackendVerifier(
                "https://forno.celo.org",
                "default",
                "https://trusted-jobs-ui.vercel.app/api/verify",
                "hex",
                // true // If you want to use mock passport
            );
            const result = await selfdVerifier.verify(proof, publicSignals);
            console.log("Verification result:", result);

            try {
                console.log("Successfully called verifySelfProof function");
                res.status(200).json({
                    status: 'success',
                    result: true,
                    credentialSubject: result.credentialSubject,
                });
            } catch (error) {
                console.error("Error calling verifySelfProof function:", error);
                res.status(400).json({
                    status: 'error',
                    result: false,
                    message: 'Verification failed or date of birth not disclosed',
                    details: {},
                });
                throw error;
            }
        } catch (error) {
            console.error('Error verifying proof:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error verifying proof',
                result: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}