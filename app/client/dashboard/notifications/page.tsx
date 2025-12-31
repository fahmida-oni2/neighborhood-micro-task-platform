type NoticeType = "Bid" | "Status" | "Message";

const notices: {
  id: string;
  title: string;
  description: string;
  type: NoticeType;
  time: string;
  unread: boolean;
}[] = [
  { id: "n1", title: "New bid received", description: 'A tasker placed a bid on “Fix kitchen sink”.', type: "Bid", time: "5 min ago", unread: true },
  { id: "n2", title: "Task in progress", description: '“Clean apartment” status updated to In Progress.', type: "Status", time: "Yesterday", unread: false },
  { id: "n3", title: "New message", description: 'You received a message from a tasker on “Deliver groceries”.', type: "Message", time: "3 days ago", unread: false },
];

const badgeByType = (type: NoticeType) => {
  if (type === "Bid") return "badge badge-info";
  if (type === "Status") return "badge badge-warning";
  return "badge badge-success";
};

export default function NotificationsPage() {
  const unreadCount = notices.filter((n) => n.unread).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="opacity-70 mt-1">Stay updated on bids, task status, and messages.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-outline">Unread: {unreadCount}</span>
          <button className="btn btn-outline rounded-full btn-sm">Mark all as read</button>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Activity</h2>
            <select className="select select-bordered h-10 w-44">
              <option>All</option>
              <option>Unread</option>
              <option>Bids</option>
              <option>Status</option>
              <option>Messages</option>
            </select>
          </div>

          <div className="mt-4 space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border border-base-300 bg-base-200 flex items-start justify-between gap-4 ${
                  n.unread ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={badgeByType(n.type)}>{n.type}</span>
                    {n.unread && <span className="badge badge-primary">New</span>}
                  </div>

                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm opacity-70">{n.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm opacity-70">{n.time}</p>
                  <button className="btn btn-ghost btn-sm rounded-full mt-2">View</button>
                </div>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="text-center py-10 opacity-70">No notifications yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
