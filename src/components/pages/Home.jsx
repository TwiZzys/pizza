import ReactPaginate from "react-paginate";

import Categories from "../Categories";
import Sort from "../Sort";
import {useContext, useEffect, useState} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {SearchContext} from "../../App";

const Home = () => {
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
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

        fetch(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                return res.json()
            }).then(json => {
            setItems(json);
            setIsLoading(false);
            window.scrollTo(0, 0);
        });
    }, [activeCategory, activePopup, searchValue, currentPage]);

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
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>)
}

export default Home;