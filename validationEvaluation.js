import { body } from 'express-validator';

const evaluationRules = [
    body('utilisateur_id')
        .notEmpty().withMessage("L'ID de l'utilisateur ne peut pas être vide")
        .isInt({ min: 1 }).withMessage("L'ID de l'utilisateur doit être un entier positif"),
    body('evenement_id')
        .notEmpty().withMessage("L'ID de l'événement ne peut pas être vide")
        .isInt({ min: 1 }).withMessage("L'ID de l'événement doit être un entier positif"),
    body('note')
        .notEmpty().withMessage("La note ne peut pas être vide")
        .isInt({ min: 0, max: 5 }).withMessage("La note doit être un entier entre 0 et 5"),
    body('date_evaluation')
        .optional()
        .isISO8601().withMessage("La date d'évaluation doit être au format ISO8601")
];

export default evaluationRules;
