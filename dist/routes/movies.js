"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const movieController_1 = require("../controllers/movieController");
const auth_1 = require("../middleware/auth");
router.get('/create', (req, res) => {
    res.render('create');
});
router.post('/create', auth_1.auth, movieController_1.Movie);
router.get('/read', movieController_1.getMovies);
//router.get('/read/:id',getSingleMovies)
router.get('/edit/:id', async (req, res, next) => {
    let record = await movieController_1.getSingleMovies(req, res, next);
    res.render('edit', { record });
});
router.post('/edit/:id', auth_1.auth, movieController_1.updateMovies);
router.post('/delete/:id', auth_1.auth, movieController_1.deleteMovies);
exports.default = router;
//# sourceMappingURL=movies.js.map