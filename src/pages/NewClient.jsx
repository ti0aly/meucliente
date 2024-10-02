import React from "react";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckListItem from "../components/CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";

function NewClient() {
    const {clients, updateClients, addClient} = useContext(ClientsContext);
    const navigate = useNavigate();
    let randomId = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    const [clientName, setClientName] = useState();
    const handleChangeName = (event) => {
        setClientName(event.target.value);
    }

    const [clientPhone, setClientPhone] = useState();
    const handleChangePhone = (event) => {
        setClientPhone(event.target.value);
    }

    const [clientDate, setclientDate] = useState();
    const handleChangeDate = (event) => {
        setclientDate(event.target.value);
    }

    const [clientCity, setclientCity] = useState();
    const handleChangeCity = (event) => {
        setclientCity(event.target.value);
    }

    const [clientGuests, setclientGuests] = useState();
    const handleChangeGuests = (event) => {
        setclientGuests(event.target.value);
    }

    const [clientDataAvailable, setclientDataAvailable] = useState();
    const handleChangeDataAvailable = (event) => {
        setclientDataAvailable(!clientDataAvailable);
    }

    let newClient = {
        id: randomId,
        name: clientName,
        phone: clientPhone,
        data: clientDate,
        cidade: clientCity,
        convidados: clientGuests,
        isDataAvailable: clientDataAvailable,
        clientStatus: 0,
        isContacted: false,
        isBudgetSentToClient: false,
        isBudgetResponded: false,
        isContractCreated: false,
        isContractSigned: false,
        isDepositPaid: false,
        isTotalContractAmountPaid: false,
    }
    return (
        <div className='flex justify-center bg-slate-200 min-w-80 rounded-md p-2'>
            <div className="max-w-2xl min-w-80 space-y-1">
                <Title>Novo Cliente</Title>
                <Subtitle>Insira os dados abaixo:</Subtitle>
                <ul className="space-y-1">
                    <CheckListItem item="Nome:">
                        <input type="text" onChange={handleChangeName} className="w-60 rounded-md" id="clientName"></input>
                    </CheckListItem>
                    <CheckListItem item="Celular:">
                        <input type="text" onChange={handleChangePhone} className="w-60 rounded-md" id="clientPhone"></input>
                    </CheckListItem>
                    <CheckListItem item="Data:">
                        <input type="text" onChange={handleChangeDate} className="w-60 rounded-md" id="clientDate"></input>
                    </CheckListItem>
                    <CheckListItem item="Cidade:">
                        <input type="text" onChange={handleChangeCity} className="w-60 rounded-md" id="clientCity"></input>
                    </CheckListItem>
                    <CheckListItem item="Nº de convidados:">
                        <input type="text" onChange={handleChangeGuests} className="w-40 rounded-md" id="clientGuests"></input>
                    </CheckListItem>
                    <CheckListItem item="Data disponível?">
                        <button  
                            onClick={() => handleChangeDataAvailable(false)} 
                            >
                            {clientDataAvailable
                            && <Check className="text-green-700"></Check> || <X className="text-slate-400"></X>}
                        </button>
                    </CheckListItem> 

                    <div className="flex space-x-2 justify-around py-5">
                        <button className="bg-red-200 rounded-md p-1 text-lg w-28"
                        onClick={() =>{
                            navigate(-1);
                            }}>
                            Voltar
                        </button>
                        <button className="bg-blue-200 rounded-md p-1 text-lg w-28"
                        onClick={() =>{
                            addClient(newClient);
                            navigate(-1);
                            }}>
                            Salvar
                        </button>

                    </div>
                </ul>
            </div>
        </div>
    )
}


export default NewClient;