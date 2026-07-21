import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact A.R.C.  -  Reach the Movement" },
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
    const subject = `[A.R.C.] ${form.topic}  -  ${form.name}`;
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0ATopic: ${form.topic}%0D%0A%0D%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:info@arcmovement.org?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Reach Out"
        title={<>Get in <span className="text-gold-gradient">touch</span></>}
        intro="Questions about the music industry? Community issues? Want to join the movement? Send it through."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Location</p>
                <p className="mt-2 font-display text-3xl uppercase text-ivory">Houston, TX</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Founded</p>
                <p className="mt-2 font-display text-3xl uppercase text-ivory">2014</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">The Anchor</p>
                <p className="mt-4 font-display text-2xl uppercase leading-tight text-ivory sm:text-3xl">
                  &ldquo;The community won&rsquo;t respect <span className="text-gold-gradient">US</span> unless <span className="text-gold-gradient">WE</span> respect the community.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-ink/40 px-4 py-3 text-ivory outline-none transition focus:border-gold"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-ink/40 px-4 py-3 text-ivory outline-none transition focus:border-gold"
                />
              </Field>
              <Field label="Topic">
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full rounded-lg border border-input bg-ink/40 px-4 py-3 text-ivory outline-none transition focus:border-gold"
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
                  className="w-full rounded-lg border border-input bg-ink/40 px-4 py-3 text-ivory outline-none transition focus:border-gold"
                />
              </Field>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.02]"
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Sent  -  check your email
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-gold">
        {label}
      </span>
      {children}
    </label>
  );
}
