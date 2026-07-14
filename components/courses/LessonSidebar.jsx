"use client";

import { Check, Presentation, FileText, Code2 } from "lucide-react";

const TYPE_ICON = { presentation: Presentation, text: FileText, code: Code2 };

export default function LessonSidebar({ lessons, activeLessonId, completedIds, onSelect }) {
  return (
    <nav className="flex flex-col gap-1">
      {lessons.map((lesson, i) => {
        const Icon = TYPE_ICON[lesson.type];
        const isActive = lesson.id === activeLessonId;
        const isDone = completedIds.includes(lesson.id);

        return (
          <button
            key={lesson.id}
            onClick={() => onSelect(lesson.id)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
              isActive ? "bg-accent-soft" : "hover:bg-surface-2"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                isDone
                  ? "bg-green-500/15 text-green-500"
                  : isActive
                    ? "bg-accent text-white"
                    : "bg-surface-2 text-muted"
              }`}
            >
              {isDone ? <Check size={13} /> : i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-[13.5px] font-medium ${isActive ? "text-accent" : "text-foreground"}`}>
                {lesson.title}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted">
                <Icon size={11} /> {lesson.duration}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
