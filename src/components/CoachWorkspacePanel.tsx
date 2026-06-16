"use client";

import { Check, Clock, Copy, Plus, Trash2, User } from "lucide-react";
import {
  Bracket,
  BRACKET_LABELS,
  HEROES,
  MockReplayReport,
  getDefaultMockReport,
} from "@/data/dota";
import { SelectField } from "@/components/fields";
import { APP_CONFIG } from "@/config/constants";

export function CoachWorkspacePanel({
  students,
  activeStudentId,
  setActiveStudent,
  newStudentName,
  setNewStudentName,
  newStudentMMR,
  setNewStudentMMR,
  newStudentHero,
  setNewStudentHero,
  handleAddStudent,
  handleDeleteStudent,
  academyName,
  setAcademyName,
  brandingColor,
  setBrandingColor,
  coachReport,
  setCoachReport,
  copyReport,
  copyStatus,
}: {
  students: Array<{ id: string; name: string; MMR: string; favoriteHero: string; lastReport: string }>;
  activeStudentId: string;
  setActiveStudent: (id: string) => void;
  newStudentName: string;
  setNewStudentName: (val: string) => void;
  newStudentMMR: Bracket;
  setNewStudentMMR: (val: Bracket) => void;
  newStudentHero: string;
  setNewStudentHero: (val: string) => void;
  handleAddStudent: (e: React.FormEvent) => void;
  handleDeleteStudent: (id: string) => void;
  academyName: string;
  setAcademyName: (val: string) => void;
  brandingColor: string;
  setBrandingColor: (val: string) => void;
  coachReport: MockReplayReport | null;
  setCoachReport: (rep: MockReplayReport | null) => void;
  copyReport: () => void;
  copyStatus: boolean;
}) {
  const activeStudent = students.find((s) => s.id === activeStudentId);

  const updateVerdict = (text: string) => {
    if (!coachReport) return;
    setCoachReport({ ...coachReport, verdict: text });
  };

  const updateError = (
    index: number,
    key: "title" | "evidence" | "impact" | "fix" | "practice",
    text: string,
  ) => {
    if (!coachReport) return;
    const updatedErrors = [...coachReport.errors];
    updatedErrors[index] = { ...updatedErrors[index], [key]: text };
    setCoachReport({ ...coachReport, errors: updatedErrors });
  };

  const updateDayPlan = (index: number, text: string) => {
    if (!coachReport) return;
    const updatedPlan = [...coachReport.plan];
    updatedPlan[index] = text;
    setCoachReport({ ...coachReport, plan: updatedPlan });
  };

  return (
    <div className="placeholderGrid patchPanelGrid coachWorkspaceGrid">
      <div className="leftCoachColumn">
        <section className="panel">
          <div className="panelHeader">
            <h3 className="panelTitle">Mis Alumnos</h3>
            <p className="panelNote">Gestiona los perfiles y selecciona al alumno activo para editar sus reportes.</p>
          </div>
          <div className="panelBody">
            <div className="patchHeroList studentsList">
              {students.map((student) => {
                const isActive = student.id === activeStudentId;
                return (
                  <div key={student.id} className={`studentRowWrapper ${isActive ? "active" : ""}`}>
                    <button
                      className="studentSelectBtn"
                      onClick={() => setActiveStudent(student.id)}
                      type="button"
                    >
                      <User size={16} className="studentAvatarIcon" />
                      <div className="patchHeroMeta">
                        <span className="patchHeroName">{student.name}</span>
                        <span className="patchHeroRoles">{student.MMR} | Pool: {student.favoriteHero}</span>
                      </div>
                    </button>
                    {students.length > 1 && (
                      <button
                        className="deleteStudentBtn"
                        onClick={() => handleDeleteStudent(student.id)}
                        title="Eliminar Alumno"
                        type="button"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddStudent} className="addStudentForm">
              <span className="formSubHeader">Registrar Alumno</span>
              <div className="fieldGroup">
                <input
                  className="textInput"
                  onChange={(e) => setNewStudentName(e.target.value)}
                  value={newStudentName}
                  placeholder="Nombre o Nickname..."
                  required
                />
              </div>
              <div className="inlineFields">
                <SelectField
                  label="Bracket"
                  value={newStudentMMR}
                  onChange={setNewStudentMMR}
                  values={Object.keys(BRACKET_LABELS) as Bracket[]}
                  labels={BRACKET_LABELS}
                />
                <SelectField
                  label="Héroe Favorito"
                  value={newStudentHero}
                  onChange={setNewStudentHero}
                  values={HEROES.map((h) => h.id)}
                  labels={HEROES.reduce((acc, h) => ({ ...acc, [h.id]: h.name }), {})}
                />
              </div>
              <button className="primaryAction addBtn" type="submit">
                <Plus size={16} />
                Añadir Alumno
              </button>
            </form>
          </div>
        </section>

        <section className="panel brandingWidgetPanel">
          <div className="panelHeader">
            <h3 className="panelTitle">Branding del Reporte</h3>
            <p className="panelNote">Firma y personaliza los reportes con la marca de tu propia academia de Dota 2.</p>
          </div>
          <div className="panelBody">
            <div className="fieldGroup">
              <label htmlFor="academyInput" className="fieldLabel">Nombre de la Academia / Coach</label>
              <input
                id="academyInput"
                className="textInput"
                onChange={(e) => setAcademyName(e.target.value)}
                value={academyName}
                placeholder="Ej. Lobo Dota Academy..."
              />
            </div>
            <div className="fieldGroup">
              <span className="fieldLabel">Color de Firma</span>
              <div className="colorSelectorGrid">
                {[
                  { hex: "#e53e3e", name: "Rojo Dire" },
                  { hex: "#48bb78", name: "Verde Radiant" },
                  { hex: "#3182ce", name: "Azul Místico" },
                  { hex: "#805ad5", name: "Púrpura Runa" },
                ].map((col) => (
                  <button
                    key={col.hex}
                    className={`colorDotBtn ${brandingColor === col.hex ? "active" : ""}`}
                    style={{ backgroundColor: col.hex }}
                    onClick={() => setBrandingColor(col.hex)}
                    title={col.name}
                    type="button"
                  >
                    {brandingColor === col.hex && <Check size={12} className="colorCheckIcon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="rightCoachColumn">
        <section className="panel editorPanel">
          <div className="panelHeader editorHeader">
            <div>
              <h3 className="panelTitle">
                Editor de Reportes: {activeStudent ? activeStudent.name : "Sin Alumno"}
              </h3>
              <p className="panelNote">
                {coachReport
                  ? `Editando Match ID ${coachReport.matchId}. Escribe tus notas y corrige la IA.`
                  : "Este alumno no tiene partidas auditadas recientemente."}
              </p>
            </div>
            {coachReport && (
              <button
                className="primaryAction copyBtn"
                onClick={copyReport}
                style={{ border: `1px solid ${brandingColor}`, boxShadow: `0 0 10px ${brandingColor}1b` }}
                type="button"
              >
                {copyStatus ? (
                  <>
                    <Check size={16} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Exportar con Marca
                  </>
                )}
              </button>
            )}
          </div>
          <div className="panelBody displayPanelBody editorBody">
            {coachReport ? (
              <div className="editorWrapper">
                <div className="editorBrandingPreview" style={{ borderLeft: `4px solid ${brandingColor}` }}>
                  <div className="academyPreviewTitle" style={{ color: brandingColor }}>
                    {academyName || "Academia del Coach"}
                  </div>
                  <span className="academyPreviewSubtitle">Reporte de Entrenamiento Personalizado</span>
                </div>

                <div className="fieldGroup">
                  <label htmlFor="verdictTextarea" className="fieldLabel">Veredicto del Coach</label>
                  <textarea
                    id="verdictTextarea"
                    className="textInput editorTextarea"
                    rows={3}
                    value={coachReport.verdict}
                    onChange={(e) => updateVerdict(e.target.value)}
                  />
                </div>

                <div className="errorsSection editorSection">
                  <span className="sectionTitle">Editor de los 3 Errores de Mayor Costo</span>
                  {coachReport.errors.map((err, idx) => (
                    <div className="errorReportCard editorCard" key={idx}>
                      <h4 className="errorCardTitle">
                        <span className="errorIndex" style={{ backgroundColor: brandingColor, boxShadow: `0 0 5px ${brandingColor}` }}>
                          {idx + 1}
                        </span>
                        <input
                          className="editorHeaderInput"
                          value={err.title}
                          onChange={(e) => updateError(idx, "title", e.target.value)}
                          placeholder={`Título del Error ${idx + 1}`}
                        />
                      </h4>
                      <div className="errorCardGrid editorCardGrid">
                        <div>
                          <strong>Evidencia en Replay:</strong>
                          <textarea
                            className="textInput editorCellTextarea"
                            rows={2}
                            value={err.evidence}
                            onChange={(e) => updateError(idx, "evidence", e.target.value)}
                          />
                        </div>
                        <div>
                          <strong>Impacto en Oro/Control:</strong>
                          <textarea
                            className="textInput editorCellTextarea redText"
                            rows={2}
                            value={err.impact}
                            onChange={(e) => updateError(idx, "impact", e.target.value)}
                          />
                        </div>
                        <div>
                          <strong>Acción Correctiva:</strong>
                          <textarea
                            className="textInput editorCellTextarea"
                            rows={2}
                            value={err.fix}
                            onChange={(e) => updateError(idx, "fix", e.target.value)}
                          />
                        </div>
                        <div>
                          <strong>Drill / Cómo Practicarlo:</strong>
                          <textarea
                            className="textInput editorCellTextarea greenText"
                            rows={2}
                            value={err.practice}
                            onChange={(e) => updateError(idx, "practice", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="trainingSection editorSection">
                  <span className="sectionTitle">Plan de 7 Días (Edición rápida)</span>
                  <div className="trainingGrid editorGrid">
                    {coachReport.plan.map((dayPlan, idx) => (
                      <div className="trainingDayCard editorDayCard" key={idx}>
                        <span className="dayLabel">DÍA {idx + 1}</span>
                        <textarea
                          className="textInput editorDayTextarea"
                          rows={3}
                          value={dayPlan}
                          onChange={(e) => updateDayPlan(idx, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="emptyState">
                <Clock size={36} className="emptyStateIcon" />
                <h4 className="emptyStateTitle">No hay reporte activo</h4>
                <p className="emptyStateText">
                  {activeStudent
                    ? `El alumno ${activeStudent.name} no registra partidas en el sistema. Solicita su Match ID o haz clic en "Asistente Draft" para iniciar.`
                    : "Selecciona un alumno del panel izquierdo para ver su workspace."}
                </p>
                {activeStudent && activeStudent.id !== APP_CONFIG.DEFAULT_STUDENT_ID && (
                  <button
                    className="primaryAction runActionBtn"
                    onClick={() => setCoachReport(structuredClone(getDefaultMockReport()))}
                    type="button"
                  >
                    <Plus size={16} />
                    Cargar Reporte de Prueba
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
