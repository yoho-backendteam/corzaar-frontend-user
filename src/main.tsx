import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { AuthProvider } from './context/context.tsx';
import { RegsterProvider } from './context/RegsterContext.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RegsterProvider>
          <App />
        </RegsterProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
