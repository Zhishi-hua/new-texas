import { Text, TouchableOpacity, View } from 'react-native';

export function TexasHeader() {
  return (
    <View className="flex-row items-center justify-between px-6">
      <View>
        <Text className="text-3xl font-bold text-amber-300 tracking-[4px]">ROYAL POKER</Text>
        <Text className="text-sm text-slate-300">♠ ♣ ♥ ♦</Text>
      </View>
      <View className="flex-row flex-wrap justify-end gap-3">
        <TouchableOpacity className="rounded-full border border-slate-600 px-4 py-2">
          <Text className="text-sm text-slate-200">Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-slate-800 px-4 py-2">
          <Text className="text-sm text-slate-100">Connect Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-[#dcb55c] px-4 py-2">
          <Text className="text-sm font-semibold text-[#2b1a05]">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-[#f0c978] px-4 py-2">
          <Text className="text-sm font-semibold text-[#2b1a05]">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
