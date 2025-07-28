import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  DollarSign, 
  Share2, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Copy, 
  Check,
  Eye,
  Banknote,
  TrendingUp,
  UserCheck,
  Settings
} from 'lucide-react';
import { NavigationPage, User, hasAdminPrivileges, isFullAdmin } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventsPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string) => void;
}

interface EventParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  approvalStatus: 'Approved' | 'Pending' | 'Declined';
  amountPaid: number;
  role: string;
  club: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  category: string;
  ageGroup: string;
  maxParticipants: number;
  currentParticipants: number;
  image: string;
  price: string;
  status: 'Open' | 'Full' | 'Closed';
  registered: boolean;
  registrationFee?: number;
  participants?: EventParticipant[];
  totalRevenue?: number;
  createdBy?: string; // Track who created the event
}

interface NewEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  category: string;
  ageGroup: string;
  maxParticipants: string;
  registrationFee: string;
  imageUrl: string;
}

export function EventsPage({ user, onNavigate }: EventsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState<number | null>(null);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Youth Championship Finals',
      description: 'The ultimate showdown for youth teams across the region. Come witness the future stars of football compete for the championship title.',
      date: '2025-06-20',
      time: '14:00',
      venue: 'Central Stadium',
      location: 'Downtown',
      category: 'Tournament',
      ageGroup: 'Under 18',
      maxParticipants: 32,
      currentParticipants: 28,
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop',
      price: 'Free',
      status: 'Open',
      registered: false,
      registrationFee: 0,
      totalRevenue: 0,
      participants: [],
      createdBy: 'Admin'
    },
    {
      id: 2,
      title: 'Summer Training Camp',
      description: 'Intensive 5-day training program designed to improve your skills and fitness. Suitable for all skill levels with professional coaching.',
      date: '2025-07-01',
      time: '09:00',
      venue: 'Training Ground A',
      location: 'North District',
      category: 'Training',
      ageGroup: 'All Ages',
      maxParticipants: 50,
      currentParticipants: 32,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
      price: '₱150',
      status: 'Open',
      registered: true,
      registrationFee: 150,
      totalRevenue: 4800,
      participants: [],
      createdBy: 'Club Owner'
    },
    {
      id: 3,
      title: 'Referee Certification Course',
      description: 'Official referee certification program. Learn the rules, regulations, and practical skills needed to officiate matches.',
      date: '2025-06-25',
      time: '10:00',
      venue: 'Community Center',
      location: 'Central',
      category: 'Certification',
      ageGroup: 'Adult',
      maxParticipants: 25,
      currentParticipants: 18,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop',
      price: '₱75',
      status: 'Open',
      registered: false,
      registrationFee: 75,
      totalRevenue: 1350,
      participants: [],
      createdBy: 'Admin'
    },
    {
      id: 4,
      title: 'Women\'s League Match',
      description: 'Exciting match between the top two teams in the women\'s league. Come support our female athletes!',
      date: '2025-06-18',
      time: '16:00',
      venue: 'Riverside Pitch',
      location: 'East Side',
      category: 'Match',
      ageGroup: 'Adult',
      maxParticipants: 200,
      currentParticipants: 145,
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=250&fit=crop',
      price: '₱10',
      status: 'Open',
      registered: false,
      registrationFee: 10,
      totalRevenue: 1450,
      participants: [],
      createdBy: 'Club Owner'
    },
    {
      id: 5,
      title: 'Youth Skills Workshop',
      description: 'Interactive workshop focusing on fundamental football skills for young players aged 8-14.',
      date: '2025-06-22',
      time: '11:00',
      venue: 'Academy Fields',
      location: 'South District',
      category: 'Workshop',
      ageGroup: 'Under 14',
      maxParticipants: 30,
      currentParticipants: 30,
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop',
      price: '₱25',
      status: 'Full',
      registered: false,
      registrationFee: 25,
      totalRevenue: 750,
      participants: [],
      createdBy: 'Admin'
    },
    {
      id: 6,
      title: 'Coaches Development Seminar',
      description: 'Professional development seminar for coaches covering modern training techniques and sports psychology.',
      date: '2025-06-30',
      time: '13:00',
      venue: 'Conference Hall',
      location: 'Downtown',
      category: 'Seminar',
      ageGroup: 'Adult',
      maxParticipants: 40,
      currentParticipants: 25,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      price: '₱100',
      status: 'Open',
      registered: false,
      registrationFee: 100,
      totalRevenue: 2500,
      participants: [],
      createdBy: 'Club Owner'
    },
  ]);

  const [newEventForm, setNewEventForm] = useState<NewEventForm>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    category: '',
    ageGroup: '',
    maxParticipants: '',
    registrationFee: '',
    imageUrl: '',
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesAgeGroup = selectedAgeGroup === 'all' || event.ageGroup === selectedAgeGroup;
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesAgeGroup && matchesLocation;
  });

  const handleRegister = (eventId: number) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    
    // Navigate to registration form
    onNavigate('event-registration', undefined, undefined, undefined, eventId.toString());
  };

  const handleManageEvent = (eventId: number) => {
    onNavigate('event-management', undefined, undefined, undefined, eventId.toString());
  };

  const handleViewEvent = (eventId: number) => {
    onNavigate('event-details', undefined, undefined, undefined, eventId.toString());
  };

  // Helper function to check if Club Owner created the event
  const isEventCreatedByClubOwner = (event: Event) => {
    return user?.role === 'Club Owner' && event.createdBy === 'Club Owner';
  };

  const handleCreateEvent = () => {
    if (!newEventForm.title || !newEventForm.description || !newEventForm.date || !newEventForm.time || 
        !newEventForm.venue || !newEventForm.location || !newEventForm.category || !newEventForm.ageGroup || 
        !newEventForm.maxParticipants) {
      alert('Please fill in all required fields.');
      return;
    }

    const fee = parseFloat(newEventForm.registrationFee) || 0;
    const newEvent: Event = {
      id: events.length + 1,
      title: newEventForm.title,
      description: newEventForm.description,
      date: newEventForm.date,
      time: newEventForm.time,
      venue: newEventForm.venue,
      location: newEventForm.location,
      category: newEventForm.category,
      ageGroup: newEventForm.ageGroup,
      maxParticipants: parseInt(newEventForm.maxParticipants),
      currentParticipants: 0,
      image: newEventForm.imageUrl || 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop',
      price: fee === 0 ? 'Free' : `₱${fee}`,
      status: 'Open',
      registered: false,
      registrationFee: fee,
      totalRevenue: 0,
      participants: [],
      createdBy: user?.role || 'Admin'
    };

    setEvents([newEvent, ...events]);
    setNewEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      location: '',
      category: '',
      ageGroup: '',
      maxParticipants: '',
      registrationFee: '',
      imageUrl: '',
    });
    setIsCreateEventOpen(false);
  };

  const handleFormChange = (field: keyof NewEventForm, value: string) => {
    setNewEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Social media sharing functions
  const getEventUrl = (eventId: number) => {
    return `${window.location.origin}/events/${eventId}`;
  };

  const getShareText = (event: Event) => {
    const eventDate = new Date(event.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `🏆 ${event.title}\n\n📅 ${eventDate} at ${event.time}\n📍 ${event.venue}, ${event.location}\n💰 ${event.price}\n\nJoin us for this exciting ${event.category.toLowerCase()} event! Register now at DSRFA.`;
  };

  const shareOnFacebook = (event: Event) => {
    const url = getEventUrl(event.id);
    const text = getShareText(event);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = (event: Event) => {
    const url = getEventUrl(event.id);
    const text = getShareText(event);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=DSRFA,Football,Sports`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = (event: Event) => {
    const url = getEventUrl(event.id);
    const text = `${getShareText(event)}\n\n🔗 ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyEventUrl = async (event: Event) => {
    const url = getEventUrl(event.id);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2000);
    }
  };

  const categories = ['Tournament', 'Training', 'Certification', 'Match', 'Workshop', 'Seminar'];
  const ageGroups = ['Under 14', 'Under 18', 'Adult', 'All Ages'];
  const locations = ['Downtown', 'North District', 'Central', 'East Side', 'South District'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Events & Tournaments</h1>
          <p className="text-gray-600">
            {hasAdminPrivileges(user)
              ? user?.role === 'Club Owner' 
                ? 'Create and manage events while participating in community activities'
                : 'Manage events, participants, and track revenue for DSRFA'
              : 'Discover and register for upcoming football events in your community'
            }
          </p>
        </div>
        
        {/* Admin/Club Owner Create Event Button */}
        {hasAdminPrivileges(user) && (
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new event or tournament.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={newEventForm.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the event..."
                      value={newEventForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      className="rounded-lg min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEventForm.date}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEventForm.time}
                      onChange={(e) => handleFormChange('time', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      placeholder="Stadium name or facility"
                      value={newEventForm.venue}
                      onChange={(e) => handleFormChange('venue', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Select value={newEventForm.location} onValueChange={(value) => handleFormChange('location', value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newEventForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="ageGroup">Age Group *</Label>
                    <Select value={newEventForm.ageGroup} onValueChange={(value) => handleFormChange('ageGroup', value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map(ageGroup => (
                          <SelectItem key={ageGroup} value={ageGroup}>{ageGroup}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="Enter maximum capacity"
                      value={newEventForm.maxParticipants}
                      onChange={(e) => handleFormChange('maxParticipants', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="registrationFee">Registration Fee (₱)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="registrationFee"
                        type="number"
                        placeholder="0.00 (Leave blank for free)"
                        value={newEventForm.registrationFee}
                        onChange={(e) => handleFormChange('registrationFee', e.target.value)}
                        className="pl-10 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Event Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={newEventForm.imageUrl}
                    onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                    className="rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave blank to use default event image
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateEventOpen(false)}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEvent}
                  className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
                >
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-8 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                {ageGroups.map(ageGroup => (
                  <SelectItem key={ageGroup} value={ageGroup}>{ageGroup}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedAgeGroup('all');
                setSelectedLocation('all');
              }}
              className="rounded-lg"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredEvents.length} of {events.length} events
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-lg">
            <div className="relative h-48 cursor-pointer" onClick={() => handleViewEvent(event.id)}>
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <Badge variant="secondary" className="bg-white/90 rounded-lg">
                  {event.category}
                </Badge>
                <Badge 
                  variant={event.status === 'Open' ? 'default' : event.status === 'Full' ? 'destructive' : 'secondary'}
                  className={`rounded-lg ${event.status === 'Open' ? 'bg-green-600' : ''}`}
                >
                  {event.status}
                </Badge>
              </div>
              
              {/* Registration Status Badge for Club Owners */}
              {user?.role === 'Club Owner' && event.registered && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600 rounded-lg">Registered</Badge>
                </div>
              )}
              
              {/* Revenue Badge for Admin/Club Owner */}
              {hasAdminPrivileges(user) && event.totalRevenue !== undefined && !event.registered && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-600 rounded-lg flex items-center">
                    <Banknote className="w-3 h-3 mr-1" />
                    ₱{event.totalRevenue?.toLocaleString()}
                  </Badge>
                </div>
              )}
              
              {/* Share Button */}
              <div className="absolute bottom-3 right-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/90 hover:bg-white rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4 rounded-lg">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Share this event</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            shareOnFacebook(event);
                          }}
                          className="flex items-center justify-center rounded-lg hover:bg-blue-50"
                        >
                          <Facebook className="w-4 h-4 mr-1 text-blue-600" />
                          Facebook
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            shareOnTwitter(event);
                          }}
                          className="flex items-center justify-center rounded-lg hover:bg-blue-50"
                        >
                          <Twitter className="w-4 h-4 mr-1 text-blue-500" />
                          Twitter
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            shareOnWhatsApp(event);
                          }}
                          className="flex items-center justify-center rounded-lg hover:bg-green-50"
                        >
                          <MessageCircle className="w-4 h-4 mr-1 text-green-600" />
                          WhatsApp
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            copyEventUrl(event);
                          }}
                          className="flex items-center justify-center rounded-lg hover:bg-gray-50"
                        >
                          {copiedEventId === event.id ? (
                            <>
                              <Check className="w-4 h-4 mr-1 text-green-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1 text-gray-600" />
                              Copy Link
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}, {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {event.currentParticipants}/{event.maxParticipants} participants
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                    <span className="font-medium text-green-600">{event.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Updated for Club Owner hybrid functionality */}
              <div className="flex space-x-2">
                {/* View Button - Always available */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewEvent(event.id)}
                  className="flex-1 rounded-lg"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>

                {/* Admin/Club Owner Logic */}
                {hasAdminPrivileges(user) ? (
                  user?.role === 'Club Owner' ? (
                    // Club Owner Hybrid Logic
                    isEventCreatedByClubOwner(event) ? (
                      // Events created by this Club Owner - Show Manage button
                      <Button
                        size="sm"
                        onClick={() => handleManageEvent(event.id)}
                        className="flex-1 bg-logo-green hover:bg-green-600 text-white rounded-lg"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    ) : (
                      // Events NOT created by this Club Owner - Show Register button (if not full and not registered)
                      event.status !== 'Full' && !event.registered ? (
                        <Button
                          size="sm"
                          onClick={() => handleRegister(event.id)}
                          className="flex-1 bg-logo-green hover:bg-green-600 text-white rounded-lg"
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Register
                        </Button>
                      ) : event.registered ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled
                          className="flex-1 rounded-lg"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Registered
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled
                          className="flex-1 rounded-lg"
                        >
                          Event Full
                        </Button>
                      )
                    )
                  ) : (
                    // Full Admin - Always show Manage button
                    <Button
                      size="sm"
                      onClick={() => handleManageEvent(event.id)}
                      className="flex-1 bg-logo-green hover:bg-green-600 text-white rounded-lg"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  )
                ) : (
                  // Regular Members - Show Register button logic
                  event.status !== 'Full' && !event.registered ? (
                    <Button
                      size="sm"
                      onClick={() => handleRegister(event.id)}
                      className="flex-1 bg-logo-green hover:bg-green-600 text-white rounded-lg"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  ) : event.registered ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled
                      className="flex-1 rounded-lg"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Registered
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled
                      className="flex-1 rounded-lg"
                    >
                      Event Full
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or check back later for new events.
          </p>
          {hasAdminPrivileges(user) && (
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Event
            </Button>
          )}
        </div>
      )}
    </div>
  );
}