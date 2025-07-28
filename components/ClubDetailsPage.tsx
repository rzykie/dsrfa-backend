import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft,
  Users, 
  Building2, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Search,
  User,
  Trophy,
  Target,
  Shield,
  UserCheck,
  UserX,
  Edit
} from 'lucide-react';
import { User as UserType, NavigationPage } from '../App';

interface ClubDetailsPageProps {
  user: UserType | null;
  clubId: string | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string, clubId?: string) => void;
}

type ClubStatus = 'Pending' | 'Active' | 'Expired' | 'Declined';
type MemberStatus = 'Active' | 'Pending' | 'Inactive';

interface ClubMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Player' | 'Coach' | 'Manager' | 'Staff';
  position?: string;
  jerseyNumber?: number;
  joinDate: string;
  status: MemberStatus;
  avatar?: string;
  matchesPlayed: number;
  goalsScored: number;
}

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
  description?: string;
  achievements?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export function ClubDetailsPage({ user, clubId, onNavigate }: ClubDetailsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock club data - in real app, this would be fetched based on clubId
  const club: Club = {
    id: clubId || '1',
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
    expiryDate: '2025-01-20',
    description: 'A professional football club dedicated to developing local talent and competing at the highest level in the region.',
    achievements: [
      '2023 Regional Champions',
      '2022 Best Newcomer Team',
      '2024 Fair Play Award'
    ],
    socialMedia: {
      facebook: '@DavaoEaglesFC',
      instagram: '@davao_eagles',
      twitter: '@DavaoEagles'
    }
  };

  // Mock members data
  const clubMembers: ClubMember[] = [
    {
      id: '1',
      name: 'Miguel Rodriguez',
      email: 'miguel@davaoeagles.com',
      phone: '+63 917 123 4567',
      role: 'Player',
      position: 'Forward',
      jerseyNumber: 10,
      joinDate: '2024-01-20',
      status: 'Active',
      matchesPlayed: 15,
      goalsScored: 8
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos@davaoeagles.com',
      phone: '+63 918 234 5678',
      role: 'Player',
      position: 'Midfielder',
      jerseyNumber: 8,
      joinDate: '2024-01-22',
      status: 'Active',
      matchesPlayed: 14,
      goalsScored: 3
    },
    {
      id: '3',
      name: 'Roberto Gonzales',
      email: 'roberto@davaoeagles.com',
      phone: '+63 919 345 6789',
      role: 'Coach',
      joinDate: '2024-01-15',
      status: 'Active',
      matchesPlayed: 0,
      goalsScored: 0
    },
    {
      id: '4',
      name: 'Anna Maria Cruz',
      email: 'anna@davaoeagles.com',
      phone: '+63 920 456 7890',
      role: 'Manager',
      joinDate: '2024-01-18',
      status: 'Active',
      matchesPlayed: 0,
      goalsScored: 0
    },
    {
      id: '5',
      name: 'Luis Fernandez',
      email: 'luis@davaoeagles.com',
      phone: '+63 921 567 8901',
      role: 'Player',
      position: 'Defender',
      jerseyNumber: 4,
      joinDate: '2024-02-01',
      status: 'Pending',
      matchesPlayed: 0,
      goalsScored: 0
    }
  ];

  const filteredMembers = clubMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: ClubStatus | MemberStatus) => {
    const statusConfig = {
      'Active': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Expired': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-600' },
      'Declined': { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      'Inactive': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-600' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={`rounded-lg ${config.className}`}>
        {status}
      </Badge>
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Player':
        return <User className="w-4 h-4" />;
      case 'Coach':
        return <Trophy className="w-4 h-4" />;
      case 'Manager':
        return <Shield className="w-4 h-4" />;
      case 'Staff':
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const memberStats = {
    total: clubMembers.length,
    active: clubMembers.filter(m => m.status === 'Active').length,
    pending: clubMembers.filter(m => m.status === 'Pending').length,
    players: clubMembers.filter(m => m.role === 'Player').length,
    staff: clubMembers.filter(m => m.role !== 'Player').length
  };

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Club Not Found</h2>
          <p className="text-gray-600 mb-6">The club you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => onNavigate('clubs')} className="bg-primary hover:bg-primary/90 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('clubs')}
          className="text-gray-600 hover:text-gray-800 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clubs
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{club.name}</h1>
          <p className="text-gray-600">Club Details & Member Management</p>
        </div>
      </div>

      {/* Club Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Club Details Card */}
        <div className="lg:col-span-2">
          <Card className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={club.logo} alt={club.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                      {club.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{club.name}</CardTitle>
                    <CardDescription className="text-base">
                      {club.category} • Founded {club.foundedYear}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(club.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              {club.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{club.description}</p>
                </div>
              )}

              {/* Club Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Club Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Players:</span>
                      <span className="font-medium">{memberStats.players}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="font-medium">{club.category}</span>
                    </div>
                    {club.address && (
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div>
                          <span className="text-sm text-gray-600">Address:</span>
                          <p className="font-medium">{club.address}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Registered:</span>
                      <span className="font-medium">{new Date(club.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Owner Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <p className="font-medium">{club.ownerName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{club.ownerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{club.ownerPhone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="font-medium">{club.ownerAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {club.achievements && club.achievements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {club.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="rounded-lg bg-yellow-50 text-yellow-800 border-yellow-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics Card */}
        <div>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Member Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <span className="font-semibold text-lg">{memberStats.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="font-semibold text-gray-900">{memberStats.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold text-gray-900">{memberStats.pending}</span>
                </div>
                <hr className="my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Players</span>
                  <span className="font-semibold">{memberStats.players}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Staff</span>
                  <span className="font-semibold">{memberStats.staff}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Members List */}
      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Club Members</CardTitle>
              <CardDescription>Manage all members of {club.name}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search members by name, role, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Jersey #</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-700">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          {member.position && (
                            <p className="text-sm text-gray-500">{member.position}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(member.role)}
                        <span>{member.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.jerseyNumber ? (
                        <Badge variant="outline" className="rounded-lg font-mono">
                          #{member.jerseyNumber}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(member.joinDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      {member.role === 'Player' ? (
                        <div className="text-sm">
                          <div className="flex items-center space-x-2">
                            <Target className="w-3 h-3 text-green-600" />
                            <span>{member.goalsScored} goals</span>
                          </div>
                          <div className="text-gray-500">{member.matchesPlayed} matches</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate('member-profile', member.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                        >
                          View
                        </Button>
                        {user?.role === 'Admin' && member.status === 'Pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                            >
                              <UserX className="w-4 h-4" />
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

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No members found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}