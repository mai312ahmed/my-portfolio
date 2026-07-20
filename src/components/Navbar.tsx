import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Navbar scroll effect
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active nav link on scroll
      const sections = document.querySelectorAll('section');
      const navHeight = 80;
      let currentSection = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight - 120;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          if (id) currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run immediately to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomePage) {
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/', { replace: true });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = scrolled ? 70 : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
        navigate(targetId, { replace: true });
      }
    } else {
      // Navigate to homepage with section hash, replacing current history entry
      const targetPath = targetId === '#' ? '/' : `/${targetId}`;
      navigate(targetPath, { replace: true });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href={isHomePage ? '#' : '/'} className="logo" onClick={(e) => handleNavLinkClick(e, '#')}>
          <span className="logo-text">Mai.Dev</span>
          <span className="logo-accent">.</span>
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
          <li>
            <a
              href={isHomePage ? '#home' : '/#home'}
              className={isHomePage && activeSection === 'home' ? 'active' : ''}
              onClick={(e) => handleNavLinkClick(e, '#home')}
            >
              {t('nav-home')}
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#about' : '/#about'}
              className={isHomePage && activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavLinkClick(e, '#about')}
            >
              {t('nav-about')}
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#projects' : '/#projects'}
              className={isHomePage && activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => handleNavLinkClick(e, '#projects')}
            >
              {t('nav-work')}
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#skills' : '/#skills'}
              className={isHomePage && activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => handleNavLinkClick(e, '#skills')}
            >
              {t('nav-skills')}
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#experience' : '/#experience'}
              className={isHomePage && activeSection === 'experience' ? 'active' : ''}
              onClick={(e) => handleNavLinkClick(e, '#experience')}
            >
              {t('nav-experience')}
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#contact' : '/#contact'}
              className="btn btn-outline"
              onClick={(e) => handleNavLinkClick(e, '#contact')}
            >
              {t('nav-talk')}
            </a>
          </li>
          <li>
            <button 
              id="lang-switch" 
              className="lang-btn" 
              onClick={toggleLanguage}
              style={{ margin: language === 'ar' ? '0 1rem 0 0' : '0 0 0 1rem' }}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
          </li>
        </ul>

        <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
