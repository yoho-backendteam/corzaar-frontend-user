import { COLORS } from "../../../../Constants/uiconstants";

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
    <div
      className=" rounded-2xl shadow p-5 mb-4 w-full "
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-md `}
          style={{
            backgroundColor:
              progressPercent >= 90
                ? COLORS.secondary_green
                : COLORS.primary_yellow,
            color: COLORS.primary_black,
          }}
        >
          {progressPercent.toFixed(1)}%
        </span>
      </div>

      <div className="flex justify-between">
        <p className="text-sm " style={{ color: COLORS.primary_gray }}>
          Last Attended: {lastAttended}
        </p>
        <p className="text-xs " style={{ color: COLORS.primary_gray }}>
          Last accessed {lastAccessed}
        </p>
      </div>

      <div className="mt-5">
        <div
          className="w-full  rounded-full h-2"
          style={{ backgroundColor: `${COLORS.secondary_gray}` }}
        >
          <div
            className=" h-2 rounded-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: COLORS.primary_gray,
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <p className="text-xs  mt-1" style={{ color: COLORS.primary_gray }}>
          {sectionsCompleted} / {totalSections} Sections
        </p>
        {eligible && (
          <button
            className=" text-sm font-medium hover:underline"
            style={{ color: COLORS.secondary_green }}
          >
            Eligible for Certificate
          </button>
        )}
      </div>
    </div>
  );
};
