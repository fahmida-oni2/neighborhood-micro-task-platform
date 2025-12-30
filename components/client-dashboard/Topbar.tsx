import Brand from "./Brand";

export default function Topbar() {
  return (
    <div className="navbar h-16 min-h-16 bg-base-100 border-b border-base-300 px-2">
      <div className="navbar-start flex items-center gap-2">
        <label htmlFor="client-drawer" className="btn btn-ghost lg:hidden">
          ☰
        </label>

        <Brand title="Client Dashboard" />
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button className="btn bg-primary hover:bg-base-200  btn-circle" aria-label="Notifications">
          🔔
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-primary text-base-200 hover:bg-base-200 hover:text-primary rounded-full">
            Profile
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 p-2"
          >
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
