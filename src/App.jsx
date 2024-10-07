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
  // const getDataServer = async (folder, clientId) => {
  //   const docRef = doc(db, folder, String(clientId));
  //   const docSnap = await getDoc(docRef);
  //   return docSnap;
  // }
  const clientListArray = async () => {
    const clientData = await receiveClientsServer('clientesdegusta');
    console.log("clientData[0]: ", clientData[0])
    console.log("clientData[0].clientObject: ", clientData[0].clientObject)
    setClients(clientData[0].clients);
  }
  
  const [clients, setClients] = useState();

  window.onload = (clientListArray);
  const setDataServer = async (folder, sellerId, clientObject) => {
    const docRef = doc(db, folder, sellerId);
    try {
      await setDoc(docRef, clientObject);
    } catch (error) {
      console.error("Error setting document:", error);
    }
  }

  // const dellDataServer = async (folder, clientId) => {
  //   const docRef = doc(db, folder, clientId);
  //   try {
  //     await deleteDoc(docRef);
  //     console.log(`Documento com ID ${clientId} foi apagado com sucesso!`);
  //   } catch (error) {
  //     console.error("Erro ao apagar o documento: ", error);
  //   }
  // }

   const receiveClientsServer = async (folder) => {
    const clientsCollection = collection(db, folder);
    const clientsSnapshot = await getDocs(clientsCollection);
    const clientsList = clientsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return clientsList
  }



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

  const dellClient = (id) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  useEffect(() => {
      if (clients !== undefined) {
      setDataServer('clientesdegusta', 'alysson', {clients});
      console.log("Clientes atualizados: ", {clients});
    }
  }, [clients]);


  return (
    <ClientsContext.Provider value={{clients, updateClients, addClient, dellClient}}>
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
