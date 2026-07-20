import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <span className="logo-text">Mai.Dev</span>
          <span className="logo-accent">.</span>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/mai312ahmed" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/mai-ahmed-21209b155/" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="footer-copyright">{t('footer-text')}</p>
      </div>
    </footer>
  );
};
export default Footer;
