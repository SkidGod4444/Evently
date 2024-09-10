"use client";
import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Default data for event details, todo items, and key highlights
  const defaultSelectedDate = new Date(new Date().setSeconds(new Date().getSeconds() + 30));
  const defaultEventDetails = "Join us for a nude New Year's Eve celebration, where full nudity is required for participation.";
  const defaultTodoItems = ["Create guest list", "Book the venue", "Send out invitations"];
  const defaultKeyHighlights = ["Celebrate New Year's Eve", "Midnight fireworks display", "Exclusive nude gathering"];

  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultSelectedDate);

  // Timer calculation
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

 

  useEffect(() => {
    const handleConfetti = () => {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
   
      const frame = () => {
        if (Date.now() > end) return;
   
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
   
        requestAnimationFrame(frame);
      };
   
      frame();
    };

    let interval: NodeJS.Timeout | undefined;

    if (selectedDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const eventDate = selectedDate.getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        if (distance < 0) {
          setSelectedDate(new Date(selectedDate.setSeconds(selectedDate.getSeconds() + 30))); // Increase selectedDate by 30 seconds
          clearInterval(interval);
          handleConfetti(); // Call handleConfetti when the timer ends
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [selectedDate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-15">
      {/* Background Image with Blur */}
      <Image
        src="/wallp.jpeg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10 blur-sm"
      />

      <div className="pt-10">
        <div className="flex items-center justify-center gap-4 text-8xl font-bold text-white/30">
          <div className="flex flex-col items-center">
            <span className="days">{days}</span>
            <span className="text-sm font-bold text-white/40">Days</span>
          </div>
          <span className="text-white/30">:</span>
          <div className="flex flex-col items-center">
            <span className="hours">{hours}</span>
            <span className="text-sm font-bold text-white/40">Hours</span>
          </div>
          <span className="text-white/30">:</span>
          <div className="flex flex-col items-center">
            <span className="minutes">{minutes}</span>
            <span className="text-sm font-bold text-white/40">Minutes</span>
          </div>
          <span className="text-white/30">:</span>
          <div className="flex flex-col items-center">
            <span className="seconds">{seconds}</span>
            <span className="text-sm font-bold text-white/40">Seconds</span>
          </div>
        </div>
      </div>

      {/* Event Details and Key Highlights/Todo List Display */}
      <div className="mt-10 w-full max-w-2xl p-6">
        <h2 className="text-3xl mb-2 text-white/30 font-bold">Event Details</h2>
        <p className="mb-6 text-white/50 font-semibold text-sm">
          {defaultEventDetails}
        </p>

        {defaultKeyHighlights ? (
          <div>
            <h3 className="text-3xl mb-2 text-white/30 font-bold">
              Key Highlights
            </h3>
            <ul className="list-disc list-inside text-white/50 font-semibold text-sm">
              {defaultKeyHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 className="text-3xl font-bold mb-2 text-white/30">Todo List</h3>
            <ul className="list-disc list-inside text-white/50 font-semibold text-sm">
              {defaultTodoItems.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Link href={"https://download-directory.github.io/?url=https://github.com/SkidGod4444/Evently/tree/main/evently-os&filename=evently-os"}>
      <Button variant="outline" className=" text-left font-normal mt-8">
        <Download className="mr-1 h-4 w-4 -translate-x-1" />
        Download Evently OS
      </Button>
      </Link>
      <p>Download the evently chromium extension.</p>
    </div>
  );
}
