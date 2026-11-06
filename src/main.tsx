import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MotionProvider } from './motion/MotionProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

const rootElement = document.getElementById('root');

if (import.meta.env.DEV) {
  import('./data/validator').then(({ validatePortfolioData }) => {
    const result = validatePortfolioData();
    if (!result.isValid) {
      console.error('[Portfolio Data Validation Failed]', result.errors);
    } else {
      console.info('[Portfolio Data Validated]', result.stats);
    }
  });
}

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LanguageProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </LanguageProvider>
    </React.StrictMode>
  );
}

