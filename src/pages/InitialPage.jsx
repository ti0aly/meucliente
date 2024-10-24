import { useContext, useEffect } from "react";
import ClientView from "../components/ClientView"
import { useNavigate } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import LoginComponent from "../components/LoginComponent";
import { auth, onAuthStateChanged } from "../firebase-config";
import { UserPlus } from "lucide-react";
import Title from "../components/Title";
import NavBar from "../components/NavBar";
import ButtonM from "../components/ButtonM";
import InfoBar2 from "../components/InfoBar2";

function InitialPage() {
    const navigate = useNavigate();
    const { userData, setUserData, setThisUserData } = useContext(ClientsContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
        if (userData) {
            setUserData(userData);
            setThisUserData(userData);
        } else {
            setUserData(null);
            console.log('Nenhum usuário logado');
        }
        });
        return () => unsubscribe();
    }, [auth]);


    return (
        
        <div className='flex justify-center  bg-white min-w-72 text-center h-screen p-1 pt-3 '>
            <div className="max-w-xl min-w-72 ">
                <InfoBar2 ></InfoBar2>
                <Title ></Title>
                <NavBar namePage={"Clientes"}></NavBar>

                {userData !== undefined
                    ? (<div className="bg-mcbege rounded-bl-xl rounded-br-xl  rounded-tr-xl w-full" >
                        
                            <div className="flex justify-end shadow-black p-2">
                                <ButtonM
                                    onClick={() =>{ navigate('/newclient/')}}
                                    title="add client"
                                    >
                                    <UserPlus size={20} />
                                </ButtonM>
                            </div>
                    <ClientView></ClientView>

                    <div className="flex flex-wrap justify-center items-center">




                    </div>
                </div>)
                : <LoginComponent></LoginComponent>}
            </div>
        </div>
    )
}

export default InitialPage;