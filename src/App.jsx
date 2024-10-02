import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientsContext from './contexts/ClientsContext'
import ClientPage from './pages/ClientPage'
import InitialPage from './pages/InitialPage'

function App() {
  const [clients, setClients] = useState([{
    id: 1,
    name: "Marilia pera",
    phone: 47999116611,
    data: "25/99/10",
    isDataAvailable: false,
    cidade: "Jaguara do Sul",
    convidados: 130,
    clientStatus: 0,
    isContacted: false,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  },
  {
    id: 2,
    name: "Lucas Maria",
    phone: 47999116611,
    data: "25/99/10",
    isDataAvailable: true,
    cidade: "Joinville",
    convidados: null,
    clientStatus: 0,
    isContacted: true,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  },
  {
    id: 3,
    name: "Antônia Cléia",
    phone: 47999116611,
    data: "25/99/10",
    isDataAvailable: true,
    cidade: "",
    convidados: null,
    clientStatus: 1,
    isContacted: false,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  },
  {
    id: 4,
    name: "Cintia",
    phone: 47997817663,
    data: "15/11/24",
    isDataAvailable: true,
    cidade: "",
    convidados: null,
    clientStatus: 0,
    isContacted: false,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  },
  {
    id: 5,
    name: "Nara",
    phone: 47999503983,
    data: "16/08/25",
    isDataAvailable: true,
    cidade: "Joinville",
    convidados: null,
    clientStatus: 0,
    isContacted: false,
    isBudgetSentToClient: false,
    isBudgetResponded: false,
    isContractCreated: false,
    isContractSigned: false,
    isDepositPaid: false,
    isTotalContractAmountPaid: false,
  },])
  const updateClients = (id, newClientData) => {
    setClients((prevClients) =>
      prevClients.map((client) =>

        client.id === id ? { ...client, ...newClientData } : client
        
      )
      
    );

  }
  useEffect(() => {
    console.log("Clientes atualizados: ", clients);
  }, [clients]);
  return (
    <ClientsContext.Provider value={{clients, updateClients}}>
      <Routes>
        <Route path="/meucliente" element={<InitialPage />} />
        <Route path="client" element={<ClientPage />} />
      </Routes>
    </ClientsContext.Provider>
  )
}

export default App
