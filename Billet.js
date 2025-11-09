import { validationResult } from 'express-validator';
import Billet from "../models/Billet.js";
import billetRules from '../validations/validationBillet.js'; // Importe les règles de validation

export const billetCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(billetRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newBillet = await Billet.create(req.body);
        res.status(201).json({ data: newBillet });
    } catch (error) {
        console.error("Erreur lors de la création du billet :", error);
        res.status(500).json({ message: "Erreur lors de la création du billet" });
    }
};

export const billetList = async (req, res) => {
    try {
        const billets = await Billet.findAll();
        res.status(200).json({ data: billets });
    } catch (error) {
        console.error("Erreur lors de la récupération des billets :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des billets" });
    }
};

export const billetDetail = async (req, res) => {
    try {
        const billetId = req.params.id;
        const billet = await Billet.findByPk(billetId);
        if (!billet) {
            return res.status(404).json({ message: "Billet non trouvé" });
        }
        res.status(200).json({ data: billet });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail du billet :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail du billet" });
    }
};

export const billetUpdate = async (req, res) => {
    try {
        const billetId = req.params.id;
        const billet = await Billet.findByPk(billetId);
        if (!billet) {
            return res.status(404).json({ message: "Billet non trouvé" });
        }
        await billet.update(req.body);
        res.status(200).json({ message: "Billet mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du billet :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du billet" });
    }
};

export const billetDelete = async (req, res) => {
    try {
        const billetId = req.params.id;
        const billet = await Billet.findByPk(billetId);
        if (!billet) {
            return res.status(404).json({ message: "Billet non trouvé" });
        }
        await billet.destroy();
        res.status(200).json({ message: "Billet supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du billet :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du billet" });
    }
};
