export default function Page() {
  return (
    <main>
      <p>Timing isn’t calculated—it’s felt.</p>
      <p>
        Yet when we search for advice online on how to timing an animation,
        we’re told:{" "}
        <span className="italic">
          “Open dev tools, inspect the code, find the CSS or JavaScript, and
          reverse-engineer the timing.”
        </span>
      </p>
      <p>In other words: debug the timing instead of experience it.</p>
      <p>
        So we tweak. We adjust curves. We nudge milliseconds. We watch again.
        And still, something feels off.
      </p>

      <h2>Timing as Rhythm</h2>
      <p>
        Every animation has a rhythm: a whoosh, a pop, a pause, a snap. It’s
        closer to drumming than it is to math. When you voice it, literally say
        it out loud, you suddenly understand its shape.
      </p>
      <p>
        A button press isn’t just 150ms of scale-up and 200ms of scale-down.
        It’s <span className="italic">boop—pop!</span> A modal doesn’t fade in
        at “0.2 cubic-bezier(0.4, 0, 0.2, 1).” It arrives with a breath:
        <span className="italic"> whoooosh—plop.</span>
      </p>
      <p>
        We already experience motion as sound in our bodies. When something
        drops, we hear the <span className="italic">thud</span>. When something
        zips past us, we hear the <span className="italic">swish</span>.
      </p>
      <p>
        Motion designers are just ignoring that instinct by pretending numbers
        are enough.
      </p>

      <h2>Copying With Your Voice</h2>
      <p>
        Here’s the hack: <span className="italic">voice</span> the animation,
        literally.
      </p>
      <ol>
        <li>
          1. <span className="font-semibold">Watch the component</span> as it
          animates.
        </li>
        <li>
          2. <span className="font-semibold">Say it out loud</span> with your
          mouth:
          <span className="italic"> whooooosh..., boink!, click!</span>.
        </li>
        <li>
          3. <span className="font-semibold">Repeat</span> or{" "}
          <span className="font-semibold">record yourself</span> and play it
          back until the rhythm matches what you see.
        </li>
        <li>
          4. <span className="font-semibold">Translate that rhythm</span> into
          visible animation.
        </li>
      </ol>
      <p>
        When you voice an animation, the timing becomes obvious. You can tell
        instantly if the exit is too abrupt, or if the easing feels sluggish.
      </p>
      <p>Your body is better at detecting flow than your eyes alone.</p>

      <h2>Example</h2>
      <p>Below is a sample animation:</p>
      <figure>
        <video preload="none" autoPlay muted playsInline loop>
          <source
            src={`/writing/the-easiest-way-to-copy-animation-timing/star-animation.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <figcaption className="italic">
          &quot;Shueeshuee-ooow, poink!&quot;
        </figcaption>
      </figure>
      <p>Now here’s the sound I made while watching it:</p>
      <div className="flex justify-center pb-5">
        <audio controls>
          <source
            src="/writing/the-easiest-way-to-copy-animation-timing/star-timing.m4a"
            type="audio/mp4"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      <p>
        Notice how the voice naturally maps to the timing. Without touching
        bezier values, you already feel the rhythm.
      </p>
      <p>
        Finally, make the animation visible. Use a tool like{" "}
        <a
          className="link"
          href="https://www.easing.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          easing.dev
        </a>{" "}
        to explore curves. Match the curve that feels closest to the sound you
        made. You’ll see how easy the rhythm in your voice translates directly
        into a mathematical shape.
      </p>
      <figure>
        <video preload="none" autoPlay muted playsInline loop>
          <source
            src={`/writing/the-easiest-way-to-copy-animation-timing/easings.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <figcaption>easing curves from easing.dev</figcaption>
      </figure>
      <p>
        You can see much easier that the <span className="italic">poink!</span>{" "}
        (second part of the animation) is closer to{" "}
        <span className="font-semibold">Out Quart</span> than the other ease
        curves eventhough they look almost the same. Yet you haven’t even
        touched the numbers yet.
      </p>

      <h2>Another Example</h2>
      <p>Here’s the component with animation:</p>
      <figure>
        <video preload="none" autoPlay muted playsInline loop>
          <source
            src={`/writing/the-easiest-way-to-copy-animation-timing/finta-animation.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <figcaption className="italic">
          &quot;Shhhhhhhhhh-whiishk-fheeeow...&quot;
        </figcaption>
      </figure>
      <p>Here’s the sound I made while watching it:</p>
      <div className="flex justify-center pb-5">
        <audio controls>
          <source
            src="/writing/the-easiest-way-to-copy-animation-timing/finta-timing.m4a"
            type="audio/mp4"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      <p>
        This rhythm is slightly more intricate than the first, but it’s still
        easy to grasp.
      </p>

      <h2>Why It Works</h2>
      <p>
        This method works because animation isn’t logic, it’s performance.
        Numbers describe the outcome, but rhythm explains the feeling.
      </p>
      <p>
        <span className="font-semibold">Embodied learning:</span> Speaking
        engages your body. It turns timing into something you can feel and
        remember.
      </p>
      <p>
        <span className="font-semibold">Musical rhythm:</span> Motion has beats,
        accents, and pauses—exactly like music. Musicians don’t calculate
        groove; they feel it.
      </p>
      <p>
        <span className="font-semibold">Faster iteration:</span> Instead of
        chasing bezier values, you can lock in the timing by ear and then refine
        in code.
      </p>

      <h2>Stop Over-Engineering Timing</h2>
      <p>
        We’ve been trained to think timing is about math. But the best
        animations aren’t engineered from numbers; they’re performed.
      </p>
      <p>
        If you want your motion to feel alive, stop dragging curve handles and
        start humming, snapping, voicing. Get weird. Be the animation.
      </p>
      <p>Because if you can voice the motion, you can design it.</p>
    </main>
  );
}
