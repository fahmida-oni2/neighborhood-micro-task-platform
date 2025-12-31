"use client";
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
 role: "admin" | "user" | "tasker";
  status: 'Active' | 'banned';
 createdAt: string;
  [key: string]: any;
}



export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users'); 
        if (!response.ok) throw new Error("Failed to fetch users");
        
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loading) return <div className="p-10 text-center text-xl">Loading users...</div>;
  if (error) return <div className="p-10 text-center text-error">Error: {error}</div>;
  return (
    <div className="p-6 mt-16 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">User Management</h1>
          <button className="btn btn-primary">Add New User</button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stat bg-white shadow rounded-box">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">1,240</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat bg-white shadow rounded-box">
            <div className="stat-title">Active Workers</div>
            <div className="stat-value text-secondary">840</div>
            <div className="stat-desc">Current online workers</div>
          </div>
          <div className="stat bg-white shadow rounded-box">
            <div className="stat-title">New Tasks</div>
            <div className="stat-value">152</div>
            <div className="stat-desc text-success">Active today</div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded-box shadow">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span>{user.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-ghost`}>{user.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      user.status === 'Active' ? 'badge-success' : 'badge-error'
                    } badge-sm`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs text-primary">Edit</button>
                    <button className="btn btn-ghost btn-xs text-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}