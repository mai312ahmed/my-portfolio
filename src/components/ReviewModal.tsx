import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (review: { writer: string; rating: number; content: string }) => Promise<void>;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onSubmit }) => {
  const { t } = useLanguage();
  const [writer, setWriter] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      await onSubmit({ writer, rating, content });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <div id="review-modal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content glass-card">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2 dangerouslySetInnerHTML={{ __html: t('modal-title') }} />
        
        <form onSubmit={handleSubmit} className="contact-form mt-4">
          <div className="form-group">
            <input
              type="text"
              placeholder={t('form-name-ph')}
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              required
              disabled={submitting || success}
            />
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>
              {t('rating-label')}
            </label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((val) => (
                <i
                  key={val}
                  className={val <= rating ? 'fas fa-star' : 'far fa-star'}
                  onClick={() => !submitting && !success && setRating(val)}
                  style={{ color: '#FFD700', cursor: submitting || success ? 'default' : 'pointer' }}
                ></i>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <textarea
              placeholder={t('form-review-ph')}
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={submitting || success}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={submitting || success}
          >
            {success ? (
              <>
                {t('form-saved')} <i className="fas fa-check"></i>
              </>
            ) : submitting ? (
              <>
                {t('form-saving')} <i className="fas fa-spinner fa-spin"></i>
              </>
            ) : error ? (
              <>
                {t('contact-error')} <i className="fas fa-times"></i>
              </>
            ) : (
              <>
                {t('submit-review')} <i className="fas fa-paper-plane"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ReviewModal;
