import Categories from "../Categories";
import Sort, {list} from "../Sort";
import {useEffect, useRef} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {useDispatch, useSelector} from "react-redux";
import {filterSelector, setCategoryID, setCurrentPage, setFilters} from "../../redux/slices/filterSlice";
import qs from "qs";
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, pizzaSelector} from "../../redux/slices/pizzaSlice";
import {searchSelector} from "../../redux/slices/searchSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryID, sort, currentPage} = useSelector(filterSelector);
    const {items, status} = useSelector(pizzaSelector);
    const sortType = sort.sortType;
    const {searchValue} = useSelector(searchSelector);

    const onChangeCategory = (id) => {
        dispatch(setCategoryID(id));
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryID > 0 ? `category=${categoryID}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage
            })
        );
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
            getPizzas();
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
            {
                status === 'error' ?
                    <div className={"content__error-info"}>
                        <h2>Произошла ошибка😕</h2>
                        <p>
                            К сожалению нам не удалось получить пиццы!
                        </p>
                        <p>
                            Попробуйте попытку позже.
                        </p>
                    </div>
                    :
                    <div className="content__items">
                        {status === 'loading' ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) :
                            items.map(item => <Link to={`/pizza/${item.id}`} key={item.id}>
                                <PizzaBlock {...item}/>
                            </Link>)
                        }
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>)
}

export default Home;