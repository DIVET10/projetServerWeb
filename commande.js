import { validationResult } from 'express-validator';
import Commande from "../models/Commande.js";
import commandeRules from '../validations/validationCommande.js'; // Importe les règles de validation

export const commandeCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(commandeRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newCommande = await Commande.create(req.body);
        res.status(201).json({ data: newCommande });
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la création de la commande" });
    }
};

export const commandeList = async (req, res) => {
    try {
        const commandes = await Commande.findAll();
        res.status(200).json({ data: commandes });
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
};

export const commandeDetail = async (req, res) => {
    try {
        const commandeId = req.params.id;
        const commande = await Commande.findByPk(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ data: commande });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail de la commande" });
    }
};

export const commandeUpdate = async (req, res) => {
    try {
        const commandeId = req.params.id;
        const commande = await Commande.findByPk(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        await commande.update(req.body);
        res.status(200).json({ message: "Commande mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la commande" });
    }
};

export const commandeDelete = async (req, res) => {
    try {
        const commandeId = req.params.id;
        const commande = await Commande.findByPk(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        await commande.destroy();
        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la commande" });
    }
};
