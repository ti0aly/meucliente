import { useContext } from "react";
import Title from "../components/Title"
import MsgView from "../components/MsgView"
import { useNavigate, useSearchParams } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { Undo2 } from "lucide-react";
import WhatsappIcon from "../components/WhatsappIcon";
import InfoBar2 from "../components/Infobar2";

function UserMessages() {
    const navigate = useNavigate();
    const { userData, clients } = useContext(ClientsContext);
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));

    return (
        <div className='flex justify-around min-w-72 w-full bg-white pt-4 text-center  h-screen'>
            <InfoBar2 ></InfoBar2>
            <div className="min-w-72 max-w-xl space-y-2">
                <Title></Title>

                {userData !== undefined
                ? (<div className="bg-mcbege m-1 rounded-xl shadow-lg p-2" >
                        <p className="p-2 font-custom font-semibold text-mcverdeescuro">Enviar para {client.name }</p>
                    <MsgView></MsgView>
                    <div className="flex flex-wrap justify-evenly py-3">
                        <button 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-slate-100 border border-gray-300 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={() =>{ navigate(-1)}}
                            title="back"
                            >
                        <Undo2 />
                        </button>
                        <button 
                            className="flex justify-center p-1 text-gray-800 w-40 bg-green-300 border border-gray-300 rounded-full shadow hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
                            onClick={() => {
                                const phone = client.phone;
                                window.open(`https://api.whatsapp.com/send?phone=55${phone}`, '_blank')
                            }}
                            >
                            
                            <WhatsappIcon></WhatsappIcon>&nbsp;Abrir
                        </button>

                    </div>
                </div>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default UserMessages;