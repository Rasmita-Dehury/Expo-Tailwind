import { View, Text, Pressable, Button, TextInput } from "react-native";
import { BlueButton } from "@/components/my-tailwind-styles";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { useRef, useState } from "react";


export default function inputRef() {
    const counter = useRef(0);
    const [i, setI] = useState(0);
    const inputRef = useRef();

    const handleIncrementRef = () => {
        counter.current = counter.current + 1;
        console.log(counter.current);
        //@ts-expect-error for ignor the below line
        inputRef.current.value = "Mishti";


    }

    const handleIncrementState = () => {
        setI(i + 1);
    }

    return (
        <View>
            <Pressable
                className={BlueButton + " w-48"}
                onPress={handleIncrementRef}
            >
                <Text className="color-white">Increment Ref</Text>
            </Pressable>

            <Pressable
                className={BlueButton + " w-48"}
                onPress={handleIncrementState}
            >
                <Text className="color-white">Increment State</Text>
            </Pressable>

            <Text className="bold text-lg mt-10">Ref Counter : {counter.current}</Text>
            <Text className="bold text-lg mt-10">State Counter : {i}</Text>

            <TextInput className="border-red-100 border mt-5 p-3"
                ref={inputRef} />
        </View>
    )
}