import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Utilisateur from "./Utilisateur.js";

const sequelize = database;

const Commande = sequelize.define('Commande', {
    commande_id: {
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
    montant_total: {
      type: DataTypes.DECIMAL(10, 2)
    },
    date_commande: {
      type: DataTypes.DATE
    }
  });
  
 

export default Commande;
