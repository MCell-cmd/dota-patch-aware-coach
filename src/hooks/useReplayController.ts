import { useState } from "react";
import type { Role, ReplayReport } from "@/data/dota";
import { APP_CONFIG } from "@/config/constants";
import { track } from "@/lib/analytics";
import type { ReportPerspective } from "@/components/ReplayPanel";

type ReportApiResponse = {
  report?: ReplayReport;
  source?: "ai" | "deterministic";
  parsed?: boolean;
  perspective?: {
    heroName: string;
    accountId: number | null;
    won: boolean;
  };
  error?: string;
};

export function useReplayController(role: Role) {
  const [matchId, setMatchId] = useState(APP_CONFIG.DEFAULT_MATCH_ID);
  const [accountId, setAccountId] = useState(APP_CONFIG.DEFAULT_ACCOUNT_ID);
  const [question, setQuestion] = useState("¿Qué decisión me hizo perder más impacto?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [reportSource, setReportSource] = useState<"ai" | "deterministic" | null>(null);
  const [reportParsed, setReportParsed] = useState<boolean | null>(null);
  const [reportPerspective, setReportPerspective] = useState<ReportPerspective>(null);
  const [replayReport, setReplayReport] = useState<ReplayReport | null>(null);

  const startReplayAnalysis = async () => {
    if (!matchId.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setReplayReport(null);
    setAnalysisError(null);
    setReportSource(null);
    setReportParsed(null);
    setReportPerspective(null);

    const progress = window.setInterval(() => {
      setAnalysisStep((prev) => Math.min(prev + 1, 4));
    }, APP_CONFIG.SIMULATION_STEP_DELAY);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: matchId.trim(),
          accountId: accountId.trim() || null,
          role,
          question,
        }),
      });
      const payload = (await response.json()) as ReportApiResponse;
      if (!response.ok || !payload.report) {
        throw new Error(payload.error || "No se pudo generar el reporte real.");
      }
      setAnalysisStep(4);
      setReplayReport(payload.report);
      setReportSource(payload.source ?? "deterministic");
      setReportParsed(payload.parsed ?? null);
      setReportPerspective(payload.perspective ?? null);
      track("Reporte generado", {
        source: payload.source ?? "deterministic",
        parsed: String(payload.parsed ?? false),
      });
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "Error inesperado generando el reporte.");
    } finally {
      window.clearInterval(progress);
      setIsAnalyzing(false);
    }
  };

  return {
    matchId,
    setMatchId,
    accountId,
    setAccountId,
    question,
    setQuestion,
    isAnalyzing,
    analysisStep,
    analysisError,
    reportSource,
    reportParsed,
    reportPerspective,
    replayReport,
    startReplayAnalysis,
  };
}
