import { validationResult } from 'express-validator';
import Evenement from "../models/Evenements.js";
import evenementRules from '../validations/validationEvenement.js'; // Importe les règles de validation

export const evenementCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(evenementRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newEvenement = await Evenement.create(req.body);
        res.status(201).json({ data: newEvenement });
    } catch (error) {
        console.error("Erreur lors de la création de l'événement :", error);
        res.status(500).json({ message: "Erreur lors de la création de l'événement" });
    }
};

export const evenementList = async (req, res) => {
    try {
        const evenements = await Evenement.findAll();
        res.status(200).json({ data: evenements });
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des événements" });
    }
};

export const evenementDetail = async (req, res) => {
    try {
        const evenementId = req.params.id;
        const evenement = await Evenement.findByPk(evenementId);
        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }
        res.status(200).json({ data: evenement });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail de l'événement :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail de l'événement" });
    }
};

export const evenementUpdate = async (req, res) => {
    try {
        const evenementId = req.params.id;
        const evenement = await Evenement.findByPk(evenementId);
        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }
        await evenement.update(req.body);
        res.status(200).json({ message: "Événement mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement" });
    }
};

export const evenementDelete = async (req, res) => {
    try {
        const evenementId = req.params.id;
        const evenement = await Evenement.findByPk(evenementId);
        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }
        await evenement.destroy();
        res.status(200).json({ message: "Événement supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'événement" });
    }
};
