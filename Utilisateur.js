import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Utilisateur from "../models/Utilisateur.js";
import utilisateurRules from '../validations/validationUtilisateur.js';

export const utilisateurCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(utilisateurRules.map(rule => rule.run(req)));

    // Vérifie s'il y a des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Récupère les données de la requête
    const { nom, email, mot_de_passe, role_id } = req.body;

    try {
        // Hash du mot de passe
        const mdpHache = await bcrypt.hash(mot_de_passe, 10);

        // Création de l'utilisateur dans la base de données
        const utilisateur = await Utilisateur.create({
            nom: nom,
            email: email,
            mot_de_passe: mdpHache,
            role_id: role_id
        });

        // Réponse en cas de succès
        res.status(201).json({ data: utilisateur });
    } catch (error) {
        // Réponse en cas d'erreur
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
    }
};
export const utilisateurList = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll();
        res.status(200).json({ data: utilisateurs });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};

export const utilisateurDetail = async (req, res) => {
    try {
        const utilisateurId = req.params.id;
        const utilisateur = await Utilisateur.findByPk(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ data: utilisateur });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail de l'utilisateur" });
    }
};

export const utilisateurUpdate = async (req, res) => {
    try {
        const utilisateurId = req.params.id;
        const utilisateur = await Utilisateur.findByPk(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        await utilisateur.update(req.body);
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

export const utilisateurDelete = async (req, res) => {
    try {
        const utilisateurId = req.params.id;
        const utilisateur = await Utilisateur.findByPk(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        await utilisateur.destroy();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};
