import React, { useState, useContext, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import ClientsContext from '../contexts/ClientsContext';


function LoginComponent() {
    const { setThisUserData } = useContext(ClientsContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    const loginWithGoogle = async () => {
        try {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        setThisUserData(result.user);
        } catch (error) {
        console.error("Error during login", error);
        }
    };

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        setUser(null);
        } catch (error) {
        console.error("Error during sign out", error);
        }
    };

    return (
        <div >
        {user ? (
            <div >
            <h3>Welcome, {user.displayName}</h3>
            <button
                className="flex-wrap items-center justify-center mt-8 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                onClick={handleSignOut}
                >
                    Sign Out
            </button>
            <button
                className="flex-wrap items-center justify-center mt-8 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                onClick={() => navigate('/meucliente/')}
                >
                    Ir para meus clientes
            </button>

            
            </div >
        ) : (
            <div className='flex justify-center'>
                <button
                    className="flex items-center justify-center mt-8 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                    onClick={loginWithGoogle}
                    >
                        <img src="../images/google-icon.svg" className='w-5 h-5 mr-2 '/>
                        Login with Google
                </button>
                
            </div>
        )}
        </div>
    );
    }

    export default LoginComponent;