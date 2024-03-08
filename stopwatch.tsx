import { useState, useEffect } from "react";

export default function Page() {
  let [pause, setPause] = useState(false);
  const isPaused = () => {
    setPause(!pause);
  };
  return (
    <div>
      <button onClick={isPaused}> {pause ? "Resume" : "Pause"}</button>
      <StopWatch paused={pause} />
    </div>
  );
}

function convertMillisecond(n: number) {
  let ms = n * 100;
  //calculate minutes
  const min = Math.floor(ms / 60000);
  //Calculate remaining MiliSecond After Removing Minute
  const remainingMs = ms % 60000;
  //Calculate Second
  const sec = Math.floor(remainingMs / 1000);
  //Calculate remaining MiliSecond After Removing Second
  const remainingMs2 = remainingMs % 1000;


  return {
    m: min,
    s: sec,
    ms: remainingMs2,
  };
}

function StopWatch({ paused }) {
  let [value, setValue] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!paused) {
      interval = setInterval(() => {
        let v = value + 1;
        setValue(v);
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [value, paused]);

  let time = convertMillisecond(value);
  return (
    <div>
      <h2>
        Time :{time.m}:{time.s}:{time.ms / 10}
      </h2>
    </div>
  );
}
