import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('skills-title') }} />
          <div className="section-line mx-auto"></div>
          <p className="section-subtitle">{t('skills-subtitle')}</p>
        </div>

        <div className="skills-grid">
          {/* Skill Category 1 */}
          <div className="skill-category glass-card">
            <h3 className="category-title">
              <i className="fa-brands fa-flutter accent-icon"></i> {t('skills-core')}
            </h3>
            <ul className="skill-list">
              <li>
                <div className="skill-info">
                  <span>Flutter</span>
                  <span>90%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '90%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>Dart</span>
                  <span>85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '85%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>State Management (Bloc/Provider)</span>
                  <span>80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </li>
            </ul>
          </div>

          {/* Skill Category 2 */}
          <div className="skill-category glass-card">
            <h3 className="category-title">
              <i className="fas fa-database accent-icon"></i> {t('skills-backend')}
            </h3>
            <ul className="skill-list">
              <li>
                <div className="skill-info">
                  <span>Firebase</span>
                  <span>80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>REST APIs</span>
                  <span>80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>Hive / Local Storage</span>
                  <span>80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </li>
            </ul>
          </div>

          {/* Skill Category 3 */}
          <div className="skill-category glass-card">
            <h3 className="category-title">
              <i className="fas fa-tools accent-icon"></i> {t('skills-tools')}
            </h3>
            <ul className="skill-list">
              <li>
                <div className="skill-info">
                  <span>Git / GitHub</span>
                  <span>80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>Figma / UI Design</span>
                  <span>85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '85%' }}></div>
                </div>
              </li>
              <li>
                <div className="skill-info">
                  <span>CI/CD</span>
                  <span>50%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '50%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
