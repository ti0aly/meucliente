import { useContext, useState} from "react"
import { useNavigate } from "react-router-dom";
import Subtitle from "../components/Subtitle";
import { Save, Undo2 } from "lucide-react";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ButtonMBLUE from "../components/ButtonMBLUE";
import ClientsContext from "../contexts/ClientsContext";

function AddNewMsg() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState();
    const {userMessages, setUserMessages, userData, setDataServer} = useContext(ClientsContext);
    
    const handleChangeUserMessages = (newMessage) => {
        const updatedMessagesArray = [...userMessages, newMessage];
        setUserMessages(updatedMessagesArray);
        setDataServer("msgsdegusta", userData.uid, updatedMessagesArray);
        
    }

    const handleChangeMsg = (e) => {
        setMsg(e.target.value);  
    }

    // useEffect(() => {
    //     console.log(editedMsg);
    // }, [editedMsg])

    return (
        <div className='flex flex-col items-center min-w-72 w-full bg-slate-200 text-center h-screen'>
            
            <div className="max-w-xl space-y-2 ">
                
                <Subtitle>Crie uma nova mensagem</Subtitle>
                <div className="rounded-lg border border-white p-1">
                    <h1>Utilize as variáveis para tornar suas mensagens mais completas:</h1>

                    <ul className="max-w-64 mx-auto text-justify ">
                        <li><strong>&meunome</strong>- (adiciona seu nome)</li>
                        <li><strong>&cliente</strong> - (nome do seu cliente)</li>
                        <li><strong>&data</strong> - (data do serviço)</li>
                        <li><strong>&ola</strong> - (bom dia/tarde/noite)</li>
                    </ul>
                </div>
                <textarea 
                    className="w-full max-w-xl h-72 overflow-hidden p-2 rounded-xl" 
                    name="msgtext" 
                    id="" 
                    defaultValue={msg}
                    onChange={handleChangeMsg}>
                </textarea>
                <div className="flex flex-wrap justify-center max-w-xl">

                    <div className="p-1">
                        <ButtonMSLATE
                        
                            onClick={() =>{ navigate(-1)}}
                        
                            title="back"
                            >
                            <Undo2 />Voltar
                        </ButtonMSLATE>
                    </div>
                    <div className="p-1">
                    <ButtonMBLUE
                        onClick={() => {
                                handleChangeUserMessages(msg);
                                navigate(-1); 
                                console.log(userData.uid);
                        }}
                        >
                    
                        <Save />&nbsp;Salvar
                        </ButtonMBLUE>
                        </div>
                </div>
            </div>

        </div>
    )
}


export default AddNewMsg