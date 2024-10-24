import { Bolt, Construction } from "lucide-react"
import InfoBar2 from "../components/InfoBar2"
import NavBar from "../components/NavBar"
import Title from "../components/Title"

function Schedule() {


    return (
        <div className='flex justify-center  bg-white min-w-72 text-center h-screen p-1 pt-3 '>
            <div className="max-w-xl min-w-72 ">
                <InfoBar2 ></InfoBar2>
                <Title ></Title>
                <NavBar namePage={"Agenda"}></NavBar>
                <div className="bg-mcbege rounded-bl-xl rounded-br-xl min-h-72 min-w-full rounded-tr-xl w-full" >
                    <p className="font-custom font-semibold text-mcverdeescuro p-4">Em construção...</p>
                    <Bolt size={60} className="mx-auto text-mcverdeescuro animate-bounce"/>
                </div>
            </div>
        </div>
    )
}

export default Schedule