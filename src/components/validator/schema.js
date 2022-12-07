import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().max(30).required(),
    lastname: yup.string().max(30).required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    phone: yup.string().max(40),
    password: yup.string().min(6).max(40).required(),
    confirmpassword: yup
                        .string()
                        .oneOf([yup.ref('password'), null], "Passwords Don't Match!")
                        .required()
});