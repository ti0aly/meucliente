import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'
import ClientsContext from './contexts/ClientsContext'
import ClientRoutes from './components/ClientRoutes'

function App() {
  const [userData, setUserData] = useState();
  const [flagUpdateServer, setFlagUpdateServer] = useState(0);

  const setThisUserData = (userData) => {
    setUserData(userData);
    getClientListArray(userData);
    // setTimeout(() => getClientListArray(userData), 2000);
  };

  const callUpdateByIncreaseFlag = () => {
    setFlagUpdateServer(prevFlag => prevFlag + 1);
  }

  const getClientListArray = async (userDataReceived) => {
    const clientData = await receiveClientsServer("clientesdegusta", userDataReceived.uid);
    setClients(clientData.clientObject);
  }
  
  const [clients, setClients] = useState();

  const setDataServer = async (folder, sellerId, clientObject) => {
    const docRef = doc(db, folder, sellerId);
    console.log("clientObject", {clientObject});
    try {

      await setDoc(docRef, {clientObject});
    } catch (error) {
      console.error("Error setting document:", error);
    }
  }

  const receiveClientsServer = async (folder, documentId) => {
    const docRef = doc(db, folder, documentId);
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data();
    console.log("data in receiveClientsServer: ", data);

    return data
  }

  const updateClients = (id, newClientData) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, ...newClientData } : client 
      )
    );
    callUpdateByIncreaseFlag();
  }

  const addClient = (newClientData) => { 
    setClients((prevClients) => {
      if (prevClients === undefined) {
        return [{ ...newClientData }];
      } else {
        return [...prevClients, { ...newClientData }];
      }
    });
    callUpdateByIncreaseFlag();
  };

  const dellClient = (id) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
    callUpdateByIncreaseFlag();
    
  };

  useEffect(() => {
      if (clients !== undefined) {
      console.log("Clientes atualizados: ", clients);
    }
  }, [clients]);

  useEffect(() => {
    if (userData !== undefined) {
    console.log("userData: ", userData);
    }
}, [userData]);

  useEffect(() => {
    if(flagUpdateServer > 0){
        setDataServer('clientesdegusta', userData.uid, clients);
        console.log("clients: ", clients);
        console.log("userData.uid: ", userData.uid);}
  }, [flagUpdateServer]);
  
  return (
    <ClientsContext.Provider value={{clients, userData, updateClients, addClient, dellClient, setThisUserData}}>
      <ClientRoutes/>
    </ClientsContext.Provider>
  )
}

export default App
