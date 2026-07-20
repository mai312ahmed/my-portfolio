import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects, loading, error } = useProjects();

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('projects-title') }} />
          <div className="section-line mx-auto"></div>
          <p className="section-subtitle">{t('projects-subtitle')}</p>
        </div>

        {loading ? (
          <div className="loading-spinner" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--accent)' }}></i>
            <p style={{ marginTop: '1rem' }}>{t('projects-loading')}</p>
          </div>
        ) : error ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#ff5f56' }}>{t('projects-error')}</p>
        ) : projects.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>{t('projects-empty')}</p>
        ) : (
          <div className="projects-grid" id="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-4" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://github.com/mai312ahmed" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            {t('view-more-github')}
          </a>
        </div>
      </div>
    </section>
  );
};
export default Projects;
