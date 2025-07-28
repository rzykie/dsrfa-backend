import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Search, 
  Users, 
  MapPin, 
  Calendar, 
  Check, 
  X, 
  UserCheck, 
  UserX, 
  Clock,
  Mail,
  Phone,
  Filter,
  Download,
  Eye,
  FileText,
  CalendarX,
  Building2,
  Trophy,
  Star,
  Shield
, UserMinus } from 'lucide-react';
import { NavigationPage, User, hasAdminPrivileges } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ClubPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage, memberId?: string) => void;
}

interface ClubInfo {
  id: string;
  name: string;
  abbreviation: string;
  founded: string;
  homeVenue: string;
  venueAddress: string;
  colors: string;
  category: string;
  logo?: string;
  description: string;
  achievements: string[];
  stats: {
    totalPlayers: number;
    activePlayers: number;
    coaches: number;
    trophies: number;
  };
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  club: string;
  role: string;
  position?: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Released';
  dsrfaStatus: 'Approved' | 'Pending' | 'Declined';
  joinDate: string;
  membershipExpiry: string;
  avatar?: string;
  location: string;
  documents?: number;
  releaseDate?: string;
}

type TabType = 'all' | 'pending' | 'active' | 'expired' | 'released';

export function ClubPage({ user, onNavigate }: ClubPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterClub, setFilterClub] = useState('all');
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const isAdmin = hasAdminPrivileges(user);

  // Mock club data
  const clubInfo: ClubInfo = {
    id: '1',
    name: user?.club || 'Davao Eagles FC',
    abbreviation: 'DEFC',
    founded: '2018',
    homeVenue: 'Eagles Stadium',
    venueAddress: 'Matina District, Davao City, Davao del Sur',
    colors: 'Green and White',
    category: 'Semi-Professional',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    description: 'A passionate football club dedicated to developing local talent and promoting the beautiful game in the Davao region. We believe in community, excellence, and sportsmanship.',
    achievements: [
      '2023 DSRFA Regional Championship Winners',
      '2022 Community Cup Champions',
      '2021 Youth Development Excellence Award',
      'Fair Play Award 2020-2023'
    ],
    stats: {
      totalPlayers: 35,
      activePlayers: 32,
      coaches: 3,
      trophies: 12
    }
  };

  // Mock data - sample members from various clubs
  const members: Member[] = [
    {
      id: '1',
      name: 'Juan Carlos Santos',
      email: 'juan.santos@email.com',
      phone: '+63 917-555-0101',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Striker',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-01-15',
      membershipExpiry: '2025-01-15',
      location: 'Davao City',
      documents: 3,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Maria Elena Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+63 917-555-0102',
      club: 'Davao Eagles FC',
      role: 'Coach',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2022-08-10',
      membershipExpiry: '2024-08-10',
      location: 'Davao City',
      documents: 4
    },
    {
      id: '3',
      name: 'Roberto Francisco Cruz',
      email: 'roberto.cruz@email.com',
      phone: '+63 917-555-0103',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Goalkeeper',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-03-20',
      membershipExpiry: '2025-03-20',
      location: 'Davao City',
      documents: 2
    },
    {
      id: '4',
      name: 'Anna Marie Dela Cruz',
      email: 'anna.delacruz@email.com',
      phone: '+63 917-555-0104',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Midfielder',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2025-06-10',
      membershipExpiry: '2026-06-10',
      location: 'Davao City',
      documents: 1
    },
    {
      id: '5',
      name: 'Jose Miguel Torres',
      email: 'jose.torres@email.com',
      phone: '+63 917-555-0105',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Defender',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2021-05-15',
      membershipExpiry: '2025-05-15',
      location: 'Davao City',
      documents: 3
    },
    {
      id: '6',
      name: 'Carmen Santos Aquino',
      email: 'carmen.aquino@email.com',
      phone: '+63 917-555-0106',
      club: 'Southern Mindanao United',
      role: 'Volunteer',
      status: 'Active',
      dsrfaStatus: 'Pending',
      joinDate: '2023-09-05',
      membershipExpiry: '2025-09-05',
      location: 'Koronadal City',
      documents: 2
    },
    {
      id: '15',
      name: 'Diego Emmanuel Reyes',
      email: 'diego.reyes@email.com',
      phone: '+63 917-555-0115',
      club: 'Southern Mindanao United',
      role: 'Player',
      position: 'Striker',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-04-22',
      membershipExpiry: '2025-04-22',
      location: 'General Santos',
      documents: 3
    },
    {
      id: '16',
      name: 'Ricardo Antonio Flores',
      email: 'ricardo.flores@email.com',
      phone: '+63 917-555-0116',
      club: 'Tagum City FC',
      role: 'Player',
      position: 'Midfielder',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2022-12-08',
      membershipExpiry: '2024-12-08',
      location: 'Tagum City',
      documents: 4
    },
    {
      id: '7',
      name: 'Paolo Miguel Reyes',
      email: 'paolo.reyes@email.com',
      phone: '+63 917-555-0107',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Right Back',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-07-12',
      membershipExpiry: '2025-07-12',
      location: 'Davao City',
      documents: 3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '8',
      name: 'Gabriel Antonio Cruz',
      email: 'gabriel.cruz@email.com',
      phone: '+63 917-555-0108',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Central Midfielder',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2022-11-03',
      membershipExpiry: '2024-11-03',
      location: 'Davao City',
      documents: 4,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '9',
      name: 'Sofia Marie Gonzales',
      email: 'sofia.gonzales@email.com',
      phone: '+63 917-555-0109',
      club: 'Davao Eagles FC',
      role: 'Coach',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2021-04-18',
      membershipExpiry: '2025-04-18',
      location: 'Davao City',
      documents: 5
    },
    {
      id: '10',
      name: 'Luis Fernando Santos',
      email: 'luis.santos@email.com',
      phone: '+63 917-555-0110',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Left Winger',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2024-01-20',
      membershipExpiry: '2026-01-20',
      location: 'Davao City',
      documents: 2,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '11',
      name: 'Isabella Rose Dela Torre',
      email: 'isabella.delatorre@email.com',
      phone: '+63 917-555-0111',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Right Winger',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-09-14',
      membershipExpiry: '2025-09-14',
      location: 'Davao City',
      documents: 3
    },
    {
      id: '12',
      name: 'Marcus James Rodriguez',
      email: 'marcus.rodriguez@email.com',
      phone: '+63 917-555-0112',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Center Back',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2022-06-28',
      membershipExpiry: '2024-06-28',
      location: 'Davao City',
      documents: 4,
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '13',
      name: 'Adrian Carlo Mendoza',
      email: 'adrian.mendoza@email.com',
      phone: '+63 917-555-0113',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Left Back',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-12-05',
      membershipExpiry: '2025-12-05',
      location: 'Davao City',
      documents: 2
    },
    {
      id: '14',
      name: 'Sophia Grace Villanueva',
      email: 'sophia.villanueva@email.com',
      phone: '+63 917-555-0114',
      club: 'Davao Eagles FC',
      role: 'Referee',
      status: 'Active',
      dsrfaStatus: 'Approved',
      joinDate: '2023-03-10',
      membershipExpiry: '2025-03-10',
      location: 'Davao City',
      documents: 6
    },
    // Released Members
    {
      id: '17',
      name: 'Carlos Fernando Estrada',
      email: 'carlos.estrada@email.com',
      phone: '+63 917-555-0117',
      club: 'Davao Eagles FC',
      role: 'Player',
      position: 'Winger',
      status: 'Released',
      dsrfaStatus: 'Approved',
      joinDate: '2022-03-15',
      membershipExpiry: '2024-03-15',
      releaseDate: '2024-12-01',
      location: 'Davao City',
      documents: 3
    },
    {
      id: '18',
      name: 'Miguel Angel Santos',
      email: 'miguel.santos@email.com',
      phone: '+63 917-555-0118',
      club: 'Southern Mindanao United',
      role: 'Player',
      position: 'Midfielder',
      status: 'Released',
      dsrfaStatus: 'Approved',
      joinDate: '2021-07-20',
      membershipExpiry: '2023-07-20',
      releaseDate: '2024-11-15',
      location: 'General Santos',
      documents: 4
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesTab = activeTab === 'all' || member.status.toLowerCase() === activeTab;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole.toLowerCase();
    const matchesClub = filterClub === 'all' || member.club === filterClub;
    
    // For regular members, only show active members from their club
    if (!isAdmin) {
      return member.status === 'Active' && 
             member.club === user?.club && 
             matchesSearch && 
             matchesRole;
    }
    
    return matchesTab && matchesSearch && matchesRole && matchesClub;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    pending: members.filter(m => m.status === 'Pending').length,
    expired: members.filter(m => m.status === 'Expired').length,
    released: members.filter(m => m.status === 'Released').length
  };

  const handleApproval = (member: Member, action: 'approve' | 'reject') => {
    setSelectedMember(member);
    if (action === 'reject') {
      setIsApprovalDialogOpen(true);
    } else {
      // Handle approval
      console.log(`Approved member: ${member.name}`);
      alert(`${member.name} has been approved!`);
    }
  };

  const handleRejection = () => {
    if (selectedMember && rejectionReason.trim()) {
      console.log(`Rejected member: ${selectedMember.name}, Reason: ${rejectionReason}`);
      alert(`${selectedMember.name} has been rejected.`);
      setIsApprovalDialogOpen(false);
      setRejectionReason('');
      setSelectedMember(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'Released':
        return <Badge className="bg-purple-600 text-white">Released</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDsrfaStatusBadge = (dsrfaStatus: string) => {
    switch (dsrfaStatus) {
      case 'Approved':
        return <Badge className="bg-blue-600 text-white">Approved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case 'Declined':
        return <Badge className="bg-red-600 text-white">Declined</Badge>;
      default:
        return <Badge variant="outline">{dsrfaStatus}</Badge>;
    }
  };

  const exportData = () => {
    console.log('Exporting member data...');
    alert('Member data exported successfully!');
  };

  // Regular Member View - Club Details and Team Members
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Club</h1>
          <p className="text-gray-600">
            Club information and team members
          </p>
        </div>

        {/* Club Information Section */}
        <div className="mb-6 space-y-4">
          {/* Club Header */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {clubInfo.logo ? (
                      <ImageWithFallback
                        src={clubInfo.logo}
                        alt={clubInfo.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{clubInfo.name}</h2>
                      <p className="text-gray-600">{clubInfo.abbreviation} • Founded {clubInfo.founded}</p>
                      <Badge className="mt-2 bg-logo-green text-white">{clubInfo.category}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{clubInfo.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{clubInfo.stats.activePlayers}</div>
                      <div className="text-sm text-gray-700">Active Players</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{clubInfo.stats.coaches}</div>
                      <div className="text-sm text-gray-700">Coaches</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{clubInfo.stats.trophies}</div>
                      <div className="text-sm text-gray-700">Trophies</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{clubInfo.founded}</div>
                      <div className="text-sm text-gray-700">Est. Year</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Club Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                  Home Venue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{clubInfo.homeVenue}</p>
                  <p className="text-gray-600 text-sm">{clubInfo.venueAddress}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-2">Team Colors:</span>
                    <Badge variant="outline">{clubInfo.colors}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {clubInfo.achievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Team Members</h2>
              <p className="text-gray-600">Active members of {clubInfo.name}</p>
            </div>
          </div>

          {/* Search and Filters for Team Members */}
          <div className="mb-4 space-y-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search team members by name or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="player">Players</SelectItem>
                    <SelectItem value="coach">Coaches</SelectItem>
                    <SelectItem value="referee">Referees</SelectItem>
                    <SelectItem value="volunteer">Volunteers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role & Position</TableHead>
                    <TableHead>Member Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-green-600 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.role}</p>
                          {member.position && (
                            <p className="text-sm text-gray-500">{member.position}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(member.joinDate).getFullYear()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Admin View (existing member management functionality)
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Members Management</h1>
        <p className="text-gray-600">
          Manage member registrations, approvals, and membership status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <CalendarX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Released Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.released}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <UserMinus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Filters and Search */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search members by name, email, or club..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="player">Players</SelectItem>
                  <SelectItem value="coach">Coaches</SelectItem>
                  <SelectItem value="referee">Referees</SelectItem>
                  <SelectItem value="volunteer">Volunteers</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Members', count: stats.total },
            { key: 'pending', label: 'Pending Approval', count: stats.pending },
            { key: 'active', label: 'Active', count: stats.active },
            { key: 'expired', label: 'Membership Expired', count: stats.expired },
            { key: 'released', label: 'Released', count: stats.released },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
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

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Club & Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                {user?.role !== 'Admin' && <TableHead>DSRFA Status</TableHead>}
                <TableHead>Membership</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-green-600 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.club}</p>
                      <p className="text-sm text-gray-500">
                        {member.role}
                        {member.position && ` - ${member.position}`}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{member.phone}</p>
                      <p className="text-gray-500">{member.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(member.status)}
                  </TableCell>
                  {user?.role !== 'Admin' && (
                    <TableCell>
                      {getDsrfaStatusBadge(member.dsrfaStatus)}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="text-sm">
                      <p>Joined: {new Date(member.joinDate).toLocaleDateString()}</p>
                      <p className="text-gray-500">
                        Expires: {new Date(member.membershipExpiry).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <FileText className="w-4 h-4 mr-1 text-gray-400" />
                      {member.documents || 0} docs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('member-profile', member.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {member.status === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(member, 'approve')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(member, 'reject')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredMembers.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Rejection Dialog */}
      <AlertDialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Membership Application</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting {selectedMember?.name}'s membership application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRejectionReason('')}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejection}
              disabled={!rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}