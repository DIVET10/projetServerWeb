import { DataTypes } from "sequelize";
import database from "../config/connexion.js"; // Utilisez directement la variable database

import Paiement from "./Paiement.js";

const Facture = database.define('Facture', {
    facture_id: {
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
      montant: {
        type: DataTypes.DECIMAL(10, 2)
      },
      date_creation: {
        type: DataTypes.DATE
      },
      date_paiement: {
        type: DataTypes.DATE
      }
});


export default Facture;
