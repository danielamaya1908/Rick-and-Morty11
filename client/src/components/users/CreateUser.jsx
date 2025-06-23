import styles from "../../css/CreteUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateRegister from "./utils/ValidateRegister";
import { checkEmailExists } from "./utils/checkEmailExists";

export default function CreateUser({ register }) {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    ValidateRegister({ ...userData, [name]: value }, setErrors, errors, name);
    if (name === "email" && value) {
      const exists = await checkEmailExists(value);
      setErrors((prev) => ({
        ...prev,
        email: exists ? "Este email ya está registrado" : prev.email,
        emailValid: !exists && prev.emailValid,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar antes de enviar
    // Solo errores de tipo string y que no estén vacíos
    const hasErrors = Object.keys(errors).some(
      (key) => typeof errors[key] === "string" && errors[key]
    );
    if (hasErrors) {
      setServerError("Por favor corrige los errores en el formulario");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    // Solo enviar los campos que espera el backend
    const dataToSend = {
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      country: userData.country,
      city: userData.city,
      postalCode: userData.postalCode,
      phoneNumber: userData.phoneNumber,
    };

    try {
      const response = await register(dataToSend);

      if (response.success) {
        // Guardar token en localStorage o cookies
        localStorage.setItem("sessionToken", response.sessionToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Redirigir al dashboard o página principal
        navigate("/dashboard");
      } else {
        setServerError(response.message || "Error en el registro");
      }
    } catch (error) {
      setServerError("Error al conectar con el servidor");
      console.error("Registration error:", error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const isFormValid =
    userData.name &&
    userData.lastName &&
    userData.email &&
    userData.password &&
    userData.confirmPassword &&
    userData.country &&
    userData.city &&
    userData.postalCode &&
    userData.phoneNumber &&
    Object.keys(errors).every(
      (key) =>
        (!key.endsWith("Valid") && (!errors[key] || errors[key] === "")) ||
        (key.endsWith("Valid") && errors[key] === true)
    ) &&
    userData.password === userData.confirmPassword;

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h2>Crear Cuenta</h2>
        {serverError && (
          <div className={styles.errorMessage}>{serverError}</div>
        )}
        <form className={styles.formContainer} autoComplete="on">
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre:</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={userData.name}
                className={
                  errors.nameValid ? styles.inputSuccess : styles.inputError
                }
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Apellido:</label>
              <input
                onChange={handleChange}
                type="text"
                name="lastName"
                value={userData.lastName}
                className={
                  errors.lastNameValid ? styles.inputSuccess : styles.inputError
                }
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={userData.email}
                className={
                  errors.emailValid ? styles.inputSuccess : styles.inputError
                }
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Teléfono:</label>
              <input
                onChange={handleChange}
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                className={
                  errors.phoneNumberValid
                    ? styles.inputSuccess
                    : styles.inputError
                }
              />
              {errors.phoneNumber && (
                <span className={styles.errorText}>{errors.phoneNumber}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña:</label>
              <div className={styles.passwordContainer}>
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  className={
                    errors.passwordValid
                      ? styles.inputSuccess
                      : styles.inputError
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
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

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                className={
                  errors.confirmPasswordValid
                    ? styles.inputSuccess
                    : styles.inputError
                }
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="country">País:</label>
              <input
                onChange={handleChange}
                type="text"
                name="country"
                value={userData.country}
                className={
                  errors.countryValid ? styles.inputSuccess : styles.inputError
                }
              />
              {errors.country && (
                <span className={styles.errorText}>{errors.country}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="city">Ciudad:</label>
              <input
                onChange={handleChange}
                type="text"
                name="city"
                value={userData.city}
                className={
                  errors.cityValid ? styles.inputSuccess : styles.inputError
                }
              />
              {errors.city && (
                <span className={styles.errorText}>{errors.city}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="postalCode">Código Postal:</label>
              <input
                onChange={handleChange}
                type="text"
                name="postalCode"
                value={userData.postalCode}
                className={
                  errors.postalCodeValid
                    ? styles.inputSuccess
                    : styles.inputError
                }
              />
              {errors.postalCode && (
                <span className={styles.errorText}>{errors.postalCode}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            Registrarse
          </button>
        </form>
        <div className={styles.loginSection}>
          <p>¿Ya tienes una cuenta?</p>
          <button onClick={goToLogin} className={styles.loginButton}>
            Inicia Sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}
