import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'

interface MovieAttributes {
  id:string,  
  title: string,
  description:string,
  price: number,
  image: string,
  userId:string
}

export class MovieInstance extends Model<MovieAttributes> {}

MovieInstance.init({
  id: {
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  title: {
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  price:{
    type:DataTypes.NUMBER,
    allowNull:false,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:false
  },

  userId:{
    type:DataTypes.STRING
  }
  }, {
    sequelize:db,
    tableName:'movies'
  
});
