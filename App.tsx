import React, { useState, useEffect, useCallback } from 'react';
import { fetchEconomicNews } from './services/geminiService';
import { NewsData } from './types';
import NewsCard from './components/NewsCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("Brasil");

  const getNews = useCallback(async (currentQuery: string) => {
    setIsLoading(true);
    setError(null);
    setNewsData(null);
    try {
      const data = await fetchEconomicNews(currentQuery);
      setNewsData(data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getNews(query);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch on initial load only

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    getNews(newQuery);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Notícias de Economia
                </h1>
            </div>
            <p className="text-gray-500 mt-1">Informações atualizadas com a tecnologia Gemini.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} initialQuery={query} />
        </div>
        
        {isLoading && <Loader />}
        {error && <ErrorDisplay message={error} />}
        {newsData && <NewsCard data={newsData} />}
      </main>

      <footer className="text-center py-6 px-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Notícias de Economia. Desenvolvido com React e Gemini.</p>
      </footer>
    </div>
  );
};

export default App;