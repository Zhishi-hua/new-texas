import { ReactNode } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  buttonText?: string;
  children?: ReactNode;
}

export const BaseModal = ({
  visible,
  onClose,
  title,
  content,
  buttonText = '我知道了',
  children,
}: BaseModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 items-center justify-center bg-black/50"
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-full flex flex-col items-center justify-center max-w-md rounded-2xl bg-[#050814] border border-slate-600 py-10 px-6 shadow-lg"
          onPress={(e) => e.stopPropagation()}
        >
          {title ? <Text className="text-xl font-semibold text-white">{title}</Text> : null}
          {content ? <Text className="mt-4 text-sm text-slate-300">{content}</Text> : null}
          {children ? <View className="mt-4">{children}</View> : null}
          <TouchableOpacity
            className="mt-10 w-full rounded-xl bg-amber-400 px-4 py-3"
            onPress={onClose}
          >
            <Text className="text-center text-base font-semibold text-black">{buttonText}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BaseModal;
