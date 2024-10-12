function ButtonM({onClick, props}) {
    return (
        <button 
        onClick={onClick}
            className="flex text-gray-800 w-32 p-3 border border-bl-300 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150" 
            >
                {props.children}
        </button>
    )
}

export default ButtonM