/**
 * Privacy-First Lightweight Analytics Engine
 * 
 * Guarantees:
 * - Zero third-party scripts or cookies
 * - Zero fingerprinting (no canvas, hardware, or IP fingerprinting)
 * - Zero PII collection (no passwords, emails, form values, or IP recording)
 * - Respects Do Not Track (DNT) header automatically
 * - Supports explicit opt-out via localStorage ('portfolio_analytics_opt_out')
 * - Safe development mode with console debugging
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'project_view'
  | 'resume_action'
  | 'external_click'
  | 'terminal_command'
  | 'security_lab_run';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload: Record<string, string | number | boolean>;
  timestamp: number;
}

class PrivacyAnalyticsTracker {
  private isOptedOut: boolean = false;
  private isDevelopment: boolean = false;

  constructor() {
    this.isDevelopment = import.meta.env.DEV ?? false;
    this.checkConsentAndDNT();
  }

  private checkConsentAndDNT(): void {
    if (typeof window === 'undefined') return;

    // Respect Do Not Track header
    const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
    if (dnt === '1' || dnt === 'yes') {
      this.isOptedOut = true;
      return;
    }

    // Check localStorage opt-out
    try {
      const stored = localStorage.getItem('portfolio_analytics_opt_out');
      if (stored === 'true') {
        this.isOptedOut = true;
      }
    } catch {
      // Storage unavailable / private mode
    }
  }

  public setOptOut(optOut: boolean): void {
    this.isOptedOut = optOut;
    try {
      localStorage.setItem('portfolio_analytics_opt_out', optOut ? 'true' : 'false');
    } catch {
      // Ignore storage errors
    }
  }

  public getOptOutStatus(): boolean {
    return this.isOptedOut;
  }

  public track(type: AnalyticsEventType, payload: Record<string, string | number | boolean> = {}): void {
    if (this.isOptedOut) {
      return;
    }

    const event: AnalyticsEvent = {
      type,
      payload,
      timestamp: Date.now()
    };

    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug('[Privacy Analytics: Dev]', event);
      return;
    }

    // In static production mode, we dispatch a custom browser event for optional telemetry sinks
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: event }));
    }
  }

  // Convenience track helpers
  public trackPageView(path: string): void {
    // Strip query parameters to avoid accidental token/PII leak
    const cleanPath = path.split('?')[0].split('#')[0];
    this.track('page_view', { path: cleanPath });
  }

  public trackProjectView(projectId: string, title: string): void {
    this.track('project_view', { projectId, title });
  }

  public trackResumeAction(action: 'print' | 'request'): void {
    this.track('resume_action', { action });
  }

  public trackExternalClick(target: 'github' | 'linkedin' | 'external', destination: string): void {
    this.track('external_click', { target, destination });
  }

  public trackSecurityLab(labId: string): void {
    this.track('security_lab_run', { labId });
  }
}

export const analytics = new PrivacyAnalyticsTracker();

