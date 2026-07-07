// "use client";

// import Protected from "@/components/Protected";
// import { useAuth } from "@/contexts/auth-context";

// export default function DashboardPage() {
//   const { user, logout } = useAuth();

//   return (
//     <Protected>
//       <div className="p-6">
//         <h1 className="text-2xl mb-4">Welcome, {user?.name}</h1>
//         <p>Email: {user?.email}</p>
//         <p>Role: {user?.role}</p>
//         <button
//           className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>
//     </Protected>
//   );
// }
