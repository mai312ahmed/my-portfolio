import { db } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import type { Testimonial } from '../types/testimonial';

const TESTIMONIALS_COLLECTION = 'testimonails'; // Keeping original spelling to match existing database

export const testimonialService = {
  async getTestimonials(): Promise<Testimonial[]> {
    const q = query(collection(db, TESTIMONIALS_COLLECTION), orderBy('date', 'desc'));
    try {
      const querySnapshot = await getDocs(q);
      const testimonials: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        testimonials.push({
          id: doc.id,
          writer: data.writer,
          content: data.content,
          rating: data.rating,
          date: data.date
        } as Testimonial);
      });
      return testimonials;
    } catch (error) {
      console.warn("Error getting ordered testimonials, trying unordered:", error);
      // Fallback in case date index is missing
      const querySnapshot = await getDocs(collection(db, TESTIMONIALS_COLLECTION));
      const testimonials: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        testimonials.push({
          id: doc.id,
          writer: data.writer,
          content: data.content,
          rating: data.rating,
          date: data.date
        } as Testimonial);
      });
      return testimonials;
    }
  },

  async addTestimonial(testimonial: Omit<Testimonial, 'id' | 'date'>): Promise<string> {
    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
      ...testimonial,
      date: serverTimestamp()
    });
    return docRef.id;
  }
};
