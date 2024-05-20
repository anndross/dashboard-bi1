"use client";
import { ProgressCircle } from "@tremor/react";

export const ProgressCircleHero = () => (
  <div className="mx-auto grid grid-cols-1 gap-12">
    <div className="flex justify-center">
      <ProgressCircle value={72} size="lg">
        <span className="text-xs font-medium text-white">75%</span>
      </ProgressCircle>
    </div>
  </div>
);
