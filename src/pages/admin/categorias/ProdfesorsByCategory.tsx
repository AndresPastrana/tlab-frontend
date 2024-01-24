import useAcademicRank from "../../../hooks/useAcademicRank";
import { useProfessors } from "../../../hooks/useProfessors";
import { capitalizeFirstLetterOfEachWord } from "../../../utils/others";

const ProdfesorsByCategory = ({
  activeCategory,
}: {
  activeCategory: string | null;
}) => {
  const { professors } = useProfessors();
  const { academicRanks } = useAcademicRank();
  const catInfo = academicRanks?.find((c) => c.id === activeCategory);

  const filteredProfessors =
    (activeCategory &&
      professors.filter((p) => p.academic_rank?.id === activeCategory)) ||
    [];

  return (
    <div className="basis-full md:basis-8/12  md:px-20">
      <h2 className="text-lg font-medium">
        Profesores filtardos por categoria docente{" "}
        {catInfo && (
          <span className="text-gray-500 font-normal">
            {"("} {catInfo.rank} {")"}
          </span>
        )}
      </h2>
      <div className="p-5 md:p-5 flex flex-col bg-gray-50 rounded-lg mt-4">
        {/* No active category */}
        {!activeCategory && (
          <p className="text-gray-500 font-medium m-auto border p-5 rounded-md bg-gray-100">
            ( Seleccione una categoria docente )
          </p>
        )}

        {/* No matche result */}
        {activeCategory && filteredProfessors.length === 0 && (
          <p className="text-gray-500 font-medium m-auto border p-5 rounded-md bg-gray-100">
            No hay Profesores con esta categoria docente
          </p>
        )}

        {/* Profesores */}
        {activeCategory && filteredProfessors.length >= 1 && (
          <div className="mt-5">
            {filteredProfessors.map(({ name, lastname, email }) => {
              return (
                <>
                  <div className="flex justify-between">
                    <p>
                      {capitalizeFirstLetterOfEachWord(name)}{" "}
                      {capitalizeFirstLetterOfEachWord(lastname)}
                    </p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                  <div className="divider"></div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdfesorsByCategory;
