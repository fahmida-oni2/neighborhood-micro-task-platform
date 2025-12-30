import Sidebar from "@/components/client-dashboard/Sidebar";
import Topbar from "@/components/client-dashboard/Topbar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="client-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content min-h-screen bg-base-200">
        <Topbar />
        <main className="p-5">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="client-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
