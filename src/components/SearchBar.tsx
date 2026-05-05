import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchData = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
};
type SearchBarProps = {
  onSearch?: () => void; // ✅ callback to close the panel after search
};
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const navigate = useNavigate();

  const { today, tomorrow } = useMemo(() => {
    const now = new Date();
    const next = new Date(now);
    next.setDate(now.getDate() + 1);
    return { today: now, tomorrow: next };
  }, []);

  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    checkIn: today,
    checkOut: tomorrow,
    guests: 1,
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const handleDestChange = (value: string) => {
    setSearchData((prev) => ({ ...prev, destination: value }));
    if (value.length > 0) {
      setSuggestions(
        ["New York", "London", "Paris", "Tokyo"].filter((s) =>
          s.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleGuestChange = (delta: number) => {
    setSearchData((prev) => ({
      ...prev,
      guests: Math.max(1, prev.guests + delta),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn.toISOString().split("T")[0],
      checkOut: searchData.checkOut.toISOString().split("T")[0],
      guests: String(searchData.guests),
    }).toString();
    navigate(`/search?${query}`);
    onSearch?.(); // ✅ close the panel after navigating
  };

  const fieldLabel = (text: string) => (
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
      {text}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 lg:gap-0 lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-center"
    >
      {/* ── Destination ── */}
      <div
        className={cn(
          "relative",
          // mobile: full card style
          "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3",
          // desktop: borderless, divider only on right
          "lg:rounded-none lg:border-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-600 lg:dark:bg-transparent lg:bg-transparent lg:px-0 lg:pr-5 lg:py-0",
        )}
      >
        <div className="flex items-center gap-2 lg:gap-0 lg:block">
          <MapPin className="w-4 h-4 text-brand-500 shrink-0 self-end mb-1 lg:hidden" />
          <div className="flex-1">
            {fieldLabel("Destination")}
            <input
              value={searchData.destination}
              onChange={(e) => handleDestChange(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm lg:text-base font-medium outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300 rounded-md px-2 py-1 lg:px-1 lg:py-1  focus:ring-offset-transparent"
            />
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl mt-1.5 overflow-hidden z-20 shadow-lg">
            {suggestions.map((s) => (
              <div
                key={s}
                className="px-3.5 py-2.5 cursor-pointer text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                onClick={() => {
                  setSearchData((prev) => ({ ...prev, destination: s }));
                  setSuggestions([]);
                }}
              >
                📍 {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Check In & Check Out (paired on mobile) ── */}
      <div className="grid grid-cols-2 gap-3 lg:contents">
        {/* Check In */}
        <div
          className={cn(
            "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3",
            "lg:rounded-none lg:border-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-600 lg:dark:bg-transparent lg:bg-transparent lg:px-3.5 lg:py-0",
          )}
        >
          <div className="flex items-center gap-2 lg:gap-0 lg:block">
            <CalendarIcon className="w-4 h-4  text-brand-500 self-end mb-1 shrink-0 lg:hidden" />
            <div className="flex-1 min-w-0">
              {fieldLabel("Check In")}
              <Popover
                open={checkInOpen}
                onOpenChange={setCheckInOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-1.5 px-0 bg-transparent hover:bg-transparent text-slate-900 dark:text-white text-sm font-medium h-auto py-0 shadow-none border-none outline-none focus-visible:ring-0 truncate"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden lg:block" />
                    {format(searchData.checkIn, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={searchData.checkIn}
                    onSelect={(date) => {
                      if (!date) return;
                      setSearchData((prev) => ({
                        ...prev,
                        checkIn: date,
                        checkOut:
                          date >= prev.checkOut
                            ? new Date(date.getTime() + 86_400_000)
                            : prev.checkOut,
                      }));
                      setCheckInOpen(false);
                    }}
                    disabled={{ before: today }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Check Out */}
        <div
          className={cn(
            "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3",
            "lg:rounded-none lg:border-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-600 lg:dark:bg-transparent lg:bg-transparent lg:px-3.5 lg:py-0",
          )}
        >
          <div className="flex items-center gap-2 lg:gap-0 lg:block">
            <CalendarIcon className="w-4 h-4 text-brand-500 shrink-0 lg:hidden self-end mb-1" />
            <div className="flex-1 min-w-0">
              {fieldLabel("Check Out")}
              <Popover
                open={checkOutOpen}
                onOpenChange={setCheckOutOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-1.5 px-0 bg-transparent hover:bg-transparent text-slate-900 dark:text-white text-sm font-medium h-auto py-0 shadow-none border-none outline-none focus-visible:ring-0 truncate"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden lg:block" />
                    {format(searchData.checkOut, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={searchData.checkOut}
                    onSelect={(date) => {
                      if (!date) return;
                      setSearchData((prev) => ({ ...prev, checkOut: date }));
                      setCheckOutOpen(false);
                    }}
                    disabled={{
                      before: new Date(
                        searchData.checkIn.getTime() + 86_400_000,
                      ),
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* ── Guests ── */}
      <div
        className={cn(
          "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3",
          "lg:rounded-none lg:border-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-600 lg:dark:bg-transparent lg:bg-transparent lg:px-3.5 lg:py-0",
        )}
      >
        <div className="flex items-center gap-2 lg:gap-0 lg:block">
          <Users className="w-4 h-4 text-brand-500 shrink-0 self-end mb-1 mr-3 lg:hidden" />
          <div className="flex-1">
            {fieldLabel("Guests")}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0"
              >
                −
              </button>
              <span className="text-slate-900 dark:text-white text-sm font-semibold min-w-4 text-center">
                {searchData.guests}
              </span>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Button ── */}
      <div className="lg:pl-4">
        <Button
          type="submit"
          className="w-full lg:w-auto bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl px-6 py-6 lg:cursor-pointer text-sm shadow-lg shadow-brand-500/25 transition-all"
        >
          <Search className="w-4 h-4 " />
          <span>Search Hotels</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
