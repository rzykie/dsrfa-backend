import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle, 
  CheckCircle, 
  Save, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  Plus,
  Edit,
  UserPlus,
  UserMinus,
  Activity,
  BarChart3,
  FileText,
  Calendar
} from 'lucide-react';
import { NavigationPage, User } from '../App';

interface AdminManagementPageProps {
  user: User | null;
  onNavigate: (page: NavigationPage, memberId?: string, sponsorId?: string, tab?: string, eventId?: string) => void;
}

interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoApproval: boolean;
  membershipFee: string;
  sessionTimeout: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  permissions: string[];
}

export function AdminManagementPage({ user, onNavigate }: AdminManagementPageProps) {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Davao-South Regional Football Association',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    membershipFee: '150',
    sessionTimeout: '30'
  });

  const [adminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@dsrfa.org',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2025-06-18 09:30',
      permissions: ['All Permissions']
    },
    {
      id: '2',
      name: 'Maria Manager',
      email: 'maria.manager@dsrfa.org',
      role: 'Event Manager',
      status: 'Active',
      lastLogin: '2025-06-17 14:15',
      permissions: ['Events', 'Members', 'Sponsors']
    },
    {
      id: '3',
      name: 'Carlos Coordinator',
      email: 'carlos.coord@dsrfa.org',
      role: 'Member Coordinator',
      status: 'Inactive',
      lastLogin: '2025-06-15 11:45',
      permissions: ['Members', 'Gallery']
    }
  ]);

  const [systemStats] = useState({
    totalMembers: 1247,
    activeMembers: 1089,
    pendingApprovals: 23,
    totalEvents: 45,
    totalRevenue: 45650,
    systemUptime: '99.8%'
  });

  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Access control check
  if (!user || user.role !== 'Admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Administrator privileges required to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSettingsChange = (key: keyof SystemSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaveLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaveLoading(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleBackupDownload = () => {
    // Mock backup download
    alert('System backup download started. You will receive an email when the backup is ready.');
  };

  const handleDataImport = () => {
    // Mock data import
    alert('Data import functionality will open a file dialog to upload CSV/Excel files.');
  };

  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Management</h1>
        <p className="text-gray-600">
          System configuration, user management, and administrative tools for DSRFA
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 rounded-xl p-1.5 h-auto">
          <TabsTrigger 
            value="overview" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Shield className="w-4 h-4" />
            <span>Admin Users</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Lock className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger 
            value="data" 
            className="flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/60 hover:text-gray-900"
          >
            <Database className="w-4 h-4" />
            <span>Data Management</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.totalMembers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Members</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.activeMembers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.pendingApprovals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.totalEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(systemStats.totalRevenue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">System Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('members')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Users className="w-6 h-6" />
                  <span>Manage Members</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('events')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Manage Events</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('sponsors')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Shield className="w-6 h-6" />
                  <span>Manage Sponsors</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('accounting')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="membershipFee">Default Membership Fee (₱)</Label>
                    <Input
                      id="membershipFee"
                      type="number"
                      value={settings.membershipFee}
                      onChange={(e) => handleSettingsChange('membershipFee', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select 
                      value={settings.sessionTimeout} 
                      onValueChange={(value) => handleSettingsChange('sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <Switch
                      id="maintenance"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingsChange('maintenanceMode', checked)}
                    />
                  </div>

                  {/* Enhanced Registration Setting with RadioGroup */}
                  <div className="space-y-3">
                    <Label>Member Registration</Label>
                    <RadioGroup 
                      value={settings.registrationEnabled ? "enabled" : "disabled"}
                      onValueChange={(value) => handleSettingsChange('registrationEnabled', value === "enabled")}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="registration-enabled"
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            settings.registrationEnabled 
                              ? 'border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-20' 
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <RadioGroupItem value="enabled" id="registration-enabled" className="border-green-500" />
                          <div className="flex items-center space-x-2">
                            <Eye className={`w-5 h-5 ${settings.registrationEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                            <div>
                              <p className={`font-medium ${settings.registrationEnabled ? 'text-green-900' : 'text-gray-700'}`}>
                                Enabled
                              </p>
                              <p className="text-sm text-gray-500">
                                Allow new member registrations
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="registration-disabled"
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            !settings.registrationEnabled 
                              ? 'border-red-500 bg-red-50 ring-2 ring-red-500 ring-opacity-20' 
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <RadioGroupItem value="disabled" id="registration-disabled" className="border-red-500" />
                          <div className="flex items-center space-x-2">
                            <EyeOff className={`w-5 h-5 ${!settings.registrationEnabled ? 'text-red-600' : 'text-gray-400'}`} />
                            <div>
                              <p className={`font-medium ${!settings.registrationEnabled ? 'text-red-900' : 'text-gray-700'}`}>
                                Disabled
                              </p>
                              <p className="text-sm text-gray-500">
                                Block new member registrations
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoApproval">Auto-approve Members</Label>
                    <Switch
                      id="autoApproval"
                      checked={settings.autoApproval}
                      onCheckedChange={(checked) => handleSettingsChange('autoApproval', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <Switch
                      id="emailNotif"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotif">SMS Notifications</Label>
                    <Switch
                      id="smsNotif"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingsChange('smsNotifications', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaveLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSaveLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Administrator Users
                </CardTitle>
                <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Administrator</DialogTitle>
                      <DialogDescription>
                        Create a new administrator account with specific permissions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="adminName">Full Name</Label>
                        <Input id="adminName" placeholder="Enter full name" />
                      </div>
                      <div>
                        <Label htmlFor="adminEmail">Email Address</Label>
                        <Input id="adminEmail" type="email" placeholder="admin@dsrfa.org" />
                      </div>
                      <div>
                        <Label htmlFor="adminRole">Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="event-manager">Event Manager</SelectItem>
                            <SelectItem value="member-coordinator">Member Coordinator</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Create Admin
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrator</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                          <p className="text-sm text-gray-500">{admin.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{admin.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={admin.status === 'Active' ? 'default' : 'secondary'}
                          className={admin.status === 'Active' ? 'bg-green-600' : ''}
                        >
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{admin.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions.slice(0, 2).map((permission, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {admin.permissions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{admin.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Security settings help protect your system from unauthorized access and maintain data integrity.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Password Complexity</Label>
                    <p className="text-sm text-gray-500">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Login Attempt Limit</Label>
                    <p className="text-sm text-gray-500">Lock accounts after failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Session Security</Label>
                    <p className="text-sm text-gray-500">Force logout on browser close</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Security Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View Audit Logs
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force All Logout
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Security Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Templates</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Welcome Email</p>
                      <p className="text-sm text-gray-500">Sent when new members register</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Event Reminder</p>
                      <p className="text-sm text-gray-500">Sent before event dates</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Membership Renewal</p>
                      <p className="text-sm text-gray-500">Sent when membership expires</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Send welcome emails to new members</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Send event reminders</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Send membership expiry notifications</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Send admin notifications</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Export Data</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Members
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Events Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Financial Reports
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleBackupDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download System Backup
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Import Data</h4>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleDataImport}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Members
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleDataImport}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Events
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleDataImport}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Sponsors
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Always create a backup before importing data or making bulk changes. 
                  Data operations cannot be undone.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}