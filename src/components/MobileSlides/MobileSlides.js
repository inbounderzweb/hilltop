import { useEffect, useRef } from "react";

export default function MobileSlides({ slides, active }) {
  const scrollerRef = useRef(null);


  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // If user scrolls up at top OR down at bottom -> pass scroll to page
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault(); // stop snap/bounce eating the gesture
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
      }
    };

    // IMPORTANT: passive:false so preventDefault works
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="
        relative md:hidden px-4 h-[465px] overflow-y-auto
        snap-y snap-proximity scroll-smooth
        [overscroll-behavior-y:auto]
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {/* top fade */}
      <div className="pointer-events-none sticky top-0 z-10 h-10 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="grid grid-cols-1 gap-4">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`snap-start transition-all duration-300 ease-out ${
              idx === active ? "opacity-100 scale-100" : "opacity-70 scale-[0.98]"
            }`}
          >
            <img src={s.src} alt={s.alt} className="w-full rounded-2xl" />
          </div>
        ))}
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none sticky bottom-0 z-10 h-10 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
