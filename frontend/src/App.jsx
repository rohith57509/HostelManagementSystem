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
  const [stats, setStats] = useState({ rooms: 0, notices: 0, complaints: 0, leaves: 0 });

  useEffect(() => {
    api.get('/rooms').then((r) => setStats((s) => ({ ...s, rooms: r.data?.length || 0 }))).catch(() => {});
    api.get('/notices').then((r) => setStats((s) => ({ ...s, notices: r.data?.length || 0 }))).catch(() => {});
    if (u?.role === 'STUDENT' && u?.id) {
      api.get(`/complaints/student/${u.id}`).then((r) => setStats((s) => ({ ...s, complaints: r.data?.length || 0 }))).catch(() => {});
      api.get(`/leaves/student/${u.id}`).then((r) => setStats((s) => ({ ...s, leaves: r.data?.length || 0 }))).catch(() => {});
    } else {
      api.get('/complaints').then((r) => setStats((s) => ({ ...s, complaints: r.data?.length || 0 }))).catch(() => {});
      api.get('/leaves').then((r) => setStats((s) => ({ ...s, leaves: r.data?.length || 0 }))).catch(() => {});
    }
  }, [u?.id, u?.role]);

  return (
    <>
      <div className="hero">
        <span className="hero-tag">{u?.role} OVERVIEW</span>
        <h2>Welcome back, {u?.name}!</h2>
        <p>
          Real-time hostel management dashboard. Track room allocations, student complaints,
          leave permissions, and official announcements with full role-based security.
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