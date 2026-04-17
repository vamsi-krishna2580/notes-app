import Note from "../models/Note.js"


export  const getAllnotes = async (req, res)=>{
    try {
        const data = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc order {newest first}
        // const data = await Note.find({userId: req.userId}).sort({ createdAt: -1 }); // -1 will sort in desc order {newest first}
        res.status(200).json({
            "success":true, data,
        }); 
    } catch (error) {
        console.error("Error in getAllnotes controller", error);
        res.status(500).json({message: "Error Internal Server error"})
    }
};

// with pagination
// export const getAllnotes = async (req, res) => {
//     try {
//         // get page & limit from query
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;

//         const data = await Note.find()
//             .sort({ createdAt: -1 })
//             .skip((page - 1) * limit)
//             .limit(limit);

//         res.status(200).json({
//             success: true,
//             page,
//             limit,
//             data,
//         });

//     } catch (error) {
//         console.error("Error in getAllnotes controller", error);
//         res.status(500).json({ message: "Internal Server error" });
//     }
// };

export const getNoteById = async(req,res)=>{
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(201).json(note);
    } catch (error) {
        console.error("Error in getNoteByID controller", error);
        res.status(500).json({message: "Error Internal Server error"})
    }
};

export const createNote = async (req,res)=>{
   try {
        const { title } = req.body
        const newNote = new Note({userId: req.userId,title:title});
        const savedNote = await newNote.save();
        res.status(201).json({data: savedNote, success: true, message: "Note added successfully"});
   } catch (error) {
        console.error("Error in createNode controller", error);
        res.status(500).json({message: "Error Internal Server error"})
    }    
    
   }

export const updateNote = async (req,res)=>{
    try {
        const {title} = req.body;
        const updatedNote = await Note.findById(req.params.id);
        
        if(!updatedNote)  return res.status(404).json({message: "Note not found"});
        updatedNote.title = title
        await updatedNote.save();

        res.status(201).json({success: true, data: updatedNote, message:"Note updated successfully"});

    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Error Internal Server error"})
    }    
    }


export const deleteNote = async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteNote = await Note.findByIdAndDelete(id)
        if(!deleteNote) return res.status(404).json({success: true ,message: "Note not found"});
        res.status(201).json({message: "Note deleted successfully", success: true});
    }catch(error){
        console.error("Error in updateNode controller", error);
        res.status(500).json({message: "Error Internal Server error"})
    }
}
export const toggleNote = async(req, res) =>{
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({message: "Note not found"});
        note.completed = !note.completed;
        await note.save();
        res.status(200).json({
            massage: "Note toggled successfully",
            data: note,
            success: true,
        }); 
    } catch (error) {
        
    }
};
