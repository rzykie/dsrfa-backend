import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Mail, Lock, Shield, Users, Zap, Building } from 'lucide-react';
import { NavigationPage, User } from '../App';
import logoImage from 'figma:asset/66176ff37a535872b1aaa3a249907619c037a511.png';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: NavigationPage) => void;
}

type LoginType = 'member' | 'admin' | 'club-owner';

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [loginType, setLoginType] = useState<LoginType>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication with different credentials for admin and member
    let isValidLogin = false;
    let mockUser: User | null = null;

    if (loginType === 'member' && email === 'member@dsrfa.com' && password === 'member123') {
      mockUser = {
        id: '1',
        name: 'Juan Carlos Santos',
        email: email,
        role: 'Player',
        club: 'Davao Eagles FC',
        membershipStatus: 'Active',
        membershipExpiry: '2025-12-31',
      };
      isValidLogin = true;
    } else if (loginType === 'admin' && email === 'admin@dsrfa.com' && password === 'admin123') {
      mockUser = {
        id: 'admin-1',
        name: 'Sarah Admin',
        email: email,
        role: 'Admin',
        club: 'DSRFA Administration',
        membershipStatus: 'Active',
        membershipExpiry: '2025-12-31',
      };
      isValidLogin = true;
    } else if (loginType === 'club-owner' && email === 'owner@dsrfa.com' && password === 'owner123') {
      mockUser = {
        id: 'owner-1',
        name: 'Mike Club Owner',
        email: email,
        role: 'Club Owner',
        club: 'Davao Eagles FC',
        membershipStatus: 'Active',
        membershipExpiry: '2025-12-31',
      };
      isValidLogin = true;
    }

    setTimeout(() => {
      if (isValidLogin && mockUser) {
        onLogin(mockUser);
        setIsLoading(false);
      } else {
        const demoCredentials = loginType === 'member' 
          ? 'member@dsrfa.com / member123' 
          : loginType === 'admin' 
          ? 'admin@dsrfa.com / admin123'
          : 'owner@dsrfa.com / owner123';
        setError(`Invalid email or password. Try ${demoCredentials}`);
        setIsLoading(false);
      }
    }, 1000);
  };

  const getDemoCredentials = () => {
    return loginType === 'member' 
      ? { email: 'member@dsrfa.com', password: 'member123' }
      : loginType === 'admin'
      ? { email: 'admin@dsrfa.com', password: 'admin123' }
      : { email: 'owner@dsrfa.com', password: 'owner123' };
  };

  const handleQuickLogin = () => {
    const credentials = getDemoCredentials();
    setEmail(credentials.email);
    setPassword(credentials.password);
    setError('');
    setIsLoading(true);

    // Auto-submit after setting credentials
    setTimeout(() => {
      const mockUser: User = loginType === 'member' 
        ? {
            id: '1',
            name: 'Juan Carlos Santos',
            email: credentials.email,
            role: 'Player',
            club: 'Davao Eagles FC',
            membershipStatus: 'Active',
            membershipExpiry: '2025-12-31',
          }
        : loginType === 'admin'
        ? {
            id: 'admin-1',
            name: 'Sarah Admin',
            email: credentials.email,
            role: 'Admin',
            club: 'DSRFA Administration',
            membershipStatus: 'Active',
            membershipExpiry: '2025-12-31',
          }
        : {
            id: 'owner-1',
            name: 'Mike Club Owner',
            email: credentials.email,
            role: 'Club Owner',
            club: 'Davao Eagles FC',
            membershipStatus: 'Active',
            membershipExpiry: '2025-12-31',
          };
      
      onLogin(mockUser);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <Card className="rounded-lg shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={logoImage} 
                alt="Davao-South Regional Football Association"
                className="w-20 h-20 object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your DSRFA account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Login Type Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Login As:</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={loginType === 'member' ? 'default' : 'outline'}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-lg ${
                    loginType === 'member' 
                      ? 'bg-logo-green text-white hover:bg-green-600' 
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setLoginType('member');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                >
                  <Users className="w-4 h-4" />
                  <span>Member</span>
                </Button>
                <Button
                  type="button"
                  variant={loginType === 'admin' ? 'default' : 'outline'}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-lg ${
                    loginType === 'admin' 
                      ? 'bg-logo-red text-white hover:bg-red-600' 
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setLoginType('admin');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Button>
                <Button
                  type="button"
                  variant={loginType === 'club-owner' ? 'default' : 'outline'}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-lg ${
                    loginType === 'club-owner' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setLoginType('club-owner');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                >
                  <Building className="w-4 h-4" />
                  <span>Club Owner</span>
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="rounded-lg">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your ${loginType === 'club-owner' ? 'club owner' : loginType} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-3 rounded-lg border-2 focus:border-logo-green focus:ring-logo-green"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 py-3 rounded-lg border-2 focus:border-logo-green focus:ring-logo-green"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium text-white ${
                  loginType === 'member' 
                    ? 'bg-logo-green hover:bg-green-600' 
                    : loginType === 'admin'
                    ? 'bg-logo-red hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : `Sign In as ${loginType === 'member' ? 'Member' : loginType === 'admin' ? 'Admin' : 'Club Owner'}`}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <button
                type="button"
                className="text-sm text-logo-green hover:text-green-700 font-medium"
                onClick={() => alert('Password reset functionality would be implemented here')}
              >
                Forgot your password?
              </button>
              {loginType === 'member' && (
                <div className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-logo-red hover:text-red-700 font-medium"
                    onClick={() => onNavigate('register')}
                  >
                    Register here
                  </button>
                </div>
              )}
            </div>

            <div className={`mt-6 p-4 rounded-lg border ${
              loginType === 'member' 
                ? 'bg-green-50 border-green-200' 
                : loginType === 'admin'
                ? 'bg-red-50 border-red-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${
                  loginType === 'member' ? 'text-green-800' : loginType === 'admin' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  Demo {loginType === 'member' ? 'Member' : loginType === 'admin' ? 'Admin' : 'Club Owner'} Account:
                </p>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleQuickLogin}
                  disabled={isLoading}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs rounded-lg ${
                    loginType === 'member'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : loginType === 'admin'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>Quick Login</span>
                </Button>
              </div>
              <p className={`text-sm ${
                loginType === 'member' ? 'text-green-600' : loginType === 'admin' ? 'text-red-600' : 'text-blue-600'
              }`}>
                Email: {getDemoCredentials().email}
              </p>
              <p className={`text-sm ${
                loginType === 'member' ? 'text-green-600' : loginType === 'admin' ? 'text-red-600' : 'text-blue-600'
              }`}>
                Password: {getDemoCredentials().password}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            onClick={() => onNavigate('landing')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}