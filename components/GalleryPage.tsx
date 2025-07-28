import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Search, 
  Filter, 
  Play, 
  Calendar as CalendarIcon, 
  Eye, 
  Upload, 
  Plus, 
  Image as ImageIcon,
  Video,
  X,
  Check,
  AlertCircle,
  Download,
  Share2,
  CheckCircle
} from 'lucide-react';
import { NavigationPage, User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryPageProps {
  user?: User | null;
  onNavigate: (page: NavigationPage) => void;
}

interface MediaItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  thumbnail: string;
  url?: string;
  event: string;
  category: string;
  date: string;
  views: number;
  uploadedBy?: string;
  description?: string;
  fileSize?: string;
  duration?: string; // for videos
  dimensions?: string; // for images
}

export function GalleryPage({ user, onNavigate }: GalleryPageProps) {
  // Access control - Club Owners cannot access gallery
  if (user?.role === 'Club Owner') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600 mb-4">Club Owners don't have access to the Photo & Video Gallery.</p>
          <Button onClick={() => onNavigate('dashboard')} className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date>();
  const [selectedDateTo, setSelectedDateTo] = useState<Date>();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    event: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      title: 'Championship Finals Highlights',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop',
      event: 'Youth Championship Finals',
      category: 'Tournament',
      date: '2025-06-20',
      views: 1245,
      uploadedBy: 'Admin',
      description: 'Exciting highlights from the championship finals match',
      fileSize: '45.2 MB',
      duration: '3:45'
    },
    {
      id: 2,
      title: 'Team Celebration',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1577223625816-7546f13df37d?w=400&h=300&fit=crop',
      event: 'Youth Championship Finals',
      category: 'Tournament',
      date: '2025-06-20',
      views: 892,
      uploadedBy: 'Sarah Johnson',
      description: 'Team celebrating their victory',
      fileSize: '2.1 MB',
      dimensions: '1920x1080'
    },
    {
      id: 3,
      title: 'Training Camp Day 1',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      event: 'Summer Training Camp',
      category: 'Training',
      date: '2025-07-01',
      views: 654,
      uploadedBy: 'Mike Wilson',
      description: 'First day of intensive summer training',
      fileSize: '1.8 MB',
      dimensions: '1680x1050'
    },
    {
      id: 4,
      title: 'Skills Workshop Demo',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=300&fit=crop',
      event: 'Youth Skills Workshop',
      category: 'Workshop',
      date: '2025-06-22',
      views: 743,
      uploadedBy: 'Emily Chen',
      description: 'Demonstration of advanced ball control techniques',
      fileSize: '78.5 MB',
      duration: '8:12'
    },
    {
      id: 5,
      title: 'Women\'s League Action',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=300&fit=crop',
      event: 'Women\'s League Match',
      category: 'Match',
      date: '2025-06-18',
      views: 1156,
      uploadedBy: 'Lisa Thompson',
      description: 'Intense action from the women\'s league',
      fileSize: '3.2 MB',
      dimensions: '2048x1536'
    },
    {
      id: 6,
      title: 'Referee Certification',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
      event: 'Referee Certification Course',
      category: 'Certification',
      date: '2025-06-25',
      views: 432,
      uploadedBy: 'Admin',
      description: 'New referees receiving their certifications',
      fileSize: '2.7 MB',
      dimensions: '1920x1280'
    },
    {
      id: 7,
      title: 'Goal of the Month',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=300&fit=crop',
      event: 'Various Matches',
      category: 'Highlights',
      date: '2025-06-15',
      views: 2341,
      uploadedBy: 'David Rodriguez',
      description: 'Amazing goal compilation from June matches',
      fileSize: '92.1 MB',
      duration: '2:30'
    },
    {
      id: 8,
      title: 'Team Photo Session',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      event: 'Team Building',
      category: 'Team',
      date: '2025-06-10',
      views: 567,
      uploadedBy: 'Alex Kumar',
      description: 'Professional team photos for the season',
      fileSize: '4.1 MB',
      dimensions: '2560x1440'
    },
    {
      id: 9,
      title: 'Stadium Atmosphere',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      event: 'Championship Finals',
      category: 'Stadium',
      date: '2025-06-20',
      views: 823,
      uploadedBy: 'Maria Garcia',
      description: 'Packed stadium during the finals',
      fileSize: '3.8 MB',
      dimensions: '2048x1365'
    },
  ]);

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesEvent = selectedEvent === 'all' || item.event === selectedEvent;
    
    // Date filtering
    const itemDate = new Date(item.date);
    const matchesDateFrom = !selectedDateFrom || itemDate >= selectedDateFrom;
    const matchesDateTo = !selectedDateTo || itemDate <= selectedDateTo;

    return matchesSearch && matchesCategory && matchesEvent && matchesDateFrom && matchesDateTo;
  });

  const categories = [...new Set(mediaItems.map(item => item.category))];
  const events = [...new Set(mediaItems.map(item => item.event))];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file sizes (max 100MB for videos, 25MB for images)
    const validFiles = files.filter(file => {
      const maxSize = file.type.startsWith('video/') ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size: ${file.type.startsWith('video/') ? '100MB for videos' : '25MB for images'}`);
        return false;
      }
      
      // Validate file types
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/quicktime', 'video/avi'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not a supported file type. Supported: JPEG, PNG, GIF, WebP, MP4, WebM, MOV, AVI`);
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(validFiles);
  };

  const handleUploadSubmit = () => {
    if (selectedFiles.length > 0 && uploadForm.title && uploadForm.category) {
      // In a real app, this would upload files to a server
      selectedFiles.forEach((file, index) => {
        const newItem: MediaItem = {
          id: mediaItems.length + index + 1,
          title: selectedFiles.length > 1 ? `${uploadForm.title} (${index + 1})` : uploadForm.title,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          thumbnail: URL.createObjectURL(file),
          event: uploadForm.event,
          category: uploadForm.category,
          date: uploadForm.date,
          views: 0,
          uploadedBy: user?.name || 'Unknown',
          description: uploadForm.description,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          duration: file.type.startsWith('video/') ? '0:00' : undefined,
          dimensions: file.type.startsWith('image/') ? 'Unknown' : undefined
        };
        
        setMediaItems(prev => [newItem, ...prev]);
      });

      // Reset form
      setSelectedFiles([]);
      setUploadForm({
        title: '',
        description: '',
        event: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsUploadDialogOpen(false);
      
      alert(`Successfully uploaded ${selectedFiles.length} file(s)! They are now visible in the gallery.`);
    }
  };

  const clearDateFilters = () => {
    setSelectedDateFrom(undefined);
    setSelectedDateTo(undefined);
  };

  const handleShare = (item: MediaItem) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`${window.location.origin}/gallery/${item.id}`);
    alert('Link copied to clipboard!');
  };

  const handleDownload = (item: MediaItem) => {
    // In a real app, this would trigger a download
    console.log('Downloading:', item.title);
    alert('Download started!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Photo & Video Gallery</h1>
          <p className="text-gray-600">
            Explore our collection of memorable moments from events and matches
          </p>
        </div>
        
        {/* Allow all authenticated users to upload */}
        {user && (
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-logo-green hover:bg-green-600 text-white rounded-lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Photos & Videos</DialogTitle>
                <DialogDescription>
                  Share your photos and videos with the DSRFA community. Supported formats: JPEG, PNG, GIF, WebP, MP4, WebM, MOV, AVI
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mediaFiles">Select Files</Label>
                  <Input
                    id="mediaFiles"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime,video/avi"
                    className="mt-1 rounded-lg"
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    Maximum file size: 25MB for images, 100MB for videos
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="font-medium text-sm">Selected Files ({selectedFiles.length}):</div>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {file.type.startsWith('video/') ? (
                              <Video className="w-4 h-4 text-blue-600" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-green-600" />
                            )}
                            <span className="truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <div className="text-gray-500 ml-2">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="uploadTitle">Title *</Label>
                  <Input
                    id="uploadTitle"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your media a descriptive title"
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="uploadDescription">Description</Label>
                  <Textarea
                    id="uploadDescription"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what's happening in your photos/videos (optional)"
                    className="mt-1 rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="uploadCategory">Category *</Label>
                    <Select value={uploadForm.category} onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="mt-1 rounded-lg">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tournament">Tournament</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Match">Match</SelectItem>
                        <SelectItem value="Certification">Certification</SelectItem>
                        <SelectItem value="Highlights">Highlights</SelectItem>
                        <SelectItem value="Team">Team</SelectItem>
                        <SelectItem value="Stadium">Stadium</SelectItem>
                        <SelectItem value="Social">Social Event</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="uploadDate">Date</Label>
                    <Input
                      id="uploadDate"
                      type="date"
                      value={uploadForm.date}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-1 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="uploadEvent">Event Name</Label>
                  <Input
                    id="uploadEvent"
                    value={uploadForm.event}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, event: e.target.value }))}
                    placeholder="Name of the event (optional)"
                    className="mt-1 rounded-lg"
                  />
                </div>

                {selectedFiles.length > 0 && uploadForm.title && uploadForm.category && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Ready to upload {selectedFiles.length} file(s). Your content will be immediately visible to all members.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsUploadDialogOpen(false);
                    setSelectedFiles([]);
                    setUploadForm({
                      title: '',
                      description: '',
                      event: '',
                      category: '',
                      date: new Date().toISOString().split('T')[0]
                    });
                  }}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUploadSubmit}
                  disabled={selectedFiles.length === 0 || !uploadForm.title || !uploadForm.category}
                  className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Show message for non-authenticated users */}
        {!user && (
          <Button 
            onClick={() => onNavigate('login')}
            variant="outline"
            className="rounded-lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Login to Upload
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-8 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Media</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-lg justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDateFrom ? selectedDateFrom.toDateString() : 'From Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateFrom}
                  onSelect={setSelectedDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-lg justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDateTo ? selectedDateTo.toDateString() : 'To Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateTo}
                  onSelect={setSelectedDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedEvent('all');
                clearDateFilters();
              }}
              className="rounded-lg"
            >
              Clear All
            </Button>
          </div>

          {(selectedDateFrom || selectedDateTo) && (
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="secondary" className="rounded-lg">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {selectedDateFrom ? selectedDateFrom.toLocaleDateString() : 'Any'} - {selectedDateTo ? selectedDateTo.toLocaleDateString() : 'Any'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearDateFilters}
                  className="ml-2 h-auto p-0 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>


      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredItems.length} of {mediaItems.length} items
          {(selectedDateFrom || selectedDateTo) && (
            <span className="ml-2">
              • Filtered by date: {selectedDateFrom ? selectedDateFrom.toLocaleDateString() : 'Any'} - {selectedDateTo ? selectedDateTo.toLocaleDateString() : 'Any'}
            </span>
          )}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-lg">
            <div className="relative aspect-video">
              <ImageWithFallback
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  {item.type === 'video' ? (
                    <Play className="w-8 h-8 text-white" />
                  ) : (
                    <Eye className="w-8 h-8 text-white" />
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(item);
                    }}
                    className="opacity-90 hover:opacity-100 rounded-lg"
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item);
                    }}
                    className="opacity-90 hover:opacity-100 rounded-lg"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="absolute top-2 left-2 flex space-x-2">
                <Badge variant={item.type === 'video' ? 'default' : 'secondary'} className="rounded-lg">
                  {item.type === 'video' ? (
                    <>
                      <Video className="w-3 h-3 mr-1" />
                      Video
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Photo
                    </>
                  )}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="bg-black/60 text-white rounded-lg">
                  <Eye className="w-3 h-3 mr-1" />
                  {item.views}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-600 mb-1">{item.event}</p>
              {item.description && (
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
              )}
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs rounded-lg">
                  {item.category}
                </Badge>
                <span className="text-xs text-gray-500 flex items-center">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.fileSize}</span>
                <span>{item.uploadedBy}</span>
                {item.duration && <span>{item.duration}</span>}
                {item.dimensions && <span>{item.dimensions}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          {user ? (
            <>
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
              <Button 
                onClick={() => setIsUploadDialogOpen(true)}
                className="bg-logo-green hover:bg-green-600 text-white rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Your First Photo or Video
              </Button>
            </>
          ) : (
            <>
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}