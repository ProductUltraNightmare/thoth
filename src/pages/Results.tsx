import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, File, Clock, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CurriculumData {
  content: string;
  summary: string;
  objectives: string[];
  questions: string[];
  simplifiedText: string;
  notes?: string;
}

interface UploadHistory {
  id: string;
  fileName: string;
  timestamp: string;
  data: CurriculumData;
  notes?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CurriculumData | null>(null);
  const [history, setHistory] = useState<UploadHistory[]>([]);
  const [selectedUploadId, setSelectedUploadId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [notes, setNotes] = useState("");

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
        notes: "",
      };

      // Get existing history
      const existingHistory = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
      const updatedHistory = [newUpload, ...existingHistory];
      
      // Store updated history
      localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setSelectedUploadId(newUpload.id);
      setNotes(newUpload.notes || "");
    } else {
      // If no current data, load history
      const storedHistory = localStorage.getItem("uploadHistory");
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setSelectedUploadId(parsedHistory[0].id);
          setData(parsedHistory[0].data);
          setNotes(parsedHistory[0].notes || "");
        }
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleUploadSelect = (upload: UploadHistory) => {
    setSelectedUploadId(upload.id);
    setData(upload.data);
    setNotes(upload.notes || "");
    toast.success("Loaded: " + upload.fileName);
  };

  const handleNameEdit = (id: string, newName: string) => {
    const updatedHistory = history.map(upload => 
      upload.id === id ? { ...upload, fileName: newName } : upload
    );
    setHistory(updatedHistory);
    localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
    setEditingId(null);
    toast.success("Name updated successfully");
  };

  const handleHeaderNameEdit = (newName: string) => {
    if (selectedUploadId) {
      const updatedHistory = history.map(upload => 
        upload.id === selectedUploadId ? { ...upload, fileName: newName } : upload
      );
      setHistory(updatedHistory);
      localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
      setIsEditingHeader(false);
      toast.success("Name updated successfully");
    }
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    if (selectedUploadId) {
      const updatedHistory = history.map(upload => 
        upload.id === selectedUploadId ? { ...upload, notes: newNotes } : upload
      );
      setHistory(updatedHistory);
      localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
    }
  };

  const getCurrentUpload = () => {
    return history.find(upload => upload.id === selectedUploadId);
  };

  if (!data) return null;

  const currentUpload = getCurrentUpload();

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
              <div
                key={upload.id}
                className={`w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors ${
                  selectedUploadId === upload.id ? "bg-secondary" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  {editingId === upload.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleNameEdit(upload.id, editingName)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleNameEdit(upload.id, editingName);
                        }
                      }}
                      className="flex-1"
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => handleUploadSelect(upload)}
                      className="flex-1 text-left flex items-start gap-3"
                    >
                      <File className="h-5 w-5 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{upload.fileName}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(upload.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </button>
                  )}
                  {editingId !== upload.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(upload.id);
                        setEditingName(upload.fileName);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Document Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {isEditingHeader ? (
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => handleHeaderNameEdit(editingName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleHeaderNameEdit(editingName);
                    }
                  }}
                  className="text-2xl font-bold"
                  autoFocus
                />
              ) : (
                <h1 className="text-2xl font-bold">
                  {currentUpload?.fileName}
                </h1>
              )}
              {!isEditingHeader && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => {
                    setIsEditingHeader(true);
                    setEditingName(currentUpload?.fileName || "");
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-2" />
              {currentUpload && new Date(currentUpload.timestamp).toLocaleString()}
            </div>
          </div>

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
              <TabsTrigger value="notes" className="tab-trigger">
                Notes
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

            <TabsContent value="notes" className="content-panel">
              <Textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[200px]"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Results;