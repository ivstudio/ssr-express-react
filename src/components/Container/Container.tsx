interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => (
    <main className="min-h-[calc(100vh-64px)] bg-neutral-100 text-gray-900">
        <div className="mx-auto max-w-screen-lg p-6">{children}</div>
    </main>
);

export default Container;
