import React from 'react';
import { StoryChapter } from './StoryChapter';
import { StoryTimeline } from './StoryTimeline';

export const ExperienceTimeline: React.FC = () => {
  return (
    <StoryChapter
      id="experience"
      chapterNumber="CH_05"
      title="THE EVOLUTION: EDUCATION & ACHIEVEMENTS"
      subtitle="Academic & Internship Milestones"
      narrativeLogline="From undergraduate engineering coursework in operating systems and networks to developer internships at Cybernaut and ELITA. Concrete growth with zero inflated claims."
      environmentTheme="timeline"
    >
      <StoryTimeline />
    </StoryChapter>
  );
};
