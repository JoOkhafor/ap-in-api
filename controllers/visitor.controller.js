const Visitor = require("../models/visitor.model");

const incrementVisitorCount = async (req, res) => {
    const category = req.params.category;

    try {
        // Recherche du visiteur pour la catégorie donnée
        let visitor = await Visitor.findOne({ category });

        // Si le visiteur n'existe pas encore, on le crée avec un compteur initialisé à 1
        if (!visitor) {
            visitor = new Visitor({ category });
        }

        // Incrémentation du compteur et sauvegarde dans la base de données
        visitor.count++;
        visitor = await visitor.save();

        // Envoi de la réponse au client
        res.send({ ...visitor, success: true });
    } catch (err) {
        // En cas d'erreur, on renvoie une erreur 500 (erreur serveur)
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

const getVisitorsNumber = async (req, res) => {
    const category = req.params.category;

    try {
        // Récupération du nombre de visiteurs actuel pour la catégorie donnée
        const visitor = await Visitor.findOne({ category });

        // Envoi du nombre de visiteurs au client
        res.send(visitor);
    } catch (err) {
        // En cas d'erreur, on renvoie une erreur 500 (erreur serveur)
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

const getAll = async (req, res) => {
    try {
        // Récupération du nombre de visiteurs actuel pour toutes les catégories
        const visitors = await Visitor.find();

        // Envoi du nombre de visiteurs au client
        res.send(visitors);
    } catch (err) {
        // En cas d'erreur, on renvoie une erreur 500 (erreur serveur)
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

module.exports = { incrementVisitorCount, getVisitorsNumber, getAll };
