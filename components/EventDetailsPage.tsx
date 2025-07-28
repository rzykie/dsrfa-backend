import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Share2,
  Play,
  Download,
  Upload,
  Image as ImageIcon,
  Video,
  Trophy,
  Timer,
  UserCheck,
  Building,
  Eye,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Zap,
  Target,
  AlertCircle,
  Edit3,
  Plus,
  Save
} from 'lucide-react';
import { NavigationPage, User as AppUser, hasAdminPrivileges } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailsPageProps {
  user: AppUser | null;
  eventId: string | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string) => void;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'Live' | 'Upcoming' | 'Completed' | 'Postponed';
  startTime: string;
  venue: string;
  minute?: number;
  events: MatchEvent[];
}

interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty';
  player: string;
  team: 'home' | 'away';
  description: string;
}

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  uploadedBy: string;
  uploadDate: string;
  likes: number;
  comments: number;
  description?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  image: string;
  category: 'Tournament' | 'Training' | 'Workshop' | 'Match' | 'Certification' | 'Seminar';
  registrationFee: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'Open' | 'Full' | 'Closed' | 'Live' | 'Completed';
  organizer: string;
  contact: string;
  matches?: Match[];
  media?: MediaItem[];
  registered?: boolean;
}

export function EventDetailsPage({ user, eventId, onNavigate }: EventDetailsPageProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [liveUpdateInterval, setLiveUpdateInterval] = useState<NodeJS.Timeout | null>(null);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [scoreForm, setScoreForm] = useState({
    homeScore: 0,
    awayScore: 0,
    status: 'Upcoming' as Match['status'],
    minute: 0
  });
  const [matches, setMatches] = useState<Match[]>([]);

  // Mock event data - this would typically come from an API
  const eventsData: Record<string, Event> = {
    '1': {
      id: '1',
      title: 'DSRFA Regional Championship 2025',
      date: '2025-07-15',
      time: '08:00 AM',
      location: 'Davao City',
      venue: 'Davao City Sports Complex',
      description: 'Annual regional championship featuring teams from across Southern Mindanao. Open to all registered clubs.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      category: 'Tournament',
      registrationFee: 2500,
      maxParticipants: 200,
      currentParticipants: 156,
      status: 'Live',
      organizer: 'DSRFA Tournament Committee',
      contact: 'tournaments@dsrfa.org',
      registered: false,
      matches: [
        {
          id: 'm1',
          homeTeam: 'Davao Eagles FC',
          awayTeam: 'Tagum Warriors',
          homeScore: 2,
          awayScore: 1,
          status: 'Live',
          startTime: '14:00',
          venue: 'Field A',
          minute: 67,
          events: [
            { id: 'e1', minute: 15, type: 'goal', player: 'Juan Santos', team: 'home', description: 'Header from corner kick' },
            { id: 'e2', minute: 23, type: 'yellow_card', player: 'Roberto Cruz', team: 'away', description: 'Rough tackle' },
            { id: 'e3', minute: 45, type: 'goal', player: 'Miguel Torres', team: 'away', description: 'Free kick goal' },
            { id: 'e4', minute: 58, type: 'goal', player: 'Carlos Mendez', team: 'home', description: 'Counter attack finish' }
          ]
        },
        {
          id: 'm2',
          homeTeam: 'GenSan United',
          awayTeam: 'Butuan City FC',
          homeScore: 0,
          awayScore: 0,
          status: 'Upcoming',
          startTime: '16:00',
          venue: 'Field B',
          events: []
        },
        {
          id: 'm3',
          homeTeam: 'Cagayan de Oro FC',
          awayTeam: 'Surigao Stallions',
          homeScore: 3,
          awayScore: 2,
          status: 'Completed',
          startTime: '10:00',
          venue: 'Field A',
          events: [
            { id: 'e5', minute: 12, type: 'goal', player: 'Mark Lopez', team: 'home', description: 'Penalty kick' },
            { id: 'e6', minute: 28, type: 'goal', player: 'James Rivera', team: 'away', description: 'Long range shot' },
            { id: 'e7', minute: 34, type: 'goal', player: 'Alex Garcia', team: 'home', description: 'Close range finish' },
            { id: 'e8', minute: 67, type: 'goal', player: 'Jose Fernandez', team: 'away', description: 'Header' },
            { id: 'e9', minute: 89, type: 'goal', player: 'David Reyes', team: 'home', description: 'Last minute winner' }
          ]
        }
      ],
      media: [
        {
          id: 'media1',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=200&fit=crop',
          title: 'Tournament Opening Ceremony',
          uploadedBy: 'DSRFA Admin',
          uploadDate: '2025-07-15',
          likes: 24,
          comments: 8,
          description: 'Grand opening ceremony with all participating teams'
        },
        {
          id: 'media2',
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/360/BigBuckBunny_360_10s_1MB.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop',
          title: 'Best Goals Compilation',
          uploadedBy: 'DSRFA Media Team',
          uploadDate: '2025-07-15',
          likes: 45,
          comments: 12,
          description: 'Top 5 goals from today\'s matches'
        },
        {
          id: 'media3',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
          title: 'Young Players in Action',
          uploadedBy: 'Tournament Photographer',
          uploadDate: '2025-07-15',
          likes: 18,
          comments: 5,
          description: 'Youth teams showcasing their skills'
        },
        {
          id: 'media4',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=200&fit=crop',
          title: 'Champions Celebration',
          uploadedBy: 'Event Coordinator',
          uploadDate: '2025-07-15',
          likes: 67,
          comments: 23,
          description: 'Victory celebration after the final match'
        },
        {
          id: 'media5',
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/360/BigBuckBunny_360_10s_1MB.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=300&h=200&fit=crop',
          title: 'Match Highlights',
          uploadedBy: 'Sports Broadcaster',
          uploadDate: '2025-07-15',
          likes: 89,
          comments: 34,
          description: 'Extended highlights from the semi-final matches'
        },
        {
          id: 'media6',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
          title: 'Coach Strategy Session',
          uploadedBy: 'Team Reporter',
          uploadDate: '2025-07-15',
          likes: 12,
          comments: 3,
          description: 'Coaches discussing tactics during halftime'
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Youth Development Workshop',
      date: '2025-06-25',
      time: '02:00 PM',
      location: 'DSRFA Training Facility',
      venue: 'Training Ground A',
      description: 'Skills development workshop for young players aged 12-18. Focus on ball control, passing, and tactical awareness.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
      category: 'Workshop',
      registrationFee: 500,
      maxParticipants: 50,
      currentParticipants: 32,
      status: 'Open',
      organizer: 'DSRFA Youth Development',
      contact: 'youth@dsrfa.org',
      registered: false,
      media: [
        {
          id: 'media7',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
          title: 'Skills Training Session',
          uploadedBy: 'Workshop Instructor',
          uploadDate: '2025-06-25',
          likes: 15,
          comments: 4,
          description: 'Young players practicing ball control drills'
        }
      ]
    }
  };

  const event = eventId ? eventsData[eventId] : null;

  // Initialize matches state when event changes
  useEffect(() => {
    if (event?.matches) {
      setMatches(event.matches);
    }
  }, [event]);

  // Set up live updates for live events
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (event?.status === 'Live') {
      interval = setInterval(() => {
        // In a real app, this would fetch updated scores from an API
        console.log('Updating live scores...');
      }, 30000); // Update every 30 seconds

      setLiveUpdateInterval(interval);
    } else {
      if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
        setLiveUpdateInterval(null);
      }
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [event?.status, eventId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
        setLiveUpdateInterval(null);
      }
    };
  }, []);

  if (!event) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Event not found</h3>
          <p className="text-gray-600 mb-4">The requested event could not be found.</p>
          <Button onClick={() => onNavigate('events')} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'Live': { className: 'bg-red-600 text-white animate-pulse', icon: <Zap className="w-3 h-3 mr-1" /> },
      'Open': { className: 'bg-green-600 text-white', icon: <UserCheck className="w-3 h-3 mr-1" /> },
      'Completed': { className: 'bg-gray-600 text-white', icon: <Trophy className="w-3 h-3 mr-1" /> },
      'Full': { className: 'bg-orange-600 text-white', icon: <Users className="w-3 h-3 mr-1" /> },
      'Closed': { className: 'bg-gray-400 text-white', icon: <Clock className="w-3 h-3 mr-1" /> }
    };

    const variant = variants[status as keyof typeof variants] || variants.Open;
    return (
      <Badge className={`rounded-lg ${variant.className}`}>
        {variant.icon}
        {status}
      </Badge>
    );
  };

  const getMatchStatusBadge = (status: string) => {
    const variants = {
      'Live': { className: 'bg-red-600 text-white animate-pulse', icon: <Zap className="w-3 h-3 mr-1" /> },
      'Upcoming': { className: 'bg-blue-600 text-white', icon: <Clock className="w-3 h-3 mr-1" /> },
      'Completed': { className: 'bg-gray-600 text-white', icon: <Trophy className="w-3 h-3 mr-1" /> },
      'Postponed': { className: 'bg-yellow-600 text-white', icon: <Timer className="w-3 h-3 mr-1" /> }
    };

    const variant = variants[status as keyof typeof variants] || variants.Upcoming;
    return (
      <Badge className={`rounded-lg ${variant.className}`}>
        {variant.icon}
        {status}
      </Badge>
    );
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow_card': return '🟨';
      case 'red_card': return '🟥';
      case 'substitution': return '🔄';
      case 'penalty': return '🥅';
      default: return '⚽';
    }
  };

  const handleRegister = () => {
    onNavigate('event-registration', undefined, undefined, undefined, eventId!);
  };

  const handleManage = () => {
    onNavigate('event-management', undefined, undefined, undefined, eventId!);
  };

  const handleMediaUpload = () => {
    // Mock media upload
    alert('Media upload functionality would be implemented here');
  };

  const handleEditScore = (match: Match) => {
    setSelectedMatch(match);
    setScoreForm({
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      status: match.status,
      minute: match.minute || 0
    });
    setIsScoreDialogOpen(true);
  };

  const handleSaveScore = () => {
    if (!selectedMatch) return;

    // Update the specific match in the matches array
    const updatedMatches = matches.map(match => 
      match.id === selectedMatch.id 
        ? {
            ...match,
            homeScore: scoreForm.homeScore,
            awayScore: scoreForm.awayScore,
            status: scoreForm.status,
            minute: scoreForm.status === 'Live' ? scoreForm.minute : undefined
          }
        : match
    );

    setMatches(updatedMatches);
    setIsScoreDialogOpen(false);
    setSelectedMatch(null);
    
    // In a real app, this would save to a backend
    alert('Score updated successfully!');
  };

  const handleAddMatch = () => {
    const newMatch: Match = {
      id: `m${matches.length + 1}`,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      startTime: '00:00',
      venue: 'Field A',
      events: []
    };

    setSelectedMatch(newMatch);
    setScoreForm({
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      minute: 0
    });
    setIsScoreDialogOpen(true);
  };

  const handleSaveNewMatch = () => {
    if (!selectedMatch) return;

    const newMatch: Match = {
      ...selectedMatch,
      homeScore: scoreForm.homeScore,
      awayScore: scoreForm.awayScore,
      status: scoreForm.status,
      minute: scoreForm.status === 'Live' ? scoreForm.minute : undefined
    };

    setMatches([...matches, newMatch]);
    setIsScoreDialogOpen(false);
    setSelectedMatch(null);
    
    alert('New match added successfully!');
  };

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
                Events & Tournament
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Event Details</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{event.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
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
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              {getStatusBadge(event.status)}
            </div>
            <p className="text-gray-600">
              {event.status === 'Live' ? 'Event is currently live with ongoing matches' : 
               event.status === 'Completed' ? 'Event has been completed' :
               'View event details, live scores, and media'}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          {hasAdminPrivileges(user) && (
            <>
              <Button 
                variant="outline"
                onClick={handleMediaUpload}
                className="rounded-lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
              <Button 
                onClick={handleManage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Manage Event
              </Button>
            </>
          )}
          
          {!hasAdminPrivileges(user) && event.status === 'Open' && !event.registered && (
            <Button 
              onClick={handleRegister}
              className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Register Now
            </Button>
          )}
        </div>
      </div>

      {/* Event Information - Full Width */}
      <div className="mb-8">
        <Card className="rounded-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Image */}
              <div className="lg:col-span-1">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800 rounded-lg">
                      {event.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <span>₱{event.registrationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Scores Section */}
      {((matches && matches.length > 0) || hasAdminPrivileges(user)) && (
        <div className="mb-8">
          <Card className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Live Scores & Matches</span>
                  {matches.some(m => m.status === 'Live') && (
                    <Badge className="bg-red-600 text-white animate-pulse rounded-lg">
                      <Zap className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                  )}
                </CardTitle>
                {hasAdminPrivileges(user) && (
                  <Button 
                    onClick={handleAddMatch}
                    className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Match
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No matches scheduled yet.</p>
                  {hasAdminPrivileges(user) && (
                    <p className="text-sm mt-1">Click &quot;Add Match&quot; to create the first match.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map((match) => (
                  <Card key={match.id} className="rounded-lg border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getMatchStatusBadge(match.status)}
                          <span className="text-sm text-gray-600">{match.venue} • {match.startTime}</span>
                          {match.status === 'Live' && match.minute && (
                            <Badge variant="outline" className="rounded-lg">
                              {match.minute}'
                            </Badge>
                          )}
                        </div>
                        {hasAdminPrivileges(user) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditScore(match)}
                            className="rounded-lg"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit Score
                          </Button>
                        )}
                      </div>

                      {/* Match Score */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="text-right flex-1">
                            <h4 className="font-medium">{match.homeTeam}</h4>
                          </div>
                          <div className="flex items-center space-x-3 text-center">
                            <span className="text-2xl font-bold">{match.homeScore}</span>
                            <span className="text-gray-400">-</span>
                            <span className="text-2xl font-bold">{match.awayScore}</span>
                          </div>
                          <div className="text-left flex-1">
                            <h4 className="font-medium">{match.awayTeam}</h4>
                          </div>
                        </div>
                      </div>

                      {/* Match Events */}
                      {match.events.length > 0 && (
                        <div className="border-t pt-4">
                          <h5 className="font-medium text-gray-900 mb-3">Match Events</h5>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {match.events.slice().reverse().map((event) => (
                              <div key={event.id} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{event.minute}'</span>
                                  <span>{getEventIcon(event.type)}</span>
                                  <span>{event.player}</span>
                                  <span className="text-gray-500">({event.description})</span>
                                </div>
                                <Badge variant="outline" className="text-xs rounded">
                                  {event.team === 'home' ? match.homeTeam : match.awayTeam}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Gallery */}
      {event.media && event.media.length > 0 && (
        <div className="mb-8">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Photos & Videos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.media.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow">
                          <div className="aspect-video relative">
                            <ImageWithFallback
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            {item.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="bg-white/90 rounded-full p-3">
                                  <Play className="w-6 h-6 text-gray-800" />
                                </div>
                              </div>
                            )}
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-white/90 text-gray-800 rounded-lg">
                                {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">by {item.uploadedBy}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                              <div className="flex items-center space-x-3">
                                <span className="flex items-center">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {item.likes}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  {item.comments}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                        <div className="relative">
                          {item.type === 'video' ? (
                            <video 
                              src={item.url} 
                              controls 
                              className="w-full h-auto max-h-[70vh] rounded-lg"
                              autoPlay
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <ImageWithFallback
                              src={item.url}
                              alt={item.title}
                              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                            />
                          )}
                          
                          <div className="p-6">
                            <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                            {item.description && (
                              <p className="text-gray-600 mb-4">{item.description}</p>
                            )}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Uploaded by {item.uploadedBy} on {new Date(item.uploadDate).toLocaleDateString()}</span>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Heart className="w-4 h-4 mr-1" />
                                  {item.likes} likes
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {item.comments} comments
                                </span>
                                <Button size="sm" variant="outline" className="rounded-lg">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No media message */}
      {(!event.media || event.media.length === 0) && (
        <div className="mb-8">
          <Card className="rounded-lg">
            <CardContent className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media available</h3>
              <p className="text-gray-600 mb-4">
                Media content will be available during and after the event.
              </p>
              {hasAdminPrivileges(user) && (
                <Button onClick={handleMediaUpload} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload First Media
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Score Management Dialog */}
      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedMatch && matches.includes(selectedMatch) ? 'Edit Match Score' : 'Add New Match'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Team Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="homeTeam">Home Team</Label>
                <Input
                  id="homeTeam"
                  value={selectedMatch?.homeTeam || ''}
                  onChange={(e) => setSelectedMatch(prev => prev ? {...prev, homeTeam: e.target.value} : null)}
                  className="rounded-lg"
                  placeholder="Home Team Name"
                />
              </div>
              <div>
                <Label htmlFor="awayTeam">Away Team</Label>
                <Input
                  id="awayTeam"
                  value={selectedMatch?.awayTeam || ''}
                  onChange={(e) => setSelectedMatch(prev => prev ? {...prev, awayTeam: e.target.value} : null)}
                  className="rounded-lg"
                  placeholder="Away Team Name"
                />
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="homeScore">Home Score</Label>
                <Input
                  id="homeScore"
                  type="number"
                  min="0"
                  value={scoreForm.homeScore}
                  onChange={(e) => setScoreForm(prev => ({...prev, homeScore: parseInt(e.target.value) || 0}))}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="awayScore">Away Score</Label>
                <Input
                  id="awayScore"
                  type="number"
                  min="0"
                  value={scoreForm.awayScore}
                  onChange={(e) => setScoreForm(prev => ({...prev, awayScore: parseInt(e.target.value) || 0}))}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  value={selectedMatch?.venue || ''}
                  onChange={(e) => setSelectedMatch(prev => prev ? {...prev, venue: e.target.value} : null)}
                  className="rounded-lg"
                  placeholder="Field A"
                />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  value={selectedMatch?.startTime || ''}
                  onChange={(e) => setSelectedMatch(prev => prev ? {...prev, startTime: e.target.value} : null)}
                  className="rounded-lg"
                  placeholder="14:00"
                />
              </div>
            </div>

            {/* Match Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Match Status</Label>
                <Select 
                  value={scoreForm.status} 
                  onValueChange={(value) => setScoreForm(prev => ({...prev, status: value as Match['status']}))}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Postponed">Postponed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {scoreForm.status === 'Live' && (
                <div>
                  <Label htmlFor="minute">Current Minute</Label>
                  <Input
                    id="minute"
                    type="number"
                    min="0"
                    max="120"
                    value={scoreForm.minute}
                    onChange={(e) => setScoreForm(prev => ({...prev, minute: parseInt(e.target.value) || 0}))}
                    className="rounded-lg"
                    placeholder="90"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsScoreDialogOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button 
              onClick={selectedMatch && matches.includes(selectedMatch) ? handleSaveScore : handleSaveNewMatch}
              className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
              disabled={!selectedMatch?.homeTeam || !selectedMatch?.awayTeam}
            >
              <Save className="w-4 h-4 mr-2" />
              {selectedMatch && matches.includes(selectedMatch) ? 'Update Score' : 'Add Match'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}