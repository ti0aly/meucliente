import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import  ClientsContext from "../contexts/ClientsContext";


function ClientView() {
    const navigate = useNavigate();
    const status = [
        "Fazer primeiro contato", 
        "Enviar orçamento", 
        "Feedback do orçamento", 
        "Fazer contrato", 
        "Receber entrada", 
        "Venda finalizada"
      ];
    const {clients, updateClients} = useContext(ClientsContext);
    console.log("clients no CLinetView", clients);
    return (
     <div className="bg-slate-300 rounded-md flex justify-evenly flex-wrap gap-2 p-2 text-lg" >
        
        {clients.map((client) => 
            <ul key={client.id}>
                <li>
                    <button 
                        className="p-2 bg-slate-100 w-72 rounded-md shadow-md border-slate-500" 
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`/client?${query.toString()}`);
                        }}
                        >
                        <p className="flex justify-center">{client.name}</p>
                        <p className="text-slate-400">Status: {status[client.clientStatus]}</p>
                    </button>
                </li>
            </ul>

        )}


     </div>   
    )
}

export default ClientView;