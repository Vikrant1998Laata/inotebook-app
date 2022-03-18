const express = require('express');
const Notes = require('../models/Notes')
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
var fetchuser = require('../middleware/fetchuser');


// Route1: Get all Notes using Get:"/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({
        user: req.user.id
    })
    res.json(notes);
})


// Route2: Add Note using: Post "/api/auth/addnote", login required
router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({
            min: 3
        }),
        body('description', 'Description must be atleast 5 characters').isLength({
            min: 5
        })
    ],
    async (req, res) => {
        try {
            const {
                title,
                description,
                tag
            } = req.body
            const errors = validationResult(req);

            // If there are some error the return the error
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            });
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured")
        }
    })

// Route2: Updating notes using: Put "/api/auth/updatenote", login required 
// :id is the note id
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        const {
            title,
            description,
            tag
        } = req.body;

        // Create a new note object 
        const newNote = {};
        if (title) {
            newNote.title = title
        };
        if (description) {
            newNote.description = description
        };
        if (tag) {
            newNote.tag = tag
        };

        // Find the note to be updated and update it;
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Note not found")
        };

        // Allow updation only if user owns this note;
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // Updating the note
        note = await Notes.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {
            new: true
        })
        res.json({
            note
        });
    })


// Route3: Deleting notes using: Delete "/api/auth/deletenote", login required 
// :id is the note id
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        // Find the note to be Deleted and delete it;
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Note not found")
        };

        // Allow deletion only if user owns this note;
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // Delteting the note
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({
            "Success": "Note has been deleted",
            note: note
        });
    })

module.exports = router;