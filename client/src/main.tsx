import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import AppLayout from './AppLayout.tsx';
import { PlacesList } from './features/Places/components/PlacesList/PlacesList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The layout route */}
        <Route element={<AppLayout />}>
          {/* Child routes inherit layout */}
          <Route path="/" element={<App />} />
          <Route path="/places" element={<PlacesList />} />
          <Route path="/todos" element={<div>Todo Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
