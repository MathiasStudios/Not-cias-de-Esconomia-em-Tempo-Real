import React from 'react';
import { NewsData } from '../types';

interface NewsCardProps {
  data: NewsData;
}

const LinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);


const NewsCard: React.FC<NewsCardProps> = ({ data }) => {
  const { summary, sources } = data;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden my-6 transition-all duration-300 hover:shadow-2xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Resumo das Notícias</h2>
        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
          {summary}
        </p>
      </div>
      {sources && sources.length > 0 && (
        <div className="bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 border-t border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Fontes</h3>
          <ul className="space-y-2">
            {sources.map((source, index) => (
              source.web && (
                 <li key={index} className="flex items-start text-sm sm:text-base">
                    <LinkIcon />
                    <a 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 break-all"
                    >
                        {source.web.title || source.web.uri}
                    </a>
                 </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewsCard;