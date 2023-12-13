import { TesisProjectStatus, UserRole } from "../../const";
import { useAuth } from "../../hooks/useAuth";
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
  const { user } = useAuth();
  const { updateFrequirements, projects } = useProjectInfo(true);
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

      {/* Allow to add new or edit FR if the project has been not aproved and if the loged user is a studnent */}
      {status === TesisProjectStatus.Pending &&
        user?.role === UserRole.Student && (
          <DynamicTextInputs
            onSubmit={updateFr}
            initialInputs={functionalRequirements}
            onInputsChange={handleRequirementsChange}
          />
        )}
      {/* Just show the fr if the user is diferent from a student */}
      {user?.role !== UserRole.Student && (
        <ul>
          {functionalRequirements.map((requirement, index) => (
            <li key={index} className="text-gray-700">
              {requirement}
            </li>
          ))}
        </ul>
      )}

      {/* Approval Button */}
    </div>
  );
};
