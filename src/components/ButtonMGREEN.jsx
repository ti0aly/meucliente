function ButtonMGREEN({onClick, children}) {
    return (
        <button 
        onClick={onClick}
            className=" hover:opacity-80 focus:ring-gray-300 transition duration-150" 
            >
                {children}
        </button>
    )
}

export default ButtonMGREEN