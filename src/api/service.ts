import { getEthereumProvider, normalizePrivateKey } from '@/src/utils/wallet';

export type WalletProviderSource = 'metamask' | 'private-key';

export interface WalletSession {
  address: string;
  chainId?: string;
  source: WalletProviderSource;
}

export async function connectWithMetaMask(): Promise<WalletSession> {
  const ethereum = getEthereumProvider();
  if (!ethereum) {
    throw new Error('未检测到 MetaMask，请先安装或启用浏览器钱包');
  }

  const [address] = (await ethereum.request<string[]>({ method: 'eth_requestAccounts' })) ?? [];
  if (!address) {
    throw new Error('MetaMask 未返回任何账户');
  }
  const chainId = await ethereum.request<string>({ method: 'eth_chainId' });
  return {
    address,
    chainId,
    source: 'metamask',
  };
}

export async function connectWithPrivateKey(privateKey: string): Promise<WalletSession> {
  const normalized = normalizePrivateKey(privateKey);
  if (!normalized) {
    throw new Error('私钥格式不正确，需要 64 位十六进制字符');
  }

  const address = `0x${normalized.slice(-40)}`;
  return {
    address,
    source: 'private-key',
  };
}
