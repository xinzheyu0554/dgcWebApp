import React from "react";

const speakers = [
  {
    name: "Rachel Maggiore",
    topic: "Rose Pruning Made Easy",
    date: "Past Event",
    description:
      "Seed Sensations Gardening Services",
    pdf: "/speakers/Rose-Pruning-Made-Easy_DGC10June2026.pdf",
  },
];

function Speakers() {
  return (
    <main className="dgc-speakers-page">
      <section className="dgc-speakers-hero">
        <h1>Past Guest Speakers' slides</h1>
        <p>
          Learn more about the guest speakers invited by Doncaster Garden Club
          and view their presentation slides.
        </p>
      </section>

      <section className="dgc-speakers-grid">
        {speakers.map((speaker, index) => (
          <article className="dgc-speaker-card" key={index}>
            <div className="dgc-speaker-card__content">
              <p className="dgc-speaker-card__date">{speaker.date}</p>
              <h2>{speaker.name}</h2>
              <h3>{speaker.topic}</h3>
              <p>{speaker.description}</p>

              <div className="dgc-speaker-card__actions">
                <a href={speaker.pdf} target="_blank" rel="noreferrer">
                  Open PDF
                </a>
              </div>
            </div>

            <div className="dgc-speaker-card__preview">
              <iframe
                src={speaker.pdf}
                title={`${speaker.name} presentation`}
              />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Speakers;
