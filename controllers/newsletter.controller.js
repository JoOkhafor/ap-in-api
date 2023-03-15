const NewsletterModel = require("../models/newsletter.model");

/**
|--------------------------------------------------
| newsletter register
|--------------------------------------------------
*/

register = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await NewsletterModel.findOne({ email });

        if (user) {
            return res.status(401).send({ message: "Email already exits" });
        }

        const newUser = new NewsletterModel({ email });
        const response = await newUser.save();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

/**
|--------------------------------------------------
| newsletter geting all emails
|--------------------------------------------------
*/

getAllNewsletters = async (req, res) => {
    try {
        const newsletters = await NewsletterModel.find();
        res.status(200).send(newsletters);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

/**
|--------------------------------------------------
| newsletter deleting one email
|--------------------------------------------------
*/

deleteEmail = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleted = await NewsletterModel.deleteOne({ _id });
        if (!deleted || !deleted.deletedCount) {
            return res.status(400).send({ message: "Not Found" });
        }
        res.status(200).send({ ...deleted, message: "deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

/**
|--------------------------------------------------
| newsletter delete many emails
|--------------------------------------------------
*/

deleteMany = async (req, res) => {
    const items = req.body;
    try {
        items?.map(async (_id, item) => {
            const deleted = await NewsletterModel.deleteOne({ _id });
            if (!deleted) {
                return res
                    .status(400)
                    .send({ message: "Something went wrong !!!" });
            }
        });
        res.status(200).send({ message: "deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

/**
|--------------------------------------------------
| newsletter delete one emails
|--------------------------------------------------
*/

updateEmail = async (req, res) => {
    const _id = req.params.id;
    const newEmail = req.body.email;
    try {
        const email = await NewsletterModel.findByIdAndUpdate(_id, {
            email: newEmail,
        });
        if (!email) {
            return res
                .status(400)
                .send({ message: "Something went wrong !!!" });
        }
        res.json(email);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

/**
|--------------------------------------------------
| exporting controllers
|--------------------------------------------------
*/

module.exports = {
    register,
    getAllNewsletters,
    deleteEmail,
    deleteMany,
    updateEmail,
};
