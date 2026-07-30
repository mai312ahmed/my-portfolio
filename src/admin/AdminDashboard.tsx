import React, { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { messageService } from '../services/messageService';
import type { Project } from '../types/project';
import type { ContactMessage } from '../types/message';

export const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [statusEn, setStatusEn] = useState('');
  const [statusAr, setStatusAr] = useState('');
  const [clientEn, setClientEn] = useState('');
  const [clientAr, setClientAr] = useState('');
  const [languagesEn, setLanguagesEn] = useState('');
  const [languagesAr, setLanguagesAr] = useState('');

  // Features (Arrays of strings)
  const [featuresEn, setFeaturesEn] = useState<string[]>([]);
  const [featuresAr, setFeaturesAr] = useState<string[]>([]);
  const [newFeatureEn, setNewFeatureEn] = useState('');
  const [newFeatureAr, setNewFeatureAr] = useState('');

  // Technologies (Arrays of strings)
  const [techEn, setTechEn] = useState<string[]>([]);
  const [techAr, setTechAr] = useState<string[]>([]);
  const [newTechEn, setNewTechEn] = useState('');
  const [newTechAr, setNewTechAr] = useState('');

  // Order & Logo
  const [order, setOrder] = useState<number | ''>('');
  const [logo, setLogo] = useState('');

  // Image URLs List
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Social / Store Links
  const [appStore, setAppStore] = useState('');
  const [googlePlay, setGooglePlay] = useState('');
  const [github, setGithub] = useState('');
  const [web, setWeb] = useState('');

  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoadingProjects(true);
      const projData = await projectService.getProjects();
      setProjects(projData);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoadingProjects(false);
    }

    try {
      setLoadingMessages(true);
      const msgData = await messageService.getMessages();
      setMessages(msgData);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setTitleEn(typeof project.title === 'object' ? project.title.en : project.title || '');
    setTitleAr(typeof project.title === 'object' ? project.title.ar : '');
    setDescEn(typeof project.description === 'object' ? project.description.en : project.description || '');
    setDescAr(typeof project.description === 'object' ? project.description.ar : '');
    setStatusEn(typeof project.status === 'object' ? project.status.en : project.status || '');
    setStatusAr(typeof project.status === 'object' ? project.status.ar : '');
    
    // Client
    const clientVal = project.client as any;
    setClientEn(typeof clientVal === 'object' && clientVal !== null ? clientVal.en || '' : typeof project.client === 'string' ? project.client : '');
    setClientAr(typeof clientVal === 'object' && clientVal !== null ? clientVal.ar || '' : '');

    // Supported Languages
    const langVal = project.languages as any;
    setLanguagesEn(typeof langVal === 'object' && langVal !== null ? langVal.en || '' : typeof project.languages === 'string' ? project.languages : '');
    setLanguagesAr(typeof langVal === 'object' && langVal !== null ? langVal.ar || '' : '');

    // Key Features
    const feats = (project.features || {}) as any;
    if (typeof feats === 'object' && !Array.isArray(feats)) {
      setFeaturesEn(Array.isArray(feats.en) ? feats.en : []);
      setFeaturesAr(Array.isArray(feats.ar) ? feats.ar : []);
    } else if (Array.isArray(feats)) {
      setFeaturesEn(feats as string[]);
      setFeaturesAr([]);
    } else {
      setFeaturesEn([]);
      setFeaturesAr([]);
    }

    // Technologies
    const techs = (project.technologies || {}) as any;
    if (typeof techs === 'object' && !Array.isArray(techs)) {
      setTechEn(Array.isArray(techs.en) ? techs.en : []);
      setTechAr(Array.isArray(techs.ar) ? techs.ar : []);
    } else if (Array.isArray(techs)) {
      setTechEn(techs as string[]);
      setTechAr([]);
    } else {
      setTechEn(project.tags || []);
      setTechAr([]);
    }

    setOrder(project.order ?? '');
    setLogo(project.logo || '');
    setImagesList(project.imageUrls || []);
    
    const links = project.projectLinks || project.links || {};
    setAppStore(links['Apple store'] || links.appStore || links.appleStore || '');
    setGooglePlay(links['Google play'] || links.googlePlay || '');
    setGithub(links.github || links.GitHub || '');
    setWeb(links.web || links.website || links.live || '');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitleEn('');
    setTitleAr('');
    setDescEn('');
    setDescAr('');
    setStatusEn('');
    setStatusAr('');
    setClientEn('');
    setClientAr('');
    setLanguagesEn('');
    setLanguagesAr('');
    setFeaturesEn([]);
    setFeaturesAr([]);
    setNewFeatureEn('');
    setNewFeatureAr('');
    setTechEn([]);
    setTechAr([]);
    setNewTechEn('');
    setNewTechAr('');
    setOrder('');
    setLogo('');
    setImagesList([]);
    setNewImageUrl('');
    setAppStore('');
    setGooglePlay('');
    setGithub('');
    setWeb('');
  };

  // Helper Add / Remove functions for tags & images
  const handleAddFeatureEn = () => {
    const trimmed = newFeatureEn.trim();
    if (trimmed) {
      const items = trimmed.split(',').map((s) => s.trim()).filter((s) => s);
      setFeaturesEn([...featuresEn, ...items]);
      setNewFeatureEn('');
    }
  };

  const handleAddFeatureAr = () => {
    const trimmed = newFeatureAr.trim();
    if (trimmed) {
      const items = trimmed.split(',').map((s) => s.trim()).filter((s) => s);
      setFeaturesAr([...featuresAr, ...items]);
      setNewFeatureAr('');
    }
  };

  const handleAddTechEn = () => {
    const trimmed = newTechEn.trim();
    if (trimmed) {
      const items = trimmed.split(',').map((s) => s.trim()).filter((s) => s);
      setTechEn([...techEn, ...items]);
      setNewTechEn('');
    }
  };

  const handleAddTechAr = () => {
    const trimmed = newTechAr.trim();
    if (trimmed) {
      const items = trimmed.split(',').map((s) => s.trim()).filter((s) => s);
      setTechAr([...techAr, ...items]);
      setNewTechAr('');
    }
  };

  const handleAddImage = () => {
    const trimmed = newImageUrl.trim();
    if (trimmed) {
      const urls = trimmed.split(',').map((u) => u.trim()).filter((u) => u);
      setImagesList([...imagesList, ...urls]);
      setNewImageUrl('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const projectData = {
      title: {
        en: titleEn,
        ar: titleAr,
      },
      description: {
        en: descEn,
        ar: descAr,
      },
      status: {
        en: statusEn,
        ar: statusAr,
      },
      client: {
        en: clientEn,
        ar: clientAr,
      },
      languages: {
        en: languagesEn,
        ar: languagesAr,
      },
      features: {
        en: featuresEn,
        ar: featuresAr,
      },
      technologies: {
        en: techEn,
        ar: techAr,
      },
      order: order === '' ? 0 : Number(order),
      logo: logo,
      imageUrls: imagesList,
      projectLinks: {
        'Apple store': appStore,
        'Google play': googlePlay,
        github: github,
        web: web,
      },
    };

    try {
      if (editingId) {
        await projectService.updateProject(editingId, projectData);
        alert('Project updated successfully!');
      } else {
        await projectService.addProject(projectData);
        alert('Project added successfully!');
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      try {
        await projectService.deleteProject(id);
        loadData();
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Error deleting project');
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      try {
        await messageService.deleteMessage(id);
        loadData();
      } catch (err) {
        console.error('Error deleting message:', err);
        alert('Error deleting message');
      }
    }
  };

  return (
    <div style={{ padding: '80px 2rem 3rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      {/* Edit Form */}
      <div className="glass-card" style={{ marginBottom: '3rem', padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="contact-form" id="project-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Title */}
            <div className="form-group">
              <label>Title (English)</label>
              <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Title (Arabic)</label>
              <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
            </div>
            
            {/* Description */}
            <div className="form-group">
              <label>Description (English)</label>
              <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={3} required></textarea>
            </div>
            <div className="form-group">
              <label>Description (Arabic)</label>
              <textarea value={descAr} onChange={(e) => setDescAr(e.target.value)} rows={3} required></textarea>
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status (English)</label>
              <input type="text" value={statusEn} onChange={(e) => setStatusEn(e.target.value)} placeholder="e.g. Completed, Active" />
            </div>
            <div className="form-group">
              <label>Status (Arabic)</label>
              <input type="text" value={statusAr} onChange={(e) => setStatusAr(e.target.value)} placeholder="مثال: منتهي، قيد التطوير" />
            </div>

            {/* Client */}
            <div className="form-group">
              <label>Client (English)</label>
              <input type="text" value={clientEn} onChange={(e) => setClientEn(e.target.value)} placeholder="e.g. Saudi client via Morph company" />
            </div>
            <div className="form-group">
              <label>Client (Arabic - الكلاينت)</label>
              <input type="text" value={clientAr} onChange={(e) => setClientAr(e.target.value)} placeholder="مثال: عميل سعودي عبر شركة مورف" />
            </div>

            {/* Supported Languages */}
            <div className="form-group">
              <label>Supported Languages (English)</label>
              <input type="text" value={languagesEn} onChange={(e) => setLanguagesEn(e.target.value)} placeholder="e.g. Supports Arabic, English" />
            </div>
            <div className="form-group">
              <label>Supported Languages (Arabic - اللغات المدعومة)</label>
              <input type="text" value={languagesAr} onChange={(e) => setLanguagesAr(e.target.value)} placeholder="مثال: يدعم العربية والإنجليزية" />
            </div>

            {/* Technologies Tag Bubble Manager */}
            <div className="form-group">
              <label>Technologies / Tools (English)</label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={newTechEn}
                  onChange={(e) => setNewTechEn(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTechEn(); } }}
                  placeholder="Type technology & press Add or Enter..."
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddTechEn}>Add</button>
              </div>
              <div className="tag-bubbles-wrapper">
                {techEn.length === 0 && <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>No technologies added.</span>}
                {techEn.map((t, idx) => (
                  <span key={idx} className="admin-tag-bubble">
                    {t}
                    <button type="button" className="admin-tag-remove" onClick={() => setTechEn(techEn.filter((_, i) => i !== idx))}>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Technologies / Tools (Arabic - التولز المستخدمة)</label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={newTechAr}
                  onChange={(e) => setNewTechAr(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTechAr(); } }}
                  placeholder="اكتب الأداة واضغط إضافة..."
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddTechAr}>إضافة</button>
              </div>
              <div className="tag-bubbles-wrapper">
                {techAr.length === 0 && <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>لا توجد أدوات مضافة.</span>}
                {techAr.map((t, idx) => (
                  <span key={idx} className="admin-tag-bubble">
                    {t}
                    <button type="button" className="admin-tag-remove" onClick={() => setTechAr(techAr.filter((_, i) => i !== idx))}>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features Tag Bubble Manager */}
            <div className="form-group">
              <label>Key Features (English)</label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={newFeatureEn}
                  onChange={(e) => setNewFeatureEn(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeatureEn(); } }}
                  placeholder="Type feature & press Add or Enter..."
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddFeatureEn}>Add</button>
              </div>
              <div className="tag-bubbles-wrapper">
                {featuresEn.length === 0 && <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>No features added.</span>}
                {featuresEn.map((f, idx) => (
                  <span key={idx} className="admin-tag-bubble">
                    {f}
                    <button type="button" className="admin-tag-remove" onClick={() => setFeaturesEn(featuresEn.filter((_, i) => i !== idx))}>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Key Features (Arabic - المميزات)</label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={newFeatureAr}
                  onChange={(e) => setNewFeatureAr(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeatureAr(); } }}
                  placeholder="اكتب الميزة واضغط إضافة..."
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddFeatureAr}>إضافة</button>
              </div>
              <div className="tag-bubbles-wrapper">
                {featuresAr.length === 0 && <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>لا توجد مميزات مضافة.</span>}
                {featuresAr.map((f, idx) => (
                  <span key={idx} className="admin-tag-bubble">
                    {f}
                    <button type="button" className="admin-tag-remove" onClick={() => setFeaturesAr(featuresAr.filter((_, i) => i !== idx))}>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sort Order & Logo */}
            <div className="form-group">
              <label>Sort Order</label>
              <input type="number" value={order} onChange={(e) => setOrder(e.target.value === '' ? '' : Number(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Logo URL</label>
              <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://..." />
            </div>
            
            {/* Image URLs Thumbnail Manager */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent)' }}>
                Project Images (إضافة الصور - معاينة مصغرة وإمكانية الحذف)
              </label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                  placeholder="Paste Image URL here (or multiple separated by commas) and press Add..."
                />
                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddImage}>
                  <i className="fas fa-plus"></i> Add Image
                </button>
              </div>
              
              <div className="admin-thumbnails-grid">
                {imagesList.length === 0 ? (
                  <p style={{ opacity: 0.5, gridColumn: '1 / -1', fontSize: '0.9rem' }}>No image URLs added yet.</p>
                ) : (
                  imagesList.map((url, idx) => (
                    <div key={idx} className="admin-thumbnail-card">
                      <img src={url} alt={`Preview ${idx + 1}`} className="admin-thumbnail-img" onError={(e) => { (e.target as HTMLElement).style.opacity = '0.3'; }} />
                      <div className="admin-thumbnail-info">{url}</div>
                      <button
                        type="button"
                        className="admin-thumbnail-delete"
                        title="Delete Image"
                        onClick={() => setImagesList(imagesList.filter((_, i) => i !== idx))}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Links */}
            <div className="form-group">
              <label>App Store URL</label>
              <input type="text" value={appStore} onChange={(e) => setAppStore(e.target.value)} placeholder="https://apps.apple.com/..." />
            </div>
            <div className="form-group">
              <label>Google Play URL</label>
              <input type="text" value={googlePlay} onChange={(e) => setGooglePlay(e.target.value)} placeholder="https://play.google.com/..." />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div className="form-group">
              <label>Website URL</label>
              <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
        {/* Projects List */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Projects</h2>
          {loadingProjects ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((p) => {
                const title = typeof p.title === 'object' ? p.title.en : p.title || 'No Title';
                return (
                  <div key={p.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', padding: '1rem', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {p.logo && <img src={p.logo} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />}
                      <div>
                        <strong>{title}</strong>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Order: {p.order}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEditClick(p)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-secondary btn-sm" style={{ color: '#ff5f56' }} onClick={() => handleDeleteProject(p.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Messages List */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Contact Messages</h2>
          {loadingMessages ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {messages.map((m) => {
                const date = m.timestamp ? new Date(m.timestamp.seconds * 1000).toLocaleString() : 'Recent';
                return (
                  <div key={m.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong>{m.name}</strong> <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({m.email})</span>
                        <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{date}</div>
                      </div>
                      <button className="btn btn-secondary btn-sm" style={{ color: '#ff5f56' }} onClick={() => handleDeleteMessage(m.id!)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Subject: {m.subject || 'No Subject'}</div>
                    <div style={{ fontSize: '0.95rem', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
                      {m.message}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
