import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Upload,
  Check,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { NavigationPage, User as UserType, hasAdminPrivileges } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventRegistrationPageProps {
  user: UserType | null;
  eventId: string | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string) => void;
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
  registrationFee: number;
  status: 'Open' | 'Full' | 'Closed';
}

interface ClubPlayer {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  jerseyNumber?: number;
  avatar?: string;
  membershipStatus: 'Active' | 'Expired';
}

interface SelectedPlayer {
  playerId: string;
  eventRole: string;
  jerseyNumber?: number;
}

export function EventRegistrationPage({ user, eventId, onNavigate }: EventRegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Determine user role early
  const isClubOwner = user?.role === 'Club Owner';

  // Mock event data
  const event: Event = {
    id: parseInt(eventId || '1'),
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
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
    price: '₱150',
    registrationFee: 150,
    status: 'Open'
  };

  // Get club players based on the Club Owner's club (filtered from registered members)
  const getClubPlayers = (): ClubPlayer[] => {
    if (!isClubOwner || !user?.club) return [];
    
    // Mock data representing registered members from the user's club
    const allRegisteredMembers: ClubPlayer[] = [
      {
        id: '1',
        name: 'Miguel Santos',
        email: 'miguel.santos@email.com',
        phone: '+63 917-555-0111',
        position: 'Forward',
        jerseyNumber: 9,
        membershipStatus: 'Active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '2',
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+63 917-555-0112',
        position: 'Midfielder',
        jerseyNumber: 8,
        membershipStatus: 'Active'
      },
      {
        id: '3',
        name: 'Antonio dela Cruz',
        email: 'antonio.delacruz@email.com',
        phone: '+63 917-555-0113',
        position: 'Defender',
        jerseyNumber: 4,
        membershipStatus: 'Active'
      },
      {
        id: '4',
        name: 'Rafael Gonzalez',
        email: 'rafael.gonzalez@email.com',
        phone: '+63 917-555-0114',
        position: 'Goalkeeper',
        jerseyNumber: 1,
        membershipStatus: 'Active'
      },
      {
        id: '5',
        name: 'Diego Martinez',
        email: 'diego.martinez@email.com',
        phone: '+63 917-555-0115',
        position: 'Midfielder',
        membershipStatus: 'Expired'
      },
      {
        id: '6',
        name: 'Luis Fernando',
        email: 'luis.fernando@email.com',
        phone: '+63 917-555-0116',
        position: 'Defender',
        jerseyNumber: 5,
        membershipStatus: 'Active'
      },
      {
        id: '7',
        name: 'Roberto Silva',
        email: 'roberto.silva@email.com',
        phone: '+63 917-555-0117',
        position: 'Forward',
        jerseyNumber: 11,
        membershipStatus: 'Active'
      }
    ];
    
    // Filter members by the Club Owner's club and membership status
    return allRegisteredMembers.filter(member => 
      member.membershipStatus === 'Active'
      // In real implementation, you would also filter by: member.club === user.club
    );
  };

  const clubPlayers = getClubPlayers();

  const eventRoles = [
    'Player',
    'Team Captain',
    'Vice Captain',
    'Goalkeeper',
    'Reserve Player',
    'Team Manager'
  ];

  const availablePlayers = clubPlayers.filter(player => player.membershipStatus === 'Active');
  const totalSteps = isClubOwner ? 2 : 1; // Reduced from 3:2 to 2:1

  const handlePlayerSelection = (playerId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlayers(prev => [...prev, { playerId, eventRole: 'Player' }]);
    } else {
      setSelectedPlayers(prev => prev.filter(p => p.playerId !== playerId));
    }
  };

  const handleRoleChange = (playerId: string, role: string) => {
    setSelectedPlayers(prev => 
      prev.map(p => p.playerId === playerId ? { ...p, eventRole: role } : p)
    );
  };

  const handleJerseyNumberChange = (playerId: string, jerseyNumber: string) => {
    setSelectedPlayers(prev => 
      prev.map(p => p.playerId === playerId ? { ...p, jerseyNumber: parseInt(jerseyNumber) || undefined } : p)
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const calculateTotalCost = () => {
    const baseCost = event.registrationFee;
    const playerCount = isClubOwner ? selectedPlayers.length + 1 : 1; // +1 for the Club Owner themselves
    return baseCost * playerCount;
  };

  const handleSubmitRegistration = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRegistrationComplete(true);
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (registrationComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-600">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your registration for <strong>{event.title}</strong> has been submitted successfully.
            {isClubOwner && ` You have registered ${selectedPlayers.length + 1} participants.`}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You will receive a confirmation email shortly</li>
              <li>• Your payment will be verified within 24 hours</li>
              <li>• Event details and updates will be sent to your email</li>
              {isClubOwner && <li>• All team members will receive individual confirmations</li>}
            </ul>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onNavigate('events')}
              className="bg-logo-green hover:bg-green-600 text-white"
            >
              Back to Events
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('event-details', undefined, undefined, undefined, eventId || undefined)}
            >
              View Event Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('events')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Event Registration</h1>
            <p className="text-gray-600">
              {isClubOwner ? 'Register your team for this event' : 'Register for this event'}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        {isClubOwner && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { step: 1, label: 'Event Info & Team', icon: Users },
                { step: 2, label: 'Payment', icon: CreditCard }
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step 
                      ? 'bg-logo-green border-logo-green text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-logo-green' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {index < 1 && (
                    <div className={`w-12 h-0.5 ml-4 ${
                      currentStep > step ? 'bg-logo-green' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Event Information + Team Registration */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <Badge variant="secondary" className="mt-2">{event.category}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.venue}, {event.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.currentParticipants}/{event.maxParticipants} participants
                      </div>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="font-medium">{event.price} per participant</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Team Registration Section (Club Owners Only) */}
            {isClubOwner && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Team Registration
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Select players from your club to register for this event
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Club Owner (automatically included) */}
                    <div className="p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback className="bg-logo-green text-white">
                              {user?.name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <Badge className="mt-1 bg-logo-green text-white">Club Owner (Auto-registered)</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <Select defaultValue="Team Manager">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {eventRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Available Players */}
                    <div>
                      <h4 className="font-medium mb-3">Add Club Players</h4>
                      
                      {/* Player Selection Dropdown */}
                      <div className="mb-4">
                        <Label htmlFor="playerSelect">Select Player from Club</Label>
                        <Select onValueChange={(playerId) => handlePlayerSelection(playerId, true)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a player to add..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePlayers
                              .filter(player => !selectedPlayers.some(sp => sp.playerId === player.id))
                              .map(player => (
                                <SelectItem key={player.id} value={player.id}>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{player.name}</span>
                                    <span className="text-sm text-gray-500">({player.position})</span>
                                    {player.jerseyNumber && (
                                      <span className="text-xs text-gray-400">#{player.jerseyNumber}</span>
                                    )}
                                  </div>
                                </SelectItem>
                              ))}
                            {availablePlayers.filter(player => !selectedPlayers.some(sp => sp.playerId === player.id)).length === 0 && (
                              <SelectItem value="no-players-available" disabled>
                                All available players have been selected
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Selected Players List */}
                      {selectedPlayers.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3">Selected Players ({selectedPlayers.length})</h5>
                          <div className="space-y-3">
                            {selectedPlayers.map(selectedPlayer => {
                              const player = availablePlayers.find(p => p.id === selectedPlayer.playerId);
                              if (!player) return null;
                              
                              return (
                                <div key={selectedPlayer.playerId} className="p-4 border rounded-lg border-logo-green bg-green-50">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarImage src={player.avatar} alt={player.name} />
                                        <AvatarFallback className="bg-gray-400 text-white">
                                          {player.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{player.name}</p>
                                        <p className="text-sm text-gray-600">{player.email}</p>
                                        <p className="text-sm text-gray-500">
                                          Position: {player.position}
                                          {player.jerseyNumber && ` • Jersey #${player.jerseyNumber}`}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                      <div>
                                        <Label className="text-xs">Event Role</Label>
                                        <Select 
                                          value={selectedPlayer.eventRole} 
                                          onValueChange={(value) => handleRoleChange(player.id, value)}
                                        >
                                          <SelectTrigger className="w-36">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {eventRoles.map(role => (
                                              <SelectItem key={role} value={role}>{role}</SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-xs">Jersey #</Label>
                                        <Input
                                          type="number"
                                          placeholder="Optional"
                                          className="w-20"
                                          value={selectedPlayer.jerseyNumber || ''}
                                          onChange={(e) => handleJerseyNumberChange(player.id, e.target.value)}
                                        />
                                      </div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePlayerSelection(player.id, false)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedPlayers.length === 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          You are automatically registered as Team Manager. Use the dropdown above to add additional players from your club ({user?.club}) to this event.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation for Step 1 */}
            {isClubOwner ? (
              <div className="flex justify-end">
                <Button 
                  onClick={nextStep}
                  className="bg-logo-green hover:bg-green-600 text-white"
                >
                  Next: Payment
                  <CreditCard className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              // For non-Club Owners, show payment section directly in step 1
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Registration Fee</span>
                            <span>₱{event.registrationFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Number of Participants</span>
                            <span>1</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span className="text-logo-green">₱{event.registrationFee.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Payment Method: GCash</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <div>
                              <h5 className="font-medium text-blue-900">Send payment to:</h5>
                              <p className="text-blue-800">GCash Number: <strong>0917-123-4567</strong></p>
                              <p className="text-blue-800">Account Name: <strong>DSRFA Events</strong></p>
                              <p className="text-sm text-blue-600 mt-2">
                                Amount: <strong>₱{event.registrationFee.toLocaleString()}</strong>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="receipt">Upload GCash Receipt *</Label>
                          <div className="mt-2">
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                              receiptFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                            }`}>
                              <input
                                id="receipt"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                              <label htmlFor="receipt" className="cursor-pointer">
                                {receiptFile ? (
                                  <div className="flex items-center justify-center space-x-2 text-green-600">
                                    <CheckCircle className="w-6 h-6" />
                                    <span className="font-medium">{receiptFile.name}</span>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                    <div>
                                      <span className="font-medium text-gray-700">Click to upload receipt</span>
                                      <p className="text-sm text-gray-500">PNG, JPG, or PDF up to 10MB</p>
                                    </div>
                                  </div>
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Your registration will be confirmed once payment is verified (usually within 24 hours).
                          You will receive email confirmation upon successful verification.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleSubmitRegistration}
                    disabled={!receiptFile || isSubmitting}
                    className="bg-logo-green hover:bg-green-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Payment (Club Owners Only) */}
        {currentStep === 2 && isClubOwner && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Registration Fee (per participant)</span>
                        <span>₱{event.registrationFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of Participants</span>
                        <span>{selectedPlayers.length + 1}</span>
                      </div>
                      <div className="text-sm text-gray-600 ml-4">
                        <div>• {user?.name} (Club Owner)</div>
                        {selectedPlayers.map(sp => {
                          const player = availablePlayers.find(p => p.id === sp.playerId);
                          return (
                            <div key={sp.playerId}>• {player?.name} ({sp.eventRole})</div>
                          );
                        })}
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-logo-green">₱{calculateTotalCost().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Payment Method: GCash</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-900">Send payment to:</h5>
                          <p className="text-blue-800">GCash Number: <strong>0917-123-4567</strong></p>
                          <p className="text-blue-800">Account Name: <strong>DSRFA Events</strong></p>
                          <p className="text-sm text-blue-600 mt-2">
                            Amount: <strong>₱{calculateTotalCost().toLocaleString()}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="receipt">Upload GCash Receipt *</Label>
                      <div className="mt-2">
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          receiptFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <input
                            id="receipt"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label htmlFor="receipt" className="cursor-pointer">
                            {receiptFile ? (
                              <div className="flex items-center justify-center space-x-2 text-green-600">
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-medium">{receiptFile.name}</span>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                <div>
                                  <span className="font-medium text-gray-700">Click to upload receipt</span>
                                  <p className="text-sm text-gray-500">PNG, JPG, or PDF up to 10MB</p>
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your registration will be confirmed once payment is verified (usually within 24 hours).
                      You will receive email confirmation upon successful verification.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleSubmitRegistration}
                disabled={!receiptFile || isSubmitting}
                className="bg-logo-green hover:bg-green-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}