import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalAssignments: 0,
        totalSubmissions: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsResponse, usersResponse] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users/recent')
            ]);

            setStats(statsResponse.data);
            setRecentUsers(usersResponse.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon, color = "blue", onClick, clickable = false }) => (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-${color}-500 ${clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
                }`}
            onClick={clickable ? onClick : undefined}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                </div>
                <div className={`text-${color}-500 text-3xl`}>{icon}</div>
            </div>
            {clickable && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Click to view details →</div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen page-bg flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen page-bg">
            {/* Theme Toggle */}
            <ThemeToggle className="theme-toggle" />

            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
                            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                                Administrator
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon="👥"
                        color="blue"
                        clickable={true}
                        onClick={() => navigate('/admin/users')}
                    />
                    <StatCard
                        title="Students"
                        value={stats.totalStudents}
                        icon="🎓"
                        color="green"
                        clickable={true}
                        onClick={() => navigate('/admin/users?role=student')}
                    />
                    <StatCard
                        title="Teachers"
                        value={stats.totalTeachers}
                        icon="👨‍🏫"
                        color="purple"
                        clickable={true}
                        onClick={() => navigate('/admin/users?role=teacher')}
                    />
                    <StatCard
                        title="Classes"
                        value={stats.totalClasses}
                        icon="�"
                        color="yellow"
                        clickable={true}
                        onClick={() => navigate('/admin/classes')}
                    />
                    <StatCard
                        title="Assignments"
                        value={stats.totalAssignments}
                        icon="📝"
                        color="indigo"
                        clickable={true}
                        onClick={() => navigate('/admin/assignments')}
                    />
                    <StatCard
                        title="Submissions"
                        value={stats.totalSubmissions}
                        icon="📤"
                        color="pink"
                        clickable={true}
                        onClick={() => navigate('/admin/analytics')}
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            to="/admin/users"
                            className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center transition-colors"
                        >
                            <div className="text-2xl mb-2">👥</div>
                            <div className="font-medium text-blue-900 dark:text-blue-200">Manage Users</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">View and edit users</div>
                        </Link>
                        <Link
                            to="/admin/classes"
                            className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center transition-colors"
                        >
                            <div className="text-2xl mb-2">📚</div>
                            <div className="font-medium text-green-900 dark:text-green-200">Manage Classes</div>
                            <div className="text-sm text-green-600 dark:text-green-400">Oversee all classes</div>
                        </Link>
                        <Link
                            to="/admin/assignments"
                            className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center transition-colors"
                        >
                            <div className="text-2xl mb-2">📝</div>
                            <div className="font-medium text-purple-900 dark:text-purple-200">View Assignments</div>
                            <div className="text-sm text-purple-600 dark:text-purple-400">Monitor assignments</div>
                        </Link>
                        <Link
                            to="/admin/analytics"
                            className="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center transition-colors"
                        >
                            <div className="text-2xl mb-2">📊</div>
                            <div className="font-medium text-yellow-900 dark:text-yellow-200">Analytics</div>
                            <div className="text-sm text-yellow-600 dark:text-yellow-400">View system analytics</div>
                        </Link>
                    </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Users</h2>
                        <Link
                            to="/admin/users"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {recentUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => navigate(`/admin/users/${user._id}`)}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                                user.role === 'teacher' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                                                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;