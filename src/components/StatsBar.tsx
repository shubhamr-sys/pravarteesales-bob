"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 9, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Government Clients" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 7, suffix: "", label: "IT Solution Domains" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#0057FF] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white font-[var(--font-plus-jakarta)]">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-sm mt-2 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
