import { body } from "express-validator";

const nameRegex = /^[a-zA-Z\s-']+$/; // Regex pour le nom et prénom
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour l'email

const utilisateurRules = [
    body('nom').matches(nameRegex).withMessage("Le nom n'est pas conforme"),
    body('email').exists().withMessage('Email obligatoire').isEmail().withMessage("Ce n'est pas un email valide").matches(emailRegex).withMessage("Ce n'est pas un email valide"),
    body('mot_de_passe').isString()
        .isLength({ min: 8 }).withMessage('Au moins 8 caractères')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/).withMessage('Doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'),
    body('role_id').optional().isInt({ min: 1 }).withMessage("L'ID du rôle doit être un entier positif")
];

export default utilisateurRules;
