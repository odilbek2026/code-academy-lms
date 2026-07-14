"use client";

import { motion } from "framer-motion";
import { Award, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import Button from "@/components/ui/Button";

function drawCertificate(doc, { username, courseTitle, categoryName, completedDate }) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Fon va ramka
  doc.setFillColor(10, 12, 16);
  doc.rect(0, 0, w, h, "F");
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(1.2);
  doc.rect(12, 12, w - 24, h - 24);
  doc.setDrawColor(245, 166, 35);
  doc.setLineWidth(0.4);
  doc.rect(16, 16, w - 32, h - 32);

  doc.setTextColor(139, 146, 163);
  doc.setFontSize(12);
  doc.text("CODEACADEMY", w / 2, 36, { align: "center" });

  doc.setTextColor(237, 239, 243);
  doc.setFontSize(28);
  doc.text("Tugatish sertifikati", w / 2, 55, { align: "center" });

  doc.setTextColor(139, 146, 163);
  doc.setFontSize(12);
  doc.text("Ushbu sertifikat quyidagi shaxsga beriladi:", w / 2, 75, { align: "center" });

  doc.setTextColor(99, 102, 241);
  doc.setFontSize(24);
  doc.text(username, w / 2, 92, { align: "center" });

  doc.setTextColor(139, 146, 163);
  doc.setFontSize(12);
  doc.text(`"${categoryName}" yo'nalishidagi`, w / 2, 108, { align: "center" });

  doc.setTextColor(245, 166, 35);
  doc.setFontSize(18);
  doc.text(courseTitle, w / 2, 120, { align: "center" });

  doc.setTextColor(139, 146, 163);
  doc.setFontSize(11);
  doc.text("kursini muvaffaqiyatli tugatgani uchun.", w / 2, 132, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Sana: ${completedDate}`, w / 2, h - 24, { align: "center" });
}

export default function CertificateCard({ course, username, completedDate, index = 0 }) {
  function handleDownload() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    drawCertificate(doc, {
      username,
      courseTitle: course.title,
      categoryName: course.categoryName,
      completedDate,
    });
    doc.save(`sertifikat-${course.slug}.pdf`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
    >
      <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative flex items-start justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: `${course.color}1A`, color: course.color }}
        >
          <Award size={20} />
        </span>
        <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-500">
          100% tugallangan
        </span>
      </div>
      <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-wide text-accent">
        {course.categoryName}
      </p>
      <h3 className="relative mt-1 font-display text-base font-bold text-foreground">{course.title}</h3>
      <p className="relative mt-1 text-xs text-muted">Tugallangan sana: {completedDate}</p>

      <Button onClick={handleDownload} size="sm" icon={Download} className="relative mt-5 w-full justify-center">
        PDF sifatida yuklab olish
      </Button>
    </motion.div>
  );
}
