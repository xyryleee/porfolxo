import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import BorderGlow from '../components/BorderGlow';
import ProjectCaseStudyModal from '../components/ProjectCaseStudyModal';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const projects = [
  {
    id: 'transpogapo',
    name: 'TranspoGAPO',
    image: asset('transpogapo.png'),
    type: 'Web GIS · Featured software engineering project',
    summary: 'A web-based PUV route mapping and terminal locator system for Olongapo City.',
    role: 'Software Engineer Intern — QA and Requirements Engineering',
    contributions: [
      'Defined system requirements.',
      'Led quality assurance to keep usability and technical delivery aligned.',
    ],
    technologies: ['OSRM', 'Leaflet.js', 'Firebase', 'NoSQL'],
    href: 'https://transpogapo.web.app/',
    caseStudy: true,
  },
  {
    id: 'ka-kalakbay',
    name: 'KA-KALAKBAY',
    image: asset('ka-kalakbay.png'),
    type: 'AR / Immersive Web',
    summary: 'A Web AR tourism platform showcasing landmarks and cultural destinations in Olongapo City.',
    role: 'Frontend Development and QA',
    technologies: ['AR.js', 'Three.js', 'Firebase'],
    href: 'https://ka-kalakbay.web.app/',
  },
  {
    id: 'landr',
    name: 'landr.',
    image: asset('landr.png'),
    type: 'Blockchain',
    summary: 'A blockchain-backed land registry prototype built during a two-day hackathon, with Avalanche and MetaMask smart-contract flows for hash-based land record verification.',
    role: 'Lead Backend Engineer',
    technologies: ['Avalanche', 'Leaflet.js', 'Firebase', 'Vite', 'MetaMask'],
    href: 'https://github.com/xyryleee/LANDR',
    linkLabel: 'View source on GitHub',
  },
  {
    id: 'taskalinga',
    name: 'Taskalinga',
    image: asset('taskalinga.png'),
    type: 'Web · Full-Stack',
    summary: 'A Firebase-powered task and note management app with real-time database functionality, status tracking, and category management.',
    role: 'Backend, Database Administration, and QA',
    technologies: ['Bootstrap', 'Firebase', 'NoSQL'],
    href: 'https://taskalinga.web.app/',
  },
];

function ProjectCard({ project, featured, onOpen }) {
  const opensCaseStudy = project.caseStudy;
  const Action = opensCaseStudy ? 'button' : 'a';
  const actionProps = opensCaseStudy
    ? { type: 'button', onClick: onOpen, 'aria-haspopup': 'dialog' }
    : { href: project.href, target: '_blank', rel: 'noreferrer' };

  return (
    <BorderGlow className={`content-card-glow project-card-glow${featured ? ' project-card-glow--featured' : ''}`} backgroundColor="#32105a" borderRadius={featured ? 16 : 12}>
      <Action
        {...actionProps}
        className={`group block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
        featured
          ? 'grid overflow-hidden rounded-2xl bg-surface-container-lowest transition-shadow hover:shadow-xl md:grid-cols-2'
          : 'h-full rounded-xl bg-surface-container-lowest transition-shadow hover:shadow-xl'
      }`}
      >
      <img
        src={project.image}
        alt={`${project.name} project screenshot`}
        className={featured ? 'h-full min-h-64 w-full object-cover' : 'h-56 w-full object-cover transition-transform group-hover:scale-[1.02]'}
      />
      <span className={`block ${featured ? 'flex flex-col justify-center p-6 md:p-10' : 'p-6'}`}>
        <span className="mb-3 block font-label-caps text-primary">{project.type}</span>
        <span role="heading" aria-level="3" className={`mb-3 block font-display font-bold text-headline-md group-hover:text-primary ${featured ? '' : ''}`}>
          {project.name}
        </span>
        <span className={`block text-on-surface-variant ${featured ? 'mb-6' : ''}`}>
          {project.summary}
        </span>
        <span className="mt-5 block font-bold text-primary">
          {opensCaseStudy ? 'View project case study' : project.linkLabel || `Visit ${project.name}`}{' '}
          <span aria-hidden="true">{opensCaseStudy ? '→' : '↗'}</span>
        </span>
      </span>
      </Action>
    </BorderGlow>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <>
      <section id="projects" className="section-spacing">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal>
            <SectionHeading
              eyebrow="SELECTED WORK"
              title={<>My <span className="text-primary">Projects</span></>}
            >
              A selection of projects shaped by curiosity, collaboration, and a love for useful interfaces.
            </SectionHeading>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCard
              project={projects[0]}
              featured
              onOpen={() => setSelectedProject(projects[0])}
            />
          </ScrollReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.slice(1).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 80}>
                <ProjectCard
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
