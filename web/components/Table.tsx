import { useState } from "react";

interface TableProps {
  data: Record<string, number>;
  filter: (t: string) => boolean;
  editKey: (key: string, newKey: string) => void;
}

export const Table = ({ data, filter, editKey }: TableProps): JSX.Element => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const applyEdit = (index: number, key: string) => {
    const inputValue = (
      document.getElementById("input" + index) as HTMLInputElement
    ).value;
    editKey(key, inputValue);
    setEditIndex(null);
  };

  return (
    <table className="bg-white rounded-md shadow-md">
      <thead className="border-b border-slate-200 table table-fixed w-full">
        <tr className="text-xs font-medium">
          <th className="text-left py-2 px-1 w-10">#</th>
          <th className="text-left p-2">Word</th>
          <th className="text-center p-2 w-40">Count</th>
        </tr>
      </thead>
      <tbody className="max-h-40 overflow-y-auto block" id="scrollbar">
        {Object.keys(data)
          //descending order
          .sort((a: string, b: string) => {
            return data[b] - data[a];
          })
          //apply filters
          .filter(filter)
          .map((key: string, index: number) => {
            return (
              <tr key={key} className="text-xs table table-fixed w-full group">
                <th className="text-left py-3 px-1 w-10">{index}</th>
                {/* If index is set the show input */}
                {editIndex === index ? (
                  <th className="text-left py-2 px-2 font-medium flex justify-between">
                    <input
                      type="text"
                      className=" w-full py-1"
                      defaultValue={key}
                      id={"input" + index}
                      autoFocus
                    />
                  </th>
                ) : (
                  <th className="text-left py-2 px-2 font-medium">
                    <div className="w-full">{key}</div>
                  </th>
                )}

                <th className="text-center py-3 px-2 relative w-40">
                  {data[key]}
                  {/* Show buttons depending on the state of editIndex */}
                  {editIndex === index ? (
                    <button
                      onClick={() => applyEdit(index, key)}
                      className="btn-secondary  h-2/3 absolute top-0 right-0 bottom-0 m-auto mr-2"
                    >
                      apply
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditIndex(index)}
                      className="hidden btn-secondary h-2/3 group-hover:block absolute top-0 right-0 bottom-0 m-auto mr-2"
                    >
                      edit
                    </button>
                  )}
                </th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
