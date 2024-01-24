import LinkCard, { LinkCardItem } from "./LinkCard";

const cardItems: Array<LinkCardItem> = [
  {
    src: "/img/estudiantes2.jpg",
    title: "Gestión de Estudiantes",
    text: "Esta sección te permite gestionar de manera eficiente la información  de los estudiantes en el sistema TesisLab . Desde , agregar nuevos estudiantes de Ingenieria Informatica que se propongan discutir su proyecto de tesis, editar su informacion y dar baja del mismo en caso de que no culminen el proceso",
    href: "/admin/personas/students",
  },
  {
    src: "/img/taller.jpg",
    title: "Profesores",
    text: "Los profesores son una parte fundamental dentro de TesisLab, por tanto , la gestion de su informacion constituye una prioridad para nostros. Haz click aqui ahora para conocer los profesores dentro del Departamento de Informatica",
    href: "/admin/personas/profesors",
  },
  {
    src: "",
    title: "Gestión de Categorias Docentes",
    text: "La seccion de categorias docentes te proporciona la capicidad de organizar y mantener las categorias docentes dentro del sistema",
    href: "/admin/personas/categorias",
  },
];

const Cards = () => {
  return (
    <section className="border rounded-md bg-gray-50 p-5 md:">
      {cardItems.map((item) => {
        return (
          <LinkCard key={`card-${item.href}${Date.now()}`} card_item={item} />
        );
      })}
    </section>
  );
};

export default Cards;
