import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import {useEffect, useState} from "react";

function App() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza')
            .then(res => {
                return res.json()
            }).then(json => setItems(json));
    }, []);

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(items => (<PizzaBlock key={items.id} {...items}/>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
