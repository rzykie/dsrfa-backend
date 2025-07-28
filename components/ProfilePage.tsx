import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Trophy,
  Edit,
  Save,
  X,
  Paperclip,
  Upload,
  Download,
  Eye,
  FileImage,
  File,
  FileText,
  Plus,
  Trash2,
  ShieldCheck,
  ShieldX,
  AlertCircle,
  CheckCircle,
  Settings,
  Key,
  Lock,
  Activity,
  Bell,
  Users,
  Database,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Fingerprint,
  UserCheck
} from 'lucide-react';
import { NavigationPage, User } from '../App';

interface ProfilePageProps {
  user: User | null;
  onNavigate: (page: NavigationPage) => void;
}

interface Attachment {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  type: 'birth_certificate' | 'id_card' | 'medical_certificate' | 'photo' | 'other';
  url: string;
}

interface AdminSession {
  id: string;
  device: string;
  location: string;
  loginTime: string;
  lastActivity: string;
  ipAddress: string;
  status: 'active' | 'expired';
}

interface AdminActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

export function ProfilePage({ user, onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');

  // Regular user form data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+63 917-555-0123',
    address: user?.location || 'Davao City, Philippines',
    club: user?.club || '',
    role: user?.role || 'Player',
    position: user?.position || 'Midfielder',
    bio: 'Passionate football player with 5 years of experience in competitive leagues.',
    emergencyContact: 'Maria Santos - +63 917-555-0124',
    medicalInfo: 'No known allergies or medical conditions.'
  });

  // Admin-specific form data
  const [adminFormData, setAdminFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+63 917-555-0100',
    address: user?.location || 'Davao City, Philippines',
    department: 'Administration',
    title: 'System Administrator',
    employeeId: 'DSRFA-ADM-001',
    bio: 'Experienced system administrator managing DSRFA digital infrastructure and member services.',
    emergencyContact: 'John Doe - +63 917-555-0101'
  });

  // Admin settings
  const [adminSettings, setAdminSettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    loginNotifications: true,
    securityAlerts: true,
    systemUpdates: true,
    maintenanceAlerts: true
  });

  // Mock data for admin
  const adminSessions: AdminSession[] = [
    {
      id: '1',
      device: 'Windows Desktop',
      location: 'Davao City, Philippines',
      loginTime: '2025-06-18 08:30',
      lastActivity: '2025-06-18 14:25',
      ipAddress: '192.168.1.100',
      status: 'active'
    },
    {
      id: '2',
      device: 'iPhone 15',
      location: 'Davao City, Philippines',
      loginTime: '2025-06-17 19:45',
      lastActivity: '2025-06-17 22:15',
      ipAddress: '192.168.1.105',
      status: 'expired'
    }
  ];

  const adminActivities: AdminActivity[] = [
    {
      id: '1',
      action: 'Member Approved',
      target: 'Maria Santos',
      timestamp: '2025-06-18 14:20',
      details: 'Approved membership application for Maria Santos (ID: DSRFA-M-1247)'
    },
    {
      id: '2',
      action: 'Event Created',
      target: 'Summer Training Camp',
      timestamp: '2025-06-18 13:45',
      details: 'Created new training event scheduled for July 1, 2025'
    },
    {
      id: '3',
      action: 'System Settings Updated',
      target: 'Registration Settings',
      timestamp: '2025-06-18 11:30',
      details: 'Updated membership registration settings and approval workflow'
    }
  ];

  // Mock attachments for regular users
  const [attachments] = useState<Attachment[]>([
    {
      id: '1',
      name: 'Birth Certificate',
      fileName: 'birth_certificate.pdf',
      fileSize: '2.3 MB',
      mimeType: 'application/pdf',
      uploadDate: '2025-06-15',
      status: 'approved',
      type: 'birth_certificate',
      url: '#'
    },
    {
      id: '2',
      name: 'Medical Certificate',
      fileName: 'medical_cert_2025.pdf',
      fileSize: '1.8 MB',
      mimeType: 'application/pdf',
      uploadDate: '2025-06-16',
      status: 'pending',
      type: 'medical_certificate',
      url: '#'
    }
  ]);

  // Profile stats for regular users
  const profileStats = user?.role !== 'Admin' ? [
    { icon: <Calendar className="w-4 h-4 text-gray-400" />, label: 'Member Since', value: '2023' },
    { icon: <Trophy className="w-4 h-4 text-gray-400" />, label: 'Events Joined', value: '12' },
    { icon: <Shield className="w-4 h-4 text-gray-400" />, label: 'Status', value: user?.membershipStatus || 'Active' },
    { icon: <UserIcon className="w-4 h-4 text-gray-400" />, label: 'Role', value: user?.role || 'Player' }
  ] : [
    { icon: <Shield className="w-4 h-4 text-blue-400" />, label: 'Admin Level', value: 'Super Admin' },
    { icon: <Users className="w-4 h-4 text-green-400" />, label: 'Members Managed', value: '1,247' },
    { icon: <Activity className="w-4 h-4 text-purple-400" />, label: 'System Uptime', value: '99.8%' },
    { icon: <Database className="w-4 h-4 text-orange-400" />, label: 'Last Backup', value: 'Today' }
  ];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please log in to view your profile.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    if (user.role === 'Admin') {
      setAdminFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAdminSettingChange = (setting: string, value: boolean) => {
    setAdminSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile && documentType) {
      // Mock upload
      alert(`Uploaded ${selectedFile.name} as ${documentType}`);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setDocumentType('');
    }
  };

  const handleDeleteDocument = (id: string) => {
    // Mock delete
    alert(`Document deleted: ${id}`);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (mimeType.includes('image')) return <FileImage className="w-5 h-5 text-blue-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const getAttachmentStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      birth_certificate: 'Birth Certificate',
      id_card: 'ID Card/License',
      medical_certificate: 'Medical Certificate',
      photo: 'Photo',
      other: 'Other Document'
    };
    return labels[type as keyof typeof labels] || 'Document';
  };

  // Admin Profile Render
  if (user.role === 'Admin') {
    const currentData = adminFormData;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Profile</h1>
          <p className="text-gray-600">
            Manage your administrative account and system preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Admin Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-red-600 text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{currentData.title}</p>
                  <Badge className="mt-2 bg-red-600 text-white rounded-lg">
                    <Shield className="w-3 h-3 mr-1" />
                    Administrator
                  </Badge>
                </div>

                <div className="space-y-4">
                  {profileStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {stat.icon}
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <span className="text-sm text-gray-600">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => onNavigate('admin-management')}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Management
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1.5 h-auto">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Profile & Activity</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
                >
                  <Lock className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sessions" 
                  className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Sessions</span>
                </TabsTrigger>
              </TabsList>

              {/* Admin Profile & Activity Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="rounded-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Administrative Information</CardTitle>
                        <CardDescription>
                          Update your administrative profile and contact details
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                              className="rounded-lg"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              className="bg-red-600 hover:bg-red-700 rounded-lg"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="rounded-lg"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            {isEditing ? (
                              <Input
                                id="name"
                                value={currentData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                <UserIcon className="w-4 h-4 text-gray-400" />
                                <span>{currentData.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            {isEditing ? (
                              <Input
                                id="email"
                                type="email"
                                value={currentData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{currentData.email}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            {isEditing ? (
                              <Input
                                id="phone"
                                value={currentData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{currentData.phone}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            {isEditing ? (
                              <Input
                                id="address"
                                value={currentData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{currentData.address}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Administrative Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Administrative Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            {isEditing ? (
                              <Select value={currentData.department} onValueChange={(value) => handleInputChange('department', value)}>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Administration">Administration</SelectItem>
                                  <SelectItem value="IT">Information Technology</SelectItem>
                                  <SelectItem value="Events">Events Management</SelectItem>
                                  <SelectItem value="Finance">Finance</SelectItem>
                                  <SelectItem value="Operations">Operations</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <span>{currentData.department}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            {isEditing ? (
                              <Input
                                id="title"
                                value={currentData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <span>{currentData.title}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="employeeId">Employee ID</Label>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <span className="font-mono">{currentData.employeeId}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emergencyContact">Emergency Contact</Label>
                            {isEditing ? (
                              <Input
                                id="emergencyContact"
                                value={currentData.emergencyContact}
                                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                placeholder="Name - Phone Number"
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <span>{currentData.emergencyContact}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            {isEditing ? (
                              <Textarea
                                id="bio"
                                value={currentData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                rows={3}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="p-2 bg-gray-50 rounded-lg min-h-[80px]">
                                <span>{currentData.bio}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                 
                {/* Recent Activity Section */}
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your recent administrative actions and system interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              {activity.action.includes('Member') && <UserCheck className="w-5 h-5 text-white" />}
                              {activity.action.includes('Event') && <Calendar className="w-5 h-5 text-white" />}
                              {activity.action.includes('System') && <Settings className="w-5 h-5 text-white" />}
                              {!activity.action.includes('Member') && !activity.action.includes('Event') && !activity.action.includes('System') && <Activity className="w-5 h-5 text-white" />}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{activity.action}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{activity.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-1">
                              Target: {activity.target}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              {activity.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                     
                    {/* View All Activity Button */}
                    <div className="mt-6 text-center">
                      <Button variant="outline" className="rounded-lg">
                        <Activity className="w-4 h-4 mr-2" />
                        View All Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch
                          checked={adminSettings.twoFactorEnabled}
                          onCheckedChange={(checked) => handleAdminSettingChange('twoFactorEnabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Login Notifications</Label>
                          <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                        </div>
                        <Switch
                          checked={adminSettings.loginNotifications}
                          onCheckedChange={(checked) => handleAdminSettingChange('loginNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Security Alerts</Label>
                          <p className="text-sm text-gray-500">Receive alerts about security events</p>
                        </div>
                        <Switch
                          checked={adminSettings.securityAlerts}
                          onCheckedChange={(checked) => handleAdminSettingChange('securityAlerts', checked)}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Email Notifications</Label>
                          <Switch
                            checked={adminSettings.emailNotifications}
                            onCheckedChange={(checked) => handleAdminSettingChange('emailNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>SMS Notifications</Label>
                          <Switch
                            checked={adminSettings.smsNotifications}
                            onCheckedChange={(checked) => handleAdminSettingChange('smsNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>System Update Notifications</Label>
                          <Switch
                            checked={adminSettings.systemUpdates}
                            onCheckedChange={(checked) => handleAdminSettingChange('systemUpdates', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Maintenance Alerts</Label>
                          <Switch
                            checked={adminSettings.maintenanceAlerts}
                            onCheckedChange={(checked) => handleAdminSettingChange('maintenanceAlerts', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Security Actions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start rounded-lg">
                          <Key className="w-4 h-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="justify-start rounded-lg">
                          <Fingerprint className="w-4 h-4 mr-2" />
                          Setup 2FA
                        </Button>
                        <Button variant="outline" className="justify-start text-red-600 rounded-lg">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Force Logout All
                        </Button>
                        <Button variant="outline" className="justify-start rounded-lg">
                          <Activity className="w-4 h-4 mr-2" />
                          View Security Log
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="space-y-6">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Monitor className="w-5 h-5 mr-2" />
                      Active Sessions
                    </CardTitle>
                    <CardDescription>
                      Manage your active login sessions across different devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminSessions.map((session) => (
                        <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">
                                {session.device.includes('iPhone') ? 
                                  <Smartphone className="w-5 h-5 text-gray-500" /> : 
                                  <Monitor className="w-5 h-5 text-gray-500" />
                                }
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{session.device}</h4>
                                <p className="text-sm text-gray-600 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {session.location}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                                  <span>Login: {session.loginTime}</span>
                                  <span>Last: {session.lastActivity}</span>
                                  <span>IP: {session.ipAddress}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={session.status === 'active' ? 'default' : 'secondary'}
                                className={session.status === 'active' ? 'bg-green-600' : ''}
                              >
                                {session.status}
                              </Badge>
                              {session.status === 'active' && (
                                <Button size="sm" variant="destructive" className="rounded-lg">
                                  <X className="w-3 h-3 mr-1" />
                                  End Session
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Regular User Profile Render
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-green-600 text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.role} at {user.club}</p>
                <Badge 
                  variant={user.membershipStatus === 'Active' ? 'default' : 'destructive'}
                  className={`mt-2 rounded-lg ${user.membershipStatus === 'Active' ? 'bg-green-600' : ''}`}
                >
                  {user.membershipStatus} Member
                </Badge>
              </div>

              <div className="space-y-4">
                {profileStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {stat.icon}
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm text-gray-600">{stat.value}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => onNavigate('renewal')}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Renew Membership
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Details */}
          <Card className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and preferences
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="rounded-lg"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 rounded-lg"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="rounded-lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span>{formData.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{formData.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{formData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{formData.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Football Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Football Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="club">Club/Team</Label>
                      {isEditing ? (
                        <Input
                          id="club"
                          value={formData.club}
                          onChange={(e) => handleInputChange('club', e.target.value)}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <span>{formData.club}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      {isEditing ? (
                        <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Player">Player</SelectItem>
                            <SelectItem value="Coach">Coach</SelectItem>
                            <SelectItem value="Referee">Referee</SelectItem>
                            <SelectItem value="Volunteer">Volunteer</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <span>{formData.role}</span>
                        </div>
                      )}
                    </div>

                    {formData.role === 'Player' && (
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        {isEditing ? (
                          <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                            <SelectTrigger className="rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                              <SelectItem value="Defender">Defender</SelectItem>
                              <SelectItem value="Midfielder">Midfielder</SelectItem>
                              <SelectItem value="Forward">Forward</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <span>{formData.position}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={3}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg min-h-[80px]">
                          <span>{formData.bio}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Emergency & Medical Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Emergency & Medical Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      {isEditing ? (
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          placeholder="Name - Phone Number"
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <span>{formData.emergencyContact}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalInfo">Medical Information</Label>
                      {isEditing ? (
                        <Textarea
                          id="medicalInfo"
                          value={formData.medicalInfo}
                          onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                          placeholder="Allergies, medical conditions, medications..."
                          rows={3}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg min-h-[80px]">
                          <span>{formData.medicalInfo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents & Attachments - Only for regular users */}
          <Card className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Paperclip className="w-5 h-5" />
                    <span>Documents & Attachments</span>
                  </CardTitle>
                  <CardDescription>
                    Upload and manage your identity documents and certificates
                  </CardDescription>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Upload a new document for verification. Accepted formats: PDF, JPEG, PNG (max 10MB)
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="documentType">Document Type</Label>
                        <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
                          <SelectTrigger className="rounded-lg mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                            <SelectItem value="id_card">ID Card/License</SelectItem>
                            <SelectItem value="medical_certificate">Medical Certificate</SelectItem>
                            <SelectItem value="photo">Photo</SelectItem>
                            <SelectItem value="other">Other Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="file">Choose File</Label>
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="rounded-lg mt-2"
                        />
                      </div>
                      
                      {selectedFile && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(selectedFile.type)}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{selectedFile.name}</p>
                              <p className="text-xs text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsUploadDialogOpen(false);
                          setSelectedFile(null);
                        }}
                        className="rounded-lg"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleUploadSubmit}
                        disabled={!selectedFile}
                        className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {attachments.length > 0 ? (
                <div className="space-y-4">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">
                            {getFileIcon(attachment.mimeType)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{attachment.name}</h4>
                              {getAttachmentStatusBadge(attachment.status)}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-1">
                              {getDocumentTypeLabel(attachment.type)} • {attachment.fileName}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{attachment.fileSize}</span>
                              <span>Uploaded {new Date(attachment.uploadDate).toLocaleDateString()}</span>
                            </div>
                            
                            {attachment.status === 'rejected' && attachment.rejectionReason && (
                              <Alert className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                  <strong>Rejected:</strong> {attachment.rejectionReason}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(attachment.url, '_blank')}
                            className="rounded-lg"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // In a real app, this would trigger a download
                              console.log('Downloading:', attachment.fileName);
                            }}
                            className="rounded-lg"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-lg"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Document</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{attachment.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteDocument(attachment.id)}
                                  className="bg-red-600 hover:bg-red-700 rounded-lg"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h4>
                  <p className="text-gray-600 mb-4">
                    Upload your identity documents and certificates for verification.
                  </p>
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Your First Document
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}