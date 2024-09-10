import React, { useState, useRef, useEffect } from 'react';
import FruitList from './FruitList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'fruitApp.fruits';

function App() {
    const [fruits, setFruits] = useState([]);
    const fruitNameRef = useRef();

    useEffect(() => {
        const storedFruits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedFruits) setFruits(storedFruits);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fruits));
    }, [fruits]);

    function toggleFruit(id) {
        const newFruits = [...fruits];
        const fruit = newFruits.find(fruit => fruit.id === id);
        fruit.complete = !fruit.complete;
        setFruits(newFruits);
    }

    function handleAddFruits() {
        const name = fruitNameRef.current.value;
        if (name === '') return;
        setFruits(prevFruits => [
            ...prevFruits,
            { id: uuidv4(), name: name, complete: false }
        ]);
        fruitNameRef.current.value = '';
    }

    function handleClearFruits() {
        const newFruits = fruits.filter(fruit => !fruit.complete);
        setFruits(newFruits);
    }

    return ( <
        >
        <
        FruitList fruits = { fruits }
        toggleFruit = { toggleFruit }
        /> <
        input ref = { fruitNameRef }
        type = "text" / >
        <
        button onClick = { handleAddFruits } > Add Fruit < /button> <
        button onClick = { handleClearFruits } > Clear Completed < /button> <
        div > { fruits.filter(fruit => !fruit.complete).length }
        fruits remaining < /div> <
        />
    );
}

export default App;