import React from 'react';
import { StoryChapter } from './StoryChapter';
import { SkillTree } from './SkillTree';

export const SkillsSection: React.FC = () => {
  return (
    <StoryChapter
      id="skills"
      chapterNumber="CH_03"
      title="THE ARSENAL: HOLOGRAPHIC ABILITY TREE"
      subtitle="Holographic Ability Tree & Technical Capabilities"
      narrativeLogline="A connected neural graph of verified engineering competencies, organized by domain and substantiated by real project repositories and developer internship contributions."
      environmentTheme="hologram-lab"
    >
      <SkillTree />
    </StoryChapter>
  );
};
