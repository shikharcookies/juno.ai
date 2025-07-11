// 'use client';

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '@/context/AuthContext';
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { AssistantContext } from '@/context/AssistantContext';
// import { usePathname } from 'next/navigation';

// export type ASSISTANT = {
//   _id: string;
//   id: number;
//   name: string;
//   title: string;
//   image: string;
//   instruction: string;
//   userInstruction: string;
//   sampleQuestions: string[];
// };

// function AssistantList() {
//   const { user } = useContext(AuthContext);
//   const { assistant, setAssistant } = useContext(AssistantContext);
//   const convex = useConvex();
//   const pathname = usePathname();

//   const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   // useEffect(() => {
//   //   if (user?._id) {
//   //     GetUserAssistants();
//   //   }
//   // }, [user]);


//   const GetUserAssistants = async () => {
//     try {
//       const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
//         uid: user._id,
//       });

//       // ✅ Filter duplicates based on `id`
//       const unique = new Map<number, ASSISTANT>();
//       for (const a of result) {
//         if (!unique.has(a.id)) {
//           unique.set(a.id, a);
//         }
//       }

//       setAssistantList(Array.from(unique.values()));
//     } catch (error) {
//       console.error('Error fetching assistants:', error);
//     }
//   };

//   // ✅ Filter by search
//   const filtered = assistantList.filter((a) =>
//     a.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-5 bg-secondary border-r w-[300px] h-screen flex flex-col">
//       {/* ✅ Conditional header (hide on /workspace) */}
//       {pathname !== '/workspace' && (
//         <>
//           <h2 className="font-bold text-lg">Your Personal AI Assistants</h2>
//           <Button className="w-full mt-3">+ Add New Assistant</Button>
//           <Input
//             className="bg-white mt-3"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </>
//       )}

//       {/* ✅ Assistant List */}
//       <div className="mt-5 space-y-4 overflow-y-auto flex-1 pr-2">
//         {filtered.map((a) => (
//           <div
//             key={a._id}
//             onClick={() => setAssistant(a)} // ✅ Select assistant in context
//             className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition
//               ${assistant?._id === a._id ? 'bg-accent' : ''}`}
//           >
//             <Image
//               src={a.image}
//               alt={a.name}
//               width={50}
//               height={50}
//               className="rounded-xl object-cover w-[50px] h-[50px]"
//             />
//             <div>
//               <h4 className="text-sm font-semibold">{a.name}</h4>
//               <p className="text-xs text-muted-foreground">{a.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Footer */}
//       <div className="pt-4 border-t mt-4">
//         <p className="text-xs text-muted-foreground text-center">
//           {assistantList.length} assistants loaded
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AssistantList;


// 'use client';

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '@/context/AuthContext';
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { AssistantContext } from '@/context/AssistantContext';
// import { usePathname } from 'next/navigation';

// export type ASSISTANT = {
//   _id: string;
//   id: number;
//   name: string;
//   title: string;
//   image: string;
//   instruction: string;
//   userInstruction: string;
//   sampleQuestions: string[];
// };

// function AssistantList() {
//   const { user } = useContext(AuthContext);
//   const { assistant, setAssistant } = useContext(AssistantContext);
//   const convex = useConvex();
//   const pathname = usePathname();

//   const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     if (user?._id) {
//       GetUserAssistants();
//     }
//   }, [user && assistant == null]);

//   const GetUserAssistants = async () => {
//     try {
//       const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
//         uid: user._id,
//       });

//       const unique = new Map<number, ASSISTANT>();
//       for (const a of result) {
//         if (!unique.has(a.id)) {
//           unique.set(a.id, a);
//         }
//       }

//       setAssistantList(Array.from(unique.values()));
//     } catch (error) {
//       console.error('Error fetching assistants:', error);
//     }
//   };

//   const filtered = assistantList.filter((a) =>
//     a.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-5 bg-secondary border-r w-[300px] h-screen flex flex-col">
//       {pathname !== '/workspace' && (
//         <>
//           <h2 className="font-bold text-lg">Your Personal AI Assistants</h2>
//           <Button className="w-full mt-3">+ Add New Assistant</Button>
//           <Input
//             className="bg-white mt-3"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </>
//       )}

//       <div className="mt-5 space-y-4 overflow-y-auto flex-1 pr-2">
//         {filtered.map((a) => (
//           <div
//             key={a._id}
//             onClick={() => setAssistant(a)}
//             className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition ${
//               assistant?._id === a._id ? 'bg-accent' : ''
//             }`}
//           >
//             <Image
//               src={a.image}
//               alt={a.name}
//               width={50}
//               height={50}
//               className="rounded-xl object-cover w-[50px] h-[50px]"
//             />
//             <div>
//               <h4 className="text-sm font-semibold">{a.name}</h4>
//               <p className="text-xs text-muted-foreground">{a.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer always pinned at bottom */}
//       <div className="pt-4 border-t mt-4">
//         <p className="text-xs text-muted-foreground text-center">
//           {assistantList.length} assistants loaded
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AssistantList;


'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';
import { usePathname } from 'next/navigation';

export type ASSISTANT = {
  _id: string;
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AssistantList() {
  const { user } = useContext(AuthContext);
  const { assistant, setAssistant } = useContext(AssistantContext);
  const convex = useConvex();
  const pathname = usePathname();

  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   if (user?._id) {
  //     GetUserAssistants();
  //   }
  // }, [user]);

    useEffect(() => {
    user && GetUserAssistants();
  }, [user && assistant == null ])

  const GetUserAssistants = async () => {
    try {
      const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
        uid: user._id,
      });

      // ✅ Filter duplicates based on `id`
      const unique = new Map<number, ASSISTANT>();
      for (const a of result) {
        if (!unique.has(a.id)) {
          unique.set(a.id, a);
        }
      }

      setAssistantList(Array.from(unique.values()));
    } catch (error) {
      console.error('Error fetching assistants:', error);
    }
  };

  // ✅ Filter by search
  const filtered = assistantList.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 bg-secondary border-r w-[300px] h-screen flex flex-col">
      {/* ✅ Conditional header (hide on /workspace) */}
      {pathname !== '/workspace' && (
        <>
          <h2 className="font-bold text-lg">Your Personal AI Assistants</h2>
          <Button className="w-full mt-3">+ Add New Assistant</Button>
          <Input
            className="bg-white mt-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      )}

      {/* ✅ Assistant List */}
      <div className="mt-5 space-y-4 overflow-y-auto flex-1 pr-2">
        {filtered.map((a) => (
          <div
            key={a._id}
            onClick={() => setAssistant(a)} // ✅ Select assistant in context
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition
              ${assistant?._id === a._id ? 'bg-accent' : ''}`}
          >
            <Image
              src={a.image}
              alt={a.name}
              width={50}
              height={50}
              className="rounded-xl object-cover w-[50px] h-[50px]"
            />
            <div>
              <h4 className="text-sm font-semibold">{a.name}</h4>
              <p className="text-xs text-muted-foreground">{a.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      <div className="pt-4 border-t mt-4">
        <p className="text-xs text-muted-foreground text-center">
          {assistantList.length} assistants loaded
        </p>
      </div>
    </div>
  );
}

export default AssistantList;
