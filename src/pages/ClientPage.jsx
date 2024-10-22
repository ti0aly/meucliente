import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CheckList from "../components/CheckList";
import ClientsContext from "../contexts/ClientsContext";
import { Undo2, UserRoundPen } from "lucide-react";
import WhatsappIcon from "../components/WhatsappIcon";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ButtonMGREEN from "../components/ButtonMGREEN";

function ClientPage() {
    const { clients } = useContext(ClientsContext);
    const status = [
        "Fazer primeiro contato", 
        "Enviar orçamento", 
        "Feedback do orçamento", 
        "Fazer contrato", 
        "Receber entrada", 
        "Venda finalizada"
      ];

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));

    return (
        <div className="flex justify-center">
            <div className="bg-slate-200 min-w-72 max-w-lg text-center rounded-md space-y-3 p-1">
                
                <Title >
                    {client.name}
                </Title>
                <Subtitle>
                    Status: {status[client.clientStatus]}
                </Subtitle>

                <CheckList clientId={clientId}></CheckList>

                <div className="flex flex-wrap max-w-sm justify-around">
                <ButtonMSLATE
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`/meucliente/editclient?${query.toString()}`);
                        }}
                        >
                        <UserRoundPen />&nbsp;
                        Editar
                    </ButtonMSLATE>
                    <ButtonMGREEN 
                        
                        onClick={() =>{ 
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            if (client.phone === 0) {
                                alert("Esse cliente não tem telefone cadastrado")
                            } else {
                            navigate(`/meucliente/usermessages?${query.toString()}`);
                            }
                        }}
                        title="my messages"
                        >
                        <WhatsappIcon></WhatsappIcon>&nbsp;
                        Mensagem
                    </ButtonMGREEN>

                    <ButtonMSLATE 
                            onClick={() =>{ navigate("/meucliente/initial/")}}
                            title="back"
                            >
                        <Undo2 />Voltar 
                    </ButtonMSLATE>
                </div>
            </div>
        </div>
    )
}




export default ClientPage;


