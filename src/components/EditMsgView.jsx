import { useContext } from "react";

import ClientsContext from "../contexts/ClientsContext";
import { Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditMsgView() {
    const { userData, userMessages, setUserMessages, setDataServer } = useContext(ClientsContext);
    const navigate = useNavigate();
    const handleRemoveUserMessage = (indexToRemove) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta mensagem?");
        if (confirmDelete) {
            const updatedMessagesArray = userMessages.filter((_, index) => index !== indexToRemove);
            setUserMessages(updatedMessagesArray);
            setDataServer("msgsdegusta", userData.uid, updatedMessagesArray);
        }
    }

    // console.log("userMessages:", userMessages); // array de mensagens do user
    // console.log("clients: ", clients); // objeto de clientes
    // console.log("userData: ", userData); // userData.email or (displayName - photoURL - uid) 
    // console.log("userName: ", userName); // Esse nome já é o nome customizado
    
   
    return (
        <div>
            <div>
                <ul className="space-y-2">
                    {
                    userMessages.map((msg, index) =>
                        <li key={index} className="flex justify-between p-[2px] border border-mcverdeescuro rounded-lg m-1 bg-white">
                            <p 
                                className="text-sm text-mcverdeescuro rounded-lg p-2 bg-white text-justify w-full resize-none overflow-hidden"
                            >
                                {msg}
                            </p>
                            <div className="flex flex-col justify-start space-y-1 rounded-lg">
                                <button className="bg-mcmenta p-1 border-2 border-mcverdeescuro rounded-lg flex justify-center"
                                    onClick={() => {
                                        handleRemoveUserMessage(index)
                                    }}    
                                >
                                    <X className="w-5 "/>
                                </button>
{/* 
                                <button className="bg-slate-200 p-2 rounded-lg flex justify-center"
                                    onClick={() => {
                                        const msgFormated = formatVariableString(msg);
                                        alert(formatVariableString(msg));

                                        
                                    }}
                                >
                                    <Glasses />
                                </button> */}

                                <button 
                                    className="bg-mcmenta p-1 border-2 border-[#26312d] rounded-lg flex justify-center"
                                    onClick={() => {
                                        const query = new URLSearchParams();
                                        // query.set("msg", msg);
                                        query.set("index", index);
                                        navigate(`/editmsgpage?${query.toString()}`);
                                        }
                                    }
                                    >
                                    <Pencil className="w-4"/>
                                </button>
                            </div>

                        </li>
                        )
                    }

                </ul>
            </div>
        </div>

    )
}



export default EditMsgView;