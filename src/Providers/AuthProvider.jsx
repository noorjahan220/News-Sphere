import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const axiosPublic = useAxiosPublic();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    // Sign in with Google
    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                // Check if the token exists in localStorage
                const storedToken = localStorage.getItem('access-token');
                if (storedToken) {
                    // If token exists, assume the user is logged in
                    setUser(currentUser);
                    setLoading(false);
                } else {
                    // Otherwise, fetch the token from the backend
                    axiosPublic.post('/jwt', userInfo)
                        .then(res => {
                            if (res.data.token) {
                                localStorage.setItem('access-token', res.data.token);
                                setUser(currentUser);
                                setLoading(false);
                            } else {
                                setLoading(false);
                            }
                        })
                        .catch(() => {
                            setLoading(false);
                        });
                }
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
                setLoading(false);
            }
        });

        // Check if there's an existing user/token after reload
        const storedToken = localStorage.getItem('access-token');
        if (storedToken) {
            // If token exists, we don’t need to go through Firebase again
            setLoading(false);
        }

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        signInWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
