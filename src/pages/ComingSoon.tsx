import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  CalendarClock,
  LockKeyhole,
  Mail,
  Sparkles,
  Store,
  Play,
  Pause,
  Volume2,
  Wifi,
  Battery,
  Bookmark,
  ChevronLeft,
  Search,
  Quote,
  Compass,
  BookmarkCheck,
  Headphones,
  Type,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Menu,
  Folder,
  SkipBack,
  SkipForward,
  ShieldCheck,
  Trash2,
  CreditCard,
  Globe,
  Apple,
  Smartphone,
  FileText,
  EyeOff,
} from 'lucide-react';

import { IMAGES } from '../constants/images';
import { StoreSiteLayout } from '../store-site/StoreSiteLayout';
import { StoreNotifyButton } from '../store-site/StoreNotifyButton';
import { StorePlatformBadge } from '../store-site/StorePlatformBadge';
import { useStorePageMeta } from '../store-site/useStorePageMeta';
import { StoreFeatureCards } from '../store-site/StoreFeatureCards';
import { ACCENT, STORE_COLOR_ENHANCEMENTS } from '../store-site/accent';
import {
  LAUNCH_DATE,
  LAUNCH_LABEL,
  LP,
  SHAPE_FEATURED,
  SHAPE_HERO,
  SHAPE_ITEM,
  SHAPE_MINI,
  SHAPE_THUMB,
  STORE_CONTACT,
  STORE_PLATFORMS,
} from '../store-site/tokens';

// ----------------------------------------------------
// Exact Seed Content from Expo App Database views
// ----------------------------------------------------
interface SeedArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  sources: string[];
  imageUrl: string;
  content: string;
}

interface SeedBrief {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  insights: number;
  imageUrl: string;
  fullText: string;
  sources: string[];
}

interface PlaybackState {
  id: string;
  title: string;
  category: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  voice: string;
}

const SEED_BRIEFS: SeedBrief[] = [
  {
    id: 'b1',
    title: 'Middle Eastern Geopolitics & Central African Ebola Briefing',
    summary: 'Diplomatic efforts escalate to secure a U.S.-Iran ceasefire in the Strait of Hormuz, while the WHO declares a public health emergency over a new Ebola outbreak in the DRC.',
    category: 'Daily Brief',
    readTime: '6 min listen',
    insights: 4,
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80',
    fullText: 'Welcome to the Daily Briefing for May 24, 2026. Pakistan mediates a delicate 60-day ceasefire outline between the United States and Iran to reopen commercial tankers in the Strait of Hormuz, though domestic entities in Tehran raise strategic concerns. Simultaneously, in Central Africa’s Ituri province, the WHO issues global emergency notifications over the rare Bundibugyo Ebola variant, complicated by geopolitical conflicts and the structural collapse of foreign aid.',
    sources: ['WHO', 'CDC', 'USAID', 'AP', 'FARS'],
  },
  {
    id: 'b2',
    title: 'SpaceX Starship Launch & OpenAI Breakthrough Analysis',
    summary: "Analyzing the key structural upgrades of SpaceX's Starship V3 megarocket launch and the profound geometric deductions of OpenAI's reasoning mathematical AI.",
    category: 'Science & Tech',
    readTime: '6 min listen',
    insights: 6,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    fullText: 'Technical briefing desk updates. SpaceX successfully launches its Starship V3 prototype, validating a custom hot-staging system in South Texas. In another sector, research labs confirm that an OpenAI reasoning model has autonomously resolved Paul Erdős’s unit distance planar conjecture, illustrating deductive capabilities that go far beyond statistical language models.',
    sources: ['NASA', 'SPX', 'OAI', 'PR', 'GD'],
  }
];

const SEED_ARTICLES: SeedArticle[] = [
  {
    id: 'a1',
    title: 'Middle Eastern Geopolitics: The Fragile US-Iran Ceasefire and the Strait of Hormuz',
    excerpt: 'Diplomatic efforts to end the escalating 2026 conflict between the United States and the Islamic Republic of Iran have reached a highly critical juncture, with international negotiators moving closer to securing a 60-day ceasefire extension.',
    category: 'Politics',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Geopolitics Desk',
    sources: ['AP', 'WH', 'FARS', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=400&q=80',
    content: `Diplomatic efforts to end the escalating 2026 conflict between the United States and the Islamic Republic of Iran have reached a highly critical juncture, with international negotiators moving closer to securing a 60-day ceasefire extension. Following complex, behind-the-scenes mediation led predominantly by Pakistan, the proposed diplomatic framework centers heavily on the phased reopening of the Strait of Hormuz—a vital maritime chokepoint responsible for a significant share of global oil transit.

    Despite optimistic projections from Washington, deep structural disagreements remain unresolved, threatening to unravel the fragile Memorandum of Understanding before it can be formally ratified. Iranian state media apparatuses, including the Fars news agency—which maintains close ties to the Islamic Revolutionary Guard Corps (IRGC)—have publicly contradicted the American narrative, asserting that the management of the Strait will remain under the exclusive jurisdiction of the Islamic Republic.

    If the fragile 60-day truce manages to hold, the mediation window is expected to pivot toward highly contentious negotiations regarding Iran’s broader nuclear program. Pakistan's emergence as the primary mediator underscores a shifting geopolitical landscape where traditional Western diplomatic channels are increasingly bypassed in favor of regional arbiters.`
  },
  {
    id: 'a2',
    title: 'Global Health Security: The Central African Ebola Crisis and the Collapse of Foreign Aid',
    excerpt: 'A highly lethal and rapidly expanding outbreak of the Ebola virus has escalated across Central Africa, prompting the World Health Organization to declare a public health emergency of international concern.',
    category: 'Health',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Science Desk',
    sources: ['WHO', 'CDC', 'USAID', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&q=80',
    content: `A highly lethal and rapidly expanding outbreak of the Ebola virus has escalated across Central Africa, prompting the World Health Organization (WHO) to officially declare a public health emergency of international concern (PHEIC) on May 17, 2026. Centered in the conflict-ridden Ituri province of the Democratic Republic of the Congo, the outbreak has recorded 82 confirmed cases and nearly 750 suspected cases. The pathogen is the rare Bundibugyo strain, for which there are currently no approved vaccines or specific treatments.

    The epidemiological situation is rapidly deteriorating as the virus crosses international borders, with two confirmed cases in Uganda's capital, Kampala, and an American national evacuated to Germany for specialized care.

    The global response has been severely hampered by regional military conflict and the structural collapse of international aid networks. Eastern Congo remains highly unstable, and the 2025 withdrawal of USAID decimated local networks of community health workers, allowing the virus to circulate undetected for weeks.`
  },
  {
    id: 'a3',
    title: 'Aerospace Engineering: The SpaceX Starship V3 Megarocket Launch',
    excerpt: 'The commercial aerospace sector witnessed a monumental leap as SpaceX successfully executed the inaugural test flight of its 408-foot Starship Version 3 megarocket from South Texas.',
    category: 'Science',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Aerospace Desk',
    sources: ['NASA', 'SPX', 'SC'],
    imageUrl: 'https://cdn.mos.cms.futurecdn.net/ho2v8oSxixqxARQebsz7HP.jpg',
    content: `The commercial aerospace sector witnessed a monumental technological leap in late May 2026 as SpaceX successfully executed the inaugural test flight of its Starship Version 3 (V3) megarocket from a newly completed second launch pad at its Starbase facility in South Texas. Standing an unprecedented 408 feet tall, the redesigned vehicle completed its 12th suborbital test flight.

    The V3 architecture features a radical overhaul, most notably a novel "hot staging" mechanism with integrated hardware secured directly to the top of the 33-engine Super Heavy booster, providing the upper stage engines vital breathing room during separation.

    While the launch achieved spaceflight and deployed 20 dummy Starlink satellites, the mission was not without anomalies: one Raptor engine shut down prematurely and the booster's boostback burn malfunctioned, but the upper stage executed a successful Indian Ocean splashdown—proving iterative development works.`
  },
  {
    id: 'a4',
    title: 'Artificial Intelligence: The Autonomous Disproof of the Erdős Conjecture',
    excerpt: 'In a watershed moment for machine intelligence, an OpenAI reasoning model has autonomously resolved a central, 80-year-old mathematical mystery: the planar unit distance problem.',
    category: 'Technology',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator AI Desk',
    sources: ['OAI', 'PR', 'GD'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80',
    content: `In a watershed moment for machine intelligence, an internal, general-purpose reasoning AI developed by OpenAI has autonomously resolved a central, 80-year-old mathematical mystery: the planar unit distance problem. Formulated by Paul Erdős in 1946, the problem asks how many pairs of dots on a flat plane can be exactly one unit of distance apart.

    The OpenAI model disproved the long-held consensus by utilizing advanced concepts from algebraic number theory to construct an infinite new family of geometric arrangements, employing infinite class field towers and Golod-Shafarevich theory to yield a polynomial improvement. Human refinement by Princeton professor Will Sawin established the precise exponent.

    Validated by Fields Medalist Tim Gowers, this represents the first instance of an AI autonomously solving a foundational open problem in discrete geometry, signaling a paradigm shift away from statistical mimicry toward genuine deductive reasoning.`
  },
  {
    id: 'a5',
    title: 'International Relations: The United States-Sweden Technology Prosperity Deal',
    excerpt: 'In a strategic geopolitical alignment, the United States and Sweden have ratified a Technology Prosperity Deal to secure high-tech supply chains and deep research collaboration.',
    category: 'Politics',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Politics Desk',
    sources: ['WH', 'GOV', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
    content: `In a strategic geopolitical alignment reflecting the modern emphasis on technological sovereignty, the United States and Sweden have officially ratified the comprehensive "Technology Prosperity Deal." Signed in Helsingborg by Secretary of State Marco Rubio and Foreign Minister Maria Malmer Stenergard, it marks only the fourth agreement of its kind, following the UK, Japan, and South Korea.

    The agreement outlines joint initiatives focused on 6G telecommunications, AI process optimization, and advanced manufacturing of rare-earth-free materials, while deepening civil nuclear cooperation on small modular reactors and formalizing Swedish integration into the Artemis lunar program.

    This bilateral agreement is highly indicative of "friendshoring." As global supply chains become weaponized, Western democracies are securing critical infrastructure through exclusive technological corridors—merging national defense alliances with aggressive industrial policy.`
  },
  {
    id: 'a6',
    title: 'Global Public Health Policy: The 2026-2036 GAP-AMR Resolution',
    excerpt: 'During the Seventy-ninth World Health Assembly in Geneva, member states approved the updated Global Action Plan on Antimicrobial Resistance for the 2026–2036 decade.',
    category: 'Health',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Health Desk',
    sources: ['WHO', 'GLASS', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=400&q=80',
    content: `During the Seventy-ninth World Health Assembly (WHA79) in Geneva, member states unanimously approved the updated Global Action Plan on Antimicrobial Resistance (GAP-AMR) for the 2026–2036 decade, addressing the rapidly decreasing efficacy of foundational antibiotics. Surveillance data indicates one in six common bacterial infections in 2023 were completely resistant to standard treatments, contributing to an estimated 4.71 million deaths globally in 2021.

    The framework focuses on preserving treatment ability through a holistic "One Health" approach. Without coordinated intervention, antimicrobial resistance is projected to cause up to 39 million deaths annually by 2050, with treatment costs reaching $412 billion by 2035.

    Success will require a delicate regulatory balancing act—restricting unregulated dispensing while empowering community pharmacists and enforcing regulatory capacity in developing regions plagued by substandard medicines.`
  },
  {
    id: 'a7',
    title: "Cinema and Technology: 'The Brutalist' and the Cannes AI Controversy",
    excerpt: 'The integration of generative AI into cinematic arts has sparked intense debate following the revelation that Brady Corbet’s film heavily utilized AI voice modification software.',
    category: 'Culture',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Culture Desk',
    sources: ['AMP', 'GD', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80',
    content: `The rapid integration of generative artificial intelligence into the traditional cinematic arts has sparked intense, industry-wide debate following the revelation that Brady Corbet’s acclaimed film, The Brutalist, heavily utilized AI voice modification software. The editorial team employed Respeecher to refine the Hungarian pronunciation of leads Adrien Brody and Felicity Jones.

    In response to the public relations crisis, Corbet defended the process as a manual, post-production tool used strictly for phonetic accuracy, insisting no English dialogue or emotional performances were altered. The Academy is now grappling with how to enforce its rule that acting must be "demonstrably performed by humans."

    This controversy exposes deep institutional fault lines, suggesting future artistic merit will increasingly be judged not on emotional resonance, but on the perceived biological purity of a performance's creation.`
  },
  {
    id: 'a8',
    title: 'Agricultural Biotechnology: CRISPR Innovations and Global Food Security',
    excerpt: 'CRISPR gene-editing technologies are advancing rapidly in response to climate volatility, successfully domesticating superfoods and proof-of-concept staples.',
    category: 'Science',
    readTime: '2 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Science Desk',
    sources: ['BT', 'SC', 'AP'],
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&q=80',
    content: `In direct response to the escalating volatility of the global climate, the field of agricultural biotechnology is advancing at an unprecedented pace, leveraging CRISPR gene-editing to engineer resilient food crops. A landmark 2026 study successfully domesticated the goldenberry—a superfood relative of the tomato—by mutating specific ERECTA genes to create a compact architecture suited for commercial farming.

    Concurrently, staple crops including soybeans, potatoes, and cotton have achieved proof-of-concept milestones, programming drought tolerance and herbicide resistance through targeted genomic alterations without transgene integration.

    The strategic importance lies in speed and precision. As arable land diminishes, the ability to rapidly program drought-resistance provides a critical buffer against famine—though commercial viability will be determined in the complex regulatory sphere.`
  },
  {
    id: 'a9',
    title: 'Renewable Energy: The Commercialization of Alternative Battery Technologies',
    excerpt: 'The urgent transition to green energy has catalyzed major advancements in alternative battery storage to satisfy massive AI data center demands.',
    category: 'Economy',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Economics Desk',
    sources: ['CATL', 'BYD', 'RE'],
    imageUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&q=80',
    content: `The urgent global transition toward green energy infrastructure has catalyzed unprecedented growth in alternative battery technologies, with the commercial energy storage market projected to surge from $13.58 billion in 2025 to over $55 billion by 2035. The voracious power demands of AI data centers, 6G rollout, and EV charging networks are pushing industries beyond traditional lithium-ion systems.

    Next-generation solutions—sodium-ion cells, vanadium redox flow batteries, and polymer solid-state systems—are entering grid-scale deployment. Analysts project alternative chemistries, championed by CATL and BYD, will secure up to 10% of global demand within the decade.

    The pivot represents both an engineering triumph and a geopolitical strategy, intentionally diversifying critical supply chains away from concentrated lithium and cobalt bottlenecks.`
  },
  {
    id: 'a10',
    title: "Digital Publishing and Information Dilution: The Era of Algorithmic 'Slop'",
    excerpt: 'The proliferation of automated AI-generated e-books is saturating retail platforms, drastically raising the value of high-quality human editorial curation.',
    category: 'Technology',
    readTime: '3 min read',
    publishedDate: 'May 24, 2026',
    author: 'The Curator Media Desk',
    sources: ['NBER', 'WP', 'GD'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    content: `The unchecked integration of generative artificial intelligence into commercial writing has fundamentally disrupted the traditional publishing industry. A comprehensive NBER study reveals that the number of English-language e-books published weekly on platforms like Amazon has nearly tripled since late 2022. As of the end of 2025, more than half of all new digital book releases feature AI-generated text—a proliferation critics dub algorithmic "slop."

    Unlike the internet, which democratized publishing for human authors, this wave of automated output acts as a mechanism of cultural dilution, shifting the burden of filtering onto the consumer and eroding the assumption that effort signals value.

    This validates the premise of premium, human-directed journalism. When the marginal cost of generating text drops to zero, the true premium commodity becomes selective editorial curation, rigorous fact-verification, and intelligent human synthesis.`
  }
];

// Fixed public-launch target — ~3 months out. Stable across reloads so the countdown never drifts.

// ----------------------------------------------------
// Active Countdown Timer Component (Warm Paper Tone)
// ----------------------------------------------------
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = LAUNCH_DATE;

    const tick = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 select-none">
      {[
        { label: 'days', value: timeLeft.days },
        { label: 'hours', value: timeLeft.hours },
        { label: 'minutes', value: timeLeft.minutes },
        { label: 'seconds', value: timeLeft.seconds, highlight: true },
      ].map((item, idx) => {
        const highlightStyle = item.highlight && STORE_COLOR_ENHANCEMENTS
          ? { color: ACCENT.goldMuted, borderColor: ACCENT.goldBorder, boxShadow: ACCENT.goldGlow }
          : { color: '#31332b', borderColor: 'rgba(49, 51, 43, 0.1)', boxShadow: undefined };
        return (
        <div key={idx} className="flex flex-col items-center">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/60 shadow-sm backdrop-blur-md transition-all duration-300 md:h-20 md:w-20"
            style={{
              color: highlightStyle.color,
              borderColor: highlightStyle.borderColor,
              boxShadow: highlightStyle.boxShadow,
            }}
          >
            <span className="font-mono text-2xl font-bold tracking-tight md:text-3xl">
              {item.value.toString().padStart(2, '0')}
            </span>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#31332b]/5" />
          </div>
          <span className="mt-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-[#31332b]/45">
            {item.label}
          </span>
        </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------
// Main Redesigned Coming Soon Page Component
// ----------------------------------------------------
export function ComingSoon() {
  useStorePageMeta({
    title: 'The Curator · Coming soon',
    description: `${STORE_PLATFORMS.meta} in ${LAUNCH_LABEL}.`,
  });

  // Mobile app simulator states - Upgraded to match Expo App's 4 core tabs
  const [activeTab, setActiveTab] = useState<'briefs' | 'explore' | 'search' | 'saved'>('explore');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedIds, setSavedIds] = useState<string[]>(['a1', 'a3']); // bookmarked briefs

  // Explore segment-toggles ("Today" vs "Global" narratives)
  const [exploreViewMode, setExploreViewMode] = useState<'today' | 'global'>('today');

  // Advanced Search Page state filters
  const [searchFiltersExpanded, setSearchFiltersExpanded] = useState(false);
  const [searchSelectedCategories, setSearchSelectedCategories] = useState<string[]>([]);
  const [searchReadingStatus, setSearchReadingStatus] = useState<'all' | 'saved' | 'unsaved'>('all');
  const [recentArticleIds] = useState<string[]>(['a2', 'a4']);

  // Typography Reader custom settings inside the simulator
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [readingTheme, setReadingTheme] = useState<'warm' | 'dark' | 'nordic'>('warm');
  const [showTypographyPanel, setShowTypographyPanel] = useState(false);

  // Advanced Global Audio Engine inside the phone simulator
  const [playback, setPlayback] = useState<PlaybackState>({
    id: '',
    title: '',
    category: '',
    isPlaying: false,
    currentTime: 0,
    duration: 160, // 2m 40s
    voice: 'Sophia (AI)',
  });
  const [showFullAudioPlayer, setShowFullAudioPlayer] = useState(false);

  const audioTimerRef = useRef<any>(null);
  const readerScrollRef = useRef<HTMLDivElement>(null);

  // Simulated playback time tick
  useEffect(() => {
    if (playback.isPlaying) {
      audioTimerRef.current = setInterval(() => {
        setPlayback((prev) => {
          if (prev.currentTime >= prev.duration) {
            clearInterval(audioTimerRef.current);
            return { ...prev, isPlaying: false, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 1 };
        });
      }, 1000);
    } else {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    }
    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [playback.isPlaying]);

  const handlePlayToggle = (id: string, title: string, category: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayback((prev) => {
      if (prev.id === id) {
        return { ...prev, isPlaying: !prev.isPlaying };
      } else {
        return {
          id,
          title,
          category,
          isPlaying: true,
          currentTime: 0,
          duration: 160,
          voice: prev.voice,
        };
      }
    });
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickedTime = Math.floor((clickX / width) * playback.duration);
    setPlayback((prev) => ({ ...prev, currentTime: clickedTime }));
  };

  const formatTime = (timeInSecs: number) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScroll = () => {
    if (readerScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = readerScrollRef.current;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, pct)));
    }
  };

  const handleSaveToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const featuredBrief = SEED_BRIEFS[0];
  const secondaryBrief = SEED_BRIEFS[1];

  // Dynamically map Top Narratives based on exploreViewMode segment
  const topStoryFeatured = exploreViewMode === 'today' ? SEED_ARTICLES[0] : SEED_ARTICLES[2];
  const topStorySecondary = exploreViewMode === 'today' ? SEED_ARTICLES[1] : SEED_ARTICLES[3];

  // Filter explore briefs list by selected category chip (excluding top narratives)
  const filteredExploreArticles = SEED_ARTICLES.filter(
    a => a.id !== topStoryFeatured.id && a.id !== topStorySecondary.id
  ).filter((art) => {
    return activeCategory === 'All' || art.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Active query engine for Search Screen
  const filteredSearchResults = SEED_ARTICLES.filter((art) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = art.title.toLowerCase().includes(q);
      const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
      if (!matchesTitle && !matchesExcerpt) return false;
    }
    if (searchSelectedCategories.length > 0) {
      if (!searchSelectedCategories.includes(art.category.toLowerCase())) return false;
    }
    if (searchReadingStatus === 'saved') {
      if (!savedIds.includes(art.id)) return false;
    } else if (searchReadingStatus === 'unsaved') {
      if (savedIds.includes(art.id)) return false;
    }
    return true;
  });

  // Dynamic text size class for reader in phone
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'sm': return 'text-[8.5px] leading-relaxed';
      case 'lg': return 'text-[11px] leading-relaxed';
      case 'xl': return 'text-[12px] leading-relaxed';
      default: return 'text-[9.5px] leading-relaxed';
    }
  };

  const recentArticles = recentArticleIds
    .map((id) => SEED_ARTICLES.find((a) => a.id === id))
    .filter((a): a is SeedArticle => Boolean(a));

  // Reader chrome adapts to the selected reading tone.
  const readerBg = readingTheme === 'dark' ? '#0c0d12' : readingTheme === 'nordic' ? '#20222a' : LP.bg;
  const readerText = readingTheme === 'warm' ? LP.onSurface : '#e8eaf0';
  const readerDim = readingTheme === 'warm' ? LP.onVariant : 'rgba(232,234,240,0.55)';
  const readerBorder = readingTheme === 'warm' ? 'rgba(177,179,167,0.32)' : 'rgba(255,255,255,0.08)';
  const readerTrack = readingTheme === 'warm' ? LP.high : 'rgba(255,255,255,0.1)';

  // Image-on-top editorial card (mirrors the app's ArticleCard default/featured).
  const renderHeroCard = (article: SeedArticle) => {
    const isSaved = savedIds.includes(article.id);
    return (
      <button
        type="button"
        onClick={() => { setSelectedArticle(article); setReadingProgress(0); }}
        className="block w-full text-left transition-transform active:scale-[0.98]"
      >
        <div
          className="relative overflow-hidden shadow-lg"
          style={{ ...SHAPE_HERO, height: 172, borderWidth: 1, borderColor: LP.outlineVariant + '40' }}
        >
          <img src={article.imageUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,11,0.72), rgba(14,14,11,0.05) 55%, transparent)' }} />
          <button
            type="button"
            onClick={(e) => handleSaveToggle(article.id, e)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
          >
            <Bookmark className="h-4 w-4" style={{ color: isSaved ? LP.primary : LP.onSurface }} fill={isSaved ? LP.primary : 'none'} />
          </button>
          <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
            <Headphones className="h-3.5 w-3.5" style={{ color: LP.onSurface }} />
          </div>
          <div className="absolute bottom-3 left-3 flex items-center">
            {article.sources.slice(0, 4).map((s, i) => (
              <div
                key={`${s}-${i}`}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(14,14,11,0.2)', marginLeft: i > 0 ? -10 : 0, zIndex: 10 - i }}
              >
                <span className="text-[8px] font-semibold tracking-tight" style={{ color: LP.onSurface }}>{s.slice(0, 2).toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 pt-3">
          <h3 className="font-[family-name:var(--font-headline)] text-[15px] leading-snug line-clamp-2" style={{ color: LP.onSurface }}>
            {article.title}
          </h3>
          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: LP.onVariant }}>
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2.5 pt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.outline }}>
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </button>
    );
  };

  // Compact thumbnail row (mirrors the app's ArticleCard compact).
  const renderCompactCard = (article: SeedArticle, showSave = true) => {
    const isSaved = savedIds.includes(article.id);
    return (
      <button
        type="button"
        onClick={() => { setSelectedArticle(article); setReadingProgress(0); }}
        className="flex w-full items-center gap-3 text-left transition-transform active:scale-[0.98]"
      >
        <div className="h-16 w-16 shrink-0 overflow-hidden shadow-sm" style={{ ...SHAPE_THUMB, borderWidth: 1, borderColor: LP.outlineVariant + '40' }}>
          <img src={article.imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1 space-y-0.5">
          <span className="block text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.outline }}>{article.category}</span>
          <h4 className="font-[family-name:var(--font-headline)] text-[12px] leading-snug line-clamp-2" style={{ color: LP.onSurface }}>{article.title}</h4>
          <div className="flex items-center gap-1.5 text-[8.5px]" style={{ color: LP.outline }}>
            <span>{article.readTime}</span>
            <Headphones className="h-2.5 w-2.5" />
          </div>
        </div>
        {showSave && (
          <span
            role="button"
            onClick={(e) => handleSaveToggle(article.id, e)}
            className="self-center p-1.5"
          >
            <Bookmark className="h-3.5 w-3.5" style={{ color: isSaved ? LP.primary : LP.onSurface }} fill={isSaved ? LP.primary : 'none'} />
          </span>
        )}
      </button>
    );
  };

  return (
    <StoreSiteLayout activeNav="home" mainClassName="!px-5 !py-10 md:!px-8 lg:!px-12">
      {/* Clean Split Hero Grid Layout */}
      <div className="grid flex-1 gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        
        {/* Left Column: Heading, Description, Digital Millisecond Ticker, Release Stats */}
        <div className="relative space-y-8">
          {STORE_COLOR_ENHANCEMENTS && (
            <div
              className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 md:-inset-x-10"
              style={{ background: ACCENT.heroWash }}
              aria-hidden
            />
          )}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StorePlatformBadge platform="apple">App Store · News</StorePlatformBadge>
              <StorePlatformBadge platform="google">Google Play · News &amp; Magazines</StorePlatformBadge>
              <StorePlatformBadge platform="samsung">Galaxy Store · News</StorePlatformBadge>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#31332b]/10 bg-[#efeee5]/40 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#31332b]/60">
                <CalendarClock className="h-3.5 w-3.5 animate-pulse" />
                Launching {LAUNCH_LABEL}
              </span>
            </div>

            <p className="text-[13px] font-black uppercase tracking-[0.34em] text-[#31332b]/45">
              A calmer way to read the news
            </p>
            
            <h1
              className="max-w-[20ch] font-[family-name:var(--font-headline)] text-[clamp(2.1rem,5.8vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.015em] text-[#31332b]"
            >
              <span className="block font-medium not-italic">The day&apos;s news,</span>
              <span
                className="mt-1 block font-medium italic"
                style={{ color: STORE_COLOR_ENHANCEMENTS ? ACCENT.headlineMuted : 'rgba(49, 51, 43, 0.55)' }}
              >
                distilled into briefings you can read or hear.
              </span>
            </h1>
          </div>

          <p className="max-w-xl text-lg md:text-xl leading-relaxed text-[#31332b]/75 font-medium">
            The Curator reads dozens of sources for you and condenses each day's biggest stories into short, source-backed briefings. Explore by topic, search the archive, save articles into collections, and listen with AI narration — the whole picture, without the endless feed.
          </p>

          {/* Countdown to public launch */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#31332b]/45 block">Public launch on {STORE_PLATFORMS.label} in</span>
            <CountdownTimer />
          </div>

          {/* Quick feature stats strip — reflects what actually ships */}
          <div
            className="grid max-w-lg grid-cols-3 gap-4 border px-5 py-5"
            style={{ borderColor: `${LP.onSurface}1A`, backgroundColor: 'rgba(255,255,255,0.45)', ...SHAPE_ITEM }}
          >
            {[
              { label: 'Format', val: 'Briefs + Articles' },
              { label: 'Listen', val: 'AI Audio Narration' },
              { label: 'Your data', val: 'Export & Delete' }
            ].map((stat, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#31332b]/40">{stat.label}</span>
                <p className="text-sm font-bold text-[#31332b]/85">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: high-fidelity light-mode replica of the live Expo app */}
        <div className="flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e7e2d7]/60 blur-[90px]" />

          <div
            className="relative h-[620px] w-[300px] overflow-hidden rounded-[52px] border-[6px] border-[#2b2c28] shadow-[0_30px_70px_-15px_rgba(49,51,43,0.4)] select-none"
            style={{ backgroundColor: LP.bg, fontFamily: 'Manrope, system-ui, sans-serif' }}
          >
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-50 h-5 w-20 -translate-x-1/2 rounded-full bg-[#2b2c28]" />

            {/* Status bar */}
            <div className="absolute inset-x-0 top-0 z-30 flex h-9 items-end justify-between px-6 pb-1 text-[10px] font-bold" style={{ color: LP.onSurface }}>
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                <Battery className="h-3 w-3" />
              </div>
            </div>

            {/* Floating pill header (menu / title / avatar) */}
            <div className="absolute top-11 inset-x-0 z-30 flex items-center gap-2 px-3">
              <button
                type="button"
                onClick={() => { setActiveTab('briefs'); setSelectedArticle(null); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-md"
                style={{ borderColor: LP.outlineVariant + '4D', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              >
                <Menu className="h-[18px] w-[18px]" style={{ color: LP.onSurface }} strokeWidth={2.4} />
              </button>

              <div
                className="flex h-[52px] flex-1 items-center justify-center rounded-full border-2 px-3 shadow-md"
                style={{ borderColor: LP.outlineVariant + '4D', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              >
                <span className="font-[family-name:var(--font-headline)] text-[18px] italic" style={{ color: LP.onSurface }}>
                  {activeTab === 'briefs' ? 'Briefs' : activeTab === 'explore' ? 'Explore' : activeTab === 'search' ? 'Search' : 'Saved'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => { setActiveTab('saved'); setSelectedArticle(null); }}
                className="flex h-[52px] items-center gap-1.5 rounded-full border-2 px-2.5 shadow-md"
                style={{ borderColor: LP.outlineVariant + '4D', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              >
                <span
                  className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: LP.secondaryContainer, color: LP.onSecondaryContainer }}
                >
                  <Sparkles className="h-2 w-2" fill="currentColor" /> Premium
                </span>
                <img
                  src={IMAGES.profile.woman}
                  alt="User"
                  className="h-7 w-7 rounded-full border object-cover"
                  style={{ borderColor: LP.outlineVariant + '40' }}
                />
              </button>
            </div>

            {/* Phone App Views */}
            <div className="h-full" style={{ backgroundColor: LP.bg }}>

              {/* 1. Briefs Feed screen */}
              {activeTab === 'briefs' && (
                <div className="hide-scrollbar h-full overflow-y-auto px-4 pb-28 pt-[104px] animate-fade-in">

                  {/* Featured brief */}
                  <div
                    className="border p-5 shadow-sm"
                    style={{ ...SHAPE_FEATURED, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: 'rgba(255,255,255,0.7)' }}
                  >
                    <div
                      className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${LP.primary}, ${LP.secondary})`, color: LP.primaryFg }}
                    >
                      <Sparkles className="h-2.5 w-2.5" fill="currentColor" /> Today's Featured
                    </div>

                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="h-24 w-24 overflow-hidden rounded-full border-4" style={{ borderColor: LP.outlineVariant + '4D' }}>
                        <img src={featuredBrief.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-headline)] text-[20px] leading-tight" style={{ color: LP.onSurface }}>
                          {featuredBrief.title}
                        </h3>
                        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-medium" style={{ color: LP.outline }}>
                          <span>{featuredBrief.readTime}</span><span>•</span><span>{featuredBrief.insights} insights</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-3 px-1 text-center text-[11px] leading-relaxed" style={{ color: LP.onVariant }}>
                      {featuredBrief.summary}
                    </p>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => handlePlayToggle(featuredBrief.id, featuredBrief.title, featuredBrief.category, e)}
                        className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: LP.inverse }}
                      >
                        {playback.id === featuredBrief.id && playback.isPlaying ? (
                          <Pause className="h-6 w-6" style={{ color: LP.inverseOn }} fill={LP.inverseOn} />
                        ) : (
                          <Play className="ml-0.5 h-6 w-6" style={{ color: LP.inverseOn }} fill={LP.inverseOn} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* More briefs */}
                  <h3 className="mb-3 mt-6 font-[family-name:var(--font-headline)] text-[18px] italic" style={{ color: LP.onSurface }}>
                    More Briefs
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => handlePlayToggle(secondaryBrief.id, secondaryBrief.title, secondaryBrief.category, e)}
                    className="flex w-full items-center gap-3 border p-3 text-left shadow-sm transition-transform active:scale-[0.98]"
                    style={{ ...SHAPE_ITEM, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: 'rgba(255,255,255,0.7)' }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: LP.inverse }}>
                      {playback.id === secondaryBrief.id && playback.isPlaying ? (
                        <Pause className="h-4 w-4" style={{ color: LP.inverseOn }} fill={LP.inverseOn} />
                      ) : (
                        <Play className="ml-0.5 h-4 w-4" style={{ color: LP.inverseOn }} fill={LP.inverseOn} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.outline }}>
                        {secondaryBrief.category}
                      </span>
                      <h4 className="font-[family-name:var(--font-headline)] text-[12px] leading-snug line-clamp-2" style={{ color: LP.onSurface }}>
                        {secondaryBrief.title}
                      </h4>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[8.5px]" style={{ color: LP.outline }}>
                        <span>{secondaryBrief.readTime}</span><span>•</span><span>{secondaryBrief.insights} insights</span>
                      </div>
                    </div>
                  </button>

                  {/* Editorial quote */}
                  <div
                    className="relative mt-5 overflow-hidden border p-6 text-center"
                    style={{ borderRadius: 28, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: LP.low }}
                  >
                    <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full" style={{ backgroundColor: LP.outlineVariant, opacity: 0.12 }} />
                    <Quote className="mx-auto mb-3 h-8 w-8" style={{ color: LP.outline, opacity: 0.3 }} />
                    <p className="font-[family-name:var(--font-headline)] text-[13px] italic leading-relaxed" style={{ color: LP.onSurface }}>
                      "Truth is not a destination, but a distillation of perspectives."
                    </p>
                    <span className="mt-3 block text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ color: LP.outline }}>
                      — The Curator Editorial Board
                    </span>
                  </div>
                </div>
              )}

              {/* 2. Explore / Category screen - Highly upgraded segment switcher and cards */}
              {activeTab === 'explore' && (
                <div className="hide-scrollbar h-full overflow-y-auto px-4 pb-28 pt-[104px] animate-fade-in">

                  {/* Top narratives header + segment toggle */}
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-headline)] text-[20px] italic" style={{ color: LP.onSurface }}>Top Narratives</h3>
                    <div className="flex gap-1.5">
                      {(['today', 'global'] as const).map((m) => {
                        const active = exploreViewMode === m;
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => { setExploreViewMode(m); setActiveCategory('All'); }}
                            className="rounded-full border px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.14em]"
                            style={{ borderColor: LP.outlineVariant + '40', backgroundColor: active ? LP.secondaryContainer : 'transparent', color: active ? LP.onSecondaryContainer : LP.outline }}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-7">{renderHeroCard(topStoryFeatured)}</div>
                  <div className="mb-7">{renderHeroCard(topStorySecondary)}</div>

                  {/* Category chips */}
                  <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
                    {['All', 'Politics', 'Technology', 'Climate', 'Economy', 'Health', 'Science'].map((cat) => {
                      const active = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className="shrink-0 rounded-full border px-3.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em]"
                          style={{ borderColor: LP.outlineVariant + '40', backgroundColor: active ? LP.secondaryContainer : 'transparent', color: active ? LP.onSecondaryContainer : LP.outline }}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: LP.onVariant }}>
                    {filteredExploreArticles.length} narratives
                  </p>
                  <div className="space-y-7">
                    {filteredExploreArticles.map((art) => (
                      <div key={art.id}>{renderHeroCard(art)}</div>
                    ))}
                    {filteredExploreArticles.length === 0 && (
                      <div className="flex flex-col items-center gap-2 py-10 text-center">
                        <Search className="h-7 w-7" style={{ color: LP.outlineVariant }} />
                        <h4 className="text-[11px] font-semibold" style={{ color: LP.onSurface }}>No narratives found</h4>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Search tab screen - Fully interactive search and category status filters */}
              {activeTab === 'search' && (
                <div className="hide-scrollbar h-full overflow-y-auto px-4 pb-28 pt-[104px] animate-fade-in">

                  {/* Search input */}
                  <div className="flex items-center gap-3 rounded-full border px-5 py-3" style={{ borderColor: LP.outlineVariant + '40', backgroundColor: LP.low }}>
                    <Search className="h-4 w-4" style={{ color: LP.outline }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search narratives..."
                      className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:opacity-50"
                      style={{ color: LP.onSurface }}
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => setSearchQuery('')}>
                        <X className="h-3.5 w-3.5" style={{ color: LP.outline }} />
                      </button>
                    )}
                  </div>

                  {/* Filters toggle */}
                  <button
                    type="button"
                    onClick={() => setSearchFiltersExpanded(!searchFiltersExpanded)}
                    className="mt-3.5 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: LP.onVariant }}
                  >
                    <SlidersHorizontal className="h-3 w-3" /> Filters
                    {searchFiltersExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {/* Filters panel */}
                  {searchFiltersExpanded && (
                    <div className="mt-3.5 space-y-3 animate-fade-in">
                      <div>
                        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.onVariant }}>Categories</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Politics', 'Technology', 'Climate', 'Economy', 'Health', 'Science'].map((cat) => {
                            const sel = searchSelectedCategories.includes(cat.toLowerCase());
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setSearchSelectedCategories(prev => prev.includes(cat.toLowerCase()) ? prev.filter(c => c !== cat.toLowerCase()) : [...prev, cat.toLowerCase()])}
                                className="rounded-full border px-3 py-1 text-[8px] font-semibold uppercase tracking-wide"
                                style={{ borderColor: sel ? LP.secondaryContainer : LP.outlineVariant + '40', backgroundColor: sel ? LP.secondaryContainer : 'transparent', color: sel ? LP.onSecondaryContainer : LP.outline }}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.onVariant }}>Status</p>
                        <div className="flex gap-1.5">
                          {(['all', 'saved', 'unsaved'] as const).map((st) => {
                            const sel = searchReadingStatus === st;
                            return (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setSearchReadingStatus(st)}
                                className="rounded-full border px-3 py-1 text-[8px] font-semibold capitalize tracking-wide"
                                style={{ borderColor: sel ? LP.secondaryContainer : LP.outlineVariant + '40', backgroundColor: sel ? LP.secondaryContainer : 'transparent', color: sel ? LP.onSecondaryContainer : LP.outline }}
                              >
                                {st}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Continue reading */}
                  {!searchQuery && searchSelectedCategories.length === 0 && recentArticles.length > 0 && (
                    <div className="mt-5">
                      <h4 className="mb-2.5 font-[family-name:var(--font-headline)] text-[15px]" style={{ color: LP.onSurface }}>Continue Reading</h4>
                      <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
                        {recentArticles.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => { setSelectedArticle(a); setReadingProgress(0); }}
                            className="w-44 shrink-0 text-left"
                          >
                            <div className="h-24 w-full overflow-hidden" style={{ ...SHAPE_THUMB, borderWidth: 1, borderColor: LP.outlineVariant + '40' }}>
                              <img src={a.imageUrl} alt="" className="h-full w-full object-cover" />
                            </div>
                            <span className="mt-1.5 block text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: LP.outline }}>{a.category}</span>
                            <h5 className="font-[family-name:var(--font-headline)] text-[11px] leading-snug line-clamp-2" style={{ color: LP.onSurface }}>{a.title}</h5>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results */}
                  <p className="mb-3 mt-5 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: LP.outline }}>
                    {filteredSearchResults.length} {filteredSearchResults.length === 1 ? 'narrative' : 'narratives'}
                  </p>
                  <div className="space-y-4">
                    {filteredSearchResults.map((a) => (
                      <div key={a.id}>{renderCompactCard(a)}</div>
                    ))}
                    {filteredSearchResults.length === 0 && (
                      <div className="flex flex-col items-center gap-2 py-12 text-center">
                        <Search className="h-8 w-8" style={{ color: LP.outlineVariant }} />
                        <h4 className="font-[family-name:var(--font-headline)] text-[14px]" style={{ color: LP.onSurface }}>{searchQuery ? 'No results' : 'Start searching'}</h4>
                        <p className="px-6 text-[9px] leading-relaxed" style={{ color: LP.onVariant }}>Search across all narratives, topics, and sources.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. Saved tab screen */}
              {activeTab === 'saved' && (
                <div className="hide-scrollbar h-full overflow-y-auto px-4 pb-28 pt-[104px] animate-fade-in">

                  {/* Storage meter */}
                  <div className="border p-4" style={{ borderRadius: 24, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: LP.low }}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold" style={{ color: LP.onSurface }}>Storage</span>
                      <span className="text-[11px]" style={{ color: LP.onVariant }}>{savedIds.length}/50</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: LP.high }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min((savedIds.length / 50) * 100, 100)}%`, backgroundColor: LP.primary }} />
                    </div>
                  </div>

                  {/* Collections CTA */}
                  <button
                    type="button"
                    className="mt-4 flex w-full items-center gap-3.5 border p-4 text-left"
                    style={{ borderRadius: 24, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: LP.lowest }}
                  >
                    <Folder className="h-5 w-5" style={{ color: LP.primary }} />
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold" style={{ color: LP.onSurface }}>Collections</p>
                      <p className="text-[10px]" style={{ color: LP.onVariant }}>Organize your saved narratives</p>
                    </div>
                    <Sparkles className="h-3.5 w-3.5" style={{ color: LP.outline }} />
                  </button>

                  {/* Filter pill */}
                  <div className="mt-4 flex items-center gap-3 rounded-full px-4 py-2.5" style={{ backgroundColor: LP.input }}>
                    <Search className="h-3.5 w-3.5" style={{ color: LP.outline }} />
                    <span className="text-[11px]" style={{ color: LP.onVariant }}>Filter saved...</span>
                  </div>

                  <h3 className="mb-3 mt-5 font-[family-name:var(--font-headline)] text-[16px] italic" style={{ color: LP.onSurface }}>Saved Vault</h3>
                  {savedIds.length > 0 ? (
                    <div className="space-y-4">
                      {SEED_ARTICLES.filter((a) => savedIds.includes(a.id)).map((a) => (
                        <div key={a.id}>{renderCompactCard(a)}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                      <Bookmark className="h-8 w-8" style={{ color: LP.outlineVariant }} />
                      <h4 className="font-[family-name:var(--font-headline)] text-[14px]" style={{ color: LP.onSurface }}>No saved articles</h4>
                      <p className="px-10 text-[9px] leading-relaxed" style={{ color: LP.onVariant }}>Bookmark articles to read later.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Mini audio player */}
              {playback.id && !selectedArticle && !showFullAudioPlayer && (
                <button
                  type="button"
                  onClick={() => setShowFullAudioPlayer(true)}
                  className="absolute inset-x-3 bottom-[72px] z-30 overflow-hidden border text-left shadow-lg animate-slide-up"
                  style={{ ...SHAPE_MINI, borderWidth: 1, borderColor: LP.outlineVariant + '26', backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
                >
                  <div className="h-[3px]" style={{ backgroundColor: LP.high }}>
                    <div className="h-full" style={{ width: `${(playback.currentTime / playback.duration) * 100}%`, background: `linear-gradient(to right, ${LP.primary}, ${LP.secondary})` }} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold" style={{ color: LP.onSurface }}>{playback.title}</p>
                      <p className="text-[9px]" style={{ color: LP.onVariant }}>{formatTime(playback.currentTime)} / {formatTime(playback.duration)}</p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center"><SkipBack className="h-3.5 w-3.5" style={{ color: LP.onSurface }} /></span>
                    <span
                      role="button"
                      onClick={(e) => { e.stopPropagation(); setPlayback(prev => ({ ...prev, isPlaying: !prev.isPlaying })); }}
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ backgroundColor: LP.primary }}
                    >
                      {playback.isPlaying ? <Pause className="h-4 w-4" style={{ color: LP.primaryFg }} fill={LP.primaryFg} /> : <Play className="ml-0.5 h-4 w-4" style={{ color: LP.primaryFg }} fill={LP.primaryFg} />}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center"><SkipForward className="h-3.5 w-3.5" style={{ color: LP.onSurface }} /></span>
                    <span
                      role="button"
                      onClick={(e) => { e.stopPropagation(); setPlayback(prev => ({ ...prev, id: '', isPlaying: false })); }}
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      <X className="h-3.5 w-3.5" style={{ color: LP.onVariant }} />
                    </span>
                  </div>
                </button>
              )}

              {/* Floating tab bar (mirrors FloatingTabBar) */}
              <div
                className="absolute inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-[34px] border-2 px-2 py-1.5 shadow-xl"
                style={{ borderColor: LP.outlineVariant + '33', backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              >
                {([
                  { id: 'briefs', Icon: Sparkles, label: 'Brief', fill: true },
                  { id: 'explore', Icon: Compass, label: 'Explore', fill: false },
                  { id: 'search', Icon: Search, label: 'Search', fill: false },
                  { id: 'saved', Icon: Bookmark, label: 'Saved', fill: true },
                ] as const).map((t) => {
                  const active = activeTab === t.id;
                  const TabIcon = t.Icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setActiveTab(t.id); setSelectedArticle(null); }}
                      className="flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 transition-colors"
                      style={active ? { backgroundColor: LP.primary } : undefined}
                    >
                      <TabIcon
                        className="h-[18px] w-[18px]"
                        style={{ color: active ? LP.primaryFg : LP.onVariant }}
                        fill={active && t.fill ? LP.primaryFg : 'none'}
                        strokeWidth={active ? 2 : 1.6}
                      />
                      <span className="text-[9px] font-medium" style={{ color: active ? LP.primaryFg : LP.onVariant }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio full player drawer */}
            {showFullAudioPlayer && (
              <div className="absolute inset-0 z-50 flex flex-col justify-between p-5 animate-slide-up" style={{ backgroundColor: LP.bg }}>
                <div className="flex items-center justify-between border-b pb-2.5 pt-6" style={{ borderColor: LP.outlineVariant + '33' }}>
                  <button
                    type="button"
                    onClick={() => setShowFullAudioPlayer(false)}
                    className="flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: LP.primary }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Feed
                  </button>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.outline }}>Narration Studio</span>
                </div>

                <div className="my-2 flex flex-col items-center gap-4 text-center select-none">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-4 shadow-xl animate-float" style={{ borderColor: LP.outlineVariant + '4D' }}>
                    <img
                      src={playback.id === 'b2' ? IMAGES.briefs.tech : IMAGES.briefs.morning}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ color: LP.primary }}>
                      {playback.category} Narrative
                    </span>
                    <h2 className="mt-1 px-4 font-[family-name:var(--font-headline)] text-[16px] leading-tight" style={{ color: LP.onSurface }}>
                      {playback.title}
                    </h2>
                  </div>
                </div>

                {/* Soundwave */}
                <div className="my-1 flex h-12 items-end justify-center gap-[3px] rounded-xl border px-4 select-none" style={{ borderColor: LP.outlineVariant + '26', backgroundColor: LP.low }}>
                  {[15, 35, 20, 50, 25, 60, 30, 45, 18, 38, 12, 42, 26, 56, 34, 45, 15, 30, 12, 38].map((hVal, idx) => (
                    <div
                      key={idx}
                      className="w-[2.5px] rounded-full"
                      style={{
                        height: `${hVal}%`,
                        backgroundColor: playback.isPlaying ? LP.primary : LP.outlineVariant,
                        transformOrigin: 'bottom',
                        animation: playback.isPlaying ? `wave 1.2s infinite ease-in-out` : 'none',
                        animationDelay: `${(idx % 3) * 0.15}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Scrubber */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[9px] font-semibold" style={{ color: LP.onVariant }}>
                    <span>{formatTime(playback.currentTime)}</span>
                    <span>{formatTime(playback.duration)}</span>
                  </div>

                  <div onClick={handleScrub} className="relative h-1 w-full cursor-pointer overflow-hidden rounded-full" style={{ backgroundColor: LP.high }}>
                    <div className="h-full" style={{ width: `${(playback.currentTime / playback.duration) * 100}%`, background: `linear-gradient(to right, ${LP.primary}, ${LP.secondary})` }} />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <select
                      value={playback.voice}
                      onChange={(e) => setPlayback(prev => ({ ...prev, voice: e.target.value }))}
                      className="cursor-pointer border-none bg-transparent text-[9px] font-semibold uppercase tracking-wide outline-none"
                      style={{ color: LP.primary }}
                    >
                      <option value="Sophia (AI)">Sophia (AI)</option>
                      <option value="Marcus (AI)">Marcus (AI)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setPlayback(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                      style={{ backgroundColor: LP.primary }}
                    >
                      {playback.isPlaying ? <Pause className="h-4 w-4" style={{ color: LP.primaryFg }} fill={LP.primaryFg} /> : <Play className="ml-0.5 h-4 w-4" style={{ color: LP.primaryFg }} fill={LP.primaryFg} />}
                    </button>

                    <Volume2 className="h-4 w-4" style={{ color: LP.onVariant }} />
                  </div>
                </div>

                <div className="flex h-5 items-center justify-center">
                  <div className="h-[3px] w-16 rounded-full" style={{ backgroundColor: LP.outlineVariant }} />
                </div>
              </div>
            )}

            {/* Simulated reader view + typography panel */}
            {selectedArticle && (
              <div className="absolute inset-0 z-40 flex flex-col animate-slide-up" style={{ backgroundColor: readerBg }}>
                <div className="absolute inset-x-0 top-0 z-10 h-[3px]" style={{ backgroundColor: readerTrack }}>
                  <div className="h-full transition-all duration-75" style={{ width: `${readingProgress}%`, backgroundColor: LP.primary }} />
                </div>

                <div className="flex items-center justify-between px-4 pb-2 pt-9" style={{ borderBottom: `1px solid ${readerBorder}` }}>
                  <button
                    type="button"
                    onClick={() => { setSelectedArticle(null); setShowTypographyPanel(false); }}
                    className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: LP.primary }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Back
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowTypographyPanel(!showTypographyPanel)}
                      className="rounded-lg border p-1.5"
                      style={{ borderColor: readerBorder, color: readerText }}
                    >
                      <Type className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={(e) => handleSaveToggle(selectedArticle.id, e)} style={{ color: readerText }}>
                      {savedIds.includes(selectedArticle.id) ? (
                        <BookmarkCheck className="h-3.5 w-3.5" style={{ color: LP.primary }} />
                      ) : (
                        <Bookmark className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div
                  ref={readerScrollRef}
                  onScroll={handleScroll}
                  className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-5"
                  style={{ color: readerText }}
                >
                  <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.primary }}>
                    <span>{selectedArticle.category}</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>

                  <h2 className="font-[family-name:var(--font-headline)] text-[18px] leading-snug" style={{ color: readerText }}>
                    {selectedArticle.title}
                  </h2>

                  <div className="h-px w-8" style={{ backgroundColor: LP.primary, opacity: 0.4 }} />

                  <p className={`font-[family-name:var(--font-headline)] italic ${getTextSizeClass()}`} style={{ color: readerText, opacity: 0.85 }}>
                    {selectedArticle.excerpt}
                  </p>

                  <p className={`whitespace-pre-line ${getTextSizeClass()}`} style={{ color: readerText, opacity: 0.92 }}>
                    {selectedArticle.content || 'Full synchronized text and narration assets will go live in the upcoming beta release.'}
                  </p>

                  {selectedArticle.sources && (
                    <div className="space-y-1.5 pt-3" style={{ borderTop: `1px solid ${readerBorder}` }}>
                      <span className="block text-[7px] font-semibold uppercase tracking-[0.18em]" style={{ color: readerDim }}>
                        Verified Sources
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedArticle.sources.map((src: string, sIdx: number) => (
                          <span key={sIdx} className="rounded border px-1.5 py-0.5 text-[7px] font-semibold" style={{ borderColor: readerBorder, color: readerDim }}>
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Typography panel */}
                {showTypographyPanel && (
                  <div
                    className="absolute inset-x-3 bottom-4 z-50 space-y-3 rounded-2xl border p-4 shadow-2xl animate-slide-up"
                    style={{ backgroundColor: readingTheme === 'warm' ? LP.container : '#181a24', borderColor: readingTheme === 'warm' ? LP.outlineVariant + '40' : 'rgba(255,255,255,0.1)', color: readerText }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ opacity: 0.6 }}>Typography</span>
                      <button type="button" onClick={() => setShowTypographyPanel(false)} className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: LP.primary }}>
                        Done
                      </button>
                    </div>

                    <div>
                      <span className="mb-1 block text-[8px] font-semibold uppercase tracking-wide" style={{ opacity: 0.5 }}>Text Size</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setTextSize(sz)}
                            className="rounded-md border py-1.5 text-[9px] font-bold uppercase"
                            style={{ borderColor: textSize === sz ? LP.primary : readerBorder, backgroundColor: textSize === sz ? LP.primary : 'transparent', color: textSize === sz ? LP.primaryFg : readerText }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="mb-1 block text-[8px] font-semibold uppercase tracking-wide" style={{ opacity: 0.5 }}>Reading Tone</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([
                          { id: 'warm', label: 'Warm' },
                          { id: 'dark', label: 'Dark' },
                          { id: 'nordic', label: 'Nordic' },
                        ] as const).map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => setReadingTheme(th.id)}
                            className="rounded-md border py-1.5 text-[8px] font-bold uppercase tracking-wide"
                            style={{ borderColor: readingTheme === th.id ? LP.primary : readerBorder, backgroundColor: readingTheme === th.id ? LP.inverse : 'transparent', color: readingTheme === th.id ? LP.inverseOn : readerText }}
                          >
                            {th.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature band — built directly from the app's editorial design language */}
      <StoreFeatureCards />

      {/* App information for store listing & review teams */}
      <section className="pb-12">
        <div className="border-t border-[#31332b]/10 pt-12">
          <div className="mb-10 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.34em] text-[#31332b]/45">App information</span>
            <h2 className="mt-3 font-[family-name:var(--font-headline)] text-[clamp(1.8rem,4vw,3rem)] italic font-medium leading-[1.04] tracking-[-0.02em] text-[#31332b]">
              Everything for the {STORE_PLATFORMS.review} listings.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#31332b]/70 font-medium">
              The Curator is a news reader for iPhone, iPad, and Android. The details below summarise how the app works, what data it collects, how subscriptions and account deletion work, and the support contacts reviewers expect — aligned with App Store Connect, Google Play Data safety, and Samsung Seller Portal.
            </p>
          </div>

          {/* Shared key facts */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { k: 'Price', v: 'Free download' },
              { k: 'In-app purchases', v: 'Subscriptions + Lifetime' },
              { k: 'Ads', v: 'Free tier only' },
              { k: 'Languages', v: 'English (more soon)' },
              { k: 'Account deletion', v: 'In-app + email' },
              { k: 'Tracking', v: 'None across apps' },
            ].map((f) => (
              <div
                key={f.k}
                className="border border-[#31332b]/10 bg-white/50 px-4 py-3.5"
                style={{ borderTopLeftRadius: 18, borderTopRightRadius: 8, borderBottomRightRadius: 22, borderBottomLeftRadius: 12 }}
              >
                <span className="block text-[8px] font-bold uppercase tracking-widest text-[#31332b]/40">{f.k}</span>
                <p className="mt-0.5 text-[13px] font-bold text-[#31332b]/85">{f.v}</p>
              </div>
            ))}
          </div>

          {/* Platform-specific listing facts */}
          <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Store,
                platform: 'Google Play',
                facts: [
                  { k: 'Category', v: 'News & Magazines' },
                  { k: 'Content rating', v: 'Teen (13+)' },
                  { k: 'Billing', v: 'Google Play Billing' },
                  { k: 'Data safety', v: 'Play Console form filed' },
                  { k: 'Support', v: '/support' },
                ],
              },
              {
                Icon: Smartphone,
                platform: 'Galaxy Store',
                facts: [
                  { k: 'Category', v: 'News' },
                  { k: 'Content rating', v: 'Teen (13+)' },
                  { k: 'Billing', v: 'Galaxy Store IAP' },
                  { k: 'Privacy', v: 'Seller Portal filed' },
                  { k: 'Support', v: '/support' },
                ],
              },
              {
                Icon: Apple,
                platform: 'App Store',
                facts: [
                  { k: 'Primary category', v: 'News' },
                  { k: 'Age rating', v: '12+ (Infrequent/Mild)' },
                  { k: 'Billing', v: 'App Store / StoreKit' },
                  { k: 'App Privacy', v: 'Nutrition labels filed' },
                  { k: 'Support URL', v: '/support' },
                ],
              },
            ].map((panel) => (
              <div
                key={panel.platform}
                className="border border-[#31332b]/10 bg-white/55 p-6"
                style={SHAPE_FEATURED}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center"
                    style={{ backgroundColor: '#e7e2d7', ...SHAPE_THUMB }}
                  >
                    <panel.Icon className="h-5 w-5" style={{ color: '#545249' }} />
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] text-[22px] italic text-[#31332b]">{panel.platform}</h3>
                </div>
                <dl className="space-y-3">
                  {panel.facts.map((row) => (
                    <div key={row.k} className="flex items-start justify-between gap-4 border-b border-[#31332b]/8 pb-3 last:border-0 last:pb-0">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#31332b]/45">{row.k}</dt>
                      <dd className="text-right text-[13px] font-semibold text-[#31332b]/85">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Detail cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Compass,
                title: 'What the app does',
                body: 'Daily briefings and full, source-backed articles distilled from multiple outlets across politics, technology, science, health, economy and culture. Explore by topic, search the archive, and save reading into collections.',
              },
              {
                Icon: Headphones,
                title: 'Audio narration',
                body: 'Every brief and article can be listened to with natural AI voices, so you can catch up hands-free. A mini-player keeps playback going while you browse.',
              },
              {
                Icon: ShieldCheck,
                title: 'Data & privacy',
                body: 'We collect your sign-in email, user ID, reading activity (saved articles, collections, history), and crash diagnostics to sync your library and improve reliability. Data is encrypted in transit. Linked to your account — not used for cross-app tracking. We never sell personal data.',
              },
              {
                Icon: EyeOff,
                title: 'No cross-app tracking',
                body: 'The Curator does not track you across other companies\' apps or websites. We do not collect the advertising identifier (IDFA) and do not show the App Tracking Transparency prompt. App Privacy labels reflect this.',
              },
              {
                Icon: Trash2,
                title: 'Account & data deletion',
                body: `Delete your account and associated data anytime from Settings → Account inside the app, or email ${STORE_CONTACT.support}. Deletion is available without leaving the app (required by Apple, Google, and Samsung). Requests are completed within 30 days.`,
              },
              {
                Icon: CreditCard,
                title: 'Subscriptions & billing',
                body: 'Core reading is free and ad-supported. Optional Basic, Premium, and Lifetime purchases are billed through the App Store on iOS and Google Play or Galaxy Store on Android (depending where you installed) via RevenueCat. Manage or cancel subscriptions in your store account settings.',
              },
              {
                Icon: Apple,
                title: 'Sign in with Apple',
                body: 'Sign in with email/password, Google, or Sign in with Apple. When third-party sign-in is offered, Apple requires Sign in with Apple — it is available on iOS alongside the other options.',
              },
              {
                Icon: FileText,
                title: 'Terms & legal',
                body: 'Full Terms of Use and Privacy Policy live on this site at /terms and /privacy. Subscription terms: payment is charged to your Apple ID, Google account, or Samsung account at purchase; subscriptions auto-renew unless cancelled at least 24 hours before the period ends.',
              },
              {
                Icon: Globe,
                title: 'Availability & support',
                body: `Launching in English at first on iPhone, iPad, and Android phones. More languages and regions to follow. Help, FAQs, and contact details are on the Support page (${STORE_CONTACT.support}).`,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group border border-[#31332b]/10 bg-white/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_20px_40px_-22px_rgba(49,51,43,0.38)]"
                style={SHAPE_ITEM}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center"
                  style={{ backgroundColor: '#e7e2d7', borderTopLeftRadius: 16, borderTopRightRadius: 8, borderBottomRightRadius: 20, borderBottomLeftRadius: 12 }}
                >
                  <c.Icon className="h-[20px] w-[20px]" style={{ color: '#545249' }} />
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-headline)] text-[19px] italic leading-tight text-[#31332b]">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#31332b]/65">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Apple-required subscription disclosure */}
          <div
            className="mt-8 border border-[#31332b]/10 bg-[#efeee5]/60 px-6 py-5"
            style={SHAPE_ITEM}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#31332b]/45">Subscription terms ({STORE_PLATFORMS.amp})</span>
            <p className="mt-3 text-[13px] leading-relaxed text-[#31332b]/70">
              Payment is charged to your Apple ID, Google Play account, or Samsung Galaxy Store account at confirmation of purchase. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. Your account is charged for renewal within 24 hours prior to the end of the current period. You can manage and cancel subscriptions in your App Store, Google Play, or Galaxy Store account settings after purchase. Lifetime purchases are one-time and do not renew.
            </p>
          </div>

          {/* Required links for store review */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#31332b]/60">
            <Link to="/privacy" className="inline-flex items-center gap-1.5 rounded-full border border-[#31332b]/15 bg-white/40 px-4 py-2 hover:bg-[#efeee5] transition-colors">
              <LockKeyhole className="h-3.5 w-3.5" /> Privacy Policy
            </Link>
            <Link to="/terms" className="inline-flex items-center gap-1.5 rounded-full border border-[#31332b]/15 bg-white/40 px-4 py-2 hover:bg-[#efeee5] transition-colors">
              <FileText className="h-3.5 w-3.5" /> Terms of Use
            </Link>
            <Link to="/support" className="inline-flex items-center gap-1.5 rounded-full border border-[#31332b]/15 bg-white/40 px-4 py-2 hover:bg-[#efeee5] transition-colors">
              <Mail className="h-3.5 w-3.5" /> Support
            </Link>
            <a href={`mailto:${STORE_CONTACT.privacy}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#31332b]/15 bg-white/40 px-4 py-2 hover:bg-[#efeee5] transition-colors">
              <ShieldCheck className="h-3.5 w-3.5" /> {STORE_CONTACT.privacy}
            </a>
            <StorePlatformBadge platform="apple">App Store · {LAUNCH_LABEL}</StorePlatformBadge>
            <StorePlatformBadge platform="google">Google Play · {LAUNCH_LABEL}</StorePlatformBadge>
            <StorePlatformBadge platform="samsung">Galaxy Store · {LAUNCH_LABEL}</StorePlatformBadge>
          </div>
        </div>
      </section>

      {/* Launch CTA band — app inverse surface for editorial contrast */}
      <section className="py-12">
        <div
          className="relative overflow-hidden px-7 py-12 md:px-14 md:py-16"
          style={{ backgroundColor: '#0e0e0b', ...SHAPE_FEATURED }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#e7e2d7]/10 blur-[80px]" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="text-[11px] font-black uppercase tracking-[0.34em] text-[#e9e8e3]/55">Public launch · {LAUNCH_LABEL}</span>
              <h2 className="mt-3 font-[family-name:var(--font-headline)] text-[clamp(2rem,4.5vw,3.25rem)] italic font-medium leading-[1.04] tracking-[-0.02em] text-[#f5f4ec]">
                A calmer newsfeed is{' '}
                <span style={{ color: STORE_COLOR_ENHANCEMENTS ? ACCENT.gold : 'rgba(245, 244, 236, 0.55)' }}>
                  almost here.
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#e9e8e3]/70 font-medium">
                The Curator arrives on {STORE_PLATFORMS.label} in {LAUNCH_LABEL}. Reach out and we'll let you know the moment it goes live.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <StorePlatformBadge platform="apple" tone="dark" className="px-5 py-3.5 text-[13px]">
                App Store · {LAUNCH_LABEL}
              </StorePlatformBadge>
              <StorePlatformBadge platform="google" tone="dark" className="px-5 py-3.5 text-[13px]">
                Google Play · {LAUNCH_LABEL}
              </StorePlatformBadge>
              <StorePlatformBadge platform="samsung" tone="dark" className="px-5 py-3.5 text-[13px]">
                Galaxy Store · {LAUNCH_LABEL}
              </StorePlatformBadge>
              <StoreNotifyButton variant="cta" />
            </div>
          </div>
        </div>
      </section>
    </StoreSiteLayout>
  );
}
