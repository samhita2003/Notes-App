import app from "./src/app.js"
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import mongoose from "mongoose";
import dns from "dns"
import jwt from "jsonwebtoken"
import authenticateToken from "./src/config/jwt.js"
import userModel from "./src/models/user.model.js"
import noteModel from "./src/models/note.model.js"
import bcrypt from "bcryptjs"

dns.setServers(["8.8.8.8", "8.8.4.4"])

dotenv.config()

const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.send("Hello User")
})

connectDB()

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    const isUser = await userModel.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    const accessToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(201).json({
  message: "User created successfully",
  user,
  token: accessToken
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is incorrect"
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
  message: "User logged in successfully",
  user,
  token: accessToken
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

//Add Note

app.post("/add-note", authenticateToken, async (req, res) => {

  const { title, content, tags } = req.body;
  const { userId } = req.user;

  if (!title || !title.trim()) {
  return res.status(400).json({
    message: "Title is required"
  });
}

  if (!content || !content.trim()) {
  return res.status(400).json({
    message: "Content is required"
  });
}

if (tags !== undefined && !Array.isArray(tags)) {
  return res.status(400).json({
    message: "Tags must be an array"
  });
}

  try {

    const note = await noteModel.create({
      title,
      content,
      tags: tags || [],
      isPinned: false,
      userId
    });

    return res.status(201).json({
      message: "Note is successfully created",
      note
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.put("/edit-note/:id", authenticateToken, async (req, res) => {

  const noteId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
  return res.status(400).json({
    message: "Invalid note ID"
  });
}

  const { title, content, tags, isPinned } = req.body;

  const { user } = req.user;

  try {

    const note = await noteModel.findOne({
      _id: noteId,
      userId: user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (title !== undefined) {
      note.title = title;
    }

    if (content !== undefined) {
      note.content = content;
    }

    if (tags !== undefined && !Array.isArray(tags)) {
  return res.status(400).json({
    message: "Tags must be an array"
  });
}

    if (isPinned !== undefined) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.status(200).json({
      message: "Note is successfully updated",
      note
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.get("/get-notes", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const notes = await noteModel
      .find({ userId })
      .sort({ isPinned: -1, createdAt: -1 });

    return res.status(200).json({
      message: "Notes successfully fetched",
      notes
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.delete("/delete-note/:id", authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;

if (!mongoose.Types.ObjectId.isValid(noteId)) {
  return res.status(400).json({
    message: "Invalid note ID"
  });
}
    const { userId } = req.user;

    const note = await noteModel.findOne({
      _id: noteId,
      userId
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    await noteModel.deleteOne({
      _id: noteId,
      userId
    });

    return res.status(200).json({
      message: "Note successfully deleted"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});


app.put("/update-note-pinned/:id", authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;

if (!mongoose.Types.ObjectId.isValid(noteId)) {
  return res.status(400).json({
    message: "Invalid note ID"
  });
}
    const { userId } = req.user;

    const note = await noteModel.findOne({
      _id: noteId,
      userId
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.isPinned = !note.isPinned;

    await note.save();

    return res.status(200).json({
      message: "Note pin status updated",
      note
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {

  const { userId } = req.user;

  try {

    const isUser = await userModel.findById(userId);

    if (!isUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User is successfully fetched",
      user: isUser
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})