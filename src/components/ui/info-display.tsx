import React, { useEffect, useRef } from "react";
import "../../css/infoDisplay.css";
import { useCity } from "../../contexts/city-context";

const InfoDisplay = () => {
  const infoDivRef = useRef<HTMLDivElement | null>(null);

  const { setInfoDiv } = useCity();

  useEffect(() => {
    if (!infoDivRef.current) return;

    setInfoDiv(infoDivRef.current);
  }, [infoDivRef.current]);

  return (
    <>
      <div className="info-container">
        <p className="heading">Info</p>

        <div className="info-div" ref={infoDivRef}>
          {/* info goes here */}
        </div>
      </div>
    </>
  );
};

export default InfoDisplay;
