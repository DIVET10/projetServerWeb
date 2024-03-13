
import { body } from 'express-validator';

const factureRules = [
    body('paiement_id')
        .notEmpty().withMessage("L'ID du paiement ne peut pas être vide")
        .isInt({ min: 1 }).withMessage("L'ID du paiement doit être un entier positif"),
    body('montant')
        .notEmpty().withMessage("Le montant ne peut pas être vide")
        .isDecimal().withMessage("Le montant doit être un nombre décimal"),
    body('date_creation')
        .notEmpty().withMessage("La date de création ne peut pas être vide")
        .isISO8601().withMessage("La date de création doit être au format ISO8601"),
    body('date_paiement')
        .optional()
        .isISO8601().withMessage("La date de paiement doit être au format ISO8601")
];

export default factureRules ;