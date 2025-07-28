import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Users, 
  Calendar, 
  Trophy, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  UserCheck,
  AlertCircle,
  FileText
} from 'lucide-react';
import { NavigationPage, User } from '../App';

interface AdminDashboardProps {
  user: User | null;
  onNavigate: (page: NavigationPage) => void;
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  // Mock data for charts
  const membershipData = [
    { month: 'Jan', members: 245, revenue: 12250 },
    { month: 'Feb', members: 267, revenue: 13350 },
    { month: 'Mar', members: 289, revenue: 14450 },
    { month: 'Apr', members: 312, revenue: 15600 },
    { month: 'May', members: 298, revenue: 14900 },
    { month: 'Jun', members: 324, revenue: 16200 },
  ];

  const eventParticipationData = [
    { event: 'Youth Cup', participants: 156, capacity: 200 },
    { event: 'Summer Training', participants: 89, capacity: 100 },
    { event: 'Referee Course', participants: 23, capacity: 30 },
    { event: 'Coaching Clinic', participants: 45, capacity: 50 },
    { event: 'Community Match', participants: 78, capacity: 80 },
  ];

  const revenueByCategory = [
    { name: 'Membership Fees', value: 45200, color: '#38A169' },
    { name: 'Event Registration', value: 18900, color: '#E53E3E' },
    { name: 'Sponsorships', value: 32500, color: '#8B4513' },
    { name: 'Equipment Sales', value: 8400, color: '#D69E2E' },
    { name: 'Training Programs', value: 12600, color: '#4299E1' },
  ];

  const membersByRole = [
    { role: 'Players', count: 234, percentage: 72.4 },
    { role: 'Coaches', count: 45, percentage: 13.9 },
    { role: 'Referees', count: 28, percentage: 8.7 },
    { role: 'Volunteers', count: 16, percentage: 5.0 },
  ];

  const stats = [
    {
      title: 'Total Members',
      value: '324',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-logo-green',
    },
    {
      title: 'Active Events',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-logo-red',
    },
    {
      title: 'Monthly Revenue',
      value: '₱16,200',
      change: '+8.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-earth-brown',
    },
    {
      title: 'Pending Renewals',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}. Here's what's happening with DSRFA.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} bg-gray-100 p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Membership Growth */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Membership Growth</CardTitle>
              <CardDescription>Monthly membership and revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={membershipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="right" dataKey="revenue" fill="#E53E3E" name="Revenue (₱)" />
                  <Line yAxisId="left" type="monotone" dataKey="members" stroke="#38A169" strokeWidth={3} name="Members" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Distribution */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Revenue Distribution</CardTitle>
              <CardDescription>Income sources breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Event Participation */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Event Participation</CardTitle>
            <CardDescription>Current event capacity and registration status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventParticipationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participants" fill="#38A169" name="Participants" />
                <Bar dataKey="capacity" fill="#E53E3E" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New member registration', user: 'Maria Santos', time: '2 hours ago', type: 'user' },
                { action: 'Event "Youth Championship" created', user: 'Admin', time: '4 hours ago', type: 'event' },
                { action: 'Payment received from John Doe', user: 'System', time: '6 hours ago', type: 'payment' },
                { action: 'Gallery updated with new photos', user: 'Admin', time: '1 day ago', type: 'content' },
                { action: 'Membership renewal reminder sent', user: 'System', time: '2 days ago', type: 'system' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'user' ? 'bg-green-100 text-green-600' :
                    activity.type === 'event' ? 'bg-red-100 text-red-600' :
                    activity.type === 'payment' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'content' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'user' && <UserCheck className="w-4 h-4" />}
                    {activity.type === 'event' && <Calendar className="w-4 h-4" />}
                    {activity.type === 'payment' && <DollarSign className="w-4 h-4" />}
                    {activity.type === 'content' && <FileText className="w-4 h-4" />}
                    {activity.type === 'system' && <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}