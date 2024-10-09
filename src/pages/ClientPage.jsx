import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import Title from "../components/Title";
import CheckList from "../components/CheckList";
import ClientsContext from "../contexts/ClientsContext";
import { Pencil } from "lucide-react";

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
            <div className="bg-slate-200 min-w-80 max-w-lg text-center  rounded-md flex-row space-y-3 p-2">
                
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
                        className="flex text-gray-800 p-3 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150">
                        <Pencil />Edit
                    </button>

                    <button
                        onClick={() => {
                            const name = client.name;
                            const phone = client.phone;
                            const msg = mensagens[client.clientStatus];
                            const mensagemFormatada = encodeURIComponent(msg);
                            window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${mensagemFormatada}`, '_blank')
                        }}
                        className=" bg-green-300 rounded-full p-2 w-12">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                        
                    </button>


                </div>
            </div>
        </div>
    )
}




export default ClientPage;


