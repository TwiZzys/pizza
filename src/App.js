import './scss/app.scss';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import {createContext, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {decrement, increment} from "./redux/Slices/filterSlice";

export const SearchContext = createContext('');


function App() {
    const [searchValue, setSearchValue] = useState('');
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <div className="wrapper">

                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>

                <SearchContext.Provider value={{searchValue, setSearchValue}}>
                    <Header/>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </div>
        </div>
    );
}

export default App;
