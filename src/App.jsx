import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { doc, getDoc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db } from './firebase-config'
import ClientsContext from './contexts/ClientsContext'
import ClientPage from './pages/ClientPage'
import InitialPage from './pages/InitialPage'
import NewClient from './pages/NewClient'
import EditClientPage from './pages/EditClientPage'

function App() {
  const getData = async (folder, clientId) => {
    const docRef = doc(db, folder, String(clientId));
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  const setData = async (folder, clientId, clientObject) => {
    const docRef = doc(db, folder, String(clientId));
    try {
      await setDoc(docRef, clientObject);
      setaddIndicator(true);
    } catch (error) {
      console.error("Error setting document:", error);
    }
  }

  const deleteData = async (folder, clientId) => {
    console.log("chamou delete data");
    const docRef = doc(db, folder, clientId);
    try {
      await deleteDoc(docRef);
      console.log(`Documento com ID ${clientId} foi apagado com sucesso!`);
      setdellIndicator(true);
    } catch (error) {
      console.error("Erro ao apagar o documento: ", error);
    }
  }
  
  const receiveClients = async (folder) => {
    const clientsCollection = collection(db, folder);
    const clientsSnapshot = await getDocs(clientsCollection);
    const clientsList = clientsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return clientsList
  }
  const clientListArray = async () => {
    const clientData = await receiveClients('clientesdegusta');
    setClients(clientData);
  }
  
  const [clients, setClients] = useState([   
    {
    id: 0,
    name: ". . .",
    phone: 0,
    data: "",
    cidade: "",
    convidados: 0,
    isDataAvailable: false,
    clientStatus: 0,
    isContacted: false,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  }
]);

  window.onload = (clientListArray);

  const updateClients = (id, newClientData) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, ...newClientData } : client 
      )
      
    );
  }
  const addClient = (newClientData) => {
    setClients((prevClients) => [
      ...prevClients,
      { ...newClientData } 
    ]);
  };


  useEffect(() => {
    console.log("Clientes atualizados: ", clients);
  }, [clients]);

  const [dellIndicator, setdellIndicator] = useState(false);
  const [addIndicator, setaddIndicator] = useState(false);
  return (
    <ClientsContext.Provider value={{clients, updateClients, addClient, setData, getData, deleteData, dellIndicator, addIndicator}}>
      <Routes>
        <Route path="/meucliente/" element={<InitialPage />} />
        <Route path="/meucliente/client/" element={<ClientPage />} />
        <Route path="/meucliente/newclient/" element={<NewClient />}/>
        <Route path="/meucliente/editclient/" element={<EditClientPage />}/>
      </Routes>
    </ClientsContext.Provider>
  )
}

export default App
