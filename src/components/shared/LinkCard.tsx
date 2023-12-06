import { Link } from "react-router-dom";
export type LinkCardItem = {
  src: string;
  title: string;
  text: string;
  href: string;
};
const LinkCard = ({ card_item }: { card_item: LinkCardItem }) => {
  const { href, src, title, text } = card_item;
  return (
    <Link to={href}>
      <div className=" sm:min-h-[300px] hover:bg-neutral hover:shadow-none hover:bg-opacity-90 hover:border-transparent hover:text-neutral-50 transition-all ease-in-out delay-100 my-7 card card-side bg-base-100 shadow-xl flex flex-col sm:flex sm:flex-row">
        <figure>
          <img
            className="w-72 h-72 sm:w-80 sm:h-80 max-w-[320px] max-h-[320px]  object-cover"
            src={src}
            alt="Imagen describiendo el link"
          />
        </figure>
        <div className="card-body sm:gap-5">
          <h2 className="card-title">{title}</h2>
          <p className="leading-5">{text}</p>
          {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div> */}
        </div>
      </div>
    </Link>
  );
};
export default LinkCard;
