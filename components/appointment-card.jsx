// "use client";

// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Calendar,
//   Clock,
//   User,
//   Video,
//   Stethoscope,
//   X,
//   Edit,
//   Loader2,
//   CheckCircle,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   cancelAppointment,
//   addAppointmentNotes,
//   markAppointmentCompleted,
// } from "@/actions/doctor";
// import { generateVideoToken } from "@/actions/appointments";
// import useFetch from "@/hooks/use-fetch";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export function AppointmentCard({
//   appointment,
//   userRole,
//   refetchAppointments,
// }) {
//   const [open, setOpen] = useState(false);
//   const [action, setAction] = useState(null); // 'cancel', 'notes', 'video', or 'complete'
//   const [notes, setNotes] = useState(appointment.notes || "");
//   const router = useRouter();

//   // UseFetch hooks for server actions
//   const {
//     loading: cancelLoading,
//     fn: submitCancel,
//     data: cancelData,
//   } = useFetch(cancelAppointment);
//   const {
//     loading: notesLoading,
//     fn: submitNotes,
//     data: notesData,
//   } = useFetch(addAppointmentNotes);
//   const {
//     loading: tokenLoading,
//     fn: submitTokenRequest,
//     data: tokenData,
//   } = useFetch(generateVideoToken);
//   const {
//     loading: completeLoading,
//     fn: submitMarkCompleted,
//     data: completeData,
//   } = useFetch(markAppointmentCompleted);

//   // Format date and time
//   const formatDateTime = (dateString) => {
//     try {
//       return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
//     } catch (e) {
//       return "Invalid date";
//     }
//   };

//   // Format time only
//   const formatTime = (dateString) => {
//     try {
//       return format(new Date(dateString), "h:mm a");
//     } catch (e) {
//       return "Invalid time";
//     }
//   };

//   // Check if appointment can be marked as completed
//   const canMarkCompleted = () => {
//     if (userRole !== "DOCTOR" || appointment.status !== "SCHEDULED") {
//       return false;
//     }
//     const now = new Date();
//     const appointmentEndTime = new Date(appointment.endTime);
//     return now >= appointmentEndTime;
//   };

//   // Handle cancel appointment
//   const handleCancelAppointment = async () => {
//     if (cancelLoading) return;

//     if (
//       window.confirm(
//         "Are you sure you want to cancel this appointment? This action cannot be undone."
//       )
//     ) {
//       const formData = new FormData();
//       formData.append("appointmentId", appointment.id);
//       await submitCancel(formData);
//     }
//   };

//   // Handle mark as completed
//   const handleMarkCompleted = async () => {
//     if (completeLoading) return;

//     // Check if appointment end time has passed
//     const now = new Date();
//     const appointmentEndTime = new Date(appointment.endTime);

//     if (now < appointmentEndTime) {
//       alert(
//         "Cannot mark appointment as completed before the scheduled end time."
//       );
//       return;
//     }

//     if (
//       window.confirm(
//         "Are you sure you want to mark this appointment as completed? This action cannot be undone."
//       )
//     ) {
//       const formData = new FormData();
//       formData.append("appointmentId", appointment.id);
//       await submitMarkCompleted(formData);
//     }
//   };

//   // Handle save notes (doctor only)
//   const handleSaveNotes = async () => {
//     if (notesLoading || userRole !== "DOCTOR") return;

//     const formData = new FormData();
//     formData.append("appointmentId", appointment.id);
//     formData.append("notes", notes);
//     await submitNotes(formData);
//   };

//   // Handle join video call
//   const handleJoinVideoCall = async () => {
//     if (tokenLoading) return;

//     setAction("video");

//     const formData = new FormData();
//     formData.append("appointmentId", appointment.id);
//     await submitTokenRequest(formData);
//   };

//   // Handle successful operations
//   useEffect(() => {
//     if (cancelData?.success) {
//       toast.success("Appointment cancelled successfully");
//       setOpen(false);
//       if (refetchAppointments) {
//         refetchAppointments();
//       } else {
//         router.refresh();
//       }
//     }
//   }, [cancelData, refetchAppointments, router]);

//   useEffect(() => {
//     if (completeData?.success) {
//       toast.success("Appointment marked as completed");
//       setOpen(false);
//       if (refetchAppointments) {
//         refetchAppointments();
//       } else {
//         router.refresh();
//       }
//     }
//   }, [completeData, refetchAppointments, router]);

//   useEffect(() => {
//     if (notesData?.success) {
//       toast.success("Notes saved successfully");
//       setAction(null);
//       if (refetchAppointments) {
//         refetchAppointments();
//       } else {
//         router.refresh();
//       }
//     }
//   }, [notesData, refetchAppointments, router]);

//   useEffect(() => {
//     if (tokenData?.success) {
//       // Redirect to video call page with token and session ID
//       router.push(
//         `/video-call?sessionId=${tokenData.videoSessionId}&token=${tokenData.token}&appointmentId=${appointment.id}`
//       );
//     } else if (tokenData?.error) {
//       setAction(null);
//     }
//   }, [tokenData, appointment.id, router]);

//   // Determine if appointment is active (within 30 minutes of start time)
//   const isAppointmentActive = () => {
//     const now = new Date();
//     const appointmentTime = new Date(appointment.startTime);
//     const appointmentEndTime = new Date(appointment.endTime);

//     // Can join 30 minutes before start until end time
//     return (
//       (appointmentTime.getTime() - now.getTime() <= 30 * 60 * 1000 &&
//         now < appointmentTime) ||
//       (now >= appointmentTime && now <= appointmentEndTime)
//     );
//   };

//   // Determine other party information based on user role
//   const otherParty =
//     userRole === "DOCTOR" ? appointment.patient : appointment.doctor;

//   const otherPartyLabel = userRole === "DOCTOR" ? "Patient" : "Doctor";
//   const otherPartyIcon = userRole === "DOCTOR" ? <User /> : <Stethoscope />;

//   return (
//     <>
//       <Card className="border-emerald-900/20 hover:border-emerald-700/30 transition-all">
//         <CardContent className="p-4">
//           <div className="flex flex-col md:flex-row justify-between gap-4">
//             <div className="flex items-start gap-3">
//               <div className="bg-muted/20 rounded-full p-2 mt-1">
//                 {otherPartyIcon}
//               </div>
//               <div>
//                 <h3 className="font-medium text-white">
//                   {userRole === "DOCTOR"
//                     ? otherParty.name
//                     : `Dr. ${otherParty.name}`}
//                 </h3>
//                 {userRole === "DOCTOR" && (
//                   <p className="text-sm text-muted-foreground">
//                     {otherParty.email}
//                   </p>
//                 )}
//                 {userRole === "PATIENT" && (
//                   <p className="text-sm text-muted-foreground">
//                     {otherParty.specialty}
//                   </p>
//                 )}
//                 <div className="flex items-center mt-2 text-sm text-muted-foreground">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   <span>{formatDateTime(appointment.startTime)}</span>
//                 </div>
//                 <div className="flex items-center mt-1 text-sm text-muted-foreground">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>
//                     {formatTime(appointment.startTime)} -{" "}
//                     {formatTime(appointment.endTime)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 self-end md:self-start">
//               <Badge
//                 variant="outline"
//                 className={
//                   appointment.status === "COMPLETED"
//                     ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
//                     : appointment.status === "CANCELLED"
//                     ? "bg-red-900/20 border-red-900/30 text-red-400"
//                     : "bg-amber-900/20 border-amber-900/30 text-amber-400"
//                 }
//               >
//                 {appointment.status}
//               </Badge>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {canMarkCompleted() && (
//                   <Button
//                     size="sm"
//                     onClick={handleMarkCompleted}
//                     disabled={completeLoading}
//                     className="bg-emerald-600 hover:bg-emerald-700"
//                   >
//                     {completeLoading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <>
//                         <CheckCircle className="h-4 w-4 mr-1" />
//                         Complete
//                       </>
//                     )}
//                   </Button>
//                 )}
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="border-emerald-900/30"
//                   onClick={() => setOpen(true)}
//                 >
//                   View Details
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Appointment Details Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
//           <DialogHeader className="flex-shrink-0">
//             <DialogTitle className="text-xl font-bold text-white">
//               Appointment Details
//             </DialogTitle>
//             <DialogDescription>
//               {appointment.status === "SCHEDULED"
//                 ? "Manage your upcoming appointment"
//                 : "View appointment information"}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="overflow-y-auto pr-2 py-2 space-y-4 flex-grow custom-scrollbar">
//             {/* Other Party Information */}
//             <div className="space-y-2">
//               <h4 className="text-sm font-medium text-muted-foreground">
//                 {otherPartyLabel}
//               </h4>
//               <div className="flex items-center">
//                 <div className="h-5 w-5 text-emerald-400 mr-2">
//                   {otherPartyIcon}
//                 </div>
//                 <div>
//                   <p className="text-white font-medium">
//                     {userRole === "DOCTOR"
//                       ? otherParty.name
//                       : `Dr. ${otherParty.name}`}
//                   </p>
//                   {userRole === "DOCTOR" && (
//                     <p className="text-muted-foreground text-sm">
//                       {otherParty.email}
//                     </p>
//                   )}
//                   {userRole === "PATIENT" && (
//                     <p className="text-muted-foreground text-sm">
//                       {otherParty.specialty}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Appointment Time */}
//             <div className="space-y-2">
//               <h4 className="text-sm font-medium text-muted-foreground">
//                 Scheduled Time
//               </h4>
//               <div className="flex flex-col gap-1">
//                 <div className="flex items-center">
//                   <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
//                   <p className="text-white">
//                     {formatDateTime(appointment.startTime)}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="h-5 w-5 text-emerald-400 mr-2" />
//                   <p className="text-white">
//                     {formatTime(appointment.startTime)} -{" "}
//                     {formatTime(appointment.endTime)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="space-y-2">
//               <h4 className="text-sm font-medium text-muted-foreground">
//                 Status
//               </h4>
//               <Badge
//                 variant="outline"
//                 className={
//                   appointment.status === "COMPLETED"
//                     ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
//                     : appointment.status === "CANCELLED"
//                     ? "bg-red-900/20 border-red-900/30 text-red-400"
//                     : "bg-amber-900/20 border-amber-900/30 text-amber-400"
//                 }
//               >
//                 {appointment.status}
//               </Badge>
//             </div>

//             {/* Patient Description */}
//             {appointment.patientDescription && (
//               <div className="space-y-2">
//                 <h4 className="text-sm font-medium text-muted-foreground">
//                   {userRole === "DOCTOR"
//                     ? "Patient Description"
//                     : "Your Description"}
//                 </h4>
//                 <div className="p-3 rounded-md bg-muted/20 border border-emerald-900/20 max-h-32 overflow-y-auto">
//                   <p className="text-white whitespace-pre-line">
//                     {appointment.patientDescription}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Join Video Call Button */}
//             {appointment.status === "SCHEDULED" && (
//               <div className="space-y-2">
//                 <h4 className="text-sm font-medium text-muted-foreground">
//                   Video Consultation
//                 </h4>
//                 <Button
//                   className="w-full bg-emerald-600 hover:bg-emerald-700"
//                   disabled={
//                     !isAppointmentActive() || action === "video" || tokenLoading
//                   }
//                   onClick={handleJoinVideoCall}
//                 >
//                   {tokenLoading || action === "video" ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Preparing Video Call...
//                     </>
//                   ) : (
//                     <>
//                       <Video className="h-4 w-4 mr-2" />
//                       {isAppointmentActive()
//                         ? "Join Video Call"
//                         : "Video call will be available 30 minutes before appointment"}
//                     </>
//                   )}
//                 </Button>
//               </div>
//             )}

//             {/* Doctor Notes (Doctor can view/edit, Patient can only view) */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <h4 className="text-sm font-medium text-muted-foreground">
//                   Doctor Notes
//                 </h4>
//                 {userRole === "DOCTOR" &&
//                   action !== "notes" &&
//                   appointment.status !== "CANCELLED" && (
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setAction("notes")}
//                       className="h-7 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
//                     >
//                       <Edit className="h-3.5 w-3.5 mr-1" />
//                       {appointment.notes ? "Edit" : "Add"}
//                     </Button>
//                   )}
//               </div>

//               {userRole === "DOCTOR" && action === "notes" ? (
//                 <div className="space-y-3">
//                   <Textarea
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     placeholder="Enter your clinical notes here..."
//                     className="bg-background border-emerald-900/20 min-h-[100px]"
//                   />
//                   <div className="flex justify-end space-x-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => {
//                         setAction(null);
//                         setNotes(appointment.notes || "");
//                       }}
//                       disabled={notesLoading}
//                       className="border-emerald-900/30"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       size="sm"
//                       onClick={handleSaveNotes}
//                       disabled={notesLoading}
//                       className="bg-emerald-600 hover:bg-emerald-700"
//                     >
//                       {notesLoading ? (
//                         <>
//                           <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         "Save Notes"
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-3 rounded-md bg-muted/20 border border-emerald-900/20 min-h-[80px] max-h-48 overflow-y-auto">
//                   {appointment.notes ? (
//                     <p className="text-white whitespace-pre-line">
//                       {appointment.notes}
//                     </p>
//                   ) : (
//                     <p className="text-muted-foreground italic">
//                       No notes added yet
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 flex-shrink-0 pt-4">
//             <div className="flex gap-2">
//               {/* Mark as Complete Button - Only for doctors */}
//               {canMarkCompleted() && (
//                 <Button
//                   onClick={handleMarkCompleted}
//                   disabled={completeLoading}
//                   className="bg-emerald-600 hover:bg-emerald-700"
//                 >
//                   {completeLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Completing...
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle className="mr-2 h-4 w-4" />
//                       Mark Complete
//                     </>
//                   )}
//                 </Button>
//               )}

//               {/* Cancel Button - For scheduled appointments */}
//               {appointment.status === "SCHEDULED" && (
//                 <Button
//                   variant="outline"
//                   onClick={handleCancelAppointment}
//                   disabled={cancelLoading}
//                   className="border-red-900/30 text-red-400 hover:bg-red-900/10 mt-3 sm:mt-0"
//                 >
//                   {cancelLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Cancelling...
//                     </>
//                   ) : (
//                     <>
//                       <X className="h-4 w-4 mr-1" />
//                       Cancel Appointment
//                     </>
//                   )}
//                 </Button>
//               )}
//             </div>

//             <Button
//               onClick={() => setOpen(false)}
//               className="bg-emerald-600 hover:bg-emerald-700"
//             >
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(6, 78, 59, 0.1);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(5, 122, 85, 0.5);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(4, 108, 78, 0.7);
//         }
//       `}</style>
//     </>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  User,
  Video,
  Stethoscope,
  X,
  Edit,
  Loader2,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  cancelAppointment,
  addAppointmentNotes,
  markAppointmentCompleted,
} from "@/actions/doctor";
import { generateVideoToken } from "@/actions/appointments";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AppointmentCard({
  appointment,
  userRole,
  refetchAppointments,
}) {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [action, setAction] = useState(null); // 'cancel', 'notes', 'video', or 'complete'
  const [notes, setNotes] = useState(appointment.notes || "");
  const [cancelReason, setCancelReason] = useState("");
  const router = useRouter();

  // UseFetch hooks for server actions
  const {
    loading: cancelLoading,
    fn: submitCancel,
    data: cancelData,
  } = useFetch(cancelAppointment);
  const {
    loading: notesLoading,
    fn: submitNotes,
    data: notesData,
  } = useFetch(addAppointmentNotes);
  const {
    loading: tokenLoading,
    fn: submitTokenRequest,
    data: tokenData,
  } = useFetch(generateVideoToken);
  const {
    loading: completeLoading,
    fn: submitMarkCompleted,
    data: completeData,
  } = useFetch(markAppointmentCompleted);

  // Format date and time
  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };

  // Format time only
  const formatTime = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "Invalid time";
    }
  };

  // Check if appointment can be marked as completed
  const canMarkCompleted = () => {
    if (userRole !== "DOCTOR" || appointment.status !== "SCHEDULED") {
      return false;
    }
    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);
    return now >= appointmentEndTime;
  };

  // Handle cancel appointment
  const handleCancelAppointment = async () => {
    if (cancelLoading) return;

    setCancelDialogOpen(true);
  };

  // Handle confirm cancel with reason
  const handleConfirmCancel = async () => {
    if (cancelLoading) return;

    const formData = new FormData();
    formData.append("appointmentId", appointment.id);
    formData.append("reason", cancelReason);
    await submitCancel(formData);
  };

  // Handle mark as completed
  const handleMarkCompleted = async () => {
    if (completeLoading) return;

    // Check if appointment end time has passed
    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);

    if (now < appointmentEndTime) {
      alert(
        "Cannot mark appointment as completed before the scheduled end time."
      );
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to mark this appointment as completed? This action cannot be undone."
      )
    ) {
      const formData = new FormData();
      formData.append("appointmentId", appointment.id);
      await submitMarkCompleted(formData);
    }
  };

  // Handle save notes (doctor only)
  const handleSaveNotes = async () => {
    if (notesLoading || userRole !== "DOCTOR") return;

    const formData = new FormData();
    formData.append("appointmentId", appointment.id);
    formData.append("notes", notes);
    await submitNotes(formData);
  };

  // Handle join video call
  const handleJoinVideoCall = async () => {
    if (tokenLoading) return;

    setAction("video");

    const formData = new FormData();
    formData.append("appointmentId", appointment.id);
    await submitTokenRequest(formData);
  };

  // Handle successful operations
  useEffect(() => {
    if (cancelData?.success) {
      toast.success("Appointment cancelled successfully");
      setOpen(false);
      setCancelDialogOpen(false);
      setCancelReason("");
      if (refetchAppointments) {
        refetchAppointments();
      } else {
        router.refresh();
      }
    }
  }, [cancelData, refetchAppointments, router]);

  useEffect(() => {
    if (completeData?.success) {
      toast.success("Appointment marked as completed");
      setOpen(false);
      if (refetchAppointments) {
        refetchAppointments();
      } else {
        router.refresh();
      }
    }
  }, [completeData, refetchAppointments, router]);

  useEffect(() => {
    if (notesData?.success) {
      toast.success("Notes saved successfully");
      setAction(null);
      if (refetchAppointments) {
        refetchAppointments();
      } else {
        router.refresh();
      }
    }
  }, [notesData, refetchAppointments, router]);

  useEffect(() => {
    if (tokenData?.success) {
      // Redirect to video call page with token and session ID
      router.push(
        `/video-call?sessionId=${tokenData.videoSessionId}&token=${tokenData.token}&appointmentId=${appointment.id}`
      );
    } else if (tokenData?.error) {
      setAction(null);
    }
  }, [tokenData, appointment.id, router]);

  // Determine if appointment is active (within 30 minutes of start time)
  const isAppointmentActive = () => {
    const now = new Date();
    const appointmentTime = new Date(appointment.startTime);
    const appointmentEndTime = new Date(appointment.endTime);

    // Can join 30 minutes before start until end time
    return (
      (appointmentTime.getTime() - now.getTime() <= 30 * 60 * 1000 &&
        now < appointmentTime) ||
      (now >= appointmentTime && now <= appointmentEndTime)
    );
  };

  // Determine other party information based on user role
  const otherParty =
    userRole === "DOCTOR" ? appointment.patient : appointment.doctor;

  const otherPartyLabel = userRole === "DOCTOR" ? "Patient" : "Doctor";
  const otherPartyIcon = userRole === "DOCTOR" ? <User /> : <Stethoscope />;

  return (
    <>
      <Card className="border-emerald-900/20 hover:border-emerald-700/30 transition-all bg-gray-900/40 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-900/20 rounded-full p-2 mt-1">
                {otherPartyIcon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">
                  {userRole === "DOCTOR"
                    ? otherParty.name
                    : `Dr. ${otherParty.name}`}
                </h3>
                {userRole === "DOCTOR" && (
                  <p className="text-sm text-emerald-200/70 truncate">
                    {otherParty.email}
                  </p>
                )}
                {userRole === "PATIENT" && (
                  <p className="text-sm text-emerald-200/70">
                    {otherParty.specialty}
                  </p>
                )}
                <div className="flex items-center mt-2 text-sm text-emerald-200/70">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDateTime(appointment.startTime)}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-emerald-200/70">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 self-end md:self-start">
              <Badge
                variant="outline"
                className={
                  appointment.status === "COMPLETED"
                    ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-300"
                    : appointment.status === "CANCELLED"
                    ? "bg-red-900/40 border-red-700/50 text-red-300"
                    : "bg-amber-900/40 border-amber-700/50 text-amber-300"
                }
              >
                {appointment.status}
              </Badge>
              <div className="flex gap-2 mt-2 flex-wrap">
                {canMarkCompleted() && (
                  <Button
                    size="sm"
                    onClick={handleMarkCompleted}
                    disabled={completeLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs h-8"
                  >
                    {completeLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </>
                    )}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-700/40 text-emerald-300 hover:bg-emerald-900/30 text-xs h-8"
                  onClick={() => setOpen(true)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-gray-900 border-emerald-800/30">
          <DialogHeader className="flex-shrink-0 pb-2 border-b border-emerald-800/20">
            <DialogTitle className="text-xl font-bold text-emerald-300">
              Appointment Details
            </DialogTitle>
            <DialogDescription className="text-emerald-200/70">
              {appointment.status === "SCHEDULED"
                ? "Manage your upcoming appointment"
                : "View appointment information"}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto pr-2 py-4 space-y-4 flex-grow custom-scrollbar">
            {/* Other Party Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-emerald-300">
                {otherPartyLabel}
              </h4>
              <div className="flex items-center p-3 rounded-md bg-gray-800/40 border border-emerald-800/20">
                <div className="h-5 w-5 text-emerald-400 mr-3">
                  {otherPartyIcon}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {userRole === "DOCTOR"
                      ? otherParty.name
                      : `Dr. ${otherParty.name}`}
                  </p>
                  {userRole === "DOCTOR" && (
                    <p className="text-emerald-200/70 text-sm">
                      {otherParty.email}
                    </p>
                  )}
                  {userRole === "PATIENT" && (
                    <p className="text-emerald-200/70 text-sm">
                      {otherParty.specialty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointment Time */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-emerald-300">
                Scheduled Time
              </h4>
              <div className="flex flex-col gap-2 p-3 rounded-md bg-gray-800/40 border border-emerald-800/20">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                  <p className="text-white">
                    {formatDateTime(appointment.startTime)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-emerald-400 mr-2" />
                  <p className="text-white">
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-emerald-300">
                Status
              </h4>
              <div className="p-3 rounded-md bg-gray-800/40 border border-emerald-800/20">
                <Badge
                  variant="outline"
                  className={
                    appointment.status === "COMPLETED"
                      ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-300"
                      : appointment.status === "CANCELLED"
                      ? "bg-red-900/40 border-red-700/50 text-red-300"
                      : "bg-amber-900/40 border-amber-700/50 text-amber-300"
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>

            {/* Patient Description */}
            {appointment.patientDescription && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-emerald-300">
                  {userRole === "DOCTOR"
                    ? "Patient Description"
                    : "Your Description"}
                </h4>
                <div className="p-3 rounded-md bg-gray-800/40 border border-emerald-800/20 max-h-32 overflow-y-auto">
                  <p className="text-white whitespace-pre-line">
                    {appointment.patientDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Join Video Call Button */}
            {appointment.status === "SCHEDULED" && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-emerald-300">
                  Video Consultation
                </h4>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={
                    !isAppointmentActive() || action === "video" || tokenLoading
                  }
                  onClick={handleJoinVideoCall}
                >
                  {tokenLoading || action === "video" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing Video Call...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      {isAppointmentActive()
                        ? "Join Video Call"
                        : "Video call will be available 30 minutes before appointment"}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Doctor Notes (Doctor can view/edit, Patient can only view) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-emerald-300">
                  Doctor Notes
                </h4>
                {userRole === "DOCTOR" &&
                  action !== "notes" &&
                  appointment.status !== "CANCELLED" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAction("notes")}
                      className="h-7 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      {appointment.notes ? "Edit" : "Add"}
                    </Button>
                  )}
              </div>

              {userRole === "DOCTOR" && action === "notes" ? (
                <div className="space-y-3">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter your clinical notes here..."
                    className="bg-gray-800 border-emerald-700/30 text-white min-h-[100px]"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAction(null);
                        setNotes(appointment.notes || "");
                      }}
                      disabled={notesLoading}
                      className="border-emerald-700/30 text-emerald-300 hover:bg-emerald-900/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                      disabled={notesLoading}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {notesLoading ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Notes"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-md bg-gray-800/40 border border-emerald-800/20 min-h-[80px] max-h-48 overflow-y-auto">
                  {appointment.notes ? (
                    <p className="text-white whitespace-pre-line">
                      {appointment.notes}
                    </p>
                  ) : (
                    <p className="text-emerald-200/70 italic">
                      No notes added yet
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 flex-shrink-0 pt-4 border-t border-emerald-800/20">
            <div className="flex gap-2">
              {/* Mark as Complete Button - Only for doctors */}
              {canMarkCompleted() && (
                <Button
                  onClick={handleMarkCompleted}
                  disabled={completeLoading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {completeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Complete
                    </>
                  )}
                </Button>
              )}

              {/* Cancel Button - For scheduled appointments */}
              {appointment.status === "SCHEDULED" && (
                <Button
                  variant="outline"
                  onClick={handleCancelAppointment}
                  disabled={cancelLoading}
                  className="border-red-700/40 text-red-300 hover:bg-red-900/20 mt-3 sm:mt-0"
                >
                  {cancelLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Cancel Appointment
                    </>
                  )}
                </Button>
              )}
            </div>

            <Button
              onClick={() => setOpen(false)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="max-w-md bg-gray-900 border-emerald-800/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-emerald-300 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription className="text-emerald-200/70">
              Send a cancellation message to the patient
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm text-emerald-200/80">
                Please provide a reason for cancellation. This will be sent to the patient via email.
              </p>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter cancellation reason..."
                className="bg-gray-800 border-emerald-700/30 text-white min-h-[120px]"
                required
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setCancelDialogOpen(false);
                setCancelReason("");
              }}
              disabled={cancelLoading}
              className="border-emerald-700/30 text-emerald-300 hover:bg-emerald-900/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmCancel}
              disabled={cancelLoading || !cancelReason.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {cancelLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Cancellation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(6, 78, 59, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(5, 122, 85, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(4, 108, 78, 0.7);
        }
      `}</style>
    </>
  );
}