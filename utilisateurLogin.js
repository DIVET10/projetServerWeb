import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js'; // Assurez-vous d'importer votre modèle Utilisateur

export const utilisateurLogin = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        // Recherche l'utilisateur par son email
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifie si le mot de passe est correct
        const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

        if (!motDePasseValide) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Si les informations d'identification sont valides, générez un JWT
        const token = jwt.sign(
            { userId: utilisateur.utilisateur_id, email: utilisateur.email }, // Payload du JWT
            process.env.JWT_SECRET, // Clé secrète utilisée pour signer le JWT
            { expiresIn: '1h' } // Options, ici nous définissons une expiration d'une heure
        );

        // Renvoie le JWT dans la réponse
        res.status(200).json({ message: "Authentification réussie", token });
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        res.status(500).json({ message: "Erreur lors de l'authentification" });
    }
};
