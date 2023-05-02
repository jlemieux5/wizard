import { Checkbox } from 'antd';
import { useWizard } from '../state/hooks/use-wizard';

function StepThree() {
  const { state } = useWizard();
  const { stepOne, stepTwo } = state.formState;
  const checkedValues = stepTwo.map((item) => item.value);

  return (
    <div>
      <h2>Summary</h2>
      <p>
        <strong>Name:</strong> {stepOne.name}
      </p>
      <p>
        <strong>Description:</strong> {stepOne.desc}
      </p>
      <strong>Features Selected: </strong>
      {checkedValues.length ? (
        <Checkbox.Group
          disabled={true}
          options={stepTwo}
          value={checkedValues}
        ></Checkbox.Group>
      ) : (
        <p>You have no features selected </p>
      )}
    </div>
  );
}

export default StepThree;
