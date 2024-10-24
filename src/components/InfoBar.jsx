import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useContext } from "react";
import { auth } from "../firebase-config";
import ClientsContext from "../contexts/ClientsContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2 } from "lucide-react";

function InfoBar({children}) {
    const { setThisUserData, setUserData } = useContext(ClientsContext);
    const navigate = useNavigate();
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

    const logoutFunction = () => {
        signOut(auth);
        setThisUserData(null);
        navigate('/');
    }



    return (
        <div className="w-full bg-slate-500 absolute  top-0 left-0 flex justify-between border-black">
                    
                    {children}
                    <button
                    onClick={() =>{ navigate('/recicle/')}}
                                    title="recicle"
                                    >
                                <Trash2 />
                    </button>
                    <button
                        onClick={ logoutFunction }
                        title="sign out"
                        >
                        <LogOut />
                    </button>



            </div>
    )
}

export default InfoBar;