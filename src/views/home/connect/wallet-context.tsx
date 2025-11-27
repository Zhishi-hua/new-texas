import { useWalletStore } from '@/src/store/wallet-store';
import { ReactNode } from 'react';

// 为了保持 API 兼容性，保留 Provider 组件（虽然现在不需要了）
export function WalletProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// 使用 zustand store 的 hook
export function useWallet() {
  const { status, session, error, connectMetaMask, connectPrivateKey, disconnect } =
    useWalletStore();
  return {
    status,
    session,
    error,
    connectMetaMask,
    connectPrivateKey,
    disconnect,
  };
}
