import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Upload, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../App';

interface RegisterPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Step 2: Uploads
    birthCertificate: null as File | null,
    validId: null as File | null,
    
    // Step 3: Football Profile
    club: '',
    position: '',
    role: '',
    experience: '',
    previousClubs: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        break;
      case 2:
        if (!formData.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required';
        if (!formData.validId) newErrors.validId = 'Valid ID is required';
        break;
      case 3:
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.position && formData.role === 'Player') newErrors.position = 'Position is required for players';
        if (!formData.club) newErrors.club = 'Club/Team selection is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      alert('Registration successful! You can now log in with your credentials.');
      onNavigate('login');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertDescription>
                Please upload clear, readable copies of your documents. Accepted formats: PDF, JPG, PNG (Max 5MB each)
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Birth Certificate</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('birthCertificate', e.target.files?.[0] || null)}
                    className="hidden"
                    id="birthCertificate"
                  />
                  <label htmlFor="birthCertificate" className="cursor-pointer">
                    {formData.birthCertificate ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.birthCertificate.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Click to upload birth certificate</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.birthCertificate && <p className="text-sm text-red-600">{errors.birthCertificate}</p>}
              </div>

              <div className="space-y-2">
                <Label>Valid ID</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('validId', e.target.files?.[0] || null)}
                    className="hidden"
                    id="validId"
                  />
                  <label htmlFor="validId" className="cursor-pointer">
                    {formData.validId ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.validId.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Click to upload valid ID (Passport, License, etc.)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.validId && <p className="text-sm text-red-600">{errors.validId}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Player">Player</SelectItem>
                  <SelectItem value="Coach">Coach</SelectItem>
                  <SelectItem value="Referee">Referee</SelectItem>
                  <SelectItem value="Volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
            </div>

            {formData.role === 'Player' && (
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="club">Current Club/Team</Label>
              <Select value={formData.club} onValueChange={(value) => handleInputChange('club', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current club/team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Davao FC">Davao FC</SelectItem>
                  <SelectItem value="Mindanao United">Mindanao United</SelectItem>
                  <SelectItem value="Eagles Football Club">Eagles Football Club</SelectItem>
                  <SelectItem value="South Region FC">South Region FC</SelectItem>
                  <SelectItem value="Tagum City Football Club">Tagum City Football Club</SelectItem>
                  <SelectItem value="Digos Warriors FC">Digos Warriors FC</SelectItem>
                  <SelectItem value="Panabo Football Academy">Panabo Football Academy</SelectItem>
                  <SelectItem value="Mati Football Club">Mati Football Club</SelectItem>
                  <SelectItem value="Island Garden City FC">Island Garden City FC</SelectItem>
                  <SelectItem value="Kidapawan Football Club">Kidapawan Football Club</SelectItem>
                  <SelectItem value="Bansalan United FC">Bansalan United FC</SelectItem>
                  <SelectItem value="Malita Football Club">Malita Football Club</SelectItem>
                  <SelectItem value="General Santos FC">General Santos FC</SelectItem>
                  <SelectItem value="Koronadal City FC">Koronadal City FC</SelectItem>
                  <SelectItem value="Cotabato Football Club">Cotabato Football Club</SelectItem>
                  <SelectItem value="Independent Player">Independent Player (No Club)</SelectItem>
                </SelectContent>
              </Select>
              {errors.club && <p className="text-sm text-red-600">{errors.club}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="Intermediate">Intermediate (3-5 years)</SelectItem>
                  <SelectItem value="Advanced">Advanced (6-10 years)</SelectItem>
                  <SelectItem value="Professional">Professional (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousClubs">Previous Clubs/Teams (Optional)</Label>
              <Textarea
                id="previousClubs"
                value={formData.previousClubs}
                onChange={(e) => handleInputChange('previousClubs', e.target.value)}
                placeholder="List any previous clubs or teams you've been part of"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Information',
    'Document Upload',
    'Football Profile'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">FC</span>
            </div>
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
            <CardDescription>
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-center space-x-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <Badge
                  key={i}
                  variant={i + 1 === currentStep ? 'default' : i + 1 < currentStep ? 'secondary' : 'outline'}
                  className={i + 1 === currentStep ? 'bg-green-600' : ''}
                >
                  {i + 1}
                </Badge>
              ))}
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-medium"
              onClick={() => onNavigate('login')}
            >
              Sign in here
            </button>
          </p>
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800 mt-2"
            onClick={() => onNavigate('landing')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}