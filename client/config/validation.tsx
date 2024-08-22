import * as Yup from 'yup';


export const checkPassword = (password: string): boolean => {
  
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit) {
        return true;
    } else {
        alert("Change password"); 
        return false;
    }
};


export const checkEmail = (email: string): boolean => {
    const emailValidationSchema = Yup.object().shape({
        email: Yup
            .string()
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email format'
            ),
    });

    try {
        emailValidationSchema.validateSync({ email });
        return true;
    } catch (validationError) {
        return false;
    }
};
