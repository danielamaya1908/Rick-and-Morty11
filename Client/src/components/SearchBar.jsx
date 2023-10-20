import React from 'react';
import { useState } from 'react';
import styles from '../css/SearchBar.module.css'

export default function SearchBar({onSearch}) {
   const [id, setId] = useState('');
   const handleChange = (event) => {
      setId(event.target.value)
   }
   
   return (
         <div className={styles.search_container}>
             <div className={styles.search_box}>
                 <input className={styles.input} type='text' placeholder='Id' onChange={handleChange}/>
             </div>
             <button className={styles.añadir} onClick={() => onSearch(id)}>Add</button>
         </div>
     
   );
}
