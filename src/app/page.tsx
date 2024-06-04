import { AreaChartHero } from "@/components/AreaChart";
import { BarChartHero } from "@/components/BarChart";
import { BarListHero } from "@/components/BarList";
import { DataBarsHero } from "@/components/DataBars";
import { DonutChartHero } from "@/components/DonutChart";
import { FunnelChartHero } from "@/components/FunnelChart";
import { LineChartHero } from "@/components/LineChart";
import { ProgressCircleHero } from "@/components/ProgressCircle";
import { ScatterChartHero } from "@/components/ScatterChart";
import { SparkChartHero } from "@/components/SparkChart";
import { TableHero } from "@/components/Table";
import { TrackerHero } from "@/components/Tracker";

export default function Home() {
  return (
    <main className="">
      <AreaChartHero />
      <BarChartHero />
      <LineChartHero />
      <FunnelChartHero />
      <ProgressCircleHero />
      <ScatterChartHero />
      <SparkChartHero />
      <TrackerHero />
      <DonutChartHero />
      <DataBarsHero />
      <BarListHero
        data={[
          { name: "/home", value: 456 },
          { name: "/imprint", value: 351 },
          { name: "/cancellation", value: 51 },
        ]}
      />
      <TableHero />
    </main>
  );
}
