import { useContext, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Subtitle from "../components/Subtitle";
import { Save, Undo2 } from "lucide-react";
import ButtonMBLUE from "../components/ButtonMBLUE";
import ButtonMSLATE from "../components/ButtonMSLATE";
import ClientsContext from "../contexts/ClientsContext";

function EditMsgPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const index = queryParams.get('index');
    const indexNumber = parseInt(index, 10);
    const { setUserMessages, userMessages, setDataServer, userData } = useContext(ClientsContext);
    const [editedMsg, setEditedMsg] = useState(userMessages[indexNumber]);

    const handleChangeMsg = (e) => {
        setEditedMsg(e.target.value);  
    }

    const handleChangeUserMessages = (index, newMessage) => {
        userMessages[index] = newMessage;
        setUserMessages(userMessages);
        setDataServer("msgsdegusta", userData.uid, userMessages);
    }

    // useEffect(() => {
    //     console.log(editedMsg);
    // }, [editedMsg])

    return (
        <div className='flex flex-col items-center min-w-40 w-full bg-slate-200 text-center h-screen'>
            
            <div className="max-w-xl space-y-2 ">
                
                <Subtitle>Edite a mensagem</Subtitle>
                <textarea 
                    className="w-full max-w-xl h-72 overflow-hidden p-2 rounded-xl" 
                    name="msgtext"
                    value={editedMsg}
                    onChange={handleChangeMsg}
                >
                </textarea>
                <div className="flex flex-wrap justify-center">
                    <div  className="p-1">
                         <ButtonMSLATE
                            onClick={() =>{ navigate(-1)}}
                            title="back"
                            >
                            <Undo2 />Voltar
                        </ButtonMSLATE>
                    </div>
                    <div  className="p-1">
                        <ButtonMBLUE 
                            onClick={() => {
                                handleChangeUserMessages(index, editedMsg);
                                navigate(-1);
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


export default EditMsgPage