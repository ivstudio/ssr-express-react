import { NavLink } from 'react-router-dom';

export interface MenuItem {
    name: string;
    url: string;
}

interface MenuProps {
    data: MenuItem[];
}

const Menu = ({ data }: MenuProps) => {
    if (!data) return null;
    return (
        <nav aria-label="Main menu" className="flex gap-8">
            {data.map(({ name, url }) => (
                <div key={name}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-400'
                                : 'cursor-pointer text-gray-100 transition-colors duration-200 ease-in-out hover:text-gray-300'
                        }
                        to={url}
                    >
                        {name}
                    </NavLink>
                </div>
            ))}
        </nav>
    );
};

export default Menu;
