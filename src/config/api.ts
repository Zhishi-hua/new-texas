// API 基础配置
// 开发环境使用相对路径，生产环境使用完整 URL
// 在 Expo 中，使用 Constants.expoConfig.extra 或环境变量
import Constants from 'expo-constants';

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl || process.env.EXPO_PUBLIC_API_BASE_URL || '/api/v1';

// API 端点
export const API_ENDPOINTS = {
  // 房间管理
  LIST_ROOMS: '/poker/rooms',
  CREATE_ROOM: '/poker/rooms',
  JOIN_ROOM: (roomId: string) => `/poker/rooms/${roomId}/join`,
  LEAVE_ROOM: (roomId: string) => `/poker/rooms/${roomId}/leave`,
  GET_ROOM_RECORDS: (roomId: string) => `/poker/rooms/${roomId}/records`,

  // 随机种子管理
  LIST_SEEDS: (roomId: string) => `/poker/rooms/${roomId}/seed`,
  SUBMIT_SEED: (roomId: string) => `/poker/rooms/${roomId}/seed`,

  // 游戏操作
  HANDLE_ACTION: '/poker/action',
  GET_STATE: '/poker/state',

  // 用户信息
  GET_USER_INFO: (address: string) => `/poker/users/${address}`,
  GET_USER_RECORDS: (address: string) => `/poker/users/${address}/records`,
  GET_USER_TRANSACTIONS: (address: string) => `/poker/users/${address}/transactions`,
  WITHDRAW_CHIPS: '/poker/wallet/withdraw',
} as const;

export const USDT_CONTRACT_ADDRESS =
  Constants.expoConfig?.extra?.usdtContract ||
  process.env.EXPO_PUBLIC_USDT_CONTRACT ||
  '0xdac17f958d2ee523a2206206994597c13d831ec7';

export const USDT_TREASURY_ADDRESS =
  Constants.expoConfig?.extra?.usdtTreasury ||
  process.env.EXPO_PUBLIC_USDT_TREASURY ||
  '0x736738547E03E5EcEB180a91fF99AAee1058B6Cd';

export const USDT_DECIMALS = Number(
  Constants.expoConfig?.extra?.usdtDecimals || process.env.EXPO_PUBLIC_USDT_DECIMALS || 6,
);
