function NavBarBt({ children, namePage, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`bg-[#ffeedb] rounded-t-lg text-[#202b27] text-base px-3 font-semibold font-Outfit mr-[1px] ${(children === namePage) ? '' : 'opacity-60'}`}>
            {children}
        </button>
    );
}

export default NavBarBt;