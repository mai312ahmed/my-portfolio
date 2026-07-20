import { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '../types/testimonial';
import { testimonialService } from '../services/testimonialService';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await testimonialService.getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error('Error fetching testimonials in hook:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'date'>) => {
    await testimonialService.addTestimonial(testimonial);
    await fetchTestimonials(); // Refresh lists
  };

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { testimonials, loading, error, refetch: fetchTestimonials, addTestimonial };
};
