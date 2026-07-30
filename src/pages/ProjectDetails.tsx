import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import type { Project } from '../types/project';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t, tObject } = useLanguage();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await projectService.getProjectById(id);
        if (data) {
          setProject(data);
        } else {
          setError(language === 'ar' ? 'المشروع غير موجود.' : 'Project not found.');
        }
      } catch (err) {
        console.error('Error fetching project by id:', err);
        setError(language === 'ar' ? 'حدث خطأ أثناء تحميل المشروع.' : 'Error loading project.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, language]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="project-details-page-loading">
        <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--accent)' }}></i>
        <p style={{ marginTop: '1rem' }}>
          {language === 'ar' ? 'جاري تحميل تفاصيل المشروع...' : 'Loading project details...'}
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-details-page-error">
        <i className="fas fa-exclamation-triangle fa-3x" style={{ color: '#ff5f56', marginBottom: '1rem' }}></i>
        <h2>{error || 'Error'}</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          <i className="fas fa-arrow-left"></i> {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </button>
      </div>
    );
  }

  // Localized fields
  const rawTitle = tObject(project.title, 'Untitled');
  const title = typeof rawTitle === 'string' ? rawTitle : 'Untitled';

  const rawDesc = tObject(project.description, '');
  const description = typeof rawDesc === 'string' ? rawDesc : '';

  const rawFeats = tObject(project.features, []);
  const features = Array.isArray(rawFeats) ? (rawFeats as string[]) : [];

  const rawLang = tObject(project.languages, '');
  const languages = typeof rawLang === 'string' ? rawLang : '';

  const rawStatus = tObject(project.status, 'Active');
  const status = typeof rawStatus === 'string' ? rawStatus : 'Active';

  const rawTech = tObject(project.technologies, []);
  const techArray = Array.isArray(rawTech) ? (rawTech as string[]) : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const technologies = techArray.length > 0 ? techArray : tags;

  const images = project.imageUrls || [];

  // Exclude keys
  const excludedKeys = [
    'title', 'description', 'features', 'languages', 'imageUrls', 'status', 'icon', 'logo', 'order', 'tags', 'technologies', 'projectLinks', 'links', 'id', '1', '2', '3', '4', '5'
  ];

  const additionalMetadata: Array<{ label: string; value: string }> = [];
  Object.keys(project).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      let val = (project as any)[key];
      if (typeof val === 'object' && val !== null) {
        val = val[language] || val.en;
      }
      if (val && (typeof val === 'string' || typeof val === 'number')) {
        const transKey = `project-meta-${key.toLowerCase()}`;
        const translatedLabel = t(transKey as any);
        const displayLabel = translatedLabel !== transKey ? translatedLabel : key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        additionalMetadata.push({ label: displayLabel, value: String(val) });
      }
    }
  });

  const links = project.projectLinks || project.links;
  const appStoreUrl = links?.['Apple store'] || links?.appStore || links?.appleStore;
  const googlePlayUrl = links?.['Google play'] || links?.googlePlay;
  const githubUrl = links?.github || links?.GitHub;
  const webUrl = links?.web || links?.website || links?.live;

  const handleNextImage = () => {
    if (images.length > 0) {
      setActiveImgIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images.length > 0) {
      setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="project-details-page-wrapper">
      <Navbar />
      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="back-btn-container" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
          <button onClick={() => navigate('/')} className="btn back-to-home-btn">
            <i className={language === 'ar' ? 'fas fa-arrow-right' : 'fas fa-arrow-left'}></i>
            <span style={{ margin: language === 'ar' ? '0 0.5rem 0 0' : '0 0 0 0.5rem' }}>
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </span>
          </button>
        </div>
        {/* Full-Page Premium 2-Column Dashboard */}
        <div className="glass-card project-details-page-card">
          <div className="project-details-grid">
            
            {/* Left Column: Device Mockup Smartphone Screenshot Slider */}
            <div className="project-gallery-column">
              {images.length > 0 ? (
                <>
                  <div className="device-mockup-container">
                    <div className="device-dynamic-island"></div>
                    <div className="device-screen-slider" style={{ direction: 'ltr' }}>
                      <div 
                        className="device-slider-track"
                        style={{
                          display: 'flex',
                          width: `${images.length * 100}%`,
                          transform: `translateX(-${activeImgIndex * (100 / images.length)}%)`,
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          height: '100%'
                        }}
                      >
                        {images.map((img, idx) => (
                          <div 
                            key={idx} 
                            style={{ width: `${100 / images.length}%`, height: '100%', overflow: 'hidden' }}
                          >
                            <img
                              src={img}
                              alt={`Screenshot ${idx + 1}`}
                              onClick={() => window.open(img, '_blank')}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0b0f19', display: 'block', cursor: 'pointer' }}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {images.length > 1 && (
                        <>
                          <button className="slider-arrow prev" onClick={handlePrevImage}>
                            <i className="fas fa-chevron-left"></i>
                          </button>
                          <button className="slider-arrow next" onClick={handleNextImage}>
                            <i className="fas fa-chevron-right"></i>
                          </button>
                          
                          <div className="slider-dots">
                            {images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`slider-dot ${idx === activeImgIndex ? 'active' : ''}`}
                                onClick={() => setActiveImgIndex(idx)}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {images.length > 1 && (
                    <div className="details-thumbnails-gallery">
                      {images.map((url, idx) => (
                        <div 
                          key={idx} 
                          className={`thumbnail-wrapper ${idx === activeImgIndex ? 'active' : ''}`}
                          onClick={() => setActiveImgIndex(idx)}
                        >
                          <img src={url} alt={`Thumbnail ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="device-mockup-container fallback-mockup">
                  <div className="device-dynamic-island"></div>
                  <div className="fallback-icon-container">
                    <i className={project.icon || 'fas fa-rocket'}></i>
                  </div>
                </div>
              )}
              <p className="gallery-tip">
                {language === 'ar' ? '* انقر على لقطة الشاشة لفتحها بالكامل' : '* Click screenshot to view full size'}
              </p>
            </div>

            {/* Right Column: Detailed Project Info */}
            <div className="project-info-column">
              <div className="details-header-premium">
                {logoUrl(project) && (
                  <img
                    src={logoUrl(project)}
                    alt="Logo"
                    className="project-details-logo"
                  />
                )}
                <div>
                  <h2 className="gradient-text">{title}</h2>
                  <div className="project-header-badges">
                    {status && <span className="premium-badge status">{status}</span>}
                    {languages && <span className="premium-badge lang">{languages}</span>}
                  </div>
                </div>
              </div>

              <p className="project-desc-premium">{description}</p>

              {technologies.length > 0 && (
                <div className="modal-tech-tags-premium">
                  {technologies.map((tech, idx) => (
                    <span key={idx} className="tag-premium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {features.length > 0 && (
                <div className="features-section-premium">
                  <h4 className="details-features-title-premium">{t('project-details-features')}</h4>
                  <div className="features-list-premium">
                    {features.map((feature, idx) => (
                      <div key={idx} className="feature-item-premium">
                        <i className="fas fa-circle-check"></i> <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {additionalMetadata.length > 0 && (
                <div className="details-meta-grid-premium">
                  {additionalMetadata.map((meta, idx) => (
                    <div key={idx} className="meta-card">
                      <span className="meta-card-label">{meta.label}</span>
                      <span className="meta-card-value">{meta.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {(appStoreUrl || googlePlayUrl || githubUrl || webUrl) && (
                <div className="details-links-premium">
                  {appStoreUrl && (
                    <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="premium-link-btn appstore">
                      <i className="fab fa-apple"></i> App Store
                    </a>
                  )}
                  {googlePlayUrl && (
                    <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="premium-link-btn googleplay">
                      <i className="fab fa-google-play"></i> Google Play
                    </a>
                  )}
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="premium-link-btn github">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  )}
                  {webUrl && (
                    <a href={webUrl} target="_blank" rel="noopener noreferrer" className="premium-link-btn web">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to resolve logo
function logoUrl(project: Project): string | undefined {
  if (typeof project.languages === 'object' && project.languages !== null && (project.languages as any).logo) {
    return (project.languages as any).logo;
  }
  return project.logo;
}
export default ProjectDetails;
