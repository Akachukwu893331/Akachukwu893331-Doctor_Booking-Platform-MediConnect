// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { getDoctorAppointments, getDoctorAvailability } from "@/actions/doctor";
// import { AvailabilitySettings } from "./_components/availability-settings";
// import { getCurrentUser } from "@/actions/onboarding";
// import { redirect } from "next/navigation";
// import { Calendar, Clock, DollarSign } from "lucide-react";
// import DoctorAppointmentsList from "./_components/appointments-list";
// // import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
// // import { DoctorEarnings } from "./_components/doctor-earnings";

// export default async function DoctorDashboardPage() {
//   const user = await getCurrentUser();

//   const [appointmentsData, availabilityData, earningsData, payoutsData] =
//     await Promise.all([
//       getDoctorAppointments(),
//       getDoctorAvailability(),
//       // getDoctorEarnings(),
//       // getDoctorPayouts(),
//     ]);

//   //   // Redirect if not a doctor
//   if (user?.role !== "DOCTOR") {
//     redirect("/onboarding");
//   }

//   // If already verified, redirect to dashboard
//   if (user?.verificationStatus !== "VERIFIED") {
//     redirect("/doctor/verification");
//   }

//   return (
//     <Tabs
//       defaultValue="earnings"
//       className="grid grid-cols-1 md:grid-cols-4 gap-6"
//     >
//       <TabsList className="md:col-span-1 bg-muted/30 border h-14 md:h-40 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0">
//         <TabsTrigger
//           value="earnings"
//           className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
//         >
//           <DollarSign className="h-4 w-4 mr-2 hidden md:inline" />
//           <span>Earnings</span>
//         </TabsTrigger>
//         <TabsTrigger
//           value="appointments"
//           className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
//         >
//           <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
//           <span>Appointments</span>
//         </TabsTrigger>
//         <TabsTrigger
//           value="availability"
//           className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
//         >
//           <Clock className="h-4 w-4 mr-2 hidden md:inline" />
//           <span>Availability</span>
//         </TabsTrigger>
//       </TabsList>
//       <div className="md:col-span-3">
//         <TabsContent value="appointments" className="border-none p-0">
//           <DoctorAppointmentsList
//             appointments={appointmentsData.appointments || []}
//           />
//         </TabsContent>
//         <TabsContent value="availability" className="border-none p-0">
//           <AvailabilitySettings slots={availabilityData.slots || []} />
//         </TabsContent>
//         {/* <TabsContent value="earnings" className="border-none p-0">
//           <DoctorEarnings
//             earnings={earningsData.earnings || {}}
//             payouts={payoutsData.payouts || []}
//           />
//         </TabsContent> */}
//       </div>
//     </Tabs>
//   );
// }





import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDoctorAppointments, getDoctorAvailability } from "@/actions/doctor";
import { AvailabilitySettings } from "./_components/availability-settings";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import { Calendar, Clock, DollarSign, Home } from "lucide-react";
import DoctorAppointmentsList from "./_components/appointments-list";
import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
import { DoctorEarnings } from "./_components/doctor-earnings";

export default async function DoctorDashboardPage() {
  const user = await getCurrentUser();

  const [appointmentsData, availabilityData, earningsData, payoutsData] =
    await Promise.all([
      getDoctorAppointments(),
      getDoctorAvailability(),
      getDoctorEarnings(),
      getDoctorPayouts(),
    ]);

  // Redirect if not a doctor
  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If not verified, redirect to verification
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <Tabs
      defaultValue="welcome"
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      <TabsList className="md:col-span-1 bg-muted/30 border h-14 md:h-70 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0">
        <TabsTrigger
          value="welcome"
          className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
        >
          <Home className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Welcome</span>
        </TabsTrigger>
        <TabsTrigger
          value="availability"
          className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
        >
          <Clock className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Availability</span>
        </TabsTrigger>
        <TabsTrigger
          value="appointments"
          className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
        >
          <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Appointments</span>
        </TabsTrigger>
        <TabsTrigger
          value="earnings"
          className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
        >
          <DollarSign className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Earnings</span>
        </TabsTrigger>
      </TabsList>
      <div className="md:col-span-3">
        <TabsContent value="welcome" className="border-none p-0">
          <div className="p-6 bg-background rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Welcome back, Dr. {user?.name || "User"} 👋
            </h2>
            <p className="text-muted-foreground">
              Here you can manage your availability, view appointments, and
              track your earnings all in one place.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="availability" className="border-none p-0">
          <AvailabilitySettings slots={availabilityData.slots || []} />
        </TabsContent>
        <TabsContent value="appointments" className="border-none p-0">
          <DoctorAppointmentsList
            appointments={appointmentsData.appointments || []}
          />
        </TabsContent>
        <TabsContent value="earnings" className="border-none p-0">
          <DoctorEarnings
            earnings={earningsData.earnings || {}}
            payouts={payoutsData.payouts || []}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
