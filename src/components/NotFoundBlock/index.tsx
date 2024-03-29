import styles from './NotFoundBlock.module.scss';
import {FC} from "react";
const NotFoundBlock:FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено!
            </h1>
            <p className={styles.root}>
                К сожалению данная страница отсутствует в нашем интернет магазине!
            </p>
        </div>
    );
}

export default NotFoundBlock;