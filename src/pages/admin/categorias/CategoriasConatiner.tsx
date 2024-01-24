import { useState } from "react";
import AcademicRanksComponent from "./AcademicRank";
import ProdfesorsByCategory from "./ProdfesorsByCategory";

const CategoriasConatiner = () => {
  const [activeCategory, setactiveCategory] = useState<string | null>(null);
  return (
    <div className="flex flex-col md:flex-row justify-start gap-4">
      <AcademicRanksComponent
        setactiveCategory={setactiveCategory}
        activecategory={activeCategory}
      />
      <ProdfesorsByCategory activeCategory={activeCategory} />
    </div>
  );
};

export default CategoriasConatiner;
