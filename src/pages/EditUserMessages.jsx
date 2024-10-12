import React, { useContext } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import EditMsgView from "../components/EditMsgView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import { Undo2, Pencil, MailPlus } from "lucide-react";
import ButtonMSLATE from "../components/ButtonMSLATE";

function EditUserMessages() {
    const navigate = useNavigate();
    const { userName, handleChangeCustomUserName } = useContext(ClientsContext);

    return (
        <div className='flex justify-around min-w-80 w-full bg-slate-200 text-center h-screen'>
            <div className="min-w-80 max-w-xl space-y-2 ">
                <Title>Meu cliente</Title>
                <Subtitle>Minhas mensagens</Subtitle>
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
                        <ButtonMSLATE 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-green-300 border border-gray-300 rounded-full shadow hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 

                            >
                            
                            <MailPlus />Add Msg
                        </ButtonMSLATE>

                    </div>
                </>
            </div>
        </div>
    )
}

export default EditUserMessages;