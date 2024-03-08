import { View, Text, Pressable, Button, TextInput } from "react-native";
import { BlueButton } from "@/components/my-tailwind-styles";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useRef, useState } from "react";

export default function Switch() {
  //   const [isOn, setOn] = useState(false);
  const isOn = useRef(false);
  const sv = useSharedValue(0);

  const handlePress = () => {
    if (isOn.current) {
      sv.value = withTiming(0, { duration: 300 }, (isComplete: boolean) => {
        if (isComplete) {
          isOn.current = false;
        } else {
          sv.value = withTiming(1);
        }
      });
    } else {
      sv.value = withTiming(1, { duration: 300 }, (isComplete: boolean) => {
        if (isComplete) {
          isOn.current = true;
        } else {
          sv.value = withTiming(0);
        }
      });
    }
  };

  const circleAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: sv.value * 20,
        },
      ],

      backgroundColor: interpolateColor(
        sv.value,
        [0, 1],
        ["#eff8ff", "#3399fe"]
      ),
    };
  });

  const barAnimationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        sv.value,
        [0, 1],
        ["#585d67", "#225892"]
      ),
    };
  });

  return (
    <Pressable className="flex" onPress={handlePress}>
      <Animated.View className={Bar} style={barAnimationStyle}>
        <Animated.View
          className={circle}
          style={circleAnimationStyle}
        ></Animated.View>
      </Animated.View>
    </Pressable>
  );
}

function BBar({ children }) {
  return <View className={Bar}>{children}</View>;
}

function CCircle(props) {
  return <View className={circle} {...props}></View>;
}

const Bar =
  "bg-gray-400 border-solid border-1 border-gray-400 w-10 h-4 rounded-full justify-center cursor-pointer";

const circle = "bg-gray-200 w-5 h-5 rounded-2xl cursor-pointer shadow-md";
