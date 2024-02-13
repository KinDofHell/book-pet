import { TableProps } from "@/types";
import { convertObjectToKeyValuePairs } from "@/lib/utils";

const Table = ({ data }: TableProps) => {
  const convertedData = convertObjectToKeyValuePairs(data);

  return (
    <table>
      <tbody>
        {convertedData?.map(({ key, value }, index) => (
          <tr key={index}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
