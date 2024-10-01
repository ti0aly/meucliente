import CheckListItem from "./CheckListItem";
import ClientsContext from "../contexts/ClientsContext";
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
                <CheckListItem item="Primeiro Contato:">
                    <div className="toggle-switch">
                        <input type="checkbox" checked={client.isContacted} onChange={() => updateClients(Number(clientId),  {isContacted: !client.isContacted} )} />
                        <span className="slider"></span>
                    </div>
                </CheckListItem>
                
                
                <CheckListItem item="Data disponível?">
                    <div className="toggle-switch">
                        <input type="checkbox" checked={client.isDataAvailable} onChange={() => updateClients(Number(clientId),  {isDataAvailable: !client.isDataAvailable} )} />
                        <span className="slider"></span>
                    </div>
                    {/* {client.isDataAvailable === true && "sim" || "não"}*/}
                </CheckListItem> 
                
                
                <CheckListItem item="Orçamento enviado:">
                    <div className="toggle-switch">
                        <input type="checkbox" checked={client.isBudgetSentToClient} onChange={() => updateClients(Number(clientId),  {isBudgetSentToClient: !client.isBudgetSentToClient} )} />
                        <span className="slider"></span>
                    </div>
                    
                    {/* {client.isBudgetSentToClient === true && "sim" || "não"} */}
                </CheckListItem>
                <CheckListItem item="Feedback orçamento:">
                    <div className="toggle-switch">
                        <input type="checkbox" checked={client.isBudgetResponded} onChange={() => updateClients(Number(clientId),  {isBudgetResponded: !client.isBudgetResponded} )} />
                        <span className="slider"></span>
                    </div>
                    {/* {client.isBudgetResponded === true && "sim" || "não"} */}
                </CheckListItem>
                <CheckListItem item="Dados pra contrato:">
                <div className="toggle-switch">
                    <input type="checkbox" checked={client.isContractCreated} onChange={() => updateClients(Number(clientId),  {isContractCreated: !client.isContractCreated} )} />
                        <span className="slider"></span>
                    </div>
                    {/* {client.isContractCreated === true && "sim" || "não"} */}
                </CheckListItem>
                <CheckListItem item="Entrada efetuada:">
                    <div className="toggle-switch">
                        <input type="checkbox" checked={client.isDepositPaid} onChange={() => updateClients(Number(clientId),  {isDepositPaid: !client.isDepositPaid} )} />
                        <span className="slider"></span>
                    </div>
                    {/* {client.isDepositPaid === true && "sim" || "não"} */}
                </CheckListItem>
            </ul>
        </div>
    )
}





export default CheckList;


