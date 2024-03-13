import { body } from 'express-validator';

const remboursementRules = [
    body('paiement_id')
        .notEmpty().withMessage("L'identifiant du paiement ne peut pas être vide")
        .isInt({ min: 1 }).withMessage("L'identifiant du paiement doit être un entier positif"),
    body('montant_rembourse')
        .notEmpty().withMessage("Le montant du remboursement ne peut pas être vide")
        .isDecimal({ decimal_digits: '1,2' }).withMessage("Le montant du remboursement doit être un nombre décimal"),
    body('date_remboursement')
        .notEmpty().withMessage("La date du remboursement ne peut pas être vide")
        .isISO8601().withMessage("La date du remboursement doit être au format ISO8601")
];

export default remboursementRules;
