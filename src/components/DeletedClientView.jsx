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
    const viewName = (name) => {
        let formattedName = name
        
        if (name.split(' ').length > 1) {
            formattedName = name.split(' ')[0] + ' ' + name.split(' ')[1][0] + '.'; 
        }
        return formattedName
    } 


    return (
        <div className="rounded-xl flex justify-around flex-wrap gap-[1px] py-1 text-lg" >
            
        { 
            clients !== undefined &&
            clients.filter((client) => client.isDeleted === true).map((client) =>
            <ul key={client.id}>
                <li>
                    <button 
                        className="opacity-80 py-1 border-[#202b27] min-w-32 max-w-48 bg-[#d7ffec] rounded-xl shadow-md border-2 hover:shadow-xl  " 
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`/editdeletedclient?${query.toString()}`);
                        }}
                        >
                        <p className="text-[#202b27] text-base font-semibold w-32 overflow-hidden">{(viewName(client.name))}</p>
                        <p className="text-xs"> {client.data !== "" && '(' + formatDate(client.data) + ')' || "(Data do evento)"}</p>
                        <p className="text-[#2A2F34] text-xs w-32 overflow-hidden">{status[client.clientStatus]}</p>
                        </button>
                </li>
            </ul>

        ) || (<p className="text-gray-600">Você não tem clientes excluídos</p>) }


     </div>   
    )
}

export default DeletedClientView;