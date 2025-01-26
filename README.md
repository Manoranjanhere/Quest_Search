# Quest Search

Quest Search is a web application designed for searching through large datasets efficiently using gRPC. By leveraging gRPC's powerful searching capabilities, Quest Search ensures fast and reliable results. The application uses Protocol Buffers (`.proto` files) to generate client-side search code and employs Docker to set up Envoy as a proxy server.

## Features

- **Search Large Datasets**: Powered by gRPC for high-performance searching.
- **Frontend and Backend Communication**: Seamlessly integrates the client and server using gRPC.
- **Proxy Server with Docker**: Uses Envoy as a proxy server for managing requests.
- **Dark and Light Themes**: Toggle between visually appealing dark and light themes.
- **Filter Questions**: Filter questions by type for better usability.

---

## Prerequisites

To run the application locally, ensure the following are installed on your system:

- Node.js
- Docker
- Docker Compose

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Manoranjanhere/Quest_Search.git
cd Quest_Search
```

### 2. Install Dependencies

#### Install backend dependencies:

```bash
npm install
```

#### Install frontend dependencies:

```bash
cd frontend
npm install
```

### 3. Configure the Client URL

Edit the file `frontend/src/searchService.js` and set the client URL to point to your local backend:

```javascript
const client = new SearchServiceClient('http://134.209.155.76:8080', {
  withCredentials: false,
  headers: {
    'Content-Type': 'application/grpc-web+proto',
    'X-Grpc-Web': '1'
  }
}); 
//make above config to
const client = new SearchServiceClient('http://localhost:8080');
```

### 4. Set Up the Proxy Server

Navigate back to the root directory and run the following command to create the proxy server using Docker:

```bash
docker compose up -d
```

### 5. Run the Application

Start both the frontend and backend concurrently:

```bash
npm run dev
```

This will launch the application, and you can access it in your browser.

---

## Features on the Website

- **Dark and Light Theme**: Switch between themes to match your preference.
- **Filter Options**: Filter questions by type to narrow down your search results.

---

## Notes

- Ensure Docker is running before starting the proxy server.
- If you encounter issues, check the logs for troubleshooting by running:
  ```bash
  docker logs <container_name>
  ```
- The application is configured to run on the following ports:
  - Frontend: `3000`
  - Backend: `50051`
  - Proxy Server: `8080`

---

---

Enjoy using Quest Search for your data querying needs!

![Screenshot 2025-01-26 014400](https://github.com/user-attachments/assets/2cead501-14e1-4dcb-8b61-023c148188eb)

![Screenshot 2025-01-26 014451](https://github.com/user-attachments/assets/fe0522c7-d6c0-4515-ab63-7d3639af0c06)

![Screenshot 2025-01-26 014615](https://github.com/user-attachments/assets/08eee8a8-8cab-4f1c-97ca-46869457f05e)

![Screenshot 2025-01-26 014840](https://github.com/user-attachments/assets/f461d1e0-3d0d-46d9-878a-fa8be52db042)

