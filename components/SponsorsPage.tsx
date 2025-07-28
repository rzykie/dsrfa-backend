import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Plus, 
  Edit3, 
  Archive, 
  Eye, 
  EyeOff, 
  Star, 
  Award, 
  Trophy, 
  Shield,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { NavigationPage, User, isFullAdmin } from '../App';

interface SponsorsPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string) => void;
  defaultTab?: string | null;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  tier: 'Premium' | 'Gold' | 'Silver' | 'Bronze';
  description: string;
  isActive: boolean;
  sponsorshipAmount: number;
  contractStartDate: string;
  contractEndDate: string;
  benefits: string[];
  createdAt: string;
  updatedAt: string;
  isArchived?: boolean;
}

export function SponsorsPage({ user, onNavigate, defaultTab }: SponsorsPageProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      id: '1',
      name: 'SportTech Philippines',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
      website: 'https://sporttech.ph',
      contactEmail: 'partnership@sporttech.ph',
      contactPhone: '+63 916-555-0123',
      address: 'Makati City, Metro Manila',
      tier: 'Premium',
      description: 'Leading sports technology company providing innovative solutions for athletes and teams.',
      isActive: true,
      sponsorshipAmount: 500000,
      contractStartDate: '2025-01-01',
      contractEndDate: '2025-12-31',
      benefits: ['Logo placement on jerseys', 'Stadium naming rights', 'VIP hospitality packages', 'Digital marketing integration'],
      createdAt: '2025-01-15',
      updatedAt: '2025-06-18',
      isArchived: false
    },
    {
      id: '2',
      name: 'Davao Sports Equipment',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=100&fit=crop',
      website: 'https://davaosports.com',
      contactEmail: 'info@davaosports.com',
      contactPhone: '+63 82-555-0456',
      address: 'Davao City, Davao del Sur',
      tier: 'Gold',
      description: 'Premier sports equipment supplier in Mindanao, supporting local football development.',
      isActive: true,
      sponsorshipAmount: 250000,
      contractStartDate: '2025-01-01',
      contractEndDate: '2025-12-31',
      benefits: ['Equipment sponsorship', 'Training gear provision', 'Tournament support', 'Youth development programs'],
      createdAt: '2025-01-20',
      updatedAt: '2025-06-18',
      isArchived: false
    },
    {
      id: '3',
      name: 'Mindanao Bank',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop',
      website: 'https://mindanaobank.com',
      contactEmail: 'community@mindanaobank.com',
      contactPhone: '+63 82-555-0789',
      address: 'Davao City, Davao del Sur',
      tier: 'Silver',
      description: 'Community-focused financial institution supporting sports and youth development in Mindanao.',
      isActive: true,
      sponsorshipAmount: 100000,
      contractStartDate: '2025-01-01',
      contractEndDate: '2025-12-31',
      benefits: ['Financial literacy programs', 'Scholarship support', 'Event sponsorship', 'Digital banking services'],
      createdAt: '2025-02-01',
      updatedAt: '2025-06-18',
      isArchived: false
    },
    {
      id: '4',
      name: 'Local Foods Corporation',
      logo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=100&fit=crop',
      website: 'https://localfoods.ph',
      contactEmail: 'sponsorship@localfoods.ph',
      contactPhone: '+63 82-555-0321',
      address: 'Davao City, Davao del Sur',
      tier: 'Bronze',
      description: 'Davao-based food company promoting healthy nutrition for athletes and families.',
      isActive: false,
      sponsorshipAmount: 50000,
      contractStartDate: '2024-01-01',
      contractEndDate: '2024-12-31',
      benefits: ['Nutrition support', 'Event catering', 'Healthy eating seminars', 'Product sampling'],
      createdAt: '2024-01-10',
      updatedAt: '2025-01-01',
      isArchived: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Set default tab when provided
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Access control - only full admins can access this page
  if (!isFullAdmin(user)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600 mb-4">You don't have permission to access the Sponsor Management page.</p>
          <Button onClick={() => onNavigate('dashboard')} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Premium': return <Star className="w-4 h-4" />;
      case 'Gold': return <Award className="w-4 h-4" />;
      case 'Silver': return <Trophy className="w-4 h-4" />;
      case 'Bronze': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Premium': return 'bg-purple-600 text-white';
      case 'Gold': return 'bg-yellow-500 text-white';
      case 'Silver': return 'bg-gray-400 text-white';
      case 'Bronze': return 'bg-orange-600 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  const filteredSponsors = sponsors.filter(sponsor => {
    // Only show non-archived sponsors
    if (sponsor.isArchived) return false;
    
    const matchesSearch = sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sponsor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || sponsor.tier === filterTier;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && sponsor.isActive) ||
                         (filterStatus === 'inactive' && !sponsor.isActive);
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const sponsorStats = {
    total: sponsors.filter(s => !s.isArchived).length,
    active: sponsors.filter(s => s.isActive && !s.isArchived).length,
    inactive: sponsors.filter(s => !s.isActive && !s.isArchived).length,
    totalValue: sponsors.filter(s => !s.isArchived).reduce((sum, s) => sum + s.sponsorshipAmount, 0),
    tiers: {
      Premium: sponsors.filter(s => s.tier === 'Premium' && !s.isArchived).length,
      Gold: sponsors.filter(s => s.tier === 'Gold' && !s.isArchived).length,
      Silver: sponsors.filter(s => s.tier === 'Silver' && !s.isArchived).length,
      Bronze: sponsors.filter(s => s.tier === 'Bronze' && !s.isArchived).length,
    }
  };

  const handleArchiveSponsor = (sponsorId: string) => {
    setSponsors(sponsors.map(sponsor => 
      sponsor.id === sponsorId 
        ? { ...sponsor, isArchived: true, isActive: false, updatedAt: new Date().toISOString() }
        : sponsor
    ));
  };

  const toggleSponsorStatus = (sponsorId: string) => {
    setSponsors(sponsors.map(sponsor => 
      sponsor.id === sponsorId 
        ? { ...sponsor, isActive: !sponsor.isActive, updatedAt: new Date().toISOString() }
        : sponsor
    ));
  };

  const handleEditSponsor = (sponsorId: string) => {
    onNavigate('edit-sponsor', undefined, sponsorId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sponsor Management</h1>
        <p className="text-gray-600">
          Manage sponsors, partnerships, and sponsorship tiers for DSRFA
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1.5 h-auto">
          <TabsTrigger 
            value="overview" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sponsors" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Users className="w-4 h-4" />
            <span>Sponsor Management</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sponsorStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {sponsorStats.active} active, {sponsorStats.inactive} inactive
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(sponsorStats.totalValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Annual sponsorship value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium Tier</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sponsorStats.tiers.Premium}</div>
                <p className="text-xs text-muted-foreground">
                  Premium sponsors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sponsorStats.total > 0 ? Math.round((sponsorStats.active / sponsorStats.total) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Sponsors currently active
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sponsorship by Tier</CardTitle>
                <CardDescription>Distribution of sponsors across different tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(sponsorStats.tiers).map(([tier, count]) => (
                    <div key={tier} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTierIcon(tier)}
                        <span>{tier}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getTierColor(tier).replace('text-white', '')}`}
                            style={{ width: `${sponsorStats.total > 0 ? (count / sponsorStats.total) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Sponsorship revenue by tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(sponsorStats.tiers).map(([tier, count]) => {
                    const tierSponsors = sponsors.filter(s => s.tier === tier && !s.isArchived);
                    const tierRevenue = tierSponsors.reduce((sum, s) => sum + s.sponsorshipAmount, 0);
                    const percentage = sponsorStats.totalValue > 0 ? (tierRevenue / sponsorStats.totalValue) * 100 : 0;
                    
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getTierIcon(tier)}
                          <span>{tier}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(tierRevenue)}</p>
                          <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sponsors and Contract Renewals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sponsors</CardTitle>
                <CardDescription>Latest sponsor partnerships and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sponsors.filter(s => !s.isArchived).slice(0, 3).map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center space-x-4">
                      <div className="w-12 h-8 relative rounded overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{sponsor.name}</p>
                        <p className="text-xs text-gray-500">{sponsor.tier} • {formatCurrency(sponsor.sponsorshipAmount)}</p>
                      </div>
                      <Badge className={getTierColor(sponsor.tier)}>
                        {getTierIcon(sponsor.tier)}
                        <span className="ml-1">{sponsor.tier}</span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Renewals</CardTitle>
                <CardDescription>Upcoming contract renewals and expirations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sponsors.filter(s => {
                    if (s.isArchived) return false;
                    const endDate = new Date(s.contractEndDate);
                    const now = new Date();
                    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
                    return endDate <= threeMonthsFromNow;
                  }).slice(0, 3).map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 relative rounded overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{sponsor.name}</p>
                          <p className="text-xs text-gray-600">{sponsor.tier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">
                          {new Date(sponsor.contractEndDate).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          Due
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {sponsors.filter(s => {
                    if (s.isArchived) return false;
                    const endDate = new Date(s.contractEndDate);
                    const now = new Date();
                    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
                    return endDate <= threeMonthsFromNow;
                  }).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No contracts expiring in the next 3 months
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sponsors" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Search sponsors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select value={filterTier} onValueChange={setFilterTier}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={() => onNavigate('add-sponsor')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSponsors.map((sponsor) => (
              <Card key={sponsor.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 relative rounded overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getTierColor(sponsor.tier)}>
                            {getTierIcon(sponsor.tier)}
                            <span className="ml-1">{sponsor.tier}</span>
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSponsorStatus(sponsor.id)}
                            className="h-6 px-2"
                          >
                            {sponsor.isActive ? (
                              <Eye className="w-3 h-3 text-green-600" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSponsor(sponsor.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleArchiveSponsor(sponsor.id)}
                        className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        title="Archive sponsor"
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{sponsor.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={sponsor.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {sponsor.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{sponsor.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{sponsor.contactPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{sponsor.address}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Sponsorship Value</p>
                      <p className="font-semibold text-green-600">{formatCurrency(sponsor.sponsorshipAmount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Contract Period</p>
                      <p className="text-xs">
                        {new Date(sponsor.contractStartDate).toLocaleDateString()} - {new Date(sponsor.contractEndDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Benefits</p>
                    <div className="flex flex-wrap gap-1">
                      {sponsor.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                      {sponsor.benefits.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{sponsor.benefits.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSponsors.length === 0 && (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-gray-500">No sponsors found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}