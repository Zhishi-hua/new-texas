import { connectWithMetaMask, connectWithPrivateKey, WalletSession } from '@/src/api/service';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface WalletContextValue {
  status: 'idle' | 'connecting' | 'connected' | 'error';
  session?: WalletSession;
  error?: string;
  connectMetaMask: () => Promise<void>;
  connectPrivateKey: (privateKey: string) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<WalletSession | undefined>();
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [error, setError] = useState<string | undefined>();

  const connect = async (fn: () => Promise<WalletSession>) => {
    setStatus('connecting');
    setError(undefined);
    try {
      const nextSession = await fn();
      setSession(nextSession);
      setStatus('connected');
    } catch (err) {
      setStatus('error');
      setSession(undefined);
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  };

  const connectMetaMask = () => connect(connectWithMetaMask);

  const connectPrivateKey = (privateKey: string) =>
    connect(() => connectWithPrivateKey(privateKey));

  const disconnect = () => {
    setSession(undefined);
    setStatus('idle');
    setError(undefined);
  };

  const value = useMemo<WalletContextValue>(
    () => ({
      status,
      session,
      error,
      connectMetaMask,
      connectPrivateKey,
      disconnect,
    }),
    [status, session, error],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet 必须在 WalletProvider 内使用');
  }
  return context;
}
