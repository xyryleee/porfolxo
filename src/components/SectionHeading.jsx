export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-10">
      <p className="font-label-caps font-semibold text-primary mb-4">{eyebrow}</p>
      <h2 className="font-display font-bold text-headline-lg-mobile md:text-display mb-5">{title}</h2>
      {children && <p className="font-body-lg text-on-surface-variant max-w-2xl">{children}</p>}
    </div>
  );
}
