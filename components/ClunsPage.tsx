import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  Eye,
  UserCheck,
  UserX,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { User, NavigationPage } from '../App';

interface ClubsPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string, clubId?: string) => void;
}

type ClubStatus = 'Pending' | 'Active' | 'Expired' | 'Declined';

interface Club {
  id: string;
  name: string;
  category: string;
  foundedYear: number;
  address?: string;
  logo?: string;
  playerCount: number;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress: string;
  status: ClubStatus;
  registrationDate: string;
  approvalDate?: string;
  expiryDate?: string;
}

export function ClubsPage({ user, onNavigate }: ClubsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClubStatus | 'All'>('All');
  const [activeTab, setActiveTab] = useState<ClubStatus | 'All'>('All');

  // Mock club data
  const clubs: Club[] = [
    {
      id: '1',
      name: 'Davao Eagles FC',
      category: 'Professional',
      foundedYear: 2020,
      address: 'Davao City Sports Complex, Davao City',
      playerCount: 25,
      ownerName: 'Juan Dela Cruz',
      ownerEmail: 'juan@davaoeagles.com',
      ownerPhone: '+63 912 345 6789',
      ownerAddress: 'Poblacion District, Davao City',
      status: 'Active',
      registrationDate: '2024-01-15',
      approvalDate: '2024-01-20',
      expiryDate: '2025-01-20'
    },
    {
      id: '2',
      name: 'Mindanao Warriors',
      category: 'Semi-Professional',
      foundedYear: 2019,
      address: 'General Santos City Stadium',
      playerCount: 22,
      ownerName: 'Maria Santos',
      ownerEmail: 'maria@mindanaowarriors.com',
      ownerPhone: '+63 917 234 5678',
      ownerAddress: 'City Heights, General Santos',
      status: 'Pending',
      registrationDate: '2024-12-10'
    },
    {
      id: '3',
      name: 'Southern Strikers',
      category: 'Amateur',
      foundedYear: 2018,
      playerCount: 18,
      ownerName: 'Roberto Gonzales',
      ownerEmail: 'rob@southernstrikers.com',
      ownerPhone: '+63 920 123 4567',
      ownerAddress: 'Buhangin, Davao City',
      status: 'Expired',
      registrationDate: '2023-02-01',
      approvalDate: '2023-02-05',
      expiryDate: '2024-02-05'
    },
    {
      id: '4',
      name: 'Coastal United',
      category: 'Youth',
      foundedYear: 2021,
      address: 'Samal Island Sports Center',
      playerCount: 20,
      ownerName: 'Ana Reyes',
      ownerEmail: 'ana@coastalunited.com',
      ownerPhone: '+63 918 765 4321',
      ownerAddress: 'Samal Island, Davao del Norte',
      status: 'Declined',
      registrationDate: '2024-11-20'
    }
  ];

  const clubStats = {
    total: clubs.length,
    active: clubs.filter(club => club.status === 'Active').length,
    pending: clubs.filter(club => club.status === 'Pending').length,
    expired: clubs.filter(club => club.status === 'Expired').length,
    declined: clubs.filter(club => club.status === 'Declined').length
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || club.status === statusFilter;
    const matchesTab = activeTab === 'All' || club.status === activeTab;
    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleStatusChange = (clubId: string, newStatus: ClubStatus) => {
    // In a real app, this would make an API call
    console.log(`Changing club ${clubId} status to ${newStatus}`);
  };

  const getStatusBadge = (status: ClubStatus) => {
    const statusConfig = {
      'Active': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Expired': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-600' },
      'Declined': { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={`rounded-lg ${config.className}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clubs Management</h1>
          <p className="text-gray-600">Manage all registered clubs and their statuses</p>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clubs</p>
                <p className="text-2xl font-bold text-gray-900">{clubStats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clubs</p>
                <p className="text-2xl font-bold text-gray-900">{clubStats.active}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{clubStats.pending}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{clubStats.expired}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <XCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Declined</p>
                <p className="text-2xl font-bold text-gray-900">{clubStats.declined}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clubs List */}
      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registered Clubs</CardTitle>
              <CardDescription>Manage all club registrations and their approval status</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search clubs by name, owner, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ClubStatus | 'All')}>
                <SelectTrigger className="w-48 rounded-lg">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'All', label: 'All Clubs', count: clubStats.total },
                { key: 'Pending', label: 'Pending Approval', count: clubStats.pending },
                { key: 'Active', label: 'Active', count: clubStats.active },
                { key: 'Expired', label: 'Membership Expired', count: clubStats.expired },
                { key: 'Declined', label: 'Declined', count: clubStats.declined },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as ClubStatus | 'All')}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-logo-green text-logo-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Clubs Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={club.logo} alt={club.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {club.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{club.name}</p>
                          <p className="text-sm text-gray-500">Founded {club.foundedYear}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-lg">
                        {club.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{club.ownerName}</p>
                        <p className="text-sm text-gray-500">{club.ownerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{club.playerCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(club.registrationDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(club.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate('club-details', undefined, undefined, undefined, undefined, club.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {club.status === 'Pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(club.id, 'Active')}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(club.id, 'Declined')}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClubs.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No clubs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}