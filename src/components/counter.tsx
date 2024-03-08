import { useState } from "react";

export default function Counter() {
    let [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleDecrement = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <button onClick={handleIncrement}> Increment </button>
            <div>Count : {count}</div>
            <button onClick={handleDecrement}> Decrement </button>
        </div>
    )
};

export function Person() {
    let [person, setPerson] = useState({ name: "Mishti", age: 29 });

    const handleAgeIncrement = () => {

        setPerson({ ...person, age: person.age + 1 });
    }

    const handleAgeDecrement = () => {

        setPerson({ ...person, age: person.age - 1 });
    }

    const handleNameChange = (e) => {
        if (e.keyCode === 13) {
            setPerson({ ...person, name: e.target.value });
        }


    }

    return (
        <div>
            <h2>Welcome To Person </h2>
            <input defaultValue={person.name} onKeyDown={handleNameChange} type="text" className="border-2 border-cyan-900" />
            <h2>Name : {person.name}</h2>
            <h2>Age : {person.age}</h2>
            <button onClick={handleAgeIncrement}>IncrementAge</button>
            <div></div>
            <button onClick={handleAgeDecrement}>DecrementAge</button>
        </div>
    )
}

