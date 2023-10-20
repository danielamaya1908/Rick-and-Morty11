import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form';
import Favorites from './components/Favorites';
import { useDispatch } from 'react-redux';
import { removeFav } from './redux/actions';
import { removeAllFav } from './redux/actions';


function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const [character, setCharacter] = useState({});
   const [characters, setCharacters] = useState([]);
   const [copias, setCopias] = useState([]);
   const dispatch = useDispatch();

   async function login(userData) {
      try {
         const { username, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { data } = await axios(`${URL}?email=${username}&password=${password}`)
         const { access } = data;
         setAccess(access);
         access ? navigate('/home') : alert('Usuario o contraseña inválida');
      } catch (error) {
         alert('ha ocurrido un error, vuelva a intentarlo');
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   function onClose(id){
      const charactersFiltrados = characters.filter(character => character.id !== id);
      setCharacters(charactersFiltrados);
      setCopias([copias.filter(charId => charId !== id)]);
      dispatch(removeFav(id));
   }

   function onCloseAll() {
      setCharacters([]);
      setCopias([]);
      dispatch(removeAllFav());
   }

   /* axios(`https://rickandmortyapi.com/api/character/${id}`) */
   async function onSearch(id, string = 'all') {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if (data) {
            if (string !== 'all') {
               setCharacter(data);
            }
            else {
               if (!copias.includes(id)) {
                  setCopias([...copias, id]);
                  setCharacters([...characters, data]);
               }
               else alert('El personaje ya fue agregado');
            }
         }
         else window.alert(`No se encontró el personaje con el id: ${id}`)
      } catch (error) {
         window.alert(`No se encontró el personaje con el id: ${id}`);
      }
   }
   return (
      <div className='App'>
         {location.pathname !== '/' && <Nav onSearch={onSearch} onCloseAll={onCloseAll}/>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/Home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/Favorites' element={<Favorites/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Detail/:id" element={<Detail character={character} onSearch={onSearch}/>}/>
         </Routes>
      </div>
   );
}

export default App;
