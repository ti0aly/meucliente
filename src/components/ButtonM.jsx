function ButtonM({onClick, children}) {
    return (
        <button 
        onClick={onClick}
            className="flex bg-mcmenta text-mcverdeescuro p-3 border-2 border-mcverdeescuro rounded-full shadow hover:bg-gray-100 focus:ring-gray-300 transition duration-150" 
            >
                {children}
        </button>
    )
}

export default ButtonM