import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Hotel, 
  Users, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Download, 
  X,
  CreditCard,
  Calendar,
  BedDouble,
  UtensilsCrossed
} from 'lucide-react';
import { API_BASE_URL } from '../../config';

// Interfaces
interface WorkshopSlot {
  label: string;       // e.g. "9:00 AM – 1:00 PM | July 12"
  slotsTotal: number;
  slotsFilled: number;
}

interface Workshop {
  _id: string;
  title: string;
  description: string;
  speaker: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  slotsTotal: number;
  slotsFilled: number;
  category?: string;
  topics?: string[];
  contacts?: { name: string; phone: string }[];
  slots?: WorkshopSlot[];
}

interface Competition {
  _id: string;
  title: string;
  description: string;
  rules: string[];
  teamSize: { min: number; max: number };
  prizePool: string;
  price: number;
  category?: string;
  contacts?: { name: string; phone: string }[];
  guidelines?: string[];
  topics?: string[];
  judgingCriteria?: string[];
  slots?: WorkshopSlot[];
}

interface Accommodation {
  _id: string;
  type: string;
  price: string;
  pricePerDay: number;
  occupancy: string;
  amenities: string[];
  image: string;
  availableRooms: number;
  venue?: string;
  contacts?: { name: string; phone: string }[];
}

interface Registration {
  _id: string;
  userDetails: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    rollNo: string;
  };
  itemsSelected: {
    workshops: Workshop[];
    competitions: Competition[];
    accommodation: {
      option: Accommodation;
      days: number;
      checkIn: string;
    };
  };
  foodRequired: string;          // 'yes' | 'no'
  accommodationRequired: string; // 'yes' | 'no'
  payment: {
    orderId: string;
    paymentId: string;
    amount: number;
    status: string;
  };
  registeredAt: string;
}

const AdminDashboard: React.FC = () => {
  type TabType = 'overview' | 'workshops' | 'competitions' | 'accommodation' | 'registrations' | 'accommodation-bookings';
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (sessionStorage.getItem('adminActiveTab') as TabType) || 'overview';
  });

  useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);
  // Initialize token directly from localStorage to avoid flash-redirect on refresh
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  // Data States
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [accommodation, setAccommodation] = useState<Accommodation[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Search/Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [itemTypeFilter, setItemTypeFilter] = useState<'all' | 'workshops' | 'competitions' | 'accommodation'>('all');
  const [selectedRegDetails, setSelectedRegDetails] = useState<Registration | null>(null);

  // Modal Control States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'workshop' | 'competition' | 'accommodation' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Slot builder state (used for both workshop and competition)
  const [slotRows, setSlotRows] = useState<{ label: string; slotsTotal: number }[]>([]);

  // Redirect to login if no token found
  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Form Fields State
  const [workshopForm, setWorkshopForm] = useState({
    title: '', description: '', speaker: '', venue: '', date: '', time: '', price: 0, slotsTotal: 100, category: 'General',
    topics: '', contacts: '', image: ''
  });
  const [competitionForm, setCompetitionForm] = useState({
    title: '', description: '', rules: '', minTeam: 1, maxTeam: 1, prizePool: '', price: 0, category: 'Active Events',
    contacts: '', guidelines: '', topics: '', judgingCriteria: '', image: ''
  });
  const [accommodationForm, setAccommodationForm] = useState({
    type: '', price: '', pricePerDay: 0, occupancy: '', amenities: '', image: '', availableRooms: 50, venue: '', contacts: ''
  });




  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const workshopsRes = await fetch(`${API_BASE_URL}/api/workshops`);
      const workshopsData = await workshopsRes.json();
      setWorkshops(workshopsData);

      const competitionsRes = await fetch(`${API_BASE_URL}/api/competitions`);
      const competitionsData = await competitionsRes.json();
      setCompetitions(competitionsData);

      const accommodationRes = await fetch(`${API_BASE_URL}/api/accommodation`);
      const accommodationData = await accommodationRes.json();
      setAccommodation(accommodationData);

      const registrationsRes = await fetch(`${API_BASE_URL}/api/admin/registrations`, { headers });
      if (registrationsRes.status === 401 || registrationsRes.status === 403) {
        handleLogout();
        return;
      }
      const registrationsData = await registrationsRes.json();
      setRegistrations(registrationsData);
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  // CRUD Operations
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      let url = '';
      let method = 'POST';
      let bodyData: any = {};

      // Merge slotRows with existing slotsFilled counts (preserve bookings when editing)
      const buildSlots = (): WorkshopSlot[] => {
        const existing = (editingItem?.slots ?? []) as WorkshopSlot[];
        return slotRows
          .filter(s => s.label.trim() !== '')
          .map(s => {
            const found = existing.find(e => e.label === s.label.trim());
            return { label: s.label.trim(), slotsTotal: s.slotsTotal, slotsFilled: found?.slotsFilled ?? 0 };
          });
      };

      if (modalType === 'workshop') {
        url = `${API_BASE_URL}/api/admin/workshops`;
        bodyData = {
          ...workshopForm,
          category: isCustomCategory ? customCategory : (workshopForm.category || 'General'),
          topics: workshopForm.topics.split('\n').map(t => t.trim()).filter(t => t !== ''),
          slots: buildSlots(),
          contacts: workshopForm.contacts.split('\n').map(line => {
            const [name, phone] = line.split(':');
            return { name: name?.trim() || '', phone: phone?.trim() || '' };
          }).filter(c => c.name !== '')
        };
      } else if (modalType === 'competition') {
        url = `${API_BASE_URL}/api/admin/competitions`;
        bodyData = {
          ...competitionForm,
          category: isCustomCategory ? customCategory : (competitionForm.category || 'Active Events'),
          rules: competitionForm.rules.split('\n').map(r => r.trim()).filter(r => r !== ''),
          guidelines: competitionForm.guidelines.split('\n').map(g => g.trim()).filter(g => g !== ''),
          topics: competitionForm.topics.split('\n').map(t => t.trim()).filter(t => t !== ''),
          judgingCriteria: competitionForm.judgingCriteria.split('\n').map(jc => jc.trim()).filter(jc => jc !== ''),
          contacts: competitionForm.contacts.split('\n').map(line => {
            const [name, phone] = line.split(':');
            return { name: name?.trim() || '', phone: phone?.trim() || '' };
          }).filter(c => c.name !== ''),
          teamSize: { min: competitionForm.minTeam, max: competitionForm.maxTeam },
          slots: buildSlots()
        };
      } else if (modalType === 'accommodation') {
        url = `${API_BASE_URL}/api/admin/accommodation`;
        bodyData = {
          ...accommodationForm,
          amenities: accommodationForm.amenities.split('\n').map((a: string) => a.trim()).filter((a: string) => a !== ''),
          contacts: accommodationForm.contacts.split('\n').map((line: string) => {
            const [name, phone] = line.split(':');
            return { name: name?.trim() || '', phone: phone?.trim() || '' };
          }).filter((c: any) => c.name !== '')
        };
      }

      if (editingItem) {
        url += `/${editingItem._id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(bodyData)
      });

      if (res.ok) {
        setModalOpen(false);
        setEditingItem(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (type: 'workshop' | 'competition' | 'accommodation', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const url = type === 'accommodation' 
        ? `${API_BASE_URL}/api/admin/accommodation/${id}`
        : `${API_BASE_URL}/api/admin/${type}s/${id}`;
        
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (type: 'workshop' | 'competition' | 'accommodation', item: any) => {
    setModalType(type);
    setEditingItem(item);
    setIsCustomCategory(false);
    setCustomCategory('');
    if (type === 'workshop') {
      setWorkshopForm({
        title: item.title,
        description: item.description,
        speaker: item.speaker,
        venue: item.venue || '',
        date: item.date || '',
        time: item.time || '',
        price: item.price,
        slotsTotal: item.slotsTotal || 100,
        category: item.category || 'General',
        topics: item.topics ? item.topics.join('\n') : '',
        contacts: item.contacts ? item.contacts.map((c: any) => `${c.name}: ${c.phone}`).join('\n') : '',
        image: item.image || ''
      });
      setSlotRows(item.slots ? (item.slots as WorkshopSlot[]).map(s => ({ label: s.label, slotsTotal: s.slotsTotal })) : []);
    } else if (type === 'competition') {
      setCompetitionForm({
        title: item.title,
        description: item.description,
        rules: item.rules ? item.rules.join('\n') : '',
        minTeam: item.teamSize?.min || 1,
        maxTeam: item.teamSize?.max || 1,
        prizePool: item.prizePool || '',
        price: item.price,
        category: item.category || 'Active Events',
        contacts: item.contacts ? item.contacts.map((c: any) => `${c.name}: ${c.phone}`).join('\n') : '',
        guidelines: item.guidelines ? item.guidelines.join('\n') : '',
        topics: item.topics ? item.topics.join('\n') : '',
        judgingCriteria: item.judgingCriteria ? item.judgingCriteria.join('\n') : '',
        image: item.image || ''
      });
      setSlotRows(item.slots ? (item.slots as WorkshopSlot[]).map(s => ({ label: s.label, slotsTotal: s.slotsTotal })) : []);
    } else if (type === 'accommodation') {
      setAccommodationForm({
        type: item.type,
        price: item.price || '',
        pricePerDay: item.pricePerDay || 0,
        occupancy: item.occupancy || '',
        amenities: item.amenities ? item.amenities.join('\n') : '',
        image: item.image || '',
        availableRooms: item.availableRooms || 50,
        venue: item.venue || '',
        contacts: item.contacts ? item.contacts.map((c: any) => `${c.name}: ${c.phone}`).join('\n') : ''
      });
    }
    setModalOpen(true);
  };

  const openCreateModal = (type: 'workshop' | 'competition' | 'accommodation') => {
    setModalType(type);
    setEditingItem(null);
    setIsCustomCategory(false);
    setCustomCategory('');
    if (type === 'workshop') {
      setWorkshopForm({ title: '', description: '', speaker: '', venue: '', date: '', time: '', price: 0, slotsTotal: 100, category: 'General', topics: '', contacts: '', image: '' });
      setSlotRows([]);
    } else if (type === 'competition') {
      setCompetitionForm({ title: '', description: '', rules: '', minTeam: 1, maxTeam: 1, prizePool: '', price: 0, category: 'Active Events', contacts: '', guidelines: '', topics: '', judgingCriteria: '', image: '' });
      setSlotRows([]);
    } else if (type === 'accommodation') {
      setAccommodationForm({ type: '', price: '', pricePerDay: 0, occupancy: '', amenities: '', image: '', availableRooms: 50, venue: '', contacts: '' });
    }
    setModalOpen(true);
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Payment Status', 'Amount Paid', 'Date Registered'];
    const rows = filteredRegistrations.map(r => [
      r.userDetails.fullName,
      r.userDetails.email,
      r.userDetails.phone,
      r.userDetails.college,
      r.payment.status,
      r.payment.amount,
      new Date(r.registeredAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registrations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for Overview Tab
  const totalRevenue = registrations
    .filter(r => r.payment.status === 'success')
    .reduce((sum, r) => sum + r.payment.amount, 0);

  const successfulRegistrations = registrations.filter(r => r.payment.status === 'success').length;

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      r.userDetails.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.userDetails.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.userDetails.phone.includes(searchQuery) ||
      r.userDetails.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPayment = paymentFilter === 'all' || r.payment.status === paymentFilter;

    let matchesItemType = true;
    if (itemTypeFilter === 'workshops') {
      matchesItemType = !!(r.itemsSelected?.workshops && r.itemsSelected.workshops.length > 0);
    } else if (itemTypeFilter === 'competitions') {
      matchesItemType = !!(r.itemsSelected?.competitions && r.itemsSelected.competitions.length > 0);
    } else if (itemTypeFilter === 'accommodation') {
      matchesItemType = !!(r.itemsSelected?.accommodation && r.itemsSelected.accommodation.option);
    }

    return matchesSearch && matchesPayment && matchesItemType;
  });

  return (
    <div className="min-h-screen flex bg-slate-950 text-white font-montserrat">
      {/* 1. Sidebar Nav */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between py-6">
        <div>
          <div className="px-6 mb-8">
            <h1 className="text-xl font-bold tracking-wider text-sky-400">ADHYAYAN 2026</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">Console</p>
          </div>
          
          <nav className="space-y-1.5 px-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('workshops')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'workshops' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Workshops
            </button>

            <button
              onClick={() => setActiveTab('competitions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'competitions' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Trophy className="h-5 w-5" />
              Competitions
            </button>

            <button
              onClick={() => setActiveTab('accommodation')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'accommodation' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Hotel className="h-5 w-5" />
              Accommodation Options
            </button>

            <button
              onClick={() => setActiveTab('accommodation-bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'accommodation-bookings' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Hotel className="h-5 w-5" />
              Acc. Bookings
            </button>

            <button
              onClick={() => setActiveTab('registrations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'registrations' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5" />
              Registrations
            </button>
          </nav>
        </div>

        <div className="px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* 2. Main Content Dashboard Panel */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-950">
        
        {/* Render Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Overview Dashboard</h2>
              <p className="text-slate-400 text-sm mt-1">Real-time statistics & activity logs</p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase font-semibold">Total Revenue</p>
                <h3 className="text-3xl font-black text-sky-400 mt-2 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-sky-400" />
                  ₹{totalRevenue.toLocaleString()}
                </h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase font-semibold">Successful Registrations</p>
                <h3 className="text-3xl font-black text-white mt-2">{successfulRegistrations}</h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase font-semibold">Active Workshops</p>
                <h3 className="text-3xl font-black text-white mt-2">{workshops.length}</h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase font-semibold">Active Competitions</p>
                <h3 className="text-3xl font-black text-white mt-2">{competitions.length}</h3>
              </div>
            </div>

            {/* Recent activity list */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {registrations.slice(0, 5).map(reg => (
                  <div key={reg._id} className="flex justify-between items-center p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                    <div>
                      <p className="font-semibold text-white">{reg.userDetails.fullName}</p>
                      <p className="text-slate-500 text-xs">{reg.userDetails.college} | {new Date(reg.registeredAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sky-400">₹{reg.payment.amount}</p>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        reg.payment.status === 'success' ? 'bg-green-500/10 text-green-400' : reg.payment.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {reg.payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Tab 2: Workshops CRUD */}
        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Manage Workshops</h2>
                <p className="text-slate-400 text-sm mt-1">Configure user-facing workshops and track filled slots</p>
              </div>
              <button 
                onClick={() => openCreateModal('workshop')}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Workshop
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshops.map(w => (
                <div key={w._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-lg font-bold text-white leading-tight">{w.title}</h3>
                      <span className="shrink-0 inline-block px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-sky-500/10 text-sky-400">
                        {w.category || 'General'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-3 mb-4">{w.description}</p>
                    
                    <div className="space-y-2 text-xs text-slate-300 mb-3">
                      <p><strong>Speaker:</strong> {w.speaker}</p>
                      <p><strong>Price:</strong> ₹{w.price}</p>
                      <p><strong>Overall:</strong> {w.slotsFilled} / {w.slotsTotal} filled</p>
                    </div>

                    {/* Per-slot booking bars */}
                    {w.slots && w.slots.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Slot Bookings</p>
                        {w.slots.map((slot, idx) => {
                          const pct = slot.slotsTotal > 0 ? Math.min(100, Math.round((slot.slotsFilled / slot.slotsTotal) * 100)) : 0;
                          return (
                            <div key={idx}>
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[10px] text-slate-400 truncate max-w-[70%]">{slot.label}</span>
                                <span className="text-[10px] font-bold text-sky-400">{slot.slotsFilled}/{slot.slotsTotal}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-400' : 'bg-sky-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex border-t border-slate-800 p-4 gap-2 bg-slate-950/40">
                    <button 
                      onClick={() => openEditModal('workshop', w)}
                      className="flex-1 inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg text-xs transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('workshop', w._id)}
                      className="inline-flex justify-center items-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Tab 3: Competitions CRUD */}
        {activeTab === 'competitions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Manage Competitions</h2>
                <p className="text-slate-400 text-sm mt-1">Configure user-facing academic and medical competitions</p>
              </div>
              <button 
                onClick={() => openCreateModal('competition')}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Competition
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {competitions.map(c => (
                <div key={c._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-lg font-bold text-white leading-tight">{c.title}</h3>
                      <span className="shrink-0 inline-block px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-sky-500/10 text-sky-400">
                        {c.category || 'General'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-3 mb-4">{c.description}</p>
                    
                    <div className="space-y-2 text-xs text-slate-300 mb-3">
                      <p><strong>Prize Pool:</strong> {c.prizePool || 'TBA'}</p>
                      <p><strong>Price:</strong> ₹{c.price}</p>
                      <p><strong>Team Size:</strong> {c.teamSize?.min} - {c.teamSize?.max} members</p>
                    </div>

                    {/* Per-slot booking bars */}
                    {c.slots && c.slots.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Slot Bookings</p>
                        {c.slots.map((slot, idx) => {
                          const pct = slot.slotsTotal > 0 ? Math.min(100, Math.round((slot.slotsFilled / slot.slotsTotal) * 100)) : 0;
                          return (
                            <div key={idx}>
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[10px] text-slate-400 truncate max-w-[70%]">{slot.label}</span>
                                <span className="text-[10px] font-bold text-sky-400">{slot.slotsFilled}/{slot.slotsTotal}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-400' : 'bg-sky-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex border-t border-slate-800 p-4 gap-2 bg-slate-950/40">
                    <button 
                      onClick={() => openEditModal('competition', c)}
                      className="flex-1 inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg text-xs transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('competition', c._id)}
                      className="inline-flex justify-center items-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Tab 4: Accommodation CRUD */}
        {activeTab === 'accommodation' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Manage Accommodation</h2>
                <p className="text-slate-400 text-sm mt-1">Configure room slots and daily booking rates</p>
              </div>
              <button 
                onClick={() => openCreateModal('accommodation')}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Room Option
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accommodation.map(a => (
                <div key={a._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{a.type}</h3>
                    <p className="text-slate-400 text-xs line-clamp-3 mb-4">{a.occupancy}</p>
                    
                    <div className="space-y-2 text-xs text-slate-300">
                      <p><strong>Price:</strong> {a.price}</p>
                      <p><strong>Available Rooms:</strong> {a.availableRooms}</p>
                    </div>
                  </div>
                  
                  <div className="flex border-t border-slate-800 p-4 gap-2 bg-slate-950/40">
                    <button 
                      onClick={() => openEditModal('accommodation', a)}
                      className="flex-1 inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg text-xs transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('accommodation', a._id)}
                      className="inline-flex justify-center items-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Tab 5: Registrations Table */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Registrations database</h2>
                <p className="text-slate-400 text-sm mt-1">Review ticket registers and payments</p>
              </div>
              
              <button 
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-xl font-semibold transition-all text-xs text-slate-200"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col md:flex-row gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, phone or college..."
                  className="w-full bg-slate-950/60 border border-slate-850 pl-10 pr-4 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <select
                value={itemTypeFilter}
                onChange={(e) => setItemTypeFilter(e.target.value as any)}
                className="bg-slate-950/60 border border-slate-850 px-4 py-2 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-sky-500/50"
              >
                <option value="all">All Booking Types</option>
                <option value="workshops">Workshops Only</option>
                <option value="competitions">Competitions Only</option>
                <option value="accommodation">Accommodation Only</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="bg-slate-950/60 border border-slate-850 px-4 py-2 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-sky-500/50"
              >
                <option value="all">All Payments</option>
                <option value="success">Success Only</option>
                <option value="pending">Pending Only</option>
                <option value="failed">Failed Only</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-950/45 border-b border-slate-800 text-slate-400 uppercase text-xs font-bold">
                    <th className="p-4">User Details</th>
                    <th className="p-4">College</th>
                    <th className="p-4">Items Booked</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRegistrations.map(r => (
                    <tr 
                      key={r._id} 
                      onClick={() => setSelectedRegDetails(r)}
                      className="hover:bg-slate-850/40 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-white">{r.userDetails.fullName}</div>
                        <div className="text-xs text-slate-500">{r.userDetails.email} | {r.userDetails.phone}</div>
                      </td>
                      <td className="p-4 text-slate-300">{r.userDetails.college}</td>
                      <td className="p-4">
                        <div className="space-y-1 text-xs text-slate-400">
                          {r.itemsSelected.workshops.map(w => <div key={w._id}>🔧 {w.title}</div>)}
                          {r.itemsSelected.competitions.map(c => <div key={c._id}>🏆 {c.title}</div>)}
                          {r.itemsSelected.accommodation?.option && (
                            <div>🏨 {r.itemsSelected.accommodation.option.type} ({r.itemsSelected.accommodation.days} Days)</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-sky-400">₹{r.payment.amount}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          r.payment.status === 'success' ? 'bg-green-500/10 text-green-400' : r.payment.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {r.payment.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Date(r.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Render Tab 6: Accommodation Bookings */}
        {activeTab === 'accommodation-bookings' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Accommodation Bookings</h2>
              <p className="text-slate-400 text-sm mt-1">Review list of guests allocated to hostel rooms</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-950/45 border-b border-slate-800 text-slate-400 uppercase text-xs font-bold">
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">College</th>
                    <th className="p-4">Room Type</th>
                    <th className="p-4">Check-in Date</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {registrations
                    .filter(r => r.itemsSelected?.accommodation?.option)
                    .map(r => (
                      <tr 
                        key={r._id} 
                        onClick={() => setSelectedRegDetails(r)}
                        className="hover:bg-slate-850/40 transition-colors cursor-pointer"
                      >
                        <td className="p-4 font-semibold text-white">
                          {r.userDetails.fullName}
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300">{r.userDetails.phone}</div>
                          <div className="text-xs text-slate-500">{r.userDetails.email}</div>
                        </td>
                        <td className="p-4 text-slate-300">{r.userDetails.college}</td>
                        <td className="p-4 text-sky-400 font-medium">
                          {r.itemsSelected.accommodation.option.type}
                        </td>
                        <td className="p-4 text-slate-300">
                          {r.itemsSelected.accommodation.checkIn || 'TBD'}
                        </td>
                        <td className="p-4 text-slate-300">
                          {r.itemsSelected.accommodation.days} Days
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            r.payment.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {r.payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  {registrations.filter(r => r.itemsSelected?.accommodation?.option).length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No accommodation bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 3. CRUD Manage Modals */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold mb-6">
              {editingItem ? 'Edit' : 'Create'} {modalType === 'workshop' ? 'Workshop' : modalType === 'competition' ? 'Competition' : 'Accommodation Option'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-6">
              
              {/* Workshop Form Controls */}
              {modalType === 'workshop' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Title</label>
                      <input 
                        type="text" required
                        value={workshopForm.title}
                        onChange={e => setWorkshopForm({ ...workshopForm, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Description</label>
                      <textarea 
                        required rows={3}
                        value={workshopForm.description}
                        onChange={e => setWorkshopForm({ ...workshopForm, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Speaker</label>
                        <input 
                          type="text" required
                          value={workshopForm.speaker}
                          onChange={e => setWorkshopForm({ ...workshopForm, speaker: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Category</label>
                        <div className="flex gap-2">
                          {!isCustomCategory ? (
                            <select
                              value={workshopForm.category}
                              onChange={e => {
                                if (e.target.value === '__custom__') {
                                  setIsCustomCategory(true);
                                  setCustomCategory('');
                                } else {
                                  setWorkshopForm({ ...workshopForm, category: e.target.value });
                                }
                              }}
                              className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50 text-white"
                            >
                              {Array.from(new Set(workshops.map(w => w.category || 'General'))).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                              <option value="__custom__">+ Add Custom Category</option>
                            </select>
                          ) : (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                placeholder="New Category Name"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCustomCategory(false);
                                  setWorkshopForm({ ...workshopForm, category: 'General' });
                                }}
                                className="px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Price (INR)</label>
                        <input 
                          type="number" required
                          value={workshopForm.price}
                          onChange={e => setWorkshopForm({ ...workshopForm, price: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Total Capacity</label>
                        <input 
                          type="number" required
                          value={workshopForm.slotsTotal}
                          onChange={e => setWorkshopForm({ ...workshopForm, slotsTotal: parseInt(e.target.value) || 100 })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Workshop Image</label>
                      <div className="flex flex-col gap-2">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert('Image size exceeds 2MB limit. Please choose a smaller image.');
                                e.target.value = '';
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setWorkshopForm({ ...workshopForm, image: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-sm focus:outline-none text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-black hover:file:bg-sky-400 cursor-pointer"
                        />
                        {workshopForm.image && (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-850 bg-slate-950/40">
                            <img src={workshopForm.image} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => setWorkshopForm({ ...workshopForm, image: '' })}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-400 text-white rounded-full p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Venue</label>
                        <input 
                          type="text"
                          value={workshopForm.venue}
                          onChange={e => setWorkshopForm({ ...workshopForm, venue: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Date</label>
                        <input 
                          type="text" placeholder="e.g. July 10"
                          value={workshopForm.date}
                          onChange={e => setWorkshopForm({ ...workshopForm, date: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Time</label>
                        <input 
                          type="text" placeholder="e.g. 10:00 AM"
                          value={workshopForm.time}
                          onChange={e => setWorkshopForm({ ...workshopForm, time: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Topics Covered (One per line)</label>
                      <textarea 
                        rows={3} placeholder="Know your glasses&#10;Anterior segment examination..."
                        value={workshopForm.topics}
                        onChange={e => setWorkshopForm({ ...workshopForm, topics: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    {/* ─── Slot Builder ─── */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase">Time Slots &amp; Capacity</label>
                        <button
                          type="button"
                          onClick={() => setSlotRows(prev => [...prev, { label: '', slotsTotal: 50 }])}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold hover:bg-sky-500/20 transition-all"
                        >
                          <Plus className="h-3 w-3" /> Add Slot
                        </button>
                      </div>
                      {slotRows.length === 0 && (
                        <p className="text-xs text-slate-600 italic py-2">No slots added yet. Click "Add Slot" to define time slots with capacity.</p>
                      )}
                      <div className="space-y-2">
                        {slotRows.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-xl">
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="e.g. 9:00 AM – 1:00 PM"
                                value={slot.label}
                                onChange={e => setSlotRows(prev => prev.map((s, i) => i === idx ? { ...s, label: e.target.value } : s))}
                                className="w-full bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] text-slate-500 font-semibold">MAX</span>
                              <input
                                type="number"
                                min={1}
                                value={slot.slotsTotal}
                                onChange={e => setSlotRows(prev => prev.map((s, i) => i === idx ? { ...s, slotsTotal: parseInt(e.target.value) || 1 } : s))}
                                className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-sky-500/60"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setSlotRows(prev => prev.filter((_, i) => i !== idx))}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Coordinators (Format Name: Phone | One per line)</label>
                      <textarea 
                        rows={2} placeholder="Surya: 8639630928&#10;Rahul: 9398362706..."
                        value={workshopForm.contacts}
                        onChange={e => setWorkshopForm({ ...workshopForm, contacts: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Competition Form Controls */}
              {modalType === 'competition' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Title</label>
                      <input 
                        type="text" required
                        value={competitionForm.title}
                        onChange={e => setCompetitionForm({ ...competitionForm, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Description</label>
                      <textarea 
                        required rows={3}
                        value={competitionForm.description}
                        onChange={e => setCompetitionForm({ ...competitionForm, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Rules (One per line)</label>
                      <textarea 
                        rows={3} placeholder="Enter rules separated by newlines..."
                        value={competitionForm.rules}
                        onChange={e => setCompetitionForm({ ...competitionForm, rules: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Guidelines (One per line)</label>
                      <textarea 
                        rows={3} placeholder="Judged on argumentation relevance...&#10;Slide limits guidelines..."
                        value={competitionForm.guidelines}
                        onChange={e => setCompetitionForm({ ...competitionForm, guidelines: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Competition Image</label>
                      <div className="flex flex-col gap-2">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert('Image size exceeds 2MB limit. Please choose a smaller image.');
                                e.target.value = '';
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCompetitionForm({ ...competitionForm, image: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-sm focus:outline-none text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-black hover:file:bg-sky-400 cursor-pointer"
                        />
                        {competitionForm.image && (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-850 bg-slate-950/40">
                            <img src={competitionForm.image} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => setCompetitionForm({ ...competitionForm, image: '' })}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-400 text-white rounded-full p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Price (INR)</label>
                        <input 
                          type="number" required
                          value={competitionForm.price}
                          onChange={e => setCompetitionForm({ ...competitionForm, price: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Min Team</label>
                        <input 
                          type="number" required
                          value={competitionForm.minTeam}
                          onChange={e => setCompetitionForm({ ...competitionForm, minTeam: parseInt(e.target.value) || 1 })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Max Team</label>
                        <input 
                          type="number" required
                          value={competitionForm.maxTeam}
                          onChange={e => setCompetitionForm({ ...competitionForm, maxTeam: parseInt(e.target.value) || 1 })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Prize Pool</label>
                        <input 
                          type="text" placeholder="e.g. ₹50,000 Worth"
                          value={competitionForm.prizePool}
                          onChange={e => setCompetitionForm({ ...competitionForm, prizePool: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Category</label>
                        <div className="flex gap-2">
                          {!isCustomCategory ? (
                            <select
                              value={competitionForm.category}
                              onChange={e => {
                                if (e.target.value === '__custom__') {
                                  setIsCustomCategory(true);
                                  setCustomCategory('');
                                } else {
                                  setCompetitionForm({ ...competitionForm, category: e.target.value });
                                }
                              }}
                              className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50 text-white"
                            >
                              {Array.from(new Set(['Active Events', 'Passive Events', 'Competitions', ...competitions.map(c => c.category || 'Active Events')])).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                              <option value="__custom__">+ Add Custom Category</option>
                            </select>
                          ) : (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                placeholder="New Category Name"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCustomCategory(false);
                                  setCompetitionForm({ ...competitionForm, category: 'Active Events' });
                                }}
                                className="px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Seminar Topics (One per line)</label>
                      <textarea 
                        rows={3} placeholder="Chronic Kidney Disease&#10;Ischemic Stroke..."
                        value={competitionForm.topics}
                        onChange={e => setCompetitionForm({ ...competitionForm, topics: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Judging Criteria (One per line)</label>
                        <textarea 
                          rows={2} placeholder="Scientific accuracy - 10 marks&#10;Public speaking - 10 marks..."
                          value={competitionForm.judgingCriteria}
                          onChange={e => setCompetitionForm({ ...competitionForm, judgingCriteria: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Coordinators (Format Name: Phone | One per line)</label>
                        <textarea 
                          rows={2} placeholder="Harikrishna: 9182545949&#10;Jaideep: 9010238700..."
                          value={competitionForm.contacts}
                          onChange={e => setCompetitionForm({ ...competitionForm, contacts: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                    {/* ─── Slot Builder ─── */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase">Sessions &amp; Capacity</label>
                        <button
                          type="button"
                          onClick={() => setSlotRows(prev => [...prev, { label: '', slotsTotal: 50 }])}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold hover:bg-sky-500/20 transition-all"
                        >
                          <Plus className="h-3 w-3" /> Add Session
                        </button>
                      </div>
                      {slotRows.length === 0 && (
                        <p className="text-xs text-slate-600 italic py-2">No sessions added yet. Click "Add Session" to define sessions with capacity.</p>
                      )}
                      <div className="space-y-2">
                        {slotRows.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-xl">
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="e.g. Morning Session"
                                value={slot.label}
                                onChange={e => setSlotRows(prev => prev.map((s, i) => i === idx ? { ...s, label: e.target.value } : s))}
                                className="w-full bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] text-slate-500 font-semibold">MAX</span>
                              <input
                                type="number"
                                min={1}
                                value={slot.slotsTotal}
                                onChange={e => setSlotRows(prev => prev.map((s, i) => i === idx ? { ...s, slotsTotal: parseInt(e.target.value) || 1 } : s))}
                                className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-sky-500/60"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setSlotRows(prev => prev.filter((_, i) => i !== idx))}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accommodation Form Controls */}
              {modalType === 'accommodation' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Room Type</label>
                      <input 
                        type="text" required placeholder="e.g. Girls Hostel (Triple Sharing)"
                        value={accommodationForm.type}
                        onChange={e => setAccommodationForm({ ...accommodationForm, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Price</label>
                      <input 
                        type="text" required placeholder="e.g. ₹500/head per day"
                        value={accommodationForm.price}
                        onChange={e => setAccommodationForm({ ...accommodationForm, price: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Price Per Day (Numeric)</label>
                      <input 
                        type="number" required placeholder="e.g. 500"
                        value={accommodationForm.pricePerDay}
                        onChange={e => setAccommodationForm({ ...accommodationForm, pricePerDay: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Available Rooms</label>
                      <input 
                        type="number" required
                        value={accommodationForm.availableRooms}
                        onChange={e => setAccommodationForm({ ...accommodationForm, availableRooms: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Occupancy Details</label>
                      <input 
                        type="text" placeholder="e.g. Triple Sharing Rooms"
                        value={accommodationForm.occupancy}
                        onChange={e => setAccommodationForm({ ...accommodationForm, occupancy: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Venue / Address</label>
                      <input 
                        type="text" placeholder="e.g. Andhra Medical College campus..."
                        value={accommodationForm.venue}
                        onChange={e => setAccommodationForm({ ...accommodationForm, venue: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Amenities (One per line)</label>
                      <textarea 
                        rows={3} placeholder="Ceiling Fan&#10;Attached Bathroom..."
                        value={accommodationForm.amenities}
                        onChange={e => setAccommodationForm({ ...accommodationForm, amenities: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Coordinators (Format Name: Phone | One per line)</label>
                      <textarea 
                        rows={3} placeholder="Sravya: 9392062600&#10;Prashanthi: 7032583272..."
                        value={accommodationForm.contacts}
                        onChange={e => setAccommodationForm({ ...accommodationForm, contacts: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-slate-400 text-xs font-semibold uppercase mb-1">Accommodation Image</label>
                    <div className="flex flex-col gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 2 * 1024 * 1024) {
                              alert('Image size exceeds 2MB limit. Please choose a smaller image.');
                              e.target.value = '';
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAccommodationForm({ ...accommodationForm, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-sm focus:outline-none text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-black hover:file:bg-sky-400 cursor-pointer"
                      />
                      {accommodationForm.image && (
                        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-850 bg-slate-950/40">
                          <img src={accommodationForm.image} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setAccommodationForm({ ...accommodationForm, image: '' })}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-400 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-6 py-3 bg-sky-500 hover:bg-sky-400 text-black font-semibold rounded-xl transition-all"
              >
                Save {modalType}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedRegDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto text-white">
            <button 
              onClick={() => setSelectedRegDetails(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-semibold uppercase tracking-wider border border-sky-500/20 mb-3">
                  Registration Details
                </span>
                <h3 className="text-2xl font-bold font-outfit text-white">
                  {selectedRegDetails.userDetails.fullName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Registered on {new Date(selectedRegDetails.registeredAt).toLocaleString()}
                </p>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-2 gap-6 p-5 bg-slate-950/50 border border-slate-800/80 rounded-2xl">
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email</span>
                  <a href={`mailto:${selectedRegDetails.userDetails.email}`} className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors">
                    {selectedRegDetails.userDetails.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone</span>
                  <a href={`tel:${selectedRegDetails.userDetails.phone}`} className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors">
                    {selectedRegDetails.userDetails.phone}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">College</span>
                  <span className="text-sm font-semibold text-slate-200">
                    {selectedRegDetails.userDetails.college}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Roll No / ID</span>
                  <span className="text-sm font-semibold text-slate-200">
                    {selectedRegDetails.userDetails.rollNo || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Preferences: Accommodation & Food */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Participant Preferences</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Accommodation Required */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                    selectedRegDetails.accommodationRequired === 'yes'
                      ? 'bg-sky-500/10 border-sky-500/30'
                      : 'bg-slate-950/40 border-slate-800/60'
                  }`}>
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      selectedRegDetails.accommodationRequired === 'yes'
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'bg-slate-800 text-slate-600'
                    }`}>
                      <BedDouble className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Accommodation</p>
                      <p className={`text-sm font-bold ${
                        selectedRegDetails.accommodationRequired === 'yes' ? 'text-sky-400' : 'text-slate-600'
                      }`}>
                        {selectedRegDetails.accommodationRequired === 'yes' ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  </div>

                  {/* Food Required */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                    selectedRegDetails.foodRequired === 'yes'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-950/40 border-slate-800/60'
                  }`}>
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      selectedRegDetails.foodRequired === 'yes'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-600'
                    }`}>
                      <UtensilsCrossed className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Food</p>
                      <p className={`text-sm font-bold ${
                        selectedRegDetails.foodRequired === 'yes' ? 'text-emerald-400' : 'text-slate-600'
                      }`}>
                        {selectedRegDetails.foodRequired === 'yes' ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Booked */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booked Items</h4>
                <div className="space-y-2">
                  {/* Workshops */}
                  {selectedRegDetails.itemsSelected.workshops && selectedRegDetails.itemsSelected.workshops.length > 0 && (
                    <div className="p-4 bg-slate-950/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-2 font-outfit">Workshops</span>
                      <ul className="space-y-1 text-sm text-slate-300">
                        {selectedRegDetails.itemsSelected.workshops.map(w => (
                          <li key={w._id} className="flex justify-between items-center py-1 border-b border-slate-850 last:border-0">
                            <span>🔧 {w.title}</span>
                            <span className="text-slate-400">₹{w.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Competitions */}
                  {selectedRegDetails.itemsSelected.competitions && selectedRegDetails.itemsSelected.competitions.length > 0 && (
                    <div className="p-4 bg-slate-950/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-2 font-outfit">Competitions</span>
                      <ul className="space-y-1 text-sm text-slate-300">
                        {selectedRegDetails.itemsSelected.competitions.map(c => (
                          <li key={c._id} className="flex justify-between items-center py-1 border-b border-slate-850 last:border-0">
                            <span>🏆 {c.title}</span>
                            <span className="text-slate-400">₹{c.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accommodation */}
                  {selectedRegDetails.itemsSelected.accommodation && selectedRegDetails.itemsSelected.accommodation.option && (
                    <div className="p-4 bg-slate-950/30 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-2 font-outfit">Accommodation</span>
                      <div className="text-sm text-slate-300 space-y-1">
                        <div className="flex justify-between items-center">
                          <span>🏨 {selectedRegDetails.itemsSelected.accommodation.option.type}</span>
                          <span className="text-slate-400">₹{selectedRegDetails.itemsSelected.accommodation.option.pricePerDay} / day</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                          <span>Check-in: {selectedRegDetails.itemsSelected.accommodation.checkIn ? new Date(selectedRegDetails.itemsSelected.accommodation.checkIn).toLocaleDateString() : 'N/A'}</span>
                          <span>Duration: {selectedRegDetails.itemsSelected.accommodation.days} Days</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Details</h4>
                <div className="p-5 bg-slate-950/50 border border-slate-800/80 rounded-2xl space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Amount Paid</span>
                    <span className="text-base font-bold text-sky-400">₹{selectedRegDetails.payment.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Order ID</span>
                    <span className="font-mono text-xs text-slate-300">{selectedRegDetails.payment.orderId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Payment ID</span>
                    <span className="font-mono text-xs text-slate-300">{selectedRegDetails.payment.paymentId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Payment Status</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedRegDetails.payment.status === 'success' ? 'bg-green-500/10 text-green-400' : selectedRegDetails.payment.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {selectedRegDetails.payment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
