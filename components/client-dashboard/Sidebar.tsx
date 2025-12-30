import Link from "next/link";
import Brand from "./Brand";

function IconHome() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconTasks() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 6h13M8 12h13M8 18h13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3.5 6h1M3.5 12h1M3.5 18h1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconBell() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19a2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUser() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems = [
  { label: "Overview", href: "/client/dashboard", icon: <IconHome /> },
  { label: "Post a Task", href: "/client/dashboard/post-task", icon: <IconPlus /> },
  { label: "My Tasks", href: "/client/dashboard/tasks", icon: <IconTasks /> },
  { label: "Notifications", href: "/client/dashboard/notifications", icon: <IconBell /> },
  { label: "Profile", href: "/client/dashboard/profile", icon: <IconUser /> },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-72 bg-base-100 border-r border-base-300">
      <div className="h-16 min-h-16 border-b border-base-300 px-4 flex items-center">
        <Brand title="NeighborGig" href="/client/dashboard" />
      </div>

      <ul className="menu p-3 gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex items-center gap-3">
              <span className="opacity-80">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
