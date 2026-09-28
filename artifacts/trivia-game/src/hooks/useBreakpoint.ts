import { useSyncExternalStore } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const MOBILE_QUERY = "(max-width: 639.98px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1023.98px)";

function read(): Breakpoint {
  if (typeof window === "undefined" || !window.matchMedia) return "desktop";
  if (window.matchMedia(MOBILE_QUERY).matches) return "mobile";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "desktop";
}

let current: Breakpoint = read();
const listeners = new Set<() => void>();
let queries: MediaQueryList[] = [];

function notify() {
  const next = read();
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0 && typeof window !== "undefined" && window.matchMedia) {
    queries = [window.matchMedia(MOBILE_QUERY), window.matchMedia(TABLET_QUERY)];
    queries.forEach((q) => q.addEventListener("change", notify));
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      queries.forEach((q) => q.removeEventListener("change", notify));
      queries = [];
    }
  };
}

function getSnapshot(): Breakpoint {
  return current;
}

function getServerSnapshot(): Breakpoint {
  return "desktop";
}

const RESULTS: Record<Breakpoint, { breakpoint: Breakpoint; isMobile: boolean; isTablet: boolean; isDesktop: boolean }> = {
  mobile:  { breakpoint: "mobile",  isMobile: true,  isTablet: false, isDesktop: false },
  tablet:  { breakpoint: "tablet",  isMobile: false, isTablet: true,  isDesktop: false },
  desktop: { breakpoint: "desktop", isMobile: false, isTablet: false, isDesktop: true  },
};

export function useBreakpoint() {
  return RESULTS[useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)];
}
