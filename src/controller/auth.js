// import dotenv from "dotenv";
// import axios from "axios";
// import joi from "joi";

// dotenv.config();

// const authSchema = joi.object({
//     email: joi.string().required(),
//     password: joi.string().required(),
// })

// export const signup = async (req, res) => {
//     try {

//         // validate
//         const { error } = authSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({
//                     message: error.details[0].message,
//             });
//         }

//         const { data: user } = await axios.post(`${process.env.API_URL}/signup`, req.body);
//         if (!user) {
//             return res.json({
//                 message: "Tạo tài khoản không thành công",
//             });
//         }
//         return res.json({
//             message: "Đăng kí thành công",
//             user,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: error,
//         });
//     }
// };



import User from "../models/user";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    return res.status(400).json({
        message: "Đăng kí tài khoản thành công",
        user,
    });

}