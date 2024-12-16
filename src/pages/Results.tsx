import React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";

const Results = () => {
  const [curriculumData, setCurriculumData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("curriculumData");
    if (data) {
      setCurriculumData(JSON.parse(data));
    } else {
      toast.error("No curriculum data found. Please upload a file first.");
    }
  }, []);

  if (!curriculumData) {
    return null; // or a loading state
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto py-8 px-4 max-w-4xl animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">Curriculum Results</h2>
        <div className="prose max-w-none">
          <h3 className="text-2xl">Content</h3>
          <pre className="whitespace-pre-wrap font-sans">{curriculumData.content}</pre>

          <h3 className="text-2xl">Summary</h3>
          <p>{curriculumData.summary}</p>

          <h3 className="text-2xl">Objectives</h3>
          <ul className="space-y-2">
            {curriculumData.objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {objective}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl">Questions</h3>
          <ul className="space-y-4">
            {curriculumData.questions.map((question: string, index: number) => (
              <li key={index} className="p-4 bg-secondary rounded-lg">
                {question}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl">Simplified Text</h3>
          <p>{curriculumData.simplifiedText}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
