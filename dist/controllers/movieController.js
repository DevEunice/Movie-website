"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovies = exports.updateMovies = exports.getSingleMovies = exports.getMovies = exports.Movie = void 0;
const uuid_1 = require("uuid");
const movie_1 = require("../model/movie");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function Movie(req, res, next) {
    const id = uuid_1.v4();
    // let todo = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await movie_1.MovieInstance.create({ id, ...req.body, userId: verified.id });
        //   return res.status(201).json({
        //        msg:"You have successfully created a movie",
        //        record
        //    })
        res.redirect('/users/dashboard');
        // const user = await UserInstance.findOne({
        //    where: {id: verified.id},
        //    include: [{ model: MovieInstance, as: "movies"}]
        // })
        //res.redirect("/users/dashboard")
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to create',
            route: '/create'
        });
    }
}
exports.Movie = Movie;
async function getMovies(req, res, next) {
    var _a, _b;
    try {
        const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
        const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await movie_1.MovieInstance.findAndCountAll({ limit, offset, include: [{
                    model: user_1.UserInstance,
                    attributes: ['id', 'fullname', 'username', 'email'],
                    as: 'users'
                }]
        });
        const eunice = req.headers['postman'];
        if (eunice) {
            res.status(200).json({
                msg: "You have successfully fetch all movies",
                count: record.count,
                record: record.rows
            });
        }
        else {
            res.render("index", { value: record.rows });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getMovies = getMovies;
async function getSingleMovies(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        // return res.status(200).json({
        //    msg:"Successfully gotten user information",
        //    record:record
        // })
        return record;
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single movie",
            route: "/read/:id"
        });
    }
}
exports.getSingleMovies = getSingleMovies;
async function updateMovies(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing movie",
            });
        }
        const updatedrecord = await record.update({
            title: title,
            description: description,
            image: image,
            price: price
        });
        res.redirect('/users/dashboard');
        //   res.status(200).json({
        //     msg:"You have successfully updated your movie",
        //     updatedrecord
        //  })
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id"
        });
    }
}
exports.updateMovies = updateMovies;
async function deleteMovies(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find movie"
            });
        }
        const deletedRecord = await record.destroy();
        // return res.status(200).json({
        //    msg: "Movie deleted successfully",
        //    deletedRecord 
        // })
        res.redirect('/users/dashboard');
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id"
        });
    }
}
exports.deleteMovies = deleteMovies;
//# sourceMappingURL=movieController.js.map