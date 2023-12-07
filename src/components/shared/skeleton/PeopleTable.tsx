const SkeletonSmCard = () => {
  return (
    <div className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100 mb-4 p-4 my-3">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col basis-1/2 gap-1">
            <div className="skeleton w-32 h-5"></div>
            <div className="skeleton w-40 h-5"></div>
          </div>
          <div className="flex flex-col basis-1/2 justify-center">
            <div className="skeleton w-full h-5"></div>
          </div>
        </div>
        <div className="divider my-3"></div>
        <div className="flex justify-between">
          <span className="flex flex-col justify-center">
            <div className="skeleton w-32 h-5"></div>
          </span>

          <span className="flex flex-row items-center gap-1"></span>
        </div>
      </div>
    </div>
  );
};

const SkeletonSm = () => {
  return (
    <div className="lg:hidden w-full mt-5 p-4 bg-gray-100 rounded-md">
      <SkeletonSmCard />
      <SkeletonSmCard />
      <SkeletonSmCard />
      <SkeletonSmCard />
    </div>
  );
};

const PeopleTableSkeleton = () => {
  return (
    <>
      <SkeletonSm />
    </>
  );
};

export default PeopleTableSkeleton;
