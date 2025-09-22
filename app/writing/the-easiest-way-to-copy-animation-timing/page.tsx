export default function Page() {
  return (
    <main>
      <p>Here’s the truth: timing isn’t calculated—it’s felt.</p>
      <p>
        Yet when we search for advice online, we’re told: “Open dev tools,
        inspect the code, find the CSS or JavaScript, and reverse-engineer the
        timing.” In other words: debug timing instead of experiencing it.
      </p>
      <p>
        So we tweak. We adjust curves. We nudge milliseconds. We watch again.
        And still, something feels off. The motion might be smooth but is
        lifeless.
      </p>

      <h2>Timing as Rhythm</h2>
      <p>
        Think about it. Every animation has a rhythm: a whoosh, a pop, a pause,
        a snap. It’s closer to drumming than it is to math. When you voice it,
        literally say it out loud, you suddenly understand its shape.
      </p>
      <p>
        A button press isn’t just 150ms of scale-up and 200ms of scale-down.
        It’s *boop-pop!* A modal doesn’t fade in at “0.2 cubic-bezier(0.4, 0,
        0.2, 1).” It arrives with a breath: *whoooosh—plop.*
      </p>
      <p>
        We already experience motion as sound in our bodies. When something
        drops, we hear the *thud*. When something zips past us, we hear the
        *swish*. Motion designers are just ignoring that instinct by pretending
        numbers are enough.
      </p>

      <h2>Copying With Your Voice</h2>
      <p>Here’s the hack: voice the animation. Literally.</p>
      <ol>
        <li>1. Watch the component as it animates.</li>
        <li>2. Say it out loud with your mouth: *whoosh*, *pop*, *click*.</li>
        <li>3a. Repeat until the rhythm matches what you see.</li>
        <li>
          3b. Or record yourself and play it back until it matches the feel of
          the timing.
        </li>
        <li>4. Translate that rhythm into visible animation.</li>
      </ol>
    </main>
  );
}
