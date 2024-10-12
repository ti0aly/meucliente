import { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import { Pencil } from "lucide-react";
import WhatsappIconMini from "./WhatsappIcon";
import ButtonMSLATE from "./ButtonMSLATE";

function EditMsgView() {
    const {clients, userData, userName } = useContext(ClientsContext);

    const mensagens = [
        `Olá , aqui é da banda DEGUSTASOM, tudo bem? Entro em contato pela solicitação de orçamento recebida.\n\nVerifiquei sua data  e ainda está disponível, gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
        `segue o orçamento solicitado.`,
        `tudo bem? A proposta enviada está dentro do orçamento de vocês pra música do casamento?`
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
                                    >
                                    <Pencil className="w-4"/>
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



export default EditMsgView;