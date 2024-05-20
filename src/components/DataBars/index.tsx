import {
  Card,
  CategoryBar,
  DeltaBar,
  MarkerBar,
  ProgressBar,
} from "@tremor/react";

export const DataBarsHero = () => (
  <div className="mx-auto grid grid-cols-1 gap-12">
    <div className="space-y-3">
      <p className="text-center font-mono text-sm text-slate-500">
        ProgressBar
      </p>
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <ProgressBar value={72} />
        </Card>
      </div>
    </div>
    <div className="space-y-3">
      <p className="text-center font-mono text-sm text-slate-500">MarkerBar</p>
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <MarkerBar value={62} />
        </Card>
      </div>
    </div>
    <div className="space-y-3">
      <p className="text-center font-mono text-sm text-slate-500">DeltaBar</p>
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <DeltaBar value={50} isIncreasePositive={true} />
        </Card>
      </div>
    </div>
    <div className="space-y-3">
      <p className="text-center font-mono text-sm text-slate-500">
        CategoryBar
      </p>
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <CategoryBar
            values={[40, 30, 20, 10]}
            colors={["emerald", "yellow", "orange", "rose"]}
            markerValue={62}
          />
        </Card>
      </div>
    </div>
  </div>
);
