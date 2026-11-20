import { useEffect, useRef } from 'react';

const persona = {
  label: 'EVIDENCE-INFORMED PERSONA',
  name: 'Haraya Martinez',
  context: 'A passenger planning a trip across Olongapo who wants to confirm the right service and where to board before setting off.',
  evidence: 'Grounded in the survey: 53% reported difficulty identifying a route or color code, and 47% reported difficulty finding a terminal or boarding point.',
  needs: [
    'Identify the right service from its name and route color',
    'Find the correct boarding point',
    'Understand transfer and fare details before traveling',
  ],
  caveat: 'Haraya is a synthesized persona, not an individual research participant. The name and personal context are illustrative; needs are based on aggregate survey findings.',
};

const journeyStages = [
  { stage: 'Set a destination', action: 'Choose a start and destination.', question: 'Can this trip be planned here?', signal: 'No stage-specific measure reported.', opportunity: 'Make search and map selection clear.' },
  { stage: 'Identify a service', action: 'Choose the jeepney or tricycle service.', question: 'Which route or color should I take?', signal: '53% selected route or color identification as a challenge.', opportunity: 'Pair route colors with readable service names.' },
  { stage: 'Find the boarding point', action: 'Locate where to begin the ride.', question: 'Where do I board?', signal: '47% selected finding a terminal or boarding point.', opportunity: 'Make terminal locations easy to find.' },
  { stage: 'Make a transfer', action: 'Connect legs and compare fare details.', question: 'Where do I change services, and what will it cost?', signal: '47% selected transfer location; 45% selected fare uncertainty.', opportunity: 'Show transfer steps and fare estimates with the trip option.' },
  { stage: 'Follow the trip', action: 'Use guidance while traveling.', question: 'What is my next step?', signal: '38% selected lack of information while traveling.', opportunity: 'Keep the next action visible during navigation.' },
];

const otherChallenges = [
  { value: 47, label: 'Finding where to transfer between services' },
  { value: 45, label: 'Fare uncertainty or overcharging' },
  { value: 47, label: 'Getting on the wrong route or vehicle' },
  { value: 38, label: 'Lack of information while traveling' },
];

const prototypeSteps = [
  { number: '01', title: 'Set the destination', detail: 'Choose a start and destination using search or the map.', step: 1 },
  { number: '02', title: 'Identify the service', detail: 'Pair route colors with readable route names and trip options.', step: 2 },
  { number: '03', title: 'Find the next step', detail: 'Keep boarding, transfer, and fare details with the journey.', step: 3 },
  { number: '04', title: 'Navigate the trip', detail: 'Follow GPS guidance along the selected trip option.', step: 4 },
];

function SectionIntro({ eyebrow, title, children, id }) {
  return (
    <div className="case-study-section-intro">
      <p className="case-study-section-intro__eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function ProtoPersonaCard() {
  return (
    <article className="case-study-persona-card">
      <p className="case-study-card-kicker">{persona.label}</p>
      <div className="case-study-persona-card__identity">
        <span className="case-study-persona-card__avatar" aria-hidden="true">HM</span>
        <h3>{persona.name}</h3>
      </div>
      <p className="case-study-persona-card__context">{persona.context}</p>
      <p className="case-study-persona-card__evidence">{persona.evidence}</p>
      <h4>Needs to</h4>
      <ul>{persona.needs.map((need) => <li key={need}>{need}</li>)}</ul>
      <p className="case-study-persona-card__caveat">{persona.caveat}</p>
    </article>
  );
}

function MapSketch({ step }) {
  return (
    <div className={`case-study-sketch case-study-sketch--${step}`} aria-hidden="true">
      <div className="case-study-sketch__map-grid" />
      <svg viewBox="0 0 320 170" role="presentation">
        <path className="case-study-sketch__road" d="M-10 35 C70 55 70 7 138 27 S228 85 335 40 M-10 125 C70 99 100 155 170 116 S255 90 335 140 M55 -10 C78 50 110 70 90 180 M240 -10 C217 52 247 95 224 180" />
        <path className="case-study-sketch__route" d={step > 1 ? 'M52 127 C86 105 85 55 139 52 S191 108 235 85 S260 48 278 37' : 'M52 127 C86 105 85 55 139 52'} />
        <circle className="case-study-sketch__origin" cx="52" cy="127" r="7" />
        {step > 1 && <circle className="case-study-sketch__stop" cx="139" cy="52" r="5" />}
        {step > 2 && <circle className="case-study-sketch__stop" cx="235" cy="85" r="5" />}
        {step > 1 && <circle className="case-study-sketch__destination" cx="278" cy="37" r="8" />}
      </svg>
      <span className="case-study-sketch__label">{step === 1 ? 'Pick a destination' : step === 2 ? 'Review trip options' : step === 3 ? 'Compare the journey' : 'Follow your trip'}</span>
    </div>
  );
}

function TranspogapoCaseStudy({ project }) {
  return (
    <div className="case-study-story-content case-study-wide-content case-study-ux px-6 pb-12 sm:px-10 md:px-12 md:pb-20 xl:px-16">
      <section className="case-study-ux-section case-study-project-brief" aria-labelledby="transpogapo-brief-title">
        <div className="case-study-project-brief__main">
          <p className="case-study-card-kicker">THE PROJECT</p>
          <h2 id="transpogapo-brief-title">Make local journeys easier to plan and follow.</h2>
          <p>TranspoGAPO is a map-based transport planner for Olongapo. Passengers can explore jeepney routes, tricycle terminals, and landmarks, then plan a trip option and follow it with GPS navigation.</p>
        </div>
        <dl className="case-study-project-brief__facts">
          <div><dt>My role</dt><dd>Requirements Engineering and QA</dd></div>
          <div><dt>Contribution</dt><dd>Defined system requirements and led quality assurance.</dd></div>
          <div><dt>Technology</dt><dd>{project.technologies?.join(' · ')}</dd></div>
        </dl>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-research-title">
        <SectionIntro id="transpogapo-research-title" eyebrow="01 / THE COMMUTER PROBLEM" title="Two commuting problems shaped TranspoGAPO.">The pre-survey showed where passengers struggled. TranspoGAPO brings route information and terminal locations into one map-based planner.</SectionIntro>
        <article className="case-study-confusion-highlight" aria-label="62 percent of pre-survey respondents experienced route-related confusion or delays at least sometimes">
          <strong>62%</strong>
          <div>
            <h3>Experienced route-related confusion or delays at least sometimes</h3>
            <p>62 of 100 pre-survey respondents selected sometimes, often, or very often.</p>
          </div>
        </article>
        <div className="case-study-problem-anchor-grid">
          <article className="case-study-problem-anchor">
            <p className="case-study-card-kicker">PROBLEM 01 · ROUTE IDENTIFICATION</p>
            <strong>53%</strong>
            <h3>Had difficulty identifying the right route or color code</h3>
            <p>TranspoGAPO maps local PUV routes so passengers can check the service before boarding.</p>
          </article>
          <article className="case-study-problem-anchor">
            <p className="case-study-card-kicker">PROBLEM 02 · FINDING WHERE TO BOARD</p>
            <strong>47%</strong>
            <h3>Had difficulty finding the correct terminal or boarding point</h3>
            <p>The terminal locator puts PUV terminal locations on the map alongside route information.</p>
          </article>
        </div>
        <p className="case-study-assumption-note">Source: TranspoGAPO research manuscript, Chapters 2–3. Percentages are reported survey findings; multiple challenges could be selected. The survey does not prove the app resolved them.</p>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-other-challenges-title">
        <SectionIntro id="transpogapo-other-challenges-title" eyebrow="02 / OTHER REPORTED CHALLENGES" title="The journey also gets difficult after route choice.">Other challenges selected in the pre-survey. Respondents could select more than one.</SectionIntro>
        <figure className="case-study-problem-chart" aria-label="Other reported public transport challenges">
          {otherChallenges.map((item) => (
            <div className="case-study-problem-chart__row" key={item.label}>
              <div className="case-study-problem-chart__label"><span>{item.label}</span><strong>{item.value}%</strong></div>
              <div className="case-study-problem-chart__track" aria-hidden="true"><span style={{ width: `${item.value}%` }} /></div>
            </div>
          ))}
          <figcaption>Share selecting each challenge · pre-survey · multiple selections allowed</figcaption>
        </figure>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-persona-title">
        <SectionIntro id="transpogapo-persona-title" eyebrow="03 / USER PERSONA" title="Meet Haraya Martinez.">A synthesized persona informed by the route-identification and boarding challenges in the survey.</SectionIntro>
        <div className="case-study-persona-grid"><ProtoPersonaCard /></div>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-journey-title">
        <SectionIntro id="transpogapo-journey-title" eyebrow="04 / PASSENGER JOURNEY" title="The design opportunity continues after route choice.">An illustrative task flow annotated with survey findings. The study did not observe passengers completing this journey.</SectionIntro>
        <div className="case-study-journey-scroll" role="region" aria-label="Illustrative passenger journey map with survey findings" tabIndex="0">
          <table className="case-study-journey-table">
            <thead><tr><th scope="col">Journey</th>{journeyStages.map((item) => <th scope="col" key={item.stage}>{item.stage}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Passenger action</th>{journeyStages.map((item) => <td key={item.stage}>{item.action}</td>)}</tr>
              <tr><th scope="row">Design prompt</th>{journeyStages.map((item) => <td key={item.stage}><em>“{item.question}”</em></td>)}</tr>
              <tr><th scope="row">Survey signal</th>{journeyStages.map((item) => <td key={item.stage}>{item.signal}</td>)}</tr>
              <tr><th scope="row">Design opportunity</th>{journeyStages.map((item) => <td key={item.stage}>{item.opportunity}</td>)}</tr>
            </tbody>
          </table>
        </div>
        <p className="case-study-assumption-note">Journey stages and prompts are illustrative; percentages are reported selections, not stage-by-stage observations.</p>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-design-title">
        <SectionIntro id="transpogapo-design-title" eyebrow="05 / DESIGN RESPONSE" title="Keep route identity and trip guidance connected.">Concept flow showing responses to the reported challenges. These visuals are illustrative, not archived or usability-tested prototypes.</SectionIntro>
        <ol className="case-study-prototype-flow">
          {prototypeSteps.map((item) => (
            <li className="case-study-prototype-card" key={item.number}>
              <div className="case-study-prototype-card__top"><span>{item.number}</span><span>CONCEPT WIREFRAME</span></div>
              <MapSketch step={item.step} />
              <h3>{item.title}</h3><p>{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-evaluation-title">
        <SectionIntro id="transpogapo-evaluation-title" eyebrow="06 / SYSTEM EVALUATION" title="Evaluators rated the information positively.">Post-use perception scores from 21 evaluators on a five-point agreement scale. The results describe this sample, not all passengers.</SectionIntro>
        <div className="case-study-score-grid">
          <article className="case-study-score-card case-study-score-card--overall"><span>OVERALL MEAN</span><strong>4.61<small>/ 5</small></strong><p>Strongly Agree · 21 evaluators</p></article>
          <article className="case-study-score-card"><span>USEFULNESS</span><strong>4.62</strong><p>Perceived usefulness</p></article>
          <article className="case-study-score-card"><span>EASE OF USE</span><strong>4.51</strong><p>Perceived ease of use</p></article>
          <article className="case-study-score-card"><span>INFORMATION</span><strong>4.71</strong><p>Perceived completeness</p></article>
        </div>
        <div className="case-study-results-detail">
          <div><h3>What scored well</h3><p>Route colors helped identify vehicles (4.86/5). Entering an origin and destination scored 4.76/5.</p></div>
          <div><h3>Where to improve</h3><p>Layout clarity was the lowest ease-of-use item (4.33/5). Destination coverage and transfer information both scored 4.57/5.</p></div>
        </div>
        <p className="case-study-assumption-note">The evaluation group was mostly local (19 of 21 lived in Olongapo); 15 of 21 were age 20. Results have limited generalizability.</p>
      </section>

      <section className="case-study-ux-section" aria-labelledby="transpogapo-feedback-title">
        <SectionIntro id="transpogapo-feedback-title" eyebrow="07 / RESPONDENT FEEDBACK" title="Keep what works. Refine the rough edges.">Feedback points to practical next steps without overstating the study’s small sample.</SectionIntro>
        <div className="case-study-feedback-grid">
          <article><span className="case-study-card-kicker">RETAIN</span><p>The interactive map and easy-to-use interface were each selected by 15 of 21 evaluators as features they liked.</p></article>
          <article><span className="case-study-card-kicker">REFINE</span><p>Two evaluators mentioned slow mobile loading and two mentioned system errors. Individual comments also mentioned route colors, first-use guidance, and map controls.</p></article>
        </div>
      </section>

      <section className="case-study-ux-section case-study-validation" aria-labelledby="transpogapo-next-title">
        <SectionIntro id="transpogapo-next-title" eyebrow="08 / NEXT STEPS" title="Turn findings into focused improvements.">Recommendations from the study, not claims about changes already shipped.</SectionIntro>
        <ol className="case-study-next-steps">
          <li><strong>Clarify route identity.</strong> Pair route names with color so identification does not depend on color alone.</li>
          <li><strong>Guide first-time use.</strong> Add a brief tutorial and make map controls and transfer instructions easier to find.</li>
          <li><strong>Check mobile performance.</strong> Test loading, map display, and route computation separately across devices and network conditions.</li>
          <li><strong>Verify trip data.</strong> Expand destination coverage and transfer details alongside a process for checking and maintaining the data.</li>
        </ol>
        <p className="case-study-closing-note">My role focused on requirements engineering and QA. The study gives the next iteration a clearer focus: make local route information easier to identify, follow, and verify.</p>
      </section>
    </div>
  );
}

export default function ProjectCaseStudyModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="case-study-live-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="case-study-live-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title" data-lenis-prevent>
        <header className="case-study-live-modal__header">
          <button ref={closeRef} type="button" aria-label="Back" onClick={onClose} className="modal-back-button"><span aria-hidden="true">‹</span><span>Back</span></button>
          <span>FEATURED CASE STUDY</span>
        </header>
        <div className="case-study-live-modal__body">
          <article>
            <header className="case-study-hero">
              <img className="case-study-hero__image" src={project.image} alt={`${project.name} map interface`} />
              <div className="case-study-hero__content">
                <p className="case-study-hero__eyebrow">CASE STUDY <span aria-hidden="true">·</span> {project.type}</p>
                <h1 id="case-study-title" className="case-study-hero__title">{project.name}</h1>
                <p className="case-study-hero__summary">{project.summary}</p>
                {project.role && <p className="case-study-hero__role">{project.role}</p>}
                {project.technologies?.length > 0 && <ul className="case-study-hero__technologies" aria-label="Technologies used">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
              </div>
            </header>
            <TranspogapoCaseStudy project={project} />
          </article>
        </div>
      </div>
    </div>
  );
}
