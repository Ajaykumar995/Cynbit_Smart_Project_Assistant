import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  Search,
  ArrowRight,
  Clock,
  Layers,
  Cpu,
  Mail,
  FileText,
  Calendar,
} from 'lucide-react';
import { inquiryService } from '../services/api';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';

export const SuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [inquiry, setInquiry] = useState(location.state?.inquiry || null);
  const [loading, setLoading] = useState(!location.state?.inquiry);
  const [copied, setCopied] = useState(false);

  // Trigger confetti burst on page load
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#06B6D4', '#10B981', '#38BDF8'],
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  // Fetch inquiry if navigated directly via URL
  useEffect(() => {
    if (!inquiry && id) {
      setLoading(true);
      inquiryService
        .getById(id)
        .then((res) => {
          if (res.data) setInquiry(res.data);
        })
        .catch((err) => {
          console.error('Failed to load inquiry:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [id, inquiry]);

  const referenceId = inquiry?.referenceId || id;

  const handleCopy = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadBrief = () => {
    if (!inquiry) return;
    const content = `
CYNBIT SMART PROJECT ASSISTANT - PROJECT BRIEF
Reference ID: ${inquiry.referenceId}
Date Submitted: ${new Date(inquiry.createdAt || Date.now()).toLocaleDateString()}
Status: ${inquiry.status || 'Submitted'}

=======================================================
1. ARCHITECTURAL DOMAIN
Project Type: ${inquiry.projectType}

2. FEATURE SPECIFICATIONS
${(inquiry.features || []).map((f) => `- ${f}`).join('\n')}

3. FINANCIAL & TIMELINE PARAMETERS
Budget: ${inquiry.budget}
Target Timeline: ${inquiry.timeline}

4. CLIENT DETAILS
Name: ${inquiry.contact?.name}
Email: ${inquiry.contact?.email}
Phone: ${inquiry.contact?.phone || 'N/A'}
Company: ${inquiry.contact?.company || 'N/A'}
Preferred Channel: ${inquiry.contact?.preferredContact || 'Email'}

5. ESTIMATED SCOPE & ARCHITECTURE
Complexity: ${inquiry.estimatedScope?.complexity || 'Production Standard'}
Estimated Hours: ${inquiry.estimatedScope?.estimatedHours || 'N/A'}
Recommended Stack: ${(inquiry.estimatedScope?.recommendedStack || []).join(', ')}

6. PROJECT SCOPE NOTES
${inquiry.description || 'No additional notes provided.'}
=======================================================
Cynbit Technologies Scoping Engine
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cynbit-brief-${inquiry.referenceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Top Confirmation Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          SUBMISSION CONFIRMED
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Project Inquiry Received!
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
          Your project specifications have been ingested into Cynbit's scoping pipeline.
          Our technical architect will review the brief and contact you within 24 hours.
        </p>
      </div>

      {/* Prominent Reference ID Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/40 text-center space-y-3">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
          YOUR UNIQUE INQUIRY REFERENCE ID
        </span>
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
            {referenceId}
          </span>
          <Button
            variant="secondary"
            size="md"
            onClick={handleCopy}
            leftIcon={copied ? Check : Copy}
            className="shrink-0"
          >
            {copied ? 'Copied' : 'Copy ID'}
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          Save this reference ID to track inquiry updates, proposal status, and milestone reviews.
        </p>
      </div>

      {/* Roadmap & Next Steps */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          Next Steps in the Scoping Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-semibold">PHASE 01</span>
              <Badge variant="emerald" size="sm">Completed</Badge>
            </div>
            <div className="text-sm font-semibold text-white">Ingestion & Synthesis</div>
            <p className="text-xs text-slate-400">
              Requirements captured and preliminary complexity models calculated.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-400 font-semibold">PHASE 02</span>
              <Badge variant="indigo" size="sm">Underway</Badge>
            </div>
            <div className="text-sm font-semibold text-white">Tech Lead Evaluation</div>
            <p className="text-xs text-slate-400">
              A Cynbit senior engineer analyzes edge cases, database schema, and SLA targets.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-semibold">PHASE 03</span>
              <Badge variant="default" size="sm">Upcoming</Badge>
            </div>
            <div className="text-sm font-semibold text-white">Discovery Call & NDA</div>
            <p className="text-xs text-slate-400">
              Personalized walkthrough of the architecture and formal statement of work (SOW).
            </p>
          </div>
        </div>
      </Card>

      {/* Structured Brief Snapshot (if loaded) */}
      {inquiry && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">Submitted Specifications Snapshot</h3>
            </div>
            <Badge variant="indigo" size="sm">
              Status: {inquiry.status || 'Submitted'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Project Type</span>
              <span className="font-semibold text-white text-sm">{inquiry.projectType}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Budget Bracket</span>
              <span className="font-semibold text-white text-sm font-mono">{inquiry.budget}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Timeline</span>
              <span className="font-semibold text-white text-sm">{inquiry.timeline}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Contact</span>
              <span className="font-semibold text-white text-sm truncate block">
                {inquiry.contact?.name}
              </span>
            </div>
          </div>

          {/* Features badge list */}
          {inquiry.features?.length > 0 && (
            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-1.5">Specified Feature Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {inquiry.features.map((feat) => (
                  <Badge key={feat} variant="default" size="sm">
                    {feat}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {inquiry && (
          <Button
            variant="secondary"
            size="md"
            onClick={handleDownloadBrief}
            leftIcon={Download}
            className="w-full sm:w-auto"
          >
            Download Project Brief (.txt)
          </Button>
        )}
        <Link to={`/track?ref=${referenceId}`} className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            leftIcon={Search}
            className="w-full sm:w-auto"
          >
            Track Status Online
          </Button>
        </Link>
        <Link to="/" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-glow"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
