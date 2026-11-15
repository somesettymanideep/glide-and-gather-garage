import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, variant = "up", delay = 0, as: Tag = "div" }: {
  children: ReactNode; className?: string; variant?: "up" | "left" | "right" | "zoom"; delay?: number; as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", variant !== "up" && `reveal-${variant}`, className)}>
      {children}
    </Tag>
  );
}
