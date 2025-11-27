import { useWallet } from '@/src/hooks/wallet-context';
import { BaseModal } from '@/src/views/modals/base-modal';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

const rooms = [
  {
    title: '新手房间',
    peple: '0 / 6',
    subtitle: '盲注: 5-10',
    chips: '0 Chips to Enter | 10,000',
    badge: 'Oval',
  },
  {
    title: '中级房间',
    peple: '0 / 6',
    subtitle: '盲注: 25-50',
    chips: '500-5000',
    badge: 'Chip',
  },
  {
    title: '高级房间',
    peple: '0 / 6',
    subtitle: '盲注: 100-200',
    chips: '2000-20000',
    badge: 'Crown',
    highlight: true,
  },
  {
    title: '极速桌-微额',
    peple: '0 / 9',
    subtitle: '盲注: 10-20',
    chips: '200-2000',
    badge: 'Chip',
  },
  {
    title: '极速桌-中额',
    peple: '0 / 9',
    subtitle: '盲注: 100-200',
    chips: '2000-20000',
    badge: 'Chip',
  },
  {
    title: '高级无限桌',
    peple: '0 / 6',
    subtitle: '盲注: 500-1000',
    chips: '10000-200000',
    badge: 'Chip',
  },
  {
    title: '锦标赛桌',
    peple: '0 / 6',
    subtitle: '盲注: 100-200',
    chips: '5000',
    badge: 'Chip',
  },
];

const WINDOW_WIDTH = Dimensions.get('window').width;
const SIDE_PADDING = 0;
const CARD_GAP = 36;
const MAX_VISIBLE_CARDS = 4;
const CARD_WIDTH = Math.max(
  360,
  Math.min(
    430,
    (WINDOW_WIDTH - SIDE_PADDING * 2 - CARD_GAP * (MAX_VISIBLE_CARDS - 1)) / MAX_VISIBLE_CARDS,
  ),
);
const VISIBLE_WIDTH = CARD_WIDTH * MAX_VISIBLE_CARDS + CARD_GAP * (MAX_VISIBLE_CARDS - 1);
const VIEWPORT_WIDTH = Math.min(WINDOW_WIDTH - SIDE_PADDING * 2, VISIBLE_WIDTH);

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const { status, session } = useWallet();
  const isConnected = status === 'connected' && !!session;

  const handleRoomPress = () => {
    if (!isConnected) {
      setIsPromptVisible(true);
      return;
    }
    // TODO: navigate to room once wallet connection is ready
  };

  return (
    <View className="mt-20 items-center">
      <View style={{ width: VIEWPORT_WIDTH }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: SIDE_PADDING,
          }}
        >
          {rooms.map((room, index) => {
            const isHovered = hoveredIndex === index;
            const baseBackground = room.highlight ? 'bg-[#F5CD20]' : 'bg-[#010610]/50';
            const baseBorder = room.highlight ? 'border-amber-300' : 'border-[#0c1b2E]';
            const borderClass = isHovered ? 'border-amber-300' : baseBorder;
            const chipsColor = room.highlight ? 'text-[#2b1a05]' : 'text-amber-200';

            return (
              <Pressable
                key={room.title}
                style={{
                  width: CARD_WIDTH,
                  marginRight: index === rooms.length - 1 ? 0 : CARD_GAP,
                }}
                onHoverIn={() => setHoveredIndex(index)}
                onHoverOut={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                onPress={handleRoomPress}
                className={`rounded-3xl flex items-center justify-center  border-2 ${borderClass} ${baseBackground} px-14 py-10 min-h-[480px] min-w-[280px] flex flex-col justify-between`}
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
                  {room.peple}
                </Text>
                <Text
                  className={`mt-3 text-base leading-6 ${
                    room.highlight ? 'text-[#2b1a05]/80' : 'text-slate-300'
                  }`}
                >
                  {room.subtitle}
                </Text>
                <View className="mt-8 border-t border-white/10 pt-4">
                  <Text className={`text-sm ${chipsColor}`}>{room.chips}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <BaseModal
        visible={isPromptVisible}
        onClose={() => setIsPromptVisible(false)}
        title="请先连接钱包"
        content="点击右上角的“连接钱包”按钮完成连接。"
      />
    </View>
  );
}
