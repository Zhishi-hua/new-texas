import { User } from '@/src/views/user';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserPage() {
  return (
    <SafeAreaView className="flex-1 bg-[#040914]">
      <User />
    </SafeAreaView>
  );
}
