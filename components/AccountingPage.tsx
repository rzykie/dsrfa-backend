import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
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
  Cell
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Banknote
} from 'lucide-react';
import { NavigationPage, User, isFullAdmin } from '../App';

interface AccountingPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage) => void;
}

export function AccountingPage({ user, onNavigate }: AccountingPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Access control - only full admins can access this page
  if (!isFullAdmin(user)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600 mb-4">You don't have permission to access the Financial Management page.</p>
          <Button onClick={() => onNavigate('dashboard')} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Mock financial data - simplified to only registrations and withdrawals
  const monthlyFinancials = [
    { month: 'Jan', moneyIn: 15200, moneyOut: 2000, net: 13200 },
    { month: 'Feb', moneyIn: 16800, moneyOut: 1500, net: 15300 },
    { month: 'Mar', moneyIn: 18200, moneyOut: 3000, net: 15200 },
    { month: 'Apr', moneyIn: 19500, moneyOut: 2500, net: 17000 },
    { month: 'May', moneyIn: 17800, moneyOut: 1800, net: 16000 },
    { month: 'Jun', moneyIn: 21400, moneyOut: 3200, net: 18200 },
  ];

  const registrationSources = [
    { name: 'Membership Fees', amount: 45200, percentage: 42.6, color: '#38A169' },
    { name: 'Event Registration', amount: 32400, percentage: 30.5, color: '#E53E3E' },
    { name: 'Training Programs', amount: 18900, percentage: 17.8, color: '#8B4513' },
    { name: 'Coaching Clinics', amount: 9700, percentage: 9.1, color: '#D69E2E' },
  ];

  const recentTransactions = [
    { id: 'TXN001', date: '2025-06-13', description: 'Membership Fee - John Doe', type: 'registration', amount: 500, category: 'Membership', status: 'completed' },
    { id: 'TXN002', date: '2025-06-12', description: 'Equipment Purchase Withdrawal', type: 'withdrawal', amount: -850, category: 'Equipment', status: 'completed' },
    { id: 'TXN003', date: '2025-06-12', description: 'Event Registration - Youth Cup', type: 'registration', amount: 150, category: 'Events', status: 'completed' },
    { id: 'TXN004', date: '2025-06-11', description: 'Venue Rental Payment', type: 'withdrawal', amount: -1200, category: 'Operations', status: 'completed' },
    { id: 'TXN005', date: '2025-06-11', description: 'Training Program Fee - Advanced Course', type: 'registration', amount: 300, category: 'Training', status: 'completed' },
    { id: 'TXN006', date: '2025-06-10', description: 'Coach Payment Withdrawal', type: 'withdrawal', amount: -800, category: 'Staff', status: 'completed' },
    { id: 'TXN007', date: '2025-06-10', description: 'Membership Renewal - Maria Santos', type: 'registration', amount: 500, category: 'Membership', status: 'completed' },
    { id: 'TXN008', date: '2025-06-09', description: 'Insurance Payment', type: 'withdrawal', amount: -600, category: 'Operations', status: 'completed' },
    { id: 'TXN009', date: '2025-06-09', description: 'Event Registration - Summer Camp', type: 'registration', amount: 200, category: 'Events', status: 'completed' },
    { id: 'TXN010', date: '2025-06-08', description: 'Equipment Maintenance', type: 'withdrawal', amount: -400, category: 'Equipment', status: 'completed' },
  ];

  const summary = {
    totalRegistrations: 106200,
    totalWithdrawals: 15200,
    netBalance: 91000,
    avgMonthlyRegistrations: 17700,
  };

  const paymentMethods = [
    { method: 'Bank Transfer', amount: 63600, percentage: 59.9, registrations: 127 },
    { method: 'GCash', amount: 28400, percentage: 26.7, registrations: 89 },
    { method: 'Credit Card', amount: 14200, percentage: 13.4, registrations: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
            <p className="text-gray-600 mt-2">
              Track registration income and withdrawals
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${user?.role === 'Admin' ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6`}>
          <Card className="rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">₱{summary.totalRegistrations.toLocaleString()}</p>
                  <p className="text-sm text-gray-900 mt-1">+12.5% from last month</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {user?.role !== 'Admin' && (
            <Card className="rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
                    <p className="text-2xl font-bold text-gray-900">₱{summary.totalWithdrawals.toLocaleString()}</p>
                    <p className="text-sm text-gray-900 mt-1">-8.2% from last month</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowDownRight className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role !== 'Admin' && (
            <Card className="rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Balance</p>
                    <p className="text-2xl font-bold text-gray-900">₱{summary.netBalance.toLocaleString()}</p>
                    <p className="text-sm text-gray-900 mt-1">+15.8% from last month</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-logo-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Monthly Income</p>
                  <p className="text-2xl font-bold text-gray-900">₱{summary.avgMonthlyRegistrations.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Based on registrations</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-logo-red" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Trend Chart */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>{user?.role === 'Admin' ? 'Registration Income Trends' : 'Cash Flow Trends'}</CardTitle>
            <CardDescription>
              {user?.role === 'Admin' ? 'Monthly registration income trends' : 'Monthly registration income vs withdrawals'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="moneyIn" stroke="#38A169" strokeWidth={3} name="Money In" />
                {user?.role !== 'Admin' && (
                  <>
                    <Line type="monotone" dataKey="moneyOut" stroke="#E53E3E" strokeWidth={3} name="Money Out" />
                    <Line type="monotone" dataKey="net" stroke="#8B4513" strokeWidth={3} name="Net Balance" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      

        {/* Registration Details */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
            <CardDescription>Detailed breakdown by source</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {registrationSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="font-medium">{source.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">₱{source.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{source.percentage}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Comparison Chart - Only for non-Admin users */}
        {user?.role !== 'Admin' && (
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Monthly Comparison</CardTitle>
              <CardDescription>Registration income vs withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyFinancials}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                  <Bar dataKey="moneyIn" fill="#38A169" name="Money In" />
                  <Bar dataKey="moneyOut" fill="#E53E3E" name="Money Out" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Filter and view all registration and withdrawal transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Label htmlFor="period">Period:</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {user?.role !== 'Admin' && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="category">Type:</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="registration">Registrations</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions
                  .filter(transaction => user?.role === 'Admin' ? transaction.type === 'registration' : true)
                  .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-lg">
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'registration' ? 'default' : 'secondary'}
                        className={`rounded-lg ${
                          transaction.type === 'registration' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type === 'registration' ? 'Registration' : 'Withdrawal'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-gray-900">
                      ₱{Math.abs(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="default"
                        className="rounded-lg bg-green-100 text-green-800"
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}