import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ClubRegistrationPage } from "./components/ClubRegistrationPage";
import { Dashboard } from "./components/Dashboard";
import { EventsPage } from "./components/EventsPage";
import { EventManagementPage } from "./components/EventManagementPage";
import { EventRegistrationPage } from "./components/EventRegistrationPage";
import { EventDetailsPage } from "./components/EventDetailsPage";
import { GalleryPage } from "./components/GalleryPage";
import { ClubPage } from "./components/ClubPage";
import { ClubsPage } from "./components/ClunsPage";
import { ClubDetailsPage } from "./components/ClubDetailsPage";
import { MemberProfilePage } from "./components/MemberProfilePage";
import { RenewalPage } from "./components/RenewalPage";
import { AdminManagementPage } from "./components/AdminManagementPage";
import { ProfilePage } from "./components/ProfilePage";
import { AccountingPage } from "./components/AccountingPage";
import { SponsorsPage } from "./components/SponsorsPage";
import { AddSponsorPage } from "./components/AddSponsorPage";
import { EditSponsorPage } from "./components/EditSponsorPage";
import { VersionHistoryPage } from "./components/VersionHistoryPage";
import { Button } from "./components/ui/button";
import { Info } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  role:
    | "Player"
    | "Coach"
    | "Referee"
    | "Volunteer"
    | "Admin"
    | "Club Owner";
  club: string;
  membershipStatus: "Active" | "Expired";
  membershipExpiry: string;
  avatar?: string;
  status?: "Active" | "Pending" | "Expired" | "Released";
  dsrfaStatus?: "Approved" | "Pending" | "Declined";
  joinDate?: string;
  phone?: string;
  location?: string;
  position?: string;
};

export type NavigationPage =
  | "landing"
  | "login"
  | "register"
  | "club-register"
  | "dashboard"
  | "events"
  | "event-management"
  | "event-registration"
  | "event-details"
  | "gallery"
  | "club"
  | "clubs"
  | "club-details"
  | "member-profile"
  | "renewal"
  | "admin-management"
  | "profile"
  | "accounting"
  | "sponsors"
  | "add-sponsor"
  | "edit-sponsor"
  | "version-history";

// Helper function to check if user has admin privileges (both Admin and Club Owner)
export const hasAdminPrivileges = (
  user: User | null,
): boolean => {
  return user?.role === "Admin" || user?.role === "Club Owner";
};

// Helper function to check if user is a full admin (Admin only)
export const isFullAdmin = (user: User | null): boolean => {
  return user?.role === "Admin";
};

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<NavigationPage>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<
    string | null
  >(null);
  const [selectedSponsorId, setSelectedSponsorId] = useState<
    string | null
  >(null);
  const [selectedEventId, setSelectedEventId] = useState<
    string | null
  >(null);
  const [selectedClubId, setSelectedClubId] = useState<
    string | null
  >(null);
  const [defaultTab, setDefaultTab] = useState<string | null>(
    null,
  );

  // Mock authentication check
  useEffect(() => {
    const savedUser = localStorage.getItem("footballUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentPage("dashboard");
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem(
      "footballUser",
      JSON.stringify(userData),
    );
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("footballUser");
    setCurrentPage("landing");
  };

  const handleNavigation = (
    page: NavigationPage,
    memberId?: string,
    sponsorId?: string,
    tab?: string,
    eventId?: string,
    clubId?: string,
  ) => {
    if (page === "member-profile" && memberId) {
      setSelectedMemberId(memberId);
    }
    if (page === "edit-sponsor" && sponsorId) {
      setSelectedSponsorId(sponsorId);
    }
    if (
      (page === "event-management" ||
        page === "event-registration" ||
        page === "event-details") &&
      eventId
    ) {
      setSelectedEventId(eventId);
    }
    if (page === "club-details" && clubId) {
      setSelectedClubId(clubId);
    }
    if (tab) {
      setDefaultTab(tab);
    } else {
      setDefaultTab(null);
    }
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigation} />;
      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigate={handleNavigation}
          />
        );
      case "register":
        return <RegisterPage onNavigate={handleNavigation} />;
      case "club-register":
        return (
          <ClubRegistrationPage onNavigate={handleNavigation} />
        );
      case "dashboard":
        return (
          <Dashboard
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "events":
        return (
          <EventsPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "event-management":
        return (
          <EventManagementPage
            user={user}
            eventId={selectedEventId}
            onNavigate={handleNavigation}
          />
        );
      case "event-registration":
        return (
          <EventRegistrationPage
            user={user}
            eventId={selectedEventId}
            onNavigate={handleNavigation}
          />
        );
      case "event-details":
        return (
          <EventDetailsPage
            user={user}
            eventId={selectedEventId}
            onNavigate={handleNavigation}
          />
        );
      case "gallery":
        return (
          <GalleryPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "club":
        return (
          <ClubPage user={user} onNavigate={handleNavigation} />
        );
      case "clubs":
        return (
          <ClubsPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "club-details":
        return (
          <ClubDetailsPage
            user={user}
            clubId={selectedClubId}
            onNavigate={handleNavigation}
          />
        );
      case "member-profile":
        return (
          <MemberProfilePage
            user={user}
            memberId={selectedMemberId}
            onNavigate={handleNavigation}
          />
        );
      case "renewal":
        return (
          <RenewalPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "admin-management":
        return (
          <AdminManagementPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "profile":
        return (
          <ProfilePage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "accounting":
        return (
          <AccountingPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "sponsors":
        return (
          <SponsorsPage
            user={user}
            onNavigate={handleNavigation}
            defaultTab={defaultTab}
          />
        );
      case "add-sponsor":
        return (
          <AddSponsorPage
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "edit-sponsor":
        return (
          <EditSponsorPage
            user={user}
            sponsorId={selectedSponsorId}
            onNavigate={handleNavigation}
          />
        );
      case "version-history":
        return (
          <VersionHistoryPage onNavigate={handleNavigation} />
        );
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      <main className="pt-16 bg-[rgba(249,250,251,0)]">
        {renderCurrentPage()}
      </main>

      {/* Footer with Version Button */}
      <footer className="bg-gray-50 border-t border-gray-200 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              © 2025 Davao-South Regional Football Association.
              All rights reserved.
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleNavigation("version-history")
              }
              className="text-gray-500 hover:text-primary hover:bg-primary/10 text-xs"
            >
              <Info className="w-3 h-3 mr-1" />
              V1.3.1
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}