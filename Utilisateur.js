import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Role from "./Role.js";

const sequelize = database;

const Utilisateur = sequelize.define('Utilisateur', {
    utilisateur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true
    },
    mot_de_passe: {
      type: DataTypes.STRING(255)
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'role_id'
      }
    }
  });
  
 

export default Utilisateur;
