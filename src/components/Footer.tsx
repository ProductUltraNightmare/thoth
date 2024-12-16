import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex justify-center items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <a
            href="https://github.com/yourusername/curriculum-clarify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
            <span className="ml-2">GitHub</span>
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5" />
            <span className="ml-2">LinkedIn</span>
          </a>
        </Button>
      </div>
    </footer>
  );
};