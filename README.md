# 🧠 Smart Resume Builder

A full-stack, AI-powered Resume Builder built using React, Tailwind CSS, Node.js, MongoDB, and OpenRouter (GPT-3.5).  
This tool enhances resume summaries with AI, saves data to a database, and allows exporting resumes as professional PDF files.

![Screenshot](./screenshot.png)


---

## 🎯 Features

- 🤖 AI Resume Summary Improvement (via GPT-3.5 through OpenRouter)
- 📝 Create and edit resume with clean form UI
- 💾 Save resume to MongoDB (via Express API)
- 💡 Stylish Tailwind CSS UI with gradients and animations

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (Create React App)
- 🎨 Tailwind CSS
- 📦 Axios

### Backend
- 🌐 Node.js + Express
- 📄 REST API for /suggest and /save
- 🌍 MongoDB Atlas for cloud DB
- 🧠 OpenRouter GPT-3.5 (Free-tier AI)

---


---

## 📸 How It Works

1. Fill in the resume form with your name, email, skills, and summary
2. Click 🤖 **AI Suggestion** → GPT-3.5 enhances your summary professionally
3. Click 💾 **Save** → Data is stored in MongoDB Atlas

---

## 🧪 Local Setup

```bash
# Start backend
cd server
npm install
node index.js

# Start frontend
cd ../client
npm install
npm start
