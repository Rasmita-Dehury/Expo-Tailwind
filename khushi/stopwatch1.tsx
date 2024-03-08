import { useState, useEffect } from "react";
export default function Page() {
  let [isPause, setIsPause] = useState(false);
  let [takeLap, setTakeLap] = useState(false);
  let [laps, setLaps] = useState([]);
  let [reset, setReset] = useState(false);
  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleLap = () => {
    if (isPause) {
      alert("sorry can't take lap while pause");
    } else {
      setTakeLap(true);
    }
  };
  const getLap = (lapvalue) => {
    setTakeLap(false);
    setLaps([lapvalue, ...laps]);
  };

  const handleReset = () => {
    if (!isPause) {
      alert("sorry can't reset while resuming");
    } else {
      setLaps([]);
      setTakeLap(false);
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 100);
    }
  };
  return (
    <div>
      <button onClick={handlePause}> {isPause ? "Resume" : "Pause"}</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <p>Reset value : {reset.toString()}</p>
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
function Convertmilisecond(n: number) {
  let ms = n * 100;
  const minute = Math.floor(ms / 600000);
  const remainingms = ms % 60000;
  const second = Math.floor(remainingms / 1000);
  let remainingms2 = remainingms % 1000;
  return {
    m: minute,
    s: second,
    ms: remainingms2,
  };
}

function StopWatch({ isPause, takeLap, getLap, reset }) {
  let [value, setValue] = useState(0);

  useEffect(() => {
    console.log("useEffect called");
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
    if (takeLap) {
      getLap(value);
    }
  }, [getLap, takeLap]);

  let time = Convertmilisecond(value);
  return (
    <div>
      <h2>
        Time :{time.m}: {time.s}:{time.ms / 10}
      </h2>
    </div>
  );
}
function LapList({ laps }) {
  let count = laps.length + 1;
  return (
    <div>
      {laps.map((lap, i) => {
        const m = Convertmilisecond(lap);
        const laptime = Convertmilisecond(lap - (lap - i || 0));
        return (
          <h2 key={i}>
            {(count = count - 1)} - laptime:{laptime.m}:{laptime.s}:{laptime.ms}{" "}
            ------totaltime:{m.m}:{m.s}:{m.ms}
          </h2>
        );
      })}
    </div>
  );
}
