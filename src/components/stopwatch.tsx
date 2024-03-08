import { useState, useEffect } from "react";
import { BlueButton } from "./my-tailwind-styles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Stopwatch() {

    let [pause, setPause] = useState(false);
    let [takeLap, setTakeLap] = useState(false);
    let [laps, setLaps] = useState([]);

    const handlePaused = () => {
        setPause(!pause);
    }

    const handleLapClick = () => {
        if (pause) {
            alert("Sorry can't take lap while in pause");
        } else {
            setTakeLap(true);
        }
    }

    const getLap = (lapValue) => {
        console.log(lapValue);
        setTakeLap(false);
        setLaps([lapValue, ...laps]);
    };

    const handleResetClicked = () => {

    }

    return (
        <div className="bg-green-600 ">
            <div className="flex justify-center">
                <Ionicons name="stopwatch-outline" size={32} />
                <h2 className="color-purple-800 text-lg font-bold ml-2">STOPWATCH</h2>
            </div>

            <button
                className={BlueButton}
                onClick={handlePaused}
            >
                {pause ? "Resume" : "Pause"}
            </button>

            <button
                className={BlueButton}
                onClick={handleResetClicked}
            >
                Reset
            </button>

            <button
                className={BlueButton}
                onClick={handleLapClick}>
                Lap
            </button>
            <StopWatch paused={pause} takeLap={takeLap} getLap={getLap} />
            <LapList laps={laps} />
        </div>
    )
}

function convertMillisecond(n: number) {
    let miliSecond = n * 100;

    //calculate minutes
    const minute = Math.floor(miliSecond / 60000);

    //Calculate remaining MiliSecond After Removing Minute
    const remainingMiliSecond = miliSecond % 60000;

    //Calculate Second
    const second = Math.floor(remainingMiliSecond / 1000);

    //Calculate remaining MiliSecond After Removing Second
    const remainingMiliSecond2 = remainingMiliSecond % 1000;

    return {
        minute: minute,
        second: second,
        miliSecond: remainingMiliSecond2,
    };
}

function StopWatch({ paused, takeLap, getLap }) {

    let [value, setValue] = useState(0);

    // useEffect(() => {
    //     let interval = null;
    //     if (!paused) {
    //         interval = setInterval(() => {
    //             let v = value + 1;
    //             setValue(v);
    //         }, 100);
    //     }
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [value, paused]);

    // useEffect(() => {
    //     // console.log("Lap UseEffect Fired");
    //     if (takeLap) {
    //         getLap(value);
    //     }
    // }, [takeLap, getLap, value]);

    // component didMount didUpdate

    useEffect(() => {
        // console.log("Use effect called...........");
        let interval = null;
        if (!paused) {
            interval = setInterval(() => {
                console.log("interval called");
                // let v = value + 1;
                setValue(value + 1);
            }, 100);
        }

        return () => {
            clearInterval(interval);
        }
    }, [value, paused]);


    let time = convertMillisecond(value);
    // console.log('render called');
    return (
        <div>
            <h2 className="color-white">
                Time : {time.minute}:{time.second}:{time.miliSecond / 10}
            </h2>
        </div>
    )
}

function LapList({ laps }) {
    let count = laps.length + 1;
    return (
        <div>
            <h2>
                Lap Times
            </h2>

            {laps.map((lap, i) => {

                const time = convertMillisecond(lap);

                return (<h2 key={i}>
                    {count -= 1} -  Time : {time.minute}:{time.second}:{time.miliSecond / 10}
                </h2>
                )
            })}
        </div>
    )
}