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
  const [techEn, setTechEn] = useState('');
  const [techAr, setTechAr] = useState('');
  const [order, setOrder] = useState<number | ''>('');
  const [logo, setLogo] = useState('');
  const [imageUrls, setImageUrls] = useState('');
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
    
    // Technologies
    const techs = project.technologies || {};
    setTechEn(typeof techs === 'object' && 'en' in techs ? (techs.en as string[]).join(', ') : (project.tags || []).join(', '));
    setTechAr(typeof techs === 'object' && 'ar' in techs ? (techs.ar as string[]).join(', ') : '');
    
    setOrder(project.order ?? '');
    setLogo(project.logo || '');
    setImageUrls((project.imageUrls || []).join(', '));
    
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
    setTechEn('');
    setTechAr('');
    setOrder('');
    setLogo('');
    setImageUrls('');
    setAppStore('');
    setGooglePlay('');
    setGithub('');
    setWeb('');
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
      technologies: {
        en: techEn.split(',').map((t) => t.trim()).filter((t) => t),
        ar: techAr.split(',').map((t) => t.trim()).filter((t) => t),
      },
      order: order === '' ? 0 : Number(order),
      logo: logo,
      imageUrls: imageUrls.split(',').map((url) => url.trim()).filter((url) => url),
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
            <div className="form-group">
              <label>Title (English)</label>
              <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Title (Arabic)</label>
              <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label>Description (English)</label>
              <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={3} required></textarea>
            </div>
            <div className="form-group">
              <label>Description (Arabic)</label>
              <textarea value={descAr} onChange={(e) => setDescAr(e.target.value)} rows={3} required></textarea>
            </div>

            <div className="form-group">
              <label>Status (English)</label>
              <input type="text" value={statusEn} onChange={(e) => setStatusEn(e.target.value)} placeholder="e.g. Active, Published" />
            </div>
            <div className="form-group">
              <label>Status (Arabic)</label>
              <input type="text" value={statusAr} onChange={(e) => setStatusAr(e.target.value)} placeholder="مثال: نشط، منشور" />
            </div>

            <div className="form-group">
              <label>Technologies (English - Comma Separated)</label>
              <input type="text" value={techEn} onChange={(e) => setTechEn(e.target.value)} placeholder="Flutter, Dart, Firebase" />
            </div>
            <div className="form-group">
              <label>Technologies (Arabic - Comma Separated)</label>
              <input type="text" value={techAr} onChange={(e) => setTechAr(e.target.value)} placeholder="فلاتر، دارت، فايربيز" />
            </div>

            <div className="form-group">
              <label>Sort Order</label>
              <input type="number" value={order} onChange={(e) => setOrder(e.target.value === '' ? '' : Number(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Logo URL</label>
              <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Image URLs (Comma Separated)</label>
              <input type="text" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} placeholder="http://url1.com, http://url2.com" />
            </div>

            <div className="form-group">
              <label>App Store URL</label>
              <input type="text" value={appStore} onChange={(e) => setAppStore(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Google Play URL</label>
              <input type="text" value={googlePlay} onChange={(e) => setGooglePlay(e.target.value)} />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Website URL</label>
              <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
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
