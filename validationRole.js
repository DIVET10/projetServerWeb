import { body } from 'express-validator';

const roleRules = [
    body('nom_role')
        .notEmpty().withMessage("Le nom du rôle ne peut pas être vide")
        .isString().withMessage("Le nom du rôle doit être une chaîne de caractères")
        .custom(value => {
            // Vérifie si la valeur du rôle est soit 'client' soit 'organisateur'
            if (value !== 'client' && value !== 'organisateur') {
                throw new Error("Le nom du rôle doit être soit 'client' soit 'organisateur'");
            }
            return true;
        }),
    body('nom_role')
        .isLength({ max: 50 }).withMessage("Le nom du rôle ne peut pas dépasser 50 caractères")
];

export default roleRules;
