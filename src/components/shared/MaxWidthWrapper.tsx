import { ReactNode } from "react";

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-8">
      <div className="mx-auto p-2 max-w-md sm:max-w-xl sm:p-4 md:max-w-[760px] lg:max-w-[1000px]">
        {children}
      </div>
    </div>
  );
};

export default MaxWidthWrapper;
