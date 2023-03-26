import joi from "joi"
export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.email": "Email không đúng định dạng",
        "string.empty": "Email không đc để trống",
        "string.required": "Trường email là bắt buộc",
    }),
    password: joi.string().required().messages({
        "string.min": "Password phải có ít nhất {#limit} kí tự",
        "string.empty": "Password không đc để trống",
        "any.required": "Trường password là bắt buộc"
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "Password không khớp",
        "any.required": "Trường confirm password là bắt buộc", 
    }),
});

export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "Email không đúng định dạng",
        "string.empty": "Email không đc để trống",
        "string.required": "Trường email là bắt buộc",
    }),
    password: joi.string().required().messages({
        "string.min": "Password phải có ít nhất {#limit} kí tự",
        "string.empty": "Password không đc để trống",
        "any.required": "Trường password là bắt buộc"
    }),
});