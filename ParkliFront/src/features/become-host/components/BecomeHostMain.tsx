import { useBecomeHost } from "../hooks/useBecomeHost";
import { ProgressTracker } from "./progressTracker";
import { Step1 } from "./step1";


function BecomeHostMain(){
    const {step,setStep} = useBecomeHost();
    return (
        <div>
            {step === 1 && <Step1/>}
            {step === 2 && <Step2/>}
            {step === 3 && <Step3/>}
            {step === 4 && <Step4/>}
            {step === 5 && <Step5/>}
        </div>
    );
}

export default BecomeHostMain