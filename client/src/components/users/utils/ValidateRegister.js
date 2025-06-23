// moved from ../ValidateRegister.js
export default function ValidateRegister(
  userData,
  setErrors,
  errors,
  property
) {
  let newErrors = { ...errors };

  if (!userData[property]) {
    // Solo marcar error en confirmPassword si el usuario ya escribió algo en password
    if (property === "confirmPassword" && !userData.password) {
      newErrors = {
        ...newErrors,
        confirmPassword: "",
        confirmPasswordValid: true,
      };
    } else {
      newErrors = {
        ...newErrors,
        [property]: "Campo obligatorio",
        [`${property}Valid`]: false,
      };
    }
  } else {
    if (property === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userData.email)) {
        newErrors = {
          ...newErrors,
          email: "",
          emailValid: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          email: "Email inválido",
          emailValid: false,
        };
      }
    } else if (property === "password") {
      const passwordRegex = /^(?=.*\d).{6,}$/;
      if (passwordRegex.test(userData.password)) {
        newErrors = {
          ...newErrors,
          password: "",
          passwordValid: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          password:
            "La contraseña debe tener al menos 6 caracteres y un número",
          passwordValid: false,
        };
      }
    } else if (property === "confirmPassword") {
      // Solo marcar error si el usuario ya escribió algo en password
      if (userData.password && userData.confirmPassword !== userData.password) {
        newErrors = {
          ...newErrors,
          confirmPassword: "Las contraseñas no coinciden",
          confirmPasswordValid: false,
        };
      } else {
        newErrors = {
          ...newErrors,
          confirmPassword: "",
          confirmPasswordValid: true,
        };
      }
    } else if (property === "name" || property === "lastName") {
      if (userData[property].length >= 2) {
        newErrors = {
          ...newErrors,
          [property]: "",
          [`${property}Valid`]: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          [property]: "Debe tener al menos 2 caracteres",
          [`${property}Valid`]: false,
        };
      }
    } else if (property === "phoneNumber") {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (phoneRegex.test(userData.phoneNumber)) {
        newErrors = {
          ...newErrors,
          phoneNumber: "",
          phoneNumberValid: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          phoneNumber: "Número de teléfono inválido",
          phoneNumberValid: false,
        };
      }
    } else if (property === "postalCode") {
      if (userData.postalCode.length >= 4) {
        newErrors = {
          ...newErrors,
          postalCode: "",
          postalCodeValid: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          postalCode: "Código postal inválido",
          postalCodeValid: false,
        };
      }
    } else if (property === "country" || property === "city") {
      if (userData[property].length >= 2) {
        newErrors = {
          ...newErrors,
          [property]: "",
          [`${property}Valid`]: true,
        };
      } else {
        newErrors = {
          ...newErrors,
          [property]: "Debe tener al menos 2 caracteres",
          [`${property}Valid`]: false,
        };
      }
    }
  }

  setErrors(newErrors);
}
