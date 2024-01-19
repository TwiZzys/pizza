import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        <PizzaBlock title={"Мексиканская"} price={789} />
                        <PizzaBlock title={"Мексиканская2"} price={500} />
                        <PizzaBlock title={"Мексиканская3"} price={300} />
                        <PizzaBlock title={"Мексиканская4"} price={250} />
                        <PizzaBlock title={"Мексиканская5"} price={780} />
                        <PizzaBlock title={"Мексиканская6"} price={644} />
                        <PizzaBlock title={"Мексиканская7"} price={345} />
                        <PizzaBlock title={"Мексиканская8"} price={671} />
                        <PizzaBlock title={"Мексиканская9"} price={890} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
