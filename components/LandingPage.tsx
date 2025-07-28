import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Calendar, MapPin, Users, Trophy, Target, Heart, User, Building, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/66176ff37a535872b1aaa3a249907619c037a511.png';

interface LandingPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const upcomingEvents = [
    {
      id: 1,
      title: 'Youth Championship Finals',
      date: '2025-07-15',
      location: 'Davao Sports Complex',
      participants: 16,
      type: 'Tournament',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center'
,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Referee Training Workshop',
      date: '2025-07-22',
      location: 'DSRFA Headquarters',
      participants: 25,
      type: 'Training',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Inter-Club Friendly Match',
      date: '2025-07-28',
      location: 'Crocodile Park Stadium',
      participants: 32,
      type: 'Match',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=200&fit=crop&crop=center'
    }
  ];

  const sponsors = [
    {
      name: 'Nike',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop&crop=center',
      tier: 'Platinum'
    },
    {
      name: 'Adidas',
      logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop&crop=center',
      tier: 'Platinum'
    },
    {
      name: 'Puma',
      logo: 'https://images.unsplash.com/photo-1594736797933-d0a2e5b8f6b6?w=200&h=100&fit=crop&crop=center',
      tier: 'Gold'
    },
    {
      name: 'Under Armour',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=100&fit=crop&crop=center',
      tier: 'Gold'
    },
    {
      name: 'New Balance',
      logo: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=100&fit=crop&crop=center',
      tier: 'Silver'
    },
    {
      name: 'Mizuno',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=100&fit=crop&crop=center',
      tier: 'Silver'
    },
    {
      name: 'Umbro',
      logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=100&fit=crop&crop=center',
      tier: 'Silver'
    },
    {
      name: 'Kappa',
      logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop&crop=center',
      tier: 'Bronze'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Members', icon: Users },
    { number: '50+', label: 'Clubs Registered', icon: Target },
    { number: '200+', label: 'Matches Played', icon: Trophy },
    { number: '15+', label: 'Years of Excellence', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Football Background */}
      <section 
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=1080&fit=crop&crop=center)'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.53)] bg-opacity-50"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Davao-South Regional Football Association
          </h1>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Uniting communities through the beautiful game. Join our family of passionate players, 
            dedicated coaches, and football enthusiasts in Davao-South Region.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowRegistrationModal(true)}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Join DSRFA Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('events')}
              className="border-white text-[rgba(10,10,10,1)] hover:bg-white hover:text-green-600 bg-[rgba(255,255,255,1)]"
            >
              Explore Events
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Proud Sponsors</h2>
            <p className="text-gray-600">Supporting our community's passion for football</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="rounded-lg p-6 cursor-pointer group flex items-center justify-center min-h-[120px]"
              >
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600">Don't miss out on our exciting football activities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                {/* Event Image */}
                <div className="relative h-48 w-full">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-right text-sm text-white bg-black/50 px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.participants} participants expected</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full"
                      onClick={() => onNavigate('events')}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              onClick={() => onNavigate('events')}
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Football Family?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a player, coach, referee, or volunteer, there's a place for you in the DSRFA community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowRegistrationModal(true)}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Become a Member
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('login')}
              className="border-[#00A63E] text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              Member Login
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Type Selection Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Your Registration Type</DialogTitle>
            <DialogDescription className="text-center">
              Select how you would like to join the Davao-South Regional Football Association
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            {/* Join as Member Option */}
            <Card className="cursor-pointer hover:border-logo-green transition-colors" 
                  onClick={() => {
                    setShowRegistrationModal(false);
                    onNavigate('register');
                  }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Join as Member</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Register as an individual player, coach, referee, or volunteer
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Register as Club Owner Option */}
            <Card className="cursor-pointer hover:border-logo-green transition-colors"
                  onClick={() => {
                    setShowRegistrationModal(false);
                    onNavigate('club-register');
                  }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Register as Club Owner</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Register your football club with DSRFA (requires approval)
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}