import { Link } from "react-router";
import logo from "@/assets/image/logo.png"
import { FiHeart } from "react-icons/fi";
import "./Header.css"
import ActiveNavLink from "../ActiveNavLink/ActiveNavLink";


const Header = () => {

    const menuLinks = [
        {
            label: "Home",
            to: '/'
        },
        {
            label: "All Books",
            to: '/books'
        },
        {
            label: "Add Book",
            to: '/create-book'
        },
        {
            label: "Borrow Summary",
            to: '/borrow-summary'
        },
    ]

    return (
        <header className='header py-4 border-b border-[var(--border-color2)]'>
            <div className="my-container header-container flex justify-between items-center gap-8">
                <div className="header-logo flex gap-8">
                    <Link to={'/'}>
                        <img src={logo} alt="Book Nest" className='w-[120px]' />
                    </Link>
                </div>
                <div className="header-menu flex justify-center">
                    <nav className="menu flex justify-center items-center gap-5">
                        {
                            menuLinks.map((link, idx) => <ActiveNavLink key={idx} to={link.to} className="menu-link text-[var(--heading-color)] text-base font-medium hover:text-[var(--secondary-color)] transition">{link.label}</ActiveNavLink>)
                        }
                    </nav>
                </div>
                <div className="header-actions flex justify-end gap-4">
                    <Link to={'#'}>
                        <FiHeart className='icon' />
                        Wishlist
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;