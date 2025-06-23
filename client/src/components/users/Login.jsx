import styles from "../../css/Login.module.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ValidateLogin from "./utils/ValidateLogin";
import AuthContext from "../../context/AuthContext";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
    console.log("handleChange:", newUserData);
    ValidateLogin(newUserData, setErrors, errors, name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit: userData", userData, "errors", errors);
    ValidateLogin(userData, setErrors, errors);

    if (!errors.emailValid || !errors.passwordValid) {
      setServerError("Por favor corrige los errores en el formulario");
      console.log("Errores de validación:", errors);
      return;
    }

    try {
      const response = await login({
        email: userData.email,
        password: userData.password,
      });
      console.log("Respuesta de login:", response);
      if (!response.success) {
        setServerError(response.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Login error (catch):", error);
      setServerError("Error al conectar con el servidor. Intenta nuevamente.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <div onKeyDown={handleKeyDown} className={styles.loginContainer}>
        <h2>Iniciar Sesión</h2>

        {serverError && (
          <div className={styles.errorMessage}>{serverError}</div>
        )}

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={userData.email}
              className={
                errors.emailValid ? styles.inputSuccess : styles.inputError
              }
              required
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña:</label>
            <div className={styles.passwordContainer}>
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={userData.password}
                autoComplete="current-password"
                className={
                  errors.passwordValid ? styles.inputSuccess : styles.inputError
                }
                required
              />
              <button
                onClick={handlePasswordVisibility}
                className={styles.showPasswordButton}
                type="button"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!errors.emailValid || !errors.passwordValid}
          >
            Iniciar Sesión
          </button>
        </form>

        <div className={styles.registerSection}>
          <p>¿No tienes una cuenta?</p>
          <button onClick={goToRegister} className={styles.registerButton}>
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
