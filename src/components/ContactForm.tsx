import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { messageService } from '../services/messageService';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await messageService.addMessage({ name, email, subject, message });
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Inline styles to match old styling behavior dynamically
  const buttonStyle: React.CSSProperties = {
    background: status === 'success' 
      ? 'linear-gradient(135deg, #27C93F, #20a633)' 
      : status === 'error' 
        ? '#ff5f56' 
        : '',
    opacity: status === 'submitting' ? 0.8 : 1,
    transition: 'background 0.3s ease, opacity 0.3s ease'
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <div className="section-line mx-auto"></div>
          <p className="section-subtitle">{t('contact-subtitle')}</p>
        </div>

        <div className="contact-container glass-card">
          <div className="contact-info">
            <h3 className="contact-heading">{t('contact-heading')}</h3>
            <p className="contact-text">{t('contact-text')}</p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-envelope"></i></div>
                <div className="method-details">
                  <h4>{t('contact-email-lbl')}</h4>
                  <p><a href="mailto:mai96oda@gmail.com">mai96oda@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="method-details">
                  <h4>{t('contact-phone-lbl')}</h4>
                  <p>+971 56 698 2496</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="method-details">
                  <h4>{t('contact-loc-lbl')}</h4>
                  <p>Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('form-name-ph')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder={t('form-email-ph')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('form-subject-ph')}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={status === 'submitting'}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder={t('form-msg-ph')}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={buttonStyle}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' && (
                  <>
                    {t('contact-sending')} <i className="fas fa-spinner fa-spin"></i>
                  </>
                )}
                {status === 'success' && (
                  <>
                    {t('contact-sent')} <i className="fas fa-check"></i>
                  </>
                )}
                {status === 'error' && (
                  <>
                    {t('contact-error')} <i className="fas fa-times"></i>
                  </>
                )}
                {status === 'idle' && (
                  <>
                    {t('contact-send')} <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactForm;
