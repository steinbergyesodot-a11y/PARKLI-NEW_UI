import { useBecomeHost } from "../hooks/useBecomeHost";
import { ProgressTracker } from "./progressTracker";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Step5 } from "./step5";


function BecomeHostMain(){
    const { step, setStep, formData, handleChange, createDriveway } = useBecomeHost();
    return (
        <div>
            {step === 1 && (
                <Step1
                    formData={formData}
                    onChange={handleChange}
                    onContinue={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <Step2
                    formData={formData}
                    onChange={handleChange}
                    onBack={() => setStep(1)}
                    onContinue={() => setStep(3)}
                />
            )}
            {step === 3 && (
                <Step3
                    formData={formData}
                    onChange={handleChange}
                    onBack={() => setStep(2)}
                    onContinue={() => setStep(4)}
                />
            )}
            {step === 4 && (
                <Step4
                    formData={formData}
                    onChange={handleChange}
                    onBack={() => setStep(3)}
                    onContinue={() => setStep(5)}
                />
            )}
            {step === 5 && (
                <Step5
                    formData={formData}
                    onEdit={setStep}
                    onBack={() => setStep(4)}
                    onSubmit={createDriveway}
                />
            )}
        </div>
    );
}

export default BecomeHostMain