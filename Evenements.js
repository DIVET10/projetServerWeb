import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const sequelize = database;

const Evenement = sequelize.define('Evenement', {
    evenement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100)
    },
    date_evenement: {
      type: DataTypes.DATE
    },
    heure_evenement: {
      type: DataTypes.TIME
    },
    description: {
      type: DataTypes.STRING(DataTypes.MAX)
    },
    lieu_nom: {
      type: DataTypes.STRING(100)
    },
    lieu_adresse: {
      type: DataTypes.STRING(255)
    }
  });

export default Evenement;
