import { BellAlertIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "sonner";
export const Create = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      to={href}
      className="flex h-10 items-center rounded-lg bg-green-800 px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{text}</span>
      <PlusIcon className="h-5 w-5  md:ml-4" />
    </Link>
  );
};
export const Save = ({ isLoading }: { isLoading: boolean }) => {
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
      <button
        className="tooltip btn btn-square bg-transparent border-none flex items-center justify-center shadow-none"
        data-tip="Editar estudiante"
      >
        <PencilSquareIcon className="w-5 h-5" />
      </button>
    </Link>
  );
};

export const Historial = ({ href }: { href: string }) => {
  return (
    <Link to={href}>
      <button
        className="tooltip btn btn-square bg-transparent border-none flex items-center justify-center shadow-none"
        data-tip="Ver historial"
      >
        <ClockIcon className="w-5 h-5" />
      </button>
    </Link>
  );
};

export const Delete = ({
  handleDeletebyHook,
}: {
  handleDeletebyHook: () => void;
}) => {
  const handleDelete = () => {
    toast("Estas seguro que desea dar de baja a este estudiante ?", {
      description:
        "Un estudinate puede estra vinculado aun a procesos de su tarabjo de diploma . ",
      className: "text-gray-900",
      duration: 60000,
      actionButtonStyle: {
        color: "red",
        border: "1px solid red",
        background: "none",
      },
      action: {
        label: "Estoy seguro",

        onClick: handleDeletebyHook,
      },
      descriptionClassName: "py-2 ",
      cancel: {
        label: "Cancelar",
      },
      icon: <BellAlertIcon />,
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-square bg-transparent border-none shadow-none"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};
