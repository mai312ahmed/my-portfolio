import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTestimonials } from '../hooks/useTestimonials';
import { ReviewModal } from './ReviewModal';

export const Testimonials: React.FC = () => {
  const { language, t, tObject } = useLanguage();
  const { testimonials, loading, error, addTestimonial } = useTestimonials();
  
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewText, setSelectedReviewText] = useState<{ content: string; writer: string; rating: number } | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<any>(null);

  // Auto Scroll Logic
  const startAutoScroll = () => {
    const grid = gridRef.current;
    if (!grid || testimonials.length === 0) return;

    // Clear any previous interval
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    scrollIntervalRef.current = setInterval(() => {
      grid.scrollLeft += 1;
      
      // Loop back to start
      if (grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1) {
        grid.scrollLeft = 0;
      }
    }, 50); // Speed
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!loading && testimonials.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [loading, testimonials]);

  const handleMouseEnter = () => {
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    startAutoScroll();
  };

  const handleReviewSubmit = async (review: { writer: string; rating: number; content: string }) => {
    // Save to Firebase via hook
    await addTestimonial(review);
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('testimonials-title') }} />
          <div className="section-line mx-auto"></div>
        </div>

        {loading ? (
          <div className="loading-spinner" style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--accent)' }}></i>
            <p style={{ marginTop: '1rem' }}>{t('testimonial-loading')}</p>
          </div>
        ) : error ? (
          <p style={{ textAlign: 'center', color: '#ff5f56' }}>Failed to load testimonials</p>
        ) : testimonials.length === 0 ? (
          <div className="empty-state">
            <i className="far fa-comments"></i>
            <p>{t('testimonial-empty')}</p>
          </div>
        ) : (
          <div 
            className="testimonials-grid" 
            id="testimonials-grid"
            ref={gridRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {testimonials.map((item) => {
              const writer = tObject(item.writer, 'Anonymous');
              const content = tObject(item.content, '');
              const stars = '⭐'.repeat(item.rating || 5);
              const dateText = item.date 
                ? new Date(item.date.seconds * 1000).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') 
                : '';
              
              const isLong = content.length > 150;

              return (
                <div key={item.id} className="testimonial-card glass-card">
                  <div className="testimonial-quote"><i className="fas fa-quote-left"></i></div>
                  <p className="testimonial-content">{content}</p>
                  
                  {isLong && (
                    <button 
                      className="read-more-btn"
                      onClick={() => setSelectedReviewText({ content, writer, rating: item.rating })}
                    >
                      {t('testimonial-read-more')}
                    </button>
                  )}
                  
                  <div className="testimonial-stars">{stars}</div>
                  <div className="testimonial-writer">{writer}</div>
                  <div className="testimonial-date">{dateText}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-4" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            id="open-review-modal" 
            className="btn btn-primary"
            onClick={() => setReviewModalOpen(true)}
          >
            {t('add-review-btn')} <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>

      {/* Review submission modal */}
      {reviewModalOpen && (
        <ReviewModal
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Long review popup modal */}
      {selectedReviewText && (
        <div id="testimonial-detail-modal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content glass-card">
            <span className="close-modal" onClick={() => setSelectedReviewText(null)}>
              &times;
            </span>
            <div id="testimonial-detail-content">
              <div className="testimonial-quote"><i className="fas fa-quote-left"></i></div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
                {selectedReviewText.content}
              </p>
              <div className="testimonial-stars" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                {'⭐'.repeat(selectedReviewText.rating)}
              </div>
              <div className="testimonial-writer" style={{ fontSize: '1.1rem' }}>
                {selectedReviewText.writer}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Testimonials;
