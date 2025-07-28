import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle,
  UserCheck,
  UserX,
  Banknote,
  TrendingUp,
  ArrowLeft,
  AlertCircle,
  DollarSign,
  FileImage,
  Download,
  Eye,
  ExternalLink
} from 'lucide-react';
import { NavigationPage, User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventManagementPageProps {
  user: User | null;
  eventId: string | null;
  onNavigate: (page: NavigationPage, eventId?: string) => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  club: string;
  role: string;
  registrationDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  amountPaid: number;
  paymentReference?: string;
  paymentProofImage?: string;
  approvalStatus: 'Approved' | 'Pending' | 'Declined';
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  registrationFee: number;
  maxParticipants: number;
  image: string;
  organizer: string;
  participants?: Participant[];
}

export function EventManagementPage({ user, eventId, onNavigate }: EventManagementPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<string | null>(null);

  // Mock events data
  const mockEvents: Record<string, Event> = {
    '1': {
      id: '1',
      title: 'Regional Championship 2025',
      description: 'Annual regional championship tournament featuring teams from across Mindanao.',
      date: '2025-07-15',
      time: '09:00',
      location: 'Davao City',
      venue: 'Davao Sports Complex',
      category: 'Tournament',
      registrationFee: 2500,
      maxParticipants: 64,
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop',
      organizer: 'DSRFA Tournament Committee',
      participants: [
        {
          id: 'p1',
          name: 'Juan Carlos Santos',
          email: 'juan.santos@email.com',
          phone: '+63 917-555-0101',
          club: 'Davao Eagles FC',
          role: 'Player',
          registrationDate: '2025-06-01',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001234',
          paymentProofImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p2',
          name: 'Maria Elena Rodriguez',
          email: 'maria.rodriguez@email.com',
          phone: '+63 917-555-0102',
          club: 'Southern Mindanao United',
          role: 'Coach',
          registrationDate: '2025-06-03',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001235',
          paymentProofImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p3',
          name: 'Roberto Francisco Cruz',
          email: 'roberto.cruz@email.com',
          phone: '+63 917-555-0103',
          club: 'Tagum City FC',
          role: 'Player',
          registrationDate: '2025-06-05',
          paymentStatus: 'Pending',
          amountPaid: 0,
          paymentReference: 'REF-2025-001236',
          approvalStatus: 'Pending'
        },
        {
          id: 'p4',
          name: 'Anna Marie Dela Cruz',
          email: 'anna.delacruz@email.com',
          phone: '+63 917-555-0104',
          club: 'Digos City United',
          role: 'Referee',
          registrationDate: '2025-06-07',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001237',
          paymentProofImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=400&fit=crop',
          approvalStatus: 'Pending'
        },
        {
          id: 'p5',
          name: 'Jose Miguel Torres',
          email: 'jose.torres@email.com',
          phone: '+63 917-555-0105',
          club: 'General Santos FC',
          role: 'Player',
          registrationDate: '2025-06-10',
          paymentStatus: 'Failed',
          amountPaid: 0,
          paymentReference: 'REF-2025-001238',
          approvalStatus: 'Declined'
        },
        {
          id: 'p6',
          name: 'Carmen Santos Aquino',
          email: 'carmen.aquino@email.com',
          phone: '+63 917-555-0106',
          club: 'Koronadal City FC',
          role: 'Player',
          registrationDate: '2025-06-12',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001239',
          paymentProofImage: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p7',
          name: 'Michael John Reyes',
          email: 'michael.reyes@email.com',
          phone: '+63 917-555-0107',
          club: 'Davao Eagles FC',
          role: 'Player',
          registrationDate: '2025-06-02',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001240',
          paymentProofImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p8',
          name: 'Sarah Grace Villanueva',
          email: 'sarah.villanueva@email.com',
          phone: '+63 917-555-0108',
          club: 'Mati City FC',
          role: 'Coach',
          registrationDate: '2025-06-04',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001241',
          paymentProofImage: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p9',
          name: 'Anthony Luis Garcia',
          email: 'anthony.garcia@email.com',
          phone: '+63 917-555-0109',
          club: 'Panabo City United',
          role: 'Player',
          registrationDate: '2025-06-06',
          paymentStatus: 'Pending',
          amountPaid: 0,
          paymentReference: 'REF-2025-001242',
          approvalStatus: 'Pending'
        },
        {
          id: 'p10',
          name: 'Maricel Joy Fernandez',
          email: 'maricel.fernandez@email.com',
          phone: '+63 917-555-0110',
          club: 'Samal Island FC',
          role: 'Referee',
          registrationDate: '2025-06-08',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001243',
          paymentProofImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p11',
          name: 'Ricardo James Mendoza',
          email: 'ricardo.mendoza@email.com',
          phone: '+63 917-555-0111',
          club: 'Bansalan Sports Club',
          role: 'Player',
          registrationDate: '2025-06-09',
          paymentStatus: 'Failed',
          amountPaid: 0,
          paymentReference: 'REF-2025-001244',
          approvalStatus: 'Declined'
        },
        {
          id: 'p12',
          name: 'Jennifer Rose Castro',
          email: 'jennifer.castro@email.com',
          phone: '+63 917-555-0112',
          club: 'Malaybalay FC',
          role: 'Volunteer',
          registrationDate: '2025-06-11',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001245',
          paymentProofImage: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=300&h=400&fit=crop',
          approvalStatus: 'Pending'
        },
        {
          id: 'p13',
          name: 'Daniel Mark Ocampo',
          email: 'daniel.ocampo@email.com',
          phone: '+63 917-555-0113',
          club: 'Kidapawan City FC',
          role: 'Player',
          registrationDate: '2025-06-13',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001246',
          paymentProofImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p14',
          name: 'Lisa Mae Gonzales',
          email: 'lisa.gonzales@email.com',
          phone: '+63 917-555-0114',
          club: 'Cotabato United',
          role: 'Coach',
          registrationDate: '2025-06-14',
          paymentStatus: 'Pending',
          amountPaid: 0,
          paymentReference: 'REF-2025-001247',
          approvalStatus: 'Pending'
        },
        {
          id: 'p15',
          name: 'Paulo Vincent Ramos',
          email: 'paulo.ramos@email.com',
          phone: '+63 917-555-0115',
          club: 'Davao Eagles FC',
          role: 'Player',
          registrationDate: '2025-06-15',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001248',
          paymentProofImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p16',
          name: 'Cristina Belle Morales',
          email: 'cristina.morales@email.com',
          phone: '+63 917-555-0116',
          club: 'Marawi City FC',
          role: 'Referee',
          registrationDate: '2025-06-16',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001249',
          paymentProofImage: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=300&h=400&fit=crop',
          approvalStatus: 'Pending'
        },
        {
          id: 'p17',
          name: 'Emmanuel Jose Dela Torre',
          email: 'emmanuel.delatorre@email.com',
          phone: '+63 917-555-0117',
          club: 'Butuan City Sports',
          role: 'Player',
          registrationDate: '2025-06-17',
          paymentStatus: 'Failed',
          amountPaid: 0,
          paymentReference: 'REF-2025-001250',
          approvalStatus: 'Declined'
        },
        {
          id: 'p18',
          name: 'Rachel Anne Padilla',
          email: 'rachel.padilla@email.com',
          phone: '+63 917-555-0118',
          club: 'Surigao FC',
          role: 'Volunteer',
          registrationDate: '2025-06-18',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001251',
          paymentProofImage: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        },
        {
          id: 'p19',
          name: 'Francis Xavier Lim',
          email: 'francis.lim@email.com',
          phone: '+63 917-555-0119',
          club: 'Cagayan de Oro FC',
          role: 'Coach',
          registrationDate: '2025-06-19',
          paymentStatus: 'Pending',
          amountPaid: 0,
          paymentReference: 'REF-2025-001252',
          approvalStatus: 'Pending'
        },
        {
          id: 'p20',
          name: 'Vanessa Joy Santiago',
          email: 'vanessa.santiago@email.com',
          phone: '+63 917-555-0120',
          club: 'Iligan City United',
          role: 'Player',
          registrationDate: '2025-06-20',
          paymentStatus: 'Paid',
          amountPaid: 2500,
          paymentReference: 'REF-2025-001253',
          paymentProofImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Youth Development Workshop',
      description: 'Comprehensive training workshop for young players and coaches.',
      date: '2025-06-30',
      time: '14:00',
      location: 'General Santos',
      venue: 'Regional Training Center',
      category: 'Workshop',
      registrationFee: 1500,
      maxParticipants: 50,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop',
      organizer: 'DSRFA Youth Development',
      participants: [
        {
          id: 'p21',
          name: 'Michael Santos',
          email: 'michael.santos@email.com',
          phone: '+63 917-555-0107',
          club: 'GenSan Youth FC',
          role: 'Player',
          registrationDate: '2025-06-01',
          paymentStatus: 'Paid',
          amountPaid: 1500,
          paymentReference: 'REF-2025-002001',
          paymentProofImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
          approvalStatus: 'Approved'
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      if (eventId && mockEvents[eventId]) {
        setEvent(mockEvents[eventId]);
      }
      setIsLoading(false);
    }, 500);
  }, [eventId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleParticipantApproval = (participantId: string, action: 'approve' | 'decline') => {
    if (!event) return;

    const updatedParticipants = event.participants?.map(p => 
      p.id === participantId 
        ? { ...p, approvalStatus: action === 'approve' ? 'Approved' as const : 'Declined' as const }
        : p
    );

    setEvent({ ...event, participants: updatedParticipants });

    const participant = event.participants?.find(p => p.id === participantId);
    if (participant) {
      alert(`${participant.name} has been ${action === 'approve' ? 'approved' : 'declined'} for the event.`);
    }
  };

  const handleDownloadPaymentProof = (participantName: string, imageUrl: string) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading payment proof for ${participantName}: ${imageUrl}`);
    alert(`Payment proof for ${participantName} would be downloaded.`);
  };

  const calculateStats = () => {
    if (!event?.participants) return { totalParticipants: 0, totalRevenue: 0, approvedParticipants: 0, paidParticipants: 0 };

    const totalParticipants = event.participants.length;
    const approvedParticipants = event.participants.filter(p => p.approvalStatus === 'Approved').length;
    const paidParticipants = event.participants.filter(p => p.paymentStatus === 'Paid').length;
    const totalRevenue = event.participants
      .filter(p => p.paymentStatus === 'Paid')
      .reduce((sum, p) => sum + p.amountPaid, 0);

    return { totalParticipants, totalRevenue, approvedParticipants, paidParticipants };
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-green mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Event not found</h3>
          <p className="text-gray-600 mb-4">The requested event could not be found.</p>
          <Button onClick={() => onNavigate('events')} className="bg-logo-green hover:bg-green-600 text-white">
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => onNavigate('events')}
                className="cursor-pointer hover:text-logo-green"
              >
                Events & Tournaments
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Event Management</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{event.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('events')}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-gray-600">Manage participants and track event performance</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Event Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Event Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Registration Fee: {formatCurrency(event.registrationFee)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Max Participants: {event.maxParticipants}</span>
                  </div>
                </div>

                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {event.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Participants</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Approved</p>
                  <p className="text-2xl font-bold text-green-900">{stats.approvedParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Banknote className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Paid Participants</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.paidParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Participants Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {event.participants && event.participants.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Club & Role</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Payment Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {event.participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-gray-500">{participant.role}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{participant.email}</p>
                            <p className="text-sm text-gray-500">{participant.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{participant.club}</p>
                            <p className="text-sm text-gray-500">{participant.role}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {new Date(participant.registrationDate).toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={participant.paymentStatus === 'Paid' ? 'default' : 
                                       participant.paymentStatus === 'Pending' ? 'secondary' : 'destructive'}
                              >
                                {participant.paymentStatus}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {formatCurrency(participant.amountPaid)}
                              </span>
                            </div>
                            
                            {participant.paymentReference && (
                              <p className="text-xs text-gray-500 font-mono">
                                Ref: {participant.paymentReference}
                              </p>
                            )}
                            
                            {participant.paymentProofImage && (
                              <div className="flex items-center space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="h-6 px-2 text-xs"
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      View Receipt
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Payment Proof - {participant.name}</DialogTitle>
                                      <DialogDescription>
                                        View and download the payment receipt submitted by {participant.name} for this event registration.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <ImageWithFallback
                                        src={participant.paymentProofImage}
                                        alt={`Payment proof for ${participant.name}`}
                                        className="w-full max-h-96 object-contain rounded-lg border"
                                      />
                                      <div className="text-sm text-gray-600">
                                        <p><strong>Reference:</strong> {participant.paymentReference}</p>
                                        <p><strong>Amount:</strong> {formatCurrency(participant.amountPaid)}</p>
                                        <p><strong>Status:</strong> {participant.paymentStatus}</p>
                                      </div>
                                      <Button
                                        onClick={() => handleDownloadPaymentProof(participant.name, participant.paymentProofImage!)}
                                        className="w-full"
                                        variant="outline"
                                      >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Receipt
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownloadPaymentProof(participant.name, participant.paymentProofImage!)}
                                  className="h-6 px-2 text-xs"
                                  title="Download payment proof"
                                >
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={participant.approvalStatus === 'Approved' ? 'default' : 
                                   participant.approvalStatus === 'Pending' ? 'secondary' : 'destructive'}
                          >
                            {participant.approvalStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {participant.approvalStatus === 'Pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleParticipantApproval(participant.id, 'approve')}
                                className="text-green-600 hover:text-green-700"
                                title="Approve participant"
                              >
                                <UserCheck className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleParticipantApproval(participant.id, 'decline')}
                                className="text-red-600 hover:text-red-700"
                                title="Decline participant"
                              >
                                <UserX className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                          {participant.approvalStatus === 'Approved' && (
                            <span className="text-sm text-green-600 font-medium">Approved ✓</span>
                          )}
                          {participant.approvalStatus === 'Declined' && (
                            <span className="text-sm text-red-600 font-medium">Declined ✗</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No participants registered yet</h3>
                <p>Participants will appear here once they register for this event.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}