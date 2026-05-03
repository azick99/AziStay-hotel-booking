import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Filters, type SortOption } from "@/hooks/useHotelSearch";
import type { Amenity, Hotel } from "@/types/hotel.types";

type Props = {
  filters: Filters;
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onClear: () => void;
};

const STAR_OPTIONS = [3, 4, 5];

const CATEGORY_OPTIONS: { value: Hotel["category"]; label: string }[] = [
  { value: "luxury", label: "Luxury" },
  { value: "boutique", label: "Boutique" },
  { value: "resort", label: "Resort" },
  { value: "business", label: "Business" },
];

const AMENITY_OPTIONS: { value: Amenity; label: string }[] = [
  { value: "pool", label: "Swimming Pool" },
  { value: "spa", label: "Spa" },
  { value: "gym", label: "Gym" },
  { value: "wifi", label: "Free WiFi" },
  { value: "restaurant", label: "Restaurant" },
  { value: "parking", label: "Parking" },
  { value: "pet-friendly", label: "Pet Friendly" },
  { value: "beach-access", label: "Beach Access" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rating_desc", label: "Top Rated" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "most_reviewed", label: "Most Reviewed" },
];

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-neutral-900 dark:text-white">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white h-auto py-1 px-2"
        >
          Clear all
        </Button>
      </div>

      <Separator />

      {/* Sort By */}
      <FilterSection title="Sort By">
        <Select
          value={filters.sortBy}
          onValueChange={(val) => onChange("sortBy", val as SortOption)}
        >
          <SelectTrigger className="rounded-xl text-sm border-neutral-200 dark:border-neutral-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem
                key={o.value}
                value={o.value}
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection title="Price Per Night">
        <div className="px-1">
          <Slider
            min={0}
            max={2000}
            step={50}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={([min, max]) => {
              onChange("priceMin", min);
              onChange("priceMax", max);
            }}
            className="mt-1"
          />
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
            ${filters.priceMin}
          </span>
          <span className="text-neutral-400 text-xs">to</span>
          <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
            ${filters.priceMax}
          </span>
        </div>
      </FilterSection>

      <Separator />

      {/* Star Rating */}
      <FilterSection title="Star Rating">
        <div className="flex flex-col gap-2.5">
          {STAR_OPTIONS.map((star) => {
            const checked = filters.stars.includes(star);
            return (
              <div
                key={star}
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => onChange("stars", toggle(filters.stars, star))}
              >
                <Checkbox
                  id={`star-${star}`}
                  checked={checked}
                  onCheckedChange={() =>
                    onChange("stars", toggle(filters.stars, star))
                  }
                />
                <Label
                  htmlFor={`star-${star}`}
                  className="flex items-center gap-1.5 cursor-pointer text-sm text-neutral-700 dark:text-neutral-300"
                >
                  {Array.from({ length: star }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-neutral-400 text-xs ml-0.5">
                    {star} star{star > 1 ? "s" : ""}
                  </span>
                </Label>
              </div>
            );
          })}
        </div>
      </FilterSection>

      <Separator />

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-col gap-2.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const checked = filters.categories.includes(cat.value);
            return (
              <div
                key={cat.value}
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() =>
                  onChange("categories", toggle(filters.categories, cat.value))
                }
              >
                <Checkbox
                  id={`cat-${cat.value}`}
                  checked={checked}
                  onCheckedChange={() =>
                    onChange(
                      "categories",
                      toggle(filters.categories, cat.value),
                    )
                  }
                />
                <Label
                  htmlFor={`cat-${cat.value}`}
                  className="cursor-pointer text-sm text-neutral-700 dark:text-neutral-300 capitalize"
                >
                  {cat.label}
                </Label>
              </div>
            );
          })}
        </div>
      </FilterSection>

      <Separator />

      {/* Amenities */}
      <FilterSection title="Amenities">
        <div className="flex flex-col gap-2.5">
          {AMENITY_OPTIONS.map((am) => {
            const checked = filters.amenities.includes(am.value);
            return (
              <div
                key={am.value}
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() =>
                  onChange("amenities", toggle(filters.amenities, am.value))
                }
              >
                <Checkbox
                  id={`am-${am.value}`}
                  checked={checked}
                  onCheckedChange={() =>
                    onChange("amenities", toggle(filters.amenities, am.value))
                  }
                />
                <Label
                  htmlFor={`am-${am.value}`}
                  className="cursor-pointer text-sm text-neutral-700 dark:text-neutral-300"
                >
                  {am.label}
                </Label>
              </div>
            );
          })}
        </div>
      </FilterSection>
    </motion.aside>
  );
}
