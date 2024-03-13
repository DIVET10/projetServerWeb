import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Utilisateur from "./Utilisateur.js";

const sequelize = database;

const Paiement = sequelize.define('Paiement', {
    paiement_id: {
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
    montant: {
      type: DataTypes.DECIMAL(10, 2)
    },
    date_paiement: {
      type: DataTypes.DATE
    }
  });
  
 
export default Paiement;
