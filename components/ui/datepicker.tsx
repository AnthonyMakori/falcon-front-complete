import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Calendar from "../../components/ui/calendar";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface CalendarDateRange {
  start: Date | null;
  end: Date | null;
}

interface DatePickerProps {
  range: DateRange;
  setRange: (range: DateRange) => void;
  icon?: React.ReactNode;
}

export function DatePicker({ range, setRange, icon }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  // Convert { from, to } to { start, end } using `null` instead of `undefined`
  const calendarSelected: CalendarDateRange = {
    start: range.from ?? null,
    end: range.to ?? null,
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {icon || <CalendarIcon className="w-4 h-4" />}
          {range.from && range.to ? (
            <span>{`${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`}</span>
          ) : (
            <span>Select Date Range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 bg-white rounded-md shadow-lg">
        <Calendar
          mode="range"
          selected={calendarSelected}
          onSelect={(selectedRange: CalendarDateRange | undefined) => {
            if (selectedRange) {
              setRange({ from: selectedRange.start, to: selectedRange.end });
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
