import React from "react";
import SearchBar from './SearchBar.jsx';
import styles from '../css/Nav.module.css';
import {NavLink, useLocation} from 'react-router-dom';

function Nav({onSearch, onCloseAll}) {
    const {pathname} = useLocation();
    console.log(pathname);

    function handleRandom() {
        const randomNumber = Math.floor(Math.random() * 827) + 1;
        onSearch(randomNumber);
    }

    return (
        <div className={styles.navbarra}>
            <div className={styles.nav}>
                <NavLink to='/home'>
                    <button className={pathname === '/home' ? styles.buttonOn: styles.button} id={styles.home}>Home</button>
                </NavLink>
                <NavLink to='/Favorites'>
                    <button className={pathname === '/Favorites' ? styles.buttonOn: styles.button} id={styles.home}>Favorites</button>
                </NavLink>
                <NavLink to='/About'>
                    <button className={pathname === '/About' ? styles.buttonOn: styles.button} id={styles.about}>About</button>
                </NavLink>
                <SearchBar onSearch={onSearch} />
            </div>
        </div>
    );
}

export default Nav;