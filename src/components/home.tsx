import TimeStamp from "./clock";
import Counter, { Person } from "./counter";
import Stopwatch from "./stopwatch";
import Todo from "./todo";
import Switch from "./ui/switch";

export default function Home() {
  return (
    <div className="flex-1 text-center bg-pink-100 p-10">
      {/* <Counter /> */}
      {/* <Person /> */}
      {/* <Todo /> */}

      {/* <TimeStamp /> */}

      {/* <Stopwatch /> */}
      <Switch />
    </div>
  );
}
