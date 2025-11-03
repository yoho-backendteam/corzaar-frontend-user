import tick from "../../../../../assets/profile/icons/tick.png"
export const Password = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
      <h2 className="text-base font-semibold mb-2">Password & Security</h2>
      <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
        <span><img src={tick} alt="" /></span> Change Password
      </button>
    </div>
  );
};
