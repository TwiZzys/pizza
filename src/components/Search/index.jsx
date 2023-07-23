import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.root}>
            <img className={styles.icon} src={searchIcon} alt="search icon"/>
            <input
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
            />
            {
                searchValue && (
                    <img
                        className={styles.clearIcon}
                        src={clearIcon}
                        alt="clearIcon"
                        onClick={() => setSearchValue('')}
                    />
                )
            }
        </div>
    )
}

export default Search;
