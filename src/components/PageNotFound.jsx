/** Author : JAINAM SHAH
 */
import React from "react";
import pagenotfound from "../Assests/Images/pagenotfound.png";

function PageNotFound() {
  return (
    <div>
      <img
        alt="page not found"
        src={pagenotfound}
        style={{ width: "30%", margin: "80px 0 0 35%" }}
      ></img>
    </div>
  );
}

export default PageNotFound;
