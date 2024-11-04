"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Users, Globe, Award, } from "lucide-react";

interface Achievement {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
}

const achievements: Achievement[] = [
  { icon: Users, value: 500, label: "Clients", suffix: "+" },
  { icon: Globe, value: 2, label: "International Clients", suffix: "+" },
  { icon: Award, value: 4, label: "Years of Experience", suffix: "+" },
];

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [end, duration, inView]);

  return <span ref={ref}>{count}</span>;
};

export default function AchievementsSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl  text-center mb-12 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Achievements
        </motion.h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className=" p-6   text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <achievement.icon className="w-12 h-12 mx-auto mb-4 " />
              <h3 className="text-4xl font-bold mb-2">
                <CountUp end={achievement.value} />
                {achievement.suffix}
              </h3>
              <p className="text-gray-600">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
