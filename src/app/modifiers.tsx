import { BlueButton } from "@/components/my-tailwind-styles";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";


export default function Modifiers() {
    const sv = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        // console.log(sv.value);
        return {
            transform: [{ translateX: sv.value }]
        }
    });

    const OFFSET = 60;
    const TIME = 250;

    const handleShake = () => {
        // sv.value = withTiming(60);
        // sv.value = withRepeat(withTiming(60), -1, true);
        // sv.value = withSequence(withTiming(60), withTiming(0));
        sv.value = withSequence(
            //start from offset
            withTiming(-OFFSET, { duration: TIME / 2 }),
            //shake between -OFFSET and OFFSET 5 Times
            withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
            ///Go back to 0 at the end
            // withTiming(0, { duration: TIME / 2 }),
            withDelay(400, withTiming(0, { duration: TIME / 2 }))
        )
    }

    return (
        <View className="flex flex-1 bg-purple-200 justify-center items-center">
            {/* <View style={styles.whiteBox}></View> */}
            <View className="bg-green-200 w-1/2 h-1/2 rounded-2xl items-center justify-center" >
                <Animated.View
                    className="bg-purple-500 w-28 h-28 my-5 rounded-2xl"
                    style={animatedStyle}
                >
                </Animated.View>
                <Pressable
                    className={BlueButton}
                    onPress={handleShake}>
                    <Text className="text-white">Shake</Text>
                </Pressable>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    whiteBox: {
        width: 400,
        height: 400,
        backgroundColor: "white",
        borderRadius: 20
    }
})