import { ConnectModal } from '@/src/views/modals/conect-modal';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function TexasHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMetaMask = () => {
    // TODO: 实现 MetaMask 连接逻辑
    console.log('Connect with MetaMask');
  };

  const handlePrivateKey = () => {
    // TODO: 实现私钥连接逻辑
    console.log('Connect with Private Key');
  };

  return (
    <>
      <View className="flex-row items-center justify-between border-b border-slate-600 px-6 py-4">
        <View className="flex-col items-center">
          <Text className="text-xl font-bold text-amber-300 tracking-[4px]">♠ ♣ ♥ ♦</Text>
        </View>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text className="text-sm text-slate-100">连接钱包</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ConnectModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onMetaMask={handleMetaMask}
        onPrivateKey={handlePrivateKey}
      />
    </>
  );
}
