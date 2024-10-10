import React, { useContext } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import MsgView from "../components/MsgView"
import { useNavigate, useSearchParams } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { Undo2 } from "lucide-react";
import WhatsappIcon from "../components/WhatsappIcon";

function UserMessages() {
    const navigate = useNavigate();
    const { userData, clients } = useContext(ClientsContext);
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));

    // console.log("userData.displayName: ", userData.displayName);

    return (
        <div className='flex justify-around min-w-80 w-full bg-slate-200 text-center h-screen'>
            <div className="min-w-80 max-w-xl space-y-2 ">
                <Title>Meu cliente</Title>
                <Subtitle>
                {userData !== undefined && 
                <>
                    <img className='w-6 h-6 rounded-full mr-1'  src={ userData !== undefined && userData.photoURL  || ""} alt="" />
                    Mensagens de {userData.displayName}
                </> 
                || "Você precisa estar logado."}
                </Subtitle>
                {userData !== undefined
                ? (<>
                    <MsgView></MsgView>
                    <div className="flex flex-wrap justify-evenly">
                        <button 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={() =>{ navigate(-1)}}
                            title="back"
                            >
                        <Undo2 />Voltar 
                        </button>
                        <button 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-green-300 border border-gray-300 rounded-full shadow hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={() => {
                                const phone = client.phone;
                                window.open(`https://api.whatsapp.com/send?phone=55${phone}`, '_blank')
                            }}
                            >
                            
                            <WhatsappIcon></WhatsappIcon>&nbsp;Abrir conversa
                        </button>

                    </div>
                </>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default UserMessages;