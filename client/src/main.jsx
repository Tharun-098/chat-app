import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </DataProvider>
  </BrowserRouter>
);
