import { useState } from "react";
import { languages, type Language } from "@/lib/languages";
import { ChevronDown, Search } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

const LanguageSelector = ({ value, onChange, label }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = languages.find((l) => l.code === value);

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex-1">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
        {label}
      </span>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors text-foreground font-medium"
      >
        <span className="truncate">
          {selected ? selected.name : "Select language"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setOpen(false);
              setSearch("");
            }}
          />
          <div className="absolute z-50 top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-72">
            <div className="p-2 border-b border-border">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search language..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-52">
              {filtered.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang.code);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/60 transition-colors flex items-center justify-between ${
                    lang.code === value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {lang.nativeName}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-6">
                  No languages found
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
