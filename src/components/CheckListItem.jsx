function CheckListItem(props) {
    return (
        <li >
            <div className="flex justify-between bg-slate-100 rounded-md p-1 ">
                <p className="pl-2">{props.item}</p>
                <div className="pr-2">
                    {props.children}
                </div>
            </div>
        </li>
    )
}

export default CheckListItem;