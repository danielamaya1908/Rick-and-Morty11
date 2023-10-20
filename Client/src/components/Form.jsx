import styles from '../css/Form.module.css';
import { useState } from 'react';
import Validate from './Validate';

export default function Form(props) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(true);

    function handlePassword(event) {
        event.preventDefault();
        if (showPassword) setShowPassword(false);
        else setShowPassword(true);
    }

    function handlechange(event) {
        const property = event.target.name;
        const value = event.target.value;

        setUserData({...userData, [property]: value});
        Validate({...userData, [property]: value}, setErrors, errors, property);
    }

    function submitHandler(event) {
        if (errors.boolean1 && errors.boolean2) {
            event.preventDefault();
            props.login(userData);
        }
        else alert('El usuario o la contraseña no son válidos');
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            submitHandler(event);
        }
    };

    return (
        <div onKeyDown={handleKeyDown} className={styles.container}>
            <form className={styles.formContainer} action="">
                <div className={styles.imgContainer}>
                    <img src="//rickandmortyapi.com/api/character/avatar/1.jpeg" alt="imagen" />
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputsContainer}>
                        <label htmlFor="username">Username:</label>

                        <div className={styles.usernameContainer}>
                            <input onChange={handlechange} type="text" name='username' placeholder='Email' value={userData.username} className={errors.boolean1 ? styles.inputSuccess: styles.inputFail}/>
                            <span className={styles.simboloNone}></span>
                        </div>
                    </div>

                    <div className={styles.inputsContainer}>
                        <label htmlFor="password">Password:</label>

                        <div className={styles.usernameContainer}>
                            <input onChange={handlechange} type={showPassword ? 'password': 'text'} name='password' placeholder='Password' value={userData.password} autoComplete="off" className={errors.boolean2 ? styles.inputSuccess: styles.inputFail}/>
                        </div>
                    </div>
                </div>
                <button type='submit' onClick={submitHandler}>Sign In</button>
            </form>
        </div>
    )
}