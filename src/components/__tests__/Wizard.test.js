import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wizard, useWizard } from '../../state/hooks/use-wizard';

const MockStepOne = ({ nextClicked, onComplete }) => {
  React.useEffect(() => {
    if (nextClicked) {
      onComplete({ stepOne: 'some data' });
    }
  });

  return <input />;
};

const MockStepTwo = ({ nextClicked, onComplete }) => {
  const { state } = useWizard();
  React.useEffect(() => {
    if (nextClicked) {
      onComplete();
    }
  });

  return <p>Hello World {state.formState.stepOne}</p>;
};

test('Wizard', async () => {
  const handleSubmit = jest.fn();
  const handleCancel = jest.fn();

  render(
    <Wizard onCancel={handleCancel} onComplete={handleSubmit}>
      <MockStepOne />
      <MockStepTwo />
    </Wizard>
  );
  // screen.debug();
  const closeButton = screen.getByRole('button', {
    name: /close/i,
  });

  await userEvent.click(closeButton);
  expect(handleCancel).toBeCalledTimes(1);

  const stepOne = screen.getByRole('textbox');
  expect(stepOne).toBeTruthy();
  let stepTwo = screen.queryByText(/hello world some data/i);
  expect(stepTwo).toBeNull();

  const nextButton = screen.getByRole('button', { name: /next step/i });
  let completeButton = screen.queryByRole('button', { name: /complete/i });
  expect(completeButton).toBeNull();
  await userEvent.click(nextButton);
  stepTwo = screen.queryByText(/hello world/i);
  expect(stepTwo).toBeInTheDocument();

  completeButton = screen.queryByRole('button', { name: /complete/i });
  userEvent.click(completeButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({ stepOne: 'some data' });
});
