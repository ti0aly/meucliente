function Subtitle(props) {
    return <p className="bg-blue-950 bg-opacity-10 rounded-xl text-xl flex justify-center items-center p-1">
        {props.children}
    </p>
}

export default Subtitle;