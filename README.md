# 📰 Newspaper FullStack Website

Welcome to the **Newspaper FullStack Website**! This platform serves as a comprehensive news aggregation website with trending articles, premium features, and a seamless user experience. Here's an overview of the project.

---

## 🌟 Key Features

1. **📱 Responsive Design**: Fully responsive for mobile, tablet, and desktop views.
2. **🔒 Authentication**: Email/password-based authentication with error handling and social login (e.g., Google).
3. **🛡️ JWT Security**: Implemented JWT for secure access to private routes, preventing unauthorized access.
4. **🏠 Dynamic Home Page**:
   - 📰 Trending Articles Slider (based on view count).
   - 📜 Publisher List.
   - 📊 User and Premium User Statistics with `react-countup`.
   - 💳 Subscription Plans Section.
   - 🌟 Additional unique sections for enhanced user engagement.
5. **💎 Subscription System**:
   - 🔽 Dropdown for subscription periods (1 minute, 5 days, 10 days).
   - 🌟 Premium users enjoy exclusive content and features.
   - 🔄 Automatic reversion to normal user after subscription expiry.
6. **✍️ Article Management**:
   - Add articles with rich features (title, image, tags, description).
   - Admin approval required for publishing.
   - ⭐ Premium articles with exclusive design and access.
7. **📊 Dashboard (Admin Only)**:
   - Manage users and articles in tabular format.
   - Approve, decline, or make articles premium.
   - Add publishers dynamically.
   - 📈 Interactive charts using `react-google-charts`.
8. **🔄 Pagination**: Implemented for admin dashboard pages (e.g., users, articles).
9. **🔔 Modal Triggers**:
   - Homepage modal for subscriptions after 10 seconds.
   - Modal for declined articles with reasons.
10. **🚫 404 Page**: Custom not-found page for undefined routes.

---

## 🛠️ Tech Stack

### 🖼️ Frontend
- **⚛️ React.js**: Component-based library for building the UI.
- **🧭 React Router**: For navigation and route handling.
- **🔄 TanStack Query**: For efficient data fetching.
- **🎨 Tailwind CSS**: For styling.
- **🔽 React Select**: For multi-select dropdowns.
- **💡 SweetAlert2**: For enhanced notifications.

### 🖥️ Backend
- **🌐 Node.js**: Server runtime.
- **🚀 Express.js**: Backend framework.
- **🛢️ MongoDB**: Database for storing articles, users, and publishers.
- **🔐 JWT**: For secure authentication.
- **🌍 CORS**: For managing cross-origin requests.

---

## 🚀 Live Site

🔗 [Live Website](https://news-paper-91c56.web.app)

---

## 🔐 Admin Credentials

- **👤 Username**: `aktermeem220@gmail.com`
- **🔑 Password**: `12345Aa@`

---

## 📋 Features for Users

1. **✍️ Add Articles**:
   - Form to submit articles with title, image, tags, and description.
   - Multi-select tags using `react-select`.
   - Publisher dropdown populated dynamically by admin.
2. **📰 All Articles**:
   - 🔍 Search and filter articles by title, publisher, and tags.
   - 👀 View details of articles (if premium, only accessible to subscribed users).
3. **👤 My Profile**:
   - View and update user information.
4. **📂 My Articles**:
   - Tabular display of user’s articles with options to update or delete.
   - Status indicators (Pending, Approved, Declined) with decline reasons.
5. **💎 Premium Articles**:
   - Access exclusive articles for subscribed users.

---

## 🛠️ Features for Admin

1. **📊 Dashboard**:
   - Sidebar with links to all users, all articles, and add publisher.
   - Interactive charts for publication statistics (pie, bar, and line charts).
2. **👥 User Management**:
   - View all users with options to promote to admin.
3. **✍️ Article Management**:
   - Approve, decline (with reasons), delete, or mark articles as premium.
4. **🏢 Publisher Management**:
   - Add publishers dynamically with logos uploaded to Cloudinary or imgbb.

---

## 🧪 Challenges & Solutions

- **🔒 Private Routes**: Implemented JWT to secure private routes and prevent redirection on page reload.
- **⏳ Subscription Tracking**:
  - Used `premiumTaken` property to track subscription periods.
  - Automated reversion to normal user after subscription expiry.
- **🔍 Dynamic Filtering and Searching**: Backend handles search and filter queries efficiently.
- **📱 Responsive Design**: Ensured all pages, including the dashboard, are fully responsive.

---

## 💡 Highlights

- 🎉 Unique modal for subscription trigger after 10 seconds of homepage visit.
- 💬 Sweet alert notifications for all CRUD operations and authentication feedback.
- 💎 Premium features encouraging users to subscribe for exclusive content.

---






# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
