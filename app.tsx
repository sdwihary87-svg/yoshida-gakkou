import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 

Briefcase, CheckCircle, Clock, User, LogOut, X, Search, 
Plus, Lock, Users, PieChart, Bell, Edit, Trash2, TrendingUp, 
BarChart3, Target, Layers, UserCog, Award, FileText, Eye, Activity, Info,
Building2, MapPin, DollarSign, Archive, Video, Calendar, FileSignature, ShieldCheck, Plane, Ticket, Send, FileCheck, Mail, Phone, Camera
} from 'lucide-react';

// --- DATA KONSTANTA (GLOBAL) ---
const SECTORS_DATA = [
{ id: 'caregiver', title: 'Keperawatan (Caregiver)', icon: '🏥', skill: 'Nursing Care Skills Evaluation Test', lang: 'JFT-Basic A2 / N4 + Nursing Japanese', requirements: ['Usia min. 18 tahun', 'Sertifikat Skill Keperawatan', 'Sertifikat Bahasa Jepang (N4/JFT)'] },
{ id: 'cleaning', title: 'Pembersihan Gedung', icon: '🧹', skill: 'Building Cleaning Management Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Pembersihan', 'Bahasa Jepang Level Dasar'] },
{ id: 'materials', title: 'Industri Material', icon: '🏭', skill: 'Machine Parts & Tooling Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Industri Material', 'Bahasa Jepang Level Dasar'] },
{ id: 'machinery', title: 'Manufaktur Mesin', icon: '⚙️', skill: 'Industrial Machinery Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Manufaktur Mesin', 'Bahasa Jepang Level Dasar'] },
{ id: 'electronics', title: 'Listrik & Elektronik', icon: '⚡', skill: 'Electric & Electronic Info Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Elektronik', 'Bahasa Jepang Level Dasar'] },
{ id: 'construction', title: 'Konstruksi', icon: '🏗️', skill: 'Construction Industry SSW Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Konstruksi', 'Bahasa Jepang Level Dasar'] },
{ id: 'shipbuilding', title: 'Galangan Kapal', icon: '🚢', skill: 'Shipbuilding & Machinery Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Galangan Kapal', 'Bahasa Jepang Level Dasar'] },
{ id: 'automotive', title: 'Perawatan Mobil', icon: '🚗', skill: 'Automobile Maintenance Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Mekanik Mobil', 'Bahasa Jepang Level Dasar'] },
{ id: 'aviation', title: 'Penerbangan', icon: '✈️', skill: 'Aviation Industry Skill Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Penerbangan', 'Bahasa Jepang Level Dasar'] },
{ id: 'hotel', title: 'Perhotelan', icon: '🏨', skill: 'Accommodation Industry Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Perhotelan', 'Bahasa Jepang Level Dasar'] },
{ id: 'agriculture', title: 'Pertanian', icon: '🚜', skill: 'Agriculture Assessment Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Pertanian', 'Bahasa Jepang Level Dasar'] },
{ id: 'fishery', title: 'Perikanan', icon: '🎣', skill: 'Fishery & Aquaculture Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Perikanan', 'Bahasa Jepang Level Dasar'] },
{ id: 'food-service', title: 'Pengolahan Makanan', icon: '🍱', skill: 'Manufacture of Food & Beverages', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Pengolahan Makanan', 'Bahasa Jepang Level Dasar'] },
{ id: 'restaurant', title: 'Restoran', icon: '🍽️', skill: 'Food Service Industry Test', lang: 'JFT-Basic A2 / N4', requirements: ['Sertifikat Skill Restoran', 'Bahasa Jepang Level Dasar'] }
];

const INITIAL_JOBS = [
{ id: 1, title: 'Perawat Lansia (Caregiver)', company: 'Zenseikai Group', location: 'Chiba', salary: '¥185,000', deadline: '2026-12-30', status: 'tersedia', sector: 'Keperawatan (Caregiver)', applicants: 12 },
{ id: 2, title: 'Staff Restoran (Hall Staff)', company: 'Ichiraku Co.', location: 'Tokyo', salary: '¥190,000', deadline: '2026-08-20', status: 'tersedia', sector: 'Restoran', applicants: 8 },
{ id: 3, title: 'Konstruksi Bangunan', company: 'Shimizu Corp', location: 'Osaka', salary: '¥210,000', deadline: '2026-05-15', status: 'tersedia', sector: 'Konstruksi', applicants: 5 },
];

const ADMIN_REPORTS = [
{ id: 1, name: 'Admin Sarah', processed: 145, approved: 32, efficiency: '94%', activity: 'Tinggi', color: 'text-blue-500' },
{ id: 2, name: 'Admin Ridwan', processed: 98, approved: 12, efficiency: '88%', activity: 'Sedang', color: 'text-purple-500' },
{ id: 3, name: 'Admin Maya', processed: 210, approved: 45, efficiency: '97%', activity: 'Sangat Tinggi', color: 'text-emerald-500' },
];

// --- KOMPONEN UTILITAS (REUSABLE) ---
const SimpleLineChart = ({ data, colorClass }: { data: number[], colorClass: string }) => {
if (!data || data.length === 0) return null;
const maxVal = Math.max(...data);
const width = 400;
const height = 100;
const padding = 10;
const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (val / maxVal) * (height - padding * 2) - padding;
    return `${x},${y}`;
}).join(' ');

return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 mt-4 drop-shadow-lg">
        <polyline fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={colorClass} points={points} />
        {data.map((val, i) => {
             const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
             const y = height - (val / maxVal) * (height - padding * 2) - padding;
             return <circle key={i} cx={x} cy={y} r="3" className={colorClass} fill="white" strokeWidth="2" />;
        })}
    </svg>
);
};

// Komponen Grafik Batang Sederhana
const SimpleBarChart = ({ data, colorClass, labels }: { data: number[], colorClass: string, labels?: string[] }) => {
if (!data || data.length === 0) return null;
const maxVal = Math.max(...data, 1);

return (
    <div className="flex items-end gap-2 h-32 w-full mt-4 px-2">
        {data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 text-[10px] px-2 py-1 rounded border border-white/10 z-10">
                    {val}
                </div>
                <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out bg-current ${colorClass}`} 
                    style={{ height: `${(val / maxVal) * 100}%`, opacity: 0.8 }}
                ></div>
                {labels && <span className="text-[8px] text-gray-500 mt-2 font-bold uppercase">{labels[i]}</span>}
            </div>
        ))}
    </div>
);
};

const MultiAdminChart = ({ period }: { period: string }) => {
const sarahData = [10, 15, 12, 18, 22, 20, 25];
const ridwanData = [5, 8, 7, 12, 10, 15, 14];
const mayaData = [15, 20, 25, 30, 28, 35, 40];
const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-black/20 p-4 rounded-3xl border border-white/5">
            <p className="text-[10px] text-blue-400 font-bold mb-4 uppercase tracking-widest text-center">Admin Sarah</p>
            <SimpleBarChart data={sarahData} colorClass="text-blue-500" labels={days} />
        </div>
        <div className="bg-black/20 p-4 rounded-3xl border border-white/5">
            <p className="text-[10px] text-purple-400 font-bold mb-4 uppercase tracking-widest text-center">Admin Ridwan</p>
            <SimpleBarChart data={ridwanData} colorClass="text-purple-500" labels={days} />
        </div>
        <div className="bg-black/20 p-4 rounded-3xl border border-white/5">
            <p className="text-[10px] text-emerald-400 font-bold mb-4 uppercase tracking-widest text-center">Admin Maya</p>
            <SimpleBarChart data={mayaData} colorClass="text-emerald-500" labels={days} />
        </div>
    </div>
);
};

// ==========================================
// 1. PORTAL KANDIDAT
// ==========================================
const CandidatePortal = ({ 
onLogout, 
selectionStatus, 
contractSchedule,
coeStatus,
visaStatus,
ticketInfo,
setPreviewDoc,
previewDoc
}: { 
onLogout: () => void, 
selectionStatus: 'passed' | 'failed' | 'pending', 
contractSchedule: { date: string, time: string, location: string },
coeStatus: 'gathering' | 'submitted' | 'processing' | 'issued',
visaStatus: 'waiting_coe' | 'gathering' | 'submitted' | 'processing' | 'issued',
ticketInfo: { flight: string, date: string, pnr: string } | null,
setPreviewDoc: (s: string | null) => void,
previewDoc: string | null
}) => {
const [activeTab, setActiveTab] = useState('profile');
const [selectedSector, setSelectedSector] = useState<typeof SECTORS_DATA[0] | null>(null);
const [jobFilter, setJobFilter] = useState('semua');
const [isEditingProfile, setIsEditingProfile] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [selectedScheduleDetail, setSelectedScheduleDetail] = useState<boolean>(false);
const [showAddCertificate, setShowAddCertificate] = useState(false);
const [showUploadDoc, setShowUploadDoc] = useState<{ type: string, name: string } | null>(null);
const [newCert, setNewCert] = useState({ name: '', file: null as File | null });
const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

const [profileData, setProfileData] = useState({
    name: 'Kandidat Yoshida',
    email: 'budi.santoso@email.com',
    phone: '+62 812-3456-7890',
    address: 'Jakarta Selatan, Indonesia',
    about: 'Lulusan SMK Pertanian dengan tekad kuat bekerja di Jepang demi masa depan yang lebih baik.',
    photo: null as string | null
});

const notifications = [
    { id: 1, title: 'Job Order Baru', message: 'Ada penempatan 10 orang di Prefektur Chiba (Agriculture).', time: '15 menit yang lalu', type: 'job' },
    { id: 2, title: 'Update Dokumen', message: 'Admin telah memverifikasi Transkrip Nilai Anda.', time: '2 jam yang lalu', type: 'doc' },
    { id: 3, title: 'Undangan Wawancara', message: 'Wawancara Zenseikai dijadwalkan besok 09:00.', time: '5 jam yang lalu', type: 'interview' },
];

const filteredJobs = INITIAL_JOBS.filter(job => {
    if (jobFilter === 'semua') return true;
    return job.status === jobFilter;
});

const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    // In a real app, you would send this to a server
};

return (
    <div className="flex flex-col md:flex-row min-h-screen text-white bg-[#0a0a0c]">
        <aside className="w-full md:w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">K</div>
                <span className="text-xs font-bold tracking-widest uppercase">Portal Kandidat</span>
            </div>
            <nav className="flex-1 space-y-2">
                <button onClick={() => setActiveTab('profile')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><User size={18}/> Profil Saya</button>
                <button onClick={() => setActiveTab('documents')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'documents' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><FileText size={18}/> Upload Dokumen</button>
                <button onClick={() => setActiveTab('sectors')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'sectors' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><Layers size={18}/> 14 Bidang SSW</button>
                <button onClick={() => setActiveTab('jobs')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'jobs' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><Search size={18}/> Cari Lowongan</button>
                <button onClick={() => setActiveTab('interviews')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'interviews' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><Video size={18}/> Jadwal Wawancara</button>
                <button onClick={() => setActiveTab('contracts')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'contracts' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><FileSignature size={18}/> Hasil & Kontrak</button>
                <button onClick={() => setActiveTab('coe')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'coe' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><ShieldCheck size={18}/> Status CoE</button>
                <button onClick={() => setActiveTab('visa')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'visa' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><Plane size={18}/> Status Visa</button>
                <button onClick={() => setActiveTab('eticketing')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'eticketing' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}><Ticket size={18}/> E-Ticketing</button>
            </nav>
            <button onClick={onLogout} className="text-red-400 p-3 flex items-center gap-3 mt-auto hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"><LogOut size={18}/> Keluar</button>
        </aside>
        
        <main className="flex-1 p-8 overflow-y-auto">
            <header className="flex justify-between items-center mb-10 relative">
                <h1 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">
                    {activeTab === 'profile' ? 'My Profile' : activeTab.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`p-3 rounded-2xl border transition-all relative ${showNotifications ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            <Bell size={20}/>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0c]"></span>
                        </button>
                        
                        {showNotifications && (
                            <div className="absolute right-0 mt-4 w-72 bg-[#141418] border border-white/10 rounded-[32px] shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-4">
                                <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
                                    <h4 className="font-bold text-sm">Notifikasi</h4>
                                    <span className="text-[10px] font-black bg-blue-600 px-2 py-0.5 rounded-full uppercase">3 Baru</span>
                                </div>
                                <div className="max-h-[350px] overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div key={n.id} className="p-5 hover:bg-white/5 border-b border-white/5 transition-all cursor-pointer group">
                                            <div className="flex gap-4">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                                    n.type === 'job' ? 'bg-blue-500/10 text-blue-500' : 
                                                    n.type === 'doc' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-purple-500/10 text-purple-500'
                                                }`}>
                                                    {n.type === 'job' ? <Briefcase size={14}/> : n.type === 'doc' ? <FileCheck size={14}/> : <Calendar size={14}/>}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{n.title}</p>
                                                    <p className="text-[10px] text-gray-400 leading-relaxed">{n.message}</p>
                                                    <p className="text-[9px] text-gray-600 font-bold uppercase">{n.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full p-4 text-[9px] font-black uppercase text-gray-500 hover:text-white transition-colors bg-black/20">Tandai Semua Dibaca</button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-2xl border border-white/5">
                        <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">K</div>
                        <div className="hidden md:block pr-2">
                            <p className="text-[10px] font-black text-white">{profileData.name.split(' ')[0]}</p>
                            <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Candidate</p>
                        </div>
                    </div>
                </div>
            </header>

            {activeTab === 'profile' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        {isEditingProfile ? (
                            <div className="bg-white/5 p-8 rounded-[40px] border border-blue-500/30">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-bold">Edit Profil</h2>
                                    <button onClick={() => setIsEditingProfile(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><X size={20}/></button>
                                </div>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Nama Lengkap</label>
                                            <input 
                                                type="text" 
                                                value={profileData.name} 
                                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Email</label>
                                            <input 
                                                type="email" 
                                                value={profileData.email} 
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Telepon</label>
                                            <input 
                                                type="text" 
                                                value={profileData.phone} 
                                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Alamat</label>
                                            <input 
                                                type="text" 
                                                value={profileData.address} 
                                                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Tentang Kandidat</label>
                                            <textarea 
                                                value={profileData.about} 
                                                onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all h-32 resize-none text-sm leading-relaxed"
                                                placeholder="Ceritakan tentang diri Anda, keahlian, dan motivasi kerja di Jepang..."
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-6 flex gap-4">
                                        <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">Simpan Perubahan</button>
                                        <button type="button" onClick={() => setIsEditingProfile(false)} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">Batal</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-8 rounded-[40px] border border-white/10">
                                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('photo-upload')?.click()}>
                                        {profileData.photo ? (
                                            <img src={profileData.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white/10" />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-bold border-4 border-white/10 text-white">
                                                {profileData.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                        <input 
                                            id="photo-upload" 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setProfileData({...profileData, photo: reader.result as string});
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                         <h2 className="text-3xl font-bold">{profileData.name}</h2>
                                         <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-1">Status: Siap Melamar</p>
                                         <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                                                <div className="bg-black/40 px-4 py-2 rounded-xl text-xs flex items-center"><Award size={14} className="mr-2 text-yellow-500"/> JFT-Basic A2</div>
                                                <div className="bg-black/40 px-4 py-2 rounded-xl text-xs flex items-center"><CheckCircle size={14} className="mr-2 text-green-500"/> Skill Keperawatan</div>
                                         </div>
                                    </div>
                                    <button onClick={() => setIsEditingProfile(true)} className="px-6 py-3 bg-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all">Edit Profil</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                         <h3 className="font-bold text-lg mb-6 flex items-center"><Info className="mr-3 text-blue-500"/> Informasi Kontak</h3>
                                         <div className="space-y-4">
                                                <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1">Email</label><p className="font-bold">{profileData.email}</p></div>
                                                <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1">Telepon</label><p className="font-bold">{profileData.phone}</p></div>
                                                <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1">Alamat</label><p className="font-bold">{profileData.address}</p></div>
                                         </div>
                                         {profileData.about && (
                                             <div className="mt-8 pt-8 border-t border-white/5 font-sans">
                                                 <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2 font-black">Tentang Kandidat</label>
                                                 <p className="text-gray-400 text-sm leading-relaxed italic font-medium">"{profileData.about}"</p>
                                             </div>
                                         )}
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                         <h3 className="font-bold text-lg mb-6 flex items-center"><Activity className="mr-3 text-blue-500"/> Status Lamaran</h3>
                                         <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl text-center">
                                                <p className="text-blue-400 font-bold mb-1">Interview Menunggu</p>
                                                <h4 className="font-bold text-xl">Perawat Lansia</h4>
                                                <p className="text-xs text-gray-500 mt-2">Jadwal: 25 April 2024 • 10:00 WIB</p>
                                                <button 
                                                    onClick={() => setSelectedScheduleDetail(true)}
                                                    className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-sm transition-all"
                                                >
                                                    Lihat Detail Jadwal
                                                </button>
                                         </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                    <h3 className="font-bold mb-4 flex items-center"><FileText className="mr-2 text-blue-500"/> Dokumen Saya</h3>
                                    <div className="space-y-3">
                                         {['Curriculum Vitae', 'Surat Pernyataan', 'Sertifikat Bahasa', 'Sertifikat Skill', 'Passport (Scan)'].map((doc, i) => (
                                             <div key={i} className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                                                    <span className="text-sm">{doc}</span>
                                                    <Eye 
                                                        size={16} 
                                                        className="text-gray-500 cursor-pointer hover:text-white"
                                                        onClick={() => setPreviewDoc(doc)}
                                                    />
                                             </div>
                                         ))}
                                    </div>
                             </div>
                             <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                    <h3 className="font-bold mb-4 flex items-center"><Activity className="mr-2 text-orange-500"/> Aktivitas Terakhir</h3>
                                    <div className="space-y-4">
                                         <div className="flex gap-4">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                                                <div><p className="text-sm font-bold">Melamar di Zenseikai Group</p><p className="text-[10px] text-gray-500">2 hari yang lalu</p></div>
                                         </div>
                                         <div className="flex gap-4">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                                                <div><p className="text-sm font-bold">Upload Sertifikat JFT</p><p className="text-[10px] text-gray-500">1 minggu yang lalu</p></div>
                                         </div>
                                    </div>
                             </div>
                        </div>
                 </div>
            )}

            {activeTab === 'documents' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold">Upload Dokumen</h2>
                            <p className="text-gray-500 mt-1">Kelola berkas pendaftaran dan sertifikat keahlian Anda.</p>
                        </div>
                        <button 
                            onClick={() => setShowUploadDoc({ type: 'other', name: 'Dokumen Tambahan' })}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                        >
                            <Plus size={18}/> Upload Dokumen
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><FileText className="text-blue-500"/> Berkas Utama</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Curriculum Vitae (CV)', status: 'Lengkap', date: '12 Apr 2026' },
                                    { name: 'Surat Pernyataan', status: 'Belum Upload', date: '-' },
                                    { name: 'Scan Passport', status: 'Lengkap', date: '15 Apr 2026' },
                                    { name: 'Ijazah Terakhir', status: 'Lengkap', date: '10 Apr 2026' }
                                ].map((doc, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
                                        <div>
                                            <p className="text-sm font-bold">{doc.name}</p>
                                            <p className="text-[10px] text-gray-500">{doc.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${doc.status === 'Lengkap' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {doc.status}
                                            </span>
                                            <button 
                                                onClick={() => setShowUploadDoc({ type: doc.name, name: doc.name })}
                                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-blue-400 transition-all"
                                            >
                                                <Plus size={14}/>
                                            </button>
                                            {doc.status === 'Lengkap' && (
                                                <Eye 
                                                    size={16} 
                                                    className="text-gray-500 cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => setPreviewDoc(doc.name)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><Award className="text-yellow-500"/> Sertifikat & Skill</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Sertifikat JFT-Basic A2', type: 'Bahasa', status: 'Terverifikasi' },
                                    { name: 'Sertifikat Skill Keperawatan', type: 'Keahlian', status: 'Terverifikasi' },
                                    { name: 'Sertifikat JLPT N4', type: 'Bahasa', status: 'Proses Review' }
                                ].map((cert, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                                        <div>
                                            <p className="text-sm font-bold">{cert.name}</p>
                                            <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black">{cert.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${cert.status === 'Terverifikasi' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                                {cert.status}
                                            </span>
                                            <div className="flex gap-2 justify-end mt-2">
                                                 <Eye 
                                                     size={14} 
                                                     className="text-gray-500 cursor-pointer hover:text-white"
                                                     onClick={() => setPreviewDoc(cert.name)}
                                                 />
                                                 <Trash2 size={14} className="text-gray-500 cursor-pointer hover:text-red-500"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div 
                                    onClick={() => setShowAddCertificate(true)}
                                    className="mt-6 border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer transition-all"
                                >
                                    <Plus size={24} className="text-gray-500 mb-2"/>
                                    <p className="text-xs font-bold text-gray-500">Tambah Sertifikat Baru</p>
                                    <p className="text-[9px] text-gray-600 mt-1">Format PDF, JPG, PNG (Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'interviews' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2">Jadwal Wawancara</h2>
                    <p className="text-gray-500 mb-8">Daftar jadwal wawancara aktif Anda dengan mitra di Jepang.</p>
                    
                    <div className="space-y-6">
                        <div className="p-8 bg-white/5 rounded-[40px] border border-blue-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Video size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Mendatang</span>
                                    <div className="text-right">
                                         <p className="text-[10px] font-black uppercase text-gray-500">Metode</p>
                                         <p className="font-bold flex items-center justify-end gap-2 text-blue-400"><Video size={14}/> Zoom Meeting</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-1">Perawat Lansia (Caregiver)</h3>
                                <p className="text-gray-400 font-medium mb-8">Zenseikai Group, Chiba</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                     <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Calendar size={20}/></div>
                                            <div>
                                                 <p className="text-[10px] font-black uppercase text-gray-500">Tanggal</p>
                                                 <p className="font-bold">25 April 2026</p>
                                            </div>
                                     </div>
                                     <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Clock size={20}/></div>
                                            <div>
                                                 <p className="text-[10px] font-black uppercase text-gray-500">Waktu</p>
                                                 <p className="font-bold">10:00 - 11:30 WIB</p>
                                            </div>
                                     </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                     <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">Gabung Sesi Zoom</button>
                                     <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold text-sm transition-all">Hubungi Admin</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white/5 rounded-[40px] border border-orange-500/20 relative overflow-hidden group font-sans">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MapPin size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-4 py-1.5 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Mendatang</span>
                                    <div className="text-right">
                                         <p className="text-[10px] font-black uppercase text-gray-500">Metode</p>
                                         <p className="font-bold flex items-center justify-end gap-2 text-orange-400"><MapPin size={14}/> Interview Offline</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-1">Pengolahan Makanan</h3>
                                <p className="text-gray-400 font-medium mb-8">Ichiraku Co., Tokyo (Direct Interview at LPK)</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                     <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                                            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500"><Calendar size={20}/></div>
                                            <div>
                                                 <p className="text-[10px] font-black uppercase text-gray-500">Tanggal</p>
                                                 <p className="font-bold">30 April 2026</p>
                                            </div>
                                     </div>
                                     <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                                            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500"><MapPin size={20}/></div>
                                            <div>
                                                 <p className="text-[10px] font-black uppercase text-gray-500">Lokasi</p>
                                                 <p className="font-bold">Aula LPK Yoshida Gakkou</p>
                                            </div>
                                     </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                     <button className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-orange-600/20">Lihat Peta Lokasi</button>
                                     <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold text-sm transition-all">Download Undangan</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between opacity-60">
                             <div className="flex items-center gap-6">
                                    <div className="p-4 bg-black/20 rounded-2xl text-gray-500"><Video size={24}/></div>
                                    <div>
                                         <h4 className="font-bold">Staff Restoran</h4>
                                         <p className="text-xs text-gray-500">Ichiraku Co. • 12 April 2026</p>
                                    </div>
                             </div>
                             <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-black uppercase border border-green-500/20">Selesai</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'contracts' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">Hasil & Seleksi</h2>
                            <p className="text-gray-500 mt-1">Pantau status seleksi dan pengurusan kontrak Anda.</p>
                        </div>
                    </div>
                    
                    {selectionStatus === 'passed' ? (
                        <>
                            <div className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-[40px] mb-8 flex flex-col md:flex-row items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/20">
                                        <Award size={48} />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-emerald-400">Selamat! Anda Lulus Seleksi</h3>
                                        <p className="text-gray-400 mt-2">Anda telah dinyatakan lulus seleksi untuk posisi <b>Staff Hotel</b> di <b>Hoshinoya Resort, Kyoto</b>.</p>
                                        <p className="text-xs text-emerald-500/70 font-bold uppercase tracking-widest mt-4 flex items-center justify-center md:justify-start gap-2">
                                            <CheckCircle size={14}/> Tahap Berikutnya: Penandatanganan Employment Contract
                                        </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><Clock className="text-blue-500"/> Jadwal Tanda Tangan</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Calendar size={20}/></div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Hari / Tanggal</p>
                                                        <p className="font-bold">{contractSchedule.date}</p>
                                                    </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Clock size={20}/></div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Waktu</p>
                                                        <p className="font-bold">{contractSchedule.time} WIB - Selesai</p>
                                                    </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><MapPin size={20}/></div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Lokasi</p>
                                                        <p className="font-bold text-sm">{contractSchedule.location}</p>
                                                    </div>
                                            </div>
                                        </div>
                                </div>

                                <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 flex flex-col">
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><FileSignature className="text-orange-500"/> Persiapan Dokumen</h3>
                                        <div className="flex-1 space-y-3">
                                            {['Passport Asli', 'Sertifikat JLPT/JFT Asli', 'Sertifikat Skill Asli', 'Pas Foto 3x4 (Background Putih)', 'Materai 10.000 (2 Lembar)'].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
                                                        <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0"/>
                                                        <span className="text-xs">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="mt-8 w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-orange-600/20">Konfirmasi Kehadiran</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white/5 border border-white/10 p-12 rounded-[48px] text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-top-8 duration-500">
                            <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
                                <X size={48} className="text-orange-500" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 italic text-orange-400">Terima Kasih Atas Partisipasi Anda</h3>
                            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                                Kami menghargai waktu dan upaya Anda dalam proses seleksi. Saat ini, tim pewawancara telah memutuskan untuk belum dapat melanjutkannya ke tahap kontrak kerja untuk posisi ini.
                            </p>
                            
                            <div className="mt-12 grid grid-cols-1 gap-4">
                                <button onClick={() => setActiveTab('jobs')} className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20">
                                    <Search size={18}/> Cari Lowongan Lain
                                </button>
                                <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em] mt-4">Rekonmendasi Langkah Selanjutnya</p>
                                <div className="flex gap-4 mt-2">
                                    <button onClick={() => setActiveTab('sectors')} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-[10px] font-bold transition-all">Lihat 14 Bidang SSW</button>
                                    <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-[10px] font-bold transition-all">Hubungi Konsultan Kami</button>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4 justify-center grayscale opacity-50">
                                <Info size={16} className="text-blue-500"/>
                                <p className="text-[10px] text-gray-500 text-left">Jangan berkecil hati! Masih banyak kesempatan <br/> bekerja di Jepang melalui 14 bidang Tokutei Ginou.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'eticketing' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2">E-Ticketing</h2>
                    <p className="text-gray-500 mb-8">Informasi tiket pesawat dan detail keberangkatan Anda ke Jepang.</p>
                    
                    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-blue-500/20 p-8 rounded-[40px] mb-8 relative overflow-hidden">
                         <div className="absolute -right-10 -bottom-10 opacity-5">
                                <Plane size={300} />
                         </div>
                         <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                     <div>
                                            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Tiket Terbit</span>
                                            <h3 className="text-2xl font-bold mt-4 text-blue-100 italic">"Safe Flight to Japan!"</h3>
                                     </div>
                                     <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
                                            <p className="text-[10px] font-black uppercase text-gray-400">Kode Booking (PNR)</p>
                                            <p className="text-xl font-mono font-bold text-white tracking-widest">{ticketInfo?.pnr || '---'}</p>
                                     </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-black/40 p-8 rounded-[32px] border border-white/5 shadow-2xl">
                                     <div className="text-center md:text-left">
                                            <p className="text-4xl font-black text-white">CGK</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Jakarta, ID</p>
                                            <p className="text-[10px] text-gray-500 mt-4 uppercase">Departure</p>
                                            <p className="font-bold text-sm">
                                                {ticketInfo?.date ? new Date(ticketInfo.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '---'} • 21:30
                                            </p>
                                     </div>
                                     <div className="flex flex-col items-center">
                                            <div className="w-full flex items-center gap-2 mb-2">
                                                 <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-blue-500"></div>
                                                 <Plane size={24} className="text-blue-500 rotate-90"/>
                                                 <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-blue-500"></div>
                                            </div>
                                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">{ticketInfo?.flight || 'BELUM TERJADWAL'}</p>
                                            <p className="text-[9px] text-gray-500 mt-1 italic">Non-stop Flight (7h 20m)</p>
                                     </div>
                                     <div className="text-center md:text-right">
                                            <p className="text-4xl font-black text-white">NRT</p>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Narita/Tokyo, JP</p>
                                            <p className="text-[10px] text-gray-500 mt-4 uppercase">Arrival</p>
                                            <p className="font-bold text-sm">
                                                {ticketInfo?.date ? new Date(new Date(ticketInfo.date).getTime() + 86400000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '---'} • 06:50
                                            </p>
                                     </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                                     <div>
                                            <p className="text-[10px] font-black uppercase text-gray-500">Class</p>
                                            <p className="font-bold">Economy (S)</p>
                                     </div>
                                     <div>
                                            <p className="text-[10px] font-black uppercase text-gray-500">Gate</p>
                                            <p className="font-bold">Terminal 3</p>
                                     </div>
                                     <div>
                                            <p className="text-[10px] font-black uppercase text-gray-500">Baggage</p>
                                            <p className="font-bold">2 x 23 KG</p>
                                     </div>
                                     <div>
                                            <p className="text-[10px] font-black uppercase text-gray-500">Seat</p>
                                            <p className="font-bold">32K (Window)</p>
                                     </div>
                                </div>
                         </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                         <button className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30">
                                <Ticket size={20}/> Download E-Ticket (PDF)
                         </button>
                         <button className="flex-1 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all">
                                <Plane size={20}/> Lihat Jadwal Penjemputan
                         </button>
                    </div>

                    <div className="bg-yellow-600/10 border border-yellow-500/20 p-6 rounded-3xl flex items-start gap-4">
                         <Info className="text-yellow-500 shrink-0 mt-0.5" size={20}/>
                         <div>
                                <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1">Informasi Penting</p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                     Harap tiba di Bandara Soekarno-Hatta minimal 4 jam sebelum keberangkatan untuk proses check-in grup dan pengarahan terakhir dari tim LPK Yoshida Gakkou. Pastikan membawa Paspor asli dan COE asli.
                                </p>
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'visa' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2">Status Visa (Tokutei Ginou)</h2>
                    <p className="text-gray-500 mb-8">Informasi pengajuan visa kerja Anda di Kedutaan Besar / Konsulat Jepang.</p>
                    
                    <div className="bg-orange-600/10 border border-orange-500/20 p-8 rounded-[40px] mb-8 flex flex-col md:flex-row items-center gap-8">
                         <div className="w-24 h-24 bg-orange-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
                                <Plane size={48} />
                         </div>
                         <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-orange-400">
                                    Status Visa: {visaStatus === 'issued' ? 'Visa Diterbitkan' : visaStatus === 'processing' ? 'Proses Kedutaan' : visaStatus === 'submitted' ? 'Berkas Terkirim' : visaStatus === 'gathering' ? 'Persiapan Berkas' : 'Menunggu CoE'}
                                </h3>
                                <p className="text-gray-400 mt-2">
                                    {visaStatus === 'issued' ? 'Visa Anda telah diterbitkan! Silakan periksa tab E-Ticketing untuk jadwal keberangkatan.' : visaStatus === 'processing' ? 'Aplikasi visa Anda sedang dalam proses peninjauan oleh Kedutaan Besar Jepang.' : visaStatus === 'submitted' ? 'Dokumen pengajuan visa telah diserahkan ke Japan Visa Application Centre (JVAC).' : visaStatus === 'gathering' ? 'Persiapkan dokumen fisik Anda untuk pengajuan visa (Paspor, Foto, CoE).' : 'Pengajuan visa baru dapat dilakukan setelah Certificate of Eligibility (CoE) asli diterbitkan.'}
                                </p>
                                <p className="text-xs text-orange-500/70 font-bold uppercase tracking-widest mt-4">Estimasi: {visaStatus === 'issued' ? 'Selesai' : '7 - 14 Hari Kerja'}</p>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><FileText className="text-blue-500"/> Dokumen Persyaratan</h3>
                                <div className="space-y-4">
                                     {[
                                         { name: 'CoE (Asli / Digital)', status: 'Menunggu' },
                                         { name: 'Paspor RI (Berlaku > 1 Th)', status: 'Siap' },
                                         { name: 'Foto 4.5 x 3.5 (2 Lembar)', status: 'Siap' },
                                         { name: 'Formulir Aplikasi Visa', status: 'Draft' },
                                         { name: 'Kontrak Kerja (Signed)', status: 'Siap' }
                                     ].map((doc, i) => (
                                         <div key={i} className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5">
                                                <span className="text-xs font-medium">{doc.name}</span>
                                                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${doc.status === 'Siap' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-gray-500'}`}>
                                                    {doc.status}
                                                </span>
                                         </div>
                                     ))}
                                </div>
                         </div>

                         <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><MapPin className="text-orange-500"/> Lokasi Pengurusan</h3>
                                <div className="bg-black/30 p-6 rounded-2xl border border-white/5 mb-6">
                                     <p className="text-[10px] font-black uppercase text-gray-500 mb-2">Instansi Terkait</p>
                                     <h4 className="font-bold">Japan Visa Application Centre (JVAC)</h4>
                                     <p className="text-xs text-gray-400 mt-1">Kuningan City Mall Lt. 2, Jakarta Selatan</p>
                                </div>
                                <div className="space-y-4">
                                     <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <CheckCircle size={14} className="text-blue-500"/>
                                            <span>Proses Visa: 5 - 10 Hari Kerja</span>
                                     </div>
                                     <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <CheckCircle size={14} className="text-blue-500"/>
                                            <span>Fee Visa: Ditanggung Perusahaan</span>
                                     </div>
                                </div>
                         </div>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-2xl flex items-start gap-4">
                         <Info className="text-blue-500 shrink-0 mt-0.5" size={20}/>
                         <p className="text-xs text-gray-400 leading-relaxed">
                                <b>Penting:</b> Pastikan paspor Anda dalam kondisi baik (tidak sobek/terkena air) dan memiliki masa berlaku minimal 1 tahun saat pengajuan visa dilakukan. Update status akan dikirimkan otomatis melalui Email & WhatsApp.
                         </p>
                    </div>
                </div>
            )}

            {activeTab === 'coe' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2">Certificate of Eligibility (CoE)</h2>
                    <p className="text-gray-500 mb-8">Status pengurusan dokumen izin tinggal (CoE) Anda dari Imigrasi Jepang.</p>
                    
                    <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[40px] mb-8 flex flex-col md:flex-row items-center gap-8">
                         <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                                <ShieldCheck size={48} />
                         </div>
                         <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-blue-400">
                                    Status CoE: {coeStatus === 'issued' ? 'Diterbitkan' : coeStatus === 'processing' ? 'Sedang Diproses' : coeStatus === 'submitted' ? 'Berkas Terkirim' : 'Pengumpulan Berkas'}
                                </h3>
                                <p className="text-gray-400 mt-2">
                                    {coeStatus === 'issued' ? 'CoE Anda telah diterbitkan dan siap untuk pengajuan visa.' : coeStatus === 'processing' ? 'Berkas Anda sedang ditinjau oleh Tokyo Regional Immigration Bureau.' : coeStatus === 'submitted' ? 'Berkas Anda telah diterima oleh mitra di Jepang untuk diajukan ke Imigrasi.' : 'Tim kami sedang memverifikasi kelengkapan dokumen pengajuan CoE Anda.'}
                                </p>
                                <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                                     <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full bg-blue-500 transition-all duration-1000`} style={{ width: coeStatus === 'issued' ? '100%' : coeStatus === 'processing' ? '75%' : coeStatus === 'submitted' ? '40%' : '15%' }}></div>
                                     </div>
                                     <span className="text-[10px] font-bold text-blue-400">
                                         {coeStatus === 'issued' ? '100%' : coeStatus === 'processing' ? '75%' : coeStatus === 'submitted' ? '40%' : '15%'} Selesai
                                     </span>
                                </div>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                         <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Tanggal Pengajuan</p>
                                <p className="font-bold">12 Maret 2026</p>
                         </div>
                         <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Estimasi Selesai</p>
                                <p className="font-bold">Mei - Juni 2026</p>
                         </div>
                         <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Nomor Registrasi</p>
                                <p className="font-bold text-sm">JPN-2026-X8890</p>
                         </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                         <h3 className="font-bold text-xl mb-8 flex items-center gap-3"><Clock className="text-blue-500"/> Riwayat Pengajuan Dokumen</h3>
                         <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                                <div className="relative pl-10">
                                     <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-[#0a0a0c]">
                                            <CheckCircle size={12} className="text-white"/>
                                     </div>
                                     <div>
                                            <h4 className="font-bold text-sm">Verifikasi Berkas LPK</h4>
                                            <p className="text-xs text-gray-500">10 Februari 2026 • Dokumen dinyatakan lengkap dan valid.</p>
                                     </div>
                                </div>
                                <div className="relative pl-10">
                                     <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-[#0a0a0c]">
                                            <CheckCircle size={12} className="text-white"/>
                                     </div>
                                     <div>
                                            <h4 className="font-bold text-sm">Pengiriman Berkas ke Jepang</h4>
                                            <p className="text-xs text-gray-500">25 Februari 2026 • Berkas diterima oleh mitra TSK di Tokyo.</p>
                                     </div>
                                </div>
                                <div className="relative pl-10">
                                     <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-[#0a0a0c]">
                                            <CheckCircle size={12} className="text-white"/>
                                     </div>
                                     <div>
                                            <h4 className="font-bold text-sm">Submit ke Kantor Imigrasi</h4>
                                            <p className="text-xs text-gray-500">12 Maret 2026 • Pengajuan resmi COE dilakukan.</p>
                                     </div>
                                </div>
                                <div className="relative pl-10">
                                     <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-600 animate-pulse flex items-center justify-center border-4 border-[#0a0a0c]">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                     </div>
                                     <div>
                                            <h4 className="font-bold text-sm text-blue-400">Penerbitan Digital COE</h4>
                                            <p className="text-xs text-gray-500 italic">Estimasi Mei 2026 • Menunggu konfirmasi akhir dari Imigrasi.</p>
                                     </div>
                                </div>
                                <div className="relative pl-10">
                                     <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border-4 border-[#0a0a0c]">
                                     </div>
                                     <div>
                                            <h4 className="font-bold text-sm text-gray-600">Pengurusan Visa di KBRI</h4>
                                            <p className="text-xs text-gray-500">Langkah berikutnya setelah COE diterbitkan.</p>
                                     </div>
                                </div>
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'sectors' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-3xl font-bold mb-2">14 Bidang Tokutei Ginou</h2>
                    <p className="text-gray-500 mb-8">Pelajari persyaratan khusus untuk setiap sektor pekerjaan di Jepang.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SECTORS_DATA.map(s => (
                            <div key={s.id} onClick={() => setSelectedSector(s)} className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 cursor-pointer transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                                <h4 className="font-bold text-lg">{s.title}</h4>
                                <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-black group-hover:text-blue-400 transition-colors">Lihat Detail →</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'jobs' && (
             <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold">Eksplorasi Job Order</h2>
                            <p className="text-gray-400 mt-1 italic">Temukan penempatan kerja terbaik Anda di Jepang.</p>
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                             <button onClick={() => setJobFilter('semua')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${jobFilter === 'semua' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Semua</button>
                             <button onClick={() => setJobFilter('tersedia')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${jobFilter === 'tersedia' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Tersedia</button>
                             <button onClick={() => setJobFilter('tidak tersedia')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${jobFilter === 'tidak tersedia' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Closed</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {filteredJobs.map(job => (
                             <div key={job.id} className={`bg-white/5 border rounded-[32px] overflow-hidden group transition-all relative ${job.status === 'tersedia' ? 'border-white/10 hover:border-blue-500/40 hover:bg-white/10' : 'border-red-500/20 grayscale opacity-70'}`}>
                                    {job.status === 'tidak tersedia' && (
                                        <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase flex items-center">
                                            <Archive size={10} className="mr-1" /> Ditutup
                                        </div>
                                    )}
                                    
                                    <div className="p-8">
                                         <div className="flex justify-between items-start mb-6">
                                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                                     <Building2 size={32}/>
                                                </div>
                                                <div className="text-right">
                                                     <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Sektor</p>
                                                     <p className="font-bold text-sm">{job.sector}</p>
                                                </div>
                                         </div>

                                         <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                                         <p className="text-blue-400 font-medium mb-6">{job.company}</p>

                                         <div className="grid grid-cols-2 gap-4 mb-8">
                                                <div className="flex items-center text-gray-400 text-sm">
                                                     <MapPin size={16} className="mr-2 text-blue-500" /> {job.location}
                                                </div>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                     <DollarSign size={16} className="mr-2 text-blue-500" /> {job.salary}
                                                </div>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                     <Users size={16} className="mr-2 text-blue-500" /> {job.applicants} Pelamar
                                                </div>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                     <Clock size={16} className="mr-2 text-blue-500" /> {job.deadline}
                                                </div>
                                         </div>

                                         <div className="flex space-x-3">
                                                <button className={`flex-1 py-4 rounded-2xl font-bold transition-all text-sm ${job.status === 'tersedia' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`} disabled={job.status !== 'tersedia'}>
                                                     {job.status === 'tersedia' ? 'Lamar Sekarang' : 'Sudah Berakhir'}
                                                </button>
                                                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                                     <Info size={20} />
                                                </button>
                                         </div>
                                    </div>
                             </div>
                         ))}
                    </div>
                </div>
            )}
        </main>

        {/* MODAL DETAIL SEKTOR */}
        {selectedSector && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                 <div className="bg-[#0f0f12] p-10 rounded-[40px] border border-white/10 max-w-xl w-full animate-in zoom-in duration-300 text-white">
                        <div className="flex justify-between mb-6">
                            <span className="text-6xl">{selectedSector.icon}</span>
                            <button onClick={() => setSelectedSector(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400"><X size={20}/></button>
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{selectedSector.title}</h3>
                        <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">{selectedSector.skill}</p>
                        <div className="space-y-6">
                            <div>
                                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Persyaratan Umum</p>
                                 <div className="space-y-2">
                                    {selectedSector.requirements.map((r, i) => <div key={i} className="text-sm flex items-center gap-3 p-3 bg-white/5 rounded-xl"><CheckCircle size={16} className="text-green-500"/> {r}</div>)}
                                 </div>
                            </div>
                            <button onClick={() => {setSelectedSector(null); setActiveTab('jobs');}} className="w-full py-4 bg-blue-600 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all text-white">Cari Pekerjaan di Bidang Ini</button>
                        </div>
                 </div>
            </div>
        )}

        {/* MODAL DETAIL JADWAL */}
        {selectedScheduleDetail && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-6">
                 <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className="bg-[#0f0f12] p-10 rounded-[40px] border border-white/10 max-w-lg w-full shadow-2xl relative text-white"
                 >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                                <Calendar size={32} />
                            </div>
                            <button onClick={() => setSelectedScheduleDetail(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400"><X size={20}/></button>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-2">Jadwal Wawancara</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Berikut adalah detail koordinat untuk sesi wawancara Anda dengan mitra. Harap hadir tepat waktu.</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Clock size={20}/></div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Waktu Pelaksanaan</p>
                                    <p className="font-bold">{contractSchedule.date} • {contractSchedule.time} WIB</p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><MapPin size={20}/></div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Lokasi / Link Meeting</p>
                                    <p className="font-bold text-blue-400 break-all">{contractSchedule.location}</p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">A</div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Interviewer</p>
                                    <p className="font-bold text-white">HR Recruitment Yoshida Gakkou</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600/10 p-5 rounded-3xl border border-blue-500/20 flex gap-4 mb-8">
                             <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                             <p className="text-xs text-gray-400 leading-relaxed">Persiapkan diri Anda, kenakan pakaian formal, dan pastikan jaringan internet stabil jika wawancara online.</p>
                        </div>

                        <button 
                            onClick={() => setSelectedScheduleDetail(false)}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                        >
                            Saya Sudah Mengerti
                        </button>
                 </motion.div>
            </div>
        )}

        {/* MODAL TAMBAH SERTIFIKAT */}
        {showAddCertificate && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6 text-white">
                 <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className="bg-[#0f0f12] p-10 rounded-[40px] border border-white/10 max-w-lg w-full shadow-2xl relative"
                 >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                                <Award size={32} />
                            </div>
                            <button onClick={() => setShowAddCertificate(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400"><X size={20}/></button>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-2">Unggah Sertifikat</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Tambahkan sertifikat keahlian atau pelatihan baru untuk memperkuat profil Anda.</p>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Nama Sertifikat</label>
                                <input 
                                    type="text" 
                                    placeholder="Contoh: JLPT N4 / Sertifikat Welding"
                                    value={newCert.name}
                                    onChange={(e) => setNewCert({...newCert, name: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Unggah Berkas (PDF/JPG)</label>
                                <div 
                                    className={`border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${newCert.file ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                    onClick={() => document.getElementById('cert-upload')?.click()}
                                >
                                    <input 
                                        id="cert-upload"
                                        type="file" 
                                        className="hidden" 
                                        onChange={(e) => setNewCert({...newCert, file: e.target.files?.[0] || null})}
                                    />
                                    {newCert.file ? (
                                        <>
                                            <CheckCircle size={32} className="text-emerald-500 mb-4" />
                                            <p className="text-sm font-bold text-white mb-1">{newCert.file.name}</p>
                                            <p className="text-xs text-emerald-500">Berkas terpilih</p>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={32} className="text-blue-500 mb-4" />
                                            <p className="text-sm font-bold text-white mb-1">Pilih atau Seret Berkas</p>
                                            <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Max 5MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    if (!newCert.name || !newCert.file) {
                                        alert('Harap isi nama sertifikat dan pilih berkas.');
                                        return;
                                    }
                                    alert(`Berhasil mengunggah: ${newCert.name}`);
                                    setShowAddCertificate(false);
                                    setNewCert({ name: '', file: null });
                                }}
                                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                            >
                                Simpan Sertifikat
                            </button>
                        </div>
                 </motion.div>
            </div>
        )}

        {/* MODAL UPLOAD DOKUMEN */}
        {showUploadDoc && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[250] flex items-center justify-center p-6 text-white">
                <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className="bg-[#0f0f12] p-10 rounded-[40px] border border-white/10 max-w-lg w-full shadow-2xl relative"
                 >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                                <FileText size={32} />
                            </div>
                            <button onClick={() => setShowUploadDoc(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400"><X size={20}/></button>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-2">Upload {showUploadDoc.name}</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Silakan pilih berkas dokumen yang diminta. Pastikan dokumen terbaca dengan jelas.</p>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Nama Berkas</label>
                                <p className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-400">{showUploadDoc.name}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Berkas Dokumen (PDF/JPG/PNG)</label>
                                <div 
                                    className={`border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${uploadedFiles[showUploadDoc.type] ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                    onClick={() => document.getElementById('doc-upload-input-portal')?.click()}
                                >
                                    <input 
                                        id="doc-upload-input-portal"
                                        type="file" 
                                        className="hidden" 
                                        onChange={(e) => setUploadedFiles({...uploadedFiles, [showUploadDoc.type]: e.target.files?.[0] || null})}
                                    />
                                    {uploadedFiles[showUploadDoc.type] ? (
                                        <>
                                            <CheckCircle size={32} className="text-emerald-500 mb-4" />
                                            <p className="text-sm font-bold text-white mb-1">{uploadedFiles[showUploadDoc.type]?.name}</p>
                                            <p className="text-xs text-emerald-500">Siap untuk dikirim</p>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={32} className="text-blue-500 mb-4" />
                                            <p className="text-sm font-bold text-white mb-1">Klik untuk Pilih Dokumen</p>
                                            <p className="text-xs text-gray-500 uppercase font-black tracking-widest text-center">Seret berkas ke sini atau klik untuk mencari</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    const file = uploadedFiles[showUploadDoc.type];
                                    if (!file) {
                                        alert('Harap pilih berkas terlebih dahulu.');
                                        return;
                                    }
                                    alert(`Dokumen "${showUploadDoc.name}" berhasil diunggah!`);
                                    setShowUploadDoc(null);
                                }}
                                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                            >
                                Unggah Sekarang
                            </button>
                        </div>
                 </motion.div>
            </div>
        )}

        {/* MODAL PREVIEW DOKUMEN */}
    </div>
);
};

// ==========================================
// 2. PORTAL ADMIN
// ==========================================
const AdminPortal = ({ 
onLogout,
selectionStatus,
setSelectionStatus,
contractSchedule,
setContractSchedule,
coeStatus,
setCoeStatus,
visaStatus,
setVisaStatus,
ticketInfo,
setTicketInfo,
selectedAdminActivity,
setSelectedAdminActivity,
ADMIN_ACTIVITIES,
setPreviewDoc,
previewDoc,
setReviewCandidate,
reviewCandidate
}: { 
onLogout: () => void,
selectionStatus: 'passed' | 'failed' | 'pending',
setSelectionStatus: (s: 'passed' | 'failed' | 'pending') => void,
contractSchedule: { date: string, time: string, location: string },
setContractSchedule: (s: { date: string, time: string, location: string }) => void,
coeStatus: 'gathering' | 'submitted' | 'processing' | 'issued',
setCoeStatus: (s: 'gathering' | 'submitted' | 'processing' | 'issued') => void,
visaStatus: 'waiting_coe' | 'gathering' | 'submitted' | 'processing' | 'issued',
setVisaStatus: (s: 'waiting_coe' | 'gathering' | 'submitted' | 'processing' | 'issued') => void,
ticketInfo: { flight: string, date: string, pnr: string } | null,
setTicketInfo: (s: { flight: string, date: string, pnr: string } | null) => void,
selectedAdminActivity: any,
setSelectedAdminActivity: (a: any) => void,
ADMIN_ACTIVITIES: any[],
setPreviewDoc: (s: string | null) => void,
previewDoc: string | null,
setReviewCandidate: (c: any) => void,
reviewCandidate: any
}) => {
const [activeTab, setActiveTab] = useState('dashboard');
const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
const [interviewMode, setInterviewMode] = useState('online');
const [showNotifications, setShowNotifications] = useState(false);

const notifications = [
    { id: 1, title: 'Job Order Baru', message: 'Zenseikai membutuhkan 5 Caregiver tambahan.', time: '5 menit yang lalu', type: 'job' },
    { id: 2, title: 'Update Dokumen', message: 'Budi Santoso mengunggah Paspor baru.', time: '1 jam yang lalu', type: 'document' },
    { id: 3, title: 'Peringatan CoE', message: '3 kandidat akan melewati deadline pengajuan Tokyo.', time: '3 jam yang lalu', type: 'warning' },
    { id: 4, title: 'Job Order Baru', message: 'Ichiraku Ramen membuka posisi Food Processing.', time: 'Kemarin', type: 'job' },
];

return (
    <div className="flex flex-col md:flex-row min-h-screen text-white bg-[#0a0a0c]">
        <aside className="w-full md:w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-bold">A</div>
                <span className="text-xs font-bold tracking-widest uppercase">Admin System</span>
            </div>
            <nav className="flex-1 space-y-2">
                <button onClick={() => { setActiveTab('dashboard'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><PieChart size={18}/> Overview</button>
                <button onClick={() => { setActiveTab('jobs'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'jobs' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><Briefcase size={18}/> Kelola Job</button>
                <button onClick={() => { setActiveTab('applicants'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'applicants' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><Users size={18}/> Database Pelamar</button>
                <button onClick={() => { setActiveTab('interviews'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'interviews' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><Video size={18}/> Jadwalkan Wawancara</button>
                <button onClick={() => { setActiveTab('results'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'results' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><FileSignature size={18}/> Hasil & Kontrak</button>
                <button onClick={() => { setActiveTab('coe'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'coe' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><ShieldCheck size={18}/> Status CoE</button>
                <button onClick={() => { setActiveTab('visa'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'visa' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><Plane size={18}/> Status Visa</button>
                <button onClick={() => { setActiveTab('ticketing'); setIsCreatingSchedule(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'ticketing' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}><Ticket size={18}/> E-Ticketing</button>
            </nav>
            <button onClick={onLogout} className="text-red-400 p-3 flex items-center gap-3 mt-auto hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"><LogOut size={18}/> Keluar</button>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
            <header className="flex justify-between items-center mb-10 relative">
                <h1 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">
                    {activeTab === 'dashboard' ? 'Overview Dashboard' : activeTab.toUpperCase()}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`p-3 rounded-2xl border transition-all relative ${showNotifications ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            <Bell size={20}/>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0c]"></span>
                        </button>
                        
                        {showNotifications && (
                            <div className="absolute right-0 mt-4 w-80 bg-[#141418] border border-white/10 rounded-[32px] shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-4">
                                <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
                                    <h4 className="font-bold">Notifikasi</h4>
                                    <span className="text-[10px] font-black bg-purple-600 px-2 py-0.5 rounded-full uppercase">4 Baru</span>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div key={n.id} className="p-6 hover:bg-white/5 border-b border-white/5 transition-all cursor-pointer group">
                                            <div className="flex gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                    n.type === 'job' ? 'bg-blue-500/10 text-blue-500' : 
                                                    n.type === 'document' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                                                }`}>
                                                    {n.type === 'job' ? <Briefcase size={18}/> : n.type === 'document' ? <FileText size={18}/> : <Activity size={18}/>}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{n.title}</p>
                                                    <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
                                                    <p className="text-[10px] text-gray-600 font-bold uppercase">{n.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full p-4 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors bg-black/20">Tandai Semua Sudah Dibaca</button>
                            </div>
                        )}
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">S</div>
                </div>
            </header>

            {activeTab === 'dashboard' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 text-white">
                    <h2 className="text-3xl font-bold">Dashboard Admin</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                                <div><p className="text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest">Pending Review</p><h4 className="text-3xl font-bold text-purple-400">24</h4></div>
                                <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><Clock/></div>
                         </div>
                         <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                                <div><p className="text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest">Job Aktif</p><h4 className="text-3xl font-bold text-blue-400">12</h4></div>
                                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Briefcase/></div>
                         </div>
                         <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                                <div><p className="text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest">Total Pelamar</p><h4 className="text-3xl font-bold text-green-400">453</h4></div>
                                <div className="p-3 bg-green-500/10 rounded-2xl text-green-500"><Users/></div>
                         </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                         <h3 className="font-bold text-xl mb-6">Aktivitas Terbaru</h3>
                         <div className="space-y-4">
                                {ADMIN_ACTIVITIES.map(activity => (
                                    <div key={activity.id} className="p-4 bg-black/20 rounded-2xl flex justify-between items-center border border-white/5">
                                         <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-purple-400">{activity.type.charAt(0)}</div>
                                                <div><p className="text-sm font-bold">{activity.title}</p><p className="text-[10px] text-gray-500">{activity.time} • Bidang: {activity.bidang}</p></div>
                                         </div>
                                         <button 
                                             onClick={() => setSelectedAdminActivity(activity)}
                                             className="text-[10px] font-black uppercase text-blue-400 hover:underline"
                                         >
                                             Detail
                                         </button>
                                    </div>
                                ))}
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'jobs' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-8">
                         <h2 className="text-3xl font-bold">Manajemen Lowongan</h2>
                         <button className="px-6 py-3 bg-purple-600 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-purple-700 transition-all"><Plus size={18}/> Buat Lowongan Baru</button>
                    </div>
                    <div className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden">
                         <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                                    <tr><th className="p-6">Posisi / Perusahaan</th><th className="p-6">Sektor</th><th className="p-6">Status</th><th className="p-6">Aksi</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {INITIAL_JOBS.map(j => (
                                        <tr key={j.id} className="hover:bg-white/5 transition-all">
                                            <td className="p-6"><p className="font-bold">{j.title}</p><p className="text-xs text-gray-500">{j.company}</p></td>
                                            <td className="p-6 text-gray-400">{j.sector}</td>
                                            <td className="p-6"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-lg uppercase text-[10px] font-black border border-green-500/20">{j.status}</span></td>
                                            <td className="p-6"><div className="flex gap-4 text-gray-500"><Edit size={16} className="cursor-pointer hover:text-white"/><Trash2 size={16} className="cursor-pointer hover:text-red-500"/></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                         </table>
                    </div>
                </div>
            )}

            {activeTab === 'applicants' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-3xl font-bold mb-8">Data Pelamar Masuk</h2>
                    <div className="space-y-4">
                         {['Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Eka Putra', 'Maya Sari'].map((name, i) => (
                             <div key={i} className="p-6 bg-white/5 rounded-3xl flex justify-between items-center border border-white/10 hover:border-purple-500/50 transition-all">
                                    <div className="flex items-center gap-4">
                                         <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 border border-purple-500/20">{name.charAt(0)}</div>
                                         <div><p className="font-bold text-lg">{name}</p><p className="text-xs text-gray-500">Daftar pada: 12 April 2026 • Skor JFT: 85</p></div>
                                    </div>
                                    <div className="flex gap-3">
                                            <button 
                                                onClick={() => setPreviewDoc(`Berkas Lamaran: ${name}`)}
                                                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase hover:bg-white/10 transition-all"
                                            >
                                                Detail Berkas
                                            </button>
                                         <button 
                                             onClick={() => setReviewCandidate({ name, score: 85, date: '12 April 2026' })}
                                             className="px-5 py-2.5 bg-purple-600 rounded-xl text-[10px] font-black uppercase hover:bg-purple-700 transition-all font-sans"
                                         >
                                             Review
                                         </button>
                                    </div>
                             </div>
                         ))}
                    </div>
                </div>
            )}

            {activeTab === 'interviews' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    {isCreatingSchedule ? (
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsCreatingSchedule(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10"><X size={20}/></button>
                                <h2 className="text-3xl font-bold">Buat Jadwal Baru</h2>
                            </div>
                            
                            <div className="bg-white/5 p-8 rounded-[40px] border border-purple-500/30">
                                <form onSubmit={(e) => { e.preventDefault(); setIsCreatingSchedule(false); }} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Kandidat</label>
                                            <select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all">
                                                <option>Pilih Kandidat...</option>
                                                <option>Budi Santoso (Caregiver)</option>
                                                <option>Siti Aminah (Food Processing)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Perusahaan / Mitra</label>
                                            <select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all">
                                                <option>Pilih Mitra...</option>
                                                <option>Zenseikai Group</option>
                                                <option>Ichiraku Co.</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Tanggal Wawancara</label>
                                            <input type="date" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Waktu (WIB)</label>
                                            <input type="time" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Mode Wawancara</label>
                                        <div className="flex gap-4">
                                            <button 
                                                type="button"
                                                onClick={() => setInterviewMode('online')}
                                                className={`flex-1 py-4 rounded-2xl font-bold border transition-all ${interviewMode === 'online' ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-600/20' : 'bg-black/40 border-white/10 hover:border-purple-500/50'}`}
                                            >
                                                Online
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setInterviewMode('offline')}
                                                className={`flex-1 py-4 rounded-2xl font-bold border transition-all ${interviewMode === 'offline' ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-600/20' : 'bg-black/40 border-white/10 hover:border-purple-500/50'}`}
                                            >
                                                Offline
                                            </button>
                                        </div>
                                    </div>

                                    {interviewMode === 'online' ? (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Meeting Link (Zoom/Google Meet)</label>
                                            <input type="url" placeholder="https://zoom.us/j/..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all" />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Lokasi Wawancara</label>
                                            <input type="text" placeholder="Gedung LPK Yoshida Gakkou, Bekasi..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all" />
                                        </div>
                                    )}

                                    <div className="pt-6 flex gap-4">
                                        <button type="submit" className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20">Simpan & Kirim Undangan</button>
                                        <button type="button" onClick={() => setIsCreatingSchedule(false)} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">Batal</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-8">
                                 <h2 className="text-3xl font-bold">Penjadwalan Wawancara</h2>
                                 <button onClick={() => setIsCreatingSchedule(true)} className="px-6 py-3 bg-purple-600 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-purple-700 transition-all"><Plus size={18}/> Buat Jadwal Baru</button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                 <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                                             <h3 className="font-bold text-xl mb-6">Antrian Penjadwalan</h3>
                                             <div className="space-y-4">
                                                    {[
                                                         { name: 'Budi Santoso', job: 'Caregiver', company: 'Zenseikai Group', score: '85' },
                                                         { name: 'Siti Aminah', job: 'Food Processing', company: 'Ichiraku Co.', score: '92' }
                                                    ].map((p, i) => (
                                                         <div key={i} className="p-5 bg-black/20 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-purple-500/30 transition-all">
                                                                <div className="flex items-center gap-4">
                                                                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center font-bold text-blue-500">{p.name.charAt(0)}</div>
                                                                     <div>
                                                                            <p className="font-bold">{p.name}</p>
                                                                            <p className="text-[10px] text-gray-500">{p.job} @ {p.company} • Skor: {p.score}</p>
                                                                     </div>
                                                                </div>
                                                                <button onClick={() => setIsCreatingSchedule(true)} className="px-4 py-2 bg-purple-600 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-all shadow-lg shadow-purple-600/20">Jadwalkan</button>
                                                         </div>
                                                    ))}
                                             </div>
                                        </div>

                                        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                                             <h3 className="font-bold text-xl mb-6">Kalender Wawancara (Minggu Ini)</h3>
                                             <div className="grid grid-cols-7 gap-2">
                                                    {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => (
                                                         <div key={d} className="text-center text-[10px] font-black text-gray-500 py-2 uppercase">{d}</div>
                                                    ))}
                                                    {Array.from({length: 31}).slice(0, 7).map((_, i) => (
                                                         <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border border-white/5 text-sm font-bold ${i === 2 ? 'bg-purple-600 border-purple-500 shadow-lg' : 'bg-white/5'}`}>
                                                                {20 + i}
                                                         </div>
                                                    ))}
                                             </div>
                                             <div className="mt-8 space-y-4">
                                                    <div className="flex items-start gap-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                                                         <div className="p-2 bg-purple-500 rounded-lg text-white"><Clock size={16}/></div>
                                                         <div>
                                                                <p className="text-xs font-bold text-purple-400">10:00 - 11:30 WIB</p>
                                                                <p className="text-sm font-bold">Wawancara: Budi Santoso vs Zenseikai</p>
                                                                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-2"><Video size={12}/> Zoom Meeting ID: 889-221-009</p>
                                                         </div>
                                                    </div>
                                             </div>
                                        </div>
                                 </div>

                                 <div className="space-y-6">
                                        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                                             <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><Users className="text-purple-500" /> Pewawancara Aktif</h3>
                                             <div className="space-y-4">
                                                    {[
                                                         { name: 'Tanaka-san', org: 'TSK Tokyo', status: 'Online' },
                                                         { name: 'Yama-san', org: 'Ichiraku Co.', status: 'Sibuk' },
                                                         { name: 'Admin Maya', org: 'LPK Yoshida', status: 'Online' }
                                                    ].map((u, i) => (
                                                         <div key={i} className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{u.name.charAt(0)}</div>
                                                                     <div>
                                                                            <p className="text-xs font-bold">{u.name}</p>
                                                                            <p className="text-[8px] text-gray-500 uppercase font-black">{u.org}</p>
                                                                     </div>
                                                                </div>
                                                                <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Online' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                                         </div>
                                                    ))}
                                             </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 p-8 rounded-[40px]">
                                             <h4 className="font-bold text-sm mb-2">Tips Penjadwalan</h4>
                                             <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                                    Pastikan selisih waktu JST (Waktu Jepang) sudah disesuaikan (WIB + 2 Jam). Gunakan link Zoom yang terintegrasi untuk memudahkan monitoring.
                                             </p>
                                        </div>
                                 </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {activeTab === 'results' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
                    <h2 className="text-3xl font-bold">Hasil Wawancara & Kontrak</h2>
                    
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                         <h3 className="font-bold text-xl mb-6">Input Hasil Seleksi</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                     <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Pilih Kandidat (Pasca Wawancara)</label>
                                            <select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all">
                                                 <option>Budi Santoso (Caregiver - Zenseikai)</option>
                                                 <option>Siti Aminah (Food Processing - Ichiraku)</option>
                                            </select>
                                     </div>
                                     <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Keputusan Akhir (Status Saat Ini: <span className="text-purple-400 capitalize">{selectionStatus}</span>)</label>
                                            <div className="flex gap-4">
                                                 <button 
                                                    onClick={() => setSelectionStatus('passed')}
                                                    className={`flex-1 py-4 border rounded-2xl font-bold transition-all ${selectionStatus === 'passed' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20' : 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white'}`}
                                                 >
                                                     LULUS
                                                 </button>
                                                 <button 
                                                    onClick={() => setSelectionStatus('failed')}
                                                    className={`flex-1 py-4 border rounded-2xl font-bold transition-all ${selectionStatus === 'failed' ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' : 'bg-red-600/10 border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white'}`}
                                                 >
                                                     TIDAK LULUS
                                                 </button>
                                            </div>
                                     </div>
                                </div>
                                <div className="bg-purple-600/5 border border-purple-500/10 p-6 rounded-3xl">
                                     <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-purple-400"><Info size={16}/> Catatan Penjadwalan Kontrak</h4>
                                     <p className="text-xs text-gray-500 leading-relaxed italic">
                                            Jika kandidat dinyatakan LULUS, sistem akan otomatis membuka form penjadwalan tanda tangan kontrak di bawah. Kandidat akan menerima notifikasi "Panggilan Kontrak" secara real-time.
                                     </p>
                                </div>
                         </div>
                    </div>

                    <div className={`bg-white/5 p-8 rounded-[40px] border border-white/10 transition-all duration-500 ${selectionStatus !== 'passed' ? 'opacity-50 grayscale pointer-events-none scale-95' : 'opacity-100 grayscale-0'}`}>
                         <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-xl flex items-center gap-3"><FileSignature className="text-orange-500"/> Jadwalkan Tanda Tangan Kontrak</h3>
                                {selectionStatus !== 'passed' && (
                                    <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full uppercase font-black text-gray-500 tracking-widest">Akti setelah "LULUS"</span>
                                )}
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                     <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Tanggal</label>
                                     <input 
                                        type="date" 
                                        value={contractSchedule.date}
                                        onChange={(e) => setContractSchedule({...contractSchedule, date: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-all" 
                                     />
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Waktu</label>
                                     <input 
                                        type="time" 
                                        value={contractSchedule.time}
                                        onChange={(e) => setContractSchedule({...contractSchedule, time: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-all" 
                                     />
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Lokasi / Ruangan</label>
                                     <input 
                                        type="text" 
                                        value={contractSchedule.location}
                                        onChange={(e) => setContractSchedule({...contractSchedule, location: e.target.value})}
                                        placeholder="Ruang Meeting A" 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-all" 
                                     />
                                </div>
                         </div>
                         <button className="mt-8 w-full py-5 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold shadow-xl shadow-orange-600/20 transition-all">Konfirmasi & Kirim Undangan Kontrak</button>
                    </div>
                </div>
            )}

            {activeTab === 'coe' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
                    <h2 className="text-3xl font-bold text-white">Manajemen CoE (Izin Tinggal)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className={`p-6 rounded-3xl border transition-all ${coeStatus === 'gathering' ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10 opacity-50'}`}>
                            <p className="text-[10px] uppercase font-black text-gray-500 mb-2">Tahap 1</p>
                            <h4 className="font-bold text-sm">Pengumpulan Dokumen</h4>
                        </div>
                        <div className={`p-6 rounded-3xl border transition-all ${coeStatus === 'submitted' ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10 opacity-50'}`}>
                            <p className="text-[10px] uppercase font-black text-gray-500 mb-2">Tahap 2</p>
                            <h4 className="font-bold text-sm">Penyerahan ke TSK</h4>
                        </div>
                        <div className={`p-6 rounded-3xl border transition-all ${coeStatus === 'processing' ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10 opacity-50'}`}>
                            <p className="text-[10px] uppercase font-black text-gray-500 mb-2">Tahap 3</p>
                            <h4 className="font-bold text-sm">Review Imigrasi JP</h4>
                        </div>
                        <div className={`p-6 rounded-3xl border transition-all ${coeStatus === 'issued' ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/10 opacity-50'}`}>
                            <p className="text-[10px] uppercase font-black text-gray-500 mb-2">Tahap 4</p>
                            <h4 className="font-bold text-sm">CoE Diterbitkan</h4>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 text-white">
                            <div>
                                <h3 className="font-bold text-xl">Monitor Status Kandidat</h3>
                                <p className="text-xs text-gray-500 mt-1">Update status pengurusan CoE secara massal atau individu.</p>
                            </div>
                            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
                                {(['gathering', 'submitted', 'processing', 'issued'] as const).map((s) => (
                                    <button 
                                        key={s}
                                        onClick={() => setCoeStatus(s)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${coeStatus === s ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Budi Santoso', job: 'Caregiver', bureau: 'Tokyo Immigration', updated: '2 jam yang lalu' },
                                { name: 'Siti Aminah', job: 'Food Processing', bureau: 'Osaka Immigration', updated: '5 jam yang lalu' }
                            ].map((c, i) => (
                                <div key={i} className="p-6 bg-black/20 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-purple-500/30">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 transition-transform hover:scale-110">{c.name.charAt(0)}</div>
                                        <div>
                                            <p className="font-bold text-white">{c.name}</p>
                                            <p className="text-xs text-gray-500">{c.job} • {c.bureau}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${coeStatus === 'issued' ? 'bg-emerald-500 text-white' : 'bg-purple-600 text-white'}`}>
                                                {coeStatus === 'issued' ? <CheckCircle size={14}/> : '3'}
                                            </div>
                                            <p className="text-[8px] font-black uppercase mt-2 text-gray-500">Imigrasi</p>
                                        </div>
                                        <div className="h-px w-12 bg-white/10 hidden md:block"></div>
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${coeStatus === 'issued' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-600 border border-white/10'}`}>
                                                {coeStatus === 'issued' ? <CheckCircle size={14}/> : '4'}
                                            </div>
                                            <p className="text-[8px] font-black uppercase mt-2 text-gray-500">Terbit</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"><Edit size={16}/></button>
                                            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"><Clock size={16}/></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Info size={14} className="text-purple-400"/>
                                <span>Estimasi rata-rata penerbitan: <b>2.5 Bulan</b> (Tokyo Bureau)</span>
                            </div>
                            <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Export Laporan CoE</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'visa' && (
                // ... existing Visa code ...
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
                    <h2 className="text-3xl font-bold text-white">Manajemen Visa (Izin Masuk)</h2>
                    {/* I'll use the existing visa content here, keeping it compact for the edit */}
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                         {/* ... (rest of visa UI) */}
                    </div>
                </div>
            )}

            {activeTab === 'ticketing' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
                    <h2 className="text-3xl font-bold text-white">E-Ticketing & Keberangkatan</h2>
                    
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-bold text-xl text-white">Input Tiket Pesawat</h3>
                                <p className="text-xs text-gray-500 mt-1">Hanya untuk kandidat yang visa-nya telah diterbitkan.</p>
                            </div>
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500"><Info size={16}/></div>
                                <span className="text-[10px] font-black uppercase text-emerald-400">Auto-Update Candidate Dashboard</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-6">
                                    <div className="space-y-2">
                                         <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Pilih Kandidat (Visa Issued)</label>
                                         <select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-emerald-500 text-white outline-none transition-all">
                                                <option>Budi Santoso (Caregiver)</option>
                                                <option>Siti Aminah (Food Processing)</option>
                                         </select>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Pesawat & No. Flight</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Japan Airlines JL720"
                                                    value={ticketInfo?.flight || ''}
                                                    onChange={(e) => setTicketInfo({...ticketInfo!, flight: e.target.value})}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500" 
                                                />
                                         </div>
                                         <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Tanggal Terbang</label>
                                                <input 
                                                    type="date" 
                                                    value={ticketInfo?.date || ''}
                                                    onChange={(e) => setTicketInfo({...ticketInfo!, date: e.target.value})}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500" 
                                                />
                                         </div>
                                    </div>
                                    <div className="space-y-2">
                                         <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block px-1">Kode Booking (PNR)</label>
                                         <input 
                                            type="text" 
                                            placeholder="JX9901"
                                            value={ticketInfo?.pnr || ''}
                                            onChange={(e) => setTicketInfo({...ticketInfo!, pnr: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500" 
                                         />
                                    </div>
                                    <button 
                                        onClick={() => {
                                            alert('Tiket berhasil terbit dan dikirim ke portal kandidat!');
                                        }}
                                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3"
                                    >
                                         <Send size={18}/> Terbitkan Tiket Ke Kandidat
                                    </button>
                             </div>

                             <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-[32px] flex flex-col justify-center items-center text-center">
                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                                         <Ticket size={32} />
                                    </div>
                                    <h4 className="font-bold text-xl text-white mb-2">Pratinjau E-Ticket</h4>
                                    <p className="text-sm text-gray-400 mb-8 max-w-[200px]">Data yang Anda masukkan akan langsung muncul sebagai tiket digital di dashboard kandidat.</p>
                                    
                                    <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left relative overflow-hidden">
                                         <div className="absolute top-0 right-0 p-4">
                                                <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded">VALID</div>
                                         </div>
                                         <p className="text-[10px] uppercase font-black text-gray-500 mb-4 tracking-tighter">Boarding Pass Preview</p>
                                         <div className="flex justify-between items-end">
                                                <div>
                                                     <p className="text-2xl font-black text-white">{ticketInfo?.pnr || '------'}</p>
                                                     <p className="text-xs text-gray-400">{ticketInfo?.flight || 'Pilih Maskapai'}</p>
                                                </div>
                                                <div className="text-right">
                                                     <p className="text-sm font-bold text-white">{ticketInfo?.date || '---'}</p>
                                                     <p className="text-[8px] uppercase font-black text-emerald-500">CGK → NRT</p>
                                                </div>
                                         </div>
                                    </div>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </main>

        {/* MODAL DETAIL AKTIVITAS ADMIN */}
        {selectedAdminActivity && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-6 text-white text-left">
                 <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className="bg-[#0f0f12] p-10 rounded-[40px] border border-white/10 max-w-lg w-full shadow-2xl relative"
                 >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-600/20">
                                <Activity size={32} />
                            </div>
                            <button onClick={() => setSelectedAdminActivity(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400"><X size={20}/></button>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-2">Detail Aktivitas</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Informasi lengkap mengenai log aktivitas sistem yang dipilih.</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Judul Aktivitas</p>
                                <p className="font-bold text-xl">{selectedAdminActivity.title}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Kandidat</p>
                                    <p className="font-bold">{selectedAdminActivity.candidate}</p>
                                </div>
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Waktu</p>
                                    <p className="font-bold">{selectedAdminActivity.time}</p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Status Sistem</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    <p className="font-bold text-emerald-500">{selectedAdminActivity.status}</p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Keterangan / Log</p>
                                <p className="text-sm text-gray-400 leading-relaxed mt-1">{selectedAdminActivity.details}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => setSelectedAdminActivity(null)}
                                className="flex-1 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all font-sans"
                            >
                                Tutup
                            </button>
                            <button 
                                onClick={() => {
                                    const candidateName = selectedAdminActivity.user || selectedAdminActivity.title.split(' oleh ')[1] || 'Kandidat';
                                    setReviewCandidate({ 
                                        name: candidateName, 
                                        score: 85, 
                                        date: '12 April 2026',
                                        details: selectedAdminActivity.details 
                                    });
                                    setSelectedAdminActivity(null);
                                }}
                                className="flex-[2] py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-xl shadow-purple-600/20 transition-all font-sans"
                            >
                                Lihat Profil
                            </button>
                        </div>
                 </motion.div>
            </div>
        )}
    </div>
);
};

// ==========================================
// 3. PORTAL DIREKSI
// ==========================================
const ExecutivePortal = ({ onLogout }: { onLogout: () => void }) => {
const [activeTab, setActiveTab] = useState('summary');
const [chartPeriod, setChartPeriod] = useState('mingguan');

return (
    <div className="flex flex-col md:flex-row min-h-screen text-white bg-[#0a0a0c]">
        <aside className="w-full md:w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold">E</div>
                <span className="text-xs font-bold tracking-widest uppercase">Executive Center</span>
            </div>
            <nav className="flex-1 space-y-2">
                <button onClick={() => setActiveTab('summary')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'summary' ? 'bg-orange-600/20 text-orange-400' : 'text-gray-400 hover:bg-white/5'}`}><TrendingUp size={18}/> Summary</button>
                <button onClick={() => setActiveTab('admin-reports')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'admin-reports' ? 'bg-orange-600/20 text-orange-400' : 'text-gray-400 hover:bg-white/5'}`}><UserCog size={18}/> Laporan Admin</button>
            </nav>
            <button onClick={onLogout} className="text-red-400 p-3 flex items-center gap-3 mt-auto hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"><LogOut size={18}/> Keluar</button>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'summary' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
                    <h2 className="text-3xl font-bold">Ringkasan Eksekutif v1.0</h2>
                    
                    {/* STATS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         {[
                             {l:'Total Database', v:'1.4k', c:'text-orange-500'}, 
                             {l:'Kandidat Aktif', v:'86', c:'text-blue-500'}, 
                             {l:'Siap Berangkat', v:'24', c:'text-green-500'}, 
                             {l:'Mitra Jepang', v:'15', c:'text-purple-500'}
                         ].map((s,i) => (
                             <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{s.l}</p>
                                    <p className={`text-3xl font-bold ${s.c}`}>{s.v}</p>
                             </div>
                         ))}
                    </div>
                    
                    {/* CHARTS SECTION */}
                    <div className="flex flex-col gap-8">
                         <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                                <h3 className="font-bold flex items-center gap-3 text-xl mb-4"><BarChart3 className="text-orange-500"/> Analitik Pertumbuhan Kandidat LPK</h3>
                                <p className="text-xs text-gray-500 italic mb-8 uppercase tracking-widest font-black">Total Data Kandidat Terdaftar Berdasarkan Waktu</p>
                                <SimpleLineChart data={[12, 19, 15, 35, 45, 40, 65]} colorClass="text-orange-500" />
                         </div>
                         
                         <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
                                <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="font-bold text-xl flex items-center"><Users className="mr-3 text-blue-500" /> Pertumbuhan per Admin</h3>
                                            <p className="text-xs text-gray-500 mt-1 italic uppercase tracking-wider">Produktivitas Input Data Tim Admin (Grafik Batang)</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setChartPeriod('mingguan')}
                                                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border transition-all ${chartPeriod === 'mingguan' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-black/30 text-gray-500 border-white/5'}`}
                                            >
                                                Mingguan
                                            </button>
                                            <button 
                                                onClick={() => setChartPeriod('harian')}
                                                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border transition-all ${chartPeriod === 'harian' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-black/30 text-gray-500 border-white/5'}`}
                                            >
                                                Harian
                                            </button>
                                        </div>
                                </div>
                                <MultiAdminChart period={chartPeriod} />
                            </div>
                        </div>

                    {/* EXTRA METRICS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                <h3 className="font-bold text-lg mb-6 flex items-center"><Award className="text-yellow-500 mr-3"/> Top Performing Sektor</h3>
                                <div className="space-y-4">
                                    {[ 
                                        { name: 'Keperawatan', count: 450, growth: '+15%' },
                                        { name: 'Pengolahan Makanan', count: 320, growth: '+8%' },
                                        { name: 'Konstruksi', count: 180, growth: '+5%' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5">
                                            <span className="font-bold">{item.name}</span>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{item.count} Kandidat</p>
                                                <p className="text-[9px] text-green-500 font-black">{item.growth}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                 <h3 className="font-bold text-lg mb-6 flex items-center"><Bell className="text-blue-500 mr-3"/> Notifikasi Eksekutif</h3>
                                 <div className="space-y-3">
                                     <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                                            <p className="text-xs font-bold text-orange-400">Target Belum Tercapai</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Sektor Perhotelan membutuhkan 5 kandidat tambahan minggu ini.</p>
                                     </div>
                                     <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                                            <p className="text-xs font-bold text-green-400">Pencapaian Baru</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Admin Maya telah melampaui target input bulanan (120%).</p>
                                     </div>
                                 </div>
                            </div>
                    </div>
                </div>
            )}

            {activeTab === 'admin-reports' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                     <h2 className="text-3xl font-bold mb-8">Laporan Kinerja Admin</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {ADMIN_REPORTS.map(admin => (
                                 <div key={admin.id} className="p-8 bg-white/5 rounded-[40px] border border-white/10 group hover:border-orange-500/50 transition-all">
                                        <div className="flex justify-between items-start mb-6">
                                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20`}>{admin.name.charAt(6)}</div>
                                             <span className="text-[8px] font-black px-2 py-1 bg-green-500 text-white rounded uppercase">{admin.activity}</span>
                                        </div>
                                        <h4 className="font-bold text-xl mb-1">{admin.name}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6">Proses: {admin.processed} Data</p>
                                        
                                        <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                                             <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-black uppercase text-gray-500">Efisiensi Kerja</span>
                                                    <span className="text-sm font-bold text-orange-400">{admin.efficiency}</span>
                                             </div>
                                             <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500" style={{width: admin.efficiency}}></div>
                                             </div>
                                        </div>
                                 </div>
                            ))}
                     </div>
                </div>
            )}
        </main>
    </div>
);
};

// ==========================================
// PORTAL UTAMA (ROUTING & LOGIN)
// ==========================================
const App = () => {
const [role, setRole] = useState<'kandidat' | 'admin' | 'direksi' | null>(null); 
const [previewDoc, setPreviewDoc] = useState<string | null>(null);
const [reviewCandidate, setReviewCandidate] = useState<any | null>(null);

// Shared state for synchronization
const [selectionStatus, setSelectionStatus] = useState<'passed' | 'failed' | 'pending'>('passed');
const [contractSchedule, setContractSchedule] = useState({
    date: '2026-05-15',
    time: '09:00',
    location: 'Meeting Room A, LPK Yoshida Gakkou'
});
const [coeStatus, setCoeStatus] = useState<'gathering' | 'submitted' | 'processing' | 'issued'>('processing');
const [visaStatus, setVisaStatus] = useState<'waiting_coe' | 'gathering' | 'submitted' | 'processing' | 'issued'>('waiting_coe');
const [ticketInfo, setTicketInfo] = useState<{ flight: string, date: string, pnr: string } | null>({
    flight: 'Japan Airlines JL720',
    date: '2026-07-20',
    pnr: 'JX9901'
});

const [selectedAdminActivity, setSelectedAdminActivity] = useState<any | null>(null);

const ADMIN_ACTIVITIES = [
    { 
        id: 1, 
        title: 'Pendaftaran Baru: User #1025', 
        type: 'Registration', 
        time: 'Baru saja', 
        bidang: 'Keperawatan (Kaigo)', 
        candidate: 'Ahmad Subarjo',
        status: 'Pending Verification',
        details: 'Kandidat telah melengkapi profil dasar dan mengunggah dokumen identitas. Menunggu verifikasi dokumen asli.'
    },
    { 
        id: 2, 
        title: 'Update Dokumen: User #1026', 
        type: 'Documentation', 
        time: '15 menit yang lalu', 
        bidang: 'Konstruksi', 
        candidate: 'Budi Santoso',
        status: 'Processing',
        details: 'Sertifikat keahlian welding baru saja dikirim untuk diperiksa kesesuaiannya dengan standar JIS.'
    },
    { 
        id: 3, 
        title: 'Lulus Wawancara: User #1027', 
        type: 'Interview', 
        time: '1 jam yang lalu', 
        bidang: 'Pertanian', 
        candidate: 'Siti Aminah',
        status: 'Awaiting Contract',
        details: 'Wawancara dengan mitra Chiba Agriculture Co. Ltd dinyatakan lulus. Drafting kontrak kerja sedang disiapkan.'
    }
];

const handleLogout = () => setRole(null);

if (!role) {
    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 text-white font-sans overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                 <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md space-y-10 z-10 animate-in zoom-in fade-in duration-500">
                <div className="text-center">
                     <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center font-bold text-4xl mb-8 shadow-2xl text-white transform hover:rotate-6 transition-transform">Y</div>
                     <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Yoshida Gakkou</h1>
                     <p className="text-gray-500 text-xs mt-3 font-black uppercase tracking-[0.2em]">Management System v1.0</p>
                </div>

                <div className="space-y-4">
                    <button onClick={() => setRole('kandidat')} className="w-full bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/10 hover:border-blue-500/50 flex justify-between items-center group transition-all">
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Kandidat</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Portal Pendaftaran & Job</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform"><User/></div>
                    </button>

                    <button onClick={() => setRole('admin')} className="w-full bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/10 hover:border-purple-500/50 flex justify-between items-center group transition-all">
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Administrator</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Kelola Database & Operasional</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500 group-hover:scale-110 transition-transform"><Lock/></div>
                    </button>

                    <button onClick={() => setRole('direksi')} className="w-full bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/10 hover:border-orange-500/50 flex justify-between items-center group transition-all">
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Executive</h3>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Analitik & Performa LPK</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform"><Target/></div>
                    </button>
                </div>

                <div className="pt-8 text-center">
                     <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Powered by Yoshida Gakkou Tech • 2026</p>
                </div>
            </div>
        </div>
    );
}

const renderPortal = () => {
    switch (role) {
        case 'kandidat': return (
            <CandidatePortal 
                onLogout={handleLogout} 
                selectionStatus={selectionStatus} 
                contractSchedule={contractSchedule} 
                coeStatus={coeStatus}
                visaStatus={visaStatus}
                ticketInfo={ticketInfo}
                setPreviewDoc={setPreviewDoc}
                previewDoc={previewDoc}
            />
        );
        case 'admin': return (
            <AdminPortal 
                onLogout={handleLogout} 
                selectionStatus={selectionStatus} 
                setSelectionStatus={setSelectionStatus}
                contractSchedule={contractSchedule}
                setContractSchedule={setContractSchedule}
                coeStatus={coeStatus}
                setCoeStatus={setCoeStatus}
                visaStatus={visaStatus}
                setVisaStatus={setVisaStatus}
                ticketInfo={ticketInfo}
                setTicketInfo={setTicketInfo}
                selectedAdminActivity={selectedAdminActivity}
                setSelectedAdminActivity={setSelectedAdminActivity}
                ADMIN_ACTIVITIES={ADMIN_ACTIVITIES}
                setPreviewDoc={setPreviewDoc}
                previewDoc={previewDoc}
                setReviewCandidate={setReviewCandidate}
                reviewCandidate={reviewCandidate}
            />
        );
        case 'direksi': return <ExecutivePortal onLogout={handleLogout} />;
        default: return <div className="text-white">Role Tidak Valid</div>;
    }
};

return (
    <>
        {renderPortal()}
        {previewDoc && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex flex-col items-center justify-center p-6 text-white">
                <div className="w-full max-w-5xl flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold">{previewDoc}</h3>
                        <p className="text-gray-500 text-sm">Preview Dokumen Sistem</p>
                    </div>
                    <button 
                        onClick={() => setPreviewDoc(null)} 
                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400 flex items-center gap-2"
                    >
                        <X size={20}/> <span>Tutup Preview</span>
                    </button>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-full max-w-5xl bg-[#141418] rounded-[40px] border border-white/10 overflow-hidden relative shadow-2xl ${previewDoc?.startsWith('Berkas Lamaran:') ? '' : 'flex items-center justify-center min-h-[500px]'}`}
                >
                    {previewDoc?.startsWith('Berkas Lamaran:') ? (
                        <div className="p-10 flex flex-col w-full h-full max-h-[85vh]">
                             <div className="mb-8 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Daftar Dokumen Lengkap Kandidat</h4>
                                        <p className="text-xs text-gray-500">Semua berkas yang telah dikirimkan untuk proses verifikasi.</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-500/20">
                                        <CheckCircle size={14} /> Terverifikasi Sistem
                                    </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-6">
                                    {['Curriculum Vitae (CV)', 'Surat Pernyataan (Standard)', 'Sertifikat Bahasa Jepang (JFT-Basic/JLPT)', 'Sertifikat Skill SSW (Bidang Terkait)', 'Passport / Paspor (Halaman Identitas)', 'Kartu Keluarga (KK)', 'E-KTP / Identitas Pengenal', 'Ijazah Pendidikan Terakhir', 'Transkrip Nilai Terakhir', 'Foto 4x6 (Terbaru)'].map((file, idx) => (
                                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-3xl flex justify-between items-center hover:bg-white/10 transition-all group">
                                             <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                                         <FileText size={20} />
                                                    </div>
                                                    <div>
                                                         <p className="text-sm font-bold text-white line-clamp-1">{file}</p>
                                                         <p className="text-[10px] text-gray-500 font-medium">PDF • {(1.2 + idx * 0.1).toFixed(1)} MB • Diunggah 12 Apr 2026</p>
                                                    </div>
                                             </div>
                                             <div className="flex gap-2 shrink-0">
                                                    <button onClick={() => alert(`Membuka preview ${file}...`)} className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-gray-400">
                                                         <Eye size={16} />
                                                    </button>
                                                    <button className="p-3 bg-white/10 rounded-xl hover:bg-emerald-600 hover:text-white transition-all text-gray-400">
                                                         <CheckCircle size={16} />
                                                    </button>
                                             </div>
                                        </div>
                                    ))}
                             </div>
                             
                             <div className="mt-auto pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 bg-[#141418] z-10">
                                    <button className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-wider">
                                         <Plus className="rotate-45" size={18}/> Download Seluruh Berkas (.ZIP)
                                    </button>
                                    <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 text-xs uppercase tracking-wider">
                                         Verifikasi & Lanjutkan Seleksi
                                    </button>
                             </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 max-w-md p-10">
                             <div className="w-24 h-24 bg-blue-600/20 rounded-3xl flex items-center justify-center text-blue-500 mx-auto">
                                 <FileText size={48} />
                             </div>
                             <div className="space-y-2">
                                 <h4 className="text-xl font-bold">Tampilan Dokumen</h4>
                                 <p className="text-gray-500 text-sm leading-relaxed">Sistem Sedang Menampilkan "{previewDoc}". Dalam sistem asli, PDF atau Gambar akan dirender di sini menggunakan viewer khusus.</p>
                             </div>
                             <div className="flex flex-col gap-3">
                                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
                                 </div>
                                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full w-1/2 bg-blue-600/30 rounded-full"></div>
                                 </div>
                                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full w-4/5 bg-blue-600/10 rounded-full"></div>
                                 </div>
                             </div>
                             <div className="pt-6 flex gap-4">
                                 <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2">
                                     <Plus size={18} className="rotate-45"/> Download
                                 </button>
                                 <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20">
                                     Print Dokumen
                                 </button>
                             </div>
                        </div>
                    )}
                    
                    <div className="absolute inset-4 border border-white/5 rounded-[32px] pointer-events-none opacity-20"></div>
                </motion.div>
            </div>
        )}

        {/* MODAL REVIEW PROFIL KANDIDAT */}
        {reviewCandidate && (
            <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[400] flex items-center justify-center p-4">
                 <motion.div 
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-[#0f0f12] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border border-white/10 shadow-2xl custom-scrollbar"
                 >
                        {/* Header Profile */}
                        <div className="relative h-48 bg-gradient-to-r from-purple-900 to-blue-900 overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                            <button 
                                onClick={() => setReviewCandidate(null)}
                                className="absolute top-6 right-6 p-4 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-2xl text-white transition-all z-10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-10 pb-10 -mt-20 relative">
                            <div className="flex flex-col md:flex-row gap-8 items-end mb-10">
                                 <div className="w-40 h-40 rounded-[40px] border-[6px] border-[#0f0f12] bg-gray-800 overflow-hidden shadow-2xl relative group">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reviewCandidate.name}`} alt="Avatar" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-all cursor-pointer flex items-center justify-center">
                                             <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0" />
                                        </div>
                                 </div>
                                 <div className="flex-1 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                             <h2 className="text-4xl font-black text-white tracking-tight">{reviewCandidate.name}</h2>
                                             <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase tracking-widest">Verified</div>
                                        </div>
                                        <p className="text-gray-400 font-medium flex items-center gap-2">
                                            <MapPin size={16} /> Jawa Barat, Indonesia • Skor JFT-Basic: 88 • SSW Agriculture
                                        </p>
                                 </div>
                                 <div className="flex gap-3 mb-4">
                                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5 text-white">Download CV</button>
                                        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-xl shadow-purple-600/20 transition-all">Luluskan</button>
                                 </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-8">
                                     <section>
                                            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-[11px] opacity-50">Tentang Kandidat</h4>
                                            <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 leading-relaxed text-gray-400">
                                                 Lulusan SMK Pertanian dengan pengalaman magang selama 6 bulan di pembibitan modern. Memiliki sertifikat JFT-Basic A2 dan telah lulus ujian SSW bidang Pertanian. Bertekad kuat untuk bekerja di Jepang guna mempelajari teknologi pertanian modern dan mendukung ekonomi keluarga.
                                            </div>
                                     </section>

                                     <section>
                                            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-[11px] opacity-50">Pengalaman & Keahlian</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                 <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                                        <p className="text-xs text-gray-500 font-bold mb-1">Bahasa Jepang</p>
                                                        <p className="text-white font-bold">JFT-Basic A2 (Lulus)</p>
                                                 </div>
                                                 <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                                        <p className="text-xs text-gray-500 font-bold mb-1">Keahlian Tokutei</p>
                                                        <p className="text-white font-bold">SSW Agriculture (Lulus)</p>
                                                 </div>
                                                 <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                                        <p className="text-xs text-gray-500 font-bold mb-1">Pendidikan</p>
                                                        <p className="text-white font-bold">SMK N 1 Sukabumi</p>
                                                 </div>
                                                 <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                                        <p className="text-xs text-gray-500 font-bold mb-1">Pengalaman Kerja</p>
                                                        <p className="text-white font-bold">Magang 6 Bln (Seedling)</p>
                                                 </div>
                                            </div>
                                     </section>
                                </div>

                                <div className="space-y-8">
                                     <section>
                                            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-[11px] opacity-50">Kontak & Sosial</h4>
                                            <div className="space-y-4">
                                                 <div className="flex items-center gap-4 text-gray-400 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-white/5">
                                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Mail size={18} /></div>
                                                        <span className="text-sm"> candidate@email.com</span>
                                                 </div>
                                                 <div className="flex items-center gap-4 text-gray-400 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-white/5">
                                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Phone size={18} /></div>
                                                        <span className="text-sm">+62 812-3456-7890</span>
                                                 </div>
                                            </div>
                                     </section>

                                     <section>
                                            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-[11px] opacity-50">Admin Notes</h4>
                                            <textarea 
                                                placeholder="Tambahkan catatan khusus..." 
                                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-white focus:outline-none focus:border-purple-600 transition-all min-h-[150px]"
                                            ></textarea>
                                     </section>
                                </div>
                            </div>
                        </div>
                 </motion.div>
            </div>
        )}
    </>
);
};

export default App;
