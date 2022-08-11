"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const movieController_1 = require("../controllers/movieController");
const auth_1 = require("../middleware/auth");
router.post('/create', auth_1.auth, movieController_1.Movie);
router.get('/read', movieController_1.getMovies);
router.get('/read/:id', movieController_1.getSingleMovies);
router.patch('/update/:id', movieController_1.updateMovies);
router.delete('/delete/:id', movieController_1.deleteMovies);
exports.default = router;
//# sourceMappingURL=movies.js.map