import Link from "next/link";

type TaskStatus = "Open" | "In Progress" | "Completed" | "Cancelled";

const mockTasks: {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: number;
  status: TaskStatus;
  createdAt: string;
}[] = [
  {
    id: "t1",
    title: "Fix kitchen sink",
    category: "Plumbing",
    location: "Sylhet",
    budget: 800,
    status: "Open",
    createdAt: "Today",
  },
  {
    id: "t2",
    title: "Clean apartment (2 rooms)",
    category: "Cleaning",
    location: "Dhaka",
    budget: 1200,
    status: "In Progress",
    createdAt: "Yesterday",
  },
  {
    id: "t3",
    title: "Deliver groceries",
    category: "Delivery",
    location: "Chattogram",
    budget: 500,
    status: "Completed",
    createdAt: "3 days ago",
  },
];

const statusBadge = (status: TaskStatus) => {
  if (status === "Open") return "badge badge-info";
  if (status === "In Progress") return "badge badge-warning";
  if (status === "Completed") return "badge badge-success";
  return "badge badge-ghost";
};

export default function MyTasksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="opacity-70 mt-1">Track your posted tasks and their status.</p>
        </div>

        <Link href="/client/dashboard/post-task" className="btn btn-primary rounded-full w-fit">
          + Post a Task
        </Link>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="join w-full md:w-auto">
              <button className="btn join-item btn-outline">All</button>
              <button className="btn join-item btn-outline">Open</button>
              <button className="btn join-item btn-outline">In Progress</button>
              <button className="btn join-item btn-outline">Completed</button>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <input
                className="input input-bordered h-12 w-full md:w-72"
                placeholder="Search by title, category..."
              />
              <select className="select select-bordered h-12 w-44">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Budget: High</option>
                <option>Budget: Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks table */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="text-lg font-bold">Tasks</h2>

          <div className="overflow-x-auto mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Location</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm opacity-70">{t.category}</div>
                    </td>
                    <td>{t.location}</td>
                    <td>৳ {t.budget}</td>
                    <td>
                      <span className={statusBadge(t.status)}>{t.status}</span>
                    </td>
                    <td className="opacity-70">{t.createdAt}</td>
                    <td className="text-right">
                      <Link href={`/client/dashboard/tasks/${t.id}`} className="btn btn-sm btn-outline rounded-full">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state (keep for later) */}
          {mockTasks.length === 0 && (
            <div className="text-center py-10 opacity-70">
              No tasks yet. Post your first task to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
