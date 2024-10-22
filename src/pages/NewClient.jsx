import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckListItem from "../components/CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, Undo2, Save} from "lucide-react";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ButtonMBLUE from "../components/ButtonMBLUE";

function NewClient() {
    const { addClient } = useContext(ClientsContext);
    const navigate = useNavigate();
    const randomId = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    const [clientName, setClientName] = useState("");
    const handleChangeName = (event) => {
        setClientName(event.target.value);
    }

    const [clientPhone, setClientPhone] = useState(Number);
    const handleChangePhone = (event) => {
        setClientPhone(event.target.value);
    }

    const [clientDate, setclientDate] = useState("");
    const handleChangeDate = (event) => {
        setclientDate(event.target.value);
    }

    const [clientCity, setclientCity] = useState("");
    const handleChangeCity = (event) => {
        setclientCity(event.target.value);
    }

    const [clientGuests, setclientGuests] = useState(0);
    const handleChangeGuests = (event) => {
        setclientGuests(event.target.value);
    }

    const [clientDataAvailable, setclientDataAvailable] = useState(false);
    const handleChangeDataAvailable = () => {
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
        isDeleted: false,
    }
    return (
        <div className='flex justify-center bg-slate-200 min-w-72 p-1 h-screen text-center'>
            <div className="max-w-2xl min-w-72 space-y-1">
                <Title>Novo Cliente</Title>
                <Subtitle>Insira os dados abaixo:</Subtitle>
                <ul className="space-y-1">
                    <CheckListItem item="Nome:">
                        <input type="text" onChange={handleChangeName} className="max-w-60 rounded-md" id="clientName"></input>
                    </CheckListItem>
                    <CheckListItem item="Celular:" >
                        <input type="tel" id="clientPhone" className="max-w-60 rounded-md"  onChange={handleChangePhone}/>
                    </CheckListItem>
                    <CheckListItem item="Data:">
                        <input type="date" placeholder="dd/mm/yyyy" onChange={handleChangeDate} className="max-w-60 rounded-md " id="clientDate"/>
                    </CheckListItem>
                    <CheckListItem item="Cidade:">
                        <input type="text" onChange={handleChangeCity} className="max-w-60 rounded-md" id="clientCity"></input>
                    </CheckListItem>
                    <CheckListItem item="Nº de convidados:">
                        <input type="text" onChange={handleChangeGuests} className="max-w-40 rounded-md" id="clientGuests"></input>
                    </CheckListItem>
                    <CheckListItem item="Data disponível?">
                        <button  
                            onClick={() => handleChangeDataAvailable(false)} 
                            >
                            {clientDataAvailable
                            && <Check className="text-green-700"></Check> || <X className="text-slate-400"></X>}
                        </button>
                    </CheckListItem> 

                    <div className="flex flex-wrap justify-around py-5">
                        <ButtonMSLATE 
                        onClick={() =>{
                            navigate('/meucliente/initial/');
                            }}>
                            <Undo2 />Voltar
                        </ButtonMSLATE>
                        <ButtonMBLUE 
                        onClick={() =>{
                            if (clientName === "") {
                                alert("Não é possível criar um cliente sem nome, crie ao menos uma referência.")
                            } else {
                            addClient(newClient);
                            navigate(`/meucliente/client?id=${String(newClient.id)}`);
                          };
                            }
                            }>
                            <Save />Salvar
                        </ButtonMBLUE>

                    </div>
                </ul>
            </div>
        </div>
    )
}


export default NewClient;