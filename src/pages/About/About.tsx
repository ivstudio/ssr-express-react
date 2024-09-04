import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Container from '@/components/Container';

/**
 * This is an example of a lazy-loaded route component.
 * Lazy-loaded routes are loaded on-demand, which can help reduce the initial
 * bundle size of your application.
 **/

export const Component = () => {
    return (
        <Container>
            <h1 className="mb-3 text-2xl font-bold">
                Lazy-loaded Route Component
            </h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                quam cursus, commodo lectus id, tincidunt magna. Donec aliquet
                enim urna, in fringilla lacus consectetur eu. Aliquam erat
                volutpat. Vivamus feugiat consequat lorem a varius. Cras sed
                magna ac nisi rutrum elementum. In sit amet ultricies metus.
                Cras non magna augue. Nullam mattis imperdiet eros, et pulvinar
                erat lacinia ut. Donec dictum lacus maximus elementum
                ullamcorper. Sed faucibus aliquam dui elementum rhoncus.
            </p>
        </Container>
    );
};

// If you want to customize the component display name in React dev tools:
Component.displayName = 'SampleLazyRoute';

export const ErrorBoundary = () => {
    const error = useRouteError();
    return isRouteErrorResponse(error) ? (
        <h1>
            {error.status} {error.statusText}
        </h1>
    ) : (
        <h1>Something Went Wrong!</h1>
    );
};

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = 'SampleErrorBoundary';
