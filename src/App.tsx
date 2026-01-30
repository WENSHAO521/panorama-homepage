import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import HomePage from '@/pages/HomePage';
import JournalsPage from '@/pages/JournalsPage';
import BooksPage from '@/pages/BooksPage';
import ResearchPage from '@/pages/ResearchPage';
import AboutPage from '@/pages/AboutPage';
import AuthorGuidelinesPage from '@/pages/AuthorGuidelinesPage';
import ReviewerResourcesPage from '@/pages/ReviewerResourcesPage';
import PublicationEthicsPage from '@/pages/PublicationEthicsPage';
import OpenAccessPolicyPage from '@/pages/OpenAccessPolicyPage';
import './App.css';

function AppContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/author-guidelines" element={<AuthorGuidelinesPage />} />
          <Route path="/reviewer-resources" element={<ReviewerResourcesPage />} />
          <Route path="/publication-ethics" element={<PublicationEthicsPage />} />
          <Route path="/open-access-policy" element={<OpenAccessPolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
