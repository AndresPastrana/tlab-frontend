import React from "react";

const FlexinputContainer = ({ children }: { children: React.ReactNode }) => {
  const modifyChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === "div") {
        // If the child is a div, add the specified className
        return React.cloneElement(child as React.ReactElement, {
          className: `${
            (child as React.ReactElement).props.className
          } flex flex-col basis-full`,
        });
      }
      // If the child is not a div, return it as is
      return child;
    });
  };

  // Modify children before rendering
  const modifiedChildren = modifyChildren();

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5">
      {modifiedChildren}
    </div>
  );
};

export default FlexinputContainer;
