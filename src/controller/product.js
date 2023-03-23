import dotenv from "dotenv";
import axios from "axios";
import joi from "joi";
import products from "../models/product";
dotenv.config();

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required()
})

export const getAll = async (req, res) => {
    try {
        //const {data : products} = await axios.get(`${process.env.API_URL}/products`);
        const product = await products.find()
        console.log(product);
        if (product.length === 0) {
            return res.status(400).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message :error,
        });
    }
};

export const get = async (req, res) => {
    try {
        // const { data: product } = await axios.get(
        //     `${process.env.API_URL}/products/${req.params.id}`
        // );
        const product = await products.findById(req.params.id)
        if (!product) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {

        // validate
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                    message: error.details[0].message,
            });
        }

        //const { data: product } = await axios.post(`${process.env.API_URL}/products`, req.body);
        const product = await products.create(req.body);
        if (!product) {
            return res.json({
                message: "Thêm sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        // const { data: product } = await axios.put(
        //     `${process.env.API_URL}/products/${req.params.id}`,
        //     req.body
        // );
        const product = await products.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        })
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        // const { data: product } = await axios.delete(
        //     `${process.env.API_URL}/products/${req.params.id}`
        // );
        // if (!product) {
        //     return res.json({
        //         message: "Xóa sản phẩm không thành công",
        //     });
        // }
        const product = await products.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};