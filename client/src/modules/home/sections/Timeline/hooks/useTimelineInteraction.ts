'use client';

import { useState } from 'react';
import { TIMELINE_MILESTONES } from '../constants';

export function useTimelineInteraction(initialId = '1997') {
  const [selectedId, setSelectedId] = useState(initialId);

  const selectedMilestone =
    TIMELINE_MILESTONES.find((m) => m.id === selectedId) || TIMELINE_MILESTONES[1];

  const selectMilestone = (id: string) => {
    setSelectedId(id);
  };

  return {
    selectedId,
    selectedMilestone,
    selectMilestone,
    milestones: TIMELINE_MILESTONES,
  };
}
