import React from 'react';
import { Button } from "@/components/ui/button";
import LogoThoth from "../../assets/logo/LogoThoth";

const Header: React.FC = () => {
  return (
    <header className="bg-slate-100 p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <LogoThoth className="h-6 w-6" />
        <span className="text-xl font-semibold">Thoth</span>
      </div>
      <div>
        <Button>Log in</Button>
      </div>
    </header>
  );
};

export default Header;