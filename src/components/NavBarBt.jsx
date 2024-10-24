function NavBarBt({ children, namePage, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`bg-mcbege rounded-t-lg text-mcverdeescuro text-lg px-2 font-semibold font-custom mr-[1px] ${(children === namePage) ? '' : 'opacity-50'}`}>
            {children}
        </button>
    );
}

export default NavBarBt;