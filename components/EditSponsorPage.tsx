import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Save, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { NavigationPage, User } from '../App';

interface EditSponsorPageProps {
  user: User | null;
  sponsorId: string | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string) => void;
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
}

interface SponsorFormData {
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
}

export function EditSponsorPage({ user, sponsorId, onNavigate }: EditSponsorPageProps) {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState<SponsorFormData>({
    name: '',
    logo: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    tier: 'Bronze',
    description: '',
    isActive: true,
    sponsorshipAmount: 0,
    contractStartDate: '',
    contractEndDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Mock sponsors data (in real app, this would come from API/props)
  const mockSponsors: Sponsor[] = [
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
      updatedAt: '2025-06-18'
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
      updatedAt: '2025-06-18'
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
      updatedAt: '2025-06-18'
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
      updatedAt: '2025-01-01'
    }
  ];

  useEffect(() => {
    // Simulate loading sponsor data
    const loadSponsor = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundSponsor = mockSponsors.find(s => s.id === sponsorId);
      
      if (foundSponsor) {
        setSponsor(foundSponsor);
        setFormData({
          name: foundSponsor.name,
          logo: foundSponsor.logo,
          website: foundSponsor.website,
          contactEmail: foundSponsor.contactEmail,
          contactPhone: foundSponsor.contactPhone,
          address: foundSponsor.address,
          tier: foundSponsor.tier,
          description: foundSponsor.description,
          isActive: foundSponsor.isActive,
          sponsorshipAmount: foundSponsor.sponsorshipAmount,
          contractStartDate: foundSponsor.contractStartDate,
          contractEndDate: foundSponsor.contractEndDate
        });
      }
      
      setLoading(false);
    };

    if (sponsorId) {
      loadSponsor();
    }
  }, [sponsorId]);

  if (!user || user.role !== 'Admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
                <span className="text-gray-600">Loading sponsor details...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!sponsor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Sponsor not found. Please check the sponsor ID and try again.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          onClick={() => onNavigate('sponsors', undefined, undefined, 'sponsors')}
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sponsor Management
        </Button>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Sponsor name is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.sponsorshipAmount <= 0) {
      newErrors.sponsorshipAmount = 'Sponsorship amount must be greater than 0';
    }

    if (!formData.contractStartDate) {
      newErrors.contractStartDate = 'Contract start date is required';
    }

    if (!formData.contractEndDate) {
      newErrors.contractEndDate = 'Contract end date is required';
    }

    if (formData.contractStartDate && formData.contractEndDate) {
      if (new Date(formData.contractStartDate) >= new Date(formData.contractEndDate)) {
        newErrors.contractEndDate = 'Contract end date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to update the sponsor
      console.log('Updating sponsor:', { id: sponsorId, ...formData });
      
      setShowSuccess(true);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        onNavigate('sponsors', undefined, undefined, 'sponsors');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating sponsor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onNavigate('sponsors', undefined, undefined, 'sponsors');
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-8">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Sponsor Updated Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  {formData.name} has been updated in the DSRFA sponsor database.
                </p>
                <Button 
                  onClick={() => onNavigate('sponsors', undefined, undefined, 'sponsors')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  View All Sponsors
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => onNavigate('dashboard')}
                className="cursor-pointer hover:text-primary"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => onNavigate('sponsors', undefined, undefined, 'sponsors')}
                className="cursor-pointer hover:text-primary"
              >
                Sponsor Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Sponsor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="mb-6 text-primary hover:text-primary/80 hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sponsor Management
        </Button>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Sponsor</h1>
          <p className="text-gray-600">
            Update sponsor information and partnership details for {sponsor.name}
          </p>
        </div>
      </div>

      {/* Edit Sponsor Form */}
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Save className="w-5 h-5 mr-2 text-green-600" />
              Sponsor Information
            </CardTitle>
            <CardDescription>
              Update the details for this sponsor partnership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Sponsor Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter sponsor name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="tier">Sponsor Tier *</Label>
                  <Select value={formData.tier} onValueChange={(value) => setFormData({...formData, tier: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Bronze">Bronze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Logo and Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="contact@example.com"
                    className={errors.contactEmail ? 'border-red-500' : ''}
                  />
                  {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="+63 xxx-xxx-xxxx"
                    className={errors.contactPhone ? 'border-red-500' : ''}
                  />
                  {errors.contactPhone && <p className="text-sm text-red-600 mt-1">{errors.contactPhone}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="City, Province"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
              </div>

              {/* Financial Information */}
              <div>
                <Label htmlFor="sponsorshipAmount">Sponsorship Amount (₱) *</Label>
                <Input
                  id="sponsorshipAmount"
                  type="number"
                  value={formData.sponsorshipAmount}
                  onChange={(e) => setFormData({...formData, sponsorshipAmount: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  className={errors.sponsorshipAmount ? 'border-red-500' : ''}
                />
                {errors.sponsorshipAmount && <p className="text-sm text-red-600 mt-1">{errors.sponsorshipAmount}</p>}
              </div>

              {/* Contract Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contractStartDate">Contract Start Date *</Label>
                  <Input
                    id="contractStartDate"
                    type="date"
                    value={formData.contractStartDate}
                    onChange={(e) => setFormData({...formData, contractStartDate: e.target.value})}
                    className={errors.contractStartDate ? 'border-red-500' : ''}
                  />
                  {errors.contractStartDate && <p className="text-sm text-red-600 mt-1">{errors.contractStartDate}</p>}
                </div>
                <div>
                  <Label htmlFor="contractEndDate">Contract End Date *</Label>
                  <Input
                    id="contractEndDate"
                    type="date"
                    value={formData.contractEndDate}
                    onChange={(e) => setFormData({...formData, contractEndDate: e.target.value})}
                    className={errors.contractEndDate ? 'border-red-500' : ''}
                  />
                  {errors.contractEndDate && <p className="text-sm text-red-600 mt-1">{errors.contractEndDate}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the sponsor..."
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              {/* Sponsor Status - Enhanced Radio Group */}
              <div>
                <Label className="text-base font-medium mb-3 block">Sponsor Status *</Label>
                <RadioGroup
                  value={formData.isActive ? "active" : "inactive"}
                  onValueChange={(value) => setFormData({...formData, isActive: value === "active"})}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Active Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label 
                      htmlFor="active" 
                      className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 flex-1"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <Eye className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Active Sponsor</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Sponsor is currently active and visible in the system
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Inactive Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="inactive" />
                    <Label 
                      htmlFor="inactive" 
                      className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex-1"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Inactive Sponsor</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Sponsor is inactive and hidden from public display
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Updating Sponsor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}