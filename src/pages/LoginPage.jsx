import React from "react";
import Title from "../components/Title"

import LoginComponent from "../components/LoginComponent";
import { Check } from "lucide-react";


function LoginPage () {
    return (
        <div className='flex justify-center min-w-80 text-center h-screen'>
            <div className="max-w-2xl min-w-80 space-y-4">
                <Title></Title>
                <div className="font-custom font-semibold space-y-2 pt-4 ">
                    <h1 className="rounded-md border p-1 flex shadow bg-mcmenta hover:opacity-90 hover:cursor-pointer"><Check /> Seus atendimentos de forma rápida e eficiente</h1>
                    <h1 className="rounded-md border p-1 flex shadow bg-mcmenta hover:opacity-90 hover:cursor-pointer"><Check />Personalize mensagens</h1>
                    <h1 className="rounded-md border p-1 flex shadow bg-mcmenta hover:opacity-90 hover:cursor-pointer"><Check />Tenha controle da sua agenda</h1>
                    <h1 className="rounded-md border p-1 flex shadow bg-mcmenta hover:opacity-90 hover:cursor-pointer"><Check />Automatize pedidos de orçamento</h1>
                    <h1 className="rounded-md border p-1 flex shadow bg-mcmenta hover:opacity-90 hover:cursor-pointer"><Check />Automatize pedidos de orçamento</h1>
                    
                </div>

                <div className="bg-mcbege p-2 rounded-xl shadow" >
                    <LoginComponent></LoginComponent>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;