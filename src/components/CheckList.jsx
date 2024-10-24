import CheckListItem from "./CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
import { X, Check } from "lucide-react";
import { useContext } from "react";

function CheckList(props) {
    const clientId = props.clientId;
    const {clients, updateClients} = useContext(ClientsContext);
    const client = clients.find(client => client.id === Number(clientId));
    return (
        <div >
            <ul className="space-y-1">
                <CheckListItem item="Data:">{client.data}</CheckListItem>
                <CheckListItem item="Cidade:">{client.cidade}</CheckListItem>
                <CheckListItem item="Nº celular:">{client.phone}</CheckListItem>
                <CheckListItem item="Nº de convidados:">{client.convidados === null && "?" || client.convidados }</CheckListItem>
 
                <CheckListItem item="Data disponível?">
                    <button  
                        onClick={() => updateClients(Number(clientId),  {isDataAvailable : !client.isDataAvailable } )} 
                        >
                        {client.isDataAvailable
                         && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                    </button>
                </CheckListItem> 

                <CheckListItem item="Primeiro Contato:">
                    <button  
                        onClick={() => updateClients(Number(clientId),  {isClienteContacted : !client.isClienteContacted } )} 
                        >
                        {client.isClienteContacted
                         && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                    </button>
                </CheckListItem>
              
                <CheckListItem item="Orçamento enviado?">
                        <button  
                            onClick={() => updateClients(Number(clientId),  {isBudgetSentToClient: !client.isBudgetSentToClient} )} 
                            >
                            {client.isBudgetSentToClient && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                        </button>
                </CheckListItem> 

                <CheckListItem item="Feedback orçamento:">

                    <button  
                        onClick={() => updateClients(Number(clientId),  {isBudgetResponded: !client.isBudgetResponded} )} 
                        >
                        {client.isBudgetResponded && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                    </button>
                </CheckListItem> 

                <CheckListItem item="Dados pra contrato:">
                    <button  
                        onClick={() => updateClients(Number(clientId),  {isContractCreated: !client.isContractCreated} )} 
                        >
                        {client.isContractCreated && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                    </button>
                </CheckListItem> 

                <CheckListItem item="Entrada efetuada?">

                    <button 
                        onClick={() => updateClients(Number(clientId),  {isDepositPaid: !client.isDepositPaid} )} 
                        >
                        {client.isDepositPaid && <Check className="text-green-700"></Check> || <X className="text-red-500"></X>}
                    </button>
                </CheckListItem> 

            </ul>
        </div>
    )
}





export default CheckList;


