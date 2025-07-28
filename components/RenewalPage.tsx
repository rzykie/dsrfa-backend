import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle, 
  Clock, 
  Calendar,
  Star,
  Gift,
  Users,
  Trophy
} from 'lucide-react';
import { NavigationPage, User } from '../App';

interface RenewalPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage) => void;
}

export function RenewalPage({ user, onNavigate }: RenewalPageProps) {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to renew your membership</h2>
          <Button onClick={() => onNavigate('login')}>Login</Button>
        </div>
      </div>
    );
  }

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic Membership',
      price: 2500,
      duration: '1 Year',
      features: [
        'Access to community events',
        'Member directory access',
        'Basic support',
        'Monthly newsletter',
      ],
      color: 'gray',
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 'standard',
      name: 'Standard Membership',
      price: 5000,
      duration: '1 Year',
      features: [
        'All Basic features',
        'Priority event registration',
        'Training facility access',
        'Equipment discounts',
        'Coaching clinics',
      ],
      color: 'green',
      icon: <Star className="w-6 h-6" />,
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium Membership',
      price: 10000,
      duration: '1 Year',
      features: [
        'All Standard features',
        'VIP event access',
        'Personal coaching sessions',
        'Merchandise bundle',
        'Tournament registration',
        'Priority support',
      ],
      color: 'yellow',
      icon: <Trophy className="w-6 h-6" />,
    },
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'gcash',
      name: 'GCash',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Mobile payment via GCash',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Direct bank transfer or online banking',
    },
  ];

  const currentPlan = membershipPlans.find(plan => plan.id === selectedPlan);
  const membershipDaysLeft = Math.ceil(
    (new Date(user.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleRenewal = async () => {
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Membership renewed successfully! Your ${currentPlan?.name} is now active until ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    }, 3000);
  };

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Membership Renewal</h1>
        <p className="text-gray-600">
          Renew your membership to continue enjoying all community benefits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Status */}
        <div className="lg:col-span-3">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Membership Status</span>
                <Badge 
                  variant={user.membershipStatus === 'Active' ? 'default' : 'destructive'}
                  className={user.membershipStatus === 'Active' ? 'bg-green-600' : ''}
                >
                  {user.membershipStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Expiry Date</span>
                  </div>
                  <p className="text-lg font-medium">
                    {new Date(user.membershipExpiry).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Days Remaining</span>
                  </div>
                  <p className="text-lg font-medium">
                    {membershipDaysLeft > 0 ? `${membershipDaysLeft} days` : 'Expired'}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Current Plan</span>
                  </div>
                  <p className="text-lg font-medium">Standard Membership</p>
                </div>
              </div>
              
              {membershipDaysLeft > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Membership Progress</span>
                    <span className="text-sm text-gray-600">
                      {Math.max(0, Math.round(((365 - membershipDaysLeft) / 365) * 100))}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.max(0, Math.round(((365 - membershipDaysLeft) / 365) * 100))} 
                    className="w-full" 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Membership Plans */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Membership Plan</CardTitle>
              <CardDescription>
                Select the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="space-y-4">
                  {membershipPlans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPlan === plan.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        {plan.popular && (
                          <div className="absolute -top-2 left-4">
                            <Badge className="bg-green-600">
                              <Gift className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={plan.id} className="cursor-pointer">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {plan.icon}
                                  <h3 className="font-medium text-lg">{plan.name}</h3>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-600">
                                    {formatPrice(plan.price)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {plan.duration}
                                  </div>
                                </div>
                              </div>
                              
                              <ul className="space-y-1 text-sm">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Payment & Summary */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                        {method.icon}
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{currentPlan?.name}</span>
                  <span>{formatPrice(currentPlan?.price || 0)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Duration</span>
                  <span>{currentPlan?.duration}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(currentPlan?.price || 0)}</span>
                </div>
              </div>
              
              <Alert className="mt-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your membership will be extended for 1 year from your current expiry date.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleRenewal}
                disabled={isProcessing}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {isProcessing ? 'Processing Payment...' : `Renew for ${formatPrice(currentPlan?.price || 0)}`}
              </Button>
            </CardContent>
          </Card>

          {/* Benefits Reminder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Why Renew?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Continuous access to all events</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No interruption in services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Maintain your community status</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Early bird discounts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}