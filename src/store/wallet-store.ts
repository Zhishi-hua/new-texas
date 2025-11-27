import { connectWithMetaMask, connectWithPrivateKey, WalletSession } from '@/src/api/connet';
import { create } from 'zustand';

interface WalletState {
  status: 'idle' | 'connecting' | 'connected' | 'error';
  session?: WalletSession;
  error?: string;
  connectMetaMask: () => Promise<void>;
  connectPrivateKey: (privateKey: string) => Promise<void>;
  disconnect: () => void;
}

const STORAGE_KEY = 'wallet-storage';

// 从 localStorage 加载状态
const loadState = (): Partial<Pick<WalletState, 'session' | 'status'>> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        session: parsed.session,
        status: parsed.status === 'connected' ? ('connected' as const) : ('idle' as const),
      };
    }
  } catch {
    // 忽略解析错误
  }
  return {};
};

// 保存状态到 localStorage
const saveState = (session?: WalletSession, status?: 'idle' | 'connected') => {
  if (typeof window === 'undefined') return;
  try {
    const data = {
      session,
      status: status === 'connected' ? 'connected' : 'idle',
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 忽略存储错误
  }
};

// 清除 localStorage
const clearState = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 忽略删除错误
  }
};

// 初始化状态
const initialState = loadState();

export const useWalletStore = create<WalletState>((set) => ({
  status: (initialState.status as WalletState['status']) || 'idle',
  session: initialState.session,
  error: undefined,

  connectMetaMask: async () => {
    set({ status: 'connecting', error: undefined });
    try {
      const session = await connectWithMetaMask();
      set({ session, status: 'connected', error: undefined });
      saveState(session, 'connected');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'MetaMask 连接失败';
      set({ status: 'error', session: undefined, error: message });
      throw error;
    }
  },

  connectPrivateKey: async (privateKey: string) => {
    set({ status: 'connecting', error: undefined });
    try {
      const session = await connectWithPrivateKey(privateKey);
      set({ session, status: 'connected', error: undefined });
      saveState(session, 'connected');
    } catch (error) {
      const message = error instanceof Error ? error.message : '私钥连接失败';
      set({ status: 'error', session: undefined, error: message });
      throw error;
    }
  },

  disconnect: () => {
    set({ session: undefined, status: 'idle', error: undefined });
    clearState();
  },
}));
