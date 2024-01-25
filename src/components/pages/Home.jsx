import Categories from "../Categories";
import Sort from "../Sort";
import {useEffect, useState} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza')
            .then(res => {
                return res.json()
            }).then(json => {
            setItems(json);
            setIsLoading(false);
        });
    }, []);
    return (<>
        <div className="content__top">
            <Categories/>
            <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : items.map(item => <PizzaBlock
                key={item.id} {...item}/>)}
        </div>
    </>)
}

export default Home;