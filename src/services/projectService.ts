import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import type { Project } from '../types/project';

const PROJECTS_COLLECTION = 'projects';

export const projectService = {
  async getProjectById(id: string): Promise<Project | null> {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null;
  },
  async getProjects(): Promise<Project[]> {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data()
      } as Project);
    });
    return projects;
  },

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
    return docRef.id;
  },

  async updateProject(id: string, project: Omit<Project, 'id'>): Promise<void> {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, project as any);
  },

  async deleteProject(id: string): Promise<void> {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
