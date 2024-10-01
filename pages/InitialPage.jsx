import React from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import ClientView from "../components/Clientview"
import ClientsContext from "../contexts/ClientsContext";
import { useContext } from "react";

function InitialPage() {
    const {clients, updateClients} = useContext(ClientsContext);
    return (
    <div className='flex justify-center bg-slate-200 min-w-80 rounded-md p-2'>
        <div className="max-w-2xl min-w-80 space-y-1">
            <Title>Meu Cliente</Title>
            <Subtitle>Fluxo pré-venda</Subtitle>
            <ClientView/>
        </div>
    </div>
    )
}

export default InitialPage;