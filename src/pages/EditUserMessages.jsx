import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import EditMsgView from "../components/EditMsgView"
import { useNavigate } from "react-router-dom";
import { Undo2, MailPlus } from "lucide-react";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ButtonMBLUE from "../components/ButtonMBLUE";
import { useEffect, useContext } from "react";
import ClientsContext from "../contexts/ClientsContext";

function EditUserMessages() {
    const navigate = useNavigate();
    const { userData } = useContext(ClientsContext);
    
    useEffect(() => { // verify login
        if (userData === undefined) {
            navigate('/meucliente/initial'); 
        }
    }, [userData, navigate]);

    return (
    <>
        { userData !== undefined ? (
            <div className='flex justify-around min-w-72 w-full bg-slate-200 text-center p-4'>
                <div className="min-w-72 max-w-xl space-y-2 ">
                    <Title>Meu cliente</Title>
                    <Subtitle>Minhas mensagens</Subtitle>
                    <div className="rounded-lg border border-white">
                        <h1>Economize seu tempo, utilize variáveis para tornar suas mensagens mais eficientes:</h1>

                        <ul className="max-w-64 mx-auto text-justify ">
                            <li><strong>&meunome</strong>- (adiciona seu nome)</li>
                            <li><strong>&cliente</strong> - (nome do seu cliente)</li>
                            <li><strong>&data</strong> - (data do serviço)</li>
                            <li><strong>&ola</strong> - (bom dia/tarde/noite)</li>
                        </ul>
                    </div>
                    <>
                        
                        <EditMsgView></EditMsgView>
                        
                        <div className="flex flex-wrap justify-evenly">
                            <ButtonMSLATE 
                                className="flex justify-center p-1 text-gray-800 w-40 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                                onClick={() =>{ navigate(-1)}}
                                title="back"
                                >
                                <Undo2 />Voltar 
                            </ButtonMSLATE>
                            <ButtonMBLUE 
                                className="flex justify-center p-1 text-gray-800 w-40 bg-green-300 border border-gray-300 rounded-full shadow hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                                onClick={() =>{ navigate("/meucliente/addnewmsg/")}}
                                >
                                <MailPlus />Add Msg
                            </ButtonMBLUE>

                        </div>
                    </>
                </div>
            </div>)
                : (null)}
            </>
    )
}

export default EditUserMessages;