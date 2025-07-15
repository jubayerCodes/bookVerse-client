import { Link } from "react-router";
import logo from "@/assets/image/logo.png"
import logo2 from "@/assets/image/logo-alt.png"
import "./Header.css"
import ActiveNavLink from "../ActiveNavLink/ActiveNavLink";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { FaBars } from "react-icons/fa";
import { useState } from "react";


const Header = () => {

    const [open, setOpen] = useState(false)

    const { setTheme } = useTheme()

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
        <header className='header py-4 border-b border-[var(--border-color2)] px-5 xl:px-0'>
            <div className="my-container header-container flex justify-between items-center gap-8">
                <div className="header-logo flex gap-8">
                    <Link to={'/'} className="dark:hidden">
                        <img src={logo} alt="Book Nest" className='w-[120px]' />
                    </Link>
                    <Link to={'/'} className="hidden dark:block">
                        <img src={logo2} alt="Book Nest" className='w-[120px]' />
                    </Link>
                </div>
                <div className="header-menu hidden md:flex justify-center">
                    <nav className="menu flex justify-center items-center gap-5">
                        {
                            menuLinks.map((link, idx) => <ActiveNavLink key={idx} to={link.to} className="menu-link text-[var(--heading-color)] text-base font-medium hover:text-[var(--secondary-color)] transition">{link.label}</ActiveNavLink>)
                        }
                    </nav>
                </div>
                <div className="header-actions flex justify-end gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="dark:text-white">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="block md:hidden">
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger>
                                <Button variant={'outline'} size="icon" className="dark:text-white">
                                    <FaBars />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">

                                {
                                    menuLinks.map((link, idx) =>
                                        <DropdownMenuItem className="p-0" key={idx} onClick={() => setOpen(false)}>
                                            <ActiveNavLink to={link.to} className="menu-link text-[var(--heading-color)] text-base font-medium hover:text-[var(--secondary-color)] transition p-2 w-full">
                                                {link.label}

                                            </ActiveNavLink>
                                        </DropdownMenuItem>)
                                }

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;