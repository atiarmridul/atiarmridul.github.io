const HEADER_OFFSET_PX = 88;

// Native smooth scrolling is browser-timed; this keeps section jumps fluid without feeling sluggish.
export const scrollToSection = (sectionId: string) => {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  // Clamp the target to the real scroll range so footer/contact jumps do not overshoot on short viewports.
  const targetY = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.max(0, Math.min(targetY, maxScrollY));
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  window.scrollTo({ top, behavior });
};
