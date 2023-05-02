import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';

function StepTwo({ nextClicked, onComplete }) {
  const [checkState, setCheckState] = useState([]);
  const options = [
    { label: 'This is the first feature', value: 'first' },
    { label: 'This is the second feature', value: 'second' },
    { label: 'This is the third feature', value: 'third' },
  ];

  useEffect(() => {
    if (nextClicked) {
      onComplete({
        stepTwo: checkState,
      });
    }
  }, [checkState, nextClicked, onComplete]);

  const handleChange = (e) => {
    const state = e.map((item) => {
      return options.filter((option) => option.value === item)[0];
    });

    setCheckState(state);
  };

  return (
    <div>
      <h2>Select Features</h2>
      <Checkbox.Group
        options={options}
        onChange={(e) => handleChange(e)}
      ></Checkbox.Group>
    </div>
  );
}

export default StepTwo;
