import useAcademicRank from "../../../hooks/useAcademicRank";
import { capitalizeFirstLetterOfEachWord } from "../../../utils/others";

const AcademicRankSelect = ({
  selected,
}: {
  selected?: string | undefined;
}) => {
  const { academicRanks, isLoading, error } = useAcademicRank();
  console.log("Seleccionado : ", selected);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
      <label className=" " htmlFor="categoria">
        Categoria Docente
      </label>
      <select
        name="categoria"
        id="categoria"
        className="select select-bordered w-full  focus:outline-green-700 focus:outline-2 focus:border-none  max-w-full sm:max-w-lg"
      >
        <option disabled defaultChecked={!selected}>
          Seleciona la Categoria Cientifica
        </option>
        {!error &&
          !isLoading &&
          academicRanks &&
          academicRanks.map((r) => {
            console.log(selected === r.id);

            return (
              <option selected={selected === r.id} key={r.id} value={r.id}>
                {capitalizeFirstLetterOfEachWord(r.rank)}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default AcademicRankSelect;
