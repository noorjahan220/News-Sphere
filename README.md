# Newspaper FullStack Website

<!-- Banner Image with fixed width to fit screen -->
<div align="center">
  <img src="https://i.ibb.co.com/1YBJqPbF/Screenshot-478.png" alt="Newspaper Website Banner" width="100%" style="border-radius: 10px;">
</div>

<br/>

## 🔗 Live Links
- **Live Website:** [Click Here to Visit](#) *(Add your link here)*

## 📖 Project Overview
Welcome to the **Newspaper FullStack Website**! This platform serves as a comprehensive news aggregation website designed to provide trending articles, premium content features, and a seamless user experience. 

It bridges the gap between general readers and premium subscribers, offering exclusive content, advanced dashboards for admins, and interactive data visualization.

## 🔐 Admin Credentials (For Testing)
Use these credentials to access the Admin Dashboard features:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `aktermeem220@gmail.com` | `12345Aa@` |

## 🌟 Key Features

### 🏠 User Experience & Interface
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
*   **Dynamic Home Page:** 
    *   Trending Articles Slider (sorted by view count).
    *   Live statistics using `react-countup`.
    *   Subscription plans section.
*   **Smart Engagement:** A unique modal appears after 10 seconds to encourage subscriptions.

### 💎 Subscription & Premium System
*   **Tiered Access:** Normal users vs. Premium users.
*   **Flexible Plans:** Dropdown options for subscription periods (1 minute demo, 5 days, 10 days).
*   **Auto-Expiry:** System automatically reverts Premium users to Normal status upon expiry.
*   **Exclusive Content:** Premium articles are locked for non-subscribers with exclusive designs.

### 🛡️ Security & Authentication
*   **Secure Auth:** Email/password login with error handling + Social Login (Google).
*   **JWT Protection:** JSON Web Tokens secure private routes and API endpoints.
*   **Private Routes:** Prevents unauthorized access to premium content and dashboards.

### ✍️ Article Management
*   **Rich Creation:** Users can add articles with titles, images, tags (multi-select), and descriptions.
*   **Review Process:** Articles require Admin approval to go live.
*   **Status Tracking:** Articles are marked as Pending, Approved, or Declined (with reasons).

### 📊 Admin Dashboard
*   **Management Tables:** View, delete, and manage all users and articles.
*   **Publisher Management:** Add publishers dynamically with logo uploads.
*   **Article Control:** Approve/Decline articles or mark them as Premium.
*   **Data Visualization:** Interactive charts (Pie, Bar, Line) using `react-google-charts` to track publication stats.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Tailwind CSS, TanStack Query |
| **Backend** | Node.js, Express.js, JWT |
| **Database** | MongoDB (Mongoose) |
| **Tools** | Firebase Auth, React Select, SweetAlert2, React CountUp |

## 📦 Dependencies Used

### Client-side
- `react-router-dom`: For navigation.
- `@tanstack/react-query`: For efficient server-state management.
- `axios`: For API requests.
- `react-select`: For multi-select dropdowns in forms.
- `react-countup`: For animated statistics on the homepage.
- `react-google-charts`: For admin dashboard analytics.
- `sweetalert2`: For beautiful alerts and notifications.
- `firebase`: For user authentication.
- `stripe` / `react-stripe-js`: (If payment gateway is integrated).

### Server-side
- `express`: Backend framework.
- `cors`: Cross-Origin Resource Sharing.
- `dotenv`: Environment variable management.
- `jsonwebtoken`: Security and authentication tokens.
- `mongoose`: Database modeling.
- `cookie-parser`: Handling HTTP cookies.

## 🧪 Challenges & Solutions
1.  **Private Routes & Reloads:** 
    *   *Challenge:* keeping a user logged in and authorized during page reloads.
    *   *Solution:* Implemented JWT verification on the backend and persistent state on the frontend.
2.  **Subscription Expiry:** 
    *   *Challenge:* Managing the exact time a user's premium status ends.
    *   *Solution:* Used a `premiumTaken` timestamp property to calculate duration and auto-revert users.
3.  **Dynamic Filtering:** 
    *   *Challenge:* Fast searching and filtering by tags/publishers.
    *   *Solution:* Optimized backend queries to handle search parameters efficiently.

## 💻 How to Run Locally (Step-by-Step)

### Prerequisites
*   Node.js installed.
*   MongoDB URI.
*   Firebase Project configuration.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/newspaper-website.git
cd newspaper-website
2. Backend Setup
Go to the server directory:

Bash

cd server
npm install
Create a .env file in the server folder:

env

PORT=5000
DB_USER=your_mongo_user
DB_PASS=your_mongo_pass
ACCESS_TOKEN_SECRET=your_jwt_secret
Start the server:

Bash

npm start
3. Frontend Setup
Open a new terminal and go to the client directory:

Bash

cd client
npm install
Create a .env.local file in the client folder:

env

VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_sender_id
VITE_APPID=your_firebase_app_id
VITE_IMGBB_KEY=your_imgbb_api_key
Start the client:

Bash

npm run dev
