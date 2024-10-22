import { useContext, useEffect } from "react";
import Subtitle from "../components/Subtitle"
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import ButtonMRED from "../components/ButtonMRED";
import ButtonMGREEN from "../components/ButtonMGREEN";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ButtonMBLUE from "../components/ButtonMBLUE";
import { auth, onAuthStateChanged, signOut } from "../firebase-config";
import { Trash2, LogOut, UserPlus, Pencil, MessageCircleMore } from "lucide-react";
import Logotipo from "../components/Logotipo";

function InitialPage() {
    const navigate = useNavigate();
    const { userData, setUserData, setThisUserData, handleChangeCustomUserName, userName} = useContext(ClientsContext);

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
        console.log("chamou");
        signOut(auth);
        setThisUserData(null);
        navigate('/');
    }

    return (
        
        <div className='flex justify-center bg-slate-200 min-w-72 text-center h-screen'>
            <div className="max-w-xl min-w-72 space-y-2 ">
                <Logotipo />
                
                <Subtitle>
                {userData !== undefined && 
                <>
                    <img className='w-6 h-6 rounded-full mr-1'  src={ userData !== undefined && userData.photoURL  || ""} alt="" />
                    Clientes de&nbsp; 
                    <button
                        onClick={handleChangeCustomUserName} 
                        className="flex" >
                        {userName !== undefined && userName || userData.displayName }
                        <Pencil className="w-3"></Pencil>
                    </button>
                </> 
                || "Você precisa estar logado."}
                </Subtitle>
                {userData !== undefined
                ? (<>
                    <ClientView></ClientView>

                    <div className="flex flex-wrap justify-center items-center">

                            <ButtonMBLUE
                                onClick={() =>{ navigate('/newclient/')}}
                                title="add client"
                                >
                                <UserPlus />Adicionar
                            </ButtonMBLUE>
                            <ButtonMGREEN
                                onClick={() =>{ navigate('/editusermessages/')}}
                                title="Messages"
                                >
                                <MessageCircleMore />Mensagens
                            </ButtonMGREEN>

                            <ButtonMSLATE
                                onClick={() =>{ navigate('/recicle/')}}
                                title="recicle"
                                >
                            <Trash2 />Excluídos
                            </ButtonMSLATE>
                            <ButtonMRED
                                onClick={ logoutFunction }
                                title="sign out"
                                >
                                <LogOut />Sign Out
                            </ButtonMRED>

                    </div>
                </>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default InitialPage;