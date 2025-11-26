import { useState } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { ConnectKeyModal } from './conect-key';

interface ConnectModalProps {
  visible: boolean;
  onClose: () => void;
  onMetaMask?: () => void;
  onPrivateKey?: () => void;
}

export function ConnectModal({ visible, onClose, onMetaMask, onPrivateKey }: ConnectModalProps) {
  const [isKeyModalVisible, setIsKeyModalVisible] = useState(false);

  const handleMetaMask = () => {
    onMetaMask?.();
    onClose();
  };

  const handlePrivateKey = () => {
    onClose();
    setIsKeyModalVisible(true);
  };

  const handleKeyConnect = (privateKey: string) => {
    // TODO: 实现私钥连接逻辑
    console.log('Connect with Private Key:', privateKey);
    onPrivateKey?.();
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 items-center justify-center bg-black/50 px-6"
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            className="w-full max-w-sm rounded-2xl bg-[#050814] items-center justify-center border border-slate-600 h-[30%] p-6 shadow-lg"
            onPress={(e) => e.stopPropagation()}
          >
            <TouchableOpacity
              onPress={handleMetaMask}
              className="mb-4 flex-row items-center justify-center rounded-xl bg-blue-600 px-6 py-4 w-full"
            >
              <Text className="text-base font-semibold text-white">使用 MetaMask 连接</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePrivateKey}
              className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 w-full"
            >
              <Text className="text-base font-medium text-gray-900">使用私钥连接</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <ConnectKeyModal
        visible={isKeyModalVisible}
        onClose={() => setIsKeyModalVisible(false)}
        onConnect={handleKeyConnect}
      />
    </>
  );
}
