import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import { Pencil } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";

function MsgView() {
    const {clients} = useContext(ClientsContext);
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));
    
    const mensagens = [
        `Olá ${(client.name).split(" ")[0]}, aqui é o Alysson da banda DEGUSTASOM, tudo bem? Entro em contato pela solicitação de orçamento recebida.\n\nVerifiquei sua data ${client.data !== "" && client.data || "" } e ainda está disponível, gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
        `Olá ${client.name}, segue o orçamento solicitado.`,
        `Olá ${client.name}, tudo bem? O que acharam da nossa proposta? Está dentro do que estavam prevendo de orçamento pra música do casamento?`
     ] ;

    


    return (
        <div>
            <div>
                <ul className="space-y-2">
                    {
                    mensagens.map((msg, key) =>
                        <li className="flex justify-between p-2 space-x-1 rounded-lg bg-white">
                            <p 
                            
                                className="text-base rounded-lg p-2 bg-white-100 text-justify w-full resize-none overflow-hidden"
                                key={key}
                            >
                                {msg}
                            </p>
                            <div className="flex flex-col justify-end space-y-1 rounded-lg">
                                <button className="bg-slate-200 p-2 rounded-lg ">
                                    <Pencil />
                                </button>
                                <button 
                                    className="bg-green-300 p-2 rounded-lg "
                                    onClick={() => {
                                        const name = client.name;
                                        const phone = client.phone;
                                        const msg = mensagens[client.clientStatus];
                                        const mensagemFormatada = encodeURIComponent(msg);
                                        window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${mensagemFormatada}`, '_blank')
                                    }}
                                    >
                                <WhatsappIcon></WhatsappIcon>
                                </button>
                            </div>

                        </li>
                        )
                    }

                </ul>
            </div>
        </div>

    )
}



export default MsgView;