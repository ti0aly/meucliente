import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import Title from "../components/Title";
import CheckList from "../components/CheckList";
import ClientsContext from "../contexts/ClientsContext";

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
    const mensagens = [
        `Olá ${(client.name).split(" ")[0]}, aqui é o Alysson da banda DEGUSTASOM, tudo bem? Entro em contato pela solicitação de orçamento recebida.\n\nVerifiquei sua data ${client.data !== "" && client.data || "" } e ainda está disponível, gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
        `Olá ${client.name}, segue o orçamento solicitado.`,
        `Olá ${client.name}, tudo bem? O que acharam da nossa proposta? Está dentro do que estavam prevendo de orçamento pra música do casamento?`
     ] ;
    return (
        <div className="flex justify-center">
            <div className="bg-slate-200 min-w-80 max-w-lg text-center  rounded-md flex-row space-y-3 p-2 h-screen ">
                
                <Title>
                    {client.name}
                </Title>
                <p className="rounded-md bg-blue-200 p-1 text-lg">
                    Status: {status[client.clientStatus]}
                </p>
                <button
                    onClick={() => navigate(`/meucliente/initial/`)}
                    className="absolute left-0 top-0 bottom-0 text-lg">
                    <ChevronLeftIcon />
                </button>
                <CheckList clientId={clientId}></CheckList>

                <div className="flex space-x-2 justify-around py-5">
                    <button
                        onClick={() => {
                            const query = new URLSearchParams();
                            query.set("id", client.id);
                            navigate(`/meucliente/editclient?${query.toString()}`);
                        }}
                        className="bg-slate-50 rounded-md p-1 text-lg w-32">
                        Editar
                    </button>

                    <button
                        onClick={() => {
                            const name = client.name;
                            const phone = client.phone;
                            const msg = mensagens[client.clientStatus];
                            const mensagemFormatada = encodeURIComponent(msg);
                            window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${mensagemFormatada}`, '_blank')
                        }}
                        className="bg-green-300 rounded-md p-1 text-lg w-32">
                        Whatsapp
                    </button>


                </div>
            </div>
        </div>
    )
}




export default ClientPage;


