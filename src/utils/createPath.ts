export function constructPath(envVariables: string[]) {
  // Check if the provided argument is an array
  if (!Array.isArray(envVariables)) {
    throw new Error("Input must be an array of environment variables");
  }

  // Remove "VITE_" prefix and construct the path
  const path = envVariables
    .map((variable) => import.meta.env[variable.replace(/^VITE_/, "")])
    .join("");

  return path;
}
