import { Button, Modal } from 'antd';
import React from 'react';
import {
  COMPLETE_STEP,
  LOAD_NEXT_STEP,
  useWizard,
} from '../state/hooks/use-wizard';

function WizardContent({
  children,
  onComplete,
  onCancel,
  completeText = 'Complete',
  nextStepText = 'Next Step',
}) {
  const { state, dispatch } = useWizard();

  const currentStep = state.wizardIndex;
  const isLastStep = currentStep === children.length - 1;

  const nextStep = () => {
    if (currentStep + 1 === children.length) {
      onComplete(state.formState);
      return;
    }
    dispatch({ type: LOAD_NEXT_STEP });
  };

  const handleCompleteStep = (stepState) => {
    dispatch({ type: COMPLETE_STEP, payload: stepState });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        open={true}
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            loading={state.isLoading}
            onClick={nextStep}
          >
            {isLastStep ? completeText : nextStepText}
          </Button>,
        ]}
      >
        {React.cloneElement(children[currentStep], {
          nextClicked: state.isLoading,
          onComplete: handleCompleteStep,
        })}
      </Modal>
    </>
  );
}

export default WizardContent;
