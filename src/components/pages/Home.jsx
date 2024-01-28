import Categories from "../Categories";
import Sort from "../Sort";
import {useEffect, useState} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";

const Home = ({searchValue}) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activePopup, setActivePopup] = useState({
        name: 'Популярности(ASC)',
        sortType: '-rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = activePopup.sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = activePopup.sortType.replace('-', '');
        const category = activeCategory > 0 ? `category=${activeCategory}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                return res.json()
            }).then(json => {
            setItems(json);
            setIsLoading(false);
            window.scrollTo(0, 0);
        });
    }, [activeCategory, activePopup, searchValue]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={activeCategory} onClickCategory={(i) => setActiveCategory(i)}/>
                <Sort value={activePopup} onClickPopup={(i) => setActivePopup(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) :
                    items.map(item => <PizzaBlock key={item.id} {...item}/>)
                }
            </div>
        </div>)
}

export default Home;