/* =========================================================
   siteInteractions — editorial-tech site behaviours, ported
   from the Claude Design prototype's site.js. Covers scroll
   reveal, sticky-nav state, the custom cursor and magnetic
   buttons. List rendering and theming are handled in React.
   ========================================================= */

const coarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ---------- Reveal on scroll (position based — robust) ---------- */
function initReveal(): () => void {
  const els = Array.prototype.slice.call(document.querySelectorAll('.reveal')) as HTMLElement[];

  const reveal = (el: HTMLElement) => el.classList.add('in');

  let ticking = false;
  const check = () => {
    ticking = false;
    const trigger = window.innerHeight * 0.92;
    for (let i = els.length - 1; i >= 0; i--) {
      const el = els[i];
      if (el.getBoundingClientRect().top < trigger) {
        reveal(el);
        els.splice(i, 1);
      }
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  };

  check();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  const t1 = window.setTimeout(check, 300);
  // Final safety: reveal anything still hidden.
  const t2 = window.setTimeout(() => els.slice().forEach(reveal), 2200);

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.clearTimeout(t1);
    window.clearTimeout(t2);
  };
}

/* ---------- Nav scrolled state ---------- */
function initNav(): () => void {
  const nav = document.getElementById('nav');
  if (nav === null) return () => {};
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/* ---------- Custom cursor ---------- */
function initCursor(): () => void {
  if (coarsePointer()) return () => {};
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  if (dot === null || ring === null) return () => {};

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let rx = mx;
  let ry = my;
  let raf = 0;

  const onMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  };
  window.addEventListener('mousemove', onMove);

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(loop);
  };
  loop();

  const hoverTargets = Array.prototype.slice.call(
    document.querySelectorAll('a, button, .work-item, [data-mag]'),
  ) as HTMLElement[];
  const enter = () => ring.classList.add('is-hover');
  const leave = () => ring.classList.remove('is-hover');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  });

  return () => {
    window.removeEventListener('mousemove', onMove);
    cancelAnimationFrame(raf);
    hoverTargets.forEach((el) => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    });
  };
}

/* ---------- Magnetic buttons ---------- */
function initMagnetic(): () => void {
  if (coarsePointer()) return () => {};
  const cleanups: Array<() => void> = [];
  const els = Array.prototype.slice.call(document.querySelectorAll('[data-mag]')) as HTMLElement[];

  els.forEach((el) => {
    const strength = 0.3;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Boot all interactions and return a disposer. Call once after the
 * React tree has mounted so the `.reveal` / `[data-mag]` nodes exist.
 */
export function initSiteInteractions(): () => void {
  const disposers = [initReveal(), initNav(), initCursor(), initMagnetic()];
  return () => disposers.forEach((d) => d());
}
