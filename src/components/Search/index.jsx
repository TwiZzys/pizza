import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';
import {useCallback, useContext, useRef, useState} from "react";
import {SearchContext} from "../../App";
import debounce from "lodash.debounce";


const Search = () => {

    const [value, setValue] = useState('');

    const {setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();


    const onClickFocus = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }

    const updateSearchValue = useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 700), []
    );

    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value)
    }

    return (
        <div className={styles.root}>
            <img className={styles.icon} src={searchIcon} alt="search icon"/>
            <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы..."
                onChange={onChangeInput}
                value={value}
            />
            {
                value && (
                    <img
                        className={styles.clearIcon}
                        src={clearIcon}
                        alt="clearIcon"
                        onClick={onClickFocus}
                    />
                )
            }
        </div>
    )
}

export default Search;
