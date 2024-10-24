import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClientsContext from "../contexts/ClientsContext";
import WhatsappIconGreen from "./WhatsappIconGreen";

function MsgView() {
    const [editedMsg, setEditedMsg] = useState({});
    const {clients, userMessages, formatVariableString, userName } = useContext(ClientsContext);
    const [params] = useSearchParams();
    const clientId = params.get('id');
    const client = clients.find(client => client.id === Number(clientId));
    const phone = client.phone;
    const clientName = client.name;
    const data = client.data;
    const objectWithParams = {
        clientName,
        userName,
        data,
    }

    const textareaRefs = useRef([]);

    const handleChangeMsg = (index, e) => {
        const newValue = e.target.value;
        setEditedMsg(prevState => ({
            ...prevState,
            [index]: newValue
        }));
        textareaRefs.current[index].style.height = 'auto';
        textareaRefs.current[index].style.height = `${textareaRefs.current[index].scrollHeight}px`;
    }

    useEffect(() => {
        userMessages.forEach((_, index) => {
            if (textareaRefs.current[index]) {
                textareaRefs.current[index].style.height = 'auto';
                textareaRefs.current[index].style.height = `${textareaRefs.current[index].scrollHeight}px`;
            }
        });
    }, [userMessages]);

    return (
        <div>
            <div>
                <ul className="space-y-2">
                    {
                    userMessages.map((msg, index) =>
                        <li key={index}  className="flex justify-between p-2 space-x-1 rounded-lg bg-white">
                            <textarea 
                                ref={el => textareaRefs.current[index] = el}
                                onChange={(e) => handleChangeMsg(index, e)}
                                defaultValue={formatVariableString(msg, objectWithParams)}
                                className="w-full max-w-xl overflow-hidden p-2 rounded-xl font-custom"
                                style={{ resize: 'none' }} 
                            />
                            <div className="flex flex-col justify-end space-y-1 rounded-lg">
                                <button 
                                    className=""
                                    onClick={() => {
                                        const currentMsg = editedMsg[index] || formatVariableString(msg, objectWithParams);
                                        const msgToSend = encodeURIComponent(currentMsg);
                                        window.open(`https://api.whatsapp.com/send?phone=+55${phone}&text=${msgToSend}`, '_blank')
                                    }}
                                >
                                    <WhatsappIconGreen />
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default MsgView;
