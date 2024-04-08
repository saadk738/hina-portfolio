import React from "react";

import './FloatingDiv.css'


const FloatinDiv = ({img, text1, text2, imgWidth}) => {
  return (
    // darkMode
    <div className="floatingDiv">
      <img src={img} alt="" width={imgWidth} />
      <span>
        {text1}
        <br/>
        {text2}
      </span>
    </div>
  );
};

export default FloatinDiv;
