import { useSelector } from "react-redux";

import StepIndicator from "../../../../ui/StepIndicator";
import UserInformation from "./UserInfo/UserInformation";
import AddressInformation from "./addressInfo/AddressInformation";
import CardInformation from "./cardInfo/CardInformation";
import Approve from "./Approve";

function Order() {
  const { current } = useSelector((state) => state.orderStepper);
  function renderStep() {
    if (current === 0) return <UserInformation />;
    if (current === 1) return <AddressInformation />;
    if (current === 2) return <CardInformation />;
    if (current === 3) return <Approve />;
  }
  return (
    <div className="container">
      <StepIndicator />
      <div className="max-w-5xl mx-auto  p-10 ">{renderStep()}</div>
    </div>
  );
}

export default Order;
