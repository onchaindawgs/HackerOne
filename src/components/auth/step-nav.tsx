interface StepNavProps {
  currentStep: number;
}

export function StepNav({ currentStep }: StepNavProps) {
  const steps = [
    { number: 1, title: "YOUR INFO", subtitle: "Personal Info" },
    { number: 2, title: "PROFESSIONAL", subtitle: "Work Details" },
    { number: 3, title: "SKILLS", subtitle: "Experience" },
    { number: 4, title: "PREFERENCES", subtitle: "Work Style" },
  ];

  return (
    <div className="flex flex-col gap-6 bg-[#4F46E5] text-white p-8 rounded-lg min-h-[600px] relative overflow-hidden">
      {steps.map((step) => (
        <div key={step.number} className="relative z-10 flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
              ${currentStep === step.number ? "bg-white text-[#4F46E5]" : "text-white"}`}
          >
            {step.number}
          </div>
          <div>
            <div className="text-sm opacity-80">STEP {step.number}</div>
            <div className="font-bold">{step.title}</div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-[#6366F1] to-[#4F46E5] rounded-[100%] translate-y-1/2" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-32 left-0 w-24 h-24 bg-[#818CF8] rounded-full -translate-x-1/2 opacity-30" />
    </div>
  );
}

export default StepNav;
