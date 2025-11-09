import { validationResult } from 'express-validator';
import Facture from "../models/Facture.js";
import factureRules from '../validations/validationFacture.js'; // Importe les règles de validation

export const factureCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(factureRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newFacture = await Facture.create(req.body);
        res.status(201).json({ data: newFacture });
    } catch (error) {
        console.error("Erreur lors de la création de la facture :", error);
        res.status(500).json({ message: "Erreur lors de la création de la facture" });
    }
};

export const factureList = async (req, res) => {
    try {
        const factures = await Facture.findAll();
        res.status(200).json({ data: factures });
    } catch (error) {
        console.error("Erreur lors de la récupération des factures :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des factures" });
    }
};

export const factureDetail = async (req, res) => {
    try {
        const factureId = req.params.id;
        const facture = await Facture.findByPk(factureId);
        if (!facture) {
            return res.status(404).json({ message: "Facture non trouvée" });
        }
        res.status(200).json({ data: facture });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail de la facture :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail de la facture" });
    }
};

export const factureUpdate = async (req, res) => {
    try {
        const factureId = req.params.id;
        const facture = await Facture.findByPk(factureId);
        if (!facture) {
            return res.status(404).json({ message: "Facture non trouvée" });
        }
        await facture.update(req.body);
        res.status(200).json({ message: "Facture mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la facture :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la facture" });
    }
};

export const factureDelete = async (req, res) => {
    try {
        const factureId = req.params.id;
        const facture = await Facture.findByPk(factureId);
        if (!facture) {
            return res.status(404).json({ message: "Facture non trouvée" });
        }
        await facture.destroy();
        res.status(200).json({ message: "Facture supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la facture :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la facture" });
    }
};
