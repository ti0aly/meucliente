import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { auth, onAuthStateChanged, signOut } from "../firebase-config";

function InitialPage() {
    const navigate = useNavigate();
    const { userData, setUserData, setThisUserData} = useContext(ClientsContext);

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
            <div className="max-w-2xl min-w-80 space-y-2 space-x-2">
                <Title>Meu cliente</Title>
                
                <Subtitle>
                {userData !== undefined && 
                <>
                    <img className='w-6 h-6 rounded-full mr-1'  src={ userData !== undefined && userData.photoURL  || ""} alt="" />
                    Clientes de {userData.displayName}
                </> 
                || "Você precisa estar logado."}
                </Subtitle>
                {userData !== undefined
                ? (<>
                    <ClientView></ClientView>
                        <button className="bg-blue-200 rounded-md p-2 text-xl" onClick={() =>{ navigate('/meucliente/newclient/')}}>
                        Adicionar cliente
                    </button>
                    <button className="bg-red-100 rounded-md p-2 text-xl" onClick={() =>{ navigate('/meucliente/recicle/')}}>
                        Clientes excluídos
                    </button>
                    <button 
                        className="bg-red-100 rounded-md p-2 text-xl" 
                        onClick={ logoutFunction }
                        >
                        Logout
                    </button>
                </>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default InitialPage;