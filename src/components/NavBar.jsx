import NavBarBt from "./NavBarBt";
import { useNavigate } from "react-router-dom";

function NavBar({ props, namePage }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-start">
            <NavBarBt
                namePage={namePage}
                onClick={() =>{ navigate('/initial/')}}
            >Clientes</NavBarBt>
            <NavBarBt
                namePage={namePage}
                onClick={() =>{ navigate('/editusermessages/')}}
            >Mensagens</NavBarBt>
            <NavBarBt
                onClick={() =>{ navigate('/schedule/')}}
                namePage={namePage}
            >Agenda</NavBarBt>
        </div>
    )
    
}

export default NavBar;