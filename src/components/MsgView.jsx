import { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import { Pencil } from "lucide-react";
import WhatsappIconMini from "./WhatsappIcon";

function MsgView() {
    const {clients, userData, userName } = useContext(ClientsContext);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));
    const mensagens = [
        `Olá ${(client.name).split(" ")[0]}, aqui é ${userName !== undefined && userName || userData.displayName } da banda DEGUSTASOM, tudo bem? Entro em contato pela solicitação de orçamento recebida.\n\nVerifiquei sua data ${client.data !== "" && client.data || "" } e ainda está disponível, gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
        `Olá ${(client.name).split(" ")[0]}, segue o orçamento solicitado.`,
        `Olá ${(client.name).split(" ")[0]}, tudo bem? A proposta enviada está dentro do orçamento de vocês pra música do casamento?`
     ] ;

    return (
        <div>
            <div>
                <ul className="space-y-2">
                    {
                    mensagens.map((msg, index) =>
                        <li key={index} className="flex justify-between p-2 space-x-1 rounded-lg bg-white">
                            <p 
                                className="text-base rounded-lg p-2 bg-white-100 text-justify w-full resize-none overflow-hidden"
                            >
                                {msg}
                            </p>
                            <div className="flex flex-col justify-end space-y-1 rounded-lg">
                                <button 
                                    className="bg-slate-200 p-2 rounded-lg flex justify-center"
                                    onClick={() => {
                                            const phone = client.phone;
                                            navigate('/meucliente/editbeforesend/', {
                                                state: { msg , phone }
                                        })
                                        }
                                    }
                                    >
                                    <Pencil className="w-5"/>
                                </button>
                                <button 
                                    className="bg-green-300 p-2 rounded-lg flex justify-center"
                                    onClick={() => {
                                        const name = client.name;
                                        const phone = client.phone;
                                        const mensagemFormatada = encodeURIComponent(msg);
                                        window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${msg}`, '_blank')
                                    }}
                                    >
                                <WhatsappIconMini></WhatsappIconMini>
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