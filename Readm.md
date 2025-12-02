# AI Mini-SaaS: Smart Task Evaluator

**Role:** Gen-AI Full-Stack Developer Assignment  
**Duration:** 48 Hours  
**Author:** Lavish Chauhan  

---

## 📝 Project Overview

This is a production-ready **SaaS-style web application** that evaluates coding tasks using AI. Users can submit their coding tasks, receive AI feedback, and view past reports.  

The app demonstrates a full-stack Gen-AI workflow, including:

- Authentication & user management
- Task submission and storage
- AI evaluation of tasks
- Dashboard to view AI feedback
- Optional future integration for payment unlocking reports

---

## ⚡ Features

### Frontend (React / Vite / Tailwind / ShadCN)
- ✅ Signup / Login page (Supabase Auth)
- ✅ Dashboard for task management
- ✅ Task submission form with description & optional GitHub link
- ✅ AI evaluation result UI (Score, Strengths, Improvements)
- ❌ Payment page (Not implemented yet)
- ✅ Past reports view

### Backend (Supabase + Node.js)
- ✅ Supabase for Auth, Database, RLS, and API
- ✅ Tasks, Users, Payments tables with RLS enabled
- ✅ AI evaluation API using **Google Gemini 2.5 Pro**  
- ✅ Handles task submission and stores AI feedback

### AI Integration
- AI assistant evaluates code tasks
- Returns structured JSON:
  ```json
  {
    "score": number (1-10),
    "strengths": ["point1", "point2"],
    "improvements": ["point1", "point2"]
  }
