import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'
import ClientsContext from './contexts/ClientsContext'
import ClientRoutes from './components/ClientRoutes'

function App() {
  const [userData, setUserData] = useState();
  const [userCustomData, setUserCustomData] = useState();
  const [userName, setUserName] = useState();

  const [flagUpdateServer, setFlagUpdateServer] = useState(0);
  const callUpdateByIncreaseFlag = () => {
    setFlagUpdateServer(prevFlag => prevFlag + 1);
  }

  const setThisUserData = (userData) => {
    setUserData(userData);
    // get all user clients  
    getClientListArray("clientesdegusta", userData);
    // get user data
    getUserData("usersdegusta", userData);
  };

  // collection string
  const getClientListArray = async (collection, userDataReceived) => {
    const clientData = await receiveClientsServer(collection, userDataReceived.uid);
    setClients(clientData.clientObject);
  }

  const getUserData = async (collection, userDataReceived) => {
    const userData = await receiveClientsServer(collection, userDataReceived.uid);
    if (userData !== undefined) {
      const objectCustom = userData.clientObject;
      console.log("objectCustom in getUserData: ", objectCustom);
      console.log("objectCustom.customName in getUserData: ", objectCustom.customName);
      setUserName(objectCustom.customName);
    }


  }

  const [clients, setClients] = useState();

  const setDataServer = async (folder, sellerId, clientObject) => {
    console.log("interagiu com o servidor! ", clientObject)
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
    const data = docSnapshot.data();
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

  const handleChangeCustomUserName = () => {
    const newName = prompt("Insira o novo nome para compor as suas mensagens: ");
    console.log(newName);
    if (newName !== undefined && newName !== null && newName.length > 1) {
      setDataServer('usersdegusta', userData.uid, {customName: newName});
      setUserName(newName);
    } 
    // setDataServer('usersdegusta', userData.uid, userCustomData);
  }

  // useEffect(() => {
  //     if (clients !== undefined) {
  //     console.log("Clients updated: ", clients);
  //   }
  // }, [clients]);

//   useEffect(() => {
//     if (userData !== undefined) {
//     console.log("userData: ", userData);
//     }
// }, [userData]);

  useEffect(() => {
    if (userCustomData !== undefined) {
      console.log("userCustomData in useEffect: ", userCustomData);
      console.log("userCustomData.customName in useEffect: ", userCustomData.customName);
    }
}, [userCustomData]);

  useEffect(() => {
    if(flagUpdateServer > 0) {
        setDataServer('clientesdegusta', userData.uid, clients);
        // console.log("clients: ", clients);
        // console.log("userData.uid: ", userData.uid);
        }
  }, [flagUpdateServer]);


    

  

  return (
    <ClientsContext.Provider value={{clients, userName, userData, updateClients, addClient, dellClient, setThisUserData, setUserData, handleChangeCustomUserName}}>
      <ClientRoutes/>
    </ClientsContext.Provider>
  )
}

export default App
