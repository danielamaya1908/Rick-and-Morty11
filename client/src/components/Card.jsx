import React from 'react';
import styled from 'styled-components';
import styles from '../css/Card.module.css';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addFav, removeFav } from '../redux/actions';


const Button = styled.button`
position: absolute;
border: none;
border-radius: 10px 0 0 0;
&:hover{
   background-color: rgba(179, 12, 12, 0.862);
   cursor: pointer;
}
`;

export default function Card(props) {
   const { id, name, gender, image, species, status, origin, episode } = props.character;
   const dispatch = useDispatch();
   const allCharacters = useSelector(state => state.allCharacters);
   const [isFav, setIsFav] = useState(false);

   function handleFavorite() {
      if(isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
      }
      else {
         setIsFav(true);
         dispatch(addFav(props.character));
      }
   }

   function handleClose() {
      setIsFav(false);
      dispatch(removeFav(id));
      props.onClose(id);
   }

   useEffect(() => {
      if (Array.isArray(allCharacters)) {
         allCharacters.forEach((fav) => {
            if (fav.id === id) {
               setIsFav(true);
            }
         });
      }
   }, [allCharacters]);

   if (props.keyDetail) {
      return (
         <div key={id}>
            {origin ? (
               <div className={styles.datosDetail}>
                  <h1>{name}</h1>
                  <h2>Status | {status}</h2>
                  <h2>Gender | {gender}</h2>
                  <h2>Specie | {species}</h2>
                  <h2>Planeta | {origin.name}</h2>
                  <div className={styles.episodios}>
                     <h2>Episodios:</h2>
                     {episode.map(epi => {
                        const num = Number(epi.split('/').at(-1));
                        return <h4 className={styles.episodio}>{num}</h4>;
                     })}
                  </div>
               </div>
            ) : (
                  <div id={styles.loadingDiv}>
                     <div id={styles.loading}></div>
                  </div>
            )}
         </div>
      );
   }
   if (!props.onClose) {
      return (
         <div className={styles.favSelected} key={id}>
            <Link className={styles.imgContainer} to={`/Detail/${id}`}>
               <img className={isFav ? styles.imgStatic : styles.img} src={image} alt='imagen'/>
            </Link>
            <Button onClick={handleFavorite}>X</Button>
            <div className={styles.divTextContainer}>
               <div className={styles.divText}>
                  <h2 className={styles.nameCharacter}>{name}</h2>
                  <p className={styles.genderCharacter}>{gender}</p>
               </div>
               <div className={styles.divText} id={styles.textRight}>
                  <p>{species}</p>
                  <p>{id}</p>
               </div>
            </div>
            <div className={styles.addText}>
            To eliminate <span>favorites</span><br/>double click on the x
            </div>
         </div>
      );
   }

   else {
      return (
         <div>
            {
               origin ? (
                  <div className={isFav ? styles.favSelected : styles.fav} key={id}>
                     <Link className={styles.imgContainer} to={`/Detail/${id}`}>
                        <img className={isFav ? styles.imgStatic : styles.img} src={image} alt='imagen' />
                     </Link>
                     <Button onClick={handleClose}>X</Button>
                     <div className={styles.divTextContainer} onClick={handleFavorite}>
                        <div className={styles.divText}>
                           <h2 className={styles.nameCharacter}>{name}</h2>
                           <p className={styles.genderCharacter}>{gender}</p>
                        </div>
                        <div className={styles.divText} id={styles.textRight}>
                           <p>{species}</p>
                           <p>{id}</p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div id={styles.loadingBig}>
                     <div id={styles.loading}></div>
                  </div>
               )
            }
         </div>
      );
   }
}
/* import Card from './Card';
import React from 'react';
import styled from 'styled-components';
import { orderCards, filterCards } from '../redux/actions';
import { useDispatch } from 'react-redux';
import styles from '../css/Cards.module.css';

const DivCard = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(
            250px,
            1fr
        )
    ); 
    justify-items: center;
    gap: 16px;
    margin-top: 50px;
    padding: 0 16px 50px 16px;
`;

const Section = styled.section`
    width: 100%;
`;

const Selectors = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 60px 0;
    padding: 20px 16px;
    background: #ededede0;
`;

export default function Cards({ characters = [], onClose }) {
    const dispatch = useDispatch();

    function handleOrder(e) {
        dispatch(orderCards(e.target.value));
        console.log('funciona order');
    }

    function handleFilter(e) {
        dispatch(filterCards(e.target.value));
    }

    return (
        <Section>
            {onClose && (
                <div className={styles.bigContainer}>
                    <div className={styles.addText}>
                        Note: Add to <span>favorites</span> by clicking on the space below the image of each character
                    </div>
                </div>
            )}

            <Selectors>
                <select className={styles.selectBoxes} onChange={handleOrder} name="" id="">
                    <option value="SELECCIONE">Orden</option>
                    <option value="A">Ascendente</option>
                    <option value="B">Descendente</option>
                </select>
                <select className={styles.selectBoxes} onChange={handleFilter} name="" id="">
                    <option value="SELECCIONE">Género</option>
                    <option value="ALL">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </Selectors>

            <DivCard>
                {Array.isArray(characters) && characters.length ? (
                    characters.map(character => (
                        <Card
                            key={character.id}
                            character={character}
                            onClose={onClose}
                        />
                    ))
                ) : (
                    <div id={styles.loadingBig}>
                        <div id={styles.loading}></div>
                    </div>
                )}
            </DivCard>
        </Section>
    );
} */