import { createContext, useContext, useReducer } from 'react';
import WizardContent from '../../components/WizardContent';

const WizardContext = createContext(null);
export const LOAD_NEXT_STEP = 'loadNextStep';
export const COMPLETE_STEP = 'completeStep';
export const RESET = 'rest';

export function Wizard({ children, onCancel, onComplete }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const handleCancel = () => {
    onCancel();
  };

  const handleComplete = (state) => {
    onComplete(state);
  };

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      <WizardContent onCancel={handleCancel} onComplete={handleComplete}>
        {children}
      </WizardContent>
    </WizardContext.Provider>
  );
}

export function useWizard() {
  return useContext(WizardContext);
}

function wizardReducer(state, action) {
  switch (action.type) {
    case LOAD_NEXT_STEP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case COMPLETE_STEP: {
      return {
        ...state,
        isLoading: false,
        formState: { ...state.formState, ...action.payload },
        wizardIndex: state.wizardIndex + 1,
      };
    }
    case RESET: {
      return initialState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialState = {
  wizardIndex: 0,
  isLoading: false,
  formState: {},
};
