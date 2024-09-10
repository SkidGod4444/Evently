"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDaysIcon, TrashIcon } from "lucide-react";

export default function Component() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDetails, setEventDetails] = useState<string | null>(null);
  const [showKeyHighlights, setShowKeyHighlights] = useState(true);
  const [todoItems, setTodoItems] = useState<string[]>([]);
  const [keyHighlights, setKeyHighlights] = useState<string[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const storedDate = localStorage.getItem("evently-eventDate");
    const storedDetails = localStorage.getItem("evently-eventDetails");
    const storedTodos = localStorage.getItem("evently-todoItems");
    const storedHighlights = localStorage.getItem("evently-keyHighlights");

    if (storedDate) setSelectedDate(new Date(storedDate));
    if (storedDetails) setEventDetails(storedDetails);
    if (storedTodos) setTodoItems(JSON.parse(storedTodos));
    if (storedHighlights) setKeyHighlights(JSON.parse(storedHighlights));
  }, []);

  // Save to localStorage only when the data is not empty
  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("evently-eventDate", selectedDate.toISOString());
    }
    if (eventDetails && eventDetails.trim()) {
      localStorage.setItem("evently-eventDetails", eventDetails);
    }
    if (todoItems.length > 0) {
      localStorage.setItem("evently-todoItems", JSON.stringify(todoItems));
    }
    if (keyHighlights.length > 0) {
      localStorage.setItem(
        "evently-keyHighlights",
        JSON.stringify(keyHighlights)
      );
    }
  }, [eventDetails, todoItems, keyHighlights, selectedDate]);

  useEffect(() => {
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
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedDate]);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleTodoAdd = () => {
    setTodoItems([...todoItems, ""]);
  };

  const handleEventDelete = () => {
    localStorage.removeItem("evently-eventDate");
    localStorage.removeItem("evently-eventDetails");
    localStorage.removeItem("evently-todoItems");
    localStorage.removeItem("evently-keyHighlights");
    setSelectedDate(null);
    setEventDetails(null);
    setTodoItems([]);
    setKeyHighlights([]);
  };

  const handleTodoChange = (index: number, value: string) => {
    const updatedTodos = [...todoItems];
    updatedTodos[index] = value;
    setTodoItems(updatedTodos);
  };

  const handleKeyHighlightAdd = () => {
    setKeyHighlights([...keyHighlights, ""]);
  };

  const handleKeyHighlightChange = (index: number, value: string) => {
    const updatedHighlights = [...keyHighlights];
    updatedHighlights[index] = value;
    setKeyHighlights(updatedHighlights);
  };

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
        {eventDetails !== "" ? (
          <p className="mb-6 text-white/50 font-semibold text-sm">
            {eventDetails}
          </p>
        ) : (
          <p className="mb-6 text-white/50 font-semibold text-sm">
            No event details provided.
          </p>
        )}

        {showKeyHighlights ? (
          <div>
            <h3 className="text-3xl mb-2 text-white/30 font-bold">
              Key Highlights
            </h3>
            {keyHighlights.length > 0 ? (
              <ul className="list-disc list-inside text-white/50 font-semibold text-sm">
                {keyHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 font-semibold text-sm">
                No key highlights provided.
              </p>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-3xl font-bold mb-2 text-white/30">Todo List</h3>
            {todoItems.length > 0 ? (
              <ul className="list-disc list-inside text-white/50 font-semibold text-sm">
                {todoItems.map((todo, index) => (
                  <li key={index}>{todo}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 font-semibold text-sm">
                No todo items provided.
              </p>
            )}
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className=" text-left font-normal mt-8">
            <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
            {selectedDate ? "Update event" : "Set an event"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-primary blur-xs">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Enter the event details and choose key highlights or a todo list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-details">Event Details</Label>
              <Textarea
                id="event-details"
                placeholder="Enter event details..."
                value={eventDetails || ""}
                onChange={(e) => setEventDetails(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Display</Label>
              <RadioGroup
                value={showKeyHighlights ? "key-highlights" : "todo-list"}
                onValueChange={(value) =>
                  setShowKeyHighlights(value === "key-highlights")
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id="key-highlights"
                    value="key-highlights"
                    className="bg-white"
                  />
                  <Label htmlFor="key-highlights">Key Highlights</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id="todo-list"
                    value="todo-list"
                    className="bg-white"
                  />
                  <Label htmlFor="todo-list">Todo List</Label>
                </div>
              </RadioGroup>
            </div>
            {showKeyHighlights ? (
              <div className="grid gap-2">
                <Label>Key Highlights</Label>
                <div className="grid gap-2">
                  {keyHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleKeyHighlightChange(index, e.target.value)
                        }
                      />
                      <Button
                        variant="destructive"
                        onClick={() => handleKeyHighlightChange(index, "")}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={handleKeyHighlightAdd}>
                    Add Highlight
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label>Todo List</Label>
                <div className="grid gap-2">
                  {todoItems.map((todo, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={todo}
                        onChange={(e) =>
                          handleTodoChange(index, e.target.value)
                        }
                      />
                      <Button
                        variant="destructive"
                        onClick={() => handleTodoChange(index, "")}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={handleTodoAdd}>
                    Add Todo
                  </Button>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">
                      {selectedDate ? "Update event date" : "Pick event date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate ?? undefined}
                      onSelect={(date) => setSelectedDate(date ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button variant="destructive" onClick={handleEventDelete}>
                Delete Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
