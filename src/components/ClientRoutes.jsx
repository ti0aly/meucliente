import { Routes, Route } from "react-router-dom";
import InitialPage from "../pages/InitialPage";
import ClientPage from "../pages/ClientPage";
import NewClient from "../pages/NewClient";
import EditClientPage from "../pages/EditClientPage";
import EditUserMessages from "../pages/EditUserMessages";
import EditDeletedClientPage from "../pages/EditDeletedClientPage";
import RecicledClientPage from "../pages/RecicledClientPage";
import LoginPage from "../pages/LoginPage";
import UserMessages from "../pages/UserMessages";
import EditMsgBeforeSend from "../pages/EditMsgBeforeSend";
import AddNewMsg from "../pages/AddNewMsg";
import EditMsgPage from "../pages/EditMsgPage";
import AutoClient from "../pages/AutoClient";
import Settings from "../pages/Settings";

function ClientRoutes () {
    return (

        <Routes>
            <Route path="/initial/" element={<InitialPage />} />
            <Route path="/client/" element={<ClientPage />} />
            <Route path="/newclient/" element={<NewClient />}/>
            <Route path="/editclient/" element={<EditClientPage />}/>
            <Route path="/editdeletedclient/" element={<EditDeletedClientPage />}/>
            <Route path="/recicle/" element={<RecicledClientPage />}/>
            <Route path="/usermessages/" element={<UserMessages />} ></Route>
            <Route path="/editbeforesend/" element={ <EditMsgBeforeSend /> } ></Route>
            <Route path="/" element={ <LoginPage /> } />
            <Route path="/editusermessages/" element={<EditUserMessages />}></Route>
            <Route path="/addnewmsg/" element={<AddNewMsg />}></Route>
            <Route path="/editmsgpage/" element={<EditMsgPage />}></Route>
            <Route path="/autoclient/" element={<AutoClient />}></Route>
            <Route path="/settings/" element={<Settings />}></Route>
        </Routes>
        
    )
}

export default ClientRoutes;