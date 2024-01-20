import {useState} from "react";

const Categories = () => {

    const [activeCategory, setActiveCategory] = useState(0);

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const onClickCategory = (index) => {
        setActiveCategory(index);
    }

    return (<div className="categories">
        <ul>
            {
                categories.map((item, i) => (
                    <li onClick={() => {onClickCategory(i)}} className={activeCategory === i ? 'active' : ''}>
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>)
}

export default Categories;