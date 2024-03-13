// Importations des modules installés
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
 
// Importation des fichiers de configuration et de contrôleurs
import dotenv from 'dotenv'
import { utilisateurList, utilisateurCreate, utilisateurDetail, utilisateurUpdate, utilisateurDelete } from './controllers/utilisateur.js'
import { roleList, roleCreate, roleDetail, roleUpdate, roleDelete } from './controllers/role.js'
import { paiementList, paiementCreate, paiementDetail, paiementUpdate, paiementDelete } from './controllers/paiement.js'
import { remboursementList, remboursementCreate, remboursementDetail, remboursementUpdate, remboursementDelete } from './controllers/remboursement.js'
import { commandeList, commandeCreate, commandeDetail, commandeUpdate, commandeDelete } from './controllers/commande.js'
import { billetList, billetCreate, billetDetail, billetUpdate, billetDelete } from './controllers/billet.js'
import { evenementList, evenementCreate, evenementDetail, evenementUpdate, evenementDelete } from './controllers/evenement.js'
import { evaluationList, evaluationCreate, evaluationDetail, evaluationUpdate, evaluationDelete } from './controllers/evaluation.js'
import { factureList,factureCreate,factureDelete,factureDetail,factureUpdate, } from './controllers/facture.js'

import { utilisateurLogin } from './Authentification/utilisateurLogin.js'
// Importez votre fichier de connexion à la base de données
import database from './config/connexion.js';

// Appelez la méthode sync() sur la connexion à la base de données
database.sync()
  .then(() => {
    console.log('Tables créées avec succès.');
  })
  .catch((err) => {
    console.error('Erreur lors de la création des tables :', err);
  });
 
// Accès au fichier .env
const env = dotenv.config().parsed
 
// Création de l'application
const app = express()
 
// Utilisations des modules importés dans l'application
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())

// Dans votre fichier server.js ou dans un fichier de routes dédié
app.post('/login', utilisateurLogin);



 
// Création des routes pour chaque modèle
app.get('/utilisateurs', utilisateurList);
app.post('/utilisateurs', utilisateurCreate);
app.get('/utilisateurs/:id', utilisateurDetail);
app.put('/utilisateurs/:id', utilisateurUpdate);
app.delete('/utilisateurs/:id', utilisateurDelete);
 
app.get('/roles', roleList);
app.post('/roles', roleCreate);
app.get('/roles/:id', roleDetail);
app.put('/roles/:id', roleUpdate);
app.delete('/roles/:id', roleDelete);
 
app.get('/paiements', paiementList);
app.post('/paiements', paiementCreate);
app.get('/paiements/:id', paiementDetail);
app.put('/paiements/:id', paiementUpdate);
app.delete('/paiements/:id', paiementDelete);
 
app.get('/remboursements', remboursementList);
app.post('/remboursements', remboursementCreate);
app.get('/remboursements/:id', remboursementDetail);
app.put('/remboursements/:id', remboursementUpdate);
app.delete('/remboursements/:id', remboursementDelete);
 
app.get('/commandes', commandeList);
app.post('/commandes', commandeCreate);
app.get('/commandes/:id', commandeDetail);
app.put('/commandes/:id', commandeUpdate);
app.delete('/commandes/:id', commandeDelete);
 
app.get('/billet', billetList);
app.post('/billet', billetCreate);
app.get('/billet/:id', billetDetail);
app.put('/billet/:id', billetUpdate);
app.delete('/billet/:id', billetDelete);
 
app.get('/evenements', evenementList);
app.post('/evenements', evenementCreate);
app.get('/evenements/:id', evenementDetail);
app.put('/evenements/:id', evenementUpdate);
app.delete('/evenements/:id', evenementDelete);
 
app.get('/evaluations', evaluationList);
app.post('/evaluations', evaluationCreate);
app.get('/evaluations/:id', evaluationDetail);
app.put('/evaluations/:id', evaluationUpdate);
app.delete('/evaluations/:id', evaluationDelete);

app.get('/factures', factureList);
app.post('/factures', factureCreate);
app.get('/factures/:id', factureDetail);
app.put('/factures/:id', factureUpdate);
app.delete('/factures/:id', factureDelete);
 
// Démarrage du serveur
const PORT = 8500
app.listen(PORT, () => console.log('Le serveur tourne sur le port ' + PORT))