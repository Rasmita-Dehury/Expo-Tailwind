import { View, Text, Pressable } from "react-native";
import { BlueButton } from "@/components/my-tailwind-styles";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { useState } from "react";

export default function SimpleAnim() {

    const [isOn, setOn] = useState(false);

    const sv = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [
                {
                    translateX: sv.value * 300
                }
            ]
        }
    });

    const handlePress = () => {
        if (isOn) {
            sv.value = withTiming(0, { duration: 5000 }, (isDone) => {
                if (isDone) {
                    setOn(false);
                } else {
                    sv.value = withTiming(1);
                }
            });
            setOn(false);
        } else {
            sv.value = withTiming(1, { duration: 5500 }, (isDone) => {
                console.log("isDone", isDone);
                if (isDone) {
                    setOn(true);
                } else {
                    sv.value = withTiming(0);
                }
            });
        }
    }

    return (
        <View className={firstFullPage}>
            <Animated.View
                className={AnimatedView}
                style={animatedStyle}
            >
                <Pressable onPress={handlePress} className="w-20 h-20" ></Pressable>
            </Animated.View>

            <Text className="mt-10 text-xl">{isOn ? "ON" : "OFF"}</Text>

        </View>
    )
}

const firstFullPage = "flex flex-1 bg-fuchsia-400 p-10 text-center";

const AnimatedView = "w-20 h-20 rounded-lg bg-blue-300";