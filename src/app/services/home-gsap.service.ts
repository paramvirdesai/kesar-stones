import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class HomeGsapService {
  private registered = false;

  registerPlugins(): void {
    if (!this.registered) {
      gsap.registerPlugin(ScrollTrigger);
      this.registered = true;
    }
  }

  initHomeAnimations(root: HTMLElement): gsap.Context {
    this.registerPlugins();

    return gsap.context(() => {
      this.runHero(root);
      this.runReveals(root);
      this.runParallax(root);
      this.runStats(root);
      this.runCollectionTiles(root);
    }, root);
  }

  private runHero(root: HTMLElement): void {
    if (!root.querySelector('.cin-hero')) return;

    gsap.set('.cin-hero-content > *', { opacity: 0, y: 36 });
    gsap.set('.cin-hero-scroll', { opacity: 0 });
    gsap.set('.cin-hero-media', { scale: 1.1 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.cin-hero-media', { scale: 1, duration: 2.6, ease: 'power2.out' })
      .to('.cin-hero-eyebrow', { opacity: 1, y: 0, duration: 1 }, '-=1.8')
      .to('.cin-hero-title', { opacity: 1, y: 0, duration: 1.2 }, '-=0.85')
      .to('.cin-hero-tagline', { opacity: 1, y: 0, duration: 1.1 }, '-=0.75')
      .to('.cin-hero-cta', { opacity: 1, y: 0, duration: 1 }, '-=0.65')
      .to('.cin-hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.5');

    gsap.to('.cin-hero-light', {
      opacity: 0.6,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });
  }

  private runReveals(root: HTMLElement): void {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.page-reveal')).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        opacity: 0,
        y: 44,
        duration: 1.2,
        delay: (i % 3) * 0.05,
        ease: 'power3.out'
      });
    });
  }

  private runParallax(root: HTMLElement): void {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.cin-parallax-img')).forEach((img) => {
      gsap.to(img, {
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 2 },
        scale: 1.1,
        ease: 'none'
      });
    });
  }

  private runStats(root: HTMLElement): void {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.stat-block')).forEach((block) => {
      const valEl = block.querySelector('.stat-num');
      if (!valEl) return;
      const target = Number(valEl.getAttribute('data-target') ?? 0);
      const suffix = valEl.getAttribute('data-suffix') ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' },
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => {
          valEl.textContent = `${Math.round(counter.val)}${suffix}`;
        }
      });
    });
  }

  private runCollectionTiles(root: HTMLElement): void {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.collection-tile')).forEach((tile, i) => {
      gsap.from(tile, {
        scrollTrigger: { trigger: tile, start: 'top 85%', toggleActions: 'play none none reverse' },
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });
  }
}
