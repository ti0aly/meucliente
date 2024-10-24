import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckListItem from "../components/CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import ButtonMRED from "../components/ButtonMRED";
import ButtonMBLUE from "../components/ButtonMBLUE";
import { ChevronLeftIcon, History, Trash2 } from "lucide-react";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function EditDeletedClientPage() {
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const {clients, updateClients, dellClient} = useContext(ClientsContext);
    const client = clients.find(client => client.id === Number(clientId));
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
        <div className="bg-slate-200 min-w-72 max-w-lg text-center  rounded-md flex-row space-y-3 p-2 h-screen ">
            <div className="max-w-2xl min-w-72 space-y-1">
                <Title  className='max-w-80 overflow-hidden'>Cliente Excluído</Title>
                <Subtitle>{client.name}</Subtitle>
                <button
                    onClick={() => navigate('/recicle/')}
                    className="absolute left-0 top-0 bottom-0 text-lg">
                    <ChevronLeftIcon />
                </button>
                <ul className="space-y-1">
                    <CheckListItem item="Nome:">
                        <input type="text" className="w-60 rounded-md pr-2 text-right" id="clientName" placeholder={client.name}></input>
                    </CheckListItem>
                    <CheckListItem item="Celular:">
                        <input type="text" className="w-60 rounded-md pr-2 text-right" id="clientPhone" placeholder={client.phone}></input>
                    </CheckListItem>
                    <CheckListItem item="Data:">
                        <input type="text" className="w-60 rounded-md pr-2 text-right" id="clientDate" placeholder={client.data}></input>
                    </CheckListItem>
                    <CheckListItem item="Cidade:">
                        <input type="text" className="w-60 rounded-md pr-2 text-right" id="clientCity" placeholder={client.cidade}></input>
                    </CheckListItem>
                    <CheckListItem item="Nº de convidados:">
                        <input type="text" className="w-40 rounded-md pr-2 text-right" id="clientGuests" placeholder={client.convidados}></input>
                    </CheckListItem>

                    <div className="flex space-x-2  justify-around py-5">
                        <ButtonMRED 
                        onClick={() =>{
                            const setDel = {
                                isDeleted: true,
                            }
                            dellClient(client.id);
                            navigate(`/recicle`)
                            }}>
                            <Trash2 />Definitivo
                        </ButtonMRED>

                        <ButtonMBLUE className="bg-blue-200 rounded-md p-2 text-lg w-36"
                        onClick={() =>{
                            const setNonDeleted = {
                                isDeleted: false,
                            }
                            updateClients( client.id, setNonDeleted);
                            navigate(`/initial/`)
                            }}>
                            <History />  Restaurar
                        </ButtonMBLUE>
                    </div>
                </ul>
            </div>
        </div>
        </div>
    )
}


export default EditDeletedClientPage;