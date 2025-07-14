import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Quick Poll Creator</h1>
            </header>
            <main className="flex-grow p-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    {children}
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} Quick Poll Creator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;