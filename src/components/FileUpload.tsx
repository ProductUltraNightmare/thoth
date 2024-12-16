import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/json': ['.json']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`drop-zone ${isDragging ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-center">
        <Upload className="w-12 h-12 text-muted-foreground" />
        <div>
          <p className="text-lg font-medium">Drop your file here or click to upload</p>
          <p className="text-sm text-muted-foreground mt-1">
            Support for PDF, TXT, and JSON files
          </p>
        </div>
      </div>
    </div>
  );
};