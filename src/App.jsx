import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'
import ClientsContext from './contexts/ClientsContext'
import ClientRoutes from './components/ClientRoutes'

function App() {
  const [userData, setUserData] = useState();
  const [userMessages, setUserMessages] = useState();
  const [userName, setUserName] = useState();

  const [flagUpdateServer, setFlagUpdateServer] = useState(0);
  const callUpdateByIncreaseFlag = () => {
    setFlagUpdateServer(prevFlag => prevFlag + 1);
  }

  const setThisUserData = (userData) => {
    setUserData(userData);
    getClientListArray("clientesdegusta", userData);
    getUserData("usersdegusta", userData);
    getUserMessages("msgsdegusta", userData);
  };
  const defaultMessages = [
    `Olá &cliente, aqui é &meunome, tudo bem? Entro em contato pela solicitação de orçamento recebida. Verifiquei sua data &data e ainda está disponível, gostaria de confirmar contigo a cidade e o número aproximado de convidados que estão calculando, para poder te passar valores.`,
    `Olá &cliente, segue o orçamento solicitado.`,
    `Olá &cliente, tudo bem? A proposta enviada está dentro do orçamento de vocês pra música do casamento?`
  ];

  // collection string
  const getClientListArray = async (collection, userDataReceived) => {
    const clientData = await receiveClientsServer(collection, userDataReceived.uid);
    setClients(clientData.clientObject);
  }

  const getUserData = async (collection, userDataReceived) => {
    const userData = await receiveClientsServer(collection, userDataReceived.uid);
    if (userData !== undefined) {
      const objectCustom = userData.clientObject;
      // console.log("objectCustom in getUserData: ", objectCustom);
      // console.log("objectCustom.customName in getUserData: ", objectCustom.customName);
      setUserName(objectCustom.customName);
    } 
  }


  

  const getUserMessages = async (collection, userDataReceived) => {
    const userData = await receiveClientsServer(collection, userDataReceived.uid);
    // console.log("collection in getUserMessages in App.jsx", collection);
    // console.log("userData in getUserMessages in App.jsx", userData);
    // console.log("userDataReceived in getUserMessages in App.jsx", userDataReceived);
    if (userData !== undefined) {
      const objectCustom = userData.clientObject;
      // console.log("objectCustom in getUserMessages: ", objectCustom);
      setUserMessages(objectCustom);
    } else {
      setUserMessages(defaultMessages);
      setDataServer("msgsdegusta", userDataReceived.uid, defaultMessages)

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

//   useEffect(() => {
//     if (userCustomData !== undefined) {
//       console.log("userCustomData in useEffect: ", userCustomData);
//       console.log("userCustomData.customName in useEffect: ", userCustomData.customName);
//     }
// }, [userCustomData]);

  useEffect(() => {
    if(flagUpdateServer > 0) {
        setDataServer('clientesdegusta', userData.uid, clients);
        // console.log("clients: ", clients);
        // console.log("userData.uid: ", userData.uid);
        }
  }, [flagUpdateServer]);

  const obterSaudacao = () => {
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao;
  
    if (hora >= 0 && hora < 12) {
      saudacao = "bom dia";
    } else if (hora >= 12 && hora < 18) {
      saudacao = "boa tarde";
    } else {
      saudacao = "boa noite";
    }
  
    return saudacao;
  }

  const formatDataBr = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
  }

  const formatVariableString = (str, objectWithParams) => {

    const variableClientName = objectWithParams.clientName;
    const variableUserName = objectWithParams.userName;
    const data = objectWithParams.data;
    const formatedData = formatDataBr(data);
    const saudacao = obterSaudacao();
    let newString = str
      .replace(/&cliente/g, variableClientName.split(' ')[0]) // first name only 
      .replace(/&meunome/g, variableUserName)
      .replace(/&ola/g, saudacao)
      .replace(/&data/g, formatedData);
    
    // first upper (to undo >> just return newString)
    return (newString.charAt(0).toUpperCase() + newString.slice(1))
  }

  

  return (
    <ClientsContext.Provider value={{clients, userName, userData, userMessages, obterSaudacao, setDataServer, updateClients, addClient, dellClient, setThisUserData, setUserData, handleChangeCustomUserName, setUserMessages, formatVariableString}}>
      <ClientRoutes/>
    </ClientsContext.Provider>
  )
}

export default App
