import React from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";


function InitialPage() {
    const navigate = useNavigate();
    return (
    <div className='flex justify-center bg-slate-200 min-w-80 rounded-md p-2'>
        <div className="max-w-2xl min-w-80 space-y-1">
            <Title>Meu Cliente</Title>
            <Subtitle>Fluxo pré-venda</Subtitle>
            <ClientView></ClientView>
            <button className="bg-blue-200 rounded-md p-2 text-xl" onClick={() =>{ navigate('./newclient')}}>
                Adicionar novo cliente
            </button>
        </div>
    </div>
    )
}

export default InitialPage;