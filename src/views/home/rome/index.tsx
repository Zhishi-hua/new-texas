import { Text, View } from 'react-native';

const rooms = [
  {
    title: "Beginner's Room",
    subtitle: 'Entry-Level\nNo Entrance Fee',
    chips: '0 Chips to Enter | 10,000',
    badge: 'Oval',
  },
  {
    title: 'Intermediate Room',
    subtitle: '1,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
  {
    title: 'High Roller Room',
    subtitle: '100,000 Chips to Enter\nUnlimited Betting',
    chips: 'Unlimited',
    badge: 'Crown',
    highlight: true,
  },
];

const Badge = ({ type }: { type: string }) => {
  if (type === 'Chip') {
    return (
      <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-amber-300">
        <View className="h-6 w-6 rounded-full bg-amber-300" />
      </View>
    );
  }
  if (type === 'Crown') {
    return (
      <View className="items-center justify-center">
        <Text className="text-4xl text-amber-200">👑</Text>
      </View>
    );
  }
  return <View className="h-10 w-20 rounded-full border border-slate-400" />;
};

export function RoomList() {
  return (
    <View className="mt-10 flex-row gap-4 flex-wrap">
      {rooms.map((room) => (
        <View
          key={room.title}
          className={`flex-1 rounded-3xl border px-6 py-8 ${
            room.highlight ? 'border-amber-300 bg-[#f4d27d]' : 'border-slate-600/50 bg-[#0c1221]'
          }`}
        >
          <Badge type={room.badge} />
          <Text
            className={`mt-6 text-2xl font-semibold ${
              room.highlight ? 'text-[#2b1a05]' : 'text-slate-100'
            }`}
          >
            {room.title}
          </Text>
          <Text
            className={`mt-3 text-base leading-6 ${
              room.highlight ? 'text-[#2b1a05]/80' : 'text-slate-300'
            }`}
          >
            {room.subtitle}
          </Text>
          <View className="mt-8 border-t border-white/10 pt-4">
            <Text className={`text-sm ${room.highlight ? 'text-[#2b1a05]' : 'text-amber-200'}`}>
              {room.chips}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
