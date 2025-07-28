import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar, Trophy, Users, CreditCard, Bell, MapPin, Clock, Star, ExternalLink, Globe, Phone, Mail, Award } from 'lucide-react';
import { NavigationPage, User, hasAdminPrivileges, isFullAdmin } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AdminDashboard } from './AdminDashboard';

interface DashboardProps {
  user: User | null;
  onNavigate: (page: NavigationPage) => void;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  benefits: string[];
  partnerSince: string;
  contribution: string;
  category: string;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isSponsorDialogOpen, setIsSponsorDialogOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
          <Button onClick={() => onNavigate('login')}>Login</Button>
        </div>
      </div>
    );
  }

  // Show admin dashboard for admin users and different dashboard for club owners
  if (user.role === 'Admin') {
    return <AdminDashboard user={user} onNavigate={onNavigate} />;
  }
  
  // Club owners get a modified dashboard (no gallery button in quick actions)
  const isClubOwner = user.role === 'Club Owner';

  const upcomingEvents = [
    {
      id: 1,
      title: 'Youth Championship Finals',
      date: '2025-06-28',
      time: '14:00',
      location: 'Central Stadium',
      type: 'Tournament',
      registered: true
    },
    {
      id: 2,
      title: 'Summer Training Camp',
      date: '2025-07-05',
      time: '09:00',
      location: 'Training Grounds',
      type: 'Training',
      registered: false
    },
    {
      id: 3,
      title: 'Referee Workshop',
      date: '2025-07-12',
      time: '10:00',
      location: 'Conference Room',
      type: 'Workshop',
      registered: false
    }
  ];

  const sponsors: Sponsor[] = [
    {
      id: '1',
      name: 'Davao Sports Center',
      logo: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=200&h=100&fit=crop',
      tier: 'platinum',
      description: 'Premier sports facility providing world-class training equipment and venues for DSRFA events.',
      website: 'https://davaosportscenter.com',
      email: 'info@davaosportscenter.com',
      phone: '+63-82-123-4567',
      benefits: [
        'Exclusive venue access for tournaments',
        'Priority booking for training sessions',
        'Equipment sponsorship for major events',
        'Sports medicine and injury prevention services'
      ],
      partnerSince: '2020',
      contribution: '₱2,500,000 annually',
      category: 'Sports Facility'
    },
    {
      id: '2',
      name: 'Eagle Sportswear',
      logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop',
      tier: 'platinum',
      description: 'Leading sportswear brand providing official uniforms and equipment for all DSRFA teams.',
      website: 'https://eaglesportswear.ph',
      email: 'partnerships@eaglesportswear.ph',
      phone: '+63-82-234-5678',
      benefits: [
        'Official team uniforms and jerseys',
        'Training equipment and gear',
        'Referee and official uniforms',
        'Youth development program funding'
      ],
      partnerSince: '2019',
      contribution: '₱3,200,000 annually',
      category: 'Sportswear'
    },
    {
      id: '3',
      name: 'Mindanao Bank',
      logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=100&fit=crop',
      tier: 'gold',
      description: 'Regional banking partner supporting grassroots football development and financial literacy programs.',
      website: 'https://mindanaobank.com',
      email: 'community@mindanaobank.com',
      phone: '+63-82-345-6789',
      benefits: [
        'Tournament prize money sponsorship',
        'Youth scholarship programs',
        'Financial literacy workshops',
        'Banking services for members'
      ],
      partnerSince: '2021',
      contribution: '₱1,800,000 annually',
      category: 'Financial Services'
    },
    {
      id: '4',
      name: 'Davao Fresh Market',
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=100&fit=crop',
      tier: 'gold',
      description: 'Local market chain providing healthy nutrition options and meal sponsorships for events.',
      website: 'https://davaofreshmarket.com',
      email: 'events@davaofreshmarket.com',
      phone: '+63-82-456-7890',
      benefits: [
        'Event catering and refreshments',
        'Nutrition education programs',
        'Healthy meal plans for athletes',
        'Community outreach support'
      ],
      partnerSince: '2022',
      contribution: '₱950,000 annually',
      category: 'Food & Nutrition'
    },
    {
      id: '5',
      name: 'TechSolutions Davao',
      logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=200&h=100&fit=crop',
      tier: 'silver',
      description: 'Technology company providing digital solutions for event management and live streaming.',
      website: 'https://techsolutionsdvo.com',
      email: 'support@techsolutionsdvo.com',
      phone: '+63-82-567-8901',
      benefits: [
        'Live streaming technology',
        'Event management software',
        'Website and app development',
        'Digital marketing support'
      ],
      partnerSince: '2023',
      contribution: '₱650,000 annually',
      category: 'Technology'
    },
    {
      id: '6',
      name: 'Durian Transport',
      logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=100&fit=crop',
      tier: 'silver',
      description: 'Transportation company providing team travel and logistics support for away games.',
      website: 'https://duriantransport.ph',
      email: 'booking@duriantransport.ph',
      phone: '+63-82-678-9012',
      benefits: [
        'Team transportation services',
        'Equipment logistics',
        'Emergency travel support',
        'Tour and travel packages'
      ],
      partnerSince: '2023',
      contribution: '₱480,000 annually',
      category: 'Transportation'
    }
  ];

  const getTierInfo = (tier: 'platinum' | 'gold' | 'silver') => {
    const tierConfig = {
      platinum: {
        label: 'Platinum Partner',
        color: 'bg-gradient-to-r from-gray-400 to-gray-600',
        textColor: 'text-white',
        icon: <Award className="w-4 h-4" />,
        border: 'border-gray-400'
      },
      gold: {
        label: 'Gold Partner',
        color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        textColor: 'text-yellow-900',
        icon: <Star className="w-4 h-4" />,
        border: 'border-yellow-400'
      },
      silver: {
        label: 'Silver Partner',
        color: 'bg-gradient-to-r from-slate-300 to-slate-500',
        textColor: 'text-slate-900',
        icon: <Trophy className="w-4 h-4" />,
        border: 'border-slate-400'
      }
    };
    return tierConfig[tier];
  };

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsSponsorDialogOpen(true);
  };

  const sponsorsByTier = {
    platinum: sponsors.filter(s => s.tier === 'platinum'),
    gold: sponsors.filter(s => s.tier === 'gold'),
    silver: sponsors.filter(s => s.tier === 'silver')
  };

  const announcements = [
    {
      id: 1,
      title: 'New Training Facility Opening',
      message: 'We\'re excited to announce the opening of our new state-of-the-art training facility next month.',
      date: '2025-06-10',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Membership Renewal Reminder',
      message: 'Annual membership renewals are due by the end of this month. Renew now to avoid service interruption.',
      date: '2025-06-08',
      priority: 'medium'
    }
  ];

  const stats = [
    { label: 'Events This Month', value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: 'Active Members', value: '248', icon: Users, color: 'text-green-600' },
    { label: 'Tournaments Won', value: '7', icon: Trophy, color: 'text-yellow-600' },
  ];

  const membershipDaysLeft = Math.ceil(
    (new Date(user.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">
          Here's what's happening with your football association today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Membership Status */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Membership Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold">{user.membershipStatus} Member</p>
                  <p className="text-gray-600">{user.role} at {user.club}</p>
                </div>
                <Badge 
                  variant={user.membershipStatus === 'Active' ? 'default' : 'destructive'}
                  className={`rounded-lg ${user.membershipStatus === 'Active' ? 'bg-green-600' : ''}`}
                >
                  {user.membershipStatus}
                </Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Membership Expires</span>
                  <span className="text-sm text-gray-600">
                    {new Date(user.membershipExpiry).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Days Remaining</span>
                  <span className={`text-sm font-medium ${membershipDaysLeft < 30 ? 'text-red-600' : 'text-green-600'}`}>
                    {membershipDaysLeft} days
                  </span>
                </div>
              </div>
              
              {membershipDaysLeft < 30 && (
                <Button 
                  onClick={() => onNavigate('renewal')}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  Renew Membership
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Events</span>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => onNavigate('events')} className="rounded-lg">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={event.registered ? 'default' : 'outline'} className="rounded-lg">
                        {event.registered ? 'Registered' : 'Available'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
     

          {/* Announcements */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium">{announcement.title}</h4>
                      <Badge 
                        variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs rounded-lg"
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{announcement.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sponsor Details Dialog */}
      <Dialog open={isSponsorDialogOpen} onOpenChange={setIsSponsorDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedSponsor && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <ImageWithFallback
                    src={selectedSponsor.logo}
                    alt={selectedSponsor.name}
                    className="max-w-20 max-h-12 object-contain"
                  />
                  <div>
                    <DialogTitle className="text-xl">{selectedSponsor.name}</DialogTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getTierInfo(selectedSponsor.tier).color} ${getTierInfo(selectedSponsor.tier).textColor} rounded-lg`}>
                        {getTierInfo(selectedSponsor.tier).icon}
                        <span className="ml-2">{getTierInfo(selectedSponsor.tier).label}</span>
                      </Badge>
                      <Badge variant="outline" className="rounded-lg">
                        {selectedSponsor.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedSponsor.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Partnership Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Partnership Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Partner Since:</span>
                        <span className="font-medium">{selectedSponsor.partnerSince}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Contribution:</span>
                        <span className="font-medium text-green-600">{selectedSponsor.contribution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      {selectedSponsor.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a href={selectedSponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {selectedSponsor.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <a href={`mailto:${selectedSponsor.email}`} className="text-blue-600 hover:underline">
                            {selectedSponsor.email}
                          </a>
                        </div>
                      )}
                      {selectedSponsor.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <a href={`tel:${selectedSponsor.phone}`} className="text-blue-600 hover:underline">
                            {selectedSponsor.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Benefits & Contributions */}
                <div>
                  <h4 className="font-semibold mb-3">Benefits & Contributions to DSRFA</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedSponsor.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-logo-green rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSponsorDialogOpen(false)} className="rounded-lg">
                  Close
                </Button>
                {selectedSponsor.website && (
                  <Button 
                    onClick={() => window.open(selectedSponsor.website, '_blank')}
                    className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}