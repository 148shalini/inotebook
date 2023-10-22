
const express = require('express');
const router = express.Router();
var fetchusers = require('../middleware/fetchusers');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//ROUTE1 :-get all the notes using GET "/api/auth/getuser". login req
router.get('/fetchallnotes', fetchusers, async (req, res) => {
    try {

        const notes = await Notes.find({ users: req.users.id })

        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send(" internal server eror");
    }


})
//ROUTE2 :-get all the notes using POSt "/api/notes/addnotes". login req
router.post('/addnotes', fetchusers, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must in 5 character').isLength({ min: 5 }),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        //ifv error return bad req and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, users: req.users.id

        })
        const savedNotes = await notes.save()

        res.json(savedNotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send(" internal server eror");
    }

})
// route3-update an existing note using PUT"/api/notes/updatenote".login required
router.put('/updatenotes/:id', fetchusers,  async (req, res) => {
    const {title,description,tag}=req.body;
    try {
        
        //create new newNote object
        const newNotes={};
        if(title){newNotes.title=title};
        if(description){newNotes.description=description};
        if(tag){newNotes.tag=tag};
        //find the notes to be updated and update it
        let notes=await Notes.findById(req.params.id);
        if(!notes){res.status(404).send("not found")}
        if(notes.users.toString()!==req.users.id){
            return res.status(401).send("not Allowed");
        }
        notes=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
        res.json({notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send(" internal server eror");
        
    }

})
// route4-delete an existing note using DELETE"/api/notes/deletenote".login required
router.delete('/deletenotes/:id', fetchusers,  async (req, res) => {
    
    try {
        
        //find the notes to be deleted and deleted it
        let notes=await Notes.findById(req.params.id);
        if(!notes){res.status(404).send("not found")}
        //Alow deletion only if users own this notes
        if(notes.users.toString()!==req.users.id){
            return res.status(401).send("not Allowed");
        }
        notes=await Notes.findByIdAndDelete(req.params.id)
        res.json({"succes":"notes deleted",notes:notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send(" internal server eror");
        
    }

})
module.exports = router