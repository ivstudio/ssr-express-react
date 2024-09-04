import { render, userEvent } from '@/tests/customRender';

import Menu, { MenuItem } from './Menu';

describe('Menu', () => {
    const menuItems: MenuItem[] = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'About', url: '/about' },
    ];

    it('renders the Menu component', () => {
        const { getByText } = render(<Menu data={menuItems} />);

        // Check if the menu items are rendered
        menuItems.forEach(item => {
            const linkElement = getByText(item.name);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', item.url);
        });
    });

    it('applies active class to active link', async () => {
        const { getByText } = render(<Menu data={menuItems} />);

        // Simulate navigation to '/blog'
        const blogLink = getByText('Blog');
        await userEvent.click(blogLink);

        // Check if the active class is applied
        expect(blogLink).toHaveClass('text-blue-400');
    });

    it('applies inactive class to inactive links', () => {
        const { getByText } = render(<Menu data={menuItems} />);

        // Check if the inactive class is applied
        menuItems.forEach(item => {
            const linkElement = getByText(item.name);
            if (item.url !== '/blog') {
                expect(linkElement).toHaveClass('text-gray-100');
            }
        });
    });
});
