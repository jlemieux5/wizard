import { useState } from 'react';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';
import { Button } from 'antd';
import { Wizard } from './state/hooks/use-wizard';
import './App.css';

function App() {
  const [showWizard, setShowWizard] = useState(false);

  const completeForm = (state) => {
    // Do something with state here e.g backend call
    setShowWizard(false);
  };

  const handleCancel = () => {
    setShowWizard(false);
  };

  return (
    <div>
      <h1>Wizard Example</h1>
      <Button type='primary' onClick={() => setShowWizard(true)}>
        You're a Wizard Harry
      </Button>
      {showWizard && (
        <Wizard onComplete={completeForm} onCancel={handleCancel}>
          <StepOne />
          <StepTwo />
          <StepThree />
        </Wizard>
      )}
    </div>
  );
}

export default App;
