import React from 'react';
import { Button } from "@/components/ui/button";
import LogoThoth from "../../assets/logo/LogoThoth";
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  const notIndexPage = !isIndexPage;

  return (
    <header className="bg-slate-100 p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-1">
        {isIndexPage ? (
          <div className="flex items-center gap-1">
            <LogoThoth width={24} height={24} />
            <span className="text-xl font-semibold">Thoth</span>
          </div>
        ) : (
          <Link to="/" className="flex items-center gap-1">
            <LogoThoth width={24} height={24} />
            <span className="text-xl font-semibold">Thoth</span>
          </Link>
        )}
      </div>
      <div>
        <Button asChild>
          {notIndexPage ? (
            <Link to="/">Log out</Link>
          ) : (
            <Link to="/results">Log in</Link>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;