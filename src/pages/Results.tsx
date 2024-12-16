import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

interface CurriculumData {
  content: string;
  summary: string;
  objectives: string[];
  questions: string[];
  simplifiedText: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CurriculumData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("curriculumData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!data) return null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Upload
      </Button>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger value="content" className="tab-trigger">
            Content
          </TabsTrigger>
          <TabsTrigger value="summary" className="tab-trigger">
            Summary
          </TabsTrigger>
          <TabsTrigger value="objectives" className="tab-trigger">
            Objectives
          </TabsTrigger>
          <TabsTrigger value="questions" className="tab-trigger">
            Questions
          </TabsTrigger>
          <TabsTrigger value="simplified" className="tab-trigger">
            Simplified
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="content-panel">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{data.content}</pre>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="content-panel">
          <div className="prose max-w-none">
            <p>{data.summary}</p>
          </div>
        </TabsContent>

        <TabsContent value="objectives" className="content-panel">
          <ul className="space-y-2">
            {data.objectives.map((objective, index) => (
              <li 
                key={index}
                className="flex items-center gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="questions" className="content-panel">
          <ul className="space-y-4">
            {data.questions.map((question, index) => (
              <li 
                key={index}
                className="p-4 bg-secondary rounded-lg"
              >
                {question}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="simplified" className="content-panel">
          <div className="prose max-w-none">
            <p>{data.simplifiedText}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;