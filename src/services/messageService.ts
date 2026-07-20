import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import type { ContactMessage } from '../types/message';

const MESSAGES_COLLECTION = 'messages';

export const messageService = {
  async getMessages(): Promise<ContactMessage[]> {
    const q = query(collection(db, MESSAGES_COLLECTION), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        timestamp: data.timestamp
      } as ContactMessage);
    });
    return messages;
  },

  async addMessage(message: Omit<ContactMessage, 'id' | 'timestamp'>): Promise<string> {
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      ...message,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  },

  async deleteMessage(id: string): Promise<void> {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
