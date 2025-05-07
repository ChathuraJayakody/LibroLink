# 📚 LibroLink - Online Bookshop System

**LibroLink** is a full-stack online bookshop system that allows users to browse, search, and purchase books. Built with **Angular** (frontend), **Node.js** (backend), and **MySQL** (database), this system also includes admin functionalities for managing books, orders, and users.

---

## 🛠️ Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT (if implemented)
- **Styling**: Bootstrap / Angular Material (if used)

---

## 🚀 Features

### 🛍️ User Side
- Register and log in
- Browse books by category or search
- View book details
- Add to cart and checkout
- View order history

⚙️ Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/librolink.git
cd librolink
2️⃣ Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file with the following content:

ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=librolink
JWT_SECRET=your_jwt_secret
PORT=5000
Start the backend:

bash
Copy
Edit
node index.js   # or use nodemon if installed
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../client
npm install
ng serve
Navigate to http://localhost:4200 in your browser.

🗄️ Database Setup
Open MySQL and create a database named librolink

Import the SQL script (if available) from /database folder

Make sure your DB credentials in .env match your MySQL setup



