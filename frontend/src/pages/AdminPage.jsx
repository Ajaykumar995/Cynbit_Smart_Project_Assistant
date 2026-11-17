import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Unlock,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  Layers,
  Cpu,
  Mail,
  Phone,
  Building,
  Download,
  X,
  AlertCircle,
  BarChart3,
  ExternalLink,
  ChevronDown,
  LogOut,
  KeyRound,
  ArrowLeft,
} from 'lucide-react';
import { inquiryService } from '../services/api';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';

export const AdminPage = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(
      sessionStorage.getItem('cynbit_admin_key') || localStorage.getItem('cynbit_admin_key')
    );
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Admin Data State
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Selected Inquiry for Modal View & Notes Editing
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const statusOptions = ['Submitted', 'In Review', 'Discovery Scheduled', 'Proposal Ready'];
  const projectTypeOptions = ['All', 'Web App', 'SaaS', 'AI Automation', 'Mobile App', 'Website', 'Other'];

  const showNotification = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Please enter the administrator passcode.');
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await inquiryService.adminLogin(passwordInput.trim());
      if (res.success && res.token) {
        if (rememberMe) {
          localStorage.setItem('cynbit_admin_key', res.token);
        }
        sessionStorage.setItem('cynbit_admin_key', res.token);
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError(res.message || 'Invalid passcode.');
      }
    } catch (err) {
      setAuthError(err.message || 'Access Denied: Invalid administrator passcode.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cynbit_admin_key');
    localStorage.removeItem('cynbit_admin_key');
    setIsAuthenticated(false);
    setInquiries([]);
    setStats(null);
    setSelectedInquiry(null);
  };

  const loadData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const [inquiriesRes, statsRes] = await Promise.all([
        inquiryService.getAll({
          search: searchTerm || undefined,
          status: statusFilter !== 'All' ? statusFilter : undefined,
          projectType: typeFilter !== 'All' ? typeFilter : undefined,
          limit: 100,
        }),
        inquiryService.getStats(),
      ]);

      if (inquiriesRes.success) {
        setInquiries(inquiriesRes.data || []);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      if (err.message?.includes('Access Denied') || err.message?.includes('Unauthorized')) {
        handleLogout();
        setAuthError('Session expired or unauthorized. Please re-authenticate.');
      } else {
        setError(err.message || 'Unable to connect to backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatusId(id);
    try {
      const res = await inquiryService.updateStatus(id, { status: newStatus });
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id || item.referenceId === id ? res.data : item))
        );
        if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.referenceId === id)) {
          setSelectedInquiry(res.data);
        }
        showNotification(`Status updated to "${newStatus}"`);
        inquiryService.getStats().then((s) => s.success && setStats(s.data));
      }
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async (id, refId) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${refId}? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await inquiryService.delete(id);
      if (res.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== id && item.referenceId !== id));
        if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.referenceId === id)) {
          setSelectedInquiry(null);
        }
        showNotification(`Inquiry ${refId} deleted`);
        inquiryService.getStats().then((s) => s.success && setStats(s.data));
      }
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await inquiryService.updateStatus(selectedInquiry.referenceId, {
        clientNotes: notesInput,
      });
      if (res.success) {
        setSelectedInquiry(res.data);
        setInquiries((prev) =>
          prev.map((item) => (item._id === res.data._id ? res.data : item))
        );
        showNotification('Internal notes saved successfully');
      }
    } catch (err) {
      alert(`Failed to save notes: ${err.message}`);
    } finally {
      setSavingNotes(false);
    }
  };

  const openDetailModal = (item) => {
    setSelectedInquiry(item);
    setNotesInput(item.clientNotes || '');
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Reference ID', 'Project Type', 'Name', 'Email', 'Phone', 'Company', 'Budget', 'Timeline', 'Status', 'Submitted At'];
    const rows = inquiries.map((i) => [
      i.referenceId,
      `"${i.projectType}"`,
      `"${i.contact?.name || ''}"`,
      `"${i.contact?.email || ''}"`,
      `"${i.contact?.phone || ''}"`,
      `"${i.contact?.company || ''}"`,
      `"${i.budget}"`,
      `"${i.timeline}"`,
      i.status,
      new Date(i.createdAt).toISOString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cynbit-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // RENDER: PASSWORD PROTECTION GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center shadow-glow">
              <Lock className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-mono">
              <KeyRound className="w-3.5 h-3.5" />
              <span>RESTRICTED ACCESS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Enter the administrator security passkey to access client briefs and pipeline controls.
            </p>
          </div>

          {/* Login Card */}
          <Card className="p-6 sm:p-8 space-y-5 shadow-2xl border-indigo-500/30">
            {authError && (
              <div className="p-3.5 rounded-lg bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Administrator Passkey
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember this browser session</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isVerifying}
                leftIcon={Unlock}
                className="w-full shadow-glow"
              >
                Unlock Admin Console
              </Button>
            </form>

            {/* Assessment / Recruiter Helper Note */}
            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1 text-center bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 block">Intern Assessment Evaluation:</span>
              <span>Default Prototype Passkey: <code className="text-indigo-300 font-mono font-bold bg-slate-950 px-1.5 py-0.5 rounded">cynbit2026</code></span>
            </div>
          </Card>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm" dot>Authenticated Session</Badge>
            <span className="text-xs font-mono text-slate-400">CYNBIT LEAD MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Project Scoping Admin Console
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Live pipeline of client submissions, architectural estimations, and lead status controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            isLoading={loading}
            leftIcon={RefreshCw}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={exportToCSV}
            leftIcon={Download}
            disabled={inquiries.length === 0}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            leftIcon={LogOut}
            className="text-red-400 hover:text-red-300 border-red-900/50 hover:bg-red-950/40"
          >
            Lock / Logout
          </Button>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase">Total Inquiries</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
              {stats.total}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Across all project categories</div>
          </Card>

          <Card className="p-4 border-slate-800">
            <div className="text-xs font-mono text-indigo-400 uppercase">New / Submitted</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-300 mt-1">
              {stats.statusCounts?.submitted || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Awaiting technical review</div>
          </Card>

          <Card className="p-4 border-slate-800">
            <div className="text-xs font-mono text-cyan-400 uppercase">In Active Review</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300 mt-1">
              {(stats.statusCounts?.inReview || 0) + (stats.statusCounts?.discovery || 0)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Under engineering scoping</div>
          </Card>

          <Card className="p-4 border-slate-800">
            <div className="text-xs font-mono text-emerald-400 uppercase">Proposals Ready</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 mt-1">
              {stats.statusCounts?.proposalReady || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Ready for contract kickoff</div>
          </Card>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference ID, client name, email, or company..."
              className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...statusOptions].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`text-xs px-2.5 py-1.5 rounded-md transition-all ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inquiries Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0F172A]/70 backdrop-blur-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400 mb-2" />
            Loading submitted inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm space-y-2">
            <BarChart3 className="w-8 h-8 mx-auto text-slate-400" />
            <div className="font-semibold text-slate-300">No project inquiries found</div>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or submit a test inquiry using the wizard.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Platform / Type</th>
                  <th className="py-3.5 px-4">Budget & Timeline</th>
                  <th className="py-3.5 px-4">Complexity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {inquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Reference ID */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-white whitespace-nowrap">
                      <span className="text-indigo-400">{item.referenceId}</span>
                      <span className="block text-[10px] text-slate-400 font-sans mt-0.5">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Client Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200">
                        {item.contact?.name}
                      </div>
                      <div className="text-slate-400 text-[11px] truncate max-w-[180px]">
                        {item.contact?.email}
                      </div>
                      {item.contact?.company && (
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          {item.contact?.company}
                        </div>
                      )}
                    </td>

                    {/* Platform Type & Features Count */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-white">{item.projectType}</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        {item.features?.length || 0} features selected
                      </span>
                    </td>

                    {/* Budget & Timeline */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono text-slate-200 block">{item.budget}</span>
                      <span className="text-[11px] text-slate-400 block">{item.timeline}</span>
                    </td>

                    {/* Estimated Complexity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="indigo" size="sm">
                        {item.estimatedScope?.complexity || 'Moderate'}
                      </Badge>
                      <span className="block text-[10px] font-mono text-slate-400 mt-1">
                        {item.estimatedScope?.estimatedHours || 'N/A'}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={item.status}
                        disabled={updatingStatusId === item._id}
                        onChange={(e) => handleStatusChange(item.referenceId, e.target.value)}
                        className={`text-xs font-medium rounded-lg px-2.5 py-1.5 border transition-all cursor-pointer bg-slate-900 ${
                          item.status === 'Submitted'
                            ? 'border-indigo-500/50 text-indigo-300'
                            : item.status === 'In Review'
                            ? 'border-cyan-500/50 text-cyan-300'
                            : item.status === 'Discovery Scheduled'
                            ? 'border-amber-500/50 text-amber-300'
                            : 'border-emerald-500/50 text-emerald-300'
                        }`}
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st} className="bg-slate-900 text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openDetailModal(item)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="View Full Brief"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id, item.referenceId)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Slide-out / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  PROJECT INQUIRY DETAILS
                </span>
                <h2 className="text-xl font-bold font-mono text-white mt-0.5">
                  {selectedInquiry.referenceId}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="indigo" size="sm">
                    {selectedInquiry.projectType}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    Submitted: {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Update Lead Pipeline Status:</span>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleStatusChange(selectedInquiry.referenceId, e.target.value)}
                className="text-xs bg-slate-950 border border-slate-700 text-indigo-300 rounded-md px-3 py-1 font-medium"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Client Name</span>
                <span className="font-semibold text-white text-sm">{selectedInquiry.contact?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Email Address</span>
                <a
                  href={`mailto:${selectedInquiry.contact?.email}`}
                  className="font-medium text-indigo-400 hover:underline text-sm"
                >
                  {selectedInquiry.contact?.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Phone / Channel</span>
                <span className="text-slate-200">
                  {selectedInquiry.contact?.phone || 'N/A'} ({selectedInquiry.contact?.preferredContact || 'Email'})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Company</span>
                <span className="text-slate-200">{selectedInquiry.contact?.company || 'N/A'}</span>
              </div>
            </div>

            {/* Parameters & Scope Estimation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Budget & Timeline</span>
                <div className="text-sm font-semibold text-white font-mono">{selectedInquiry.budget}</div>
                <div className="text-xs text-slate-400">Timeline: {selectedInquiry.timeline}</div>
              </Card>

              <Card className="p-4 space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Estimated Effort & Architecture</span>
                <div className="text-sm font-semibold text-indigo-300">{selectedInquiry.estimatedScope?.complexity}</div>
                <div className="text-xs text-slate-400 font-mono">Effort: {selectedInquiry.estimatedScope?.estimatedHours}</div>
              </Card>
            </div>

            {/* Selected Features Stack */}
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Selected Features Stack ({selectedInquiry.features?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedInquiry.features?.map((f) => (
                  <Badge key={f} variant="default" size="sm">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recommended Tech Stack */}
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Recommended Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedInquiry.estimatedScope?.recommendedStack?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-indigo-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Project Description */}
            {selectedInquiry.description && (
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Client Project Description
                </span>
                <p className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.description}
                </p>
              </div>
            )}

            {/* Internal Admin Notes */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-indigo-400 font-semibold block">
                Internal Cynbit Technical Notes
              </span>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add internal engineering notes, follow-up call summaries, or custom quote adjustments..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveNotes}
                  isLoading={savingNotes}
                >
                  Save Internal Notes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
