'use client'; // Important for client-side React hooks

import React, { useState } from 'react';
import { useOkto, OktoContextType } from 'okto-sdk-react';

export default function CreateWalletComponent() {
    const [walletResult, setWalletResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const { createWallet } = useOkto() as OktoContextType;

    const handleCreateWallet = async () => {
        try {
            const result = await createWallet();
            setWalletResult(result);
            console.log(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.error('Wallet creation error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleCreateWallet}>Create Wallet</button>
            {walletResult && (
                <div>
                    <h2>Wallet Created Successfully</h2>
                    <pre>{JSON.stringify(walletResult, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}