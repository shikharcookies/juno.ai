'use client';

import React from 'react';
import AssistantList from './_components/AssistantList';
import AssistantSettings from './_components/AssistantSettings';
import ChatUI from './_components/ChatUI';

function Workspace() {
  return (
    <div className = 'h-screen fixed w-full'>
    <div className="grid grid-cols-5">
      <div className="hidden md:block">
        <AssistantList />
      </div>
      <div className="md:col-span-4 lg:col-span-3"><ChatUI/></div>
      <div className="block">
         <AssistantSettings />
      </div>
    </div>
    </div>
  );
}

export default Workspace;


