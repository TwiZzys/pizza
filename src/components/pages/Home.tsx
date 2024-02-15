import Categories from "../Categories";
import SortPopup, {list} from "../Sort";
import {FC, useCallback, useEffect, useRef} from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {filterSelector} from "../../redux/filter/selectors";
import {setCategoryID, setCurrentPage, setFilters} from "../../redux/filter/slice";
import {pizzaSelector} from "../../redux/pizza/selectors";
import {fetchPizzas} from "../../redux/pizza/asyncActions";
import {SearchPizzaParams} from "../../redux/pizza/types";
import {searchSelector} from "../../redux/search/selectors";

const Home: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryID, sort, currentPage} = useSelector(filterSelector);
    const {items, status} = useSelector(pizzaSelector);
    const sortType = sort.sortType;
    const {searchValue} = useSelector(searchSelector);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryID(idx));
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
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
                currentPage: String(currentPage)
            })
        )
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1))) as unknown as SearchPizzaParams;

            const sort = list.find(item => item.sortType === params.sortBy);

            dispatch(setFilters({
                searchValue: params.search,
                categoryID: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || list[0]
            }));
        }
    }, []);

    useEffect(() => {

        if (!isSearch.current) {
            dispatch(getPizzas);
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
                <SortPopup value={sort}/>
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
                            items.map((item: any) => <PizzaBlock key={item.id} {...item}/>)
                        }
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>)
}

export default Home;