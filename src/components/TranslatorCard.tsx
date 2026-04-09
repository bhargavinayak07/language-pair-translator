import { useState, useCallback } from "react";
import { ArrowRightLeft, Copy, Check, Volume2, Loader2, Trash2 } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { translateText } from "@/lib/languages";
import { toast } from "sonner";

const TranslatorCard = () => {
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const result = await translateText(inputText, fromLang, toLang);
      setOutputText(result);
    } catch {
      toast.error("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText, fromLang, toLang]);

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* Language selectors */}
      <div className="flex items-end gap-2">
        <LanguageSelector value={fromLang} onChange={setFromLang} label="From" />
        <button
          onClick={handleSwap}
          className="mb-0.5 p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
          aria-label="Swap languages"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>
        <LanguageSelector value={toLang} onChange={setToLang} label="To" />
      </div>

      {/* Input */}
      <div className="relative bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full min-h-[140px] p-4 pb-12 bg-transparent text-foreground placeholder:text-muted-foreground outline-none resize-none text-base"
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground px-2">
            {inputText.length} chars
          </span>
          <div className="flex gap-1">
            {inputText && (
              <button
                onClick={handleClear}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Translate button */}
      <button
        onClick={handleTranslate}
        disabled={loading || !inputText.trim()}
        className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
        style={{ background: "var(--gradient-primary)" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Translating...
          </span>
        ) : (
          "Translate"
        )}
      </button>

      {/* Output */}
      {outputText && (
        <div className="relative bg-card rounded-2xl border border-primary/20 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="min-h-[120px] p-4 pb-12 text-foreground text-base whitespace-pre-wrap">
            {outputText}
          </div>
          <div className="absolute bottom-2 right-2 flex gap-1">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Copy translation"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatorCard;
