import React, {useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Subtitle from "../components/Subtitle";
import WhatsappIcon from "../components/WhatsappIcon";
import { Undo2 } from "lucide-react";

function EditMsgBeforeSend() {
    const navigate = useNavigate();
    const location = useLocation();
    const { msg, phone } = location.state || {};
    const [editedMsg, setEditedMsg] = useState();

    const handleChangeMsg = (e) => {
        setEditedMsg(e.target.value);  
    }

    // useEffect(() => {
    //     console.log(editedMsg);
    // }, [editedMsg])

    return (
        <div className='flex flex-col items-center min-w-80 w-full bg-slate-200 text-center h-screen'>
            
            <div className="min-w-80 max-w-xl space-y-2 ">
                
                <Subtitle>Edite e envie</Subtitle>
                <textarea 
                    className="w-full max-w-xl h-72 overflow-hidden p-2 rounded-xl" 
                    name="msgtext" 
                    id="" 
                    defaultValue={msg}
                    onChange={handleChangeMsg}>
                </textarea>
                <div className="flex justify-center">

                    <button
                        className="flex justify-center p-1 text-gray-800 w-40 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                        onClick={() =>{ navigate(-1)}}
                    
                        title="back"
                        >
                        <Undo2 />Voltar
                    </button>
                    <button
                        className="flex justify-center items-center p-1 text-gray-800 w-40 bg-green-300 border border-gray-300 rounded-full shadow hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                        onClick={() => {
                            const formattedMsg = encodeURIComponent(editedMsg);
                            const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${formattedMsg}`;
                            window.open(whatsappURL, '_blank')
                        }}
                    
                        >
                    
                        <WhatsappIcon></WhatsappIcon>&nbsp;Enviar agora
                    </button>
                </div>
            </div>

        </div>
    )
}


export default EditMsgBeforeSend