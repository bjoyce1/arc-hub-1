import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact A.R.C. Reach the Movement" },
      {
        name: "description",
        content:
          "Reach out to A.R.C. with questions about the music industry, community issues, or to join the movement.",
      },
      { property: "og:title", content: "Contact A.R.C." },
      {
        property: "og:description",
        content: "Reach out to Artists Respecting Community.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `[A.R.C.] ${form.topic} · ${form.name}`;
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0ATopic: ${form.topic}%0D%0A%0D%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:info@arcmovement.org?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Reach Out"
        title="Get in touch"
        intro="Questions about the music industry? Community issues? Want to join the movement? Send it through."
        image="arc-banner"
        imageAlt="The A.R.C. banner raised at a community event"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="space-y-10">
              <Meta label="Location" value="Houston, TX" />
              <Meta label="Founded" value="2014" />
              <Meta label="Reach" value="info@arcmovement.org" />
              <div>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">The Anchor</p>
                <p className="mt-4 text-2xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ivory sm:text-3xl">
                  &ldquo;The community won&rsquo;t respect <span className="text-gold">US</span> unless <span className="text-gold">WE</span> respect the community.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="border border-hairline bg-surface p-6 sm:p-10">
              <div className="mb-6 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                <span>Direct Line</span>
                <span>SECURE</span>
              </div>
              <div className="space-y-5">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-hairline-strong bg-ink px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-hairline-strong bg-ink px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
                  />
                </Field>
                <Field label="Topic">
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full border border-hairline-strong bg-ink px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
                  >
                    <option>General</option>
                    <option>Music Industry Question</option>
                    <option>Community Issue</option>
                    <option>Join the Movement</option>
                    <option>Press / Media</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-hairline-strong bg-ink px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
                  />
                </Field>
              </div>
              <button
                type="submit"
                className={`mt-8 w-full ${sent ? "" : "btn-gold"}`}
                style={sent ? { background: "var(--green)", color: "#fff", padding: "0.875rem 1.5rem", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.8125rem", fontWeight: 600 } : undefined}
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Sent. Check your email.
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">{label}</p>
      {/* Sized for the longest value this renders, which is the email — twenty
          characters with no space to break at, so a flat text-3xl ran 343px wide
          inside a 272px column and took the whole page with it. `anywhere` never
          fires at real device widths; it is there so the failure mode below 320px
          is a wrapped address rather than a sideways-scrolling page. */}
      <p className="mt-3 text-[clamp(1.375rem,7vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ivory [overflow-wrap:anywhere]">
        {value}
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
        {label}
      </span>
      {children}
    </label>
  );
}
