import { body } from 'express-validator';

const billetRules = [
    body('evenement_id')
        .notEmpty().withMessage("L'identifiant de l'événement est requis")
        .isInt({ min: 1 }).withMessage("L'identifiant de l'événement doit être un entier positif"),
    body('prix')
        .notEmpty().withMessage("Le prix du billet est requis")
        .isDecimal({ decimal_digits: '1,2' }).withMessage("Le prix du billet doit être un nombre décimal avec deux chiffres après la virgule"),
    body('date_achat')
        .notEmpty().withMessage("La date d'achat du billet est requise")
        .isISO8601().withMessage("La date d'achat du billet doit être au format ISO8601")
];

export default billetRules;
