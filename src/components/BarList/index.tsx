import { BarList } from "@tremor/react";

const mock = [
  { name: "/home", value: 456 },
  { name: "/imprint", value: 351 },
  { name: "/cancellation", value: 51 },
];

interface BarListHeroProps {
  data: {
    name: string;
    value: number;
  }[];
}

export const BarListHero = ({ data = mock }: BarListHeroProps) => (
  <>
    <BarList data={data} className="mx-auto max-w-sm" />
  </>
);
