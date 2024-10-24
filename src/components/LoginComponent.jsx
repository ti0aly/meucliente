import { useState, useContext, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import ClientsContext from '../contexts/ClientsContext';

function LoginComponent() {
    // user in case new connections
    // userData in case browserLocalPersistence

    const { setThisUserData, userData, userName, setUserData, obterSaudacao } = useContext(ClientsContext);
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
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
        if (userData) {
            setUserData(userData);
            setThisUserData(userData);
        } else {
            setUserData(null);
            console.log('Nenhum usuário logado');
        }
        });
        return () => unsubscribe();
    }, [auth]);






    return (
        <div >
        {user || userData ? (
            <div className='flex flex-col space-y-3 items-center'>
                    <h3 className='font-custom font-semibold '> 
                        Olá&nbsp;
                        {user !== null && userName|| userName}
                        ,&nbsp;
                        {obterSaudacao()}!
                
                </h3>
            { <h3></h3> }
            { <img className='rounded-full max-w-24' src={user !== null && user.photoURL || userData.photoURL} alt="" /> }
            <button
                className="flex-wrap items-center justify-center px-4 py-2 min-w-48 text-gray-800 bg-blue-200 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                onClick={() => navigate('/initial/')}
                >
                    Entrar
            </button>
            <button
                className="flex-wrap items-center justify-center px-4 py-2 min-w-48 text-gray-800 bg-slate-200 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                onClick={handleSignOut}
                >
                    Sign Out
            </button>


            
            </div >
        ) : (<div>
                <p className="font-custom font-semibold">Comece agora!</p>
                <div className='flex justify-center'>
                    <button
                        className="flex items-center justify-center mt-8 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                        onClick={loginWithGoogle}
                        >
                            <img src="/images/google-icon.svg" className='w-5 h-5 mr-2 '/>
                            Login with Google
                    </button>
            
                </div>
        </div>
        )}
        </div>
    );
    }

    export default LoginComponent;