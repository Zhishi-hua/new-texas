import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

interface HintProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  visible?: boolean;
  autoHide?: boolean;
  duration?: number;
  onHide?: () => void;
}

export function Hint({
  text,
  backgroundColor,
  textColor = '#ffffff',
  className = '',
  visible = true,
  autoHide = true,
  duration = 2000,
  onHide,
}: HintProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      if (autoHide) {
        const timer = setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onHide?.();
          });
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      slideAnim.setValue(-100);
    }
  }, [visible, autoHide, duration, slideAnim, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <View className="absolute top-4 left-0 right-0 z-50 pointer-events-none items-center">
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
        }}
        className="px-4 pt-12 pointer-events-auto"
      >
        <View
          className={`rounded-lg px-4 py-3 ${className}`}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <Text
            style={{
              color: textColor,
            }}
            className="text-sm"
          >
            {text}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
