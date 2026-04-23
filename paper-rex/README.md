# 🌿 Paper Rex 

> Student Team Members Management Application  
> Course: 21CSS301T – Full Stack Development | SRM Institute of Science and Technology  
> Academic Year: 2024-25 (Even) | Year: III / Sem: VI | Section: AO1

---

## 👥 Team Members

| Name | Register Number | Role |
|------|----------------|------|
| Arjun Dogra | RA2311056010243 | Full Stack Developer |
| Nishtha Goyal | RA2311056010212 | Data Analyst & Backend Developer |
| Sam Selvam | RA2311056010240 | UI/UX Designer & Frontend Developer |

---

## 📖 Project Description

**Student Team Members Management Application** is a web application built to manage and showcase team members. It allows users to add members with profile photos, view all members in a card layout, and see full details of each member. The app is built with a React frontend and a Node.js + Express + MongoDB backend.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, React Router DOM, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **File Upload**: Multer
- **Code Editor**: Visual Studio Code
- **DB GUI**: MongoDB Compass

---

## 📁 Project Structure

```
paper-rex/
├── backend/
│   ├── server.js         # Express server + API routes
│   ├── seed.js           # Pre-populate DB with team members
│   ├── uploads/          # Uploaded profile images (auto-created)
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js        # React Router setup
│       ├── App.css       # Global styles
│       ├── index.js
│       ├── components/
│       │   └── Navbar.js
│       └── pages/
│           ├── Home.js
│           ├── AddMember.js
│           ├── ViewMembers.js
│           └── MemberDetails.js
├── .gitignore
└── README.md
```

---

## ⚙️ Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB running locally on port 27017
- npm

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/paper-rex.git
cd paper-rex
```

### 2. Set up Backend
```bash
cd backend
npm install
node seed.js       # (Optional) Pre-populate with team member data
npm start          # Starts server on http://localhost:5000
```

### 3. Set up Frontend
```bash
cd ../frontend
npm install
npm start          # Starts React app on http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/members` | Add a new team member (with image upload) |
| `GET` | `/members` | Get all team members |
| `GET` | `/members/:id` | Get a single member by ID |
| `GET` | `/api/members` | Same as above (browser testable) |
| `GET` | `/api/members/:id` | Same as above (browser testable) |

### Test in Browser
- All members: `http://localhost:5000/api/members`
- Single member: `http://localhost:5000/api/members/<member_id>`

---

## 🚀 How to Run the App

1. Start MongoDB locally (or use MongoDB Atlas)
2. Start the backend: `cd backend && npm start`
3. Start the frontend: `cd frontend && npm start`
4. Open `http://localhost:3000` in your browser

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with team intro and navigation |
| Add Member | `/add` | Form to add new member with photo upload |
| View Members | `/view` | Grid of all team members |
| Member Details | `/member/:id` | Full profile of a single member |
