import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
  useEffect(() => {
    console.log('mount');

    return () => {
      // unmount 호출 할 때
      console.log('unmount');
    };
  }, []);

  return <div>unmount 될 때</div>;
};

const Lifecylce = (props) => {
  const [isVisbel, setIsVisble] = useState(false);
  const toggle = () => setIsVisble(!isVisbel);

  return (
    <>
      <div>
        <button onClick={toggle}>보여지기</button>
        {isVisbel && <UnmountTest />}
      </div>
    </>
  );
};

export default Lifecylce;
