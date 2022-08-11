"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
// import {RegisterUser, LoginUser, getuser} from '../controllers/userController'
router.get('/', movieController_1.getMovies);
router.get('/registration', (req, res) => {
    res.render("registration");
});
exports.default = router;
//# sourceMappingURL=pages.js.map