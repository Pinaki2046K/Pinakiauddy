import { EXPERIENCE, RECOGNITION, TOOLKIT } from '@/lib/data/profile';

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__row">
        <div className="about__aside">
          <h2 id="about-title" className="section-title" data-reveal>
            About me
          </h2>
        </div>
        <div className="about__main">
          <p className="about__para" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            I’m a final-year computer science student who designs an interface and then builds it. I’ve taken an AI
            campaign CRM, a compliance planner for truck drivers, an ERP now in daily use and a non-profit’s website from a
            blank canvas to a working product, so I make design decisions knowing what they cost to build.
          </p>
          <p className="about__para about__para--second" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            My name comes from Pinaka, the bow of Shiva. I take the hint: aim carefully, then let go.
          </p>
        </div>
      </div>

      {[
        { word: 'Experience', items: EXPERIENCE },
        { word: 'Recognition and leadership', items: RECOGNITION },
      ].map((row) => (
        <div key={row.word} className="about__row about__row--record">
          <h3 className="about__word" data-reveal>
            {row.word}
          </h3>
          <ul className="record record--two">
            {row.items.map((item, i) => (
              <li key={`${item.role}-${item.org}`} data-reveal style={{ '--i': i + 1 } as React.CSSProperties}>
                <p className="record__head">
                  <span className="record__name">{item.role}</span>
                  {item.dates && <span className="record__date">{item.dates}</span>}
                </p>
                <p className="record__org">{item.org}</p>
                <p className="record__note">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="about__row about__row--record">
        <h3 className="about__word" data-reveal>
          Toolkit
        </h3>
        <div className="record record--three">
          {TOOLKIT.map((set, i) => (
            <div key={set.group} data-reveal style={{ '--i': i + 1 } as React.CSSProperties}>
              <h4 className="record__name">{set.group}</h4>
              <ul className="record__list">
                {set.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
