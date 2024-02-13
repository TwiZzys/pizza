import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const FullPizza = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState({});

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const {data} = await axios.get('https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza/' + id);
                setPizza(data);
            } catch (error) {
                navigate('/');
                alert('Ошибка при получении пиццы!');
            }
        }
        fetchPizza();
    }, []);

    if (!pizza)
    {
        return 'Загрузка...';
    }

    return (
        <div className={"container"}>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza;