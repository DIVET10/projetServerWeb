import { validationResult } from 'express-validator';
import Paiement from "../models/Paiement.js";
import paiementRules from '../validations/validationPaiement.js'; // Importe les règles de validation

export const paiementCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(paiementRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPaiement = await Paiement.create(req.body);
        res.status(201).json({ data: newPaiement });
    } catch (error) {
        console.error("Erreur lors de la création du paiement :", error);
        res.status(500).json({ message: "Erreur lors de la création du paiement" });
    }
};

export const paiementList = async (req, res) => {
    try {
        const paiements = await Paiement.findAll();
        res.status(200).json({ data: paiements });
    } catch (error) {
        console.error("Erreur lors de la récupération des paiements :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des paiements" });
    }
};

export const paiementDetail = async (req, res) => {
    try {
        const paiementId = req.params.id;
        const paiement = await Paiement.findByPk(paiementId);
        if (!paiement) {
            return res.status(404).json({ message: "Paiement non trouvé" });
        }
        res.status(200).json({ data: paiement });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail du paiement :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail du paiement" });
    }
};

export const paiementUpdate = async (req, res) => {
    try {
        const paiementId = req.params.id;
        const paiement = await Paiement.findByPk(paiementId);
        if (!paiement) {
            return res.status(404).json({ message: "Paiement non trouvé" });
        }
        await paiement.update(req.body);
        res.status(200).json({ message: "Paiement mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du paiement :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du paiement" });
    }
};

export const paiementDelete = async (req, res) => {
    try {
        const paiementId = req.params.id;
        const paiement = await Paiement.findByPk(paiementId);
        if (!paiement) {
            return res.status(404).json({ message: "Paiement non trouvé" });
        }
        await paiement.destroy();
        res.status(200).json({ message: "Paiement supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du paiement :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du paiement" });
    }
};
