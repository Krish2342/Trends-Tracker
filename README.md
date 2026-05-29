<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

<div align="center">
  <h1 align="center">🚀 TrendsTracker</h1>
  <p align="center">
    <strong>The premier real-time search trends and analytics platform built specifically for the Indian ecosystem.</strong>
  </p>
</div>

<hr />

## 📖 Description

TrendsTracker is a high-performance web application designed to democratize data by providing localized, deeply contextual search analytics. Whether you are a journalist, marketer, developer, or just a curious individual, TrendsTracker processes data streams as they happen, ensuring you have a 360-degree view of India's digital pulse through a beautiful, premium glassmorphic interface.

---

## 📸 Demo & Screenshots

*(Add your screenshots here! Example below)*

| **Dashboard** | **Keyword Compare** |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0f0f10/ffffff?text=Dashboard+Screenshot" alt="Dashboard" width="100%" /> | <img src="https://via.placeholder.com/600x400/0f0f10/ffffff?text=Compare+Screenshot" alt="Compare" width="100%" /> |

---

## ✨ Features

- **Real-Time Velocity:** Process data streams instantly without acting on stale information.
- **Regional Analytics:** Deeply contextualized search analytics specifically filtered for the Indian demographic.
- **Smart Keyword Compare:** Visualize and benchmark multiple keywords against each other.
- **Premium UI/UX:** A stunning dark mode interface utilizing modern glassmorphism, micro-animations, and ambient glows.
- **Integrated API Docs:** Built-in documentation for users wanting to tap into the REST API.
- **Direct Support Ticketing:** A custom-built backend using Nodemailer to send user support tickets directly to administration.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js (App Router)](https://nextjs.org/) |
| **UI Library** | [React](https://reactjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Email/SMTP** | [Nodemailer](https://nodemailer.com/) |

---

## ⚙️ Installation Steps

Follow these steps to get a development environment running:

**1. Clone the repository**
```bash
git clone https://github.com/Krish2342/Trends-Tracker-master.git
cd Trends-Tracker-master
```

**2. Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Set up environment variables**
Copy the example environment file and fill in your details:
```bash
cp .env.example .env.local
```
*(See the Environment Variables section below for configuration details).*

**4. Run the development server**
```bash
npm run dev
```

**5. Open the application**
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 💻 Usage

- **Navigation:** Use the left sidebar to navigate between Home, Explore, and Comparisons.
- **Search:** Utilize the animated top search bar to find specific trending topics.
- **Profile Management:** Click on your user avatar in the top right to access your personalized settings, favorite keywords, and search history via the dedicated `/profile` dashboard.
- **API:** Visit `/api-docs` to learn how to integrate TrendsTracker data into your own applications.

---

## 📁 Folder Structure

```text
TrendsTracker/
├── app/
│   ├── about/             # About page route
│   ├── api/               # Next.js API Routes (Backend)
│   │   ├── contact/       # Nodemailer email route
│   │   └── ...            # Data endpoints
│   ├── api-docs/          # Frontend API Documentation page
│   ├── components/        # Reusable React components (Header, Footer, Profile)
│   ├── contexts/          # React Context providers (Auth)
│   ├── explore/           # Explore page route
│   ├── help/              # Support & Ticketing page
│   ├── privacy/           # Privacy Policy page
│   ├── profile/           # User dashboard & settings
│   ├── globals.css        # Tailwind directives and global styles
│   ├── layout.tsx         # Main application shell
│   └── page.tsx           # Landing/Home page
├── public/                # Static assets (images, icons)
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory. You will need a Google App Password to enable the contact form email functionality.

```env
# --- Nodemailer Configuration ---
# Your Gmail Address
EMAIL_USER=pkrish2304@gmail.com

# Your 16-character Google App Password (NOT your regular password)
# Get this from Google Account -> Security -> 2-Step Verification -> App Passwords
EMAIL_PASSWORD=your_16_character_app_password_here

# --- Other Variables ---
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🔌 API Endpoints (Example)

TrendsTracker provides a RESTful API for developers. Detailed documentation can be found at `/api-docs` on the live site.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/trends` | Fetch the latest trending queries. |
| `POST` | `/api/contact` | Submit a support ticket via email. |

---

## 🚀 Deployment Guide

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository.
2. Log in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Add your `.env.local` environment variables into the Vercel Environment Variables section.
5. Click **Deploy**.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact Information

**Krish** 

- **Email:** [pkrish2304@gmail.com](mailto:pkrish2304@gmail.com)
- **X (Twitter):** [@krishh2304](https://x.com/krishh2304?t=W64Fyjp518hhB0luIx5tNQ&s=09)
- **LinkedIn:** [Krish P](https://www.linkedin.com/in/krish-p-b15609335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- **Instagram:** [@__krishh_23](https://www.instagram.com/__krishh_23?igsh=MTNxNXU4aTJjY2kyag==)
- **GitHub:** [Krish2342](https://github.com/Krish2342)

<p align="center">
  <br/>
  Made with ❤️ by Krish
</p>
