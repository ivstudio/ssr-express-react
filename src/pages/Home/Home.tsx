export const Home = () => {
    return (
        <main className="mx-auto flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-neutral-950">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-8xl">
                <span className="bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent">
                    SSR
                </span>{' '}
                Starter
            </h1>
            <p className="mb-14 text-center text-base font-light text-slate-400 lg:text-xl">
                ExpressJS + ReactJS + TypeScript + TailwindCSS
            </p>
        </main>
    );
};

export default Home;
