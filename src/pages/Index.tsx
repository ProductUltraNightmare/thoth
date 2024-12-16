import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { LevelSelect } from "@/components/LevelSelect";
import { toast } from "sonner";

const Index = () => {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [simplifiedText, setSimplifiedText] = useState("");
  const [level, setLevel] = useState("grade5");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      // Mock API calls - replace with actual implementation
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });

      setContent(text);
      setSummary("This is a mock summary of the content.");
      setObjectives(["Objective 1", "Objective 2", "Objective 3"]);
      setQuestions(["Question 1?", "Question 2?", "Question 3?"]);
      
      console.log("File processed:", file.name);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimplify = () => {
    setIsProcessing(true);
    // Mock API call - replace with actual implementation
    setTimeout(() => {
      setSimplifiedText("This is a simplified version of the text.");
      setIsProcessing(false);
      toast.success("Text simplified successfully!");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Curriculum Generator</h1>
        <p className="text-muted-foreground">
          Upload your content and transform it into engaging educational materials
        </p>
      </div>

      <div className="space-y-8">
        <FileUpload onFileSelect={handleFileSelect} />

        <div className="flex items-center gap-4 justify-center">
          <LevelSelect value={level} onChange={setLevel} />
          <Button 
            onClick={handleSimplify}
            disabled={!content || isProcessing}
          >
            {isProcessing ? "Processing..." : "Simplify Text"}
          </Button>
        </div>

        {content && (
          <Tabs defaultValue="original" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger value="original" className="tab-trigger">
                Original
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

            <TabsContent value="original" className="content-panel">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{content}</pre>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="content-panel">
              <div className="prose max-w-none">
                <p>{summary}</p>
              </div>
            </TabsContent>

            <TabsContent value="objectives" className="content-panel">
              <ul className="space-y-2">
                {objectives.map((objective, index) => (
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
                {questions.map((question, index) => (
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
                <p>{simplifiedText}</p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;