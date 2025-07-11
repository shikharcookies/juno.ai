// 'use client';

// import React, { useState, useContext, useEffect } from 'react';
// import AiAssistantsList from '@/services/AiAssistantsList';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import { useConvex, useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { AuthContext } from '@/context/AuthContext';

// export type ASSISTANT = {
//   id: number;
//   name: string;
//   title: string;
//   image: string;
//   instruction: string;
//   userInstruction: string;
//   sampleQuestions: string[];
// };

// function AIAssistants() {
//   const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
//   const [existingIds, setExistingIds] = useState<Set<number>>(new Set());
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const convex = useConvex();

//   const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (user?._id) {
//       GetUserAssistants();
//     }
//   }, [user]);

//   const GetUserAssistants = async () => {
//     try {
//       const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
//         uid: user._id,
//       });

//       const existingSet = new Set(result.map((a) => a.id));
//       setExistingIds(existingSet);

//       // Optional: preselect existing assistants visually
//       const cleaned = result.map(({ _id, _creationTime, uid, ...rest }) => rest);
//       setSelectedAssistant(cleaned);
//     } catch (err) {
//       console.error("Failed to fetch user assistants:", err);
//     }
//   };

//   const onSelect = (assistant: ASSISTANT) => {
//     const isSelected = selectedAssistant.some(item => item.id === assistant.id);
//     if (isSelected) {
//       setSelectedAssistant(selectedAssistant.filter(item => item.id !== assistant.id));
//     } else {
//       setSelectedAssistant([...selectedAssistant, assistant]);
//     }
//   };

//   const isAssistantSelected = (assistant: ASSISTANT) =>
//     selectedAssistant.some(item => item.id === assistant.id);

//   const OnClickContinue = async () => {
//     if (!user?._id) return;
//     setLoading(true);

//     try {
//       const toInsert = selectedAssistant.filter((a) => !existingIds.has(a.id));

//       if (toInsert.length > 0) {
//         const cleanedAssistants = toInsert.map(({ id, name, title, image, instruction, userInstruction, sampleQuestions }) => ({
//           id,
//           name,
//           title,
//           image,
//           instruction,
//           userInstruction,
//           sampleQuestions,
//         }));

//         const result = await insertAssistant({
//           records: cleanedAssistants,
//           uid: user._id,
//         });

//         console.log('Inserted:', result);
//       } else {
//         console.log('No new assistants to insert.');
//       }

//       router.push('/workspace');
//     } catch (e) {
//       console.error('Insertion failed:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-5 py-10 md:px-20 lg:px-36 xl:px-48">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-3xl font-bold">Welcome to the world of AI</h2>
//           <p className="text-xl mt-2 text-muted-foreground">Choose your AI Companions</p>
//         </div>
//         <Button disabled={selectedAssistant.length === 0 || loading} onClick={OnClickContinue}>
//           {loading ? 'Saving...' : 'Continue'}
//         </Button>
//       </div>

//       <div className="grid grid-cols-5 gap-6">
//         {AiAssistantsList.map((assistant) => {
//           const selected = isAssistantSelected(assistant);
//           const alreadySaved = existingIds.has(assistant.id);

//           return (
//             <div
//               key={`${assistant.id}-${assistant.name}`}
//               className={`relative border rounded-xl shadow-md p-4 flex flex-col items-center transition-all duration-200 cursor-pointer hover:shadow-lg ${
//                 selected ? 'ring-2 ring-blue-500' : ''
//               }`}
//               onClick={() => onSelect(assistant)}
//             >
//               <input
//                 type="checkbox"
//                 checked={selected}
//                 readOnly
//                 className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
//               />
//               <Image
//                 src={assistant.image}
//                 alt={assistant.name}
//                 width={100}
//                 height={100}
//                 className="rounded-full object-cover mb-4"
//               />
//               <h3 className="text-lg font-semibold">{assistant.name}</h3>
//               <p className="text-sm text-muted-foreground text-center">
//                 {assistant.title}
//                 {alreadySaved && <span className="text-[10px] text-green-600 ml-1">(Already Added)</span>}
//               </p>
//               <Button className="mt-4 w-full" variant={selected ? 'secondary' : 'default'}>
//                 {selected ? 'Selected' : 'Use'}
//               </Button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default AIAssistants;


'use client';

import React, { useState, useContext, useEffect } from 'react';
import AiAssistantsList from '@/services/AiAssistantsList';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
  const [existingIds, setExistingIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const convex = useConvex();

  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      GetUserAssistants();
    }
  }, [user]);

  const GetUserAssistants = async () => {
    try {
      const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
        uid: user._id,
      });

      const existingSet = new Set(result.map((a) => a.id));
      setExistingIds(existingSet);

      // Optional: preselect existing assistants visually
      const cleaned = result.map(({ _id, _creationTime, uid, ...rest }) => rest);
      setSelectedAssistant(cleaned);
    } catch (err) {
      console.error("Failed to fetch user assistants:", err);
    }
  };

  const onSelect = (assistant: ASSISTANT) => {
    const isSelected = selectedAssistant.some(item => item.id === assistant.id);
    if (isSelected) {
      setSelectedAssistant(selectedAssistant.filter(item => item.id !== assistant.id));
    } else {
      setSelectedAssistant([...selectedAssistant, assistant]);
    }
  };

  const isAssistantSelected = (assistant: ASSISTANT) =>
    selectedAssistant.some(item => item.id === assistant.id);

  const OnClickContinue = async () => {
    if (!user?._id) return;
    setLoading(true);

    try {
      const toInsert = selectedAssistant.filter((a) => !existingIds.has(a.id));

      if (toInsert.length > 0) {
        const cleanedAssistants = toInsert.map(({ id, name, title, image, instruction, userInstruction, sampleQuestions }) => ({
          id,
          name,
          title,
          image,
          instruction,
          userInstruction,
          sampleQuestions,
        }));

        const result = await insertAssistant({
          records: cleanedAssistants,
          uid: user._id,
        });

        console.log('Inserted:', result);
      } else {
        console.log('No new assistants to insert.');
      }

      router.push('/workspace');
    } catch (e) {
      console.error('Insertion failed:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-5 py-10 md:px-20 lg:px-36 xl:px-48">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
                Welcome to the world of AI
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
              Choose your AI Companions
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Select from our curated collection of specialized AI assistants to enhance your productivity and creativity.
            </p>
          </div>
          
          {/* Continue Button */}
          <div className="flex flex-col items-end space-y-2">
            <Button 
              disabled={selectedAssistant.length === 0 || loading} 
              onClick={OnClickContinue}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Continue</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selectedAssistant.length} assistant{selectedAssistant.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>

        {/* Assistants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {AiAssistantsList.map((assistant, index) => {
            const selected = isAssistantSelected(assistant);
            const alreadySaved = existingIds.has(assistant.id);

            return (
              <div
                key={`${assistant.id}-${assistant.name}`}
                className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
                  selected 
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50' 
                    : 'hover:bg-white/90 dark:hover:bg-gray-800/90'
                }`}
                onClick={() => onSelect(assistant)}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selected 
                    ? 'bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400' 
                    : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                }`}>
                  {selected && (
                    <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Already Saved Badge */}
                {alreadySaved && (
                  <div className="absolute top-4 left-4 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg text-xs font-medium">
                    Added
                  </div>
                )}

                {/* Avatar */}
                <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image
                    src={assistant.image}
                    alt={assistant.name}
                    width={80}
                    height={80}
                    className="relative rounded-full object-cover ring-4 ring-white/50 dark:ring-gray-700/50 shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="text-center space-y-3 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {assistant.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {assistant.title}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-4 w-full">
                  <Button 
                    className={`w-full font-semibold transition-all duration-200 ${
                      selected 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    variant="ghost"
                  >
                    {selected ? (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Selected</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Select</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {AiAssistantsList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No AI Assistants Available</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new AI companions.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AIAssistants;