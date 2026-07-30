import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const { language, tObject } = useLanguage();

  // Localized properties
  const rawTitle = tObject(project.title, 'Untitled');
  const title = typeof rawTitle === 'string' ? rawTitle : 'Untitled';

  const rawDesc = tObject(project.description, '');
  const description = typeof rawDesc === 'string' ? rawDesc : '';

  const rawStatus = tObject(project.status, '');
  const statusText = typeof rawStatus === 'string' ? rawStatus : '';

  const rawLang = project.languages ? tObject(project.languages, '') : '';
  const languagesText = typeof rawLang === 'string' ? rawLang : '';
  
  const rawTechArray = tObject(project.technologies, []);
  const techArray = Array.isArray(rawTechArray) ? (rawTechArray as string[]) : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const technologies = techArray.length > 0 ? techArray : tags;

  // Resolve thumbnail content
  const logoUrl = project.logo;
  const firstScreenshot = project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls[0] : null;

  let thumbContent = (
    <div className="project-placeholder">
      <i className={project.icon || 'fas fa-rocket'}></i>
    </div>
  );

  if (logoUrl && typeof logoUrl === 'string') {
    thumbContent = (
      <div className="project-placeholder logo-container">
        <img src={logoUrl} alt={title} className="project-logo-small" />
      </div>
    );
  } else if (firstScreenshot) {
    thumbContent = (
      <img 
        src={firstScreenshot} 
        alt={title} 
        className="project-img-real" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    );
  }

  // Links overlay
  const links = project.projectLinks || project.links;
  const appStoreUrl = links?.['Apple store'] || links?.appStore || links?.appleStore;
  const googlePlayUrl = links?.['Google play'] || links?.googlePlay;
  const githubUrl = links?.github || links?.GitHub;

  return (
    <div 
      className="project-card glass-card"
      onClick={() => navigate(`/project/${project.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="project-image">
        {thumbContent}
        {statusText && <div className="project-status-badge">{statusText}</div>}
        <div className="project-links-overlay" onClick={(e) => e.stopPropagation()}>
          {appStoreUrl && (
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fab fa-apple"></i>
            </a>
          )}
          {googlePlayUrl && (
            <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fab fa-google-play"></i>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">
          {description.substring(0, 100)}
          {description.length > 100 ? '...' : ''}
        </p>
        {languagesText && (
          <div style={{ marginBottom: '0.8rem' }}>
            <span className="project-platform-badge">{languagesText}</span>
          </div>
        )}
        <div className="project-tags">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tag">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="tag-more">
              +{technologies.length - 4}
            </span>
          )}
        </div>
        <button 
          className="view-details-btn" 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${project.id}`);
          }}
        >
          <span>{language === 'ar' ? 'عرض التفاصيل' : 'See Details'}</span>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
