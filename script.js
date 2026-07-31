// Révèle chaque réalisation (zoom + fondu) quand elle entre dans l'écran au scroll
(function () {
  const projects = document.querySelectorAll('.project');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!projects.length) return;

  if (reduceMotion) {
    // Pas d'animation : on affiche tout directement
    projects.forEach((p) => p.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // l'effet ne joue qu'une fois par projet
        }
      });
    },
    {
      threshold: 0.25, // se déclenche quand ~1/4 du projet est visible
      rootMargin: '0px 0px -10% 0px',
    }
  );

  projects.forEach((project) => observer.observe(project));
})();
