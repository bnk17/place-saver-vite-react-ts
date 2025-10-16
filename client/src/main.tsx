import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import AppLayout from './AppLayout.tsx';
import { PlaceProvider } from './context/Places/PlaceContextProvider.tsx';
import { PlaceSearchAddDetails } from './features/Places/components/PlacesList/PlaceSearchAddDetails.tsx';
import { PlaceSearch } from './features/Places/components/PlacesList/PlaceSearchForm.tsx';
import { PlacesList } from './features/Places/components/PlacesList/PlacesList.tsx';
import TodoPage from './features/Todo/TodoPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlaceProvider>
      <BrowserRouter>
        <Routes>
          {/* The layout route */}
          <Route element={<AppLayout />}>
            {/* Child routes inherit layout */}
            <Route path="/" element={<App />} />
            <Route path="places" element={<PlacesList />} />
            <Route path="places/search" element={<PlaceSearch />} />
            <Route
              path="places/search/add-details"
              element={<PlaceSearchAddDetails />}
            />
            <Route path="todos" element={<TodoPage />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlaceProvider>
  </StrictMode>
);
