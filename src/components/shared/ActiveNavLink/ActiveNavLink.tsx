
import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

interface Props {
    to: string;
    children: ReactNode;
    className?: string;
}

const ActiveNavLink: React.FC<Props> = ({ to, children, className="" }) => {
    return (
        <NavLink to={to} className={({ isActive }) =>
            `${className} ${isActive ? 'active' : ''}`.trim()
        }>
            {children}
        </NavLink>
    );
};

export default ActiveNavLink;