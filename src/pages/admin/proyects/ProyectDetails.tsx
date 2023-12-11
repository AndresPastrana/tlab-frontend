import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ProyectDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  // TODO: load the info of the  project
  // const { token, user } = useAuth();
  return (
    <div>
      <div>
        <ul>
          <h1>Detalles</h1>
          {/* Required */}
          <li>Topic</li>
          <li>Scientific problem</li>
          <li>General target</li>
          <li>Status</li>

          {/* Migth be null */}
          <li>student</li>
          <li>Tutors</li>
          <li>Approval info</li>

          {/* Editable if proyect is not aproved and the user role is student */}
          {/*Functional requirements  */}

          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default ProyectDetails;
