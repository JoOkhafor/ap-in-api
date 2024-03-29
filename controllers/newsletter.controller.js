const NewsletterModel = require("../models/newsletter.model");
const Visitor = require("../models/visitor.model");
const fs = require("fs");
const json2xls = require("json2xls");
const filename = "emails.xlsx";

/**
|--------------------------------------------------
| newsletter register
|--------------------------------------------------
*/

const register = async (req, res) => {
  const email = req.body.email;
  const now = new Date().toISOString();
  const [year, month] = now.split("-");
  const page = "news";
  try {
    const user = await NewsletterModel.findOne({ email });
    if (user) {
      return res.status(401).send({ message: "Email already exits" });
    }
    const newSubscriber = await NewsletterModel.create({ email });
    const item = await Visitor.findOne({ page, year, month });
    if (!item) {
      await Visitor.create({ page, year, month, number: 1 });
    } else if (item) {
      await Visitor.updateOne(
        { _id: item?._id },
        { $set: { number: parseInt(item?.number) + 1 } }
      );
    }
    res.status(200).send(newSubscriber);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

/**
|--------------------------------------------------
| newsletter geting all emails
|--------------------------------------------------
*/

const getAllNewsletters = async (req, res) => {
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

const deleteEmail = async (req, res) => {
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

const deleteMany = async (req, res) => {
  const items = req.body;
  try {
    items?.map(async (_id, item) => {
      const deleted = await NewsletterModel.deleteOne({ _id });
      if (!deleted) {
        return res.status(400).send({ message: "Something went wrong !!!" });
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

const updateEmail = async (req, res) => {
  const _id = req.params.id;
  const newEmail = req.body.email;
  try {
    const email = await NewsletterModel.findByIdAndUpdate(_id, {
      email: newEmail,
    });
    if (!email) {
      return res.status(400).send({ message: "Something went wrong !!!" });
    }
    res.json(email);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

/**
 * Exporting emails to sexcel file
 */

const exportToXls = async (req, res) => {
  try {
    const emails = await NewsletterModel.find(
      {},
      { updatedAt: 0, _id: 0, __v: 0 }
    );

    // emails & creation datas
    let eData = emails.map((e, i) => {
      return [e.email, e.createdAt];
    });

    let data = [["Emails", "created At"], ...eData];

    const xls = json2xls(data, {});

    fs.writeFileSync(filename, xls, "binary", (err) => {
      if (err) {
        console.log("writeFileSync :", err);
      }
      console.log(filename + " file is saved!");
    });
    res
      .set({
        Headers: {
          "Content-Type": "document/xlsx",
        },
      })
      .download(`${filename}`);
  } catch (error) {
    res.status(500).send("Something went wrong");
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
  exportToXls,
};
