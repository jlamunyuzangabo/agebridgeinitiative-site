import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Compass,
  Handshake,
  Menu,
  MoveUpRight,
  Users,
  X,
} from "lucide-react";
import { Link, Route, Router, Switch, useLocation } from "wouter";

// Vite sets BASE_URL from `base` (e.g. "/website-abi/" on GitHub Pages).
const BASE_URL = import.meta.env.BASE_URL;
const ROUTER_BASE = BASE_URL.replace(/\/$/, "");
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Stories, StoryPreview } from "./components/Stories";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pillars/mentorship", label: "Mentorship" },
  { href: "/pillars/career-development", label: "Career development" },
  { href: "/pillars/institutional-development", label: "Institutions" },
  { href: "/stories", label: "News & stories" },
  { href: "/contact", label: "Connect" },
];

const pillarCards = [
  {
    number: "01",
    label: "Mentorship Programme",
    href: "/pillars/mentorship",
    icon: Users,
    accent: "orange",
    summary:
      "A purposeful bridge between seasoned practitioners and emerging talent — built around trust, learning, and measurable growth.",
  },
  {
    number: "02",
    label: "Professional Orientation & Career Development",
    href: "/pillars/career-development",
    icon: Compass,
    accent: "brown",
    summary:
      "Clarity, confidence, and practical pathways for people exploring learning, work, and the next chapter of their careers.",
  },
  {
    number: "03",
    label: "Institutional & Organizational Development",
    href: "/pillars/institutional-development",
    icon: Building2,
    accent: "taupe",
    summary:
      "Strengthening the systems, capacities, and relationships that help institutions respond to people and sustain meaningful development.",
  },
];

type PillarPageContent = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent: "orange" | "brown" | "taupe";
  icon: typeof Users;
  sections: Array<{
    kicker: string;
    title: string;
    body?: string;
    items?: string[];
  }>;
  tags?: string[];
  cta: string;
};

const pillarPages: Record<string, PillarPageContent> = {
  mentorship: {
    number: "01",
    eyebrow: "Pillar one / Mentorship Programme",
    title: "Experience moves when people do.",
    intro:
      "Age Bridge pairs experts with less experienced individuals — including students and early-career practitioners — to make knowledge transfer purposeful, supportive, and connected to real goals.",
    accent: "orange",
    icon: Users,
    sections: [
      {
        kicker: "The rationale",
        title: "A practical bridge between generations.",
        body:
          "The programme is designed to connect generations, strengthen personal growth, and build organisational capacity. Each relationship is grounded in clear objectives, matching criteria, timelines, and ways to reflect on progress.",
      },
      {
        kicker: "Four commitments",
        title: "Structured for learning that lasts.",
        items: [
          "Capacity building for people’s development and performance — strengthening life skills and technical competencies.",
          "Knowledge transfer — drawing on the expertise of seasoned professionals for guidance, advice, and networking.",
          "Inclusive excellence — prioritising diversity, equity, inclusion, and belonging.",
          "Accountability and impact — tracking progress, gathering feedback, and measuring outcomes against agreed indicators.",
        ],
      },
      {
        kicker: "The mentoring journey",
        title: "From first conversation to practical output.",
        items: [
          "Ice breaking: establish trust, expectations, and personal or professional objectives.",
          "Navigating: connect objectives to learning and career opportunities and determine the way forward.",
          "Advising: explore options, consider scenarios, and develop actionable strategies.",
          "Guidance and coaching: use tailored tools, resources, and experience to move forward.",
          "Project-based learning: translate learning into an article, business proposal, research paper, portfolio, or other practical output.",
          "Feedback and celebration: recognise progress, reflect, and keep improving.",
        ],
      },
    ],
    tags: [
      "Psychological safety",
      "Academic orientation",
      "Career progression",
      "Emotional intelligence",
      "Women entrepreneurship",
      "Gender-transformative leadership",
      "Youth participation",
      "Strategic thinking",
      "Project management",
    ],
    cta: "Explore mentorship with ABI",
  },
  career: {
    number: "02",
    eyebrow: "Pillar two / Professional Orientation & Career Development",
    title: "Clarity is a career advantage.",
    intro:
      "ABI’s professional orientation and career development work supports people to explore their direction, build confidence, and take practical steps toward learning and work opportunities.",
    accent: "brown",
    icon: Compass,
    sections: [
      {
        kicker: "Where it starts",
        title: "Understanding the person behind the plan.",
        body:
          "Self-assessment helps identify strengths, interests, values, skills, resources, and areas for improvement. The process makes space for reflection on competence, efficiency, goals, and the kind of contribution someone wants to make.",
      },
      {
        kicker: "The programme components",
        title: "A clearer route from reflection to action.",
        items: [
          "Self-assessment: identify strengths, interests, values, and skills.",
          "Goal alignment: understand how personal tasks relate to organisational objectives.",
          "Dependability and values: reflect on ethical standards, accountability, and reliability.",
          "Learning and career exploration: research institutions, industries, job roles, and self-employment options.",
          "Goal setting: develop SMART goals and a practical career plan.",
          "Networking and job-share opportunities: connect with mentors, employers, and the wider labour market.",
        ],
      },
      {
        kicker: "What participants can build",
        title: "Confidence for the next step.",
        items: [
          "Clearer learning and career goals.",
          "Improved job-search skills, including CV writing, interviewing, and networking.",
          "Enhanced employability through relevant skills and knowledge.",
          "A network of contacts and mentors to support the career journey.",
          "Greater confidence to navigate learning and career plans.",
        ],
      },
    ],
    cta: "Find your next step with ABI",
  },
  institutional: {
    number: "03",
    eyebrow: "Pillar three / Institutional & Organizational Development",
    title: "Strong people need strong systems.",
    intro:
      "Institutional and organizational development is the third pillar of the Age Bridge Initiative: a commitment to strengthening the capacities and systems that allow institutions to serve people well and sustain development over time.",
    accent: "taupe",
    icon: Building2,
    sections: [
      {
        kicker: "The third pillar",
        title: "Capacity is more than an individual asset.",
        body:
          "The programme outline places institutional and organizational development alongside mentorship and career development. Together, these strands connect individual growth with viable institutions and systems that can respond to people’s needs.",
      },
      {
        kicker: "A systems approach",
        title: "Connect human capital to institutional performance.",
        items: [
          "Consolidate corporate and institutional capacities.",
          "Value human intellectual and technical capital.",
          "Strengthen the link between people’s performance and organisational objectives.",
          "Support institutions to absorb expertise and translate it into tangible results.",
          "Build partnerships across government, the United Nations System, the private sector, academia, civil society, and faith-based organisations.",
        ],
      },
      {
        kicker: "Built for partnership",
        title: "The work starts with the context in front of you.",
        body:
          "ABI’s wider approach is people-centred and partnership-led. If your institution is exploring capacity building, knowledge sharing, or a development challenge, start a conversation and help shape the right next step together.",
      },
    ],
    cta: "Discuss an institutional need",
  },
};

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Age Bridge Initiative`;
  }, [title]);
}

function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={footer ? "footer-brand" : "brand-mark"} aria-label="Age Bridge Initiative home">
      <img src={`${BASE_URL}assets/abi-logo.png`} alt="" />
      <span>
        <strong>AGE BRIDGE</strong>
        <small>INITIATIVE</small>
      </span>
    </Link>
  );
}

function SiteNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? "is-active" : ""}`}
              aria-current={location === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">
          Start a conversation <ArrowRight size={15} strokeWidth={2.2} />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link ${location === item.href ? "is-active" : ""}`}
                aria-current={location === item.href ? "page" : undefined}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-intro">
          <BrandMark footer />
          <p>Empowering human capital and sustaining institutional development.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explore ABI</span>
          <Link href="/pillars/mentorship">Mentorship</Link>
          <Link href="/pillars/career-development">Career development</Link>
          <Link href="/pillars/institutional-development">Institutions</Link>
          <Link href="/contact">Connect</Link>
        </div>
        <div className="footer-note">
          <span className="footer-label">A people-centred approach</span>
          <p>Learning, guidance, and capacity — connected across generations.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Age Bridge Initiative</span>
        <span className="by-liesse">
          <span>by</span>
          <img src={`${BASE_URL}assets/liesse-logo.png`} alt="Liesse LTD" />
          <span>Liesse LTD</span>
        </span>
      </div>
    </footer>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <SiteNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</span>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`arrow-link ${light ? "arrow-link-light" : ""}`}>
      <span>{children}</span>
      <ArrowRight size={17} strokeWidth={2.2} />
    </Link>
  );
}

function Home() {
  usePageTitle("Empowering human capital and sustaining institutional development");

  return (
    <PageShell>
      <section className="hero home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow light>Age Bridge Initiative / Human capital in motion</Eyebrow>
            <h1>Connect experience. <em>Unlock possibility.</em></h1>
            <p className="hero-lede">
              A people-centred initiative connecting generations, strengthening capability, and helping institutions build a more equitable future.
            </p>
            <div className="hero-actions">
              <ArrowLink href="/pillars/mentorship" light>Explore the pillars</ArrowLink>
              <Link href="/contact" className="text-link-light">Talk with ABI <MoveUpRight size={15} /></Link>
            </div>
            <div className="hero-caption">
              <span className="caption-number">01</span>
              <span>Learning, guidance, and institutional capacity — connected across generations.</span>
            </div>
          </div>
          <div className="hero-visual">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={`${BASE_URL}assets/hero-animation-poster.png`}
              aria-hidden="true"
            >
              <source src={`${BASE_URL}assets/hero-animation.mp4`} type="video/mp4" />
            </video>
            <div className="hero-visual-label"><span>ABI / 2026</span><span>Human capital &amp; systems</span></div>
          </div>
        </div>
        <div className="hero-rule" aria-hidden="true"><span></span></div>
      </section>

      <section className="intro-section section-paper">
        <div className="container intro-grid">
          <div className="section-marker">/ <span>Our reason for being</span></div>
          <div className="intro-content">
            <Eyebrow>Why Age Bridge</Eyebrow>
            <h2>Development becomes sustainable when people and institutions can grow together.</h2>
            <p>
              Age Bridge was shaped in response to a persistent gap: people and institutions often have expertise around them, but not always the capacity, connection, or support to turn that expertise into tangible progress.
            </p>
            <p>
              We bring together mentorship, professional orientation, and institutional development to help knowledge move where it is needed — with a focus on women, youth, vulnerable groups, and the systems that serve them.
            </p>
          </div>
          <div className="intro-aside">
            <span className="aside-line"></span>
            <p>“Building and developing sustainable capacities is a long endeavour.”</p>
            <span className="aside-credit">— Carlos Lopes &amp; Thomas Theison</span>
          </div>
        </div>
      </section>

      <section className="pillars-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <Eyebrow>Three connected pathways</Eyebrow>
              <h2>Start where the need is.</h2>
            </div>
            <p>Each pillar is a practical entry point. Together, they form a connected approach to human capital and institutional development.</p>
          </div>
          <div className="pillar-grid">
            {pillarCards.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link key={pillar.href} href={pillar.href} className={`pillar-card pillar-${pillar.accent}`}>
                  <div className="pillar-card-top">
                    <span className="pillar-number">{pillar.number}</span>
                    <Icon size={24} strokeWidth={1.55} />
                  </div>
                  <div>
                    <h3>{pillar.label}</h3>
                    <p>{pillar.summary}</p>
                  </div>
                  <span className="card-arrow"><ArrowDownRight size={19} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="statement-section">
        <div className="container statement-grid">
          <div className="statement-mark">/ /</div>
          <div>
            <Eyebrow light>Our approach</Eyebrow>
            <h2>Bridge the distance between what people know and what they can do.</h2>
          </div>
          <p>ABI draws on tailored expertise from government, the United Nations System, the private sector, academia, civil society, and faith-based organisations.</p>
        </div>
      </section>

      <StoryPreview />

      <section className="home-cta-section section-paper">
        <div className="container home-cta-grid">
          <div>
            <Eyebrow>Find your next step</Eyebrow>
            <h2>Bring your question.<br /><em>Find the bridge.</em></h2>
          </div>
          <div className="home-cta-copy">
            <p>Whether you are a mentor, a mentee, a career seeker, an institution, or a potential partner, there is a place to begin.</p>
            <ArrowLink href="/contact">Connect with ABI</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function PillarPage({ content }: { content: PillarPageContent }) {
  usePageTitle(content.title);
  const Icon = content.icon;

  return (
    <PageShell>
      <section className={`pillar-hero pillar-hero-${content.accent}`}>
        <div className="container pillar-hero-grid">
          <div className="pillar-hero-marker"><span>{content.number}</span><Icon size={30} strokeWidth={1.5} /></div>
          <div className="pillar-hero-copy">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
          </div>
        </div>
        <div className="container pillar-hero-bottom">
          <span>Age Bridge Initiative</span>
          <span>People / Practice / Possibility</span>
        </div>
      </section>

      <section className="pillar-content-section section-paper">
        <div className="container pillar-content-grid">
          <aside className="pillar-sidebar">
            <span className="sidebar-label">On this page</span>
            <div className="sidebar-line"></div>
            {content.sections.map((section) => <span key={section.title}>{section.kicker}</span>)}
            {content.tags && <span>Areas for growth</span>}
          </aside>
          <div className="pillar-sections">
            {content.sections.map((section, index) => (
              <article key={section.title} className="pillar-article">
                <div className="article-index">0{index + 1}</div>
                <div>
                  <Eyebrow>{section.kicker}</Eyebrow>
                  <h2>{section.title}</h2>
                  {section.body && <p className="article-body">{section.body}</p>}
                  {section.items && (
                    <ul className="editorial-list">
                      {section.items.map((item) => <li key={item}><span className="list-dot"></span><span>{item}</span></li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
            {content.tags && (
              <article className="pillar-article tags-article">
                <div className="article-index">04</div>
                <div>
                  <Eyebrow>Areas for growth</Eyebrow>
                  <h2>Questions that open possibility.</h2>
                  <div className="tag-list">
                    {content.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className={`pillar-cta pillar-cta-${content.accent}`}>
        <div className="container pillar-cta-grid">
          <div>
            <Eyebrow light>Take the next step</Eyebrow>
            <h2>{content.cta}</h2>
          </div>
          <ArrowLink href="/contact" light>Start a conversation</ArrowLink>
        </div>
      </section>
    </PageShell>
  );
}

function Contact() {
  usePageTitle("Connect with ABI");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageShell>
      <section className="contact-hero section-paper">
        <div className="container contact-hero-grid">
          <div>
            <Eyebrow>Connect with ABI</Eyebrow>
            <h1>Every bridge<br /><em>starts with a question.</em></h1>
          </div>
          <p>Tell us where you are starting from. We will help you find the right path through mentorship, career development, or institutional support.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-aside">
            <Eyebrow>Choose your entry point</Eyebrow>
            <h2>A clear next step is a form of support.</h2>
            <div className="contact-paths">
              <div><Users size={21} /><span><strong>Mentor or mentee</strong><small>Explore a structured learning relationship.</small></span></div>
              <div><Compass size={21} /><span><strong>Career seeker</strong><small>Find clarity on learning and work options.</small></span></div>
              <div><Handshake size={21} /><span><strong>Institution or partner</strong><small>Discuss capacity, knowledge, and collaboration.</small></span></div>
            </div>
          </div>
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success" role="status">
                <span className="success-icon"><Check size={24} /></span>
                <Eyebrow>Thank you</Eyebrow>
                <h2>Your message is ready for the ABI team.</h2>
                <p>The form interaction is working in Preview. Before launch, connect it to ABI’s inbox so the team can respond to your enquiry.</p>
                <button type="button" className="form-reset" onClick={() => setSubmitted(false)}>Send another note</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-intro"><span>01</span><p>Share a little about what brings you here.</p></div>
                <label htmlFor="contact-name">
                  Your name
                  <input id="contact-name" name="name" type="text" placeholder="Full name" autoComplete="name" required />
                </label>
                <label htmlFor="contact-email">
                  Email address
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                </label>
                <label htmlFor="contact-interest">
                  I’m reaching out as a…
                  <select id="contact-interest" name="interest" defaultValue="" required>
                    <option value="" disabled>Select one</option>
                    <option>Potential mentor</option>
                    <option>Potential mentee</option>
                    <option>Career seeker</option>
                    <option>Institution or organisation</option>
                    <option>Partner or collaborator</option>
                  </select>
                </label>
                <label htmlFor="contact-message">
                  Your message
                  <textarea id="contact-message" name="message" rows={5} placeholder="What would you like to explore?" required></textarea>
                </label>
                <button type="submit" className="submit-button">Send your note <ArrowRight size={17} /></button>
                <p className="form-footnote">Your message will be used only to respond to this enquiry.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function NotFound() {
  usePageTitle("Page not found");
  return (
    <PageShell>
      <section className="not-found section-paper">
        <div className="container">
          <Eyebrow>404 / Not found</Eyebrow>
          <h1>The bridge isn’t here yet.</h1>
          <p>Let’s take you back to the beginning.</p>
          <ArrowLink href="/">Return home</ArrowLink>
        </div>
      </section>
    </PageShell>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pillars/mentorship"><PillarPage content={pillarPages.mentorship} /></Route>
      <Route path="/pillars/career-development"><PillarPage content={pillarPages.career} /></Route>
      <Route path="/pillars/institutional-development"><PillarPage content={pillarPages.institutional} /></Route>
      <Route path="/stories" component={Stories} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router base={ROUTER_BASE}>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
