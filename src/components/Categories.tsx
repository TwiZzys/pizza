import {FC, memo} from "react";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
    value: number;
    onChangeCategory: (i: number) => void;
};
const Categories: FC<CategoriesProps> = memo(({value, onChangeCategory}) => {

    return (<div className="categories">
        <ul>
            {
                categories.map((item, i) => (
                    <li onClick={() => {
                        onChangeCategory(i);
                    }}
                        className={value === i ? 'active' : ''}
                        key={i}>
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>)
});

export default Categories;