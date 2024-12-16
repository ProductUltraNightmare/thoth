import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LevelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const LevelSelect = ({ value, onChange }: LevelSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select grade level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grade3">Grade 3</SelectItem>
        <SelectItem value="grade4">Grade 4</SelectItem>
        <SelectItem value="grade5">Grade 5</SelectItem>
        <SelectItem value="grade6">Grade 6</SelectItem>
        <SelectItem value="grade7">Grade 7</SelectItem>
        <SelectItem value="grade8">Grade 8</SelectItem>
      </SelectContent>
    </Select>
  );
};