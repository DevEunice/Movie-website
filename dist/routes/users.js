"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.get('/register', (req, res) => {
    res.render("registration");
});
router.post('/register', userController_1.RegisterUser);
router.get('/login', (req, res) => {
    res.render("login");
});
router.get('/dashboard', userController_1.getUniqueUserMovie);
router.post('/login', userController_1.LoginUser);
router.get('/allusers', userController_1.getuser);
exports.default = router;
//# sourceMappingURL=users.js.map