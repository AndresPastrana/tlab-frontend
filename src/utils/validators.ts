import { RangoAcademico, Sex } from "../../src/const";
import { z } from "zod";
const emailRegex = /^[a-zA-Z0-9._-]+@(upr\.cu|gmail\.com)$/;
const phoneRegex = /^[0-9]{8}$/;

function validateYear(year: string) {
  const parsedYear = parseInt(year);
  if (parsedYear >= 0 && parsedYear <= 99) {
    return true;
  }

  return false;
}

export function validateCi(ci: string) {
  // Extract year, month, day, and the last 5 digits
  const year = ci.substring(0, 2);
  const month = ci.substring(2, 4);
  const day = ci.substring(4, 6);
  const last5Digits = ci.substring(6);

  if (!validateYear(year)) {
    return false;
  }

  // TODO: Validate the year without

  // Check if the month is valid (01 to 12)
  if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    return false;
  }

  // Check if the day is valid (01 to 31)
  if (!/^(0[1-9]|[12]\d|3[01])$/.test(day)) {
    return false;
  }

  // Check if the last 5 digits are numeric
  if (!/^\d{5}$/.test(last5Digits)) {
    return false;
  }

  // All checks passed, the CI is valid
  return true;
}

export const loginFormDataSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

const ProfesorSchema = z.object({
  ci: z
    .string()
    .trim()
    .refine(
      (data) => {
        return validateCi(data);
      },
      { message: "Formato del carnet de indentidad no valdio" }
    ),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El nombre debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el nombre separadas por un espacio
        const nameParts = data.trim().split(" ");
        return (
          nameParts.length <= 2 && nameParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "El nombre debe consistir en máximo dos cadenas de texto separadas por un espacio.",
      }
    ),
  lastname: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El apellido debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el apellido separadas por un espacio
        const apellidoParts = data.trim().split(" ");
        return (
          apellidoParts.length <= 2 &&
          apellidoParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "Los apellidos deben ser máximo dos cadenas de texto separadas por un espacio.",
      }
    ),

  email: z
    .string()
    .trim()
    .refine((data) => emailRegex.test(data), {
      message: "El formato del correo electrónico no es válido.",
    }),
  phone: z
    .string()
    .trim()
    .refine((data) => phoneRegex.test(data), {
      message: "El número de teléfono debe contener exactamente 8 dígitos.",
    }),
  address: z
    .string()
    .trim()
    .refine((data) => data.length > 10, {
      message: "La direccion debe ser mas descriptiva",
    }),
  sex: z.enum([Sex.Female, Sex.Male], {
    invalid_type_error: `Sexo debe ser uno de ${Object.values(Sex).join(",")}`,
  }),
  categoria: z.enum(
    [
      RangoAcademico.GRADUADO_DE_DOCTORADO,
      RangoAcademico.GRADUADO_DE_MAESTRIA,
      RangoAcademico.CANDIDATO_DE_DOCTORADO,
      RangoAcademico.CANDIDATO_DE_MAESTRIA,
      RangoAcademico.INVESTIGADOR_POSDOCTORAL,
      RangoAcademico.PROFESOR,
      RangoAcademico.PROFESOR_ASISTENTE,
      RangoAcademico.PROFESOR_ASOCIADO,
    ],
    {
      invalid_type_error: `La categoria debe ser uno de :${Object.values(
        RangoAcademico
      ).join(", ")}`,
    }
  ),
});

const StduentSchema = z.object({
  user_id: z.string(),
  ci: z
    .string()
    .trim()
    .refine(
      (data) => {
        return validateCi(data);
      },
      { message: "Formato del carnet de indentidad no valdio" }
    ),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El nombre debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el nombre separadas por un espacio
        const nameParts = data.trim().split(" ");
        return (
          nameParts.length <= 2 && nameParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "El nombre debe consistir en máximo dos cadenas de texto separadas por un espacio.",
      }
    ),
  lastname: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El apellido debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el apellido separadas por un espacio
        const apellidoParts = data.trim().split(" ");
        return (
          apellidoParts.length <= 2 &&
          apellidoParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "Los apellidos deben ser máximo dos cadenas de texto separadas por un espacio.",
      }
    ),

  email: z
    .string()
    .trim()
    .refine((data) => emailRegex.test(data), {
      message: "El formato del correo electrónico no es válido.",
    }),
  phone: z
    .string()
    .trim()
    .refine((data) => phoneRegex.test(data), {
      message: "El número de teléfono debe contener exactamente 8 dígitos.",
    }),
  address: z
    .string()
    .trim()
    .refine((data) => data.length > 10, {
      message: "La direccion debe ser mas descriptiva",
    }),
  sex: z.enum([Sex.Female, Sex.Male], {
    invalid_type_error: `Sexo debe ser uno de ${Object.values(Sex).join(",")}`,
  }),
  language_certificate: z.boolean({
    invalid_type_error: "certificacion must be a boolean value",
  }),
});

export const validateProfesorData = (data: unknown) => {
  // Use safeParse to validate the data against the schema
  const validationResult = ProfesorSchema.safeParse(data);

  // Check if validation was successful
  if (validationResult.success) {
    // The data is valid, you can proceed to create the professor
    return { isValid: true, data: validationResult.data };
  } else {
    // The data is invalid, extract and handle the errors
    const errors = validationResult.error.errors;
    const fieldErrors: Record<string, string[]> = {};

    // Iterate through errors and extract error messages for each field
    errors.forEach((error) => {
      const path = error.path.join(".");
      const message = error.message;

      // If the field doesn't have an array of errors yet, initialize it
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }

      // Add the error message to the array of errors for the field
      fieldErrors[path].push(message);
    });

    return { isValid: false, errors: fieldErrors };
  }
};

export const validateStudentData = (data: unknown) => {
  // Use safeParse to validate the data against the schema
  const validationResult = StduentSchema.safeParse(data);

  // Check if validation was successful
  if (validationResult.success) {
    // The data is valid, you can proceed to create the professor
    return { isValid: true, data: validationResult.data };
  } else {
    // The data is invalid, extract and handle the errors
    const errors = validationResult.error.errors;
    const fieldErrors: Record<string, string[]> = {};

    // Iterate through errors and extract error messages for each field
    errors.forEach((error) => {
      const path = error.path.join(".");
      const message = error.message;

      // If the field doesn't have an array of errors yet, initialize it
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }

      // Add the error message to the array of errors for the field
      fieldErrors[path].push(message);
    });

    return { isValid: false, errors: fieldErrors };
  }
};
