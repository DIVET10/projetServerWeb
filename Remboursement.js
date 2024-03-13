import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Paiement from "./Paiement.js";

const sequelize = database;

const Remboursement = sequelize.define('Remboursement', {
    remboursement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    paiement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Paiement,
        key: 'paiement_id'
      }
    },
    montant_rembourse: {
      type: DataTypes.DECIMAL(10, 2)
    },
    date_remboursement: {
      type: DataTypes.DATE
    }
  });
  
 

export default Remboursement;
