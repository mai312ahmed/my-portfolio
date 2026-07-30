import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('about-summary-title') }} />
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3 className="about-tagline" dangerouslySetInnerHTML={{ __html: t('about-tagline') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about-p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about-p2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about-p3') }} />

            <div className="about-grid">
              <div className="value-prop-card">
                <div className="value-icon"><i className="fas fa-layer-group"></i></div>
                <h3>{t('about-value-1-title')}</h3>
                <p>{t('about-value-1-desc')}</p>
              </div>
              <div className="value-prop-card">
                <div className="value-icon"><i className="fas fa-plug"></i></div>
                <h3>{t('about-value-2-title')}</h3>
                <p>{t('about-value-2-desc')}</p>
              </div>
              <div className="value-prop-card">
                <div className="value-icon"><i className="fas fa-bolt"></i></div>
                <h3>{t('about-value-3-title')}</h3>
                <p>{t('about-value-3-desc')}</p>
              </div>
              <div className="value-prop-card">
                <div className="value-icon"><i className="fas fa-rocket"></i></div>
                <h3>{t('about-value-4-title')}</h3>
                <p>{t('about-value-4-desc')}</p>
              </div>
            </div>
          </div>
          
          <div className="about-image-container">
            <div className="image-wrapper small-avatar">
              <img src={`${import.meta.env.BASE_URL}assets/mai-avatar.png`} alt="Mai Abdalla" />
              <div className="experience-badge">
                <i className="fa-brands fa-flutter flutter-icon-badge"></i>
                <span>Flutter Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
