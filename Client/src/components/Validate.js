
export default function Validate(userData, setErrors, errors, property) {
    if(!userData[property]) {
        setErrors({...errors, [property]: `${property} sin completar`});
    }

    else {
        if (property === 'username') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.username) && userData.username.length < 35) {
                setErrors({...errors, [property]: '', boolean1: true});
            }
            else setErrors({...errors, [property]: 'username inválido', boolean1: false});
        }

        else if (property === 'password') {
            console.log(property)
            const obj = {
                length: /(?=.{6,10})/,
                digit: /(?=.*[0-9])/,
            };
            if (obj.length.test(userData.password) && obj.digit.test(userData.password)) setErrors({...errors, [property]: '', boolean2: true});
            else setErrors({...errors, [property]: 'username inválido', boolean2: false});
        }
    }
}