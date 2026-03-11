'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, Bot, User, RotateCcw } from 'lucide-react';
import { BotLauncher } from '@/components/ui/BotLauncher';

/* ------------------------------------------------------------------ */
/*  TOPICS & KNOWLEDGE BASE                                             */
/* ------------------------------------------------------------------ */

type TopicKey =
  | 'cranes' | 'services' | 'quote' | 'contact' | 'areas'
  | 'safety' | 'projects' | 'industries' | 'emergency'
  | 'operators' | 'capacity' | 'about' | 'documents'
  | 'mobilize' | 'rental' | 'greeting' | 'thanks';

interface KnowledgeEntry {
  topic: TopicKey;
  keywords: string[];
  answer: string;
  followUpChips?: { label: string; query: string }[];
}

const MENU_CHIPS = [
  { label: 'Crane types', query: 'What types of cranes do you have?' },
  { label: 'Services', query: 'What services do you offer?' },
  { label: 'Get a quote', query: 'How do I get a quote?' },
  { label: 'Contact us', query: 'How can I contact you?' },
  { label: 'Service areas', query: 'What areas do you serve?' },
  { label: 'Projects', query: 'Tell me about your projects' },
  { label: 'Safety', query: 'What about safety?' },
];

const MORE_DETAIL: Partial<Record<TopicKey, string>> = {
  cranes:
    'Here\'s more on our cranes:\n\n• **Hydra 20T** – Ideal for narrow lanes, urban lifting, loading\n• **Hydraulic Truck 80T** – Highway projects, heavy steel\n• **Lattice Boom 100T** – Bridge girders, long-reach lifts\n• **Rough Terrain 35T** – Unpaved sites, refineries\n• **Telescopic Crawler 50T** – Soft ground, petrochemical plants\n• **Truck Mounted 60T** – Quick setup, versatile reach\n\nWe also do **tandem lifts** for loads over 100T.',
  services:
    'More about our services:\n\n• **Mobile Crane Rental** – Daily, weekly, or monthly contracts\n• **Heavy Lifting** – Engineered lift plans with load charts\n• **Machinery Shifting** – Factory relocation, CNC machines\n• **Erection & Dismantling** – PEB, steel structures, towers\n• **Plant Maintenance** – AMC or call-basis support\n• **Emergency Lifts** – 24/7 rapid deployment',
  quote:
    'Our quoting process is fast:\n\n1. Share your requirement (tonnage, duration, location)\n2. We prepare a detailed estimate within 2 hours\n3. No hidden charges — transparent pricing\n\nVisit the **Contact page** or WhatsApp us for the quickest response.',
  contact:
    'Additional contact options:\n\n• **Corporate inquiries:** info@shivohamcrane.com\n• **Emergency line:** Available 24/7\n• **Site visits:** We can visit your project site for assessment\n• **Office:** Navi Mumbai, Maharashtra',
  areas:
    'We cover all major industrial zones:\n\n• **West:** Mumbai, Pune, Nashik, Gujarat\n• **North:** Delhi NCR, Rajasthan, UP\n• **South:** Karnataka, Tamil Nadu, Andhra Pradesh\n• **East:** West Bengal, Odisha\n\nRemote site mobilization available on request.',
  safety:
    'Our safety record in detail:\n\n• Full compliance with **IS 3177** & **IS 4573**\n• Every crane has valid **load test certificates**\n• Operators undergo **annual refresher training**\n• Pre-lift **risk assessment** mandatory on every job\n• Complete **public liability insurance** coverage',
  projects:
    'More project highlights:\n\n• **120T Wind Turbine Installations** across Maharashtra\n• **200T Reactor Lift** at Reliance Jamnagar\n• **Bridge Girder Erection** for Mumbai Metro\n• **Factory Relocations** for automotive manufacturers\n• **Port Equipment Handling** at JNPT\n\nWe have delivered 500+ projects with zero major incidents.',
  capacity:
    'Detailed capacity breakdown:\n\n• **10T – 20T:** Small construction lifts, loading/unloading\n• **35T – 50T:** Medium structural work, machinery shifting\n• **60T – 80T:** Heavy infrastructure, steel erection\n• **100T+:** Bridge girders, reactor vessels, heavy modules\n• **250T+:** Specialized engineered lifts with tandem cranes',
};

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    topic: 'cranes',
    keywords: ['crane type', 'types of crane', 'crane available', 'what cranes', 'fleet', 'equipment', 'which crane', 'compare crane'],
    answer: 'We have **6 crane types** in our fleet:\n\n• **Hydra Crane 20T** – Compact, urban sites\n• **Hydraulic Truck Crane 80T** – Heavy-duty\n• **Lattice Boom Truck Crane 100T** – Infrastructure\n• **Rough Terrain Crane 35T** – Off-road\n• **Telescopic Crawler Crane 50T** – Soft terrain\n• **Truck Mounted Mobile Crane 60T** – Fast deploy',
    followUpChips: [
      { label: 'More details', query: 'Tell me more about the cranes' },
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Crane capacities', query: 'What capacities are available?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'services',
    keywords: ['service', 'what do you offer', 'offerings', 'what services', 'provide'],
    answer: 'Our **8 core services:**\n\n1. Mobile Crane Rental\n2. Hydra Crane Rental\n3. Heavy Lifting\n4. Machinery Shifting\n5. Erection & Dismantling\n6. Industrial Lifting\n7. Plant Maintenance Lifts\n8. Emergency / Night Lifts',
    followUpChips: [
      { label: 'More details', query: 'Tell me more about services' },
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'quote',
    keywords: ['quote', 'price', 'cost', 'rate', 'pricing', 'how much', 'budget', 'estimate', 'charges'],
    answer: 'Getting a quote is easy:\n\n1. Fill the form on our **Contact page**\n2. Or **WhatsApp** us directly\n3. Or call **+91-98765-43210**\n\nWe respond within **2 hours** with a detailed estimate.',
    followUpChips: [
      { label: 'Contact details', query: 'How can I contact you?' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Services', query: 'What services do you offer?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'contact',
    keywords: ['contact', 'phone', 'email', 'reach', 'call', 'whatsapp', 'get in touch'],
    answer: 'Reach us anytime:\n\n• **Phone:** +91-98765-43210\n• **Email:** info@shivohamcrane.com\n• **Office:** Navi Mumbai, Maharashtra\n• **Hours:** Mon–Sat 8AM–8PM\n• **Emergency:** 24/7',
    followUpChips: [
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Service areas', query: 'What areas do you serve?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'areas',
    keywords: ['location', 'where', 'based', 'area', 'city', 'operate', 'mumbai', 'navi mumbai', 'serve', 'coverage'],
    answer: 'HQ in **Navi Mumbai** with **Pan-India** reach:\n\n• Maharashtra, Gujarat, Delhi NCR\n• Karnataka, Tamil Nadu, Rajasthan\n• And more across India\n\nMobilization in **24–48 hours**.',
    followUpChips: [
      { label: 'Mobilization time', query: 'How fast can you mobilize?' },
      { label: 'Contact us', query: 'How can I contact you?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'safety',
    keywords: ['safety', 'safe', 'certified', 'compliance', 'standard', 'insurance'],
    answer: 'Safety is our **#1 priority**:\n\n• Pre-lift risk assessments\n• IS 3177 & IS 4573 compliance\n• Third-party load test certificates\n• Complete insurance coverage\n• Licensed operators only',
    followUpChips: [
      { label: 'More details', query: 'Tell me more about safety' },
      { label: 'Our operators', query: 'Tell me about operators' },
      { label: 'Documents', query: 'What documents do you provide?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'projects',
    keywords: ['project', 'portfolio', 'past work', 'experience', 'completed'],
    answer: '**500+ projects** completed across India:\n\n• Mumbai Metro – 150T steel erection\n• Reliance Refinery – 200T reactor lift\n• Wind Turbine Installations – 120T\n• Tata Steel – Quarterly maintenance\n• Pune IT Park – Long-term rental',
    followUpChips: [
      { label: 'More projects', query: 'Tell me more about projects' },
      { label: 'Industries served', query: 'What industries do you serve?' },
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'industries',
    keywords: ['industry', 'industries', 'sector', 'who do you serve', 'client'],
    answer: 'We serve **8 major industries:**\n\n• Construction & Infrastructure\n• Oil & Gas / Petrochemical\n• Power & Energy\n• Manufacturing & Factories\n• Steel & Cement\n• Shipping & Ports\n• Telecom\n• Events & Entertainment',
    followUpChips: [
      { label: 'Our projects', query: 'Tell me about your projects' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'emergency',
    keywords: ['emergency', 'urgent', 'night', '24/7', 'immediate', 'asap'],
    answer: '**24/7 Emergency Services:**\n\n• Response within **4–6 hours**\n• Night-certified operators\n• Full lighting & safety gear\n• Available 365 days/year',
    followUpChips: [
      { label: 'Contact now', query: 'How can I contact you?' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'operators',
    keywords: ['operator', 'driver', 'trained', 'certified operator'],
    answer: 'All cranes include **certified operators:**\n\n• Licensed by Indian authorities\n• Minimum 5 years experience\n• Average 8+ years in field\n• Annual refresher training\n• 250+ operators in our team',
    followUpChips: [
      { label: 'Safety info', query: 'What about safety?' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'capacity',
    keywords: ['capacity', 'tonnage', 'ton', 'heavy', 'weight', 'how big', 'biggest'],
    answer: 'Fleet capacity range:\n\n• **Light:** 10T – 20T\n• **Medium:** 35T – 60T\n• **Heavy:** 80T – 100T\n• **Super Heavy:** Up to 250T+\n\nTandem lifting available for 100T+ loads.',
    followUpChips: [
      { label: 'More details', query: 'Tell me more about capacities' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'about',
    keywords: ['about', 'company', 'who are you', 'shivoham', 'history', 'founded', 'since'],
    answer: '**Shivoham Crane Services** — Navi Mumbai\n\n• Established in 2026\n• 100+ cranes in fleet\n• 500+ projects completed\n• Pan-India coverage\n• Safety-first approach',
    followUpChips: [
      { label: 'Our projects', query: 'Tell me about your projects' },
      { label: 'Services', query: 'What services do you offer?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'documents',
    keywords: ['document', 'certificate', 'paperwork', 'compliance doc'],
    answer: 'Complete documentation provided:\n\n• Load test certificates\n• Crane fitness certificates\n• Operator licenses\n• Public liability insurance\n• Risk assessments & lift plans',
    followUpChips: [
      { label: 'Safety info', query: 'What about safety?' },
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'mobilize',
    keywords: ['mobilize', 'mobilization', 'how fast', 'how quickly', 'delivery', 'deploy', 'timeline'],
    answer: 'Mobilization timelines:\n\n• **Planned:** 24–48 hours\n• **Emergency (Navi Mumbai):** 4–6 hours\n• **Emergency (wider region):** 6–12 hours',
    followUpChips: [
      { label: 'Service areas', query: 'What areas do you serve?' },
      { label: 'Emergency services', query: 'Tell me about emergency services' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'rental',
    keywords: ['hire', 'rent', 'rental', 'book', 'lease', 'how to rent'],
    answer: 'Renting is simple:\n\n1. Share your needs (tonnage, duration, location)\n2. Get a quote via form, WhatsApp, or call\n3. We mobilize crane + operator to site\n\nShort-term, long-term & AMC options available.',
    followUpChips: [
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Crane types', query: 'What types of cranes do you have?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
  {
    topic: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'help'],
    answer: 'Hello! 👋 Welcome to **Shivoham Crane Services**.\n\nHow can I help you today?',
    followUpChips: MENU_CHIPS.slice(0, 5).map((c) => ({ label: c.label, query: c.query })),
  },
  {
    topic: 'thanks',
    keywords: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'bye', 'goodbye'],
    answer: 'You\'re welcome! Glad I could help. 🏗️\n\nFeel free to reach out anytime — we\'re here for all your lifting needs.',
    followUpChips: [
      { label: 'Get a quote', query: 'How do I get a quote?' },
      { label: 'Contact us', query: 'How can I contact you?' },
      { label: 'Main menu', query: 'menu' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  MATCH ENGINE (with context awareness)                               */
/* ------------------------------------------------------------------ */

interface MatchResult {
  text: string;
  topic: TopicKey | null;
  chips: { label: string; query: string }[];
}

const MENU_RESPONSE: MatchResult = {
  text: 'Here\'s what I can help you with:',
  topic: null,
  chips: MENU_CHIPS,
};

function buildResponse(query: string, lastTopic: TopicKey | null): MatchResult {
  const q = query.toLowerCase().trim();

  // Handle "menu" / "back" / "start" / "options"
  if (/^(menu|main menu|back|start|options|home|restart|help me)$/i.test(q)) {
    return MENU_RESPONSE;
  }

  // Handle "no" / "nah" / "not now" → offer alternatives
  if (/^(no|nah|nope|not now|not really|no thanks|no thank you|n)$/i.test(q)) {
    return {
      text: 'No problem! Here are some other things I can help with:',
      topic: null,
      chips: MENU_CHIPS.filter((c) => {
        // Exclude the topic user just saw so alternatives feel fresh
        if (!lastTopic) return true;
        const topicToLabel: Partial<Record<TopicKey, string>> = {
          cranes: 'Crane types', services: 'Services', quote: 'Get a quote',
          contact: 'Contact us', areas: 'Service areas', projects: 'Projects', safety: 'Safety',
        };
        return c.label !== topicToLabel[lastTopic];
      }),
    };
  }

  // Handle "more" / "details" / "tell me more" → expand last topic
  if (/^(more|tell me more|details|expand|continue|yes|yeah|sure|go on|yep|ok|okay)$/i.test(q) || /^more\b/i.test(q)) {
    if (lastTopic && MORE_DETAIL[lastTopic]) {
      return {
        text: MORE_DETAIL[lastTopic]!,
        topic: lastTopic,
        chips: [
          { label: 'Get a quote', query: 'How do I get a quote?' },
          { label: 'Main menu', query: 'menu' },
        ],
      };
    }
    // No more detail for this topic — offer menu
    return {
      text: 'Here\'s what else I can help with:',
      topic: null,
      chips: MENU_CHIPS,
    };
  }

  // Handle "more about X" → look for X-topic expansion
  const moreAboutMatch = q.match(/more\s+(?:about|on|detail)\s+(.+)/i);
  if (moreAboutMatch) {
    const subQ = moreAboutMatch[1];
    const entry = findEntry(subQ);
    if (entry && MORE_DETAIL[entry.topic]) {
      return {
        text: MORE_DETAIL[entry.topic]!,
        topic: entry.topic,
        chips: entry.followUpChips ?? [{ label: 'Main menu', query: 'menu' }],
      };
    }
  }

  // Standard knowledge base matching
  const entry = findEntry(q);
  if (entry) {
    return {
      text: entry.answer,
      topic: entry.topic,
      chips: entry.followUpChips ?? [{ label: 'Main menu', query: 'menu' }],
    };
  }

  // Fallback — guide the user
  return {
    text: 'I\'m not sure I understood that. Let me help you find what you need:',
    topic: null,
    chips: MENU_CHIPS,
  };
}

function findEntry(q: string): KnowledgeEntry | null {
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) score += keyword.split(' ').length * 2;
      for (const word of keyword.split(' ')) {
        if (q.includes(word) && word.length > 2) score += 1;
      }
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best : null;
}

/* ------------------------------------------------------------------ */
/*  MESSAGE TYPES                                                       */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: number;
  role: 'user' | 'bot';
  text: string;
  chips?: { label: string; query: string }[];
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                           */
/* ------------------------------------------------------------------ */

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'bot',
      text: 'Hello! 👋 I\'m the **Shivoham Crane Services** assistant.\n\nHow can I help you today?',
      chips: MENU_CHIPS.slice(0, 5),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const lastTopicRef = useRef<TopicKey | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: nextId.current++, role: 'user', text: text.trim(), timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const result = buildResponse(text, lastTopicRef.current);
      if (result.topic) lastTopicRef.current = result.topic;
      const botMsg: ChatMessage = {
        id: nextId.current++, role: 'bot', text: result.text,
        chips: result.chips.length > 0 ? result.chips : undefined,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400 + Math.random() * 350);
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  /* Markdown-like rendering */
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      return <span key={i}>{part}</span>;
    });
  };

  const renderMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <br key={i} />;
      const t = line.trim();
      if (t.startsWith('• ') || t.startsWith('- '))
        return (<div key={i} className="flex gap-2 ml-1"><span className="text-brand-gold shrink-0">•</span><span>{renderText(t.slice(2))}</span></div>);
      if (/^\d+\.\s/.test(t)) {
        const num = t.match(/^(\d+)\./)?.[1];
        return (<div key={i} className="flex gap-2 ml-1"><span className="text-brand-gold font-semibold shrink-0">{num}.</span><span>{renderText(t.replace(/^\d+\.\s/, ''))}</span></div>);
      }
      return <p key={i}>{renderText(line)}</p>;
    });
  };

  /* Inline follow-up chips rendered under a bot bubble */
  const renderChips = (chips: { label: string; query: string }[]) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => sendMessage(chip.query)}
          disabled={isTyping}
          className="inline-flex items-center gap-0.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 px-2.5 py-1 text-[11px] font-medium text-brand-green hover:bg-brand-gold/15 hover:border-brand-gold/40 transition-all disabled:opacity-40"
        >
          {chip.label}
          <ChevronRight size={9} />
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Two-part bot launcher */}
      <AnimatePresence>
        {!isOpen && (
          <BotLauncher onClick={() => setIsOpen(true)} />
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-brand-green text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold">Shivoham Assistant</p>
                  <p className="text-[10px] text-white/60">Website Help &amp; Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    msg.role === 'bot' ? 'bg-brand-green text-brand-gold' : 'bg-brand-gold text-brand-green'
                  }`}>
                    {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  {/* Bubble + chips */}
                  <div className="max-w-[80%]">
                    <div className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === 'bot'
                        ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                        : 'bg-brand-green text-white rounded-tr-sm'
                    }`}>
                      {msg.role === 'bot' ? renderMessage(msg.text) : <p>{msg.text}</p>}
                    </div>
                    {msg.role === 'bot' && msg.chips && !isTyping && renderChips(msg.chips)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-brand-gold text-xs">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Persistent menu button (always visible) */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-white border-t border-gray-100 shrink-0">
              <button
                onClick={() => sendMessage('menu')}
                disabled={isTyping}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-brand-green transition-colors disabled:opacity-40"
              >
                <RotateCcw size={11} />
                Main menu
              </button>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cranes, services, quotes..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-gold transition-all hover:bg-brand-green-800 disabled:opacity-40 disabled:hover:bg-brand-green"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
