import Link from "next/link";

export default function ClientDashboardPage() {
  const recentTasks = [
    { id: 1, title: "Fix kitchen sink", status: "Open", budget: 800 },
    { id: 2, title: "Clean apartment", status: "In Progress", budget: 1200 },
    { id: 3, title: "Deliver groceries", status: "Completed", budget: 500 },
  ];

  const statusBadge = (status: string) => {
    if (status === "Open") return "badge badge-info";
    if (status === "In Progress") return "badge badge-warning";
    return "badge badge-success";
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold">Overview</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Tasks", value: 3 },
          { label: "Open", value: 1 },
          { label: "In Progress", value: 1 },
          { label: "Completed", value: 1 },
        ].map((item) => (
          <div key={item.label} className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <p className="text-sm opacity-70">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/client/dashboard/post-task"
              className="btn bg-primary text-base-200 hover:bg-base-200 hover:text-primary rounded-full w-fit"
            >
              Post a Task
            </Link>

            <Link
              href="/client/dashboard/tasks"
              className="btn btn-outline rounded-full w-fit"
            >
              View My Tasks
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Recent Tasks</h2>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>
                      <span className={statusBadge(task.status)}>
                        {task.status}
                      </span>
                    </td>
                    <td>৳ {task.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right">
            <Link
              href="/client/dashboard/tasks"
              className="link link-primary text-sm"
            >
              View all tasks →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
