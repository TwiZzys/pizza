import Categories from "../Categories";
import Sort, {list} from "../Sort";
import {useEffect, useRef, useState} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryID, setCurrentPage, setFilters} from "../../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryID, sort, currentPage} = useSelector(state => state.filter);
    const sortType = sort.sortType;
    const {searchValue} = useSelector(state => state.search);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryID(id));
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    }

    const fetchPizzas = () => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryID > 0 ? `category=${categoryID}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(item => item.sortType === params.sortType);

            dispatch(
                setFilters({
                    ...params,
                    sort,

                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false;

    }, [categoryID, sortType, searchValue, currentPage]);


    useEffect(() => {
        if (isMounted.current) {
            const queryStr = qs.stringify({
                sortType: sort.sortType,
                categoryID,
                currentPage
            });

            navigate(`?${queryStr}`);
        }
        isMounted.current = true;
    }, [categoryID, sortType, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) :
                    items.map(item => <PizzaBlock key={item.id} {...item}/>)
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>)
}

export default Home;