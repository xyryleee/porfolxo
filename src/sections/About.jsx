import React from "react";
import ScrollReveal from "../components/ScrollReveal";
import TechnologyMarquee from "../components/TechnologyMarquee";
import StrokeText from "../components/StrokeText";
import BorderGlow from "../components/BorderGlow";
import LiquidEther from "../components/LiquidEther";
import AccordionGallery from "../components/AccordionGallery";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const experienceGallery = [
  { image: asset('a-plus-robotics-workshop.png'), label: 'Learning robotics hands-on', alt: 'Working with laptops during a robotics workshop' },
  { image: asset('a-plus-team.png'), label: 'The A+ team', alt: 'Group photo with fellow A+ students' },
  { image: asset('a-plus-practicum-presentation.png'), label: 'Sharing practicum progress', alt: 'Presenting weekly practicum work at A+ Solutions' },
  { image: asset('a-plus-team-recognition.png'), label: 'Celebrating the team', alt: 'A+ team celebrating their certificates' },
  { image: asset('robotics-project-prototype.png'), label: 'Robotics project prototype', alt: 'Robotics prototype displayed on a project board' },
];
const jobs = [
  {
    date: "June 2026 – July 2026",
    role: "Intern",
    company: "A+ Solutions Development Center",
    summary:
      "I joined A+ Solutions Development Center for a five-week robotics practicum, contributing to educational technology projects from hands-on testing through competition preparation.",
    byline: "Xyryle · Computer Science student",
    responsibilities: [
      "Audited Arduino inventory and verified electronic parts for robotics projects.",
      "Tested Salinlahi, researched educational content, and helped improve the site with features such as text-to-speech.",
      "Helped prepare Salinlahi for the Philippine Robotics Olympiad, where the team earned third place.",
    ],
    duration: "5 weeks",
    type: "Internship",
    mode: "Onsite",
    status: "Completed",
    location: "Olongapo City",
    video: "https://www.youtube.com/embed/1EI0jInIvC4",
    storySections: [
      {
        eyebrow: "01 · THE START",
        title: "A practicum grounded in curiosity",
        body: "I came to A+ with prior volunteer experience and a strong interest in robotics. My first tasks were practical: auditing Arduino inventory and checking electronic parts so the team could rely on what was ready to use.",
      },
      {
        eyebrow: "02 · SALINLAHI",
        title: "Helping an educational project hold up",
        body: "I joined the Salinlahi project, an interactive way to share stories about Olongapo City and its Aeta community through robotics. I tested the website, tracked bugs, researched content, and worked on improvements including text-to-speech.",
      },
      {
        eyebrow: "03 · THE CHALLENGE",
        title: "Getting the project ready to present",
        body: "A Firebase database limit threatened the site’s readiness. I helped work through the constraint so Salinlahi could remain available for its presentation at the Philippine Robotics Olympiad.",
      },
      {
        eyebrow: "04 · THE RESULT",
        title: "A team effort on a national stage",
        body: "The team presented Salinlahi at the Philippine Robotics Olympiad and earned third place. I’m proud to have supported that result through testing and practical improvements, alongside the wider team’s work.",
      },
      {
        eyebrow: "05 · WHAT CAME NEXT",
        title: "From quality checks to game design",
        body: "After the Olympiad, I shifted into creative work for Roborhythm, a regional youth robotics competition. I helped shape game boards with 3D mock-ups and draft rules, then took on video-template and multimedia tasks.",
      },
      {
        eyebrow: "06 · REFLECTION",
        title: "Learning to adapt and work together",
        body: "Balancing practicum work with student leadership tested my time management and resilience. The experience showed me how much useful technology work depends on collaboration, steady follow-through, and being willing to move between technical and creative roles.",
      },
    ],
  },
  {
    date: "October 2025 – Present",
    role: "Freelance Video Editor",
    company: "Remote",
    summary:
      "Editing long-form documentary-style videos, focused on narrative flow, pacing, and audience retention.",
    responsibilities: [
      "Applied storytelling techniques through visuals, sound design, and structured sequencing.",
      "Delivered polished, high-quality edits while maintaining consistency in tone, style, and production value.",
    ],
    duration: "9+ months",
    type: "Freelance",
    mode: "Remote",
    status: "Ongoing",
    location: "Remote",
  },
  {
    date: "April 2024 – May 2024",
    role: "Internet Laboratory Custodian Intern",
    company: "Columban College, Inc. — Onsite",
    summary:
      "Maintaining the internet laboratory and its network infrastructure at Columban College, Inc.",
    responsibilities: [
      "Kept the laboratory organized and clean, supporting students and staff in a conducive environment.",
      "Installed, connected, and maintained internet networks for reliable connectivity and smooth operations.",
    ],
    duration: "2 months",
    type: "Internship",
    mode: "Onsite",
    status: "Completed",
    location: "Columban College, Inc.",
  },
];



const certs = [
  [
    "HTML Essentials",
    "Cisco Networking Academy - DICT",
    "Apr 2026",
    "https://drive.google.com/file/d/1onrliUxp1g3xK5T2-0tOobrzm0L7cyah/view?usp=drive_link",
  ],
  [
    "CSS Essentials",
    "Cisco Networking Academy - DICT",
    "Apr 2026",
    "https://drive.google.com/file/d/15VE2qw6p4GU2C6iLmo18kaO5QVua1lrO/view?usp=drive_link",
  ],
  [
    "Python Essentials 1",
    "Cisco Networking Academy - DICT",
    "Apr 2026",
    "https://drive.google.com/file/d/1xQJR6Z8cIp8xGxNuWjEpAeEAYLzIgySy/view?usp=drive_link",
  ],
  [
    "Python Essentials 2",
    "Cisco Networking Academy - DICT",
    "Apr 2026",
    "https://drive.google.com/file/d/1ehUxUiXe2DogZtw82smRhVDltKJmrkbX/view?usp=drive_link",
  ],
  [
    "NC III - Visual Graphic Design",
    "TESDA",
    "Nov 2025",
    "https://www.linkedin.com/feed/update/urn:li:activity:7400086361342418944/",
  ],
];

function ExperienceModal({ job, onClose }) {
  React.useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [onClose]);
  return <div data-lenis-prevent className="experience-modal fixed inset-0 z-[100] overflow-hidden bg-inverse-surface/60 backdrop-blur-md" onClick={(event) => event.target === event.currentTarget && onClose()}>
    <div role="dialog" aria-modal="true" aria-labelledby="experience-modal-title" className="experience-modal-panel relative flex h-screen h-dvh w-full flex-col overflow-hidden bg-surface shadow-2xl">
      <div className="experience-modal__header sticky top-0 z-[120] flex h-16 shrink-0 items-center border-b border-outline-variant/30 bg-surface/95 px-5 backdrop-blur-xl sm:px-8"><button type="button" aria-label="Back" onClick={onClose} className="modal-back-button"><span aria-hidden="true">‹</span><span>Back</span></button><span className="ml-auto font-label-caps text-xs font-semibold tracking-[0.16em] text-primary">EXPERIENCE</span></div>
      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

      <header className="case-study-hero experience-modal-hero">
        <LiquidEther className="experience-modal-hero__ether" colors={["#240046", "#7b2cbf", "#ffc300"]} resolution={0.42} mouseForce={16} cursorSize={120} persistence={0.78} autoDemo autoSpeed={0.3} autoIntensity={0.85} maxDevicePixelRatio={1.5} />
        <div className="case-study-hero__content experience-modal-hero__content">
          <p className="case-study-hero__eyebrow">EXPERIENCE <span aria-hidden="true">·</span> {job.date}</p>
          <h1 id="experience-modal-title" className="case-study-hero__title">{job.role}</h1>
          <p className="case-study-hero__summary">{job.summary}</p>
          <p className="case-study-hero__role">{job.company}</p>
          <ul className="case-study-hero__technologies" aria-label="Role details">
            {[job.type, job.mode, job.status, job.duration].map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      </header>

      <section aria-label="Experience details" className="border-y border-separator bg-surface-secondary px-6 py-6 sm:px-10 md:px-14">
        <dl className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {[[job.duration, "MONTHS"], [job.type, "TYPE"], [job.mode, "MODE"], [job.status, "STATUS"]].map(([value, label]) => (
            <div key={label}><dt className="mb-2 font-label-caps text-xs text-primary">{label}</dt><dd className="font-display font-bold text-headline-md text-on-background">{value}</dd></div>
          ))}
        </dl>
      </section>

      <div className="experience-story-layout px-6 py-8 sm:px-10 md:px-14 md:py-12">
        <div className="experience-story">
          {job.storySections?.length > 0 && <div className="experience-story-chapters">
            {job.storySections.map((section) => <section className="experience-story-chapter" key={section.eyebrow}>
              <p className="mb-3 font-label-caps text-xs font-semibold tracking-[0.16em] text-primary">{section.eyebrow}</p>
              <h2 className="mb-3 font-display text-headline-lg font-bold text-on-background">{section.title}</h2>
              <p className="max-w-3xl leading-relaxed text-on-surface-variant">{section.body}</p>
            </section>)}
          </div>}
          {job.video && <section className="experience-story-video">
            <p className="mb-3 font-label-caps text-primary">VIDEO</p>
            <h2 className="mb-5 font-display font-bold text-headline-lg text-on-background">Internship video</h2>
            <iframe className="block aspect-video w-full rounded-2xl border border-outline-variant/40 bg-inverse-surface" src={job.video} title={`${job.role} video`} loading="lazy" allowFullScreen />
          </section>}
          <section className="experience-story-video">
            <p className="mb-3 font-label-caps text-primary">CONTRIBUTIONS</p>
            <h2 className="mb-5 font-display font-bold text-headline-lg text-on-background">Responsibilities</h2>
            <ul className="space-y-4 text-body-lg text-on-surface-variant">
              {job.responsibilities.map((item) => <li key={item} className="flex items-start gap-4"><span className="text-primary" aria-hidden="true">✓</span><span>{item}</span></li>)}
            </ul>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 md:sticky md:top-20 md:p-8">
          <p className="mb-3 font-label-caps text-primary">ROLE DETAILS</p>
          <h2 className="mb-5 font-display font-bold text-headline-md text-on-background">{job.role}</h2>
          <dl className="space-y-4 text-on-surface-variant">
            <div><dt className="font-label-caps text-xs text-primary">Dates</dt><dd className="mt-1">{job.date}</dd></div>
            <div><dt className="font-label-caps text-xs text-primary">Location</dt><dd className="mt-1">{job.location}</dd></div>
          </dl>
        </aside>
      </div>

      {job.company === "A+ Solutions Development Center" && <section className="experience-modal-gallery" aria-labelledby="experience-gallery-title">
        <div className="experience-modal-gallery__inner">
          <div className="life-gallery-heading"><span className="life-gallery-kicker">A LITTLE BEYOND THE ROLE</span><h2 id="experience-gallery-title">Life in motion<span>.</span></h2><p>Small moments, side quests, and things I love making.</p></div>
          <BorderGlow className="life-gallery-glow" backgroundColor="#18002f" borderRadius={18} glowRadius={30}>
            <AccordionGallery items={experienceGallery} defaultIndex={2} height={420} gap={12} radius={18} expandRatio={0.48} accentColor="var(--color-primary)" overlayColor="#18002f" textColor="var(--color-on-background)" className="experience-modal-accordion" ariaLabel="Portfolio highlights gallery" />
          </BorderGlow>
          <span className="life-gallery-hint">HOVER OR TAP TO EXPLORE</span>
        </div>
      </section>}
      </div>
    </div>
  </div>;
}


export default function About() {
  const [selectedJob, setSelectedJob] = React.useState(null);
  return (
    <>
      <section id="about" className="section-spacing bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal>
            <div className="mb-12">
              <span className="font-label-caps font-semibold text-primary">EDUCATION</span>
              <h2 className="font-display font-bold text-headline-lg mt-2">
                Academic Excellence
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              [
                "Gordon College",
                "BS - Computer Science (Aug 2024 - Present)",
                "Building a foundation in software engineering while applying it across mapping, blockchain, and AR projects outside the classroom.",
              ],
              [
                "Columban College, Inc.",
                "Senior HS - TVL-ICT (Aug 2022 - Jun 2024)",
                "Finished with High Honors as Class Valedictorian, graduating at the top of the TVL-ICT track.",
              ],
            ].map(([school, degree, desc]) => (
              <ScrollReveal key={school}>
                <BorderGlow className="content-card-glow" backgroundColor="#32105a" borderRadius={12}>
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="font-headline-md font-bold mb-1">{school}</h3>
                  <p className="font-label-code font-medium text-primary mb-3">{degree}</p>
                  <p className="text-on-surface-variant">{desc}</p>
                </div>
                </BorderGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <TechnologyMarquee />
      <section id="internships" className="section-spacing">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-label-caps font-semibold text-primary">EXPERIENCE</span>
              <h2 className="font-display font-bold text-headline-lg mt-2">
                Employment History
              </h2>
              <p className="text-on-surface-variant font-medium mt-3">
                Click a role below to open the full journey.
              </p>
            </div>
          </ScrollReveal>
          <div className="experience-timeline max-w-4xl mx-auto">
            {jobs.map((job) => (
              <ScrollReveal key={job.role} className="experience-timeline__item">
                <BorderGlow className="content-card-glow experience-card-glow" backgroundColor="#32105a" borderRadius={12}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setSelectedJob(job)}
                  className="experience-card w-full bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer text-left"
                >
                  <span className="font-label-code font-medium text-primary mb-2 block">
                    {job.date}
                  </span>
                  <h3 className="font-headline-md font-bold">{job.role}</h3>
                  <p className="font-bold text-on-surface-variant mb-4">
                    {job.company}
                  </p>
                  <ul className="space-y-2 text-on-surface-variant">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
                </BorderGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-spacing bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal>
            <h2 className="font-display font-bold text-headline-lg text-white mb-2">
              Certifications
            </h2>
            <p className="text-primary-fixed-dim text-body-lg max-w-lg mb-12">
              Credentials from the most trusted institutions.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {certs.map(([name, issuer, date, href]) => (
              <BorderGlow key={name} className="content-card-glow certification-card-glow" backgroundColor="#240046" borderRadius={12}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 p-6 rounded-xl text-center group hover:bg-primary-container/20 transition-all"
              >
                <div className="mb-4 text-primary-fixed-dim text-4xl">◆</div>
                <p className="font-label-caps font-semibold text-white mb-1">{name}</p>
                <p className="text-surface-variant text-xs">{issuer}</p>
                <p className="text-surface-variant text-xs opacity-70 mt-1">
                  {date}
                </p>
              </a>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>
      {selectedJob && (
        <ExperienceModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
