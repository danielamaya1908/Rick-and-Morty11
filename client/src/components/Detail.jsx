import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import styles from '../css/Detail.module.css';
import Card from './Card';

export default function Detail() {
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    /* axios.get(`https://rickandmortyapi.com/api/character/${id}`) */
    useEffect(() => {
        axios.get(`http://localhost:3001/rickandmorty/character/${id}`).then(
            ({data}) => {
                if(!data.name) {
                    window.alert(`No se encontró el personaje con el id: ${id}`);
                }
                else setCharacter(data)
            }
        );
        return setCharacter({});
    }, [id]);

    if(character) 
    console.log(character)
        return (
            <div className={styles.detailContainer}>
                <div className={styles.detaildata}>
                    <Card character={character} keyDetail={true}/>
                </div>
                <div className={styles.detailimg}>
                    <img src={character.image} alt="" />
                </div>
            </div>
        )
}