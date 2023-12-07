import React from "react";
import { Toaster } from "sonner";

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.routes.tsx";
import { AuthProvider } from "./context/AuthConext.tsx";
import MaxWidthWrapper from "./components/shared/MaxWidthWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MaxWidthWrapper>
        <RouterProvider router={router} />
        <Toaster />
      </MaxWidthWrapper>
    </AuthProvider>
  </React.StrictMode>
);
