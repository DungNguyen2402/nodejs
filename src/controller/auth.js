import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const signupSchema = joi.object({
    name: joi.string(),
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
})

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const {error} = signupSchema.validate(req.body, { abortEarly: false});
        
        if (error) {
            const errors = error.details.map((err) => err.message) ;
            return res.status(400).json({
                message: errors,
            });
        }

        // kiểm tra tồn tại email
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        const handedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: handedPassword,
        });

        user.password = undefined;
        const accessToken = jwt.sign({ _id: user._id }, "banDung", {expiresIn: "1d"});

        // tạo token từ server
        const token = j
        return res.status(400).json({
            message: "Đăng kí tài khoản thành công",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }

}