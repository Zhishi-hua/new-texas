import { useWallet } from '@/src/hooks/wallet-context';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ConnectKeyModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ConnectKeyModal({ visible, onClose }: ConnectKeyModalProps) {
  const [privateKey, setPrivateKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { connectPrivateKey } = useWallet();

  const handleConnect = async () => {
    if (!privateKey.trim()) {
      setError('请输入私钥');
      return;
    }
    setIsSubmitting(true);
    setError(undefined);
    try {
      await connectPrivateKey(privateKey.trim());
      setPrivateKey('');
      setIsVisible(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setPrivateKey('');
    setIsVisible(false);
    setError(undefined);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 items-center justify-center bg-black/50 px-6"
        onPress={handleCancel}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-full max-w-md rounded-2xl bg-[#050814] border border-slate-600 p-6 shadow-lg"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">使用私钥连接</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text className="text-xl text-gray-400">×</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4 flex-row items-center rounded-xl border border-gray-300 bg-gray-50 px-4 py-3">
            <TextInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="请输入私钥(64个十六进制字符,可带或不带0x前缀)"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!isVisible}
              className="flex-1 text-base text-gray-900"
              multiline
            />
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} className="ml-2">
              <Text className="text-xl text-gray-600">{isVisible ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-6 text-xs text-gray-500">
            注意:私钥仅用于本地签名,不会上传到服务器
          </Text>

          <View className="flex-row justify-end gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3"
            >
              <Text className="text-base font-medium text-gray-900">取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConnect}
              disabled={isSubmitting}
              className={`rounded-xl bg-blue-600 px-6 py-3 ${isSubmitting ? 'opacity-60' : ''}`}
            >
              <Text className="text-base font-semibold text-white">
                {isSubmitting ? '连接中…' : '连接'}
              </Text>
            </TouchableOpacity>
          </View>
          {error ? <Text className="mt-4 text-sm text-red-400">{error}</Text> : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
