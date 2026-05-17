import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Calculator, FileText, Building2, Receipt, ShieldCheck, TrendingUp,
  Phone, MessageCircle, MapPin, Mail, ChevronDown, Check, ArrowRight,
  Award, Users, Clock, Briefcase, Scale, BookOpen, Sparkles
} from "lucide-react";

/* ----------------------- Helpers ----------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);

  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}

/* ----------------------- Nav ----------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Services", "Why Us", "Team", "Process", "FAQ", "Contact"];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-1">
          <span className="font-serif text-2xl font-bold text-navy-deep">RJ Gala</span>
          <span className="font-serif text-2xl text-gold italic">&</span>
          <span className="font-serif text-2xl font-bold text-navy-deep">Associates</span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
               className="text-sm font-medium text-navy-deep/75 hover:text-gold transition-colors relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="https://wa.me/919022573304"
           className="hidden md:inline-flex items-center gap-2 bg-navy-deep text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium cta-glow pulse-border">
          <MessageCircle className="w-4 h-4" /> Book Consultation
        </a>
      </div>
    </motion.header>
  );
}

/* ----------------------- Hero ----------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-cream">
      {/* Parallax background ornaments */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--navy) 12%, transparent), transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center w-full">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-sm text-navy-deep mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Chartered Accountants · Mumbai
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-navy-deep animate-blur-in">
            Precision in numbers.{" "}
            <span className="italic text-gold">Confidence</span>{" "}
            in every decision.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            R J Gala & Associates is a Mumbai-based Chartered Accountancy firm partnering with founders,
            families, and businesses to navigate taxation, audit, and compliance — with clarity that goes
            beyond the balance sheet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="https://wa.me/919022573304"
               className="inline-flex items-center gap-2 bg-navy-deep text-primary-foreground px-7 py-4 rounded-full font-medium cta-glow pulse-border">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <a href="#services"
               className="inline-flex items-center gap-2 border border-navy-deep/20 text-navy-deep px-7 py-4 rounded-full font-medium hover:border-gold hover:text-gold transition-colors">
              Explore Services <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
          >
            {[
              { v: 15, s: "+", l: "Years" },
              { v: 500, s: "+", l: "Clients" },
              { v: 2500, s: "+", l: "Filings" },
            ].map((x) => (
              <div key={x.l}>
                <div className="font-serif text-3xl text-navy-deep font-semibold">
                  <Counter to={x.v} suffix={x.s} />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{x.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden gradient-navy shadow-elegant">
            <div className="absolute inset-0 opacity-30"
                 style={{ background: "radial-gradient(circle at 30% 20%, var(--gold) 0%, transparent 50%)" }} />
            <div className="absolute inset-0 p-10 flex flex-col justify-between text-primary-foreground">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Established 2009</div>
                <div className="mt-6 font-serif text-4xl leading-tight">
                  Trusted advisors to Mumbai's most ambitious businesses.
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {["ICAI Registered", "GST Certified", "FEMA & RBI Compliance", "Statutory Audit"].map((t, i) => (
                  <motion.div key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-4 h-4 text-gold" /> {t}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-5 shadow-elegant max-w-[220px]">
            <div className="flex items-center gap-2 text-gold mb-1">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <div className="text-sm text-navy-deep font-medium">"Sharp, responsive, deeply ethical."</div>
            <div className="text-xs text-muted-foreground mt-1">— Director, Tech Pvt Ltd</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------- Marquee ----------------------- */

function MarqueeStrip() {
  const items = [
    "Income Tax Filing", "GST Returns", "Statutory Audit", "Company Incorporation",
    "TDS Compliance", "ROC Filings", "FEMA Advisory", "Internal Audit",
    "Transfer Pricing", "NRI Taxation", "Startup Advisory", "Trust & NGO Compliance",
  ];
  return (
    <div className="bg-navy-deep text-primary-foreground py-5 border-y border-gold/20">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="marquee__track" aria-hidden={k === 1}>
            {items.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm font-medium whitespace-nowrap">
                <span className="text-gold">◆</span> {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Services ----------------------- */

const services = [
  { icon: Receipt, title: "Direct & Indirect Taxation", desc: "End-to-end Income Tax and GST compliance, planning, and litigation support tailored to your structure." },
  { icon: ShieldCheck, title: "Audit & Assurance", desc: "Statutory, internal, tax, and stock audits delivered with rigor and clarity that satisfies stakeholders." },
  { icon: Building2, title: "Company Incorporation", desc: "Private Limited, LLP, OPC, Section 8 — we handle the formation and post-incorporation compliance." },
  { icon: FileText, title: "GST Advisory & Filings", desc: "Monthly returns, reconciliations, refunds, and representation before the GST department." },
  { icon: Scale, title: "Regulatory Compliance", desc: "ROC, FEMA, RBI, and Labour law filings handled with deadlines you'll never have to track." },
  { icon: TrendingUp, title: "Business Advisory", desc: "Financial structuring, due diligence, and strategic planning for founders and growing businesses." },
];

function Services() {
  return (
    <section id="services" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <Reveal className="lg:col-span-5">
            <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">What We Offer</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep leading-tight">
              A complete suite of <span className="italic">financial expertise</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-muted-foreground text-lg">
              From day-to-day compliance to long-term advisory, our practice is built to serve every stage
              of your financial journey — with precision, transparency, and a partner's mindset.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group bg-background p-10 h-full transition-all duration-500 hover:bg-cream cursor-pointer relative">
                <div className="w-12 h-12 rounded-lg bg-navy-deep/5 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-navy-deep transition-all duration-500">
                  <s.icon className="w-6 h-6 text-navy-deep group-hover:text-navy-deep" />
                </div>
                <h3 className="font-serif text-2xl text-navy-deep mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-navy-deep font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Learn more <ArrowRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Why Us ----------------------- */

const whys = [
  { icon: Award, title: "ICAI Credentials", desc: "A team of qualified Chartered Accountants registered with the Institute of Chartered Accountants of India." },
  { icon: Clock, title: "Deadlines You Never Miss", desc: "Proactive compliance calendar and alerts mean your filings happen on time, every time." },
  { icon: Users, title: "Founder-First Approach", desc: "We work the way modern businesses think — responsive, plain-spoken, and always available." },
  { icon: BookOpen, title: "Deep Domain Knowledge", desc: "From SMEs to family offices, we bring sector-aware insight that goes beyond generic compliance." },
];

function WhyUs() {
  return (
    <section id="why-us" className="py-28 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Why Choose Us</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep leading-tight">
            Built on trust. <span className="italic">Measured</span> in outcomes.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whys.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.18}>
              <div className="bg-background rounded-2xl p-8 h-full border border-border hover:border-gold/40 hover:shadow-elegant transition-all duration-500 group">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <w.icon className="w-5 h-5 text-navy-deep" />
                </div>
                <h3 className="font-serif text-xl text-navy-deep mb-3">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Process ----------------------- */

const steps = [
  { n: "01", t: "Consultation", d: "A no-obligation conversation to understand your business, structure, and immediate needs." },
  { n: "02", t: "Scoping & Proposal", d: "We map out the engagement, deliverables, and transparent fee structure — no surprises." },
  { n: "03", t: "Onboarding", d: "Secure document handoff, account setup, and a dedicated point of contact assigned to you." },
  { n: "04", t: "Ongoing Partnership", d: "Monthly reviews, proactive compliance, and strategic check-ins — we grow with you." },
];

function Process() {
  return (
    <section id="process" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-20">
          <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">How We Work</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep leading-tight">
            A simple, considered <span className="italic">engagement</span>.
          </h2>
        </Reveal>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15}>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-cream border border-gold/40 flex items-center justify-center mb-6 relative z-10">
                  <span className="font-serif text-gold text-xl">{s.n}</span>
                </div>
                <h3 className="font-serif text-2xl text-navy-deep mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Team ----------------------- */

const team = [
  { n: "CA Rajesh J. Gala", r: "Founding Partner", b: "FCA · 20+ years in taxation, audit, and corporate advisory across listed and unlisted entities.", i: "RJG" },
  { n: "CA Associate Partner", r: "Audit & Assurance", b: "Specialist in statutory audits, internal controls, and risk-based audit methodology.", i: "AP" },
  { n: "CA Tax Specialist", r: "Direct Taxation", b: "Expertise in income tax assessments, appeals, and high-net-worth individual advisory.", i: "TS" },
];

function Team() {
  return (
    <section id="team" className="py-28 bg-navy-deep text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
           style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Reveal className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Meet the Firm</div>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
            People who treat your numbers <span className="italic text-gold">like their own</span>.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.12}>
              <div className="group rounded-2xl border border-white/10 p-8 hover:border-gold/40 hover:bg-white/[0.03] transition-all duration-500 h-full">
                <div className="aspect-square rounded-xl mb-6 flex items-center justify-center text-5xl font-serif text-gold relative overflow-hidden"
                     style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 15%, transparent), color-mix(in oklab, var(--navy) 30%, transparent))" }}>
                  <span className="relative z-10">{m.i}</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                       style={{ background: "radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)" }} />
                </div>
                <h3 className="font-serif text-2xl mb-1">{m.n}</h3>
                <div className="text-gold text-sm mb-4">{m.r}</div>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{m.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Testimonials ----------------------- */

const quotes = [
  { q: "RJ Gala & Associates transformed how we approach compliance. Their team is responsive, technically sharp, and genuinely invested in our growth.", n: "Priya Mehta", r: "Founder, Lifestyle Brand" },
  { q: "From GST to statutory audit, every engagement has been handled with precision. They make complex regulation feel manageable.", n: "Anand Shah", r: "Director, Manufacturing Pvt Ltd" },
  { q: "We've worked with several firms over the years. RJ Gala stands apart for clarity, ethics, and partnership. Highly recommend.", n: "Kavita R.", r: "Family Office Principal" },
];

function Testimonials() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Client Voices</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep leading-tight">
            Words from those we <span className="italic">serve</span>.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.12}>
              <figure className="bg-background rounded-2xl p-8 h-full border border-border hover:shadow-elegant transition-all duration-500">
                <div className="text-gold text-3xl font-serif leading-none mb-4">"</div>
                <blockquote className="font-serif text-lg text-navy-deep leading-relaxed mb-6">
                  {t.q}
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <div className="font-medium text-navy-deep">{t.n}</div>
                  <div className="text-sm text-muted-foreground">{t.r}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FAQ ----------------------- */

const faqs = [
  { q: "What services does R J Gala & Associates offer?", a: "We offer end-to-end Chartered Accountancy services including taxation (Income Tax & GST), statutory and internal audit, company incorporation, regulatory compliance (ROC, FEMA, RBI), and business advisory." },
  { q: "Do you work with startups and small businesses?", a: "Absolutely. A significant part of our practice supports founders, startups, and SMEs — from incorporation to scaling. We tailor engagements to your stage and budget." },
  { q: "Are consultations chargeable?", a: "Initial consultations are complimentary. We use this time to understand your needs and recommend the right scope of engagement before any fees are discussed." },
  { q: "Where is your office located?", a: "Our office is in Mumbai. We serve clients across India and abroad through secure digital onboarding and document workflows." },
  { q: "Can you handle NRI taxation and FEMA matters?", a: "Yes. We have dedicated expertise in NRI taxation, DTAA advisory, and FEMA/RBI compliance for cross-border transactions and investments." },
  { q: "How do we get started?", a: "The fastest way is to message us on WhatsApp at 9022573304 or use the consultation form. We'll respond within one business day." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Frequently Asked</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep">
            Answers, before you <span className="italic">ask</span>.
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-colors">
                <button onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex items-center justify-between gap-6 p-6 text-left">
                  <span className="font-serif text-lg text-navy-deep">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Contact ----------------------- */

function Contact() {
  return (
    <section id="contact" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Get in Touch</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep leading-tight mb-6">
              Let's discuss <span className="italic">your numbers</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md">
              Whether you're starting up, scaling, or simply seeking a second opinion — we'd be glad to hear from you.
            </p>

            <div className="space-y-5 mb-10">
              <a href="https://wa.me/919022573304" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <MessageCircle className="w-5 h-5 text-gold group-hover:text-navy-deep" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                  <div className="font-serif text-lg text-navy-deep">+91 90225 73304</div>
                </div>
              </a>
              <a href="tel:+919022573304" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-navy-deep/5 flex items-center justify-center group-hover:bg-navy-deep transition-colors">
                  <Phone className="w-5 h-5 text-navy-deep group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Call</div>
                  <div className="font-serif text-lg text-navy-deep">+91 90225 73304</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-navy-deep/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-navy-deep" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Office</div>
                  <div className="font-serif text-lg text-navy-deep">Mumbai, India</div>
                </div>
              </div>
            </div>

            <a href="https://wa.me/919022573304"
               className="inline-flex items-center gap-2 bg-navy-deep text-primary-foreground px-7 py-4 rounded-full font-medium cta-glow pulse-border">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-elegant aspect-square bg-background">
              <iframe
                title="RJ Gala office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.123!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href="https://maps.app.goo.gl/7gRLSipsPG9TatQT6?g_st=iw" target="_blank" rel="noreferrer"
               className="mt-4 inline-flex items-center gap-2 text-sm text-navy-deep hover:text-gold transition-colors">
              Open in Google Maps <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Footer ----------------------- */

function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground py-14 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-serif text-2xl">RJ Gala <span className="text-gold italic">&</span> Associates</div>
            <p className="text-sm text-primary-foreground/60 mt-3 max-w-xs">
              Chartered Accountants. Mumbai. Trusted financial partners since 2009.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Practice</div>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Taxation & GST</li>
              <li>Audit & Assurance</li>
              <li>Compliance & ROC</li>
              <li>Advisory</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>+91 90225 73304</li>
              <li>Mumbai, India</li>
              <li><a className="hover:text-gold" href="https://wa.me/919022573304">WhatsApp →</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-primary-foreground/50">
          <div>© {new Date().getFullYear()} R J Gala & Associates. All rights reserved.</div>
          <div>Website by <span className="text-gold">Pixorra</span></div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------- Floating + Mobile Bar ----------------------- */

function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/919022573304" target="_blank" rel="noreferrer"
       className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-elegant"
       style={{ background: "#25D366" }}
       aria-label="WhatsApp">
      <MessageCircle className="w-6 h-6" />
      <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: "#25D366" }} />
    </a>
  );
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border grid grid-cols-3">
      <a href="tel:+919022573304" className="flex flex-col items-center py-3 text-xs text-navy-deep">
        <Phone className="w-5 h-5 mb-1" /> Call
      </a>
      <a href="https://wa.me/919022573304" className="flex flex-col items-center py-3 text-xs text-navy-deep border-x border-border">
        <MessageCircle className="w-5 h-5 mb-1 text-gold" /> WhatsApp
      </a>
      <a href="https://maps.app.goo.gl/7gRLSipsPG9TatQT6?g_st=iw" className="flex flex-col items-center py-3 text-xs text-navy-deep">
        <MapPin className="w-5 h-5 mb-1" /> Directions
      </a>
    </div>
  );
}

/* ----------------------- Page ----------------------- */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "R J Gala & Associates — Chartered Accountants, Mumbai" },
      { name: "description", content: "Premium Mumbai-based Chartered Accountancy firm offering taxation, audit, GST, company incorporation, and advisory services for businesses and individuals." },
      { property: "og:title", content: "R J Gala & Associates — Chartered Accountants, Mumbai" },
      { property: "og:description", content: "Trusted CA firm in Mumbai. Taxation, audit, GST, compliance, advisory — delivered with precision." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Services />
        <WhyUs />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBar />
    </div>
  );
}
