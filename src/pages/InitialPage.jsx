import React, { useContext, useEffect } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";


function InitialPage() {
    const navigate = useNavigate();
    const {clients} = useContext(ClientsContext);
    return (
        <div className='flex justify-center bg-slate-200 min-w-80 text-center h-screen'>
            <div className="max-w-2xl min-w-80 space-y-1">
                <Title>Meu cliente</Title>
                <Subtitle>Fluxo pré-venda</Subtitle>
                {console.log(clients)}
                { clients === undefined && <p>Comece adicionando seu primeiro cliente:</p> || <ClientView></ClientView> }
                <button className="bg-blue-200 rounded-md p-2 text-xl" onClick={() =>{ navigate('./newclient')}}>
                    Adicionar novo cliente
                </button>
            </div>
        </div>

    )
}

export default InitialPage;