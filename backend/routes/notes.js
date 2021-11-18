const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// ROUTE 1: Fetch all the notes: GET "/api/notes/fetchallnotes" . Login Required

router.get('/fetchallnotes' , fetchUser, async (req, res)=>{
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 2: Add a new note: POST"/api/notes/addnote" . Login Required
router.post('/addnote' , fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//ROUTE 3: Update an existing note: PUT"/api/notes/updatenote" . Login Required
router.put('/updatenote/:id' , fetchUser, async (req, res)=>{
    //If there are errors, return bad request and the errors

    const {title, description, tag} = req.body;
    
    const newNote= {};
    if(title){newNote.title= title};
    if(description){newNote.description= description};
    if(tag){newNote.tag= tag};

    //FInd the note to be updated 
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Notes with the given ID not found")
    }
    if(note.user.toString()!== req.user.id){
        return res.status(404).send("Notes with the given id not found")
        
    }
     note = await  Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
     res.json({note});


})

//ROUTE 4: Delete existing note: DELETE "/api/notes/deletenote" . Login Required
router.delete('/deletenote/:id' , fetchUser, async (req, res)=>{
    //If there are errors, return bad request and the errors

    //FInd the note to be deleted
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Notes with the given ID not found")
    }


    //Allow deletion only if user owns the note
    if(note.user.toString()!== req.user.id){
        return res.status(404).send("Notes with the given id not found")
        
    }
     note = await  Notes.findByIdAndDelete(req.params.id);
     res.json({"Success" : "Note has been deleted", note});


})

module.exports= router