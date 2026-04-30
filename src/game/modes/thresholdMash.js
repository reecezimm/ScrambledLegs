// ─────────────────────────────────────────────────────────────────────────────
// thresholdMash — count user presses during the play window.
// If presses >= target before timeout: win. Otherwise timeout fires lose.
// Live counter shown via ctx.setSubStatus.
// ─────────────────────────────────────────────────────────────────────────────
const thresholdMash = {
  id: 'thresholdMash',
  start(ctx) {
    const target = (ctx.config && ctx.config.target) || 50;
    let count = 0;
    let ended = false;

    ctx.setSubStatus(`0 / ${target}`);

    const unsubPress = ctx.onPress(() => {
      if (ended) return;
      count += 1;
      ctx.setSubStatus(`${count} / ${target}`);
      if (count >= target) {
        ended = true;
        ctx.endPhase('win', count);
      }
    });

    return () => {
      ended = true;
      unsubPress();
      ctx.setSubStatus(null);
      // No endPhase here — the director's hard timeout (configured with
      // outcome='lose') already fired before cleanup runs.
    };
  },
};

export default thresholdMash;
