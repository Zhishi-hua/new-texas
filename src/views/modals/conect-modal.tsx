import { Hint } from '@/src/components/hint';
import { useWallet } from '@/src/views/home/connect/wallet-context';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { ConnectKeyModal } from './conect-key';

interface ConnectModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ConnectModal({ visible, onClose }: ConnectModalProps) {
  const [isKeyModalVisible, setIsKeyModalVisible] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isBusy, setIsBusy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { connectMetaMask } = useWallet();

  const handleMetaMask = async () => {
    setIsBusy(true);
    setError(undefined);
    try {
      await connectMetaMask();
      setShowSuccess(true);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsBusy(false);
    }
  };

  const handlePrivateKey = () => {
    setError(undefined);
    onClose();
    setIsKeyModalVisible(true);
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
              disabled={isBusy}
              className={`mb-4 flex-row items-center justify-center rounded-xl px-6 py-4 w-full ${
                isBusy ? 'bg-blue-400' : 'bg-blue-600'
              }`}
            >
              <Text className="text-base font-semibold text-white">
                {isBusy ? '连接中…' : '使用 MetaMask 连接'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePrivateKey}
              className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 w-full"
            >
              <Text className="text-base font-medium text-gray-900">使用私钥连接</Text>
            </TouchableOpacity>
            {error ? <Text className="mt-4 text-sm text-red-400">{error}</Text> : null}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <ConnectKeyModal visible={isKeyModalVisible} onClose={() => setIsKeyModalVisible(false)} />
      <Hint
        text="连接成功"
        backgroundColor="#F5DB38"
        textColor="#454017"
        visible={showSuccess}
        autoHide
        duration={2000}
        onHide={() => setShowSuccess(false)}
      />
    </>
  );
}
