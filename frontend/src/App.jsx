import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import api from './api';

// --- INLINE SVG ICONS ---
const Icons = {
  Building: () => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Bed: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Alert: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Megaphone: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Radar: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 4a6 6 0 106 6 6 6 0 00-6-6zm0 4a2 2 0 102 2 2 2 0 00-2-2z" />
    </svg>
  ),
  LocationPin: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Logout: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  CreditCard: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Receipt: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
  Qrcode: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

// Global Toast State
let triggerToast = () => {};

// --- LAYOUT & NAVIGATION ---
function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const u = getUser();
  const [toast, setToast] = useState('');

  useEffect(() => {
    triggerToast = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(''), 3500);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Icons.Dashboard /> },
    { label: 'Rooms', path: '/rooms', icon: <Icons.Bed /> },
    { label: 'Hostel Fees', path: '/payments', icon: <Icons.CreditCard /> },
    { label: 'Complaints', path: '/complaints', icon: <Icons.Alert /> },
    { label: 'Leave Requests', path: '/leaves', icon: <Icons.Calendar /> },
    { label: 'Notices', path: '/notices', icon: <Icons.Megaphone /> },
  ];

  // ADMIN-ONLY FEATURES: Live Student Radar Tracker & User Directory
  if (u?.role === 'ADMIN') {
    navItems.push({
      label: 'Live Radar Tracker',
      path: '/tracker',
      icon: <Icons.Radar />,
      isLive: true,
    });
    navItems.push({ label: 'Users', path: '/users', icon: <Icons.Users /> });
  }

  const getPageTitle = () => {
    const item = navItems.find((n) => n.path === location.pathname);
    return item ? item.label : 'Hostel Management Portal';
  };

  return (
    <div className="app">
      <aside>
        <div className="brand-header">
          <div className="brand-logo">
            <Icons.Building />
          </div>
          <div className="brand-text">
            <h2>SentinelMind</h2>
            <span>Hostel Portal</span>
          </div>
        </div>

        <span className="nav-group-title">Main Navigation</span>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.isLive && <span className="nav-live-dot" title="Live GPS Tracking Active" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini-card">
            <div className="user-avatar">{getInitials(u?.name)}</div>
            <div className="user-details">
              <div className="uname" title={u?.name}>{u?.name || 'User'}</div>
              <div className="urole">{u?.role}</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <Icons.Logout />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="topbar-left">
            <h1>{getPageTitle()}</h1>
            <p>Hostel Management &amp; Student Living System</p>
          </div>
          <div className="topbar-right">
            <div className="status-pill">
              <span className="pulse-dot"></span>
              <span>Online · MySQL Connected</span>
            </div>
            <span className="badge badge-purple">
              <span className="badge-dot"></span>
              {u?.role}
            </span>
          </div>
        </header>

        <section className="content">{children}</section>

        {toast && (
          <div className="toast-notification">
            <span className="toast-dot"></span>
            <span>{toast}</span>
          </div>
        )}
      </main>
    </div>
  );
}

// --- STUDENT LOCATION CHECK-IN WIDGET ---
function StudentLocationWidget({ studentId }) {
  const [locationStatus, setLocationStatus] = useState(null);
  const [zone, setZone] = useState('Hostel Block A - Study Room');
  const [syncing, setSyncing] = useState(false);

  const fetchStatus = () => {
    if (!studentId) return;
    api.get(`/location/student/${studentId}`).then((res) => {
      if (res.data) setLocationStatus(res.data);
    }).catch(() => {});
  };

  useEffect(() => {
    fetchStatus();
  }, [studentId]);

  const handleBrowserGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setSyncing(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          await api.post(`/location/student/${studentId}`, {
            latitude: lat,
            longitude: lng,
            zoneName: zone,
            permissionGranted: true,
          });
          fetchStatus();
          triggerToast('📍 GPS Location permission granted & synced with Admin radar!');
        } catch (err) {
          console.error(err);
        } finally {
          setSyncing(false);
        }
      },
      async (err) => {
        // Fallback with simulated campus coordinates if user denies browser prompt
        console.warn('Browser GPS permission prompt dismissed, recording zone:', err);
        try {
          await api.post(`/location/student/${studentId}`, {
            latitude: 28.6139,
            longitude: 77.2090,
            zoneName: zone,
            permissionGranted: true,
          });
          fetchStatus();
          triggerToast('📍 Campus Zone Check-in updated successfully!');
        } finally {
          setSyncing(false);
        }
      }
    );
  };

  return (
    <div className="student-checkin-banner">
      <div className="checkin-info">
        <h3>
          <Icons.LocationPin />
          Safety &amp; Student Location Permission Status
        </h3>
        <p>
          {locationStatus
            ? `Your current location status is active. Last check-in: ${locationStatus.zoneName} (${locationStatus.status}) at ${new Date(locationStatus.lastUpdated).toLocaleTimeString()}. Admin can monitor your campus perimeter safety.`
            : 'Warden and Admin track student campus safety during curfew hours. Please grant location check-in permission.'}
        </p>
      </div>

      <div className="checkin-actions">
        <select
          className="quick-zone-select"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          <option value="Hostel Block A - Room">Hostel Block A (Room)</option>
          <option value="Central Library & Study Wing">Central Library</option>
          <option value="Hostel Dining Hall / Mess">Dining Hall / Mess</option>
          <option value="Campus Sports Ground">Sports Ground</option>
          <option value="Off-Campus City Market">Off-Campus City Market</option>
          <option value="Outstation Journey (Home Visit)">Outstation Journey</option>
        </select>
        <button
          className="btn btn-sm btn-primary"
          onClick={handleBrowserGPS}
          disabled={syncing}
        >
          <Icons.Refresh />
          {syncing ? 'Syncing...' : 'Sync Live GPS Location'}
        </button>
      </div>
    </div>
  );
}

// --- ADMIN-ONLY: LIVE RADAR & STUDENT TRACKER ---
function LiveStudentTracker() {
  const [locations, setLocations] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    api.get('/admin/student-locations')
      .then((res) => {
        setLocations(res.data || []);
        if (res.data && res.data.length > 0 && !selectedStudent) {
          setSelectedStudent(res.data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // 10s live pulse
    return () => clearInterval(interval);
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const student = loc.student;
    const nameMatch = student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      loc.zoneName?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!nameMatch) return false;
    if (filterStatus === 'ON_CAMPUS') return loc.status === 'ON_CAMPUS';
    if (filterStatus === 'OFF_CAMPUS') return loc.status === 'OFF_CAMPUS';
    return true;
  });

  // Calculate Radar Blip Position relative to a center hub (28.6139, 77.2090)
  const getRadarCoordinates = (lat, lng, idx) => {
    const centerLat = 28.6139;
    const centerLng = 77.2090;

    // Scale difference to fit 0% to 100% of radar container
    let dx = (lng - centerLng) * 1200;
    let dy = (centerLat - lat) * 1200;

    // Distribute nicely across radar canvas
    let x = 50 + (dx || (Math.cos(idx * 1.5) * (20 + idx * 7)));
    let y = 50 + (dy || (Math.sin(idx * 1.5) * (20 + idx * 7)));

    x = Math.max(10, Math.min(90, x));
    y = Math.max(10, Math.min(90, y));

    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <>
      <div className="hero" style={{ background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%)' }}>
        <span className="hero-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
          🛡️ ADMIN EXCLUSIVE SECURITY RADAR
        </span>
        <h2>Live Student Geofence &amp; Location Tracker</h2>
        <p>
          Real-time perimeter monitoring and permission auditing. Track students inside the
          hostel campus, detect night curfew breaches, and verify outstation travel.
        </p>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Monitored Students</div>
            <div className="stat-value">{locations.length}</div>
            <div className="stat-sub">Permission granted</div>
          </div>
          <div className="stat-icon blue">
            <Icons.Radar />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Inside Campus</div>
            <div className="stat-value">
              {locations.filter((l) => l.status === 'ON_CAMPUS').length}
            </div>
            <div className="stat-sub">Within safe perimeter</div>
          </div>
          <div className="stat-icon green">
            <Icons.Building />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Off-Campus / Leave</div>
            <div className="stat-value">
              {locations.filter((l) => l.status === 'OFF_CAMPUS').length}
            </div>
            <div className="stat-sub">Approved or outstation</div>
          </div>
          <div className="stat-icon amber">
            <Icons.LocationPin />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Radar Sync Pulse</div>
            <div className="stat-value">10s</div>
            <div className="stat-sub">Automated telemetry</div>
          </div>
          <div className="stat-icon purple">
            <Icons.Refresh />
          </div>
        </div>
      </div>

      <div className="tracker-layout">
        {/* RADAR INTERACTIVE HUD */}
        <div className="radar-screen-card">
          <div className="radar-header">
            <h3>
              <Icons.Radar />
              Hostel Campus Sector Radar (Live Telemetry)
            </h3>
            <span className="radar-hud-tag">
              <span className="pulse-dot"></span>
              RADAR ACTIVE
            </span>
          </div>

          <div className="radar-canvas-container">
            {/* Concentric Distance Rings */}
            <div className="radar-ring r1" title="Hostel Block (100m)"></div>
            <div className="radar-ring r2" title="Inner Perimeter (250m)"></div>
            <div className="radar-ring r3" title="Campus Boundary (500m)"></div>
            <div className="radar-ring r4" title="Off-Campus Zone (1km+)"></div>

            {/* Crosshairs */}
            <div className="radar-crosshair-h"></div>
            <div className="radar-crosshair-v"></div>

            {/* Sweeping Beam */}
            <div className="radar-sweep-beam"></div>

            {/* Center Campus Hub */}
            <div className="radar-center-hub" title="Central Hostel Tower / Gate"></div>

            {/* Dynamic Student Blips */}
            {filteredLocations.map((loc, idx) => {
              const pos = getRadarCoordinates(loc.latitude, loc.longitude, idx);
              const isSelected = selectedStudent?.id === loc.id;
              const statusClass = loc.status === 'ON_CAMPUS' ? 'on-campus' : 'off-campus';

              return (
                <div
                  key={loc.id}
                  className={`radar-blip ${statusClass}`}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedStudent(loc)}
                >
                  <div className="radar-blip-dot">
                    {isSelected && <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />}
                  </div>
                  <div className="radar-blip-label">
                    {loc.student?.name || 'Student'}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
            <span>🟢 Green: Inside Hostel Perimeter</span>
            <span>🟡 Amber: Off-Campus / Outstation</span>
            <span>📡 Target: Sentinel Central Hub</span>
          </div>
        </div>

        {/* DETAILS SIDEBAR PANEL */}
        <div className="radar-detail-panel">
          <div className="radar-detail-header">
            <h4>Target Student Intelligence</h4>
          </div>

          {selectedStudent ? (
            <div className="selected-student-box">
              <div className="selected-student-title">
                <span className="selected-student-name">{selectedStudent.student?.name}</span>
                <span className={`badge ${selectedStudent.status === 'ON_CAMPUS' ? 'badge-green' : 'badge-yellow'}`}>
                  {selectedStudent.status}
                </span>
              </div>

              <div className="selected-info-row">
                <span>Official Email:</span>
                <strong>{selectedStudent.student?.email}</strong>
              </div>
              <div className="selected-info-row">
                <span>Student ID:</span>
                <strong>{selectedStudent.student?.studentId || 'STU-GEN-01'}</strong>
              </div>
              <div className="selected-info-row">
                <span>Current Zone:</span>
                <strong style={{ color: '#4f46e5' }}>{selectedStudent.zoneName}</strong>
              </div>
              <div className="selected-info-row">
                <span>Coordinates:</span>
                <code>{selectedStudent.latitude?.toFixed(4)}, {selectedStudent.longitude?.toFixed(4)}</code>
              </div>
              <div className="selected-info-row">
                <span>Permission Granted:</span>
                <strong>{selectedStudent.permissionGranted ? '✅ Active' : '❌ Denied'}</strong>
              </div>
              <div className="selected-info-row">
                <span>Last Pinged:</span>
                <span>{new Date(selectedStudent.lastUpdated).toLocaleTimeString()}</span>
              </div>

              <button
                className="btn btn-sm btn-outline"
                style={{ width: '100%', marginTop: '14px' }}
                onClick={() => {
                  triggerToast(`📡 Ping signal dispatched to ${selectedStudent.student?.name}`);
                }}
              >
                <Icons.Refresh />
                Send Safety Ping
              </button>
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Click any blip on the radar or choose a student from the roster below to view detailed geofence data.
            </p>
          )}

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>
              Geofence Controls:
            </h5>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className={`btn btn-sm ${filterStatus === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('ALL')}
              >
                All ({locations.length})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'ON_CAMPUS' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('ON_CAMPUS')}
              >
                On-Campus
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'OFF_CAMPUS' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('OFF_CAMPUS')}
              >
                Off-Campus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT ROSTER TABLE */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h2>
            <Icons.Users />
            Active Student Telemetry Roster
          </h2>
          <input
            style={{ width: '260px', padding: '8px 12px', fontSize: '13px' }}
            placeholder="Search student or zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Current Zone / Landmark</th>
                <th>GPS Coordinates</th>
                <th>Geofence Status</th>
                <th>Last Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>
                    No matching student telemetry found.
                  </td>
                </tr>
              ) : (
                filteredLocations.map((loc) => (
                  <tr
                    key={loc.id}
                    style={{ background: selectedStudent?.id === loc.id ? '#f1f5f9' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSelectedStudent(loc)}
                  >
                    <td>
                      <strong>{loc.student?.name}</strong>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{loc.student?.email}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{loc.zoneName}</span>
                    </td>
                    <td>
                      <code>{loc.latitude?.toFixed(4)}, {loc.longitude?.toFixed(4)}</code>
                    </td>
                    <td>
                      <span className={`badge ${loc.status === 'ON_CAMPUS' ? 'badge-green' : 'badge-yellow'}`}>
                        <span className="badge-dot"></span>
                        {loc.status}
                      </span>
                    </td>
                    <td>{new Date(loc.lastUpdated).toLocaleTimeString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudent(loc);
                          triggerToast(`Focusing radar on ${loc.student?.name}`);
                        }}
                      >
                        Focus Radar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- LOGIN PAGE ---
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@hostel.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState('ADMIN');

  const setDemo = (role, email, password) => {
    setActiveDemo(role);
    setForm({ email, password });
    setError('');
  };

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <Icons.Building />
          </div>
          <h1>Sentinel Hostel Portal</h1>
          <p>Sign in to access your administrative dashboard</p>
        </div>

        {error && <div className="alert-error" style={{ marginBottom: '18px' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Official Email</label>
            <input
              type="email"
              placeholder="e.g. admin@hostel.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Security Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="demo-pills">
          <div className="demo-title">Quick Demo Logins</div>
          <div className="demo-btn-group">
            <button
              type="button"
              className={`demo-chip ${activeDemo === 'ADMIN' ? 'active' : ''}`}
              onClick={() => setDemo('ADMIN', 'admin@hostel.com', 'admin123')}
            >
              👑 Admin
            </button>
            <button
              type="button"
              className={`demo-chip ${activeDemo === 'WARDEN' ? 'active' : ''}`}
              onClick={() => setDemo('WARDEN', 'warden@hostel.com', 'warden123')}
            >
              🛡️ Warden
            </button>
            <button
              type="button"
              className={`demo-chip ${activeDemo === 'STUDENT' ? 'active' : ''}`}
              onClick={() => setDemo('STUDENT', 'student@hostel.com', 'student123')}
            >
              🎓 Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DASHBOARD ---
function Dashboard() {
  const u = getUser();
  const [stats, setStats] = useState({ rooms: 0, notices: 0, complaints: 0, leaves: 0, fees: 0 });

  useEffect(() => {
    api.get('/rooms').then((r) => setStats((s) => ({ ...s, rooms: r.data?.length || 0 }))).catch(() => {});
    api.get('/notices').then((r) => setStats((s) => ({ ...s, notices: r.data?.length || 0 }))).catch(() => {});
    if (u?.role === 'STUDENT' && u?.id) {
      api.get(`/complaints/student/${u.id}`).then((r) => setStats((s) => ({ ...s, complaints: r.data?.length || 0 }))).catch(() => {});
      api.get(`/leaves/student/${u.id}`).then((r) => setStats((s) => ({ ...s, leaves: r.data?.length || 0 }))).catch(() => {});
      api.get(`/payments/student/${u.id}`).then((r) => {
        const pending = (r.data || [])
          .filter((p) => p.status !== 'PAID')
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        setStats((s) => ({ ...s, fees: pending }));
      }).catch(() => {});
    } else {
      api.get('/complaints').then((r) => setStats((s) => ({ ...s, complaints: r.data?.length || 0 }))).catch(() => {});
      api.get('/leaves').then((r) => setStats((s) => ({ ...s, leaves: r.data?.length || 0 }))).catch(() => {});
      api.get('/payments').then((r) => {
        const collected = (r.data || [])
          .filter((p) => p.status === 'PAID')
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        setStats((s) => ({ ...s, fees: collected }));
      }).catch(() => {});
    }
  }, [u?.id, u?.role]);

  return (
    <>
      <div className="hero">
        <span className="hero-tag">{u?.role} OVERVIEW</span>
        <h2>Welcome back, {u?.name}!</h2>
        <p>
          Real-time hostel management dashboard. Track room allocations, student complaints,
          leave permissions, fee collections, and official announcements with full role-based security.
        </p>
      </div>

      {/* STUDENT LOCATION CHECK-IN WIDGET FOR STUDENTS */}
      {u?.role === 'STUDENT' && <StudentLocationWidget studentId={u?.id} />}

      <div className="grid-stats">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Hostel Rooms</div>
            <div className="stat-value">{stats.rooms}</div>
            <div className="stat-sub">Across all blocks</div>
          </div>
          <div className="stat-icon blue">
            <Icons.Bed />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Active Notices</div>
            <div className="stat-value">{stats.notices}</div>
            <div className="stat-sub">Official circulars</div>
          </div>
          <div className="stat-icon purple">
            <Icons.Megaphone />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">
              {u?.role === 'STUDENT' ? 'My Complaints' : 'Total Complaints'}
            </div>
            <div className="stat-value">{stats.complaints}</div>
            <div className="stat-sub">Maintenance &amp; services</div>
          </div>
          <div className="stat-icon amber">
            <Icons.Alert />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">
              {u?.role === 'STUDENT' ? 'My Leaves' : 'Leave Requests'}
            </div>
            <div className="stat-value">{stats.leaves}</div>
            <div className="stat-sub">Absence applications</div>
          </div>
          <div className="stat-icon green">
            <Icons.Calendar />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">
              {u?.role === 'STUDENT' ? 'Pending Dues' : 'Fees Collected'}
            </div>
            <div className="stat-value" style={{ color: u?.role === 'STUDENT' && stats.fees > 0 ? '#dc2626' : '#059669' }}>
              ₹{Number(stats.fees).toLocaleString('en-IN')}
            </div>
            <div className="stat-sub">
              {u?.role === 'STUDENT' ? 'Payable via UPI / Card' : 'Total verified dues'}
            </div>
          </div>
          <div className={`stat-icon ${u?.role === 'STUDENT' && stats.fees > 0 ? 'rose' : 'green'}`}>
            <Icons.CreditCard />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.Building />
            Quick Guidelines &amp; Campus Protocol
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7' }}>
          • <strong>Students:</strong> Keep your room number updated and file maintenance complaints as soon as issues arise. Apply for outstation leaves at least 24 hours in advance.<br />
          • <strong>Wardens:</strong> Regularly review pending leave applications and verify emergency contact details. Close maintenance tickets once facilities resolve complaints.<br />
          • <strong>Administrators:</strong> Monitor the real-time Student Location Radar, configure room allocations, monitor occupancy rates, and broadcast updates.
        </p>
      </div>
    </>
  );
}

// --- ROOMS MANAGEMENT ---
function Rooms() {
  const u = getUser();
  const canManage = u?.role === 'ADMIN' || u?.role === 'WARDEN';
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ roomNumber: '', blockName: 'Block A', capacity: 2, occupied: 0 });

  const loadRooms = () => {
    api.get('/rooms').then((res) => setRooms(res.data || [])).catch(() => {});
  };

  useEffect(() => {
    loadRooms();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await api.post('/rooms', {
      ...form,
      capacity: Number(form.capacity),
      occupied: Number(form.occupied),
    });
    setForm({ roomNumber: '', blockName: 'Block A', capacity: 2, occupied: 0 });
    triggerToast('🏠 New room registered successfully!');
    loadRooms();
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await api.delete(`/rooms/${id}`);
      triggerToast('🗑️ Room removed from database.');
      loadRooms();
    }
  }

  const getStatusBadge = (status) => {
    if (status === 'AVAILABLE') return 'badge-green';
    if (status === 'UNDER_MAINTENANCE' || status === 'MAINTENANCE') return 'badge-yellow';
    return 'badge-blue';
  };

  return (
    <>
      {canManage && (
        <div className="card form-card">
          <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
            <h2>
              <Icons.Plus />
              Add New Hostel Unit
            </h2>
          </div>
          <form className="form-grid" onSubmit={handleAdd}>
            <div className="form-group">
              <label>Room Number</label>
              <input
                placeholder="e.g. A-301"
                value={form.roomNumber}
                onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Block Name</label>
              <input
                placeholder="e.g. Block A"
                value={form.blockName}
                onChange={(e) => setForm({ ...form, blockName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Max Capacity</label>
              <input
                type="number"
                min="1"
                max="8"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ height: '42px' }}>
              <Icons.Plus />
              Create Room
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.Bed />
            Room Directory &amp; Occupancy
          </h2>
          <span className="count-pill">{rooms.length} Units</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Room No</th>
                <th>Hostel Block</th>
                <th>Capacity</th>
                <th>Occupied</th>
                <th>Current Status</th>
                {canManage && <th>Management</th>}
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={canManage ? 6 : 5} style={{ textAlign: 'center', padding: '32px' }}>
                    No rooms recorded in database.
                  </td>
                </tr>
              ) : (
                rooms.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.roomNumber}</strong></td>
                    <td>{r.blockName || r.block || 'Main Block'}</td>
                    <td>{r.capacity} beds</td>
                    <td>{r.occupied || 0}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(r.status)}`}>
                        <span className="badge-dot"></span>
                        {r.status || 'AVAILABLE'}
                      </span>
                    </td>
                    {canManage && (
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(r.id)}
                          title="Delete room"
                        >
                          <Icons.Trash />
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- COMPLAINTS MANAGEMENT ---
function Complaints() {
  const u = getUser();
  const isStudent = u?.role === 'STUDENT';
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const loadComplaints = () => {
    if (isStudent && u?.id) {
      api.get(`/complaints/student/${u.id}`).then((res) => setComplaints(res.data || [])).catch(() => {});
    } else {
      api.get('/complaints').then((res) => setComplaints(res.data || [])).catch(() => {});
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [u?.id, isStudent]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!u?.id) return;
    await api.post(`/complaints/student/${u.id}`, form);
    setForm({ title: '', description: '' });
    triggerToast('📝 Complaint ticket submitted to hostel warden.');
    loadComplaints();
  }

  async function updateStatus(id, newStatus) {
    await api.put(`/complaints/${id}/status?status=${newStatus}`);
    triggerToast(`Ticket #${id} status updated to ${newStatus}`);
    loadComplaints();
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return 'badge-green';
      case 'IN_PROGRESS':
        return 'badge-blue';
      default:
        return 'badge-yellow';
    }
  };

  return (
    <>
      {isStudent && (
        <div className="card form-card">
          <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
            <h2>
              <Icons.Plus />
              Submit Service or Maintenance Ticket
            </h2>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label>Ticket Subject / Category</label>
              <input
                placeholder="e.g. Electrical: Ceiling fan speed regulator broken"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Detailed Issue Description</label>
              <textarea
                placeholder="Explain the problem and include your room number..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Icons.Alert />
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.Alert />
            {isStudent ? 'My Support Tickets' : 'Hostel Complaint Register'}
          </h2>
          <span className="count-pill">{complaints.length} Tickets</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                {!isStudent && <th>Student Details</th>}
                <th>Title / Issue</th>
                <th>Description</th>
                <th>Status</th>
                {!isStudent && <th>Warden Action</th>}
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={isStudent ? 4 : 6} style={{ textAlign: 'center', padding: '32px' }}>
                    No complaints registered. Everything is smooth!
                  </td>
                </tr>
              ) : (
                complaints.map((c) => (
                  <tr key={c.id}>
                    <td><strong>#{c.id}</strong></td>
                    {!isStudent && (
                      <td>
                        <strong>{c.student?.name || 'Student'}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{c.student?.email}</div>
                      </td>
                    )}
                    <td>{c.title}</td>
                    <td style={{ maxWidth: '340px' }}>{c.description}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(c.status)}`}>
                        <span className="badge-dot"></span>
                        {c.status}
                      </span>
                    </td>
                    {!isStudent && (
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {c.status !== 'IN_PROGRESS' && (
                            <button
                              className="btn btn-sm btn-outline"
                              onClick={() => updateStatus(c.id, 'IN_PROGRESS')}
                            >
                              In Progress
                            </button>
                          )}
                          {c.status !== 'RESOLVED' && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => updateStatus(c.id, 'RESOLVED')}
                            >
                              <Icons.Check />
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- LEAVE REQUESTS ---
function LeaveRequests() {
  const u = getUser();
  const isStudent = u?.role === 'STUDENT';
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ fromDate: '', toDate: '', reason: '' });

  const loadLeaves = () => {
    if (isStudent && u?.id) {
      api.get(`/leaves/student/${u.id}`).then((res) => setLeaves(res.data || [])).catch(() => {});
    } else {
      api.get('/leaves').then((res) => setLeaves(res.data || [])).catch(() => {});
    }
  };

  useEffect(() => {
    loadLeaves();
  }, [u?.id, isStudent]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!u?.id) return;
    await api.post(`/leaves/student/${u.id}`, form);
    setForm({ fromDate: '', toDate: '', reason: '' });
    triggerToast('✈️ Leave application sent for Warden review.');
    loadLeaves();
  }

  async function updateStatus(id, newStatus) {
    await api.put(`/leaves/${id}/status?status=${newStatus}`);
    triggerToast(`Leave request #${id} marked as ${newStatus}`);
    loadLeaves();
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'badge-green';
      case 'REJECTED':
        return 'badge-red';
      default:
        return 'badge-yellow';
    }
  };

  return (
    <>
      {isStudent && (
        <div className="card form-card">
          <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
            <h2>
              <Icons.Plus />
              Apply for Outstation / Night Out Leave
            </h2>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-group">
                <label>Departure Date (From)</label>
                <input
                  type="date"
                  value={form.fromDate}
                  onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Return Date (To)</label>
                <input
                  type="date"
                  value={form.toDate}
                  onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Reason for Leave &amp; Destination</label>
              <textarea
                placeholder="Specify family reason, medical need, or hometown visit..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Icons.Calendar />
              Submit Leave Application
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.Calendar />
            {isStudent ? 'My Outstation Applications' : 'Student Leave Approvals'}
          </h2>
          <span className="count-pill">{leaves.length} Applications</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>App ID</th>
                {!isStudent && <th>Student Details</th>}
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                {!isStudent && <th>Approval Decision</th>}
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={isStudent ? 5 : 7} style={{ textAlign: 'center', padding: '32px' }}>
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaves.map((l) => (
                  <tr key={l.id}>
                    <td><strong>#{l.id}</strong></td>
                    {!isStudent && (
                      <td>
                        <strong>{l.student?.name || 'Student'}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{l.student?.email}</div>
                      </td>
                    )}
                    <td>{l.fromDate || l.startDate}</td>
                    <td>{l.toDate || l.endDate}</td>
                    <td style={{ maxWidth: '300px' }}>{l.reason}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(l.status)}`}>
                        <span className="badge-dot"></span>
                        {l.status}
                      </span>
                    </td>
                    {!isStudent && (
                      <td>
                        {l.status === 'PENDING' ? (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => updateStatus(l.id, 'APPROVED')}
                            >
                              <Icons.Check />
                              Approve
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => updateStatus(l.id, 'REJECTED')}
                            >
                              <Icons.X />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Processed</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- NOTICES ---
function Notices() {
  const u = getUser();
  const canPost = u?.role === 'ADMIN' || u?.role === 'WARDEN';
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const loadNotices = () => {
    api.get('/notices').then((res) => setNotices(res.data || [])).catch(() => {});
  };

  useEffect(() => {
    loadNotices();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await api.post('/notices', form);
    setForm({ title: '', content: '' });
    triggerToast('📢 Notice published to all residents.');
    loadNotices();
  }

  return (
    <>
      {canPost && (
        <div className="card form-card">
          <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
            <h2>
              <Icons.Plus />
              Publish Circular or Notification
            </h2>
          </div>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label>Notice Headline</label>
              <input
                placeholder="e.g. Hostel Wi-Fi Maintenance & Inspection Schedule"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Notice Content</label>
              <textarea
                placeholder="Compose announcement details and instructions for residents..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Icons.Megaphone />
              Broadcast Notice
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.Megaphone />
            Official Hostel Bulletin
          </h2>
          <span className="count-pill">{notices.length} Published</span>
        </div>

        {notices.length === 0 ? (
          <div className="empty-state">
            <Icons.Megaphone />
            <p>No active notices at this moment.</p>
          </div>
        ) : (
          <div className="notice-list">
            {notices.map((n) => (
              <div key={n.id} className="notice-item">
                <div className="notice-meta">
                  <span className="badge badge-blue">
                    <span className="badge-dot"></span>
                    Official Circular #{n.id}
                  </span>
                  <span>{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Active Announcement'}</span>
                </div>
                <h3>{n.title}</h3>
                <p>{n.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// --- USERS DIRECTORY (ADMIN ONLY) ---
function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    api.get('/admin/users').then((res) => setUsers(res.data || [])).catch(() => {});
  };

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this user from the system?')) {
      await api.delete(`/admin/users/${id}`);
      triggerToast('User account removed.');
      loadUsers();
    }
  }

  const getRoleBadge = (role) => {
    if (role === 'ADMIN') return 'badge-purple';
    if (role === 'WARDEN') return 'badge-blue';
    return 'badge-green';
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <Icons.Users />
          System User Directory
        </h2>
        <span className="count-pill">{users.length} Registered Accounts</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Assigned Role</th>
              <th>Dept / Student ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '32px' }}>
                  No accounts found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td><strong>#{u.id}</strong></td>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${getRoleBadge(u.role)}`}>
                      <span className="badge-dot"></span>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {u.department || u.studentId
                      ? `${u.department || ''} ${u.studentId ? `(${u.studentId})` : ''}`
                      : '-'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Icons.Trash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- INDIAN BANKING & UPI PRESETS ---
const POPULAR_BANKS = [
  { id: 'sbi', name: 'State Bank of India', short: 'SBI', code: 'SBI', color: '#0b4d8c', bg: '#f0f9ff', badge: 'Official PSB' },
  { id: 'hdfc', name: 'HDFC Bank', short: 'HDFC', code: 'HDFC', color: '#004c8f', bg: '#eff6ff', badge: 'Instant 24x7' },
  { id: 'icici', name: 'ICICI Bank', short: 'ICICI', code: 'ICICI', color: '#b72025', bg: '#fef2f2', badge: 'iMobile' },
  { id: 'axis', name: 'Axis Bank', short: 'Axis', code: 'AXIS', color: '#97144d', bg: '#fdf2f8', badge: 'Retail Net' },
  { id: 'kotak', name: 'Kotak Mahindra', short: 'Kotak', code: 'KOTAK', color: '#dc2626', bg: '#fef2f2', badge: '811 Portal' },
  { id: 'pnb', name: 'Punjab National Bank', short: 'PNB', code: 'PNB', color: '#a20032', bg: '#fff1f2', badge: 'PNB One' },
];

const OTHER_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'IndusInd Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Federal Bank',
  'Central Bank of India',
  'Bank of India',
  'Indian Overseas Bank',
  'UCO Bank',
  'RBL Bank',
  'South Indian Bank',
  'Karur Vysya Bank',
  'Karnataka Bank',
  'Standard Chartered Bank',
];

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', handle: '@okhdfcbank', color: '#4285F4', tag: 'Fastest' },
  { id: 'phonepe', name: 'PhonePe', handle: '@ybl', color: '#5f259f', tag: 'Instant' },
  { id: 'paytm', name: 'Paytm UPI', handle: '@paytm', color: '#00b9f5', tag: 'Direct' },
  { id: 'bhim', name: 'BHIM UPI', handle: '@upi', color: '#00875a', tag: 'NPCI' },
  { id: 'cred', name: 'CRED UPI', handle: '@cred', color: '#1e293b', tag: 'Rewards' },
];

// Realistic SVG QR Code Component for UPI
function UpiQrSvg({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="10" fill="#ffffff" />
      {/* Top Left Finder */}
      <rect x="12" y="12" width="38" height="38" rx="6" fill="#0f172a" />
      <rect x="18" y="18" width="26" height="26" rx="4" fill="#ffffff" />
      <rect x="23" y="23" width="16" height="16" rx="2" fill="#0f172a" />
      {/* Top Right Finder */}
      <rect x="110" y="12" width="38" height="38" rx="6" fill="#0f172a" />
      <rect x="116" y="18" width="26" height="26" rx="4" fill="#ffffff" />
      <rect x="121" y="23" width="16" height="16" rx="2" fill="#0f172a" />
      {/* Bottom Left Finder */}
      <rect x="12" y="110" width="38" height="38" rx="6" fill="#0f172a" />
      <rect x="18" y="116" width="26" height="26" rx="4" fill="#ffffff" />
      <rect x="23" y="121" width="16" height="16" rx="2" fill="#0f172a" />
      {/* Data Modules & Pattern */}
      <rect x="58" y="16" width="6" height="6" fill="#0f172a" />
      <rect x="68" y="16" width="6" height="6" fill="#0f172a" />
      <rect x="88" y="16" width="6" height="6" fill="#0f172a" />
      <rect x="58" y="28" width="16" height="6" fill="#0f172a" />
      <rect x="84" y="28" width="8" height="6" fill="#0f172a" />
      <rect x="58" y="38" width="8" height="8" fill="#0f172a" />
      <rect x="74" y="38" width="18" height="8" fill="#0f172a" />
      <rect x="16" y="58" width="8" height="8" fill="#0f172a" />
      <rect x="30" y="58" width="18" height="8" fill="#0f172a" />
      <rect x="112" y="58" width="14" height="6" fill="#0f172a" />
      <rect x="134" y="58" width="14" height="6" fill="#0f172a" />
      <rect x="16" y="74" width="28" height="6" fill="#0f172a" />
      <rect x="112" y="72" width="8" height="18" fill="#0f172a" />
      <rect x="128" y="72" width="20" height="8" fill="#0f172a" />
      <rect x="16" y="88" width="8" height="14" fill="#0f172a" />
      <rect x="32" y="88" width="16" height="6" fill="#0f172a" />
      <rect x="124" y="88" width="16" height="14" fill="#0f172a" />
      <rect x="58" y="112" width="8" height="18" fill="#0f172a" />
      <rect x="74" y="112" width="16" height="8" fill="#0f172a" />
      <rect x="98" y="112" width="10" height="8" fill="#0f172a" />
      <rect x="118" y="112" width="8" height="8" fill="#0f172a" />
      <rect x="134" y="112" width="14" height="18" fill="#0f172a" />
      <rect x="74" y="128" width="8" height="18" fill="#0f172a" />
      <rect x="90" y="128" width="18" height="8" fill="#0f172a" />
      <rect x="118" y="128" width="8" height="18" fill="#0f172a" />
      <rect x="58" y="138" width="12" height="8" fill="#0f172a" />
      <rect x="98" y="142" width="10" height="6" fill="#0f172a" />
      {/* Central UPI Emblem */}
      <circle cx="80" cy="80" r="18" fill="#4f46e5" />
      <text x="80" y="84" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        UPI
      </text>
    </svg>
  );
}

// --- HOSTEL FEES & PAYMENTS ---
function Payments() {
  const u = getUser();
  const isAdmin = u?.role === 'ADMIN';
  const isStudent = u?.role === 'STUDENT';

  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState(isStudent ? 'BILLS' : 'ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [payModal, setPayModal] = useState(null);
  const [receiptModal, setReceiptModal] = useState(null);
  const [billModal, setBillModal] = useState(false);

  // Simulated Net Banking Gateway Modal
  const [bankGatewayModal, setBankGatewayModal] = useState(null);

  // Payment Form States
  const [payMethod, setPayMethod] = useState('UPI'); // 'UPI' | 'NET_BANKING' | 'CARD'
  
  // UPI Specific States
  const [activeUpiApp, setActiveUpiApp] = useState(UPI_APPS[0]);
  const [upiId, setUpiId] = useState('student@okhdfcbank');
  const [vpaVerified, setVpaVerified] = useState(false);
  const [vpaChecking, setVpaChecking] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [upiTimer, setUpiTimer] = useState(300);

  // Net Banking States
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0]);
  const [otherBank, setOtherBank] = useState('');

  // Card States
  const [cardData, setCardData] = useState({
    number: '4532 8920 1192 4890',
    name: u?.name || 'Demo Student',
    exp: '08/28',
    cvv: '382'
  });

  const [paying, setPaying] = useState(false);

  // Admin Bill Generation State
  const [billForm, setBillForm] = useState({
    studentId: '',
    billTitle: 'Hostel Room Rent - Nov 2026',
    billType: 'ROOM_RENT',
    amount: 4500,
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
  });

  // Load Bills and Users
  const loadData = () => {
    if (isStudent && u?.id) {
      api.get(`/payments/student/${u.id}`).then((res) => setPayments(res.data || [])).catch(() => {});
    } else {
      api.get('/payments').then((res) => setPayments(res.data || [])).catch(() => {});
    }
    if (isAdmin) {
      api.get('/admin/users').then((res) => {
        const studentUsers = (res.data || []).filter((usr) => usr.role === 'STUDENT');
        setStudents(studentUsers);
        if (studentUsers.length > 0 && !billForm.studentId) {
          setBillForm((prev) => ({ ...prev, studentId: studentUsers[0].id }));
        }
      }).catch(() => {});
    }
  };

  useEffect(() => {
    loadData();
  }, [u?.id, isStudent, isAdmin]);

  // UPI Countdown Timer
  useEffect(() => {
    let interval = null;
    if (payModal && payMethod === 'UPI') {
      interval = setInterval(() => {
        setUpiTimer((prev) => (prev > 1 ? prev - 1 : 300));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [payModal, payMethod]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // UPI App Selection
  const handleSelectUpiApp = (app) => {
    setActiveUpiApp(app);
    const prefix = upiId.includes('@') ? upiId.split('@')[0] : (u?.name?.toLowerCase().replace(/\s+/g, '') || 'student');
    setUpiId(`${prefix}${app.handle}`);
    setVpaVerified(false);
  };

  // UPI VPA Verification Simulation
  const handleVerifyVpa = () => {
    if (!upiId.includes('@')) {
      alert('Please enter a valid UPI address (e.g. name@okhdfcbank)');
      return;
    }
    setVpaChecking(true);
    setTimeout(() => {
      setVpaChecking(false);
      setVpaVerified(true);
    }, 700);
  };

  // Copy UPI string
  const handleCopyUpi = () => {
    navigator.clipboard.writeText('sentinelhostel@sbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Direct Pay Handler (For Card or UPI Manual confirmation)
  const handlePay = async (customMethod = null, customTxn = null) => {
    if (!payModal) return;
    setPaying(true);
    try {
      const methodToUse = customMethod || (
        payMethod === 'UPI' ? `UPI (${activeUpiApp.name})` :
        payMethod === 'CARD' ? 'DEBIT / CREDIT CARD' :
        `NET_BANKING (${selectedBank.name})`
      );

      const res = await api.post(`/payments/${payModal.id}/pay`, {
        paymentMethod: methodToUse,
        transactionId: customTxn || undefined,
        upiId: payMethod === 'UPI' ? upiId : null,
      });

      triggerToast(`🎉 Payment of ₹${payModal.amount.toLocaleString('en-IN')} completed successfully!`);
      const updated = res.data;
      setPayModal(null);
      setBankGatewayModal(null);
      setReceiptModal(updated);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment processing failed.');
    } finally {
      setPaying(false);
    }
  };

  // Launch Simulated Net Banking Gateway
  const handleProceedToNetBanking = () => {
    const bankToUse = otherBank ? { name: otherBank, short: otherBank.split(' ')[0], code: 'BNK', color: '#1e3a8a' } : selectedBank;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setBankGatewayModal({
      bank: bankToUse,
      bill: payModal,
      step: 1, // 1: Login, 2: OTP, 3: Clearing House
      userId: `stu_${bankToUse.code.toLowerCase()}_${Math.floor(1000 + Math.random() * 9000)}`,
      password: '••••••••••••',
      otp: '',
      generatedOtp,
      processingText: 'Connecting to Reserve Bank of India (RBI) Secure Gateway...',
    });
  };

  // Step 1: Submit Bank Login
  const handleBankLoginSubmit = (e) => {
    e.preventDefault();
    if (!bankGatewayModal) return;
    setBankGatewayModal({
      ...bankGatewayModal,
      step: 2,
    });
  };

  // Step 2: Submit Bank OTP and complete payment
  const handleBankOtpSubmit = (e) => {
    e.preventDefault();
    if (!bankGatewayModal) return;
    if (!bankGatewayModal.otp || bankGatewayModal.otp.trim().length < 4) {
      alert('Please enter the 6-digit OTP received via SMS.');
      return;
    }

    setBankGatewayModal({
      ...bankGatewayModal,
      step: 3,
      processingText: 'Authorizing with NPCI & National Automated Clearing House...',
    });

    setTimeout(() => {
      setBankGatewayModal((prev) => prev ? { ...prev, processingText: 'Transaction Confirmed. Updating Hostel Ledger...' } : null);
      setTimeout(() => {
        const txnId = `${bankGatewayModal.bank.code}-NB-${Math.floor(10000000 + Math.random() * 90000000)}`;
        handlePay(`NET_BANKING (${bankGatewayModal.bank.name})`, txnId);
      }, 900);
    }, 1200);
  };

  // Handle Admin Bill Generation
  const handleGenerateBill = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments/generate', {
        studentId: Number(billForm.studentId),
        billTitle: billForm.billTitle,
        billType: billForm.billType,
        amount: Number(billForm.amount),
        dueDate: billForm.dueDate,
      });
      triggerToast('🧾 New hostel bill invoice issued successfully!');
      setBillModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to issue invoice.');
    }
  };

  // Financial Metrics
  const totalCollected = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const totalPending = payments
    .filter((p) => p.status !== 'PAID')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const totalOverdue = payments
    .filter((p) => p.status === 'OVERDUE')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  // Filtered List
  const filteredPayments = payments.filter((p) => {
    const student = p.student;
    const matchesSearch =
      (p.billTitle && p.billTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student?.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.transactionId && p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (isStudent) {
      if (activeTab === 'BILLS') return p.status !== 'PAID';
      if (activeTab === 'HISTORY') return p.status === 'PAID';
      return true;
    } else {
      if (activeTab === 'PAID') return p.status === 'PAID';
      if (activeTab === 'PENDING') return p.status === 'PENDING';
      if (activeTab === 'OVERDUE') return p.status === 'OVERDUE';
      return true;
    }
  });

  const getStatusBadge = (status) => {
    if (status === 'PAID') return 'badge-green';
    if (status === 'OVERDUE') return 'badge-red';
    return 'badge-yellow';
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'ROOM_RENT': return 'badge-blue';
      case 'MESS': return 'badge-yellow';
      case 'SECURITY_DEPOSIT': return 'badge-purple';
      default: return 'badge-green';
    }
  };

  return (
    <>
      {/* HERO BANNER */}
      <div className="hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
        <span className="hero-tag" style={{ background: 'rgba(216, 180, 254, 0.2)', color: '#f3e8ff' }}>
          💳 {isStudent ? 'STUDENT BILLING & FEES' : 'ADMINISTRATIVE TREASURY'}
        </span>
        <h2>Hostel Dues &amp; Payment Gateway</h2>
        <p>
          {isStudent
            ? 'Pay room rent, mess charges, and maintenance fees online via UPI Apps (GPay, PhonePe, Paytm), Net Banking (SBI, HDFC, ICICI), or Cards with official digital receipts.'
            : 'Track real-time hostel revenue, inspect student payment receipts, monitor overdue accounts, and issue new billing invoices.'}
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid-stats">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">{isStudent ? 'Outstanding Dues' : 'Total Collected'}</div>
            <div className="stat-value" style={{ color: isStudent && totalPending > 0 ? '#dc2626' : '#059669' }}>
              ₹{Number(isStudent ? totalPending : totalCollected).toLocaleString('en-IN')}
            </div>
            <div className="stat-sub">{isStudent ? 'Pending payment' : 'Across all hostel wings'}</div>
          </div>
          <div className={`stat-icon ${isStudent && totalPending > 0 ? 'rose' : 'green'}`}>
            <Icons.CreditCard />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">{isStudent ? 'Total Paid' : 'Pending Receivables'}</div>
            <div className="stat-value" style={{ color: !isStudent && totalPending > 0 ? '#d97706' : '#059669' }}>
              ₹{Number(isStudent ? totalCollected : totalPending).toLocaleString('en-IN')}
            </div>
            <div className="stat-sub">{isStudent ? 'Lifetime cleared' : 'Awaiting student payment'}</div>
          </div>
          <div className="stat-icon amber">
            <Icons.Calendar />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">{isStudent ? 'Invoices Count' : 'Overdue Dues'}</div>
            <div className="stat-value" style={{ color: !isStudent && totalOverdue > 0 ? '#dc2626' : '#0f172a' }}>
              {isStudent ? payments.length : `₹${Number(totalOverdue).toLocaleString('en-IN')}`}
            </div>
            <div className="stat-sub">{isStudent ? 'Total bills generated' : 'Past due date accounts'}</div>
          </div>
          <div className="stat-icon purple">
            <Icons.Receipt />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Payment Security</div>
            <div className="stat-value" style={{ fontSize: '20px', color: '#4f46e5' }}>RBI &amp; NPCI</div>
            <div className="stat-sub">256-Bit SSL Encrypted</div>
          </div>
          <div className="stat-icon blue">
            <Icons.Shield />
          </div>
        </div>
      </div>

      {/* MAIN BILLS & ROSTER CARD */}
      <div className="card">
        <div className="card-header">
          <h2>
            <Icons.CreditCard />
            {isStudent ? 'My Hostel Invoices & Dues' : 'Student Billing Ledger'}
          </h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              style={{ width: '220px', padding: '8px 12px', fontSize: '13px' }}
              placeholder="Search bill or student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isAdmin && (
              <button className="btn btn-sm btn-primary" onClick={() => setBillModal(true)}>
                <Icons.Plus />
                Issue New Bill
              </button>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className="tab-pills">
          {isStudent ? (
            <>
              <button
                className={`tab-pill-btn ${activeTab === 'BILLS' ? 'active' : ''}`}
                onClick={() => setActiveTab('BILLS')}
              >
                Pending Bills ({payments.filter((p) => p.status !== 'PAID').length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'HISTORY' ? 'active' : ''}`}
                onClick={() => setActiveTab('HISTORY')}
              >
                Payment Receipts ({payments.filter((p) => p.status === 'PAID').length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveTab('ALL')}
              >
                All Records
              </button>
            </>
          ) : (
            <>
              <button
                className={`tab-pill-btn ${activeTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveTab('ALL')}
              >
                All Invoices ({payments.length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'PENDING' ? 'active' : ''}`}
                onClick={() => setActiveTab('PENDING')}
              >
                Pending ({payments.filter((p) => p.status === 'PENDING').length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'PAID' ? 'active' : ''}`}
                onClick={() => setActiveTab('PAID')}
              >
                Paid ({payments.filter((p) => p.status === 'PAID').length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'OVERDUE' ? 'active' : ''}`}
                onClick={() => setActiveTab('OVERDUE')}
              >
                Overdue ({payments.filter((p) => p.status === 'OVERDUE').length})
              </button>
            </>
          )}
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                {!isStudent && <th>Student</th>}
                <th>Bill Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={!isStudent ? 9 : 8} style={{ textAlign: 'center', padding: '36px' }}>
                    No bills or payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td><strong>#{p.id}</strong></td>
                    {!isStudent && (
                      <td>
                        <strong>{p.student?.name || 'Student'}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{p.student?.email}</div>
                      </td>
                    )}
                    <td><strong>{p.billTitle}</strong></td>
                    <td>
                      <span className={`badge ${getTypeBadge(p.billType)}`}>
                        {p.billType?.replace('_', ' ') || 'FEES'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '15px', color: p.status === 'PAID' ? '#059669' : '#0f172a' }}>
                        ₹{Number(p.amount).toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>{p.dueDate || 'End of Month'}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(p.status)}`}>
                        <span className="badge-dot"></span>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      {p.paymentMethod ? (
                        <span>
                          <strong>{p.paymentMethod}</strong>
                          <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                            {p.transactionId}
                          </div>
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                    <td>
                      {p.status !== 'PAID' ? (
                        isStudent ? (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setPayModal(p);
                              setUpiTimer(300);
                              setVpaVerified(false);
                            }}
                          >
                            <Icons.CreditCard />
                            Pay ₹{p.amount}
                          </button>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '600' }}>
                            Pending
                          </span>
                        )
                      ) : (
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => setReceiptModal(p)}
                        >
                          <Icons.Receipt />
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          CHECKOUT & PAYMENT MODAL (STUDENT GATEWAY)
          ========================================================================= */}
      {payModal && (
        <div className="modal-backdrop">
          <div className="modal-container" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3>
                <Icons.CreditCard />
                Hostel Fee Checkout Gateway
              </h3>
              <button className="modal-close-btn" onClick={() => setPayModal(null)}>
                <Icons.X />
              </button>
            </div>

            {/* Bill Summary Banner */}
            <div className="bill-summary-banner">
              <div>
                <div className="title">{payModal.billTitle}</div>
                <div className="due">
                  Due: {payModal.dueDate || 'Immediate'} · Ref #{payModal.id} · Student: {u?.name}
                </div>
              </div>
              <div>
                <div className="amount">₹{Number(payModal.amount).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '11px', color: '#c7d2fe', textAlign: 'right' }}>Convenience Fee: ₹0</div>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="pay-mode-tabs">
              <button
                type="button"
                className={`pay-tab-btn ${payMethod === 'UPI' ? 'active' : ''}`}
                onClick={() => setPayMethod('UPI')}
              >
                <Icons.Qrcode />
                <span>UPI / QR</span>
                <span className="pay-tab-badge">Instant</span>
              </button>
              <button
                type="button"
                className={`pay-tab-btn ${payMethod === 'NET_BANKING' ? 'active' : ''}`}
                onClick={() => setPayMethod('NET_BANKING')}
              >
                <Icons.Building />
                <span>Net Banking</span>
                <span className="pay-tab-badge">All Banks</span>
              </button>
              <button
                type="button"
                className={`pay-tab-btn ${payMethod === 'CARD' ? 'active' : ''}`}
                onClick={() => setPayMethod('CARD')}
              >
                <Icons.CreditCard />
                <span>Debit / Card</span>
                <span className="pay-tab-badge">Visa/Master</span>
              </button>
            </div>

            {/* ===================================================================
                MODE 1: UPI & QR CODE GATEWAY
                =================================================================== */}
            {payMethod === 'UPI' && (
              <div className="upi-payment-panel">
                {/* Timer Badge */}
                <div className="upi-timer-badge">
                  <Icons.Clock />
                  <span>Session valid for <strong>{formatTimer(upiTimer)}</strong></span>
                </div>

                {/* QR Scanner Mock */}
                <div className="upi-qr-card">
                  <div className="upi-qr-frame">
                    <UpiQrSvg size={148} />
                    <div className="upi-scan-laser"></div>
                  </div>
                  <div className="upi-qr-details">
                    <div className="upi-merchant-name">Sentinel Hostel Administration</div>
                    <div className="upi-vpa-copy-row">
                      <code>sentinelhostel@sbi</code>
                      <button type="button" className="copy-btn" onClick={handleCopyUpi}>
                        <Icons.Copy />
                        {copiedUpi ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                      Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI 2.0 app
                    </div>
                  </div>
                </div>

                {/* UPI Quick Apps Selector */}
                <div style={{ marginTop: '14px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Select Your Preferred UPI App:
                  </label>
                  <div className="upi-app-selector">
                    {UPI_APPS.map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        className={`upi-app-pill ${activeUpiApp.id === app.id ? 'active' : ''}`}
                        onClick={() => handleSelectUpiApp(app)}
                      >
                        <span className="app-dot" style={{ backgroundColor: app.color }}></span>
                        {app.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* VPA Input & Verify */}
                <div className="form-group" style={{ marginTop: '14px' }}>
                  <label>Enter UPI ID / VPA</label>
                  <div className="vpa-input-wrap">
                    <input
                      placeholder="e.g. rohit@okhdfcbank"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setVpaVerified(false);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn-verify-vpa"
                      onClick={handleVerifyVpa}
                      disabled={vpaChecking || vpaVerified}
                    >
                      {vpaChecking ? 'Checking...' : vpaVerified ? '✓ Verified' : 'Verify VPA'}
                    </button>
                  </div>
                </div>

                {/* Verified Badge */}
                {vpaVerified && (
                  <div className="vpa-verified-callout">
                    <Icons.Check />
                    <span>
                      Verified UPI Account: <strong>{u?.name || 'Rohit Sharma'}</strong> · State Bank of India
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '12px' }}
                    onClick={() => handlePay(`UPI (${activeUpiApp.name})`)}
                    disabled={paying}
                  >
                    <Icons.Check />
                    {paying ? 'Authorizing via NPCI...' : `Pay ₹${Number(payModal.amount).toLocaleString('en-IN')}`}
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '12px', fontSize: '12px' }}
                    onClick={() => {
                      triggerToast('📲 Mobile Push Notification sent! Approving on PhonePe/GPay...');
                      setTimeout(() => {
                        const fakeTxn = 'UPI-APP-' + Math.floor(10000000 + Math.random() * 90000000);
                        handlePay(`UPI (${activeUpiApp.name} App Approval)`, fakeTxn);
                      }, 1200);
                    }}
                    title="Simulate student tapping Approve on their smartphone"
                  >
                    <Icons.Smartphone />
                    Simulate App Push
                  </button>
                </div>
              </div>
            )}

            {/* ===================================================================
                MODE 2: NET BANKING GATEWAY
                =================================================================== */}
            {payMethod === 'NET_BANKING' && (
              <div className="netbanking-panel">
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                  Popular Scheduled Banks (Direct 256-bit Integration)
                </div>

                {/* Popular Banks Grid */}
                <div className="bank-grid">
                  {POPULAR_BANKS.map((b) => (
                    <div
                      key={b.id}
                      className={`bank-card ${selectedBank.id === b.id && !otherBank ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedBank(b);
                        setOtherBank('');
                      }}
                    >
                      <div className="bank-badge-code" style={{ backgroundColor: b.color }}>
                        {b.code}
                      </div>
                      <div className="bank-name">{b.name}</div>
                      <div className="bank-tag">{b.badge}</div>
                    </div>
                  ))}
                </div>

                {/* Other Banks Dropdown */}
                <div className="form-group" style={{ marginTop: '14px' }}>
                  <label>Or Choose From All Indian Banks:</label>
                  <select
                    value={otherBank}
                    onChange={(e) => {
                      setOtherBank(e.target.value);
                    }}
                  >
                    <option value="">-- Select other scheduled bank --</option>
                    {OTHER_BANKS.map((ob) => (
                      <option key={ob} value={ob}>
                        {ob}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bank-security-notice">
                  <Icons.Lock />
                  <span>
                    You will be connected to the secure <strong>{otherBank || selectedBank.name}</strong> NetBanking login portal with two-factor SMS OTP authentication.
                  </span>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '16px', padding: '12px' }}
                  onClick={handleProceedToNetBanking}
                >
                  <Icons.ExternalLink />
                  Proceed to {otherBank || selectedBank.name} Portal →
                </button>
              </div>
            )}

            {/* ===================================================================
                MODE 3: DEBIT & CREDIT CARD
                =================================================================== */}
            {payMethod === 'CARD' && (
              <div>
                <div className="mock-card">
                  <div className="chip"></div>
                  <div className="number">{cardData.number}</div>
                  <div className="card-footer">
                    <div>
                      <div>CARDHOLDER</div>
                      <div className="holder">{cardData.name}</div>
                    </div>
                    <div>
                      <div>EXPIRES</div>
                      <div className="holder">{cardData.exp}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="16-digit card number"
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        value={cardData.exp}
                        onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV / CVC</label>
                      <input
                        type="password"
                        maxLength="3"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="•••"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '18px', padding: '12px' }}
                  onClick={() => handlePay('DEBIT / CREDIT CARD')}
                  disabled={paying}
                >
                  <Icons.Check />
                  {paying ? 'Processing via 256-Bit SSL...' : `Pay ₹${Number(payModal.amount).toLocaleString('en-IN')}`}
                </button>
              </div>
            )}

            <div className="security-seal">
              <Icons.Shield />
              <span>PCI-DSS Level 1 · 256-Bit SSL · Reserve Bank of India &amp; NPCI Approved</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SIMULATED BANK NETBANKING AUTHENTICATION MODAL (STATE BANK / HDFC / ICICI)
          ========================================================================= */}
      {bankGatewayModal && (
        <div className="modal-backdrop">
          <div className="modal-container bank-portal-container">
            {/* Bank Branded Header */}
            <div className="bank-portal-header" style={{ backgroundColor: bankGatewayModal.bank.color || '#0b4d8c' }}>
              <div className="bank-portal-brand">
                <span className="portal-code-chip">{bankGatewayModal.bank.code || 'BANK'}</span>
                <div>
                  <div className="portal-title">{bankGatewayModal.bank.name}</div>
                  <div className="portal-sub">Retail Internet Banking Secure Gateway</div>
                </div>
              </div>
              <div className="portal-security-badge">
                <Icons.Lock />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Merchant Summary Bar */}
            <div className="bank-portal-summary">
              <div>
                <span className="label">Merchant:</span>
                <strong>Sentinel Hostel Administration</strong>
              </div>
              <div>
                <span className="label">Payable:</span>
                <strong className="amt">₹{Number(bankGatewayModal.bill?.amount).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* STEP 1: USER LOGIN */}
            {bankGatewayModal.step === 1 && (
              <form onSubmit={handleBankLoginSubmit} className="bank-step-form">
                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                    Internet Banking Authentication
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Enter your {bankGatewayModal.bank.name} NetBanking Customer ID to authorize payment
                  </div>
                </div>

                <div className="form-group">
                  <label>Customer ID / Username</label>
                  <input
                    value={bankGatewayModal.userId}
                    onChange={(e) => setBankGatewayModal({ ...bankGatewayModal, userId: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>IPIN / Login Password</label>
                  <input
                    type="password"
                    value={bankGatewayModal.password}
                    onChange={(e) => setBankGatewayModal({ ...bankGatewayModal, password: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '11px' }}>
                    Log In to NetBanking →
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setBankGatewayModal({
                        ...bankGatewayModal,
                        userId: `student_${u?.name?.toLowerCase().replace(/\s+/g, '_') || 'demo'}`,
                        password: 'HostelStudent@2026',
                      });
                      triggerToast('Prefilled Demo NetBanking Credentials');
                    }}
                  >
                    Demo Fill
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => setBankGatewayModal(null)}
                  >
                    Cancel Transaction &amp; Return to Hostel Portal
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: TWO-FACTOR AUTHENTICATION / OTP */}
            {bankGatewayModal.step === 2 && (
              <form onSubmit={handleBankOtpSubmit} className="bank-step-form">
                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                    Two-Factor Authorization (SMS OTP)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    An OTP for fee payment of ₹{Number(bankGatewayModal.bill?.amount).toLocaleString('en-IN')} has been dispatched to your mobile ending in <strong>•••• 8419</strong>.
                  </div>
                </div>

                <div className="sms-otp-alert">
                  <Icons.Smartphone />
                  <div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Simulated SMS Message:</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                      Sentinel OTP: <strong>{bankGatewayModal.generatedOtp}</strong> is your code for bill #{bankGatewayModal.bill?.id}.
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '14px' }}>
                  <label>Enter 6-Digit One Time Password</label>
                  <input
                    type="text"
                    maxLength="6"
                    style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: '700' }}
                    placeholder="•• •• ••"
                    value={bankGatewayModal.otp}
                    onChange={(e) => setBankGatewayModal({ ...bankGatewayModal, otp: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ flex: 1, padding: '11px' }}
                  >
                    <Icons.Check />
                    Authorize ₹{Number(bankGatewayModal.bill?.amount).toLocaleString('en-IN')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setBankGatewayModal({
                        ...bankGatewayModal,
                        otp: bankGatewayModal.generatedOtp,
                      });
                    }}
                  >
                    Auto-Fill OTP
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => setBankGatewayModal(null)}
                  >
                    Abort Payment
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: CLEARING HOUSE TRANSITION */}
            {bankGatewayModal.step === 3 && (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div className="portal-loading-spinner"></div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginTop: '16px' }}>
                  {bankGatewayModal.processingText}
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  Please do not refresh or close this window. Your secure bank token is being validated.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          OFFICIAL INVOICE RECEIPT MODAL
          ========================================================================= */}
      {receiptModal && (
        <div className="modal-backdrop">
          <div className="modal-container" style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3>
                <Icons.Receipt />
                Official Hostel Treasury Payment Receipt
              </h3>
              <button className="modal-close-btn" onClick={() => setReceiptModal(null)}>
                <Icons.X />
              </button>
            </div>

            <div className="receipt-box" id="printable-receipt">
              <div className="receipt-stamp">
                <Icons.Check />
                VERIFIED &amp; CLEARED
              </div>
              <div className="receipt-title">SENTINEL HOSTEL &amp; RESIDENCE ADMINISTRATION</div>
              <div className="receipt-sub">Directorate of Student Housing · Treasury Division</div>

              <div className="receipt-amount-row">
                <span>Total Amount Cleared</span>
                <strong>₹{Number(receiptModal.amount).toLocaleString('en-IN')}</strong>
              </div>

              <div className="receipt-grid">
                <div>
                  <div className="item-label">Student Name:</div>
                  <div className="item-val">{receiptModal.student?.name}</div>
                </div>
                <div>
                  <div className="item-label">Student Email / ID:</div>
                  <div className="item-val">{receiptModal.student?.email}</div>
                </div>
                <div>
                  <div className="item-label">Bill Category:</div>
                  <div className="item-val">{receiptModal.billTitle}</div>
                </div>
                <div>
                  <div className="item-label">Payment Mode:</div>
                  <div className="item-val" style={{ color: '#4f46e5', fontWeight: '700' }}>
                    {receiptModal.paymentMethod || 'UPI'}
                  </div>
                </div>
                <div>
                  <div className="item-label">NPCI / Bank Ref ID:</div>
                  <div className="item-val" style={{ fontFamily: 'monospace', color: '#0f172a' }}>
                    {receiptModal.transactionId || 'TXN-9840217'}
                  </div>
                </div>
                <div>
                  <div className="item-label">Payment Timestamp:</div>
                  <div className="item-val">
                    {receiptModal.paidAt
                      ? new Date(receiptModal.paidAt).toLocaleString('en-IN')
                      : new Date().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="security-seal">
                <Icons.Shield />
                <span>Authorized Digital E-Receipt · Valid for University &amp; Hostel Treasury Audits</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => window.print()}
              >
                <Icons.Receipt />
                Print / Save Receipt
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => setReceiptModal(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADMIN: ISSUE NEW BILL MODAL
          ========================================================================= */}
      {billModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h3>
                <Icons.Plus />
                Issue Hostel Invoice
              </h3>
              <button className="modal-close-btn" onClick={() => setBillModal(false)}>
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleGenerateBill} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label>Select Resident Student</label>
                <select
                  value={billForm.studentId}
                  onChange={(e) => setBillForm({ ...billForm, studentId: e.target.value })}
                  required
                >
                  <option value="">-- Choose Student --</option>
                  {students.map((stu) => (
                    <option key={stu.id} value={stu.id}>
                      {stu.name} ({stu.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Invoice Title / Description</label>
                <input
                  placeholder="e.g. Monthly Room Rent - Nov 2026"
                  value={billForm.billTitle}
                  onChange={(e) => setBillForm({ ...billForm, billTitle: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Bill Category</label>
                  <select
                    value={billForm.billType}
                    onChange={(e) => setBillForm({ ...billForm, billType: e.target.value })}
                  >
                    <option value="ROOM_RENT">Room Rent</option>
                    <option value="MESS">Mess / Food Fee</option>
                    <option value="MAINTENANCE">Maintenance &amp; Utilities</option>
                    <option value="SECURITY_DEPOSIT">Security Deposit</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount in INR (₹)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="4500"
                    value={billForm.amount}
                    onChange={(e) => setBillForm({ ...billForm, amount: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Due Date</label>
                <input
                  type="date"
                  value={billForm.dueDate}
                  onChange={(e) => setBillForm({ ...billForm, dueDate: e.target.value })}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ marginTop: '10px' }}>
                <Icons.Plus />
                Issue Invoice to Student
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// --- ROUTING ---
function ProtectedRoute({ children }) {
  return localStorage.getItem('token') ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

export default function App() {
  const u = getUser();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/leaves" element={<ProtectedRoute><LeaveRequests /></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
      
      {/* ADMIN-ONLY ROUTE FOR LIVE RADAR TRACKER */}
      <Route
        path="/tracker"
        element={
          <ProtectedRoute>
            {u?.role === 'ADMIN' ? <LiveStudentTracker /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        }
      />

      {/* ADMIN-ONLY ROUTE FOR USERS */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            {u?.role === 'ADMIN' ? <Users /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} />} />
    </Routes>
  );
}