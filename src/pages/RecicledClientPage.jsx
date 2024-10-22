import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import DeletedClientView from "../components/DeletedClientView";
import { useNavigate } from "react-router-dom";
import ButtonMSLATE from "../components/ButtonMSLATE";
import { Undo2 } from "lucide-react";

function RecicledClientPage() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center bg-slate-200 min-w-72 text-center h-screen'>
            <div className="max-w-xl min-w-72 space-y-1 justify-center">
                <Title>Meu cliente</Title>
                <Subtitle>Clientes excluídos:</Subtitle>
                <DeletedClientView></DeletedClientView>
                <div className="flex justify-center">
                    <ButtonMSLATE className="bg-blue-200 rounded-md p-2 text-lg w-36"
                        onClick={() =>{
                            navigate(`/meucliente/initial/`)
                            }}>
                            <Undo2 /> Voltar
                    </ButtonMSLATE>
                </div>
            </div>
        </div>
    )
}

export default RecicledClientPage;