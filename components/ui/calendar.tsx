import React, { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
} from "date-fns";

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface CalendarProps {
    selected: DateRange;
    mode: string;
    onSelect: (range: DateRange) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    const onDateClick = (day: Date) => {
        if (!range.start || (range.start && range.end)) {
            setRange({ start: day, end: null });
        } else {
            setRange({ ...range, end: day });
            onSelect({ start: range.start, end: day });
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg text-black">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    &#9664;
                </button>
                <span className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    &#9654;
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center font-semibold p-2 text-blue-600">
                    {format(addDays(startDate, i), "EEE")}
                </div>
            );
        }
        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        
        let day = startDate;
        const rows = [];
        while (day <= endDate) {
            const days = [];
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                days.push(
                    <div
                        key={day.toString()}
                        className={`p-4 text-center cursor-pointer rounded-md text-black ${
                            !isSameMonth(day, monthStart) ? "text-green-400" : ""
                        } ${isSameDay(day, new Date()) ? "bg-blue-500 text-white" : ""}
                        ${range.start && isSameDay(day, range.start) ? "bg-green-500 text-white" : ""}
                        ${range.end && isSameDay(day, range.end) ? "bg-green-700 text-white" : ""}
                        `}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        {format(day, "d")}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={day.toString()} className="grid grid-cols-7">{days}</div>);
        }
        return <div>{rows}</div>;
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
