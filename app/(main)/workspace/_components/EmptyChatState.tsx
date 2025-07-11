'use client';

import React, { useContext } from 'react';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { AssistantContext } from '@/context/AssistantContext';
import { ChevronRight } from 'lucide-react';

interface EmptyChatStateProps {
  onSampleClick: (question: string) => void;
}

function EmptyChatState({ onSampleClick }: EmptyChatStateProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SparklesText className="text-2xl text-center">
        How may I assist you today?
      </SparklesText>
      
      {/* Sample Questions */}
      {assistant?.sampleQuestions?.length > 0 && (
        <div className="mt-7 w-full max-w-2xl">
          {assistant.sampleQuestions.map((suggestion: string, index: number) => (
            <div key={index}>
              <h2 
                className="p-4 text-shadow-lg border mt-1 rounded-xl hover:bg-gray-100 cursor-pointer flex items-center justify-between transition-colors"
                onClick={() => onSampleClick(suggestion)}
              >
                {suggestion} 
                <ChevronRight />
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmptyChatState;