import LinkCard, { LinkCardItem } from "./LinkCard";

const cardItems: Array<LinkCardItem> = [
  {
    src: "/img/estudiantes2.jpg",
    title: "Gestión de Estudiantes",
    text: "Esta sección te permite gestionar de manera eficiente la información completa de los estudiantes en el sistema ",
    href: "/admin/personas/students",
  },
  {
    src: "/img/taller.jpg",
    title: "Profesores",
    text: "dentro de la seccion estudiante podra blaa bla bla,dentro de la seccion estudiante podra blaa bla bla",
    href: "/admin/personas/profesors",
  },
  // {
  //   src: "/img/taller.jpg",
  //   title: "Tribunales",
  //   text: "dentro de la seccion estudiante podra blaa bla bla,dentro de la seccion estudiante podra blaa bla bla",
  //   href: "/dashboard/personas/tribunales",
  // },
];

const Cards = () => {
  return (
    <section>
      {cardItems.map((item) => {
        return (
          <LinkCard key={`card-${item.href}${Date.now()}`} card_item={item} />
        );
      })}
    </section>
  );
};

export default Cards;
