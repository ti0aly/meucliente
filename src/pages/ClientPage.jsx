import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import Title from "../components/Title";
import CheckList from "../components/CheckList";
import ClientsContext from "../contexts/ClientsContext";
import { Undo2 } from "lucide-react";
import WhatsappIconGreen from "../components/WhatsappIconGreen";
import ButtonMGREEN from "../components/ButtonMGREEN";
import InfoBar2 from "../components/InfoBar2";
import ButtonM from "../components/ButtonM";

function ClientPage() {
    const { clients } = useContext(ClientsContext);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));

    return (
        <div className='flex justify-center  bg-white min-w-72 text-center h-screen p-1 pt-3 '>
                        <div className="max-w-xl min-w-72 ">
                            <InfoBar2/>
                            <Title ></Title>
            <div className="bg-mcmenta border-2 border-mcverdeescuro  min-w-72 max-w-lg text-center rounded-md p-1">

                <h1 className="text-xl font-custom font-semibold">{client.name}</h1>
                
                    <div className="flex justify-end">


                    </div>
                <CheckList clientId={clientId}></CheckList>

                <div className="flex flex-wrap max-w-sm justify-around">
                    <ButtonM
                        onClick={() =>{ navigate("/initial/")}}
                        title="back"
                        >
                    <Undo2 />
                    </ButtonM>
                                                <ButtonMGREEN
                        
                            onClick={() =>{
                                const query = new URLSearchParams();
                                query.set("id", client.id);
                                if (client.phone === 0) {
                                    alert("Esse cliente não tem telefone cadastrado")
                                } else {
                                navigate(`/usermessages?${query.toString()}`);
                                }
                            }}
                            title="my messages"
                            >
                            <WhatsappIconGreen></WhatsappIconGreen>&nbsp;
                        
                        </ButtonMGREEN>
                </div>
                </div>
                </div>
        </div>
    )
}




export default ClientPage;


