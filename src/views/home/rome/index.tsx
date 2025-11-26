import { Dimensions, ScrollView, Text, View } from 'react-native';

const rooms = [
  {
    title: '新手房间',
    subtitle: 'Entry-Level\nNo Entrance Fee',
    chips: '0 Chips to Enter | 10,000',
    badge: 'Oval',
  },
  {
    title: '中级房间',
    subtitle: '1,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
  {
    title: '高级房间',
    subtitle: '100,000 Chips to Enter\nUnlimited Betting',
    chips: 'Unlimited',
    badge: 'Crown',
    highlight: true,
  },
  {
    title: '极速桌-微额',
    subtitle: '1,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
  {
    title: '极速桌-中额',
    subtitle: '1,000,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
  {
    title: '高级无限桌',
    subtitle: '1,000,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
  {
    title: '锦标赛桌',
    subtitle: '1,000,000 Chips to Enter',
    chips: 'Max Bett 00,000',
    badge: 'Chip',
  },
];

const WINDOW_WIDTH = Dimensions.get('window').width;
const SIDE_PADDING = 24;
const CARD_GAP = 24;
const MAX_VISIBLE_CARDS = 3;
const CARD_WIDTH = Math.max(
  240,
  Math.min(
    320,
    (WINDOW_WIDTH - SIDE_PADDING * 2 - CARD_GAP * (MAX_VISIBLE_CARDS - 1)) / MAX_VISIBLE_CARDS,
  ),
);

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
    <View className="mt-20">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
        }}
      >
        {rooms.map((room, index) => (
          <View
            key={room.title}
            style={{
              width: CARD_WIDTH,
              marginRight: index === rooms.length - 1 ? 0 : CARD_GAP,
            }}
            className={`rounded-3xl border px-6 py-8 ${
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
      </ScrollView>
    </View>
  );
}
