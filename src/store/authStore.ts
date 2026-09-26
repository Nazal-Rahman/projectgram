import { create } from 'zustand';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  name: string;
  nickname?: string;
  role: 'admin' | 'member';
  status: 'active' | 'blocked' | 'disabled' | 'removed';
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  logout: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  logout: async () => {
    await signOut(auth);
    set({ user: null, profile: null });
  },
  initialize: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ user });
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            set({ profile: docSnap.data() as UserProfile });
          } else {
            // If no profile exists, maybe it's a new admin or unconfigured user.
            // We should handle this or set a default profile
            set({ profile: {
              uid: user.uid,
              email: user.email || '',
              name: user.displayName || 'Unknown User',
              role: 'member',
              status: 'active'
            } });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        set({ user: null, profile: null });
      }
      set({ loading: false, initialized: true });
    });
  }
}));
