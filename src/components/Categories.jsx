import {useState} from "react";

const Categories = () => {
    const [categoryActive, setCategoryActive] = useState(0);
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, i) => (
                        <li
                            onClick={() => setCategoryActive(i)}
                            className={categoryActive === i ? 'active' : ''}
                            key={i}>{category}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;