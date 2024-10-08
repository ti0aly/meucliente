import React from "react";
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import LoginComponent from "../components/LoginComponent";


function LoginPage () {
    return (
        <div className='flex justify-center bg-slate-200 min-w-80 text-center h-screen'>
            <div className="max-w-2xl min-w-80 space-y-4">
                <Title>Meu cliente</Title>
                <Subtitle>
                    Comece agora!
                </Subtitle>

                <LoginComponent></LoginComponent>
            </div>
        </div>
    )
}

export default LoginPage;