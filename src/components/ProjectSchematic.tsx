import React from 'react';
import { RdaArchitectureSvg } from '../svgs/RdaArchitectureSvg';
import { HrSuiteArchitectureSvg } from '../svgs/HrSuiteArchitectureSvg';
import { RecallAiArchitectureSvg } from '../svgs/RecallAiArchitectureSvg';
import { CybersecurityWorkflowSvg } from '../svgs/CybersecurityWorkflowSvg';
import { PythonAutomationSvg } from '../svgs/PythonAutomationSvg';
import { CtfMatrixSvg } from '../svgs/CtfMatrixSvg';

interface ProjectSchematicProps {
  architectureType: 'rda' | 'hr-suite' | 'recall-ai' | 'sec-test' | 'py-automation' | 'ctf-matrix';
  isConceptual: boolean;
}

export const ProjectSchematic: React.FC<ProjectSchematicProps> = ({
  architectureType,
  isConceptual
}) => {
  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden transition-all duration-300 group-hover:border-[var(--active-border)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
      {/* Schematic Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[rgba(19,21,18,0.92)] border-b border-[var(--border)] font-[var(--mono)] text-[0.65rem] tracking-wider text-[var(--secondary-text)]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          SCHEMATIC // {architectureType.toUpperCase()}
        </span>
        <span className="text-[var(--accent)] font-bold">
          {isConceptual ? 'CONCEPTUAL_SPEC' : 'PRACTICE_VERIFIED'}
        </span>
      </div>

      {/* SVG Container */}
      <div className="p-3 md:p-4">
        {architectureType === 'rda' && <RdaArchitectureSvg />}
        {architectureType === 'hr-suite' && <HrSuiteArchitectureSvg />}
        {architectureType === 'recall-ai' && <RecallAiArchitectureSvg />}
        {architectureType === 'sec-test' && <CybersecurityWorkflowSvg />}
        {architectureType === 'py-automation' && <PythonAutomationSvg />}
        {architectureType === 'ctf-matrix' && <CtfMatrixSvg />}
      </div>
    </div>
  );
};

