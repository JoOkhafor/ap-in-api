const Quotes = require("../models/quote.model");
const Visitor = require("../models/visitor.model");
const { incrementVisitorCount } = require("./visitor.controller");

/**
|--------------------------------------------------
| Function to register a new quote request
|--------------------------------------------------
*/
const registerQuote = async (req, res) => {
    const {
        email,
        fullname,
        location,
        company_name,
        phone_number,
        service,
        description,
    } = req.body;
    const now = new Date().toISOString();
    const [year, month] = now.split("-");
    const page = 'quote'
    try {
        const isResgistered = await Quotes.findOne({ email });
        if (isResgistered)
            return res.status(402).json({
                message: "Cet Email existe déjà dans note base de données!!",
            });
        const newQuote = new Quotes({
            email,
            fullname,
            location,
            company_name,
            phone_number,
            service,
            description,
        });
        await newQuote.save();
        const item = await Visitor.findOne({ page, year, month });
        if (!item) {
          await Visitor.create({ page, year, month, number: 1 });
        } else if (item) {
          await Visitor.updateOne(
            { _id: item?._id },
            { $set: { number: parseInt(item?.number) + 1 } }
          );
        }
        res.status(200).send({ message: "Registered successfully!!" });
    } catch (error) {
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

/**
|--------------------------------------------------
| Function to delete One quote
|--------------------------------------------------
*/

const deleteOneQuote = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Bad request" });
    try {
        const quote = await Quotes.deleteOne({ _id: id });
        if (!quote || !quote.deletedCount) {
            return res.status(404).send({ message: "Not Found" });
        }
        res.status(200).send({
            message: "Deleted successfully!!",
            ...quote,
        });
    } catch (error) {
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

/**
|--------------------------------------------------
| Function to get one quote
|--------------------------------------------------
*/

const getOneQuote = async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.status(400).send({ message: "Bad request" });
    try {
        const quote = await Quotes.findOne({ _id });
        if (!quote)
            return res.status(405).json({
                message: "Les données demandées n'existent pas!!",
            });
        res.status(200).send(quote);
    } catch (error) {
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

/**
|--------------------------------------------------
| Fonction to get all quotes
|--------------------------------------------------
*/
const getQuotes = async (req, res) => {
    try {
        const quote = await Quotes.find();
        if (!quote)
            return res.status(405).json({
                message: "Les données demandées n'existent pas!!",
            });
        res.status(200).send(quote);
    } catch (error) {
        res.status(500).send({ error: "Une erreur est survenue" });
    }
};

module.exports = {
    getOneQuote,
    getQuotes,
    deleteOneQuote,
    registerQuote,
};
