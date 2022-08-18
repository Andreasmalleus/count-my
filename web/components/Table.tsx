interface TableProps {
  data: Record<string, number>;
  filters: string;
}

export const Table = ({ data, filters }: any): JSX.Element => {
  return (
    <table className="bg-white rounded-md shadow-md">
      <thead className="border-b border-slate-200 table table-fixed w-full">
        <tr className="text-xs">
          <th className="text-left py-2 px-1 w-10">#</th>
          <th className="text-left p-2">Word</th>
          <th className="text-center p-2">Count</th>
        </tr>
      </thead>
      <tbody className="max-h-40 overflow-y-auto block" id="scrollbar">
        {Object.keys(data)
          .sort((a: string, b: string) => {
            return data[b] - data[a];
          })
          .filter((key) => !filters.split(",").includes(key))
          .map((key: string, index: number) => {
            return (
              <tr key={key} className="text-xs table table-fixed w-full">
                <th className="text-left py-3 px-1 w-10">{index}</th>
                <th className="text-left py-3 px-2">{key}</th>
                <th className="text-center py-3 px-2">{data[key]}</th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
