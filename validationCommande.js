import { body } from 'express-validator';

const commandeRules = [
    body('utilisateur_id')
        .notEmpty().withMessage("L'identifiant de l'utilisateur est requis")
        .isInt({ min: 1 }).withMessage("L'identifiant de l'utilisateur doit être un entier positif"),
    body('montant_total')
        .notEmpty().withMessage("Le montant total de la commande est requis")
        .isDecimal({ decimal_digits: '1,2' }).withMessage("Le montant total de la commande doit être un nombre décimal avec deux chiffres après la virgule"),
    body('date_commande')
        .notEmpty().withMessage("La date de la commande est requise")
        .isISO8601().withMessage("La date de la commande doit être au format ISO8601")
];

export default commandeRules;
