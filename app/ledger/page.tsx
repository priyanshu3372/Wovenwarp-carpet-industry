'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, ClipboardList, Eye, KeyRound, Award, Info, RefreshCw, Sparkles, UserCheck } from 'lucide-react';

// Pre-populated mock masterwork data for registry simulation
const REGISTRY_DB: Record<string, {
  tagId: string;
  invoiceId: string;
  name: string;
  serial: string;
  loom: string;
  knots: string;
  materials: string;
  weavers: string;
  weaverBio: string;
  collectorName: string;
  transitLogs: Array<{ date: string; status: string; location: string }>;
}> = {
  'TAG-001': {
    tagId: 'TAG-001',
    invoiceId: 'INV-909',
    name: 'Atlas No. 07',
    serial: 'WW-AT-07-2026',
    loom: 'Bhadohi Workshop, Loom #4',
    knots: '180 knots per sq. inch (micro-knotting)',
    materials: '100% undyed organic highland wool, organic madder root vegetable dyes',
    weavers: 'Ram Dev Yadav & Shankar Yadav',
    weaverBio: 'Ram Dev is a third-generation master weaver of Bhadohi with 28 years at the loom. Shankar specializes in the traditional museum-grade washing and finishing process.',
    collectorName: 'The Mercer Family Collection',
    transitLogs: [
      { date: 'May 10, 2026', status: 'Weaving Completed & Registered', location: 'Bhadohi Atelier' },
      { date: 'May 12, 2026', status: 'Invisible Stitch Tag Embedded & Sealed', location: 'Atelier Quality Control' },
      { date: 'May 20, 2026', status: 'Dispatched from Hub', location: 'Delhi Cargo Terminals' },
      { date: 'June 05, 2026', status: 'Inventory Received', location: 'Wovenwarp New York Showroom' },
      { date: 'June 18, 2026', status: 'Awaiting Collector Activation', location: 'Collector Handoff Gateway' },
    ]
  },
  'TAG-002': {
    tagId: 'TAG-002',
    invoiceId: 'INV-888',
    name: 'Sunderban No. 04',
    serial: 'WW-SB-04-2026',
    loom: 'Bhadohi Workshop, Loom #12',
    knots: '240 knots per sq. inch (ultra micro-knotting)',
    materials: '80% organic mulberry silk, 20% fine hand-spun wool',
    weavers: 'Sita Devi & Munna Yadav',
    weaverBio: 'Sita Devi is recognized for her impeccable tension precision on fine silk lines. Munna Yadav constructed the warp foundation for the Sunderban series.',
    collectorName: 'Alexander Avery Design Group',
    transitLogs: [
      { date: 'April 15, 2026', status: 'Weaving Completed & Registered', location: 'Bhadohi Atelier' },
      { date: 'April 18, 2026', status: 'Invisible Stitch Tag Embedded & Sealed', location: 'Atelier Quality Control' },
      { date: 'April 28, 2026', status: 'Dispatched from Hub', location: 'Delhi Cargo Terminals' },
      { date: 'May 14, 2026', status: 'Inventory Received', location: 'Wovenwarp London Showroom' },
      { date: 'June 18, 2026', status: 'Awaiting Collector Activation', location: 'Collector Handoff Gateway' },
    ]
  },
  'TAG-003': {
    tagId: 'TAG-003',
    invoiceId: 'INV-777',
    name: 'Bhadohi Heritage No. 12',
    serial: 'WW-BH-12-2026',
    loom: 'Bhadohi Workshop, Loom #1',
    knots: '160 knots per sq. inch',
    materials: '100% hand-carded sheep wool, natural indigo vat dyes',
    weavers: 'Harish Yadav',
    weaverBio: 'Harish Yadav represents the pure lineage of Yadav family weavers, keeping traditional dyeing and vat techniques alive for over 40 years.',
    collectorName: 'Valerie Vance Interiors',
    transitLogs: [
      { date: 'June 01, 2026', status: 'Weaving Completed & Registered', location: 'Bhadohi Atelier' },
      { date: 'June 03, 2026', status: 'Invisible Stitch Tag Embedded & Sealed', location: 'Atelier Quality Control' },
      { date: 'June 10, 2026', status: 'Dispatched from Hub', location: 'Delhi Cargo Terminals' },
      { date: 'June 18, 2026', status: 'Awaiting Collector Activation', location: 'Collector Handoff Gateway' },
    ]
  }
};

export default function LivingLedgerPage() {
  const [tagInput, setTagInput] = useState('');
  const [invoiceInput, setInvoiceInput] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isStage2Unlocked, setIsStage2Unlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [invoiceErrorMsg, setInvoiceErrorMsg] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const tid = tagInput.trim().toUpperCase();
    
    if (!tid) return;

    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      if (REGISTRY_DB[tid]) {
        setActiveTag(tid);
        setIsStage2Unlocked(false);
        setInvoiceInput('');
        setInvoiceErrorMsg('');
      } else {
        setErrorMsg('Provenance Tag ID not found. Ensure ID format matches "TAG-00X".');
      }
    }, 1000);
  };

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoiceErrorMsg('');
    const inv = invoiceInput.trim().toUpperCase();
    
    if (!activeTag) return;
    
    if (inv === REGISTRY_DB[activeTag].invoiceId) {
      setIsStage2Unlocked(true);
    } else {
      setInvoiceErrorMsg('Invalid invoice authentication key. Please verify credentials.');
    }
  };

  const handleReset = () => {
    setActiveTag(null);
    setIsStage2Unlocked(false);
    setTagInput('');
    setInvoiceInput('');
    setErrorMsg('');
    setInvoiceErrorMsg('');
  };

  const activeData = activeTag ? REGISTRY_DB[activeTag] : null;

  return (
    <>
      <main className="relative min-h-screen bg-ink-950 pt-24 sm:pt-28 pb-0 px-4 sm:px-6 lg:px-12">
        <Navbar />
        
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-400/[0.01] blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="mb-4 inline-flex items-center gap-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300">
              <span className="h-px w-8 bg-gold-300/50" />
              Living Ledger
            </span>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-tightest text-bone">
              Provenance Gateway
            </h1>
            <p className="mt-5 text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.8] text-bone/68">
              Verify the absolute authenticity, custody chain, and master craftsmanship lineage of your serialized Wovenwarp masterpiece.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start mt-12">
            
            {/* Left/Main Panel: Registry Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {!activeData ? (
                /* Stage 0: Enter Tag ID */
                <div className="rounded-sm border border-bone/10 bg-ink-900/40 p-6 sm:p-10 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-3 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-6">
                    <Eye size={16} />
                    Stage 1: Scan Registry Tag
                  </div>
                  
                  <h2 className="font-serif text-2xl sm:text-3xl italic text-bone mb-4">
                    Locate Masterpiece Tag
                  </h2>
                  <p className="text-xs leading-relaxed text-bone/60 mb-6">
                    Every authentic piece features an anti-tamper NFC micro-chip hidden beneath the velvet corner label (the *Invisible Stitch*). Enter the 7-character Tag ID found on your acquisition documentation to query the registry.
                  </p>

                  {/* Suggestion tags to make demo easier */}
                  <div className="bg-ink-950/60 p-4 border border-bone/5 mb-6">
                    <p className="text-[10px] uppercase tracking-wider text-gold-300/80 mb-2.5">
                      Sample Tags for Simulation (Copy & Paste):
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {Object.keys(REGISTRY_DB).map((key) => (
                        <button
                          key={key}
                          onClick={() => setTagInput(key)}
                          className="bg-gold-300/10 hover:bg-gold-300/20 text-gold-300 font-mono text-xs px-2.5 py-1 border border-gold-300/20 transition-colors"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleTagSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Enter Tag ID (e.g. TAG-001)"
                        className="w-full font-mono rounded-none border border-bone/15 bg-ink-950/80 px-4 py-4 text-sm text-bone placeholder-bone/30 outline-none transition-colors focus:border-gold-300/40"
                      />
                    </div>
                    
                    {errorMsg && (
                      <p className="text-xs text-red-400 font-medium">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={scanning}
                      className="w-full bg-gold-300 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition hover:bg-gold-200 disabled:opacity-50"
                    >
                      {scanning ? 'Accessing Secure Ledger...' : 'Scan Provenance Tag'}
                    </button>
                  </form>
                </div>
              ) : (
                /* Stage 1: Display Basic Authenticity & Logs */
                <div className="space-y-6">
                  <div className="rounded-sm border border-bone/10 bg-ink-900/40 p-6 sm:p-8 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
                    
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-bone/10 pb-5 mb-5">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-300 block mb-1">
                          Registry State: Active Logs
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl text-bone">
                          {activeData.name}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleReset}
                          className="flex items-center justify-center gap-1.5 rounded-full border border-bone/15 px-4 py-1.5 text-[10px] uppercase tracking-widest text-bone/60 hover:text-bone hover:border-bone transition-colors"
                        >
                          <RefreshCw size={10} />
                          New Query
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-3.5">
                        <div className="flex gap-2.5 items-center">
                          <ShieldCheck size={16} className="text-gold-300" />
                          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
                            Authenticity Verified
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-bone/60">
                          Provenance Tag matching <strong className="text-bone font-normal font-mono">{activeData.tagId}</strong> has responded successfully. This masterpiece is an authentic Wovenwarp commission.
                        </p>
                        <div className="text-xs space-y-1 font-mono">
                          <p className="text-bone/40"><span className="text-gold-300/60 font-serif not-italic uppercase tracking-widest text-[9px] block">Serial Code:</span> {activeData.serial}</p>
                          <p className="text-bone/40"><span className="text-gold-300/60 font-serif not-italic uppercase tracking-widest text-[9px] block">Loom Location:</span> {activeData.loom}</p>
                        </div>
                      </div>

                      {/* Transit Logs */}
                      <div className="space-y-3">
                        <div className="flex gap-2.5 items-center">
                          <MapPin size={16} className="text-gold-300" />
                          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
                            Registry Custody Chain
                          </span>
                        </div>
                        <div className="relative border-l border-gold-300/20 pl-4 py-1 space-y-3 font-mono text-[10px]">
                          {activeData.transitLogs.map((log, lidx) => (
                            <div key={lidx} className="relative">
                              <span className="absolute -left-[21px] top-1.5 h-1.5 w-1.5 rounded-full bg-gold-300" />
                              <p className="text-gold-300 font-normal">{log.date} - {log.location}</p>
                              <p className="text-bone/50">{log.status}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 Gate: If not unlocked, display prompt */}
                    {!isStage2Unlocked && (
                      <div className="mt-8 pt-6 border-t border-bone/10 space-y-5">
                        <div className="flex gap-3 items-start bg-gold-300/5 p-4 border border-gold-300/15">
                          <KeyRound size={20} className="text-gold-300 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <h4 className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                              Stage 2 Authorization Required
                            </h4>
                            <p className="text-xs leading-[1.65] text-bone/60">
                              Artisan names, full weaver histories, vegetable dye signatures, and chronological collector ownership records are currently cryptographically locked. Enter your Invoice Key (pre-registered collector ID) to unlock the Certificate of Absolute Provenance.
                            </p>
                          </div>
                        </div>

                        {/* Suggestion keys to make demo easier */}
                        <div className="bg-ink-950/40 p-3 border border-bone/5">
                          <span className="text-[9px] uppercase tracking-wider text-gold-300/70 mr-3">
                            Simulation Invoice Key:
                          </span>
                          <code className="text-gold-300 text-xs font-mono">{activeData.invoiceId}</code>
                        </div>

                        <form onSubmit={handleInvoiceSubmit} className="space-y-4">
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={invoiceInput}
                              onChange={(e) => setInvoiceInput(e.target.value)}
                              placeholder="Enter Invoice ID (e.g. INV-909)"
                              className="w-full font-mono rounded-none border border-bone/15 bg-ink-950/80 px-4 py-3 text-sm text-bone placeholder-bone/30 outline-none transition-colors focus:border-gold-300/40"
                            />
                          </div>
                          
                          {invoiceErrorMsg && (
                            <p className="text-xs text-red-400 font-medium font-mono">
                              {invoiceErrorMsg}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-gold-300/10 hover:bg-gold-300 hover:text-ink-950 border border-gold-300 py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 transition"
                          >
                            Authenticate Collector Ownership
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Certificate of Provenance View (Stage 2) */}
            <div className="lg:col-span-5">
              <AnimatePresence>
                {activeData && isStage2Unlocked ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-md border-2 border-gold-300 bg-[#0d0907] p-6 sm:p-8 shadow-[0_40px_120px_rgba(216,184,154,0.12)] text-center text-bone"
                  >
                    {/* Ornamental borders */}
                    <div className="absolute inset-2 border border-gold-300/20 pointer-events-none" />
                    <div className="absolute top-4 left-4 right-4 h-[1px] bg-gold-300/30" />
                    <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-gold-300/30" />
                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

                    {/* Seal / Badge */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/5 mb-5 mt-4">
                      <Award size={26} className="text-gold-300" />
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.22em] text-gold-300 block mb-2 font-mono">
                      Wovenwarp Registry
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-light italic leading-tight text-bone mb-1">
                      Certificate of Provenance
                    </h2>
                    <span className="text-[10px] uppercase tracking-widest text-gold-300/60 block font-mono mb-6">
                      Lineage Verified
                    </span>

                    <div className="hairline mb-5 h-px w-full" />

                    {/* Details Grid */}
                    <div className="space-y-4 text-left font-serif text-sm">
                      <div className="pb-3 border-b border-bone/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold-300/75 block">Masterpiece Name</span>
                        <span className="text-bone text-base italic">{activeData.name}</span>
                      </div>
                      
                      <div className="pb-3 border-b border-bone/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold-300/75 block">Weaving Master(s)</span>
                        <span className="text-bone text-base italic">{activeData.weavers}</span>
                        <p className="mt-1 font-sans text-xs leading-relaxed text-bone/60 font-light not-italic">
                          {activeData.weaverBio}
                        </p>
                      </div>

                      <div className="pb-3 border-b border-bone/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold-300/75 block">Technical Specs</span>
                        <p className="text-bone font-mono text-xs leading-normal">{activeData.knots}</p>
                        <p className="mt-0.5 text-bone/70 font-sans text-xs leading-normal font-light not-italic">{activeData.materials}</p>
                      </div>

                      <div className="pb-3 border-b border-bone/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold-300/75 block">Verified Collector</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <UserCheck size={14} className="text-gold-300" />
                          <span className="text-bone italic text-base">{activeData.collectorName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 pb-2 text-[8px] uppercase tracking-[0.25em] text-bone/40 leading-relaxed font-mono max-w-xs mx-auto">
                      All registry transactions are immutable and secured under Wovenwarp Provenance Key {activeData.tagId}.
                    </div>
                  </motion.div>
                ) : (
                  /* Placeholder when not unlocked */
                  <div className="rounded-sm border border-bone/10 bg-ink-900/10 p-6 sm:p-8 text-center border-dashed py-20">
                    <ClipboardList size={36} className="mx-auto text-bone/25 mb-4" />
                    <h3 className="font-serif text-lg text-bone/50 mb-2">
                      Certificate Locked
                    </h3>
                    <p className="text-xs leading-relaxed text-bone/40 max-w-xs mx-auto">
                      Please scan a valid Tag ID and input your associated Collector Invoice Key to decrypt and render the certificate of authenticity.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
