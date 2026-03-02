import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { router } from "./routes";
import LoadingState from "./components/ui/LoadingState";
import "./index.css";
import { ToastProvider } from "./components/ui/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider
          router={router}
          fallbackElement={
            <div className="p-4">
              <LoadingState title="Loading page" />
            </div>
          }
        />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);
