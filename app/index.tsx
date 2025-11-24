import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <Text className="text-center bg-red-500 text-4xl font-semibold text-white">欢迎 👋</Text>
      <Text className="mt-8 text-center text-lg text-slate-200">这是唯一的一句话。</Text>
    </View>
  );
}
