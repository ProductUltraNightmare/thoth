import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, File, Clock } from "lucide-react";
import { toast } from "sonner";

interface CurriculumData {
  content: string;
  summary: string;
  objectives: string[];
  questions: string[];
  simplifiedText: string;
}

interface UploadHistory {
  id: string;
  fileName: string;
  timestamp: string;
  data: CurriculumData;
}

const Results = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CurriculumData | null>(null);
  const [history, setHistory] = useState<UploadHistory[]>([]);
  const [selectedUploadId, setSelectedUploadId] = useState<string | null>(null);

  useEffect(() => {
    // Load current data
    const storedData = localStorage.getItem("curriculumData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);

      // Add to history if it's a new upload
      const newUpload: UploadHistory = {
        id: Date.now().toString(),
        fileName: "Document " + (history.length + 1),
        timestamp: new Date().toISOString(),
        data: parsedData,
      };

      // Get existing history
      const existingHistory = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
      const updatedHistory = [newUpload, ...existingHistory];
      
      // Store updated history
      localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setSelectedUploadId(newUpload.id);
    } else {
      // If no current data, load history
      const storedHistory = localStorage.getItem("uploadHistory");
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setSelectedUploadId(parsedHistory[0].id);
          setData(parsedHistory[0].data);
        }
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleUploadSelect = (upload: UploadHistory) => {
    setSelectedUploadId(upload.id);
    setData(upload.data);
    toast.success("Loaded: " + upload.fileName);
  };

  if (!data) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-8">
        {/* Sidebar with history */}
        <div className="w-64 shrink-0">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 w-full justify-start"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Upload
          </Button>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-4">Upload History</h2>
            {history.map((upload) => (
              <button
                key={upload.id}
                onClick={() => handleUploadSelect(upload)}
                className={`w-full text-left p-3 rounded-lg flex items-start gap-3 hover:bg-secondary transition-colors ${
                  selectedUploadId === upload.id ? "bg-secondary" : ""
                }`}
              >
                <File className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{upload.fileName}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(upload.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
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
      </div>
    </div>
  );
};

export default Results;