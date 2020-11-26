const express = require('express');
const Contact = require('../../models/Contact');
const Attribute = require('../../models/Attribute');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });



const router = express.Router();

// Get contact list
router.get('/', (req, res) => {
    Contact.find().populate('attributes').then(data => {
        return res.status(200).json(data);
    });
});

// Add contact
router.post('/add-contact', async (req, res) => {
    const { name, phone, email, imgUrl } = req.body;
    const contact = new Contact({ imgUrl });

    const savedContact = await contact.save();

    const newAttribute1 = new Attribute({
        attribut: 'name',
        value: name,
        contactId: savedContact._id
    });
    const newAttribute2 = new Attribute({
        attribut: 'phone',
        value: phone,
        contactId: savedContact._id
    });
    const newAttribute3 = new Attribute({
        attribut: 'email',
        value: email,
        contactId: savedContact._id
    });

    savedAttribute = await Attribute.insertMany([
        newAttribute1, newAttribute2, newAttribute3
    ]);
    savedContact.attributes.push(newAttribute1, newAttribute2, newAttribute3);

    await savedContact.save();
    res.status(201).json(savedContact);

});

// Add atributes
router.post('/add-attribute', async (req, res) => {
    const { attribut, value, id } = req.body;

    const newAttribute = new Attribute({
        attribut,
        value,
        contactId: id
    });
    await newAttribute.save();
    const currentContact = await Contact.findById(id);
    currentContact.attributes.push(newAttribute);

    await currentContact.save().then(result => {
        return res.status(201).json(newAttribute);
    });
});

// Delete atributes
router.delete('/delete-attribute/:id', async (req, res) => {
    const currentAttribute = await Attribute.findByIdAndDelete({ _id: req.params.id }).then(deletedAttribute => {
        return res.status(201).json(deletedAttribute);
    });
});

// Update atribute
router.put('/update-attribute', async (req, res) => {
    console.log(req.body);
    const { attribut, value, id } = req.body;
    const updateAttribute = Attribute.findByIdAndUpdate({ _id: id }, { attribut, value }).then(updatedAttribute => {
        return res.status(201).json(updatedAttribute);
    });

});

// Add img
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
});


// Delete contact 
router.delete('/delete-contact/:id', async (req, res) => {
    Contact.findByIdAndDelete({ _id: req.params.id }).then(deletedContact => {
        Attribute.remove({ contactId: req.params.id }).then(deletedAttribute => {
            // if (fs.existsSync(`${__dirname}/../../public/img/${deletedContact.imgUrl}`)) {
            //     fs.unlinkSync(`${__dirname}/../../public/img/${deletedContact.imgUrl}`);
            // }
        });
        res.status(200);
    }
    ).catch(err => console.log(err));
});



module.exports = router;

