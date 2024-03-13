// Importation de tous les modèles
import Utilisateur from "./Utilisateur.js";
import Role from "./Role.js";
import Evenement from "./Evenements.js";
import Billet from "./Billet.js";
import Evaluation from "./Evaluation.js";
import Paiement from "./Paiement.js";
import Facture from "./Facture.js";
import Remboursement from "./Remboursement.js";
import Commande from "./Commande.js";

// Définition des relations entre les modèles

// Un utilisateur appartient à un seul rôle
Utilisateur.belongsTo(Role);

// Un rôle peut être attribué à plusieurs utilisateurs
Role.hasMany(Utilisateur);

// Un événement peut avoir plusieurs billets à vendre
Evenement.hasMany(Billet);

// Un billet est associé à un seul événement
Billet.belongsTo(Evenement);

// Un utilisateur peut laisser plusieurs évaluations sur différents événements
Utilisateur.hasMany(Evaluation);

// Une évaluation est laissée par un seul utilisateur
Evaluation.belongsTo(Utilisateur);

// Un utilisateur peut effectuer plusieurs paiements pour acheter des billets
Utilisateur.hasMany(Paiement);

// Un paiement est réalisé par un seul utilisateur
Paiement.belongsTo(Utilisateur);

// Un paiement est associé à une seule facture
Paiement.hasOne(Facture);

// Une facture peut être liée à plusieurs paiements
Facture.belongsTo(Paiement);

// Un paiement peut avoir plusieurs remboursements (en cas d'annulation ou de remboursement partiel)
Paiement.hasMany(Remboursement);

// Un remboursement est associé à un seul paiement
Remboursement.belongsTo(Paiement);

// Un utilisateur peut passer plusieurs commandes pour acheter des billets
Utilisateur.hasMany(Commande);

// Une commande est effectuée par un seul utilisateur
Commande.belongsTo(Utilisateur);

// Export des modèles
export {
    Utilisateur,
    Role,
    Evenement,
    Billet,
    Evaluation,
    Paiement,
    Facture,
    Remboursement,
    Commande
};
