import { AppTypes } from "../../const";

const SelectAppType = () => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="app_type">Selecciona el tipo de software</label>
      <select
        defaultValue={AppTypes.WEB_APPLICATION}
        className="select select-bordered select-text"
        name="app_type"
        id=""
      >
        {Object.values(AppTypes).map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectAppType;
