import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // Your original App.jsx content
import SectorsPage from './Sectors'; // The new code provided above
import Contact from './Contact'; // The new code provided above
import About from './About'; // The new code provided above
import Insight from './Insight'; // The new code provided above

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sectors" element={<SectorsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/insight" element={<Insight />} />
    </Routes>
  );
}