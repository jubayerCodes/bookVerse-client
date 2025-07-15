# 📚 Book Verse - Smart Library

A **fully functional client-side library management system** built with **React**, **Redux Toolkit Query**, and **TypeScript**. This app allows users to view, manage, and borrow books with clean UI and real-time interactions—**no authentication required**.

---

## 🔗 Live API & Demo

- 🚀 Live API: [https://book-verse-client-omega.vercel.app](https://book-verse-client-omega.vercel.app)
- 📁 GitHub Repo: [GitHub Repository](https://github.com/jubayerCodes/bookVerse-client)

---

## ✨ Features

### 🛠️ Book Management

#### 📋 Book List Table
- Displays all books in a clean, tabular format.
- Columns include: **Title**, **Author**, **Genre**, **ISBN**, **Copies**, **Availability**, and **Actions**.

#### ⚙️ Actions
- **Edit Book**: Update existing book info with a pre-filled form.
  - 🧠 Business Logic: If `copies = 0`, book is marked as unavailable.
- **Delete Book**: Confirmation dialog before deletion.
- **Borrow Book**: Opens a form to borrow the selected book.

#### ➕ Add New Book
- Button navigates to the book creation form.
- Fields: Title, Author, Genre, ISBN, Description, Copies.
- Automatically redirects and updates UI on successful creation.

---

### 📚 Borrow Book
- Accessible from the **"Borrow"** button in the book list.
- Fields: **Quantity** (number), **Due Date** (date).
- Business Rules:
  - Quantity must not exceed available copies.
  - If available copies reach 0, book becomes unavailable.
- On success, redirects to **Borrow Summary** page.

---

### 📊 Borrow Summary
- Aggregated data showing borrowed books.
- Displays: **Book Title**, **ISBN**, **Total Quantity Borrowed**.

---

## 📄 Pages

| Path | Description |
|------|-------------|
| `/books` | List of all books with core actions (edit, delete, borrow). |
| `/create-book` | Form to create a new book. |
| `/borrow-summary` | Aggregated summary of borrowed books. |

---

## 🧩 UI Components

- **Navbar** – Navigation links to all main pages.
- **Footer** – Minimal footer with credits.
- **Book Table** – Central UI element with all book operations.
- **Responsive Design** – Optimized for mobile, tablet, and desktop.

---

## 🧰 Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Redux Toolkit Query (RTK Query)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **React Hook Form** (for forms)
- **Zod/Yup** (optional - for schema validation)
- **ShadCN UI** (optional - for better UI components)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/jubayerCodes/bookVerse-client.git
   cd bookVerse-client
2. **Install dependencies**
    ```bash
   npm install
3. **Run the development server**
    ```bash
   npm run dev
4. **Connect to your backend API**
    - Make sure the backend server is running (follow its own setup).
    - Update the baseUrl in your RTK Query API setup if necessary.

## ⚙️ Environment Variables

**Create a .env file with:**

    VITE_BASE_API=https://book-verse-server-alpha.vercel.app/api
---