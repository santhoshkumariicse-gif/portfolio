import { ProcessStep } from '../types';

export const processData: ProcessStep[] = [
  {
    number: '01',
    title: 'Deconstruct & Understand',
    description: 'Clarify the core problem, user threat vector, or operational requirement before writing code. Map out boundaries and potential failure modes.'
  },
  {
    number: '02',
    title: 'Architect & Plan',
    description: 'Design modular components, explicit data contracts, and defensive input barriers. Avoid over-engineering by selecting proportional tooling.'
  },
  {
    number: '03',
    title: 'Implement Incrementally',
    description: 'Build small, testable, and self-documenting modules. Maintain clean separation of concerns and preserve documentation integrity throughout.'
  },
  {
    number: '04',
    title: 'Verify & Audit',
    description: 'Inspect edge cases, sanitize input sinks, review error handling, and test across device widths, keyboard navigation, and reduced-motion modes.'
  },
  {
    number: '05',
    title: 'Deliver & Document',
    description: 'Provide reproducible build scripts, clear evidence status, and operational runbooks so systems can be maintained reliably without ambiguity.'
  }
];

