import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import  ClientsContext from "../contexts/ClientsContext";


function DeletedClientView() {
    const navigate = useNavigate();
    const status = [
        "Primeiro contato", 
        "Enviar orçamento", 
        "Feedback orçamento", 
        "Fazer contrato", 
        "Receber entrada", 
        "Venda finalizada"
      ];
    const {clients } = useContext(ClientsContext);
    const formatDate = (dateReceived) => {
        const splitedDate = dateReceived.split('-');        
        let formatedDate = ''
        if (typeof splitedDate[2] === 'string') {
            formatedDate = splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0];
        }
        return (formatedDate)
    }


    return (
     <div className="bg-slate-300 rounded-md flex justify-evenly flex-wrap gap-2 p-1 text-lg space-x-2" >
        { 
            clients !== undefined &&
            clients.filter((client) => client.isDeleted === true).map((client) =>
            <ul key={client.id}>
                <li>
                    <button 
                        className="p-2 bg-red-100 w-40 rounded-md shadow-md border-slate-500" 
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`/meucliente/editdeletedclient?${query.toString()}`);
                        }}
                        >
                        <p className="text-base text-red-800 font-semibold w-36 overflow-hidden">{client.name}</p>
                        <p className="text-sm"> {client.data !== "" && '(' + formatDate(client.data) + ')' || "(Data do evento)"}</p>
                        <p className="text-slate-400 text-base">{status[client.clientStatus]}</p>                    </button>
                </li>
            </ul>

        ) || (<p className="text-gray-600">Você não tem clientes excluídos</p>) }


     </div>   
    )
}

export default DeletedClientView;