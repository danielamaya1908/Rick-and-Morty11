// moved from ../ValidateLogin.js

export default function ValidateLogin(userData, setErrors, errors, property) {
  const newErrors = { ...errors };

  // Validación de email
  if (property === "email" || property === undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      newErrors.email = "Email es requerido";
      newErrors.emailValid = false;
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Email inválido";
      newErrors.emailValid = false;
    } else {
      newErrors.email = "";
      newErrors.emailValid = true;
    }
  }

  // Validación de password
  if (property === "password" || property === undefined) {
    if (!userData.password) {
      newErrors.password = "Contraseña es requerida";
      newErrors.passwordValid = false;
    } else if (userData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      newErrors.passwordValid = false;
    } else {
      newErrors.password = "";
      newErrors.passwordValid = true;
    }
  }

  setErrors(newErrors);
}
