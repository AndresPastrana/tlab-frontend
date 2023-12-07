import { PlusIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Create = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      to={href}
      className="flex h-10 items-center rounded-lg bg-green-800 px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{text}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};
export const SaveProfesor = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <button
      aria-disabled={isLoading}
      disabled={isLoading}
      type="submit"
      className="min-w-[150px] w-full sm:w-fit btn btn-md  bg-green-700 text-neutral-100 hover:bg-green-800"
    >
      {isLoading ? (
        <span className="loading loading-spinner text-gray-100"></span>
      ) : (
        "Save"
      )}
    </button>
  );
};

export const Cancel = ({ href }: { href: string }) => {
  return (
    <Link to={href}>
      <button className="min-w-[150px] btn btn-md">Cancel</button>
    </Link>
  );
};

export const Edit = ({ href }: { href: string }) => {
  return (
    <Link to={href}>
      <button className="btn btn-square bg-transparent border-none">
        <PencilSquareIcon className="w-6 h-6" />
      </button>
    </Link>
  );
};

export const Delete = ({ id }: { id: string }) => {
  console.log(id);

  const handleDelete = () => {
    // toast("Estas seguro que desea eliminar este profesor ?", {
    //   description:
    //     "Elimminar este prpfesor pued implicar cambios inseperados en el sistema.Un profesor puede estar vinculados a varios estudiantes y eventos",
    //   className: "text-gray-900",
    //   duration: 60000,
    //   actionButtonStyle: {
    //     color: "red",
    //     border: "1px solid red",
    //     background: "none",
    //   },
    //   action: {
    //     label: "Estoy seguro",
    //     // onClick: () => {deleteProfesorById(id)},
    //   },
    //   descriptionClassName: "py-2 ",
    //   cancel: {
    //     label: "Cancelar",
    //   },
    //   icon: <BellAlertIcon />,
    // });
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-square bg-transparent border-none"
    >
      {/* <TrashIcon className="w-6 h-6" /> */}
    </button>
  );
};
// function toast(
//   arg0: string,
//   arg1: {
//     description: string;
//     className: string;
//     duration: number;
//     actionButtonStyle: { color: string; border: string; background: string };
//     action: { label: string; onClick: () => any };
//     descriptionClassName: string;
//     cancel: { label: string };
//     icon: React.JSX.Element;
//   }
// ) {
//   throw new Error("Function not implemented.");
// }
