import { formatAddress } from '@/src/utils/wallet';
import { useWallet } from '@/src/views/home/connect/wallet-context';
import { ConnectModal } from '@/src/views/modals/conect-modal';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export function TexasHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { session, status, disconnect } = useWallet();
  const isConnected = status === 'connected' && !!session;
  const router = useRouter();

  return (
    <>
      <View className="flex-row items-center justify-between border-b border-slate-600 px-6 py-4">
        <View className="flex-col items-center">
          <Text className="text-xl font-bold text-amber-300 tracking-[4px]">♠ ♣ ♥ ♦</Text>
        </View>
        <View className="flex-row gap-3">
          {isConnected ? (
            <TouchableOpacity
              className="rounded-full border border-amber-300 px-4 py-2"
              onPress={disconnect}
            >
              <Text className="text-sm text-amber-300">{formatAddress(session?.address)}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="rounded-full border bg-[#F2CC11] border-slate-500 px-4 py-2"
              onPress={() => setIsModalVisible(true)}
            >
              <Text className="text-sm text-black">连接钱包</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity className="mt-1" onPress={() => router.push('/user')}>
            <Image
              source={require('../assets/user/user.png')}
              style={{ width: 32, height: 32 }}
              className="rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ConnectModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </>
  );
}
