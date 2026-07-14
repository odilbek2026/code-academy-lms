export default function TextLessonView({ lesson }) {
  return (
    <div className="flex flex-col gap-4">
      {lesson.content.paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
          {p}
        </p>
      ))}
    </div>
  );
}
