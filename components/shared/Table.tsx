import { TableProps } from "@/types";
import { convertObjectToKeyValuePairs } from "@/lib/utils";

const Table = ({ data, className }: TableProps) => {
  const convertedData = convertObjectToKeyValuePairs(data);

  const insertValue = (value: string | number | boolean) => {
    if (typeof value === "boolean") return value ? "Так" : "Ні";
    return value;
  };

  return (
    <table className={`shadow-default ${className}`}>
      <tbody>
        {convertedData?.map((item) => (
          <tr
            key={item.key}
            className="border-b-[1px] last:border-b-0 border-dark-primary dark:border-white"
          >
            <td className="p-2 border-r-[1px] border-dark-primary bg-light-primary text-white tracking-wide dark:bg-dark-secondary-gradient">
              {item.value.key}
            </td>
            <td className="p-2 text-center dark:text-white">
              {insertValue(item.value.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
