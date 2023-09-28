// "use client";
// import { z } from "zod";
// import { ColumnDef } from "@tanstack/react-table";
// import { Eye, FileEdit, Trash } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   TooltipProvider,
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";
// import Link from "next/link";

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export const videoSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   url: z.string(),
//   uploader: z.string(),
//   date: z.date(),
//   status: z.enum(["pending", "processing", "success", "failed"]),
// });
// export type Video = z.infer<typeof videoSchema>;

// export const columns: ColumnDef<Video>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//   },
//   {
//     accessorKey: "uploader",
//     header: "Uploader",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const value = row.original.status;
//       switch (value) {
//         case "pending":
//           // return <span className="text-sm text-yellow-500">Pending</span>;
//           return (
//             <Badge className="bg-yellow-500" variant="default">
//               Pending
//             </Badge>
//           );
//         case "processing":
//           return (
//             <Badge className="bg-blue-500" variant="default">
//               Processing
//             </Badge>
//           );
//         case "success":
//           return (
//             <Badge className="bg-green-500" variant="default">
//               Success
//             </Badge>
//           );
//         case "failed":
//           return (
//             <Badge className="bg-red-500" variant="default">
//               Failed
//             </Badge>
//           );
//       }
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const video = row.original;
//       return (
//         <div className="flex gap-3">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="default" size="icon">
//                   <Link href={`/debates/${video.id}`}>
//                     <Eye />
//                   </Link>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>View</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="default" size="icon">
//                   <Link href={`/debates/${video.id}`}>
//                     <FileEdit />
//                   </Link>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Edit</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="default" size="icon">
//                   <Trash />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Delete</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       );
//     },
//   },
// ];
