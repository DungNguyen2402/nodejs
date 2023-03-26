import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

import { signupSchema, signinSchema } from "../schemas/auth";

// Đăng kí
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        
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

        //user.password = undefined;
        
        // tạo token từ server
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {expiresIn: 60 * 60});
        
        return res.status(201).json({
            message: "Đăng kí tài khoản thành công",
            accessToke: token,
            user,
        });
    } catch (error) {
    }

};

// Đăng nhập

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map((err) => err.message) ;
            return res.status(400).json({
                message: errors,
            });
        }

        // kiểm tra tồn tại email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Sai mật khẩu",
            });
        }

        //user.password = undefined;
        
        // tạo token từ server
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {expiresIn: 60 * 60});
        
        return res.status(201).json({
            message: "Đăng nhập thành công",
            accessToke: token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }

};
