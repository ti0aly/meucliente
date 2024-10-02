import React from "react";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckListItem from "../components/CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { X, Check } from "lucide-react";

function EditClientPage() {
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const {clients, updateClients, addClient} = useContext(ClientsContext);
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
        <div className='flex justify-center bg-slate-200 min-w-80 rounded-md p-2'>
            <div className="max-w-2xl min-w-80 space-y-1">
                <Title>Editar Cliente</Title>
                <Subtitle>{client.name}</Subtitle>
                <ul className="space-y-1">
                    <CheckListItem item="Nome:">
                        <input type="text" onChange={handleChangeName} className="w-60 rounded-md" id="clientName" placeholder={client.name}></input>
                    </CheckListItem>
                    <CheckListItem item="Celular:">
                        <input type="text" onChange={handleChangePhone} className="w-60 rounded-md" id="clientPhone" placeholder={client.phone}></input>
                    </CheckListItem>
                    <CheckListItem item="Data:">
                        <input type="text" onChange={handleChangeDate} className="w-60 rounded-md" id="clientDate" placeholder={client.data}></input>
                    </CheckListItem>
                    <CheckListItem item="Cidade:">
                        <input type="text" onChange={handleChangeCity} className="w-60 rounded-md" id="clientCity" placeholder={client.cidade}></input>
                    </CheckListItem>
                    <CheckListItem item="Nº de convidados:">
                        <input type="text" onChange={handleChangeGuests} className="w-40 rounded-md" id="clientGuests" placeholder={client.convidados}></input>
                    </CheckListItem>

                    <div className="flex space-x-2  justify-around py-5">
                        <button className="bg-blue-200 rounded-md p-2 text-lg w-36"
                        onClick={() =>{
                            updateClients( client.id, newClientData);
                            navigate(-1);
                            }}>
                            Salvar e Voltar
                        </button>

                    </div>
                </ul>
            </div>
        </div>
    )
}


export default EditClientPage;