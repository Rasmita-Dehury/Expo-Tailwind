import { View, Button, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, useAnimatedProps, Easing } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function firstAnimation() {
    const sv = useSharedValue(100);
    const translateX = useSharedValue(0);
    const rSV = useSharedValue(20);

    const handlePress = () => {
        // sv.value = withSpring(sv.value + 150);
        // sv.value = withTiming(sv.value + 150, { duration: 2000 });
        // translateX.value = withSpring(translateX.value + 150);
        translateX.value = translateX.value + 50;
    }

    const animatedStyles = useAnimatedStyle(() => {
        // transform: [
        //     { translateX: withSpring(translateX.value * 2) },
        //     { rotate: withSpring(`${translateX.value}deg`) },
        //     // { scale: withSpring(translateX.value / 25) }
        // ],
        return {
            transform: [{ translateX: withSpring(translateX.value * 2) }],
        };
    });

    const handleCircleAnimation = () => {
        rSV.value += 20;
    }

    const animatedProps = useAnimatedProps(() => {
        return {
            r: withSpring(rSV.value),
            fill: withTiming(
                rSV.value > 30 ? ("purple") : "blue",
                {
                    duration: 3000,
                    easing: Easing.inOut(Easing.quad)
                }
            )
        };
    });

    return (
        <View className="flex flex-1  bg-teal-200">
            <Animated.View
                // style={{ width: sv, height: 100, backgroundColor: "plum" }}
                style={[
                    // { width: sv, height: 100, backgroundColor: "plum" }
                    styles.box,
                    // { transform: [{ translateX: translateX }] },
                    animatedStyles
                ]}
            ></Animated.View>
            <Button title="Click" onPress={handlePress} />
            <Button title="Click" onPress={handleCircleAnimation} />
            <View>
                <Svg
                    viewBox="0 0 100 100"
                    style={{ width: 400, height: 400, backgroundColor: "yellow" }}
                >
                    <AnimatedCircle cx="50" cy="50" fill="blue" animatedProps={animatedProps} />
                </Svg>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: "plum"
    }
});