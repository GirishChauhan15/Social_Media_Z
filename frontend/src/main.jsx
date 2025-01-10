import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import config from "./config/config";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/toaster";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { UserDashboard, Error404 } from './pages'

const PUBLISHABLE_KEY = config.clerkKey;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
} 

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="*" element={<Error404 />} />
    <Route path="" element={<App />} />
    <Route path="profile" element={<UserDashboard />} />
  </Route>
)) 

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
  </ClerkProvider>
);
