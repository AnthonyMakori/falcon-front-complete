import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import  Calendar  from "../../components/ui/calendar";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DatePickerProps {
  range: DateRange;
  setRange: (range: DateRange) => void;
  icon?: React.ReactNode;
}


export function DatePicker({ range, setRange, icon }: DatePickerProps) {
  const [open, setOpen] = useState(false);

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
    mode="single"
    selected={{ start: new Date(), end: new Date() }}
    onSelect={(range) => console.log(range)}
    // numberOfMonths={1}
/>

      </PopoverContent>
    </Popover>
  );
}
