import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  // AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Search } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

export const SearchControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAcordion = searchParams.get("active-acordion") ?? "";
  const valueStrength = Number(searchParams.get("strength") ?? "0");

  const setQueryParamsFilter = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParamsFilter("name", value);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 " />
          <Input
            ref={inputRef}
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg bg-white font-bold"
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("name") ?? ""}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={
              activeAcordion === "advance-filters" ? "default" : "outline"
            }
            className="h-12"
            onClick={() => {
              if (activeAcordion === "advance-filters") {
                setQueryParamsFilter("active-acordion", "");
                //Forma con el delete
                // setSearchParams((prev) => {
                //   prev.delete("active-acordion");
                //   return prev;
                // });
                // searchParams.delete("active-acordion");
                return;
              }
              setQueryParamsFilter("active-acordion", "advance-filters");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button> */}
        </div>
      </div>
      {/* Advanced Filters */}
      <Accordion type="single" collapsible value={activeAcordion}>
        <AccordionItem value="advance-filters">
          {/* <AccordionTrigger>Advanced Filters</AccordionTrigger> */}
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              {/* <div className="flex justify-between items-center mb-4">
             
                <Button variant="ghost">Clear All</Button>
              </div> */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All teams
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All categories
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All universes
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All statuses
                  </div>
                </div>
              </div> */}
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Minimum Strength: {valueStrength}/10
                </label>
                <Slider
                  defaultValue={[valueStrength]}
                  onValueChange={(value) =>
                    setQueryParamsFilter("strength", value[0].toString())
                  }
                  max={10}
                  step={1}
                />
                {/* 
          <div className="relative flex w-full touch-none select-none items-center mt-2">
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
               <div
                className="absolute h-full bg-primary"
                style={{ width: "0%" }}
              /> 
            </div>
            <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
          </div> */}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
