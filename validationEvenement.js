import { body } from 'express-validator';

const evenementRules = [
    body('nom')
        .notEmpty().withMessage("Le nom de l'événement ne peut pas être vide")
        .isString().withMessage("Le nom de l'événement doit être une chaîne de caractères"),
    body('date_evenement')
        .notEmpty().withMessage("La date de l'événement ne peut pas être vide")
        .isISO8601().withMessage("La date de l'événement doit être au format ISO8601"),
    body('heure_evenement')
        .optional()
        .isISO8601().withMessage("L'heure de l'événement doit être au format ISO8601"),
    body('description')
        .optional()
        .isString().withMessage("La description de l'événement doit être une chaîne de caractères"),
    body('lieu_nom')
        .optional()
        .isString().withMessage("Le nom du lieu de l'événement doit être une chaîne de caractères"),
    body('lieu_adresse')
        .optional()
        .isString().withMessage("L'adresse du lieu de l'événement doit être une chaîne de caractères")
];

export default evenementRules;
