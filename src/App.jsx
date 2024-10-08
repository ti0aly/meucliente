import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'
import ClientsContext from './contexts/ClientsContext'
import ClientRoutes from './components/ClientRoutes'

function App() {
  const [userData, setUserData] = useState();

  const setThisUserData = (userData) => {
    setUserData(userData);
  };

  const getClientListArray = async () => {
    console.log("userData.uid", userData.uid);
    const clientData = await receiveClientsServer("clientesdegusta", userData.uid);
    console.log("clientData: ", clientData);
    setClients(clientData);
  }

  const [clients, setClients] = useState();

  const setDataServer = async (folder, sellerId, clientObject) => {
    const docRef = doc(db, folder, sellerId);
    try {
      await setDoc(docRef, {clientObject}, { merge: true });
    } catch (error) {
      console.error("Error setting document:", error);
    }
  }

    const receiveClientsServer = async (folder, documentId) => {
    const docRef = doc(db, folder, documentId);
    const docSnapshot = await getDoc(docRef);
    console.log("docSnapshot: ", docSnapshot);
    const data = docSnapshot.data();
    console.log("data: ", data);

    return data
  }

  const updateClients = (id, newClientData) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, ...newClientData } : client 
      )
    );
  }

  const addClient = (newClientData) => { 
    setClients((prevClients) => {
      console.log("prevClients", prevClients);
      console.log("newClientData", newClientData);
      // Check if prevClients is empty
      if (prevClients === undefined) {
        return [{ ...newClientData }];
      } else {
        return [...prevClients, { ...newClientData }];
      }
    });
  };

  const dellClient = (id) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  useEffect(() => {
      if (clients !== undefined) {
      setDataServer('clientesdegusta', userData.uid, clients);
      console.log("Clientes atualizados: ", clients);
    }
  }, [clients]);
  
  useEffect(() => {
    console.log("userData, in App.jsx: ", userData);
    if (userData !== undefined) {
      getClientListArray();
      console.log("userData.email: ", userData.email);
      console.log("userData.displayName: ", userData.displayName);
      console.log("userData.uid: ", userData.uid);
      console.log("userData.photoURL: ", userData.photoURL);
    }
  }, [userData]);

  return (
    <ClientsContext.Provider value={{clients, userData, updateClients, addClient, dellClient, setThisUserData}}>
      <ClientRoutes/>
    </ClientsContext.Provider>
  )
}

export default App
