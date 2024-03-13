import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Evenement from "./Evenements.js";

const sequelize = database;

const Billet = sequelize.define('Billet', {
    billet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Evenement,
        key: 'evenement_id'
      }
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2)
    },
    date_achat: {
      type: DataTypes.DATE
    }
  });
  
 

export default Billet;
