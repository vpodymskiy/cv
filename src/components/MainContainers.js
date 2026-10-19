import { CompleteInformation } from "../CompleteInformation";
import { ShortInformation } from "./ShortInformation";

export const MainContainers = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8 w-full mx-auto px-4 sm:px-8 pt-20 lg:pt-24 pb-16">
      <ShortInformation />
      <CompleteInformation />
    </div>
  );
};
