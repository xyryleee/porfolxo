import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ScrollReveal from '../components/ScrollReveal';
import BorderGlow from '../components/BorderGlow';
import AnimatedList from '../components/AnimatedList';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = { from_name: '', from_email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.from_name.trim()) errors.from_name = 'Please enter your name.';
  if (!values.from_email.trim()) errors.from_email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.from_email.trim())) errors.from_email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const errorSummaryRef = useRef(null);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'idle') { setStatus('idle'); setFeedback(''); }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'loading') return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFeedback('');
    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setFeedback('Email delivery is not configured yet. Please contact me by email instead.');
      return;
    }

    setStatus('loading');
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: values.from_name.trim(),
        from_email: values.from_email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        to_email: 'catorxyrylee@gmail.com',
        reply_to: values.from_email.trim(),
      }, { publicKey });
      setValues(initialValues);
      setErrors({});
      setStatus('success');
      setFeedback('Thanks for reaching out. Your message has been sent successfully.');
    } catch {
      setStatus('error');
      setFeedback('Your message could not be sent. Please try again, or email me directly.');
    }
  }

  const fields = [
    { name: 'from_name', label: 'Full Name', type: 'text', autoComplete: 'name' },
    { name: 'from_email', label: 'Email Address', type: 'email', autoComplete: 'email' },
    { name: 'subject', label: 'Subject', type: 'text' },
  ];

  return <section id="contact" className="section-spacing">
    <div className="max-w-container-max mx-auto px-gutter">
      <ScrollReveal><p className="font-label-caps font-semibold text-primary mb-4">CONTACT</p><h2 className="font-display font-bold text-headline-lg-mobile md:text-display mb-6">Let's build something <span className="text-primary">AMAZING</span> together.</h2><p className="text-body-lg text-on-surface-variant max-w-2xl mb-10">Whether you have a specific project in mind or just want to chat about web development, my inbox is always open.</p></ScrollReveal>
      <div className="grid md:grid-cols-2 gap-6">
        <ScrollReveal><BorderGlow className="content-card-glow contact-card-glow h-full" backgroundColor="#3c096c" borderRadius={12}><div className="bg-surface-container-low p-8 rounded-xl h-full"><h3 className="font-headline-md font-bold mb-4">Send me a message</h3>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {Object.keys(errors).length > 0 && <div ref={errorSummaryRef} className="contact-error-summary" tabIndex={-1} role="alert" aria-labelledby="contact-error-title">
              <h4 id="contact-error-title">Please check these fields</h4>
              <ul>{Object.entries(errors).filter(([, message]) => message).map(([name, message]) => <li key={name}><a href={`#contact-${name}`}>{message}</a></li>)}</ul>
            </div>}
            {fields.map(({ name, label, type, autoComplete }) => <div className="contact-field" key={name}>
              <label htmlFor={`contact-${name}`}>{label}<span aria-hidden="true"> *</span></label>
              <input id={`contact-${name}`} name={name} type={type} autoComplete={autoComplete} value={values[name]} onChange={updateField} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined} required />
              {errors[name] && <p className="contact-error" id={`error-${name}`}>{errors[name]}</p>}
            </div>)}
            <div className="contact-field"><label htmlFor="contact-message">Message<span aria-hidden="true"> *</span></label>
              <textarea id="contact-message" name="message" rows="5" value={values.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'error-message' : undefined} required />
              {errors.message && <p className="contact-error" id="error-message">{errors.message}</p>}
            </div>
            <button className="contact-submit" type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>{status === 'loading' ? <><span className="submit-spinner" aria-hidden="true" />Sending…</> : 'Send Message'}</button>
            <p className={`contact-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>
          </form>
        </div></BorderGlow></ScrollReveal>
        <div className="grid gap-6 content-start">
          <ScrollReveal delay={100}><BorderGlow className="content-card-glow contact-card-glow" backgroundColor="#3c096c" borderRadius={12}><div className="bg-surface-container-low p-8 rounded-xl"><h3 className="font-headline-md font-bold mb-4">Contact Information</h3><a className="block font-semibold text-primary mb-3" href="mailto:catorxyryle@gmail.com">catorxyryle@gmail.com</a><p className="text-on-surface-variant">Olongapo City, Philippines</p></div></BorderGlow></ScrollReveal>
          <ScrollReveal delay={160}><BorderGlow className="content-card-glow contact-card-glow" backgroundColor="#18002f" borderRadius={12}><div className="bg-inverse-surface text-inverse-on-surface p-8 rounded-xl"><h3 className="font-headline-md font-bold mb-1">Social Connect</h3><p className="text-on-surface-variant">Find me across the web.</p><AnimatedList /></div></BorderGlow></ScrollReveal>
        </div>
      </div>
    </div>
  </section>;
}
