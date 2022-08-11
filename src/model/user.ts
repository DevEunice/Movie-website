import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'
import { MovieInstance } from "./movie";

interface UserAttributes {
  id: string;
  fullname:string;
  username:string;
  email:string;
  password:string;
 
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init({
  id: {
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  fullname:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        msg:"full name is required"
      },
      notEmpty:{
        msg:"Pls, provide full name"
      }
    }
  },
  username:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
 email:{
   type:DataTypes.STRING,
   allowNull:false,
   unique:true,
   validate: {
    notNull: {
      msg:"Email is required"
    },
    notEmpty:{
      msg:"Pls, provide email"
    }
  }
 },
 password:{
   type:DataTypes.STRING,
   allowNull:false,
   validate:{
    notNull:{
      msg:"Password is required"
    },
    notEmpty:{
      msg:"Pls, provide a password"
    }
  }
 }
},{
    sequelize:db,
    tableName:'users'
});

UserInstance.hasMany(MovieInstance, {foreignKey:'userId',
as:'movies'
})

MovieInstance.belongsTo(UserInstance,{foreignKey:'userId',
as:'users'}) 
