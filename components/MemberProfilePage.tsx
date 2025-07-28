import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  UserCheck,
  Building,
  Trophy,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarX,
  Paperclip,
  Download,
  Eye,
  FileImage,
  File,
  Shield,
  ShieldCheck,
  ShieldX,
  Target,
  Activity,
  Users,
  Star,
  UserMinus
} from 'lucide-react';
import { NavigationPage, User as AppUser } from '../App';

interface MemberProfilePageProps {
  user: AppUser | null;
  memberId: string | null;
  onNavigate: (page: NavigationPage, memberId?: string) => void;
}

interface Attachment {
  id: string;
  name: string;
  type: 'birth_certificate' | 'id_card' | 'medical_certificate' | 'photo' | 'other';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'verified' | 'pending' | 'rejected';
  url: string;
  mimeType: string;
  rejectionReason?: string;
}

interface Match {
  id: string;
  date: string;
  tournament: string;
  opponent: string;
  venue: string;
  result: 'Win' | 'Loss' | 'Draw';
  score: string;
  memberRole: string;
  position?: string;
  minutesPlayed?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  cleanSheet?: boolean;
  performance: 'Excellent' | 'Good' | 'Average' | 'Below Average';
  status: 'Completed' | 'Upcoming' | 'Cancelled';
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Player' | 'Coach' | 'Referee' | 'Volunteer';
  club: string;
  position: string;
  location: string;
  joinDate: string;
  membershipExpiry: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Released';
  avatar?: string;
  registrationDate: string;
  lastActive: string;
  bio?: string;
  experience?: string;
  certifications?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalInfo?: string;
  previousClubs?: string[];
  achievements?: string[];
  attachments?: Attachment[];
  matches?: Match[];
  seasonStats?: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goals: number;
    assists: number;
    cleanSheets: number;
    yellowCards: number;
    redCards: number;
  };
}

export function MemberProfilePage({ user, memberId, onNavigate }: MemberProfilePageProps) {
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false);
  // Comprehensive member data that matches the MembersPage structure
  const memberData: Record<string, Member> = {
    '1': {
      id: '1',
      name: 'Juan Carlos Santos',
      email: 'juan.santos@email.com',
      phone: '+63 917-555-0101',
      role: 'Player',
      club: 'Davao Eagles FC',
      position: 'Striker',
      location: 'Davao City',
      joinDate: '2023-01-15',
      membershipExpiry: '2025-01-15',
      status: 'Active',
      registrationDate: '2024-01-10',
      lastActive: '2025-06-12',
      bio: 'Experienced striker with excellent finishing ability and field vision. I have been playing football for over 10 years and love being part of a team.',
      experience: '10+ years playing experience, Former captain of university team',
      certifications: ['Level 1 Coaching Certificate', 'First Aid Certification'],
      emergencyContact: {
        name: 'Maria Santos',
        phone: '+63 917-555-0102',
        relationship: 'Spouse'
      },
      medicalInfo: 'No known medical conditions',
      previousClubs: ['University FC', 'Downtown United'],
      achievements: ['Player of the Month - March 2024', 'Most Goals 2023 Season'],
      seasonStats: {
        matchesPlayed: 18,
        wins: 12,
        draws: 4,
        losses: 2,
        goals: 15,
        assists: 8,
        cleanSheets: 0,
        yellowCards: 2,
        redCards: 0
      },
      matches: [
        {
          id: 'm1',
          date: '2025-06-15',
          tournament: 'Regional Championship',
          opponent: 'Southern Eagles',
          venue: 'Central Stadium',
          result: 'Win',
          score: '2-1',
          memberRole: 'Player',
          position: 'Striker',
          minutesPlayed: 90,
          goals: 2,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          performance: 'Excellent',
          status: 'Completed'
        },
        {
          id: 'm2',
          date: '2025-06-08',
          tournament: 'Regional Championship',
          opponent: 'North United',
          venue: 'City Sports Complex',
          result: 'Draw',
          score: '1-1',
          memberRole: 'Player',
          position: 'Striker',
          minutesPlayed: 78,
          goals: 1,
          assists: 0,
          yellowCards: 1,
          redCards: 0,
          performance: 'Good',
          status: 'Completed'
        },
        {
          id: 'm3',
          date: '2025-06-25',
          tournament: 'Regional Championship',
          opponent: 'Western Sharks',
          venue: 'Central Stadium',
          result: 'Win',
          score: '',
          memberRole: 'Player',
          position: 'Striker',
          performance: 'Average',
          status: 'Upcoming'
        }
      ],
      attachments: [
        {
          id: 'att1',
          name: 'Birth Certificate',
          type: 'birth_certificate',
          fileName: 'juan_santos_birth_cert.pdf',
          fileSize: '1.2 MB',
          uploadDate: '2024-01-10',
          uploadedBy: 'Juan Carlos Santos',
          status: 'verified',
          url: '#',
          mimeType: 'application/pdf'
        },
        {
          id: 'att2',
          name: 'National ID',
          type: 'id_card',
          fileName: 'juan_santos_national_id.jpg',
          fileSize: '856 KB',
          uploadDate: '2024-01-10',
          uploadedBy: 'Juan Carlos Santos',
          status: 'verified',
          url: '#',
          mimeType: 'image/jpeg'
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Maria Elena Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+63 917-555-0102',
      role: 'Coach',
      club: 'Southern Mindanao United',
      position: 'Head Coach',
      location: 'General Santos',
      joinDate: '2022-08-10',
      membershipExpiry: '2024-08-10',
      status: 'Active',
      registrationDate: '2022-08-05',
      lastActive: '2025-06-12',
      bio: 'Experienced coach with a passion for developing young talent and team strategy.',
      experience: '8 years coaching experience, UEFA Level B certification',
      certifications: ['UEFA Level B Coaching License', 'Sports Psychology Certificate'],
      emergencyContact: {
        name: 'Carlos Rodriguez',
        phone: '+63 917-555-0103',
        relationship: 'Spouse'
      },
      medicalInfo: 'No known medical conditions',
      previousClubs: ['Youth Academy FC', 'Regional Development Center'],
      achievements: ['Coach of the Year 2023', 'Youth Development Award'],
      seasonStats: {
        matchesPlayed: 20,
        wins: 14,
        draws: 4,
        losses: 2,
        goals: 0,
        assists: 0,
        cleanSheets: 0,
        yellowCards: 0,
        redCards: 0
      },
      matches: [
        {
          id: 'mc1',
          date: '2025-06-16',
          tournament: 'Regional Championship',
          opponent: 'Central FC',
          venue: 'Regional Stadium',
          result: 'Win',
          score: '3-1',
          memberRole: 'Coach',
          performance: 'Excellent',
          status: 'Completed'
        }
      ],
      attachments: []
    },
    '3': {
      id: '3',
      name: 'Roberto Francisco Cruz',
      email: 'roberto.cruz@email.com',
      phone: '+63 917-555-0103',
      role: 'Player',
      club: 'Tagum City FC',
      position: 'Goalkeeper',
      location: 'Tagum City',
      joinDate: '2023-03-20',
      membershipExpiry: '2025-03-20',
      status: 'Active',
      registrationDate: '2023-03-15',
      lastActive: '2025-06-12',
      bio: 'Dedicated goalkeeper with excellent reflexes and command of the penalty area.',
      experience: '7 years playing experience, Former youth national team',
      certifications: ['Goalkeeper Specialist Course', 'First Aid Certification'],
      emergencyContact: {
        name: 'Ana Cruz',
        phone: '+63 917-555-0104',
        relationship: 'Mother'
      },
      medicalInfo: 'No known medical conditions',
      previousClubs: ['Youth National Team', 'Regional Academy'],
      achievements: ['Best Goalkeeper 2023', 'Clean Sheet Record Holder'],
      seasonStats: {
        matchesPlayed: 16,
        wins: 10,
        draws: 4,
        losses: 2,
        goals: 0,
        assists: 2,
        cleanSheets: 9,
        yellowCards: 1,
        redCards: 0
      },
      matches: [
        {
          id: 'mg1',
          date: '2025-06-14',
          tournament: 'Regional Championship',
          opponent: 'Eastern Stars',
          venue: 'Regional Complex',
          result: 'Win',
          score: '1-0',
          memberRole: 'Player',
          position: 'Goalkeeper',
          minutesPlayed: 90,
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          cleanSheet: true,
          performance: 'Excellent',
          status: 'Completed'
        }
      ],
      attachments: []
    }
  };

  // Add default empty attachments and matches for other members
  Object.keys(memberData).forEach(key => {
    if (!memberData[key].attachments) {
      memberData[key].attachments = [];
    }
    if (!memberData[key].matches) {
      memberData[key].matches = [];
    }
  });

  const member = memberId ? memberData[memberId] : null;

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Member not found</h3>
          <p className="text-gray-600 mb-4">The requested member profile could not be found.</p>
          <Button onClick={() => onNavigate('members')} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
            Back to Members
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: 'Active' | 'Pending' | 'Expired' | 'Released') => {
    const variants = {
      Active: { className: 'bg-green-100 text-green-800', icon: <UserCheck className="w-3 h-3 mr-1" /> },
      Pending: { className: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3 mr-1" /> },
      Expired: { className: 'bg-red-100 text-red-800', icon: <CalendarX className="w-3 h-3 mr-1" /> },
      Released: { className: 'bg-purple-100 text-purple-800', icon: <UserMinus className="w-3 h-3 mr-1" /> },
    };

    const { className, icon } = variants[status];
    return (
      <Badge className={`rounded-lg ${className}`}>
        {icon}
        {status === 'Expired' ? 'Membership Expired' : status}
      </Badge>
    );
  };

  const getAttachmentStatusBadge = (status: 'verified' | 'pending' | 'rejected') => {
    const variants = {
      verified: { className: 'bg-green-100 text-green-800', icon: <ShieldCheck className="w-3 h-3 mr-1" /> },
      pending: { className: 'bg-yellow-100 text-yellow-800', icon: <Shield className="w-3 h-3 mr-1" /> },
      rejected: { className: 'bg-red-100 text-red-800', icon: <ShieldX className="w-3 h-3 mr-1" /> },
    };

    const { className, icon } = variants[status];
    return (
      <Badge className={`rounded-lg ${className}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getMatchResultBadge = (result: 'Win' | 'Loss' | 'Draw') => {
    const variants = {
      Win: { className: 'bg-green-100 text-green-800' },
      Loss: { className: 'bg-red-100 text-red-800' },
      Draw: { className: 'bg-yellow-100 text-yellow-800' },
    };

    const { className } = variants[result];
    return (
      <Badge className={`rounded-lg ${className}`}>
        {result}
      </Badge>
    );
  };

  const getPerformanceBadge = (performance: 'Excellent' | 'Good' | 'Average' | 'Below Average') => {
    const variants = {
      'Excellent': { className: 'bg-green-100 text-green-800', icon: <Star className="w-3 h-3 mr-1" /> },
      'Good': { className: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
      'Average': { className: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3 mr-1" /> },
      'Below Average': { className: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3 mr-1" /> },
    };

    const { className, icon } = variants[performance];
    return (
      <Badge className={`rounded-lg ${className}`}>
        {icon}
        {performance}
      </Badge>
    );
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-blue-600" />;
    } else if (mimeType === 'application/pdf') {
      return <FileText className="w-5 h-5 text-red-600" />;
    } else {
      return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      birth_certificate: 'Birth Certificate',
      id_card: 'ID Card/License',
      medical_certificate: 'Medical Certificate',
      photo: 'Photo',
      other: 'Other Document'
    };
    return labels[type as keyof typeof labels] || 'Document';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Player': return '⚽';
      case 'Coach': return '👨‍🏫';
      case 'Referee': return '🟨';
      case 'Volunteer': return '🤝';
      default: return '👤';
    }
  };

  const handleVerifyDocument = (attachmentId: string) => {
    console.log('Verifying document:', attachmentId);
    alert('Document has been verified successfully!');
  };

  const handleRejectDocument = (attachmentId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      console.log('Rejecting document:', attachmentId, 'Reason:', reason);
      alert('Document has been rejected. The member will be notified.');
    }
  };

  const handleReleaseMember = () => {
    // In a real application, this would update the member's club status in the database
    console.log('Releasing member:', member?.id, 'from club:', member?.club);
    
    // Mock the release process
    alert(`${member?.name} has been successfully released from ${member?.club}. They can now join another club or be tagged by other clubs.`);
    
    // Close dialog and navigate back to members list
    setIsReleaseDialogOpen(false);
    onNavigate('club'); // Navigate back to club members page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => onNavigate('members')}
                className="cursor-pointer hover:text-logo-green"
              >
                Members
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Member Profile</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{member.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('members')}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Members
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Member Profile</h1>
            <p className="text-gray-600">
              {member.status === 'Pending' ? 'Review pending membership application' : 
               member.status === 'Expired' ? 'Membership has expired - renewal required' :
               'Member information and details'}
            </p>
          </div>
        </div>

        {user?.role === 'Admin' && member.status === 'Pending' && (
          <div className="flex space-x-3">
            <Button 
              variant="destructive" 
              className="rounded-lg"
              onClick={() => {
                onNavigate('members');
              }}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
              onClick={() => {
                onNavigate('members');
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        )}

        {user?.role === 'Admin' && member.status === 'Expired' && (
          <div className="flex space-x-3">
            <Button 
              className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
              onClick={() => {
                onNavigate('renewal');
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Renew Membership
            </Button>
          </div>
        )}
        
        {user?.role === 'Club Owner' && member.status === 'Active' && (
          <div className="flex space-x-3">
            <Button 
              variant="destructive"
              className="rounded-lg"
              onClick={() => setIsReleaseDialogOpen(true)}
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Release Member
            </Button>
          </div>
        )}
      </div>

      {/* Release Member Confirmation Dialog */}
      <Dialog open={isReleaseDialogOpen} onOpenChange={setIsReleaseDialogOpen}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Release Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to release <strong>{member.name}</strong> from <strong>{member.club}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-3">
              This action will:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
              <li>Remove the member from your club roster</li>
              <li>Allow them to join another club</li>
              <li>Allow other clubs to tag this member to their roster</li>
              <li>Preserve their match history and statistics</li>
            </ul>
            <p className="text-sm text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsReleaseDialogOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReleaseMember}
              className="rounded-lg"
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Release Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Basic Information - Full Width */}
      <div className="mb-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-logo-green text-white text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg">{getRoleIcon(member.role)}</span>
                      <span className="text-gray-600">{member.role} - {member.position}</span>
                    </div>
                    <div className="mt-2">
                      {getStatusBadge(member.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{member.club}</span>
                    </div>
                  </div>
                </div>
                
                {member.bio && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matches & Performance - Full Width */}
      <div className="mb-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Matches & Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Season Statistics */}
            {member.seasonStats && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">2025 Season Statistics</h4>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{member.seasonStats.matchesPlayed}</div>
                    <div className="text-xs text-gray-600">Matches</div>
                  </div>
                  {member.role !== 'Referee' && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{member.seasonStats.wins}</div>
                        <div className="text-xs text-gray-600">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{member.seasonStats.draws}</div>
                        <div className="text-xs text-gray-600">Draws</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{member.seasonStats.losses}</div>
                        <div className="text-xs text-gray-600">Losses</div>
                      </div>
                    </>
                  )}
                  {member.role === 'Player' && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{member.seasonStats.goals}</div>
                        <div className="text-xs text-gray-600">Goals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{member.seasonStats.assists}</div>
                        <div className="text-xs text-gray-600">Assists</div>
                      </div>
                      {(member.position.toLowerCase().includes('keeper') || member.position.toLowerCase().includes('defender')) && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-700">{member.seasonStats.cleanSheets}</div>
                          <div className="text-xs text-gray-600">Clean Sheets</div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{member.seasonStats.yellowCards}</div>
                    <div className="text-xs text-gray-600">Yellow Cards</div>
                  </div>
                  {member.seasonStats.redCards > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{member.seasonStats.redCards}</div>
                      <div className="text-xs text-gray-600">Red Cards</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Matches */}
            {member.matches && member.matches.length > 0 ? (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Matches</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tournament</TableHead>
                        <TableHead>Match</TableHead>
                        <TableHead>Result</TableHead>
                        {member.role === 'Player' && <TableHead>Performance</TableHead>}
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {member.matches.slice(0, 5).map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(match.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">{match.venue}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{match.tournament}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {member.role === 'Referee' ? match.opponent : 
                               `vs ${match.opponent}`}
                            </div>
                            {match.position && (
                              <div className="text-xs text-gray-500">{match.position}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {match.status === 'Completed' ? (
                                <>
                                  {getMatchResultBadge(match.result)}
                                  <div className="text-xs text-gray-600">{match.score}</div>
                                </>
                              ) : match.status === 'Upcoming' ? (
                                <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
                              )}
                            </div>
                          </TableCell>
                          {member.role === 'Player' && (
                            <TableCell>
                              {match.status === 'Completed' && match.minutesPlayed !== undefined ? (
                                <div className="text-xs space-y-1">
                                  <div>{match.minutesPlayed}' played</div>
                                  {match.goals !== undefined && match.goals > 0 && (
                                    <div className="text-green-600">⚽ {match.goals}</div>
                                  )}
                                  {match.assists !== undefined && match.assists > 0 && (
                                    <div className="text-blue-600">🅰️ {match.assists}</div>
                                  )}
                                  {match.cleanSheet && (
                                    <div className="text-green-700">🛡️ Clean Sheet</div>
                                  )}
                                  {match.yellowCards !== undefined && match.yellowCards > 0 && (
                                    <div className="text-yellow-500">🟨 {match.yellowCards}</div>
                                  )}
                                  {match.redCards !== undefined && match.redCards > 0 && (
                                    <div className="text-red-500">🟥 {match.redCards}</div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-xs text-gray-400">-</div>
                              )}
                            </TableCell>
                          )}
                          <TableCell>
                            {match.status === 'Completed' ? (
                              getPerformanceBadge(match.performance)
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {member.matches.length > 5 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Eye className="w-4 h-4 mr-2" />
                      View All Matches ({member.matches.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No matches recorded</h4>
                <p className="text-gray-600">
                  No match history available for this member yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Documents & Attachments - Full Width (Admin Only) */}
      {user?.role === 'Admin' && (
        <div className="mb-8">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Paperclip className="w-5 h-5" />
                <span>Documents & Attachments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {member.attachments && member.attachments.length > 0 ? (
                <div className="space-y-4">
                  {member.attachments.map((attachment) => (
                    <div key={attachment.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">
                            {getFileIcon(attachment.mimeType)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{attachment.name}</h4>
                              {getAttachmentStatusBadge(attachment.status)}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-1">
                              {getDocumentTypeLabel(attachment.type)} • {attachment.fileName}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{attachment.fileSize}</span>
                              <span>Uploaded {new Date(attachment.uploadDate).toLocaleDateString()}</span>
                              <span>by {attachment.uploadedBy}</span>
                            </div>
                            
                            {attachment.status === 'rejected' && attachment.rejectionReason && (
                              <Alert className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                  <strong>Rejected:</strong> {attachment.rejectionReason}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(attachment.url, '_blank')}
                            className="rounded-lg"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              console.log('Downloading:', attachment.fileName);
                            }}
                            className="rounded-lg"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>

                          {user?.role === 'Admin' && attachment.status === 'pending' && (
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                onClick={() => handleVerifyDocument(attachment.id)}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verify
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectDocument(attachment.id)}
                                className="rounded-lg"
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h4>
                  <p className="text-gray-600 mb-4">
                    No documents have been uploaded for this member yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{member.experience}</p>
                
                {member.previousClubs && member.previousClubs.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Previous Clubs</h5>
                    <div className="space-y-1">
                      {member.previousClubs.map((club, index) => (
                        <Badge key={index} variant="outline" className="rounded-lg mr-2 mb-1">
                          {club}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {member.certifications && member.certifications.length > 0 ? (
                  <div className="space-y-2">
                    {member.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No certifications listed</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {member.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Membership Details - Admin Only */}
          {user?.role === 'Admin' && (
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Membership Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Registration Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{new Date(member.registrationDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Join Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Membership Expiry</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{new Date(member.membershipExpiry).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Last Active</label>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{new Date(member.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact - Admin Only */}
          {user?.role === 'Admin' && member.emergencyContact && (
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-sm mt-1">{member.emergencyContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <div className="flex items-center mt-1">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{member.emergencyContact.phone}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Relationship</label>
                  <p className="text-sm mt-1">{member.emergencyContact.relationship}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medical Information - Admin Only */}
          {user?.role === 'Admin' && member.medicalInfo && (
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Medical Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{member.medicalInfo}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}