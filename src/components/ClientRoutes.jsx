import { Routes, Route } from "react-router-dom";
import InitialPage from "../pages/InitialPage";
import ClientPage from "../pages/ClientPage";
import NewClient from "../pages/NewClient";
import EditClientPage from "../pages/EditClientPage";
import EditDeletedClientPage from "../pages/EditDeletedClientPage";
import RecicledClientPage from "../pages/RecicledClientPage";
import LoginPage from "../pages/LoginPage";

function ClientRoutes () {
    return (
        <Routes>
            <Route path="/meucliente/" element={<InitialPage />} />
            <Route path="/meucliente/client/" element={<ClientPage />} />
            <Route path="/meucliente/newclient/" element={<NewClient />}/>
            <Route path="/meucliente/editclient/" element={<EditClientPage />}/>
            <Route path="/meucliente/editdeletedclient/" element={<EditDeletedClientPage />}/>
            <Route path="/meucliente/recicle/" element={<RecicledClientPage />}/>
            <Route path="/meucliente/login/" element={ <LoginPage /> } />
        </Routes>
    )
}

export default ClientRoutes;