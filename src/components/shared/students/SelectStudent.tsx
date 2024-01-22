import { useStudents } from "../../../hooks/useStudents";

const SelectStudent = () => {
  const { students, isLoading, error } = useStudents();
  return (
    <div className="sm:basis-4/12 lg:basis-4/12   flex flex-col gap-1 max-w-2xl">
      <label htmlFor="student" className="text-sm">
        Estudiante asignado al proyecto
      </label>
      <select
        name="selectedStudent"
        id="student"
        className="select select-bordered w-full"
      >
        <option disabled selected>
          Seleciona un estudiante
        </option>

        {/* Loading */}
        {isLoading && !error && students.length === 0 && (
          <p>Loading Students</p>
        )}

        {/* Error */}

        {!isLoading && error && <p>Error cargarndo los estudiantes</p>}
        {!isLoading &&
          !error &&
          students.length > 0 &&
          students.map((student) => {
            return (
              <option key={student.id} value={student.id}>
                {student.name} {student.lastname}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectStudent;
