const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if not exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/paperrex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  section: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  project: { type: String },
  hobbies: { type: String },
  certificate: { type: String },
  internship: { type: String },
  aboutYourAim: { type: String },
  image: { type: String },
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ─── ROUTES ───────────────────────────────────────────────

// POST /members — Add new member
app.post('/members', upload.single('image'), async (req, res) => {
  try {
    const { name, regNo, year, degree, section, role, email, project, hobbies, certificate, internship, aboutYourAim } = req.body;
    const image = req.file ? req.file.filename : '';
    const member = new Member({ name, regNo, year, degree, section, role, email, project, hobbies, certificate, internship, aboutYourAim, image });
    await member.save();
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members — Get all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members/:id — Get single member
app.get('/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /members/:id — Remove a member
app.delete('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    // Also delete their image file if it exists
    if (member.image) {
      const imgPath = path.join(__dirname, 'uploads', member.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Also expose as /api/members and /api/members/:id (browser testing)
app.get('/api/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
