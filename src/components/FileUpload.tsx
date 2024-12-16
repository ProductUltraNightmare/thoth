import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/pdf" || file.type === "text/plain" || file.type === "application/json") {
        onFileSelect(file);
        
        // Mock processing for demo
        if (file.type === "application/json") {
          try {
            const text = await file.text();
            const jsonData = JSON.parse(text);
            console.log("Processed JSON data:", jsonData);
            // Store mock data in localStorage for demo
            localStorage.setItem("curriculumData", JSON.stringify({
              content: jsonData.content || "Sample content",
              summary: "This is a mock summary of the uploaded content.",
              objectives: ["Learn key concepts", "Understand basic principles", "Apply knowledge effectively"],
              questions: ["What are the main ideas?", "How does this relate to real-world scenarios?", "Can you explain the concept in your own words?"],
              simplifiedText: "This is a simplified version of the original text."
            }));
            toast.success("File processed successfully!");
            navigate("/results");
          } catch (error) {
            console.error("Error processing JSON:", error);
            toast.error("Error processing JSON file");
          }
        } else {
          // Mock data for PDF and TXT files
          localStorage.setItem("curriculumData", JSON.stringify({
            content: "Sample content from uploaded file",
            summary: "This is a mock summary of the uploaded content.",
            objectives: ["Learn key concepts", "Understand basic principles", "Apply knowledge effectively"],
            questions: ["What are the main ideas?", "How does this relate to real-world scenarios?", "Can you explain the concept in your own words?"],
            simplifiedText: "This is a simplified version of the original text."
          }));
          toast.success("File processed successfully!");
          navigate("/results");
        }
      } else {
        toast.error("Please upload a PDF, TXT, or JSON file");
      }
    }
  }, [onFileSelect, navigate]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/json': ['.json']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false,
    noClick: true
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`drop-zone h-32 flex items-center justify-center ${isDragging ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Upload className="w-5 h-5" />
          <p className="text-sm">Drop your file here</p>
        </div>
      </div>
      <Button 
        onClick={open}
        variant="outline"
        className="w-full"
      >
        Choose File
      </Button>
    </div>
  );
};