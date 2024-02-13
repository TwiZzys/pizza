import styles from './Search.module.scss';
import {ChangeEvent, FC, useCallback, useRef, useState} from "react";
import debounce from 'lodash.debounce';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/searchSlice";

const Search: FC = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(debounce((str: string) => {
        dispatch(setSearchValue(str));
    }, 600), []);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24px" height="24px">
                <path
                    d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
            </svg>
            <input className={styles.input} type="text" placeholder="Поиск пиццы..." value={value}
                   onChange={onChangeInput}
                   ref={inputRef}
            />

            {
                value &&
                <svg onClick={onClickClear} className={styles.clearIcon} fill="none" height="24"
                     viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"/>
                </svg>
            }
        </div>
    )
}

export default Search;