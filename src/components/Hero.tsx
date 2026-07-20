import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector('#projects');
    if (targetElement) {
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <p 
            className="greeting" 
            dangerouslySetInnerHTML={{ __html: t('hero-greeting') }}
          />
          <h1 
            className="hero-title" 
            dangerouslySetInnerHTML={{ __html: t('hero-title') }}
          />
          <p className="hero-subtitle">{t('hero-subtitle')}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary" onClick={handleScrollToProjects}>
              {t('view-work')}
            </a>
            <a href="https://github.com/mai312ahmed" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-card main-card">
            <div className="card-header">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>
            <div className="code-snippet">
              <pre>
                <code>
                  <span className="keyword">class</span> <span className="class-name">Developer</span> <span className="keyword">extends</span> <span className="class-name">Human</span> {'{\n'}
                  {'  '}<span className="type">String</span> role = <span className="string">'Flutter Engineer'</span>;{'\n'}
                  {'  '}<span className="type">List</span>&lt;<span className="type">String</span>&gt; skills = [{'\n'}
                  {'    '}<span className="string">'Dart'</span>, <span className="string">'Flutter'</span>,{'\n'}
                  {'    '}<span className="string">'Firebase'</span>, <span className="string">'UI/UX'</span>{'\n'}
                  {'  '}];{'\n'}
                  {'  '}{'\n'}
                  {'  '}<span className="type">void</span> <span className="function">innovate</span>() {'{\n'}
                  {'    '}<span className="keyword">while</span>(alive) {'{\n'}
                  {'      '}code();{'\n'}
                  {'      '}coffee();{'\n'}
                  {'    }\n'}
                  {'  }\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
          {/* Floating elements for visual interest */}
          <div className="floating-icon flutter-icon">
            <i className="fa-brands fa-flutter"></i>
          </div>
          <div className="floating-icon dart-icon">Dart</div>
        </div>
      </div>
    </section>
  );
};
