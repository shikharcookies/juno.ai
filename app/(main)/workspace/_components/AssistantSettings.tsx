'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AiModelOptions from '@/services/AiModelOptions';
import { Trash2, Save, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ConfirmationAlert from './ConfirmationAlert';

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const UpdateAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistant);
  const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);
  const [loading, setLoading] = useState(false);

  if (!assistant) return null;

  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fixed OnSave function with proper async/await and error handling
  const OnSave = async () => {
    setLoading(true);
    try {
      const result = await UpdateAssistant({
        id: assistant?._id,
       aiModelId: assistant?.aiModelId,
        userInstruction: assistant?.userInstruction,
      });
      toast('Saved!');
    } catch (error) {
      console.error('Error saving assistant:', error);
      toast.error('Failed to save assistant');
    } finally {
      setLoading(false); // This ensures loading is set to false regardless of success or failure
    }
  };

  const OnDelete = async () => {
    console.log("Delete");
    setLoading(true);
    try {
      await DeleteAssistant({ id: assistant?._id });
      setAssistant(null);
      toast.success('Assistant deleted successfully');
    } catch (error) {
      console.error('Error deleting assistant:', error);
      toast.error('Failed to delete assistant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-secondary border-l w-[300px] h-screen flex flex-col relative">
      <h2 className="font-bold text-xl mb-4">Settings</h2>

      {/* Assistant Info */}
      <div className="flex gap-3 items-center">
        <Image
          src={assistant.image}
          alt={assistant.name}
          width={80}
          height={80}
          className="rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-base">{assistant.name}</h2>
          <p className="text-sm text-muted-foreground">{assistant.title}</p>
        </div>
      </div>

      {/* Model Select */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-1 text-muted-foreground">Model:</h3>
        <Select
          defaultValue={assistant.aiModelId}
          onValueChange={(value) => onHandleInputChange('aiModelId', value)}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {AiModelOptions.map((model) => (
              <SelectItem key={model.name} value={model.name}>
                <div className="flex items-center gap-2">
                  <Image
                    src={model.logo}
                    alt={model.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <span>{model.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Instruction Area */}
      <div className="mt-6 flex flex-col flex-1">
        <h3 className="text-sm font-medium mb-1 text-muted-foreground">Instruction:</h3>
        <Textarea
          placeholder="Add instruction..."
          className="h-[180px] bg-white resize-none"
          value={assistant.userInstruction}
          onChange={(e) => onHandleInputChange('userInstruction', e.target.value)}
        />
      </div>

      <div className="absolute bottom-20 left-10 flex gap-10 w-full px-3"> 
        <ConfirmationAlert onDelete={OnDelete}>
          <Button disabled={loading} variant="ghost">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmationAlert>

        <Button onClick={OnSave} disabled={loading}>
          {loading ? (
            <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}

export default AssistantSettings;


// 'use client';

// import React, { useContext, useState } from 'react';
// import Image from 'next/image';
// import { AssistantContext } from '@/context/AssistantContext';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import AiModelOptions from '@/services/AiModelOptions';
// import { Trash2, Save } from 'lucide-react';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogTrigger,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from '@/components/ui/alert-dialog';
// import { toast } from 'sonner';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function AssistantSettings() {
//   const { assistant, setAssistant } = useContext(AssistantContext);
//   const UpdateAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistant);
//   const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);
//   const [loading, setLoading] = useState(false);

//   if (!assistant) return null;

//   const onHandleInputChange = (field: string, value: string) => {
//     setAssistant((prev: any) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const OnSave = async () => {
//     setLoading(true);
//     try {
//       await UpdateAssistant({
//         id: assistant?._id,
//         aiModelId: assistant?.aiModelId,
//         userInstruction: assistant?.userInstruction,
//       });
//       toast.success('Assistant updated successfully');
//     } catch (err) {
//       toast.error('Failed to update assistant');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await DeleteAssistant({ id: assistant._id });
//       setAssistant(null);
//       toast.success('Assistant deleted');
//     } catch (err) {
//       toast.error('Failed to delete assistant');
//     }
//   };

//   return (
//     <div className="p-5 bg-secondary border-l w-[300px] h-screen flex flex-col">
//       <h2 className="font-bold text-xl mb-4">Settings</h2>

//       {/* Assistant Info */}
//       <div className="flex gap-3 items-center">
//         <Image
//           src={assistant.image}
//           alt={assistant.name}
//           width={80}
//           height={80}
//           className="rounded-xl object-cover"
//         />
//         <div>
//           <h2 className="font-bold text-base">{assistant.name}</h2>
//           <p className="text-sm text-muted-foreground">{assistant.title}</p>
//         </div>
//       </div>

//       {/* Model Select */}
//       <div className="mt-6">
//         <h3 className="text-sm font-medium mb-1 text-muted-foreground">Model:</h3>
//         <Select
//           value={assistant.aiModelId || ''}
//           onValueChange={(value) => onHandleInputChange('aiModelId', value)}
//         >
//           <SelectTrigger className="w-full bg-white">
//             <SelectValue placeholder="Select Model" />
//           </SelectTrigger>
//           <SelectContent>
//             {AiModelOptions.map((model) => (
//               <SelectItem key={model.name} value={model.name}>
//                 <div className="flex items-center gap-2">
//                   <Image
//                     src={model.logo}
//                     alt={model.name}
//                     width={20}
//                     height={20}
//                     className="rounded-sm"
//                   />
//                   <span>{model.name}</span>
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Instruction Area */}
//       <div className="mt-6 flex flex-col">
//         <h3 className="text-sm font-medium mb-1 text-muted-foreground">Instruction:</h3>
//         <Textarea
//           placeholder="Add instruction..."
//           className="h-[180px] bg-white"
//           value={assistant.userInstruction}
//           onChange={(e) => onHandleInputChange('userInstruction', e.target.value)}
//         />
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-auto flex gap-3 pt-4 border-t">
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="ghost" className="text-red-500">
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Are you sure you want to delete this assistant?
//               </AlertDialogTitle>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={handleDelete}>Yes, Delete</AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         <Button disabled={loading} onClick={OnSave}>
//           <Save className="w-4 h-4 mr-2" />
//           {loading ? 'Saving...' : 'Save'}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default AssistantSettings;
