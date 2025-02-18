import { Link } from "react-router-dom";

export const Warning = ({ value, to, path }: any) => {
  return (
    <div className="flex gap-1">
      <p className="text-xs">{value}</p>
      <Link className="text-xs hover:underline" to={to}>
        {path}
      </Link>
    </div>
  );
};
