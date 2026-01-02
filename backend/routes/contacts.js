import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// POST create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        message: 'Name, email, and phone are required fields' 
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      message: message || ''
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

// PUT update contact
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully', contact: deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

export default router;
