import Title from "../components/Title";
import DeletedClientView from "../components/DeletedClientView";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import InfoBar2 from "../components/InfoBar2";
import ButtonM from "../components/ButtonM";

function RecicledClientPage() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center min-w-72 text-center h-screen'>
            <InfoBar2/>
            <div className="max-w-xl min-w-72 space-y-1 justify-center pt-5">
                
                <Title></Title>
                
                <div className="bg-[#ffeedb] m-1 rounded-bl-xl rounded-xl " >
                    
                    <div className="flex justify-between p-1 items-end">
                    <h1 className="text-xl font-semibold">Lista de clientes Excluídos:</h1>
                        <ButtonM className="bg-blue-200 rounded-md p-2 text-lg w-36"
                            onClick={() =>{
                                navigate(`/initial/`)
                                }}>
                                <Undo2 size={20} />
                        </ButtonM>
                    </div>
                    <DeletedClientView></DeletedClientView>

                </div>
            </div>
        </div>
    )
}

export default RecicledClientPage;