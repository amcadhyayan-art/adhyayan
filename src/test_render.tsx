import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import ContactPage from './pages/ContactPage';
import AccommodationPage from './pages/AccommodationPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';

function runTests() {
  const components = [
    { name: 'ContactPage', element: <ContactPage /> },
    { name: 'AccommodationPage', element: <AccommodationPage /> },
    { name: 'WorkshopDetailsPage (with params)', element: (
      <Routes>
        <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
      </Routes>
    ), initialEntries: ['/workshops/surgery'] }
  ];

  for (const comp of components) {
    try {
      console.log(`Testing render for ${comp.name}...`);
      const html = renderToString(
        <MemoryRouter initialEntries={comp.initialEntries || ['/']}>
          <HelmetProvider context={{}}>
            {comp.element}
          </HelmetProvider>
        </MemoryRouter>
      );
      console.log(`SUCCESS: ${comp.name} rendered successfully! (${html.length} chars)`);
    } catch (err) {
      console.error(`ERROR: ${comp.name} failed to render:`);
      console.error(err);
    }
  }
}

runTests();
