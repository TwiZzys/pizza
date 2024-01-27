import {useState} from "react";

const Categories = ({value, onClickCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (<div className="categories">
        <ul>
            {
                categories.map((item, i) => (
                    <li onClick={() => {
                        onClickCategory(i);
                    }}
                        className={value === i ? 'active' : ''}
                        key={i}>
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>)
}

export default Categories;