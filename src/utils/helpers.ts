import { CourtRole } from "../const";
import { Defense } from "../types";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  calculateAbsoluteValueWithDecimals,
  capitalizeFirstLetterOfEachWord,
  getSpanishMonthName,
} from "./others";

export const getCourtMemberNameByRole = (
  role: CourtRole,
  court: Array<{ role: CourtRole; fullname: string }>
) => {
  return (
    court.find((court) => {
      return court.role === role;
    })?.fullname || ""
  );
};

export const cretateActaDefensaPDF = async (result: Defense): Promise<Blob> => {
  try {
    // FontSizes
    // const lgFontSize = 20;
    const mdFontSie = 14;
    const smFontSie = 10;

    const castedDate = new Date(result.date);

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Set default font
    page.setFont(helveticaFont);

    // Get the width and height of the page
    const { height, width } = page.getSize();

    // MS-17 text
    page.drawText("MS-17", {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 95),
      size: mdFontSie,
    });

    // Header texts
    page.drawText("UNIVERSIDAD DE PINAR DEL RIO", {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 30),
      y: calculateAbsoluteValueWithDecimals(height, 90),
      size: mdFontSie,
    });

    page.drawText("ACTA DE DEFENSA DE TRABAJO DE DIPLOMA", {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 23),
      y: calculateAbsoluteValueWithDecimals(height, 88),
      size: mdFontSie,
    });

    // Content
    page.drawText(
      `Nombre(s) y apellidos del estudiante : ${capitalizeFirstLetterOfEachWord(
        result.metadata.student
      )}`,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 82),
        size: smFontSie,
      }
    );

    //
    page.drawText(
      `De acuerdo con el Reglamento de Trabajo Docente y Metodologico en la Educacion Superior y la convocatoria librada por`,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 79),
        size: smFontSie,
      }
    );

    page.drawText(`el Decano, se constituye el tribunal integrado por : `, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 77),
      size: smFontSie,
    });

    const presidentName = capitalizeFirstLetterOfEachWord(
      getCourtMemberNameByRole(CourtRole.Presidente, result.metadata.court)
    );
    const secretaryName = capitalizeFirstLetterOfEachWord(
      getCourtMemberNameByRole(CourtRole.Secretario, result.metadata.court)
    );
    const vocalName = capitalizeFirstLetterOfEachWord(
      getCourtMemberNameByRole(CourtRole.Vocal, result.metadata.court)
    );

    const oponenteName = capitalizeFirstLetterOfEachWord(
      getCourtMemberNameByRole(CourtRole.Oponente, result.metadata.court)
    );
    page.drawText(`Presidente : ${presidentName}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 74),
      size: smFontSie,
    });
    page.drawText(`Secretario : ${secretaryName}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 72),
      size: smFontSie,
    });
    page.drawText(`Vocal : ${vocalName}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 70),
      size: smFontSie,
    });

    page.drawText(
      `Fungiendo como tutor (es) : ${result.metadata.tutors
        .map((tutor) => capitalizeFirstLetterOfEachWord(tutor))
        .join(", ")}`,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 68),
        size: smFontSie,
      }
    );

    page.drawText(`Y como Oponente : ${oponenteName}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 66),
      size: smFontSie,
    });

    page.drawText(
      `Para evaluar en este acto publico el Trabajo de diploma que tiene por titulo : `,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 63),
        size: smFontSie,
      }
    );
    page.drawText(`${result.metadata.topic}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 61),
      size: smFontSie,
    });

    page.drawText(
      `Una vez escuchadas la exposicion del estudiante, del Tutor(es) , del Oponente y las preguntas planteadas el tribunal `,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 58),
        size: smFontSie,
      }
    );
    page.drawText(
      `emite la calificacion de ${result.eval} puntos y formula las siguinetes recomendaciones: `,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 56),
        size: smFontSie,
      }
    );
    page.drawText(`${result.recomns}`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 54),
      size: smFontSie,
    });

    page.drawText(
      `Y para que asi conste en el expediente academico del mencionado estudiante, se expide y firma la presente Acta a los ${castedDate.getUTCDate()}  `,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 51),
        size: smFontSie,
      }
    );

    page.drawText(
      `dias del mes de  ${getSpanishMonthName(
        castedDate.getUTCMonth() + 1
      )} del ano ${castedDate.getUTCFullYear()}`,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 49),
        size: smFontSie,
      }
    );

    page.drawText(`________________________`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 31),
      size: smFontSie,
    });

    page.drawText(`Presidente`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 12),
      y: calculateAbsoluteValueWithDecimals(height, 29),
      size: smFontSie,
    });

    page.drawText(`________________________`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 40),
      y: calculateAbsoluteValueWithDecimals(height, 31),
      size: smFontSie,
    });

    page.drawText(`Secretario`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 46),
      y: calculateAbsoluteValueWithDecimals(height, 29),
      size: smFontSie,
    });

    page.drawText(`________________________`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 70),
      y: calculateAbsoluteValueWithDecimals(height, 31),
      size: smFontSie,
    });

    page.drawText(`Vocal`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 78),
      y: calculateAbsoluteValueWithDecimals(height, 29),
      size: smFontSie,
    });

    page.drawText(`Firma del Estudiante: ________________________`, {
      color: rgb(0, 0, 0),
      x: calculateAbsoluteValueWithDecimals(width, 5),
      y: calculateAbsoluteValueWithDecimals(height, 24),
      size: smFontSie,
    });

    page.drawText(
      `Ejemplar unico para archivar en el expediente academico del estudiante`,
      {
        color: rgb(0, 0, 0),
        x: calculateAbsoluteValueWithDecimals(width, 5),
        y: calculateAbsoluteValueWithDecimals(height, 22),
        size: smFontSie,
      }
    );

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // // Create a Blob from the Uint8Array
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    return pdfBlob;
  } catch (error) {
    throw new Error("Error creating pdf");
  }
};
