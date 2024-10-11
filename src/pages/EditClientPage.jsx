import React from "react";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckListItem from "../components/CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserX, Save, Undo2 } from "lucide-react";


function EditClientPage() {
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const {clients, updateClients, dellClient, updateClientsFromOtherPages} = useContext(ClientsContext);
    const client = clients.find(client => client.id === Number(clientId));
    const navigate = useNavigate();
    


    const [clientName, setClientName] = useState(client.name);
    const handleChangeName = (event) => {
        setClientName(event.target.value);
    }

    const [clientPhone, setClientPhone] = useState(client.phone);
    const handleChangePhone = (event) => {
        setClientPhone(event.target.value);
    }

    const [clientDate, setclientDate] = useState(client.data);
    const handleChangeDate = (event) => {
        setclientDate(event.target.value);
    }

    const [clientCity, setclientCity] = useState(client.cidade);
    const handleChangeCity = (event) => {
        setclientCity(event.target.value);
    }

    const [clientGuests, setclientGuests] = useState(client.convidados);
    const handleChangeGuests = (event) => {
        setclientGuests(event.target.value);
    }

    let newClientData = {
        name: clientName,
        phone: clientPhone,
        data: clientDate,
        cidade: clientCity,
        convidados: clientGuests,
    };

    return (
        <div className="flex justify-center">
        <div className="bg-slate-200 min-w-80 max-w-lg text-center  rounded-md flex-row space-y-3 p-2 h-screen ">
            <div className="max-w-2xl min-w-80 space-y-1">
                <Title>Editar Cliente</Title>
                <Subtitle>{client.name}</Subtitle>
                <ul className="space-y-1">
                    <CheckListItem item="Nome:">
                        <input type="text" onChange={handleChangeName} className="w-60 rounded-md pr-2 text-right" id="clientName" placeholder={client.name}></input>
                    </CheckListItem>
                    <CheckListItem item="Celular:">
                        <input type="text" onChange={handleChangePhone} className="w-60 rounded-md pr-2 text-right" id="clientPhone" placeholder={client.phone}></input>
                    </CheckListItem>
                    <CheckListItem item="Data:">
                        <input type="text" onChange={handleChangeDate} className="w-60 rounded-md pr-2 text-right" id="clientDate" placeholder={client.data}></input>
                    </CheckListItem>
                    <CheckListItem item="Cidade:">
                        <input type="text" onChange={handleChangeCity} className="w-60 rounded-md pr-2 text-right" id="clientCity" placeholder={client.cidade}></input>
                    </CheckListItem>
                    <CheckListItem item="Nº de convidados:">
                        <input type="text" onChange={handleChangeGuests} className="w-40 rounded-md pr-2 text-right" id="clientGuests" placeholder={client.convidados}></input>
                    </CheckListItem>
                </ul>
                    <div className="flex flex-wrap justify-around items-center align-middle space-x-2 space-y-2 max-w-96 py-5">
                        <button 
                        className="flex justify-center p-1 text-gray-800 w-40 bg-red-300 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                        onClick={() =>{
                            const setDel = {
                                isDeleted: true,
                            }
                            updateClients(client.id, setDel);
                            navigate(`/meucliente/initial/`);
                            }}>
                            <UserX />Excluir
                        </button>

                        <button 
                        className="flex justify-center p-1 text-gray-800 w-40 bg-blue-200 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                        onClick={() =>{
                            updateClients( client.id, newClientData);
                            navigate(`/meucliente/initial/`);
                            }}>
                            <Save />Salvar
                        </button>
                        <button 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={() =>{ navigate(-1)}}
                            title="back"
                            >
                            <Undo2 />Voltar 
                        </button>




                    </div>

            </div>
        </div>
        </div>
    )
}


export default EditClientPage;