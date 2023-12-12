import { TesisProjectStatus, UserRole } from "../../const";
import { useProjectInfo } from "../../hooks/useProjectInfo";
import DynamicTextInputs from "../shared/DynamicTextInputs";

interface FunctionalRequirementsProps {
  status: TesisProjectStatus;
  functionalRequirements: string[];
  onUpdateRequirements: (newRequirements: string[]) => void;
}

export const FunctionalRequirements: React.FC<FunctionalRequirementsProps> = ({
  functionalRequirements,
  onUpdateRequirements,
  status,
}) => {
  const { updateFrequirements, projects } = useProjectInfo(
    true,
    UserRole.Student
  );
  const projectId = !Array.isArray(projects) ? projects.id : "";

  const handleRequirementsChange = (newRequirements: string[]) => {
    onUpdateRequirements(newRequirements);
  };

  const updateFr = async (fr: string[]) => {
    try {
      await updateFrequirements(projectId, fr);
      console.log("all ok");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Functional Requirements:</h3>

      {/* Allow to add new or edit FR if the project has been not aproved  */}
      {status === TesisProjectStatus.Pending && (
        <DynamicTextInputs
          onSubmit={updateFr}
          initialInputs={functionalRequirements}
          onInputsChange={handleRequirementsChange}
        />
      )}

      {/* {status !== TesisProjectStatus.Pending && (
          <div>
            <h3 className="text-lg font-bold mb-2">Functional Requirements:</h3>
            {functionalRequirements.map((requirement, index) => (
              <p key={index} className="text-gray-700">
                {requirement}
              </p>
            ))}
          </div>
        )} */}
    </div>
  );
};
