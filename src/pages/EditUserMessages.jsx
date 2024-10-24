import Title from "../components/Title"
import EditMsgView from "../components/EditMsgView"
import { useNavigate } from "react-router-dom";
import { MailPlus } from "lucide-react";
import ButtonM from "../components/ButtonM";
import { useEffect, useContext } from "react";
import ClientsContext from "../contexts/ClientsContext";
import NavBar from "../components/NavBar";
import InfoBar2 from "../components/Infobar2";
import Variables from "../components/Variables";


function EditUserMessages() {
    const navigate = useNavigate();
    const { userData } = useContext(ClientsContext);
    
    useEffect(() => { // verify login
        if (userData === undefined) {
            navigate('/initial'); 
        }
    }, [userData, navigate]);

    return (
    <>
        { userData !== undefined ? (
            <div className='flex justify-around min-w-72 w-full bg-white text-center p-1 pt-3'>
                    <div className="min-w-72 max-w-xl ">
                        <InfoBar2 ></InfoBar2>
                    <Title></Title>
                    
                    <NavBar namePage={"Mensagens"}></NavBar>
                    <div className="bg-mcbege rounded-b-lg rounded-tr-lg shadow-lg" >
                            
                                <div className="flex justify-between p-2 min-w-28">
                                    <Variables />
                            <div className="">
                                <ButtonM
                                    onClick={() =>{ navigate("/addnewmsg/")}}
                                    >
                                    <MailPlus className="h-5 w-5" />
                                </ButtonM>
                            </div>
                            </div>
                        <EditMsgView></EditMsgView>
                        
                        

                    </div>
                    </div>
                    
                </div>
                
            )
                : (null)}

            </>
    )
}

export default EditUserMessages;