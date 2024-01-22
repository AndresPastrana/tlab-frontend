import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="divider"></div>
      <footer className="footer p-10  text-base-content">
        <aside>
          <p className="text-green-900 text-sm font-medium">
            <img
             
              src="https://moodle.upr.edu.cu/pluginfile.php/2/course/section/2/UPR_Present.PNG"
              alt="UPR"
              className=""
            />
            {/* <img
              src="../../public/img/logo-upr.png"
              alt="Logo UPR"
              className="w-48 h-24 mb-3"
            /> */}
            Universidad de Pinar del Río Hermanos Saiz Montes de Oca
            <br />
            Fundada desde 20 de agosto de 1972
          </p>
        </aside>
        <nav>
          <header className="footer-title">Servicios</header>
          <Link
            target="_blank"
            to={"http://moodle.upr.edu.cu/"}
            className="text-green-900 font-medium link link-hover"
          >
            Moodle
          </Link>
          <Link
            target="_blank"
            to={"https://noticias.upr.edu.cu/"}
            className="text-green-900 font-medium link link-hover"
          >
            Noticias
          </Link>

          <Link
            target="_blank"
            to={"https://correo.upr.edu.cu/"}
            className="text-green-900 font-medium link link-hover"
          >
            Correo
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Redes Sociales</header>
          <Link
            target="_blank"
            to={"https://www.facebook.com/UPRCuba/"}
            className="text-green-900 font-medium link link-hover"
          >
            Facebook
          </Link>
          <Link
            target="_blank"
            to={"https://t.me/CanalUprCuba"}
            className="text-green-900 font-medium link link-hover"
          >
            Telegram
          </Link>
          <Link
            target="_blank"
            to={"https://twitter.com/upr_cuba"}
            className="text-green-900 font-medium link link-hover"
          >
            Twitter
          </Link>
        </nav>
        <nav>
          <header className="footer-title">De Interes</header>
          <Link
            to={"http://www.mes.gob.cu/"}
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Ministerio de Educación Superior
          </Link>
          <Link
            to={"https://www.ecured.cu/EcuRed:Enciclopedia_cubana"}
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Ecured
          </Link>
          <Link
            to={"http://www.cubadebate.cu/ "}
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Cubadebate
          </Link>
          <Link
            to={
              "http://www.unavarra.es/relacionesinternacionales/erasmus-paises-asociados "
            }
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Programa Erasmus
          </Link>
          <Link
            to={"http://mipyme.upr.edu.cu/"}
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Consultores UPR S.U.R.L
          </Link>

          <Link
            to={"https://galeria.upr.edu.cu/"}
            target="_blank"
            className="text-green-900 font-medium link link-hover"
          >
            Galería 50 Aniversario por la Excelencia
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
