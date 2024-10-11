import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { auth, onAuthStateChanged, signOut } from "../firebase-config";
import { Trash2, LogOut, UserPlus, Pencil } from "lucide-react";

function InitialPage() {
    const navigate = useNavigate();
    const { userData, setUserData, setThisUserData, handleChangeCustomUserName, userName} = useContext(ClientsContext);

    // console.log("userData.email: ", userData.email);
    // console.log("userData.displayName: ", userData.displayName);
    // console.log("userData.uid: ", userData.uid);
    // console.log("userData.photoURL: ", userData.photoURL);

    useEffect(() => {
        // Verifica se há um usuário logado quando o app carrega ou a página é atualizada
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
        if (userData) {
            // Usuário está autenticado, salva os dados do usuário
            setUserData(userData);
            setThisUserData(userData);
        } else {
            // Usuário não está autenticado
            setUserData(null);
            console.log('Nenhum usuário logado');
        }
        });

        // Cleanup para remover o listener
        return () => unsubscribe();
    }, [auth]);

    const logoutFunction = () => {
        console.log("chamou");
        signOut(auth);
        setThisUserData(null);
        navigate('/meucliente/');
    }




    return (
        <div className='flex justify-center bg-slate-200 min-w-80 text-center h-screen'>
            <div className="max-w-xl min-w-80 space-y-2 ">
                <Title>Meu cliente</Title>
                
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
                    <div className="flex flex-wrap justify-evenly">
                        <button 
                            className="flex text-gray-800 p-3 bg-blue-200 border border-bl-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" onClick={() =>{ navigate('/meucliente/newclient/')}}
                            title="add client"
                            >
                            <UserPlus />Add Client
                        </button>
                        <button 
                            className="flex text-gray-800 p-3 bg-slate-200 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" onClick={() =>{ navigate('/meucliente/recicle/')}}
                            title="recicle"
                            >
                        <Trash2 />Excluídos
                        </button>
                        <button 
                            className="flex text-gray-800 p-3 bg-red-200 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={ logoutFunction }
                            title="sign out"
                            >
                            <LogOut />Sign Out
                        </button>
                    </div>
                </>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default InitialPage;