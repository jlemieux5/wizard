import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

const mockFetchCall = () => {
  return new Promise((r) => setTimeout(r, 2000));
};

function StepOne({ nextClicked, onComplete }) {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    if (nextClicked) {
      const mockCall = async () => {
        await mockFetchCall();
        onComplete({
          stepOne: { name, desc },
        });
      };

      mockCall();
    }
  }, [desc, name, nextClicked, onComplete]);

  return (
    <div>
      <form>
        <h2>Enter Details: </h2>
        <label htmlFor='nameInput'>Name: </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id='nameInput'
          style={{ marginBottom: '10px' }}
          maxLength={63}
        />
        <label htmlFor='descInput'>Description: </label>
        <TextArea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id='descInput'
          rows={4}
        />
      </form>
    </div>
  );
}

export default StepOne;
