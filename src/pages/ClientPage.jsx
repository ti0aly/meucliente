import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import Title from "../components/Title";
import CheckList from "../components/CheckList";
import ClientsContext from "../contexts/ClientsContext";


function ClientPage() {
    const {clients, updateClients} = useContext(ClientsContext);
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


    // const [clients, setClients] = useState(
    //     // converte a string salva no navegador para objeto
    //     JSON.parse(localStorage.getItem("clients")) || []
    //   );
    
    const client = clients.find(client => client.id === Number(clientId));
    const mensagens = [
        `Olá ${client.name}, sou o Alysson da banda DEGUSTASOM, tudo bem? Entro em contato pela solicitação de orçamento recebida. 
        Verifiquei sua data e ainda está disponível!
        Gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
        `Olá ${client.name}, segue o orçamento solicitado.`,
        `Olá ${client.name}, tudo bem? O que acharam da nossa proposta? Está dentro do que estavam prevendo de orçamento pra música do casamento?`
     ] ;
    return (
        <div className="flex justify-center">
            <div className="bg-slate-200 min-w-80 max-w-lg w-auto rounded-md flex-row space-y-3 p-4">
                <Title>
                    {client.name}
                </Title>
                <p className="rounded-md bg-blue-200 p-1 text-lg">
                    Status: {status[client.clientStatus]}
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 top-0 bottom-0 text-lg">
                    <ChevronLeftIcon />
                </button>
                <CheckList clientId={clientId}></CheckList>
                <button
                    onClick={() => {
                        const name = client.name;
                        const phone = client.phone;
                        const msg = mensagens[client.clientStatus];
                        const mensagemFormatada = encodeURIComponent(msg);
                        window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${mensagemFormatada}`, '_blank')
                    }}
                    className="rounded-md bg-green-400 p-1">
                    Enviar mensagem
                </button>
                <button
                    // vou deixar esse botão de exemplo pra edição das variaveis dos objetos
                    onClick={() => updateClients(Number(clientId),  {isBudgetResponded: true} )}
                    className="rounded-md bg-green-400 p-1 m-1">
                    Exemplo botão
                </button>
            </div>
        </div>
    )
}




export default ClientPage;


