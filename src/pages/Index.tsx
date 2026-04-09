import { Languages } from "lucide-react";
import TranslatorCard from "@/components/TranslatorCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-10 pb-6 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div
            className="p-2.5 rounded-xl shadow-md"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Languages className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Translator
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Translate between 35+ languages instantly
        </p>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 pb-8">
        <TranslatorCard />
      </main>
    </div>
  );
};

export default Index;
