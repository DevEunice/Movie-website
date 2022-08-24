"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueUserMovie = exports.getuser = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const movie_1 = require("../model/movie");
async function RegisterUser(req, res, next) {
    const id = uuid_1.v4();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicatEmail = await user_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await user_1.UserInstance.create({
            id: id,
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: passwordHash
        });
        res.status(201).json({
            msg: "You have successfully created a user",
            record
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = uuid_1.v4();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await user_1.UserInstance.findOne({ where: { email: req.body.email } });
        const { id } = User;
        const token = utils_1.generateToken({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match"
            });
        }
        else {
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.cookie("id", id, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.redirect("/users/dashboard");
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginUser = LoginUser;
async function getuser(req, res, next) {
    var _a, _b;
    try {
        const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
        const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
        console.log("before");
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await user_1.UserInstance.findAndCountAll({ limit, offset, include: [{
                    model: movie_1.MovieInstance, as: "movies"
                }] });
        console.log("after");
        res.status(200).json({
            msg: "You have successfully fetch all movies",
            count: record.count,
            record: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getuser = getuser;
async function getUniqueUserMovie(req, res, next) {
    let id = req.cookies.id;
    try {
        const record = await user_1.UserInstance.findOne({
            where: { id }, include: [{
                    model: movie_1.MovieInstance,
                    as: "movies"
                }]
        });
        res.render("dashboard", { record });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getUniqueUserMovie = getUniqueUserMovie;
//# sourceMappingURL=userController.js.map