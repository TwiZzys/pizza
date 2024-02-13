import {FC, useState} from "react";
import {useSelector} from "react-redux";
import {setSort, SortPropertyEnum, sortSelector} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";


type SortItem = {
    name: string;
    sortType: SortPropertyEnum;
}
export const list: SortItem[] = [
    {
        name: 'Популярности(ASC)',
        sortType: SortPropertyEnum.RATING_ASC
    },
    {
        name: 'Популярности(DESC)',
        sortType: SortPropertyEnum.RATING_DESC
    },
    {
        name: 'Цене(ASC)',
        sortType: SortPropertyEnum.PRICE_ASC
    },
    {
        name: 'Цене(DESC)',
        sortType: SortPropertyEnum.PRICE_DESC
    },
    {
        name: 'Алфавиту(ASC)',
        sortType: SortPropertyEnum.TITLE_ASC
    },
    {
        name: 'Алфавиту(DESC)',
        sortType: SortPropertyEnum.TITLE_DESC
    },
];
const SortPopup: FC = () => {

    const dispatch = useAppDispatch();
    const sort = useSelector(sortSelector);

    const [open, setOpen] = useState(false);

    const onClickActivePopup = (i: SortItem) => {
        dispatch(setSort(i));
        setOpen(false);
    }

    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {
                open && (
                    <div className="sort__popup">
                        <ul>
                            {
                                list.map((item, i) => (
                                    <li key={i}
                                        className={sort.sortType === item.sortType ? 'active' : ''}
                                        onClick={() => onClickActivePopup(item)}>{item.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default SortPopup;