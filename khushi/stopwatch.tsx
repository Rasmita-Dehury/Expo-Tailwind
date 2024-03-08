import { useState, useEffect } from "react";
export default function Page() {
  let [isPause, setIsPause] = useState(false);
  let [takeLap, setTakeLap] = useState(false);
  let [laps, setLaps] = useState([]);
  let [reset, setReset] = useState(false);
  const handlePaused = () => {
    setIsPause(!isPause);
  };
  const handleLap = () => {
    if (isPause) {
      alert("sorry can't take lap while pause");
    } else {
      setTakeLap(true);
    }
  };

  const getLap = (lapValue) => {
    console.log(lapValue);
    setTakeLap(false);
    setLaps([lapValue, ...laps]);
  };

  const handleReset = () => {
    if (!isPause) {
      alert("sorry can't reset while running");
    }
    setLaps([]);
    setTakeLap(false);
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 100);
  };
  return (
    <div>
      <h2 className=" flex  justify-center bg-green-800 font-mono font-bold text-3xl">
        {" "}
        ⏱ Stopwatch
      </h2>
      <h2 className=" flex justify-center bg-yellow-200">
        <button
          onClick={handlePaused}
          className=" ml-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {" "}
          {isPause ? " Resume " : " Pause "}
        </button>
        <button
          onClick={handleLap}
          className="  ml-3 text-gray-900 bg-white border border-gray-00 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Lap
        </button>
        <button
          onClick={handleReset}
          className="  ml-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Reset
        </button>
      </h2>

      <StopWatch
        isPause={isPause}
        takeLap={takeLap}
        getLap={getLap}
        reset={reset}
      />
      <LapList laps={laps} />
    </div>
  );
}
function convertMillisecond(n: number) {
  let ms = n * 100;
  //calculate minutes
  const min = Math.floor(ms / 60000);
  //calculate remaining miliseconds after removing minutes
  const remainingMs = ms % 60000;
  //calculate second
  const sec = Math.floor(remainingMs / 1000);
  //calculate remaining miliseconds after removing seconds
  const remainingMs2 = remainingMs % 1000;

  return {
    m: min,
    s: sec,
    ms: remainingMs2,
  };
}
function StopWatch({ isPause, takeLap, getLap, reset }) {
  let [value, setValue] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!isPause) {
      interval = setInterval(() => {
        let v = value + 1;
        setValue(v);
      }, 100);
    }
    if (reset) {
      clearInterval(interval);
      setValue(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [value, isPause, reset]);

  useEffect(() => {
    console.log("lap useffect fired.");
    if (takeLap) {
      getLap(value);
    }
  }, [, getLap, takeLap]);

  let time = convertMillisecond(value);
  return (
    <div>
      <h2 className="flex justify-center bg-yellow-200">
        Time :{time.m}:{time.s}:{time.ms / 10}
      </h2>
    </div>
  );
}
function LapList({ laps }) {
  let count = laps.length + 1;
  return (
    <div>
      {laps.map((lap, i) => {
        const m = convertMillisecond(lap);
        const laptime = convertMillisecond(lap - (laps[i + 1] || 0));
        return (
          <h2 key={i}>
            {(count = count - 1)} - laptime: {laptime.m} : {laptime.s} :
            {laptime.ms / 10} -------- Totaltime: {m.m}: {m.s}:{m.ms / 10}
          </h2>
        );
      })}
    </div>
  );
}
