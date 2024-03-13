import { validationResult } from 'express-validator';
import Role from "../models/Role.js";
import roleRules from '../validations/validationRole.js';// Importe les règles de validation

export const roleCreate = async (req, res) => {
    // Valide les données de la requête avec les règles définies
    await Promise.all(roleRules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newRole = await Role.create(req.body);
        res.status(201).json({ data: newRole });
    } catch (error) {
        console.error("Erreur lors de la création du rôle :", error);
        res.status(500).json({ message: "Erreur lors de la création du rôle" });
    }
};

export const roleList = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ data: roles });
    } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des rôles" });
    }
};

export const roleDetail = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        res.status(200).json({ data: role });
    } catch (error) {
        console.error("Erreur lors de la récupération du détail du rôle :", error);
        res.status(500).json({ message: "Erreur lors de la récupération du détail du rôle" });
    }
};

export const roleUpdate = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        await role.update(req.body);
        res.status(200).json({ message: "Rôle mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du rôle :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du rôle" });
    }
};

export const roleDelete = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        await role.destroy();
        res.status(200).json({ message: "Rôle supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du rôle :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du rôle" });
    }
};
