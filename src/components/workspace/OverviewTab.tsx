import React from 'react';

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 bg-card shadow-sm">
          <h2 className="text-xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted-foreground mb-4">
            The Energy Optimization System is designed to track and reduce power consumption in IoT environments using ultra-low power sensors and an ESP32 base station.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-primary">PROTOTYPE</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">Sept 1, 2026</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Target Completion</span>
              <span className="font-medium">Dec 15, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Priority</span>
              <span className="font-medium text-orange-500 bg-orange-500/10 px-2 rounded-full text-sm">HIGH</span>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-card shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary">73%</span>
          </div>
          <h3 className="font-bold text-lg mb-1">Overall Progress</h3>
          <p className="text-sm text-muted-foreground">12 of 16 tasks completed.</p>
        </div>
      </div>
    </div>
  );
}
