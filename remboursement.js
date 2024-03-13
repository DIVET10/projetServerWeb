import { validationResult } from 'express-validator';
import Remboursement from "../models/Remboursement.js";
import remboursementRules from '../validations/validationRemboursement.js'; // Importe les règles de validation

export const remboursementCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(remboursementRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newRemboursement = await Remboursement.create(req.body);
        res.status(201).json({ data: newRemboursement });
    } catch (error) {
        console.error("Erreur lors de la création du remboursement :", error);
        res.status(500).json({ message: "Erreur lors de la création du remboursement" });
    }
};

export const remboursementList = async (req, res) => {
    try {
        const remboursements = await Remboursement.findAll();
        res.status(200).json({ data: remboursements });
    } catch (error) {
        console.error("Erreur lors de la récupération des remboursements :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des remboursements" });
    }
};

export const remboursementDetail = async (req, res) => {
    try {
        const remboursementId = req.params.id;
        const remboursement = await Remboursement.findByPk(remboursementId);
        if (!remboursement) {
            return res.status(404).json({ message: "Remboursement non trouvé" });
        }
        res.status(200).json({ data: remboursement });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail du remboursement :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail du remboursement" });
    }
};

export const remboursementUpdate = async (req, res) => {
    try {
        const remboursementId = req.params.id;
        const remboursement = await Remboursement.findByPk(remboursementId);
        if (!remboursement) {
            return res.status(404).json({ message: "Remboursement non trouvé" });
        }
        await remboursement.update(req.body);
        res.status(200).json({ message: "Remboursement mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du remboursement :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du remboursement" });
    }
};

export const remboursementDelete = async (req, res) => {
    try {
        const remboursementId = req.params.id;
        const remboursement = await Remboursement.findByPk(remboursementId);
        if (!remboursement) {
            return res.status(404).json({ message: "Remboursement non trouvé" });
        }
        await remboursement.destroy();
        res.status(200).json({ message: "Remboursement supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du remboursement :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du remboursement" });
    }
};
