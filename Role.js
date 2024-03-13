import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const sequelize = database;

const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_role: {
        type: DataTypes.ENUM('organisateur', 'client'), // Définir les rôles possibles comme ENUM
        unique: true
      }
  });

export default Role;
