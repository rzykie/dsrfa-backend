import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, Calendar, Clock, Star, Palette, Code, Users } from 'lucide-react';
import { NavigationPage } from '../App';

interface VersionHistoryPageProps {
  onNavigate: (page: NavigationPage) => void;
}

interface CategoryItems {
  [key: string]: string[];
}

interface VersionEntry {
  version: string;
  date: string;
  time: string;
  type: 'Major' | 'Minor';
  title: string;
  components: string[];
  categories: CategoryItems;
}

export function VersionHistoryPage({ onNavigate }: VersionHistoryPageProps) {
  // Get current date and time
  const now = new Date();
  
  // Helper function to create realistic timestamps for versions
  const getVersionDateTime = (hoursAgo: number) => {
    const versionDate = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000));
    const date = versionDate.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const time = versionDate.toLocaleTimeString(undefined, { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return { date, time };
  };

  const versionHistory: VersionEntry[] = [
    {
      version: 'V1.3.1',
      ...getVersionDateTime(0.08), // 5 minutes ago
      type: 'Minor',
      title: 'Admin Profile Tab Consolidation',
      components: [
        '/components/ProfilePage.tsx'
      ],
      categories: {
        'User Interface': [
          'Merged Profile and Activity tabs into single "Profile & Activity" tab for admin users',
          'Reduced tab count from 4 to 3 tabs (Profile & Activity, Security, Sessions)',
          'Enhanced activity display with color-coded icons based on activity type',
          'Added comprehensive Recent Activity section directly below profile information',
          'Improved visual hierarchy with consistent card-based layout for activity items',
          'Enhanced activity entries with timestamps, target information, and detailed descriptions',
          'Added "View All Activity" button for accessing complete activity logs',
          'Maintained responsive design across different screen sizes'
        ],
        'User Experience': [
          'Streamlined navigation with fewer tabs to reduce cognitive load',
          'Contextual information presentation - profile and activity in unified view',
          'Efficient admin workflow by eliminating need to switch between tabs',
          'Enhanced admin interface with better information organization',
          'Improved accessibility through consolidated interface design',
          'Better visual feedback with activity-specific icons (Member, Event, System actions)'
        ],
        'Technical Implementation': [
          'Updated TabsList grid from grid-cols-4 to grid-cols-3 for new layout',
          'Enhanced tab styling with improved visual feedback and transitions',
          'Integrated activity feed directly into Profile tab content',
          'Added dynamic icon rendering based on activity action type',
          'Maintained all existing functionality while improving organization',
          'Preserved admin-specific features and role-based access control',
          'Enhanced activity data presentation with improved visual design'
        ]
      }
    },
    {
      version: 'V1.3.0',
      ...getVersionDateTime(0.25), // 15 minutes ago
      type: 'Major',
      title: 'Event Management System & Admin Management Page',
      components: [
        '/App.tsx',
        '/components/EventManagementPage.tsx',
        '/components/AdminManagementPage.tsx',
        '/components/EventsPage.tsx'
      ],
      categories: {
        'Core Features': [
          'Created dedicated Event Management sub-page for comprehensive participant management',
          'Added full participant approval workflow with approve/decline functionality',
          'Implemented payment tracking and revenue analytics for individual events',
          'Added contact information management for event participants',
          'Created Admin Management page replacing renewal functionality for administrators',
          'Added system overview dashboard with key metrics (members, events, revenue, uptime)',
          'Implemented comprehensive admin user management with role-based permissions',
          'Added system settings configuration including maintenance mode and notification preferences',
          'Created security controls with 2FA, password policies, and audit log access',
          'Added data management tools for export/import and system backup functionality'
        ],
        'User Interface': [
          'Replaced dialog-based event management with dedicated full-page interface',
          'Added comprehensive event overview card with image, details, and revenue tracking',
          'Created participant management table with detailed contact and payment information',
          'Implemented breadcrumb navigation for easy return to Events & Tournaments',
          'Added event statistics dashboard with participant counts and revenue metrics',
          'Created tabbed Admin Management interface (Overview, Settings, Users, Security, Notifications, Data)',
          'Added system statistics cards with visual icons and color-coded metrics',
          'Implemented admin user table with role badges and permission displays',
          'Created settings forms with toggle switches for system configuration',
          'Added loading states and error handling for better user experience'
        ],
        'Technical Implementation': [
          'Added "event-management" and "admin-management" to NavigationPage types',
          'Extended App.tsx navigation system to handle eventId parameter passing',
          'Created EventManagementPage component with comprehensive participant management',
          'Built AdminManagementPage with tabbed interface and role-based access control',
          'Updated EventsPage Manage button to navigate to sub-page instead of opening dialog',
          'Added selectedEventId state management in main App component',
          'Implemented mock data structures for events, participants, and admin users',
          'Added proper TypeScript interfaces for all new data structures',
          'Created responsive layouts with proper grid systems and card components',
          'Added admin-only access control checks across new pages'
        ],
        'Business Logic': [
          'Established participant approval workflow for event management',
          'Created payment status tracking (Paid, Pending, Failed) with revenue calculations',
          'Implemented role-based access control for admin management features',
          'Added system configuration management for operational control',
          'Created admin user hierarchy with permission-based access levels',
          'Established data backup and restore procedures for system maintenance',
          'Added notification system management for automated communications',
          'Created security policy enforcement with configurable authentication requirements',
          'Implemented audit trail functionality for system monitoring',
          'Added revenue tracking and financial analytics for event management'
        ]
      }
    },
    {
      version: 'V1.2.5',
      ...getVersionDateTime(1.75), // 1 hour 45 minutes ago
      type: 'Minor',
      title: 'Tab-Specific Navigation Enhancement',
      components: [
        '/App.tsx',
        '/components/SponsorsPage.tsx',
        '/components/AddSponsorPage.tsx',
        '/components/EditSponsorPage.tsx'
      ],
      categories: {
        'User Interface': [
          'Enhanced navigation system to support tab-specific navigation within pages',
          'Updated "Back to Sponsors" buttons to redirect to "Sponsor Management" tab specifically',
          'Changed button text from "Back to Sponsors" to "Back to Sponsor Management" for clarity',
          'Implemented automatic tab selection when navigating from Add/Edit Sponsor pages',
          'Enhanced breadcrumb navigation to maintain tab context across page transitions',
          'Improved user experience by preserving tab state during navigation flow',
          'Added visual consistency by ensuring users land on the correct tab after operations'
        ],
        'Technical Implementation': [
          'Extended handleNavigation function to accept optional tab parameter in App.tsx',
          'Added defaultTab prop to SponsorsPage component with useEffect for tab control',
          'Updated SponsorsPage to use controlled Tabs component with value and onValueChange',
          'Modified AddSponsorPage and EditSponsorPage navigation calls to include tab parameter',
          'Enhanced navigation interface to support tab-specific routing',
          'Added activeTab state management in SponsorsPage for controlled tab switching',
          'Updated all navigation calls to pass "sponsors" tab when returning to sponsor management'
        ],
        'Core Features': [
          'Tab-aware navigation system for improved user workflow experience',
          'Automatic tab selection based on navigation context and user actions',
          'Consistent navigation behavior across all sponsor-related pages',
          'Enhanced breadcrumb functionality with tab-specific navigation support',
          'Improved user experience by maintaining navigation context across page transitions',
          'Seamless workflow from Add/Edit operations back to sponsor management interface'
        ]
      }
    },
    {
      version: 'V1.2.4',
      ...getVersionDateTime(2.5), // 2 hours 30 minutes ago
      type: 'Minor',
      title: 'Edit Sponsor Page with Dedicated Navigation',
      components: [
        '/components/EditSponsorPage.tsx',
        '/components/SponsorsPage.tsx',
        '/App.tsx'
      ],
      categories: {
        'User Interface': [
          'Created dedicated Edit Sponsor page replacing dialog-based editing',
          'Implemented breadcrumb navigation (Dashboard > Sponsor Management > Edit Sponsor)',
          'Pre-populated form with existing sponsor data and enhanced validation',
          'Added loading state while fetching sponsor details from API',
          'Created success confirmation page with updated sponsor information',
          'Enhanced user experience with "Save Changes" button and proper form submission feedback',
          'Added sponsor not found error handling with navigation back to sponsors list',
          'Used enhanced RadioGroup for sponsor status selection (Active/Inactive with icons)'
        ],
        'Core Features': [
          'Full sponsor edit functionality with pre-populated form fields',
          'Real-time form validation maintaining Philippine business standards',
          'Sponsor ID parameter passing through navigation system',
          'Loading state simulation for API data fetching',
          'Form submission with "Updating Sponsor..." loading feedback',
          'Success state with auto-redirect back to sponsor list',
          'Error handling for invalid or missing sponsor IDs',
          'Consistent form validation with enhanced error messaging'
        ],
        'Technical Implementation': [
          'Built EditSponsorPage component with TypeScript interfaces and useEffect for data loading',
          'Updated App.tsx navigation system to handle sponsorId parameter passing',
          'Modified SponsorsPage to navigate to edit page instead of opening dialog',
          'Removed edit dialog functionality and cleaned up unused dialog code',
          'Added selectedSponsorId state management in main App component',
          'Implemented mock sponsor data loading with async simulation',
          'Enhanced navigation function to accept optional sponsorId parameter',
          'Maintained consistent admin-only access control across edit functionality'
        ]
      }
    },
    {
      version: 'V1.2.3',
      ...getVersionDateTime(3.25), // 3 hours 15 minutes ago
      type: 'Minor',
      title: 'Enhanced Sponsor Status Radio Group',
      components: [
        '/components/AddSponsorPage.tsx',
        '/App.tsx'
      ],
      categories: {
        'User Interface': [
          'Replaced Switch component with RadioGroup for clearer sponsor status selection',
          'Added visual cards with icons (Eye/EyeOff) for Active/Inactive status options',
          'Enhanced accessibility with proper labels and descriptions for each status option',
          'Implemented hover effects and visual feedback for better user interaction',
          'Added descriptive text explaining what each status means for the sponsor',
          'Created responsive 2-column grid layout for radio options on larger screens',
          'Improved visual hierarchy with consistent spacing and typography',
          'Added transition animations for smooth hover and selection states'
        ],
        'Technical Implementation': [
          'Imported and integrated ShadCN RadioGroup and RadioGroupItem components',
          'Updated form state management to handle string-based radio values ("active"/"inactive")',
          'Added proper TypeScript typing for radio group value changes',
          'Implemented conditional styling based on selected radio option',
          'Maintained existing form validation and submission logic',
          'Added proper accessibility attributes (id, htmlFor) for radio group items',
          'Updated component imports to include Eye and EyeOff icons from Lucide React'
        ]
      }
    },
    {
      version: 'V1.2.2',
      ...getVersionDateTime(4.3), // 4 hours 18 minutes ago
      type: 'Minor',
      title: 'Add Sponsor Page with Breadcrumb Navigation',
      components: [
        '/components/AddSponsorPage.tsx',
        '/components/SponsorsPage.tsx',
        '/App.tsx'
      ],
      categories: {
        'User Interface': [
          'Created dedicated Add Sponsor page replacing dialog-based form',
          'Implemented ShadCN breadcrumb navigation (Dashboard > Sponsor Management > Add New Sponsor)',
          'Added comprehensive form validation with error messaging and field highlighting',
          'Created success confirmation page with auto-redirect to sponsor list',
          'Enhanced user experience with loading states and form submission feedback',
          'Added "Back to Sponsors" button with ArrowLeft icon for easy navigation',
          'Professional page layout with clear section headers and organized form fields',
          'Responsive form design with grid-based layout for optimal screen utilization'
        ],
        'Core Features': [
          'Full sponsor form with all required fields (name, contact, financial, contract details)',
          'Real-time form validation with Philippine business standards (email, phone, peso amounts)',
          'Contract date validation ensuring end date is after start date',
          'Form submission simulation with loading states and success feedback',
          'Required field indicators and comprehensive error handling',
          'Active/inactive sponsor status toggle with Switch component',
          'Automatic navigation back to sponsor list after successful submission'
        ],
        'Technical Implementation': [
          'Built AddSponsorPage component with TypeScript interfaces and form state management',
          'Updated NavigationPage type to include "add-sponsor" route in App.tsx',
          'Removed dialog functionality from SponsorsPage, replaced with page navigation',
          'Integrated ShadCN Breadcrumb component for hierarchical navigation',
          'Added form validation logic with error state management',
          'Implemented admin-only access control consistent with existing pages',
          'Created responsive form layout using CSS Grid for optimal field organization'
        ]
      }
    },
    {
      version: 'V1.2.1',
      ...getVersionDateTime(5.4), // 5 hours 24 minutes ago
      type: 'Minor',
      title: 'Combined Overview and Analytics Tabs',
      components: [
        '/components/SponsorsPage.tsx',
        '/App.tsx'
      ],
      categories: {
        'User Interface': [
          'Combined Analytics tab content into Overview tab for streamlined interface',
          'Removed separate Analytics tab to reduce navigation complexity',
          'Updated tab structure from 3 tabs to 2 tabs (Overview & Analytics + Sponsor Management)',
          'Reorganized Overview layout with statistics cards, analytics charts, recent sponsors, and contract renewals',
          'Enhanced tab labels: "Overview & Analytics" and "Sponsor Management" for better clarity',
          'Improved information density by consolidating related analytical content',
          'Maintained all original functionality while simplifying navigation'
        ],
        'Technical Implementation': [
          'Updated TabsList to use grid-cols-2 instead of grid-cols-3',
          'Restructured TabsContent to combine overview and analytics sections',
          'Reorganized component layout for better information flow and visual hierarchy',
          'Updated tab trigger labels and maintained consistent styling and icons',
          'Preserved all existing functionality while improving user experience'
        ]
      }
    },
    {
      version: 'V1.2.0',
      ...getVersionDateTime(6.75), // 6 hours 45 minutes ago
      type: 'Major',
      title: 'Admin Sponsor Management Page',
      components: [
        '/components/SponsorsPage.tsx',
        '/components/Header.tsx',
        '/App.tsx'
      ],
      categories: {
        'Core Features': [
          'Created comprehensive sponsor management system for admin users',
          'Added full CRUD operations for sponsor partnerships (Create, Read, Update, Delete)',
          'Implemented sponsor tier system (Premium, Gold, Silver, Bronze) with visual badges',
          'Added sponsor visibility toggle functionality for active/inactive status',
          'Created sponsor statistics dashboard with revenue tracking',
          'Implemented advanced filtering by tier, status, and search functionality',
          'Added contract management with start/end dates and renewal tracking',
          'Created sponsor analytics with tier distribution and revenue breakdown'
        ],
        'User Interface': [
          'Designed tabbed interface with Overview, Sponsors, and Analytics sections',
          'Created responsive sponsor cards with logo display and contact information',
          'Implemented tier-specific color coding and icons (Star, Award, Trophy, Shield)',
          'Added comprehensive add/edit dialogs with form validation',
          'Created statistics cards showing total sponsors, revenue, and tier distribution',
          'Implemented sponsor logo display with ImageWithFallback component',
          'Added contract renewal notifications for upcoming expirations',
          'Created professional sponsor directory with search and filter controls'
        ],
        'Technical Implementation': [
          'Built comprehensive SponsorsPage component with TypeScript interfaces',
          'Integrated ShadCN UI components (Cards, Dialogs, Tabs, Badges, Switches)',
          'Added sponsor data structure with complete contact and contract information',
          'Implemented Philippine Peso currency formatting for sponsorship amounts',
          'Created admin-only access control with role-based authentication',
          'Added sponsors navigation item to Header for admin users',
          'Updated App.tsx routing to include sponsors page navigation',
          'Integrated ImageWithFallback for sponsor logo display'
        ],
        'Business Logic': [
          'Established four-tier sponsorship system (Premium, Gold, Silver, Bronze)',
          'Created contract management with automatic renewal tracking',
          'Implemented sponsorship value tracking with revenue analytics',
          'Added sponsor benefits management with customizable benefit packages',
          'Created sponsor status management for active/inactive partnerships',
          'Established contact management with email, phone, and address tracking',
          'Added sponsor analytics for business intelligence and reporting',
          'Created automated contract expiration monitoring and alerts'
        ]
      }
    },
    {
      version: 'V1.1.12',
      ...getVersionDateTime(8.5), // 8 hours 30 minutes ago (yesterday)
      type: 'Minor',
      title: 'Project Dependencies Package.json',
      components: [
        '/package.json'
      ],
      categories: {
        'Technical Implementation': [
          'Created comprehensive package.json with all project dependencies',
          'Added React 18.3.1 and ReactDOM for core framework functionality',
          'Included TypeScript 5.6.3 for type-safe development',
          'Added Tailwind CSS v4.0.0-beta.7 for styling system',
          'Integrated complete ShadCN UI component library with all Radix primitives',
          'Added Lucide React 0.462.0 for comprehensive icon library',
          'Included specific versions: react-hook-form@7.55.0 and sonner@2.0.3',
          'Added development tools: Vite, ESLint, Prettier, Vitest for testing',
          'Configured build scripts and development workflow commands',
          'Added browser compatibility and Node.js engine requirements'
        ],
        'Core Features': [
          'Added Recharts for data visualization and chart components',
          'Included React Slick for carousel functionality',
          'Added React DnD for drag and drop interactions',
          'Integrated Framer Motion for animations and transitions',
          'Added Re-resizable for resizable panel components',
          'Included React Responsive Masonry for grid layouts',
          'Added Floating UI for advanced positioning and popover functionality',
          'Integrated React Textarea Autosize for dynamic text areas'
        ]
      }
    },
    {
      version: 'V1.1.11',
      ...getVersionDateTime(9.25), // 9 hours 15 minutes ago (yesterday)
      type: 'Minor',
      title: 'Peso Currency Implementation',
      components: [
        '/components/RenewalPage.tsx'
      ],
      categories: {
        'User Interface': [
          'Updated all currency displays from USD ($) to Philippine Peso (₱)',
          'Added formatPrice() function for consistent peso formatting with comma separators',
          'Updated membership plan pricing to appropriate peso amounts (₱2,500, ₱5,000, ₱10,000)',
          'Applied peso formatting throughout order summary and payment sections',
          'Maintained all existing functionality while changing currency representation'
        ],
        'Technical Implementation': [
          'Created formatPrice() helper function using toLocaleString() for number formatting',
          'Updated all price displays to use peso symbol (₱) instead of dollar sign ($)',
          'Ensured consistent currency formatting across all price-related components',
          'Maintained existing pricing logic while updating currency representation'
        ]
      }
    },
    {
      version: 'V1.1.10',
      ...getVersionDateTime(10), // 10 hours ago (yesterday)
      type: 'Minor',
      title: 'Quick Demo Login Feature',
      components: [
        '/components/LoginPage.tsx'
      ],
      categories: {
        'Core Features': [
          'Added Quick Login button for instant demo account access',
          'Automated login process with pre-filled credentials',
          'One-click login for both Member and Admin demo accounts',
          'Improved user experience for testing and demonstrations'
        ],
        'User Interface': [
          'Added Zap icon Quick Login button in demo credentials section',
          'Positioned button alongside demo account information',
          'Maintained consistent styling with login type colors (green for member, red for admin)',
          'Added loading state handling for quick login process',
          'Enhanced demo credentials section layout with better spacing'
        ]
      }
    }
  ];

  const getTypeIcon = (type: 'Major' | 'Minor') => {
    return type === 'Major' ? <Star className="w-4 h-4" /> : <Palette className="w-4 h-4" />;
  };

  const getTypeColor = (type: 'Major' | 'Minor') => {
    return type === 'Major' ? 'bg-green-600' : 'bg-blue-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className="mb-4 text-primary hover:text-primary/80 hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Version History</h1>
        <p className="text-gray-600">
          Track all updates and improvements to the DSRFA web application
        </p>
      </div>

      {/* Version Guidelines */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Version Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Major Versions (V1.x.0)</h4>
              <ul className="space-y-1 text-green-600">
                <li>• New pages and components</li>
                <li>• Core functionality additions</li>
                <li>• Navigation structure changes</li>
                <li>• Database schema updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Minor Versions (V1.0.x)</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Styling and UI improvements</li>
                <li>• Bug fixes and optimizations</li>
                <li>• Component enhancements</li>
                <li>• Configuration updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <div className="space-y-6">
        {versionHistory.map((version) => (
          <Card key={version.version} className="border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold">{version.version}</h2>
                  <Badge className={`${getTypeColor(version.type)} text-white flex items-center space-x-1`}>
                    {getTypeIcon(version.type)}
                    <span>{version.type}</span>
                  </Badge>
                </div>
                <div className="flex items-center text-gray-500 space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{version.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{version.time}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg text-gray-700">{version.title}</h3>
            </CardHeader>
            <CardContent>
              {/* Components Updated */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Components Updated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {version.components.map((component, index) => (
                    <Badge key={index} variant="outline" className="font-mono text-xs">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <Accordion type="multiple" className="space-y-2">
                {Object.entries(version.categories).map(([category, items]) => (
                  <AccordionItem key={category} value={category} className="border-none shadow-none bg-gray-100 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <span className="font-medium">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}