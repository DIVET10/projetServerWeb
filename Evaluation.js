import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
 import Utilisateur from "./Utilisateur.js";
 import Evenement from "./Evenements.js";

 const sequelize = database;


 const Evaluation = sequelize.define('Evaluation', {
    evaluation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Utilisateur,
        key: 'utilisateur_id'
      }
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Evenement,
        key: 'evenement_id'
      }
    },
    note: {
      type: DataTypes.INTEGER
    },
    date_evaluation: {
      type: DataTypes.DATE
    }
  });
  

export default Evaluation;
