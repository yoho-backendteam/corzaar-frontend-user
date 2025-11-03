type CourseProgressCardProps = {
  title: string;
  lastAttended: string;
  sectionsCompleted: number;
  totalSections: number;
  progress: number;
  lastAccessed: string;
  eligible: boolean;
};

export const CourseProgressCard = ({
  title,
  lastAttended,
  sectionsCompleted,
  totalSections,
  progress,
  lastAccessed,
  eligible,
}: CourseProgressCardProps) => {
  const progressPercent = Math.min(progress, 100);

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-4 w-full  border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-md ${
            progressPercent >= 90
              ? "bg-[#68D391] text-black"
              : "bg-[#FFDD00] text-black"
          }`}
        >
          {progressPercent.toFixed(1)}%
        </span>
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Last Attended: {lastAttended}</p>
      <p className="text-xs text-gray-400">Last accessed {lastAccessed}</p>
      </div>

      <div className="mt-5">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#707070] h-2 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
         <p className="text-xs text-gray-500 mt-1">
          {sectionsCompleted} / {totalSections} Sections
        </p>
         {eligible && (
          <button className="text-[#00A63E] text-sm font-medium hover:underline">
            Eligible for Certificate
          </button>
        )}
      </div>

    </div>
  );
};
