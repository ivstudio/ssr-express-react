import { render } from '@/tests/customRender';

import AppBar from './AppBar';

describe('AppBar', () => {
    it('renders the AppBar component', () => {
        const { getByText, getByTitle } = render(<AppBar />);

        // Check if the title link is rendered
        const titleLink = getByTitle('ssr react express boilerplate');
        expect(titleLink).toBeInTheDocument();
        expect(titleLink).toHaveTextContent('SSR Express React');

        // Check if the menu items are rendered
        const homeLink = getByText('home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');

        const blogLink = getByText('blog');
        expect(blogLink).toBeInTheDocument();
        expect(blogLink).toHaveAttribute('href', '/blog');

        const aboutLink = getByText('about');
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute('href', '/about');
    });
});
