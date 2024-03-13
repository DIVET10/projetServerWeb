import { body } from 'express-validator';

const paiementRules = [
    body('utilisateur_id')
        .notEmpty().withMessage("L'identifiant de l'utilisateur ne peut pas être vide")
        .isInt({ min: 1 }).withMessage("L'identifiant de l'utilisateur doit être un entier positif"),
    body('montant')
        .notEmpty().withMessage("Le montant du paiement ne peut pas être vide")
        .isDecimal({ decimal_digits: '1,2' }).withMessage("Le montant du paiement doit être un nombre décimal"),
    body('date_paiement')
        .notEmpty().withMessage("La date du paiement ne peut pas être vide")
        .isISO8601().withMessage("La date du paiement doit être au format ISO8601")
];

export default paiementRules;
