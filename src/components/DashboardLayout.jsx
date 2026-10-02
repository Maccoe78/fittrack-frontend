import Sidebar from './SideBar';

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#02050a] p-6 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1400px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0f15] shadow-2xl shadow-black/40">
                <Sidebar />
                <main className="flex flex-1 items-stretch justify-center p-8">
                    <div className="w-full">{children}</div>
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;