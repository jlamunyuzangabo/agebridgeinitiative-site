import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Filter } from "lucide-react";
import { Link } from "wouter";

export type StoryPillar = "All" | "Mentorship" | "Career development" | "Institutions";

type Story = {
  id: string;
  pillar: Exclude<StoryPillar, "All">;
  accent: "orange" | "brown" | "taupe";
  marker: string;
  kind: string;
  title: string;
  excerpt: string;
  detail: string;
  lens: string;
};

const stories: Story[] = [
  {
    id: "trust-first",
    pillar: "Mentorship",
    accent: "orange",
    marker: "01",
    kind: "Programme note",
    title: "Making space for trust before the work begins",
    excerpt: "A purposeful mentoring relationship starts with listening, expectation-setting, and a shared sense of direction.",
    detail: "The programme outline begins with ice breaking: mentors and mentees introduce themselves, discuss expectations, and establish trust before identifying learning, personal development, or career objectives.",
    lens: "Mentoring relationships",
  },
  {
    id: "practical-output",
    pillar: "Mentorship",
    accent: "orange",
    marker: "02",
    kind: "Impact lens",
    title: "When learning becomes something you can use",
    excerpt: "Project-based learning turns guidance into a business proposal, article, research paper, portfolio, or other tangible output.",
    detail: "ABI’s approach asks mentor and mentee to prioritise a skill, define objectives, and translate learning into a practical result. Progress is supported through feedback, coaching, and celebration.",
    lens: "Knowledge transfer",
  },
  {
    id: "clearer-start",
    pillar: "Career development",
    accent: "brown",
    marker: "03",
    kind: "Programme note",
    title: "A clearer starting point for the next career step",
    excerpt: "Self-assessment helps people name their strengths, interests, values, skills, and areas where growth is needed.",
    detail: "The career development pillar uses reflection as a practical starting point. From there, participants can explore learning options, industries, job roles, and self-employment pathways with greater clarity.",
    lens: "Self-assessment",
  },
  {
    id: "job-share",
    pillar: "Career development",
    accent: "brown",
    marker: "04",
    kind: "Community format",
    title: "Opening a door to the labour market",
    excerpt: "Job-share fairs, mentorship cafés, dialogues, and exhibitions can connect youth and job seekers with employers and opportunity.",
    detail: "The source outline describes job-share mechanisms as a way to expose mentees and youth job seekers to the labour market through connections with employers. This story slot is ready for a verified event recap when one is available.",
    lens: "Networking and opportunity",
  },
  {
    id: "capacity-systems",
    pillar: "Institutions",
    accent: "taupe",
    marker: "05",
    kind: "Impact lens",
    title: "Where individual capability becomes institutional capacity",
    excerpt: "People’s knowledge has more reach when organisations have the systems and support to absorb it.",
    detail: "The programme outline connects human capital with institutional development: consolidating capacities, valuing intellectual and technical capital, and supporting viable institutions that can respond to people’s needs.",
    lens: "Organisational development",
  },
  {
    id: "partnership-practice",
    pillar: "Institutions",
    accent: "taupe",
    marker: "06",
    kind: "Story template",
    title: "Partnership as a practice, not a footnote",
    excerpt: "Government, the United Nations System, private sector, academia, civil society, and faith-based organisations each bring a different kind of expertise.",
    detail: "ABI’s partnership-led approach creates a place for tailored expertise to move across sectors and generations. This card is designed to become a field story as collaborations and community events are documented.",
    lens: "Cross-sector collaboration",
  },
];

const storyFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfWGnV3nCpFVGK-WjY-o9rnzXrn8V_rVSDarZbAsr0hxS0c7g/viewform";
const filterOptions: StoryPillar[] = ["All", "Mentorship", "Career development", "Institutions"];

function useStoriesTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Age Bridge Initiative`;
  }, [title]);
}

function StoryCard({ story, expanded, onToggle }: { story: Story; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`story-card story-card-${story.accent} ${expanded ? "is-expanded" : ""}`}>
      <button className="story-card-trigger" type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={`story-${story.id}`}>
        <div className="story-card-meta"><span>{story.marker}</span><span>{story.kind}</span></div>
        <div>
          <span className="story-pillar">{story.pillar}</span>
          <h3>{story.title}</h3>
          <p>{story.excerpt}</p>
        </div>
        <span className="story-toggle" aria-hidden="true"><ChevronDown size={18} /></span>
      </button>
      {expanded && (
        <div id={`story-${story.id}`} className="story-card-detail">
          <p>{story.detail}</p>
          <span className="story-lens">Lens / {story.lens}</span>
        </div>
      )}
    </article>
  );
}

export function StoryPreview() {
  return (
    <section className="stories-preview-section section-paper">
      <div className="container stories-preview-grid">
        <div className="stories-preview-intro">
          <span className="eyebrow">News &amp; stories</span>
          <h2>Keep an eye on the bridge.</h2>
          <p>Community events, programme notes, and impact stories will live here as ABI’s work grows.</p>
          <Link href="/stories" className="arrow-link"><span>Explore stories</span><ArrowRight size={17} /></Link>
        </div>
        <div className="stories-preview-list">
          {stories.slice(0, 3).map((story) => (
            <Link key={story.id} href="/stories" className={`story-preview-row story-preview-${story.accent}`}>
              <span>{story.marker}</span>
              <div><small>{story.kind} / {story.pillar}</small><strong>{story.title}</strong></div>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stories() {
  useStoriesTitle("News & Stories");
  const [filter, setFilter] = useState<StoryPillar>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const filteredStories = useMemo(() => filter === "All" ? stories : stories.filter((story) => story.pillar === filter), [filter]);

  function changeFilter(nextFilter: StoryPillar) {
    setFilter(nextFilter);
    setExpandedId(null);
  }

  return (
    <div className="stories-page">
      <section className="stories-hero section-paper">
        <div className="container stories-hero-grid">
          <div>
            <span className="eyebrow">News &amp; stories / ABI in motion</span>
            <h1>What the bridge<br /><em>makes visible.</em></h1>
          </div>
          <p>Follow programme notes, community events, and impact stories across the three ABI pillars.</p>
        </div>
      </section>
      <section className="stories-library">
        <div className="container">
          <div className="stories-library-head">
            <div><span className="eyebrow">The story library</span><h2>Choose a lens.</h2></div>
            <div className="stories-note"><Filter size={16} /><span>These first story angles are grounded in the programme outline. Verified field notes, dates, and participant voices can replace them as ABI’s community work is documented.</span></div>
          </div>
          <div className="story-filters" role="group" aria-label="Filter stories by pillar">
            {filterOptions.map((option) => (
              <button key={option} type="button" className={filter === option ? "is-active" : ""} onClick={() => changeFilter(option)} aria-pressed={filter === option}>{option}</button>
            ))}
          </div>
          <div className="story-grid">
            {filteredStories.map((story) => <StoryCard key={story.id} story={story} expanded={expandedId === story.id} onToggle={() => setExpandedId(expandedId === story.id ? null : story.id)} />)}
          </div>
        </div>
      </section>
      <section className="stories-cta statement-section">
        <div className="container stories-cta-grid">
          <div><span className="eyebrow eyebrow-light">Have a story to share?</span><h2>Bring the field note.<br />We’ll build the bridge.</h2></div>
          <div className="stories-cta-actions">
            <Link href="/contact" className="arrow-link arrow-link-light"><span>Connect with ABI</span><ArrowRight size={17} /></Link>
            <a href={storyFormUrl} className="story-submit-link" target="_blank" rel="noreferrer">Submit a story <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
