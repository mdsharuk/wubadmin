import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { App as AntApp, ConfigProvider } from "antd";
import { store } from "@/app/store";
import router from "@/routes/router";
import "antd/dist/reset.css";
import "@/styles/main.scss";

// Keep in sync with $brand-color in src/styles/base/variables.scss
const brandColor = "#7264f4";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorPrimary: brandColor } }}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
