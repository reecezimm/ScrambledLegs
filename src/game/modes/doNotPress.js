// ─────────────────────────────────────────────────────────────────────────────
// doNotPress — survive the play window. Pressing penalizes the bonus score
// but does NOT end the phase (no fail). Phase always ends on timeout with a
// 'win' outcome. The combination of `overrides.mashing: 'inverted'` (which
// stops KudosCta from advancing pressCount on press) + this mode's penalty
// behavior gives the user a "sit still or lose points" experience.
//
// Reusable: pair with `overrides.gameClock: 'paused'` to also halt the save
// timer for the duration — the screen freezes, the world stops.
// ─────────────────────────────────────────────────────────────────────────────
const doNotPress = {
  id: 'doNotPress',
  start(ctx) {
    let totalPenalty = 0;
    const penaltyPerPress = (ctx.config && ctx.config.penaltyPerPress) || 10;

    console.log(`[mg] mode doNotPress start | penaltyPerPress=-${penaltyPerPress} timeout=${ctx.timeoutMs}ms`);

    // Main status text: e.g. "DON'T TOUCH" — set once and persists for the
    // play phase. No sub-status until the user actually taps and gets a
    // penalty (then sub shows the running -N total).
    const statusText = (ctx.config && ctx.config.playStatus) || "DON'T TOUCH";
    ctx.setStatus(statusText);
    ctx.setSubStatus(null);

    const unsubPress = ctx.onPress(() => {
      totalPenalty += penaltyPerPress;
      const btn = document.querySelector('.hd-cta');
      if (btn) {
        const r = btn.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        ctx.awardBonus(-penaltyPerPress, { x, y });
      } else {
        ctx.awardBonus(-penaltyPerPress);
      }
      ctx.setSubStatus(`PENALTY: -${totalPenalty}`);
      console.log(`[mg] doNotPress press → penalty -${penaltyPerPress} | total -${totalPenalty}`);
    });

    return () => {
      unsubPress();
      ctx.setSubStatus(null);
      ctx.setStatus(null);
      console.log(`[mg] doNotPress cleanup | total penalty=-${totalPenalty}`);
      // No endPhase here — director's hard timeout (outcome='win') ran first.
    };
  },
};

export default doNotPress;
