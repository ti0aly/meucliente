import { useContext } from "react";
import ClientsContext from "../contexts/ClientsContext";
import { Pencil } from "lucide-react";

function Subtitle() {

    const { userData, handleChangeCustomUserName, userName } = useContext(ClientsContext)
    return <div className="flex justify-center text-white rounded-xl text-base items-center">
                {userData !== undefined && 
                <>

                    <button
                        onClick={handleChangeCustomUserName} 
                        className="flex" >
                        {userName !== undefined && userName || userData.displayName }
                        <Pencil size={12}></Pencil>
                    </button>
                    
                    <img className='w-8 h-8 rounded-full ml-2'  src={ userData !== undefined && userData.photoURL  || "/images/icone.png"} alt="" />
                </> 
                || "Você precisa estar logado."}
    </div>
}

export default Subtitle;