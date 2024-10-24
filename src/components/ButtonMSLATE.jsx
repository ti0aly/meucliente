function ButtonMSLATE({onClick, children}) {
    return (
        <button
        onClick={onClick}
        className="flex p-1 m-1 justify-center text-gray-800 w-36 bg-slate-300 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
        >
            {children}
        </button>
    )
}

export default ButtonMSLATE