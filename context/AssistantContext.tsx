// // context/AssistantContext.tsx
// 'use client';

// import React, { createContext, useState } from 'react';

// export const AssistantContext = createContext<any>(null);

// export const AssistantProvider = ({ children }: { children: React.ReactNode }) => {
//   const [assistant, setAssistant] = useState(null);

//   return (
//     <AssistantContext.Provider value={{ assistant, setAssistant }}>
//       {children}
//     </AssistantContext.Provider>
//   );
// };


import { createContext } from "react";

export const AssistantContext = createContext<any>(null);