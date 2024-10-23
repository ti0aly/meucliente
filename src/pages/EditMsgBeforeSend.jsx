import { useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Subtitle from "../components/Subtitle";
import WhatsappIcon from "../components/WhatsappIcon";
import { Undo2 } from "lucide-react";
import ButtonMGREEN from "../components/ButtonMGREEN";
import ButtonMSLATE from "../components/ButtonMSLATE";

function EditMsgBeforeSend() {
    const navigate = useNavigate();
    const location = useLocation();
    const { msgFormatada, phone } = location.state || {};
    const [editedMsg, setEditedMsg] = useState();

    const handleChangeMsg = (e) => {
        setEditedMsg(e.target.value);  
    }

    // useEffect(() => {
    //     console.log(editedMsg);
    // }, [editedMsg])

    return (
        <div className='flex flex-col items-center min-w-40 w-full bg-slate-200 text-center h-screen'>
            
            <div className="max-w-xl space-y-2 ">
                
                <Subtitle>Edite e envie</Subtitle>
                <textarea 
                    className="w-full max-w-xl h-72 overflow-hidden p-2 rounded-xl" 
                    name="msgtext" 
                    id="" 
                    defaultValue={msgFormatada}
                    onChange={handleChangeMsg}>
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
                        <ButtonMGREEN
                            onClick={() => {
                                let formattedMsg;
                                if (editedMsg !== undefined) {
                                    formattedMsg = encodeURIComponent(editedMsg);
                                } else {
                                    formattedMsg = encodeURIComponent(msgFormatada);
                                }
                                const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${formattedMsg}`;
                                window.open(whatsappURL, '_blank')
                            }}
                        
                            >
                        
                            <WhatsappIcon></WhatsappIcon>&nbsp;Enviar agora
                        </ButtonMGREEN>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default EditMsgBeforeSend