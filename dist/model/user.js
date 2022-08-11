"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const movie_1 = require("./movie");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "full name is required"
            },
            notEmpty: {
                msg: "Pls, provide full name"
            }
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            notEmpty: {
                msg: "Pls, provide email"
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Pls, provide a password"
            }
        }
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'users'
});
UserInstance.hasMany(movie_1.MovieInstance, { foreignKey: 'userId',
    as: 'movies'
});
movie_1.MovieInstance.belongsTo(UserInstance, { foreignKey: 'userId',
    as: 'users' });
//# sourceMappingURL=user.js.map