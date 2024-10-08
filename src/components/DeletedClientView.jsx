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
    const {clients, updateClients} = useContext(ClientsContext);
    const deletedClients = clients.filter((client) => client.isDeleted === true);
    return (
     <div className="bg-slate-300 rounded-md flex justify-evenly flex-wrap gap-2 p-2 text-lg space-x-2" >
        
        { deletedClients.length > 0 && deletedClients.map((client) => 
            
            <ul key={client.id}>
                <li>
                    <button 
                        className="p-2 bg-red-100 w-72 rounded-md shadow-md border-slate-500" 
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`../meucliente/editdeletedclient?${query.toString()}`);
                        }}
                        >
                        <div className="flex justify-center text-red-700">{client.name }<p>{client.data !== "" && ' (' + client.data + ')' || ""}</p>    </div>
                        <p className="text-slate-400">{status[client.clientStatus]}</p>
                    </button>
                </li>
            </ul>

        ) || <p className="text-gray-600">Você não tem clientes excluídos</p> }


     </div>   
    )
}

export default DeletedClientView;