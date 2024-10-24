import { useContext } from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import MsgView from "../components/MsgView"
import { useNavigate, useSearchParams } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { Undo2, Pencil } from "lucide-react";
import WhatsappIcon from "../components/WhatsappIcon";
import NavBar from "../components/NavBar";

function UserMessages() {
    const navigate = useNavigate();
    const { userData, clients, userName, handleChangeCustomUserName } = useContext(ClientsContext);
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));

    return (
        <div className='flex justify-around min-w-72 w-full bg-slate-200 text-center h-screen'>
            <div className="min-w-72 max-w-xl space-y-2 ">
                <Title></Title>
                <Subtitle>
                {userData !== undefined && 
                <>
                    <img className='w-6 h-6 rounded-full mr-1'  src={ userData !== undefined && userData.photoURL  || ""} alt="" />
                    Seu nome:&nbsp; 
                    <button
                        onClick={handleChangeCustomUserName} 
                        className="flex" >
                        {userName !== undefined && userName || userData.displayName }
                        <Pencil className="w-3"></Pencil>
                    </button>
                </> 

                || "Você precisa estar logado."}
                </Subtitle>
                {userData !== undefined
                ? (<div className="bg-[#F5EDE4] m-1 rounded-b-lg rounded-tr-lg shadow-lg" >
                    <NavBar namePage={"Mensagens"}></NavBar>
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
                </div>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default UserMessages;