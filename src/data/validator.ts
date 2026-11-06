import { ContentValidationResult } from '../types';
import { personalProfileData } from './profile';
import { projectsData } from './projects';
import { skillsData } from './skills';
import { experienceData } from './experience';
import { blogArticlesData } from './blogArticles';
import { certificationsData } from './certifications';
import { achievementsData } from './achievements';

const URL_REGEX = /^(https?:\/\/|mailto:)/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePortfolioData(): ContentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();

  // 1. Profile Validation
  if (!personalProfileData.name || personalProfileData.name.trim() === '') {
    errors.push('Profile: Name is required.');
  }
  if (!personalProfileData.headline || personalProfileData.headline.trim() === '') {
    errors.push('Profile: Headline is required.');
  }
  if (!personalProfileData.bio || personalProfileData.bio.length === 0) {
    errors.push('Profile: Bio must contain at least one paragraph.');
  }
  if (!EMAIL_REGEX.test(personalProfileData.contact.email)) {
    errors.push(`Profile: Invalid email format (${personalProfileData.contact.email}).`);
  }
  if (!URL_REGEX.test(personalProfileData.contact.github)) {
    errors.push(`Profile: Invalid GitHub URL (${personalProfileData.contact.github}).`);
  }
  if (!URL_REGEX.test(personalProfileData.contact.linkedin)) {
    errors.push(`Profile: Invalid LinkedIn URL (${personalProfileData.contact.linkedin}).`);
  }

  // 2. Projects Validation
  projectsData.forEach((project, idx) => {
    if (!project.id || project.id.trim() === '') {
      errors.push(`Projects [${idx}]: ID is missing.`);
    } else if (seenIds.has(project.id)) {
      errors.push(`Projects [${idx}]: Duplicate ID detected "${project.id}".`);
    } else {
      seenIds.add(project.id);
    }

    if (!project.title || project.title.trim() === '') {
      errors.push(`Projects [${project.id || idx}]: Title is required.`);
    }
    if (!project.category || project.category.trim() === '') {
      errors.push(`Projects [${project.id || idx}]: Category is required.`);
    }
    if (!project.problem || project.problem.trim() === '') {
      errors.push(`Projects [${project.id || idx}]: Problem statement is required.`);
    }
    if (!project.solution || project.solution.trim() === '') {
      errors.push(`Projects [${project.id || idx}]: Solution statement is required.`);
    }
    if (!project.technologies || project.technologies.length === 0) {
      warnings.push(`Projects [${project.id || idx}]: Technologies list is empty.`);
    }
    if (project.demoUrl && !URL_REGEX.test(project.demoUrl)) {
      errors.push(`Projects [${project.id || idx}]: Invalid demoUrl (${project.demoUrl}).`);
    }
    if (project.repoUrl && !URL_REGEX.test(project.repoUrl)) {
      errors.push(`Projects [${project.id || idx}]: Invalid repoUrl (${project.repoUrl}).`);
    }
  });

  // 3. Skills Validation
  skillsData.forEach((skill, idx) => {
    if (!skill.id || skill.id.trim() === '') {
      errors.push(`Skills [${idx}]: ID is missing.`);
    } else if (seenIds.has(skill.id)) {
      errors.push(`Skills [${idx}]: Duplicate ID detected "${skill.id}".`);
    } else {
      seenIds.add(skill.id);
    }

    if (!skill.title || skill.title.trim() === '') {
      errors.push(`Skills [${skill.id || idx}]: Title is required.`);
    }
    if (!skill.items || skill.items.length === 0) {
      errors.push(`Skills [${skill.id || idx}]: Must contain at least one skill item.`);
    }
  });

  // 4. Experience Validation
  experienceData.forEach((exp, idx) => {
    if (!exp.role || exp.role.trim() === '') {
      errors.push(`Experience [${idx}]: Role is required.`);
    }
    if (!exp.organization || exp.organization.trim() === '') {
      errors.push(`Experience [${idx}]: Organization is required.`);
    }
    if (!exp.period || exp.period.trim() === '') {
      errors.push(`Experience [${idx}]: Period is required.`);
    }
    if (!exp.highlights || exp.highlights.length === 0) {
      warnings.push(`Experience [${idx}]: Highlights array is empty.`);
    }
  });

  // 5. Blog Articles Validation
  blogArticlesData.forEach((art, idx) => {
    if (!art.id || art.id.trim() === '') {
      errors.push(`Blog [${idx}]: ID is missing.`);
    } else if (seenIds.has(art.id)) {
      errors.push(`Blog [${idx}]: Duplicate ID detected "${art.id}".`);
    } else {
      seenIds.add(art.id);
    }

    if (!art.slug || art.slug.trim() === '') {
      errors.push(`Blog [${art.id || idx}]: Slug is required.`);
    }
    if (!art.title || art.title.trim() === '') {
      errors.push(`Blog [${art.id || idx}]: Title is required.`);
    }
    if (!art.summary || art.summary.trim() === '') {
      errors.push(`Blog [${art.id || idx}]: Summary is required.`);
    }
    if (!art.content || art.content.length === 0) {
      errors.push(`Blog [${art.id || idx}]: Content paragraphs are required.`);
    }
  });

  // 6. Certifications Validation
  certificationsData.forEach((cert, idx) => {
    if (!cert.id || cert.id.trim() === '') {
      errors.push(`Certifications [${idx}]: ID is missing.`);
    } else if (seenIds.has(cert.id)) {
      errors.push(`Certifications [${idx}]: Duplicate ID detected "${cert.id}".`);
    } else {
      seenIds.add(cert.id);
    }

    if (!cert.title || cert.title.trim() === '') {
      errors.push(`Certifications [${cert.id || idx}]: Title is required.`);
    }
    if (!cert.issuer || cert.issuer.trim() === '') {
      errors.push(`Certifications [${cert.id || idx}]: Issuer is required.`);
    }
    if (cert.credentialUrl && !URL_REGEX.test(cert.credentialUrl)) {
      errors.push(`Certifications [${cert.id || idx}]: Invalid credentialUrl (${cert.credentialUrl}).`);
    }
  });

  // 7. Achievements Validation
  achievementsData.forEach((ach, idx) => {
    if (!ach.id || ach.id.trim() === '') {
      errors.push(`Achievements [${idx}]: ID is missing.`);
    } else if (seenIds.has(ach.id)) {
      errors.push(`Achievements [${idx}]: Duplicate ID detected "${ach.id}".`);
    } else {
      seenIds.add(ach.id);
    }

    if (!ach.title || ach.title.trim() === '') {
      errors.push(`Achievements [${ach.id || idx}]: Title is required.`);
    }
    if (!ach.organization || ach.organization.trim() === '') {
      errors.push(`Achievements [${ach.id || idx}]: Organization is required.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalProjects: projectsData.length,
      totalSkills: skillsData.length,
      totalArticles: blogArticlesData.length,
      totalCertifications: certificationsData.length,
      totalAchievements: achievementsData.length,
      totalExperience: experienceData.length
    }
  };
}

