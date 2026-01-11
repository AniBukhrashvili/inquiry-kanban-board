"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { InquiryFilters } from "@/interfaces/inquiry";
import Input from "./ui/Input";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterPanelProps {
  filters: InquiryFilters;
  onFiltersChange: (filters: InquiryFilters) => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const [clientName, setClientName] = useState(filters.clientName || "");
  const debouncedClientName = useDebounce(clientName, 500);
  const filtersRef = useRef(filters);
  const prevDebouncedRef = useRef(debouncedClientName);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    if (!filters.clientName && clientName) {
      setClientName("");
    }
  }, [filters.clientName]);

  useEffect(() => {
    if (debouncedClientName !== prevDebouncedRef.current) {
      prevDebouncedRef.current = debouncedClientName;
      onFiltersChange({
        ...filtersRef.current,
        clientName: debouncedClientName || undefined,
      });
    }
  }, [debouncedClientName, onFiltersChange]);

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      dateFrom: e.target.value || undefined,
    });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      dateTo: e.target.value || undefined,
    });
  };

  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFiltersChange({
      ...filters,
      minValue: value ? Number(value) : undefined,
    });
  };

  const handleClearFilters = () => {
    setClientName("");
    onFiltersChange({});
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.clientName) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.minValue !== undefined) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="rounded-xl border border-gray-300 shadow-sm p-4 sm:p-6 mb-6 mx-2">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <span className="text-sm text-gray-600">
              {activeFilterCount} active filter
              {activeFilterCount !== 1 ? "s" : ""}
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              aria-label="Clear all filters"
              onClick={handleClearFilters}
              className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="text"
          label="Client Name"
          placeholder="Search by client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <Input
          type="date"
          label="Date From"
          value={filters.dateFrom || ""}
          onChange={handleDateFromChange}
        />

        <Input
          type="date"
          label="Date To"
          value={filters.dateTo || ""}
          onChange={handleDateToChange}
        />

        <Input
          type="number"
          label="Minimum Value (CHF)"
          placeholder="Enter minimum value"
          value={filters.minValue?.toString() || ""}
          onChange={handleMinValueChange}
          min="0"
          step="500"
        />
      </div>
    </div>
  );
}
