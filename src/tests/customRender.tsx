import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
export * from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: ReactElement, options = {}) => {
    return render(ui, { wrapper: AllTheProviders, ...options });
};

export { customRender as render, userEvent };
