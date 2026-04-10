// app/components/TopicPills.tsx
'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Shield, Gavel, Heart, Landmark, Briefcase } from 'lucide-react';

const topics = [
  { name: 'Constitutional Rights', icon: Shield, keywords: ['rights', 'constitution', 'freedom'] },
  { name: 'Criminal Law', icon: Gavel, keywords: ['crime', 'penalty', 'theft', 'assault'] },
  { name: 'Family Law', icon: Heart, keywords: ['marriage', 'divorce', 'custody'] },
  { name: 'Land & Property', icon: Landmark, keywords: ['land', 'property', 'eviction'] },
  { name: 'Employment Law', icon: Briefcase, keywords: ['employment', 'work', 'salary'] },
];

export default function TopicPills() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(topicName);
    // You can trigger a search or filter here
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.name}
              onClick={() => handleTopicClick(topic.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                selectedTopic === topic.name
                  ? 'bg-ug-red text-white border-ug-red'
                  : 'bg-white text-ug-black border-ug-border hover:bg-ug-yellow hover:border-ug-yellow'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{topic.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}