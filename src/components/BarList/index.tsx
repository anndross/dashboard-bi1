import { BarList as BarListTremor } from "@tremor/react";

const mock = [
  { name: "/home", value: 456 },
  { name: "/imprint", value: 351 },
  { name: "/cancellation", value: 51 },
];

interface BarListProps {
  data?: {
    name: string;
    value: number;
  }[];
}

export const BarList = ({ data = mock }: BarListProps) => (
  <>
    <BarListTremor color="yellow-500" data={data} className="w-full" />
  </>
);
