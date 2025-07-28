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
import { Upload, CheckCircle, ArrowLeft, ArrowRight, Building, Info } from 'lucide-react';
import { NavigationPage } from '../App';

interface ClubRegistrationPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function ClubRegistrationPage({ onNavigate }: ClubRegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Club Details
    clubName: '',
    clubCategory: '',
    foundedYear: '',
    address: '',
    clubLogo: null as File | null,
    playerCount: '',
    
    // Step 2: Owner Details
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const totalSteps = 2;
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
        if (!formData.clubName) newErrors.clubName = 'Club name is required';
        if (!formData.clubCategory) newErrors.clubCategory = 'Club category is required';
        if (!formData.foundedYear) newErrors.foundedYear = 'Founded year is required';
        if (!formData.playerCount) newErrors.playerCount = 'Player count is required';
        break;
      case 2:
        if (!formData.ownerFirstName) newErrors.ownerFirstName = 'First name is required';
        if (!formData.ownerLastName) newErrors.ownerLastName = 'Last name is required';
        if (!formData.ownerEmail) newErrors.ownerEmail = 'Email is required';
        if (!formData.ownerPhone) newErrors.ownerPhone = 'Phone number is required';
        if (!formData.ownerAddress) newErrors.ownerAddress = 'Address is required';
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

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRegistrationComplete(true);
      setIsSubmitting(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-600">Club Registration Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your club registration for <strong>{formData.clubName}</strong> has been submitted successfully 
            and is now pending approval from DSRFA administrators.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your application will be reviewed by DSRFA administrators</li>
              <li>• You will receive an email notification once your club is approved</li>
              <li>• Approval typically takes 3-5 business days</li>
              <li>• You'll be able to access club management features once approved</li>
            </ul>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onNavigate('landing')}
              className="bg-logo-green hover:bg-green-600 text-white"
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('login')}
            >
              Login to Account
            </Button>
          </div>
        </div>
      </div>
    );
  }



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                value={formData.clubName}
                onChange={(e) => handleInputChange('clubName', e.target.value)}
                placeholder="Enter your club's full name"
              />
              {errors.clubName && <p className="text-sm text-red-600">{errors.clubName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clubCategory">Club Category</Label>
              <Select value={formData.clubCategory} onValueChange={(value) => handleInputChange('clubCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select club category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amateur">Amateur</SelectItem>
                  <SelectItem value="Semi-Professional">Semi-Professional</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Youth Academy">Youth Academy</SelectItem>
                  <SelectItem value="Community Club">Community Club</SelectItem>
                </SelectContent>
              </Select>
              {errors.clubCategory && <p className="text-sm text-red-600">{errors.clubCategory}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                type="number"
                value={formData.foundedYear}
                onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
              />
              {errors.foundedYear && <p className="text-sm text-red-600">{errors.foundedYear}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Club Address (Optional)</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your club's address (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Club Logo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('clubLogo', e.target.files?.[0] || null)}
                  className="hidden"
                  id="clubLogo"
                />
                <label htmlFor="clubLogo" className="cursor-pointer">
                  {formData.clubLogo ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>{formData.clubLogo.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Click to upload club logo (optional)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerCount">Current Player Count</Label>
              <Input
                id="playerCount"
                type="number"
                value={formData.playerCount}
                onChange={(e) => handleInputChange('playerCount', e.target.value)}
                placeholder="Number of registered players"
                min="1"
              />
              {errors.playerCount && <p className="text-sm text-red-600">{errors.playerCount}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Please provide the contact information for the club owner/manager who will be responsible for this club.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerFirstName">First Name</Label>
                <Input
                  id="ownerFirstName"
                  value={formData.ownerFirstName}
                  onChange={(e) => handleInputChange('ownerFirstName', e.target.value)}
                  placeholder="Owner's first name"
                />
                {errors.ownerFirstName && <p className="text-sm text-red-600">{errors.ownerFirstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerLastName">Last Name</Label>
                <Input
                  id="ownerLastName"
                  value={formData.ownerLastName}
                  onChange={(e) => handleInputChange('ownerLastName', e.target.value)}
                  placeholder="Owner's last name"
                />
                {errors.ownerLastName && <p className="text-sm text-red-600">{errors.ownerLastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Email</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                placeholder="owner@email.com"
              />
              {errors.ownerEmail && <p className="text-sm text-red-600">{errors.ownerEmail}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Phone</Label>
              <Input
                id="ownerPhone"
                value={formData.ownerPhone}
                onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                placeholder="+63 XXX-XXX-XXXX"
              />
              {errors.ownerPhone && <p className="text-sm text-red-600">{errors.ownerPhone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerAddress">Address</Label>
              <Textarea
                id="ownerAddress"
                value={formData.ownerAddress}
                onChange={(e) => handleInputChange('ownerAddress', e.target.value)}
                placeholder="Complete address"
                rows={3}
              />
              {errors.ownerAddress && <p className="text-sm text-red-600">{errors.ownerAddress}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Club Details',
    'Owner Details'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Register Your Club</CardTitle>
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
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit for Approval'
                  )}
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