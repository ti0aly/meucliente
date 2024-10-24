function CheckListItem(props) {
    return (
        <li >
            <div className="flex justify-between bg-mcmenta p-1 border-b-2 border-white">
                <p className="pl-2 font-custom">{props.item}</p>
                <div className="pr-2">
                    {props.children}
                </div>
            </div>
        </li>
    )
}

export default CheckListItem;