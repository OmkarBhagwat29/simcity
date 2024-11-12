import "../../css/infoDisplay.css";
import { FC, ReactNode } from "react";
interface InfoDisplayProps {
  children?: ReactNode;
}
const InfoDisplay: FC<InfoDisplayProps> = ({ children }) => {
  return (
    <>
      <div className="info-container">
        <p className="heading">Info</p>

        <div className="info-div"> {children}</div>
      </div>
    </>
  );
};

export default InfoDisplay;
