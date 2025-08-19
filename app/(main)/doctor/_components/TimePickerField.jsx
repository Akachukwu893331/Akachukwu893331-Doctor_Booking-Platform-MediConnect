"use client";

import { Controller } from "react-hook-form";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function TimePickerField({ control, name, label, error }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            {...field}
            disableClock
            format="h:mm a"
            className="w-full rounded-md border border-emerald-900/20 bg-background px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        )}
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
