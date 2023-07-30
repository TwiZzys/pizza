import axios from "axios";
import qs from 'qs';
import Categories from "../components/Categories";
import Sort, {popupList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useRef, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);


    //вытаскиваем по отдельности
    // const categoryId = useSelector(state => state.filter.categoryId);
    // const sortType = useSelector(state => state.filter.sort.sortProperty);

    //Вытаскиваем методы из целого объекта
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);
    const sortType = sort.sortProperty;

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const fetchPizzas = () => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            });
    }

    //С помощью js
    // const pizzas = items.filter(item => {
    //     return item.title.toLowerCase().includes(searchValue.toLowerCase());
    // }).map(item => (<PizzaBlock key={item.id} {...item}/>));

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = popupList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    //Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    //Через бекэнд
    const pizzas = items.map(item => (<PizzaBlock key={item.id} {...item}/>));
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false;

    }, [categoryId, sortType, searchValue, currentPage]);
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        isLoading ? skeletons : pizzas
                    }
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </div>
        </>
    )
}
export default Home;