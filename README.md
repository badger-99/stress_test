<a name="readme-top"></a>

<div align="center">
  <img src="public/st_logo-3.png" alt="logo" width="140"  height="auto" />
  <br/>
  <h2><b>StressTest</b></h2>
  <em>A mindful check-in for your stress and emotional well-being.</em>

  <br/>
</div>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Build Tools](#build-Tools)
    - [Tech Stack](#tech-stack)
    - [Database Overview](#database-overview)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

# 📖 StressTest <a name="about-project"></a>

**_StressTest_** is a simple, friendly self-assessment app that helps you understand your stress levels and emotional balance. It’s designed to promote awareness, reflection, and well-being — without collecting personal data.

## 🛠 Build Tools <a name="build-tools"></a>

### Tech Stack <a name="tech-stack"></a>

  <ul>
    <li><a href="https://nextjs.org" target="_blank">Next.js 15</a></li>
    <li><a href="https://pnpm.io/" target="_blank">pnpm</a> as a package manager.</li>
    <li><a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> for type safety.</li>
    <li><a href="https://tailwindcss.com" target="_blank">TailwindCSS</a> for styling.</li>
    <li><a href="https://supabase.com" target="_blank">Supabase</a> for authentication and database.</li>
    <li><a href="https://resend.com" target="_blank">Resend</a> for emails.</li>
    <li><a href="https://vercel.com" target="_blank">Vercel.</a> for deployment.</li>
  </ul>

### 🗄️ Database Overview <a name="database-overview"></a>

StressTest uses a lightweight relational structure to manage its core features — user sessions, assessment questions, generated insights, and results.  
The setup is simple enough to replicate with any modern backend (Supabase, Firebase, or traditional SQL), while keeping personal data to a minimum.

#### 🧠 Questions

Holds the prompts used in the self-assessment.  
Each record defines a question, its category, and how it contributes to scoring.

> _Example fields include an identifier, the question text, and scoring metadata._

---

#### 💡 Insights

Stores descriptive feedback and practical recommendations linked to different stress levels.

> _Each entry corresponds to a defined stress range and includes short guidance text plus a list of suggestions._

---

#### 📊 Results

Tracks completed assessments and their computed scores.  
It ties a user (or guest session) to their responses and generated feedback.

> _Results contain a numeric score, a timestamp, and serialized data for answers and insights._

---

#### 👥 Users (optional)

Handled automatically by Supabase Auth, but can be extended for custom databases.  
Stores minimal identity details for registered users.

> _Typically includes an identifier and contact information (e.g., name and email)._

---

> 🧩 **Note:**  
> Supabase users benefit from built-in authentication and support for flexible `jsonb` columns to store complex data structures.  
> If you’re using another platform, the same relationships can be achieved using JSON objects or document-style storage.

### Key Features <a name="key-features"></a>

- **[Simple, Research-Inspired Assessment]** — quick and easy stress check.
- **[Progress Tracking through historical data]** — view historical results and trends.
- **[PDF reports]** — export personalized summaries.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- <a href="https://stresstest.alfredm.me" target="_blank">StressTest</a> is live — take a quick self-assessment and see your results instantly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- [**Node.js**](https://nodejs.org) 18 or higher (I used v22)
- **pnpm**
- A [**Supabase**](https://supabase.com) account and project
- A `.env.local` file configured with your Supabase credentials
- A **Google cloud** project for [Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)

- The following enviroment variables in `.env.local`:

```bash
#for client components
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key

# for server components
SUPABASE_URL=your-supabase-url
SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
```

### Setup

Clone this repository to your desired folder:

```
git clone https://github.com/badger-99/stresstest.git
```

Open it in VS-Code or run `cd stresstest` in git bash right after cloning then install with:

```
pnpm install
```

### Usage

To run the project, execute `pnpm dev` then open http://localhost:3000
in your browser to view the app.

### Deployment

The easiest place to deploy is on [Vercel](https://vercel.com). They also have a great free tier for personal projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Alfred Makongoro**

- GitHub: [@badger-99](https://github.com/badger-99)
- LinkedIn: [Alfred Makongoro](https://www.linkedin.com/in/alfredmkg/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- [ ] **[AI-generated insights based solely on your score — no personal data involved.]**
- [ ] **[User Account Controls]**
- [ ] **[Emailing PDF reports to registered users]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

I welcome feedback of all kinds — contributions, issues, and feature requests are always appreciated!
Feel free to share your thoughts on the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you find this project useful or inspiring, a ⭐️ on GitHub helps others discover it too 😁

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank [Dr. Miloš Kankaraš](https://www.linkedin.com/in/milosk/) who inspired the idea behind this project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is licensed under the [PolyForm Noncommercial License 1.0.0.](./LICENSE).

You’re free to use and modify the code for personal or educational purposes —  
commercial use requires prior permission.

<br>

Thanks for checking out StressTest — your interest means a lot! Stay mindful and remember to breathe😌

<p align="right">(<a href="#readme-top">back to top</a>)</p>
