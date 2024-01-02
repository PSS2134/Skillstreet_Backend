const Notes = require("../model/notesModel");

const handleErrors=(err)=>{
    
    let errors={ apiSuccess:false,user:"No error" ,title:"No error",body:"No error"}
    if(err.message.includes('Note validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}

exports.createNote = async (req, res) => {
  try {
    const user = req.query.user;
    const { title, body } = req.body;

    const note = new Notes({ user, title, body });
    await note.save();
    return res
      .status(200)
      .json({ apiSuccess: true, message: `New Note Created successfully ${note}` });
  } catch (err) {
    console.log(err);
    const errors=handleErrors(err);
    return res.status(400).json(errors);
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const user = req.query.user;
    if(!user)
    {
        return res.status(400).json({apiSuccess: false, user:"Please Provide emailId"});
    }
    const allNotes = await Notes.find({ user: user });
    if (!allNotes[0]) {
      return res.status(400).json({
        apiSuccess: true,
        message: `No notes found for the user: ${user}`,
      });
    }
    return res.status(200).json({ apiSuccess: true, message: allNotes });
  } catch (err) {
    console.log(err);
    const errors=handleErrors(err);
    return res.status(400).json(errors);
  }
};

exports.getSingle = async (req, res) => {
  try {
    const user=req.query.user;
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res
        .status(400)
        .json({ apiSuccess: false, message: `Please provide valid id` });
    }
    const single = await Notes.findById(id);
    if (!single) {
      return res
        .status(400)
        .json({ apiSuccess: true, message: `No note found with id: ${user}` });
    }
    return res.status(200).json({ apiSuccess: true, message: single });
  } catch (err) {
    console.log(err);
    const errors=handleErrors(err);
    return res.status(400).json(errors);
  }
};
exports.updateNote = async (req, res) => {
  try {
    const user=req.query.user;
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res
        .status(400)
        .json({ apiSuccess: false, message: `Please provide valid id` });
    }
    const single = await Notes.findById(id);
    if (!single) {
      return res
        .status(400)
        .json({ apiSuccess: true, message: `No note found with id: ${user}` });
    }
    const { title, body } = req.body;
    const empty = [];

    if (!title && !body) {
      return res.status(400).json({
        apiSuccess: false,
        message: `Please fill the empty fields ${empty}`,
      });
    }
    if (title && body) {
      single.title = title;
      single.body = body;
      await single.save();
      return res
        .status(200)
        .json({ apiSuccess: true, message: `Title, Body Modified for ${single}` });
    }
    if (title) {
      single.title = title;
      await single.save();
      return res
        .status(200)
        .json({ apiSuccess: true, message: `Title Modified for ${single}` });
    }
    if (body) {
      single.body = body;
      await single.save();
      return res
        .status(200)
        .json({ apiSuccess: true, message: `Body Modified for ${single}` });
    }
  } catch (err) {
    console.log(err);
    const errors=handleErrors(err);
    return res.status(400).json(errors);
  }
};
exports.deleteNote = async (req, res) => {
  try {
    const user=req.query.user;
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res
        .status(400)
        .json({ apiSuccess: false, message: `Please provide valid id` });
    }
    const single = await Notes.findByIdAndDelete(id);
    // console.log(single);
    if (!single) {
      return res
        .status(400)
        .json({ apiSuccess: true, message: `No note found with id: ${user} to delete` });
    }
    return res
      .status(200)
      .json({ apiSuccess: true, message: `${single} deleted successfully` });
  } catch (err) {
    console.log(err);
    const errors=handleErrors(err);
    return res.status(400).json(errors);
  }
};
