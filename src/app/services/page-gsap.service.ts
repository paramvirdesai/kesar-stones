import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class PageGsapService {
  private registered = false;

  initPageAnimations(root: HTMLElement): gsap.Context {
    if (!this.registered) {
      gsap.registerPlugin(ScrollTrigger);
      this.registered = true;
    }

    return gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.page-reveal')).forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          opacity: 0,
          y: 40,
          duration: 1.1,
          delay: (i % 4) * 0.06,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.stat-block')).forEach((block) => {
        const valEl = block.querySelector('.stat-num');
        if (!valEl) return;
        const target = Number(valEl.getAttribute('data-target') ?? 0);
        const suffix = valEl.getAttribute('data-suffix') ?? '';
        const counter = { val: 0 };
        gsap.to(counter, {
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' },
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            valEl.textContent = `${Math.round(counter.val)}${suffix}`;
          }
        });
      });
    }, root);
  }
}
