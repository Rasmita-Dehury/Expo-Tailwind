import { useState, useEffect, useRef } from "react";

// let i = 0;

export default function TimeStamp() {

    console.log("render Called");

    // const [count, setCount] = useState(0);
    const [showClock, setShowClock] = useState(true);
    const [stop, setStop] = useState(false);

    // const myRef = useRef(null);

    /* 
        //It's Wrong Method
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
    */

    const toggleClock = () => {
        setShowClock(!showClock);
    };

    const handleStop = () => {
        setStop(!stop);
    };

    return (
        <div>
            {/* <button onClick={() => setCount(count - 1)}>Decrement</button>
            <p> Count : {count} </p> */}
            {/* <input type="text" ref={myRef} /> */}

            <button
                type="button"
                className="inline-block rounded bg-primary bg-blue-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={toggleClock}
            >
                Toggle Clock</button>
            {showClock && <Clock stop={stop} />}
        </div>
    )

}


function Clock({ stop }) {
    // i += 1;
    // console.log("Render Called");
    let [time, setTime] = useState(new Date());
    // console.log("Clock Render Called");

    useEffect(() => {
        // console.log("UseEffect Called");
        let interval = null;

        if (stop) {
            clearInterval(interval);
        } else {
            interval = setInterval(() => {
                console.log("interval is Called");
                setTime(new Date());
            }, 1000);
        }

        return () => {
            // console.log("Return callback is Called");
            clearInterval(interval);
        }
    }, [stop]);

    return (
        <div>
            <div>Time : {time.toLocaleTimeString()}</div>
            <p>{stop.toString()}</p>
        </div>
    )
}
