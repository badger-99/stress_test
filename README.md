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
    - [How It Works](#how-it-works)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

# 📖 StressTest <a name="about-project"></a>

**_StressTest_** is a simple, friendly self-assessment app that helps you understand your stress levels and emotional balance. It’s designed to promote awareness, reflection, and well-being — without collecting personal data.

It uses the **Perceived Stress Scale (PSS-10)**, a widely used, research-validated stress questionnaire, and keeps every result on your own device: there are no accounts and no database.

## 🛠 Build Tools <a name="build-tools"></a>

### Tech Stack <a name="tech-stack"></a>

  <ul>
    <li><a href="https://nextjs.org" target="_blank">Next.js 15</a> (App Router) with <a href="https://react.dev" target="_blank">React 19</a>.</li>
    <li><a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> for type safety.</li>
    <li><a href="https://tailwindcss.com" target="_blank">TailwindCSS 4</a> and <a href="https://ui.shadcn.com" target="_blank">shadcn/ui</a> for styling and components.</li>
    <li><a href="https://react-pdf.org" target="_blank">React-PDF</a> for downloadable reports.</li>
    <li><a href="https://recharts.org" target="_blank">Recharts</a> for the history chart.</li>
    <li><a href="https://pnpm.io/" target="_blank">pnpm</a> as a package manager.</li>
    <li><a href="https://vercel.com" target="_blank">Vercel</a> for deployment.</li>
  </ul>

### 🧭 How It Works <a name="how-it-works"></a>

#### 🧠 The assessment

The 10 questions are the [PSS-10](#acknowledgements). Each asks how often you felt a certain way in the last month, answered on a fixed five-point scale: _Never, Almost never, Sometimes, Fairly often, Very often_ (scored 0–4).

- Answers are buttons, not a slider, and nothing is preselected. The scale was validated with exactly these five answers, and a default value would quietly count toward the score for anyone who skips a question.
- The four positively worded questions (e.g. _“felt that things were going your way?”_) are reverse-scored, so a higher total always means more stress.
- The total runs from 0 to 40 and maps to three levels: **Low** (0–13), **Moderate** (14–26) and **High** (27–40). These ranges are the ones most commonly used with the PSS-10; they are a guide, not a clinical cutoff, and the report says so.

The questions, scale, scoring and levels all live in one module, [`src/lib/data/assessment.ts`](src/lib/data/assessment.ts). Pages only display them.

---

#### 🔒 Privacy and storage

Nothing leaves your browser.

- Results are saved in the browser’s `localStorage`, so your history survives a refresh but stays on that device and browser.
- **Clear history** on the History page deletes everything.
- If storage is unavailable (private browsing, blocked site data), the app still works for that visit; it just won’t remember.

> 🧩 **Why no database?**
> Earlier versions used Supabase for sign-in and saved history. Stress answers are sensitive, and a public demo doesn’t need to hold anyone’s data, so the app was rebuilt to keep everything on the user’s device. The account-based version is preserved under the git tag [`accounts-supabase-v1`](../../tree/accounts-supabase-v1).

---

#### 🗂️ Data flow

- A single React context (`src/providers/results-provider.tsx`) owns the history. The latest result is derived from it rather than stored separately, so the two can’t drift apart.
- The score and stress level are computed from the answers at submit time, never stored as separate facts.
- Every page is pre-rendered as static HTML; history is read once the page reaches the browser.

### Key Features <a name="key-features"></a>

- **[Validated questionnaire]**: the 10-item Perceived Stress Scale, scored as published.
- **[No sign-up, no tracking]**: results stay in your browser.
- **[Progress tracking]**: a history chart of past check-ins; click a point to reopen that report.
- **[PDF reports]**: download any result as a PDF.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- <a href="https://stresstest.alfredm.me" target="_blank">StressTest</a> is live — take a quick self-assessment and see your results instantly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- [**Node.js**](https://nodejs.org) 18.18 or higher (I used v22)
- [**pnpm**](https://pnpm.io/installation)

No accounts, API keys or environment variables are needed.

### Setup

Clone this repository to your desired folder:

```
git clone https://github.com/badger-99/stress_test.git
```

Then move into it and install the dependencies:

```
cd stress_test
pnpm install
```

### Usage

To run the project, execute `pnpm dev`, then open http://localhost:3000 in your browser.

For a production build, run `pnpm build` followed by `pnpm start`.

### Deployment

The easiest place to deploy is on [Vercel](https://vercel.com). They also have a great free tier for personal projects. Since the app has no backend, there is nothing else to configure.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Alfred Makongoro**

- GitHub: [@badger-99](https://github.com/badger-99)
- LinkedIn: [Alfred Makongoro](https://www.linkedin.com/in/alfredmkg/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- [ ] **[AI-generated insights based solely on your answers, with no name or other personal data sent.]**
- [ ] **[Optional accounts with consent-based, synced history]**
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

The questionnaire is the **Perceived Stress Scale (PSS-10)**: Cohen, S., Kamarck, T., & Mermelstein, R. (1983). _A global measure of perceived stress._ Journal of Health and Social Behavior, 24, 385–396. It is used here for non-commercial purposes; commercial use of the scale requires permission.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is licensed under the [PolyForm Noncommercial License 1.0.0.](./LICENSE).

You’re free to use and modify the code for personal or educational purposes —  
commercial use requires prior permission.

<br>

Thanks for checking out StressTest — your interest means a lot! Stay mindful and remember to breathe😌

<p align="right">(<a href="#readme-top">back to top</a>)</p>
