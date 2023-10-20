import { useSelector } from "react-redux";
import Cards from "./Cards";
import styles from '../css/Favorites.module.css';

export default function Favorites() {
    const myFavorites = useSelector(state => state.myFavorites) || [];

    return (
        <div className={styles.bigContainer}>
            <Cards characters={myFavorites} onClose={null}/>
        </div>
    )
}


/* import React from 'react';
import { useSelector } from "react-redux";
import Cards from "./Cards";
import styles from '../css/Favorites.module.css';

export default function Favorites() {
    const myFavorites = useSelector(state => state.myFavorites) || [];

    return (
        <div className={styles.bigContainer}>
            <Cards characters={myFavorites} />
        </div>
    );
}
 */