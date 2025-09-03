import Accordion from "@/components/Accordion";

export const metadata = { title: "FAQ" };

export default function FAQPage() {
  const items = [
    { q: "How do I invite Swelly?", a: "Go to the Invite page and click 'Invite Now'." },
    { q: "What music sources are supported?", a: "Spotify, YouTube, Apple Music, and SoundCloud." },
    { q: "How do I get Premium?", a: "Visit the Premium page and select a plan." },
  ];
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion items={items} />
    </div>
  );
}
