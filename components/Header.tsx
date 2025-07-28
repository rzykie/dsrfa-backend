import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X, User, LogOut } from 'lucide-react';
import { NavigationPage, User as UserType, hasAdminPrivileges, isFullAdmin } from '../App';
import logoImage from 'figma:asset/66176ff37a535872b1aaa3a249907619c037a511.png';

interface HeaderProps {
  isAuthenticated: boolean;
  user: UserType | null;
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onLogout: () => void;
}

export function Header({ isAuthenticated, user, currentPage, onNavigate, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = isAuthenticated ? [
    { key: 'dashboard', label: 'Home' },
    { key: 'events', label: 'Events' },
    ...(user?.role !== 'Club Owner' ? [{ key: 'gallery', label: 'Gallery' }] : []),
    { key: 'club', label: (isFullAdmin(user) || user?.role === 'Club Owner') ? 'Members' : 'My Club' },
    ...(isFullAdmin(user) ? [
      { key: 'clubs', label: 'Clubs' },
      { key: 'accounting', label: 'Payments' },
      { key: 'sponsors', label: 'Sponsors' }
    ] : []),
    ...(!hasAdminPrivileges(user) ? [{ key: 'renewal', label: 'Renewal' }] : []),
  ] : [];

  const handleNavigation = (page: NavigationPage) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation(isAuthenticated ? 'dashboard' : 'landing')}
        >
          <img 
            src={logoImage} 
            alt="Davao-South Regional Football Association"
            className="w-12 h-12 mr-3 object-contain"
          />
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-gray-800">DSRFA</span>

          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key as NavigationPage)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    currentPage === item.key
                      ? 'bg-logo-red text-white'
                      : 'text-gray-600 hover:text-logo-red hover:bg-red-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center space-x-2 hover:bg-green-50 hover:text-logo-green rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('login')}
                className="hover:bg-green-50 hover:text-logo-green rounded-lg font-medium"
              >
                Login
              </Button>
              <Button
                onClick={() => handleNavigation('register')}
                className="bg-logo-red hover:bg-red-600 text-white rounded-lg font-medium"
              >
                Register
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {isAuthenticated ? (
                  <>
                    <div className="pb-4 border-b">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={logoImage} 
                          alt="DSRFA"
                          className="w-10 h-10 object-contain"
                        />
                        <div>
                          <p className="font-medium">Welcome, {user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    {navigationItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleNavigation(item.key as NavigationPage)}
                        className={`text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                          currentPage === item.key
                            ? 'bg-logo-red text-white'
                            : 'text-gray-600 hover:text-logo-red hover:bg-red-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="pt-4 border-t space-y-2">
                      <button
                        onClick={() => handleNavigation('profile')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-logo-green hover:bg-green-50 px-4 py-3 rounded-lg w-full"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={onLogout}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-3 rounded-lg w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <img 
                        src={logoImage} 
                        alt="DSRFA"
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <p className="font-medium text-sm">DSRFA</p>
                        <p className="text-xs text-gray-500">Football Community</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('login')}
                      className="justify-start hover:bg-green-50 hover:text-logo-green rounded-lg"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => handleNavigation('register')}
                      className="bg-logo-red hover:bg-red-600 text-white justify-start rounded-lg"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}