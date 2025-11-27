export type EthereumProvider = {
  request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
  isMetaMask?: boolean;
};

export function getEthereumProvider(): EthereumProvider | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const { ethereum } = window as typeof window & { ethereum?: EthereumProvider };
  return ethereum ?? null;
}

export function formatAddress(address?: string | null, visibleChars = 4) {
  if (!address) return '';
  if (address.length <= visibleChars * 2) return address;
  return `${address.slice(0, visibleChars + 2)}…${address.slice(-visibleChars)}`;
}

export function normalizePrivateKey(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }
  const withoutPrefix = trimmed.startsWith('0x') ? trimmed.slice(2) : trimmed;
  const hexRegex = /^[0-9a-fA-F]+$/;
  if (withoutPrefix.length !== 64 || !hexRegex.test(withoutPrefix)) {
    return null;
  }
  return `0x${withoutPrefix.toLowerCase()}`;
}
