function ButtonM({onClick, children}) {
    return (
        <button 
        onClick={onClick}
            className="flex bg-[#A4D8C5] text-[#26312d] p-3 border-2 border-[#26312d] rounded-full shadow hover:bg-gray-100 focus:ring-gray-300 transition duration-150" 
            >
                {children}
        </button>
    )
}

export default ButtonM