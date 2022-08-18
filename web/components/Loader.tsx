import ClipLoader from "react-spinners/ClipLoader";

export const Loader = (): JSX.Element => {
  return (
    <div className="flex justify-center w-full mt-4">
      <div className="bg-white text-xs p-2 rounded-md shadow-md flex items-center">
        <div className="mr-1">Loading...</div>
        <ClipLoader size={12} />
      </div>
    </div>
  );
};
