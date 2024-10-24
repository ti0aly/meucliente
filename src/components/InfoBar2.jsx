import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useContext, useState } from "react";
import { auth } from "../firebase-config";
import ClientsContext from "../contexts/ClientsContext";
import { useNavigate } from "react-router-dom";
import { HouseIcon, LogOut, Menu, Settings, Trash2 } from "lucide-react"; 
import Subtitle from "./Subtitle";

function InfoBar2() {
    const { setThisUserData, setUserData } = useContext(ClientsContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do menu hamburguer

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

    const logoutFunction = () => {
        signOut(auth);
        setThisUserData(null);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Abre/fecha o menu
    };

    return (
      <nav className="fixed top-0 left-0 bg-[#202b27] text-white text-sm px-4 py-3 flex justify-between items-center shadow-md w-full z-10">
        <div className="flex items-start space-x-4">
          <button className="block md:hidden" onClick={toggleMenu}>
            <Menu size={24} />
          </button>

          <div className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:space-y-0 space-y-3`}>
            <button
              onClick={() => navigate('/initial')}
              className="hover:text-[#d7ffec] flex space-x-1 mr-5 "
            >
              <HouseIcon size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate('/recicle')} className="hover:text-[#d7ffec] flex space-x-1 mr-5">
              <Trash2 size={20}/>
              <span>Excluídos</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="hover:text-[#d7ffec] flex space-x-1 mr-5"
            >
              <Settings size={20} />
              <span>Configurações</span>
            </button>
            <button
              onClick={logoutFunction}
              title="sign out"
              className="flex space-x-1 mr-5">
              <LogOut size={20}/>
              <span>Sair</span>
            </button>
          </div>
        </div>
  
        {/* direita */}
        <div className="flex items-start">
            <Subtitle/>
        </div>
      </nav>
    );
}

export default InfoBar2;
