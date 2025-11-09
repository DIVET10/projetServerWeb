import { validationResult } from 'express-validator';
import Evaluation from "../models/Evaluation.js";
import evaluationRules from '../validations/validationEvaluation.js'; // Importe les règles de validation

export const evaluationCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(evaluationRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newEvaluation = await Evaluation.create(req.body);
        res.status(201).json({ data: newEvaluation });
    } catch (error) {
        console.error("Erreur lors de la création de l'évaluation :", error);
        res.status(500).json({ message: "Erreur lors de la création de l'évaluation" });
    }
};

export const evaluationList = async (req, res) => {
    try {
        const evaluations = await Evaluation.findAll();
        res.status(200).json({ data: evaluations });
    } catch (error) {
        console.error("Erreur lors de la récupération des évaluations :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des évaluations" });
    }
};

export const evaluationDetail = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const evaluation = await Evaluation.findByPk(evaluationId);
        if (!evaluation) {
            return res.status(404).json({ message: "Évaluation non trouvée" });
        }
        res.status(200).json({ data: evaluation });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail de l'évaluation :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail de l'évaluation" });
    }
};

export const evaluationUpdate = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const evaluation = await Evaluation.findByPk(evaluationId);
        if (!evaluation) {
            return res.status(404).json({ message: "Évaluation non trouvée" });
        }
        await evaluation.update(req.body);
        res.status(200).json({ message: "Évaluation mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'évaluation :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'évaluation" });
    }
};

export const evaluationDelete = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const evaluation = await Evaluation.findByPk(evaluationId);
        if (!evaluation) {
            return res.status(404).json({ message: "Évaluation non trouvée" });
        }
        await evaluation.destroy();
        res.status(200).json({ message: "Évaluation supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'évaluation :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'évaluation" });
    }
};
