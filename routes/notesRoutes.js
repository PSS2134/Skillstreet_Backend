const express = require('express');
const router=express.Router();
const {createNote,getAllNotes,getSingle,updateNote,deleteNote} =require('../controllers/noteController')
router.route('/create').post(createNote);
router.route('/').get(getAllNotes);
router.route('/:id').get(getSingle);
router.route('/update/:id').put(updateNote);
router.route('/delete/:id').delete(deleteNote);


module.exports=router;