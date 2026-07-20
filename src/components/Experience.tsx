import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
          <div className="section-line mx-auto"></div>
        </div>

        <div className="experience-timeline">
          {/* Job 1 */}
          <div className="timeline-item glass-card">
            <div className="timeline-date">{t('exp-gtg-date')}</div>
            <div className="timeline-content">
              <h3>{t('exp-gtg-title')}</h3>
              <h4>{t('exp-gtg-company')}</h4>
              <ul>
                <li>{t('exp-gtg-task1')}</li>
                <li>{t('exp-gtg-task2')}</li>
                <li>{t('exp-gtg-task3')}</li>
                <li>{t('exp-gtg-task4')}</li>
              </ul>
            </div>
          </div>

          {/* Job 2 */}
          <div className="timeline-item glass-card">
            <div className="timeline-date">{t('exp-morph-date')}</div>
            <div className="timeline-content">
              <h3>{t('exp-morph-title')}</h3>
              <h4>{t('exp-morph-company')}</h4>
              <ul>
                <li>{t('exp-morph-task1')}</li>
                <li>{t('exp-morph-task2')}</li>
                <li>{t('exp-morph-task3')}</li>
                <li>{t('exp-morph-task4')}</li>
              </ul>
            </div>
          </div>

          {/* Job 3 */}
          <div className="timeline-item glass-card">
            <div className="timeline-date">{t('exp-free-date')}</div>
            <div className="timeline-content">
              <h3>{t('exp-free-title')}</h3>
              <h4>Freelance</h4>
              <ul>
                <li>{t('exp-free-task1')}</li>
                <li>{t('exp-free-task2')}</li>
                <li>{t('exp-free-task3')}</li>
                <li>{t('exp-free-task4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
