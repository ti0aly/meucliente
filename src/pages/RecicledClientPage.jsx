import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import DeletedClientView from "../components/DeletedClientView";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

function RecicledClientPage() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center bg-slate-200 min-w-80 text-center h-screen'>
            <div className="max-w-2xl min-w-80 space-y-1">
                <Title>Meu cliente</Title>
                <Subtitle>Clientes excluídos:</Subtitle>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 top-0 bottom-0 text-lg">
                    <ChevronLeftIcon />
                </button>
                <DeletedClientView></DeletedClientView>
                <button className="bg-blue-200 rounded-md p-2 text-lg w-36"
                    onClick={() =>{
                        navigate(`/meucliente`)
                        }}>
                        Voltar
                </button>
            </div>
        </div>
    )
}

export default RecicledClientPage;