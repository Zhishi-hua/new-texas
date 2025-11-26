import { TexasHeader } from '@/src/components/texas-header';
import { RoomList } from '@/src/views/home/rome/index';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#040914]">
      <TexasHeader />
      <View className="flex-1 px-6 mt-36">
        <RoomList />
      </View>
    </SafeAreaView>
  );
}
