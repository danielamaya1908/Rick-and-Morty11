import Card from './Card';
import React, { useState } from 'react';
import styled from 'styled-components';
import { orderCards, filterCards } from '../redux/actions';
import { useDispatch } from 'react-redux';
import styles from '../css/Cards.module.css';

const DivCard = styled.div`
/* display: flex;
align-items: center;
justify-content: space-evenly;
flex-wrap: wrap; */
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
/* backdrop-filter: blur(5px); */
`;

export default function Cards({characters, onClose}) {

 /*   if (!Array.isArray(characters)) {
      // Esto imprimirá una advertencia en la consola si 'characters' no es un array
      console.warn('Prop "characters" should be an array, but received:', characters);
      characters = []; // Establece characters como un array vacío por defecto
   } */


   if (typeof characters === 'object' && characters.favorites) {
      characters = characters.favorites;
   }

   if (!Array.isArray(characters)) {
      console.warn('Prop "characters" should be an array, but received:', characters);
      characters = []; 
   }
   const [aux, setAux] = useState(false)
   const dispatch = useDispatch();

   let [boolean, setboolean] = useState('');
   function myFunction() {setboolean('holis')}
   setTimeout(myFunction, 500);
   
   function handleOrder(e) {
      dispatch(orderCards(e.target.value));
      /* console.log('funciona order'); */
      setAux(true);
   }

   function handleFilter(e) {
      dispatch(filterCards(e.target.value));
   }

   if (onClose) {
      return (
         <div className={styles
            .bigContainer}>
            <div className={styles.addText}>
               Note: Add to <span>favorites</span> by clicking on the space below the image of each character
            </div>
            {characters ? (<DivCard>
               {characters.map(character => {
                  return <Card
                     key={character.id}
                     character={character}
                     onClose={onClose}
                  />
               })}
            </DivCard>) : (
               <div id={styles.loadingBig}>
                  <div id={styles.loading}></div>
               </div>
            )}
         </div>
      );
   }
   else {
      return (
         <Section>
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
               {characters.map(character => {
                  return <Card 
                  key={character.id}
                  character={character}
                  onClose={onClose}
                  />})}
            </DivCard>
         </Section>
         );
   }
}
