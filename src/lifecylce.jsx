import React, { useEffect, useState } from 'react';

const Lifecylce = (props) => {
  const [isVisbel, setIsVisble] = useState(false);
  const toggle = () => setIsVisble(!isVisbel);

  return (
    <>
      <div>
        <button onClick={toggle}>보여지기</button>
      </div>
    </>
  );
};

export default Lifecylce;
