import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface UserProfile {
  email: string;
  role: 'customer' | 'supplier' | 'delivery' | 'admin';
  displayName: string;
  phoneNumber?: string;
  createdAt: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAnonymous: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Using the provided user email to assign admin role on creation
const BOOTSTRAP_ADMIN_EMAIL = 'adminfarhan9@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        
        try {
          // Initialize if it doesn't exist yet
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            const isBootstrapAdmin = currentUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();
            const newProfile: UserProfile = {
              email: currentUser.email || '',
              role: isBootstrapAdmin ? 'admin' : 'customer',
              displayName: currentUser.displayName || (currentUser.isAnonymous ? 'Guest' : 'User'),
              createdAt: Date.now(),
            };
            await setDoc(userDocRef, newProfile);
          } else {
            const data = userDoc.data() as UserProfile;
             if (currentUser.email === BOOTSTRAP_ADMIN_EMAIL && data.role !== 'admin') {
                await setDoc(userDocRef, { role: 'admin' }, { merge: true });
             }
          }
        } catch (error) {
          console.error("Error creating/checking profile:", error);
        }

        // Listen for real-time profile updates
        unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
             setProfile(snapshot.data() as UserProfile);
          }
        }, (error) => {
          console.error("Profile snapshot error:", error);
        });

      } else {
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, silently ignore or handle accordingly
        console.log("Sign in aborted by user.");
      } else {
        console.error("Google Sign Error:", error);
        throw error;
      }
    }
  };

  const signInAnonymous = async () => {
    await signInAnonymously(auth);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInAnonymous, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
