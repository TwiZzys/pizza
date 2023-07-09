import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useEffect, useState} from "react";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности(DESC)',
        sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={(id) => {
                        setCategoryId(id)
                    }}/>
                    <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) :
                            items.map(item => (
                                <PizzaBlock key={item.id} {...item}/>
                            ))
                    }
                </div>
            </div>
        </>
    )
}
export default Home;