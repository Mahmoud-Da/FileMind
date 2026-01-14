# FileMind

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**FileMind** is a high-performance, context-aware AI assistant that turns your static documents into interactive conversations. Built with a robust backend using **Express running on Bun**, and a modern **React 19** frontend, it allows users to upload text files and query them instantly using OpenAI's advanced language models.

## ✨ Features

- **📄 Dynamic RAG (Retrieval-Augmented Generation):** Instantly upload `.txt` files to give the AI a "mind" tailored to your specific document.
- **💾 Intelligent Persistence:** Conversation history and file contexts are persisted across reloads, ensuring a seamless user experience.
- **⚡ Powered by Bun & Express:** Combines the ease of Express with the ultra-fast performance of the Bun runtime.
- **🎨 Elegant UI:** A clean, glass-morphism interface crafted with React 19, Tailwind CSS v4, and Lucide React.
- **🐳 Production Ready:** Fully dockerized with Nginx serving as a secure reverse proxy and static asset server.
- **🔒 Type-Safe:** Robust architecture with end-to-end TypeScript and Zod validation.

---

## 🛠️ Tech Stack

### **Frontend (`/packages/client`)**

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **State & Forms:** React Hook Form, Axios
- **UI Components:** Lucide Icons, Custom Components

### **Backend (`/packages/server`)**

- **Runtime:** Bun
- **Framework:** Express.js
- **AI Engine:** OpenAI SDK
- **Validation:** Zod
- **File Handling:** Multer (In-memory buffer)

### **Infrastructure**

- **Docker Compose:** Multi-container orchestration
- **Nginx:** Reverse Proxy & Static Server

---

## 🚀 Getting Started

### Option 1: Run with Docker (Recommended)

The seamless way to launch **FileMind** is using Docker Compose.

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/filemind.git
    cd filemind
    ```

2.  **Configure Environment**
    Create a `.env` file in the root directory:

    ```env
    OPENAI_API_KEY=sk-proj-your-openai-api-key-here
    ```

3.  **Build and Run**

    ```bash
    docker compose up --build
    ```

4.  **Access the App**
    Open your browser and navigate to: `http://localhost`

---

### Option 2: Manual Development Setup

If you wish to develop or run packages individually:

**Prerequisites:** Ensure [Bun](https://bun.sh/) is installed.

1.  **Install Dependencies**
    From the root folder:

    ```bash
    bun install
    ```

2.  **Start the Backend**

    ```bash
    cd packages/server
    export OPENAI_API_KEY=your-key-here
    bun dev
    ```

    _Server runs on port 3000._

3.  **Start the Frontend**
    Open a new terminal:
    ```bash
    cd packages/client
    bun dev
    ```
    _Client runs on port 5173._

---

## 📂 Project Structure

```bash
├── docker-compose.yml   # Orchestration config
├── package.json         # Workspace configuration
├── packages
│   ├── client           # React Frontend
│   │   ├── src
│   │   ├── Dockerfile
│   │   └── nginx.conf   # Nginx proxy config
│   └── server           # Express Backend (Bun Runtime)
│       ├── controllers  # Request handlers
│       ├── services     # Business logic (AI & File processing)
│       ├── repositories # In-memory data storage
│       └── Dockerfile
└── README.md
```

## 🔌 API Endpoints

The backend exposes the following endpoints (prefixed with `/api` via Nginx):

| Method | Endpoint      | Description         | Payload                                                         |
| :----- | :------------ | :------------------ | :-------------------------------------------------------------- |
| `POST` | `/api/upload` | Upload context file | `multipart/form-data`: { `file`: .txt, `conversationId`: UUID } |
| `POST` | `/api/chat`   | Send message to AI  | `JSON`: { `prompt`: string, `conversationId`: UUID }            |

---

## 🛡️ License

This project is licensed under the Apache License - see the LICENSE file for details.

---
