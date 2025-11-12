"use client";

import { useState } from "react";
import Calendar from "@/components/icons/Calendar";
import EditIcons from "@/components/icons/EditIcons";
import IdCard from "@/components/icons/IdCard";
import Image from "next/image";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import convertDateStr from "@/hooks/convertDateStr";
import EditUser from "./EditUser"; // 👈 Import EditUser component
import Link from "next/link";
import SwitchIcon from "@/components/icons/Switch";

<<<<<<< HEAD
interface UserDetTopProps {
  id: string | number;
  userDet: {
    id?: string | number;
    name?: string;
    status?: string | null;
    created_at?: string;
  };
}

export default function UserDetTop({ id, userDet }: UserDetTopProps) {
  const formattedStatus = userDet.status
    ? userDet.status.charAt(0).toUpperCase() + userDet.status.slice(1)
    : "Unknown";

  const isActive = userDet.status === "active";

  // 👇 State to show/hide edit form
  const [showEdit, setShowEdit] = useState(false);

  const handleToggleEdit = () => setShowEdit(!showEdit);

=======
export default function UserDetTop({ id, userDet }: { id: any; userDet: any }) {
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
<<<<<<< HEAD
        <h1 className="text-base font-medium">Personal Info</h1>

        <div className="flex flex-wrap items-center gap-4 mt-[42px]">
          {/* ✅ Clicking this toggles edit form */}
          <div><SwitchIcon /></div>
          <Link href={`/dashboard/users/edit/${id}`}>
            <button
              className="flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded"
            >
              <EditIcons />
              <span className="text-sm font-normal">Edit</span>
            </button>
          </Link>


          {/* <SuspendUser id={String(id)} />
          <DeleteUser id={String(id)} /> */}
        </div>
      </div>

      {/* Profile Area */}
      <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
        <div>
          <Image
            src="/images/profiles.png"
            height={300}
            width={300}
            alt="User Profile"
            className="h-[100px] min-w-[100px] w-[100px] rounded-full border-1 border-[#2D9DFF]"
          />
        </div>

        <div className="flex-col space-y-2">
          <h3 className="text-white font-roboto text-[18px] font-normal leading-[1.6]"
          >John Doe</h3>
          <p className="text-[color:var(--Gray-Black-50,#E9E9EA)] font-roboto text-[14px] font-normal leading-[1.5]"
          >@Wade Warren</p>
        </div>
        {/* <div>
          <h1 className="text-base font-semibold">{userDet.name || "No Name"}</h1>
          <div className="my-4 flex items-center gap-4">
            <p className={isActive ? "text-[#2ECC71] text-xs" : "text-[#e70d0d] text-xs"}>
              {formattedStatus}
            </p>
=======
        <h1 className="text-base font-medium">User Details</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded"
          >
            <EditIcons />
            <span className="text-sm font-normal">Edit</span>
          </Link>

          <SuspendUser id={id} />
          <DeleteUser id={id} />

          {/* <button className="cursor-pointer flex items-center gap-2 px-[14px] py-[7px] bg-[#E63946] text-white rounded">
              <TrashBin />
              <span className="text-sm font-normal">Delete</span>
            </button> */}
        </div>
      </div>

      {/* Profile Era */}
      <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
        <div>
          <Image
            src="/images/user-profile-2.svg"
            height={300}
            width={300}
            alt="User Profile"
            className="h-[100px] min-w-[100px] w-[100px] rounded-full"
          />
        </div>
        <div>
          <h1 className="text-base font-semibold">{userDet.name}</h1>
          <div className="my-4 flex items-center gap-4">
            {userDet.status === "active" ? (
              <p className="text-[#2ECC71] text-xs">
                {userDet.status.charAt(0).toUpperCase() +
                  userDet.status.slice(1)}
              </p>
            ) : (
              <p className="text-[#e70d0d] text-xs">
                {userDet.status.charAt(0).toUpperCase() +
                  userDet.status.slice(1)}
              </p>
            )}
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
            <span className="text-xs px-[10px] py-[5px] bg-[#1D1A33] rounded-[2px]">
              Premium Member
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <IdCard className="w-6 h-6" />
<<<<<<< HEAD
              <p className="text-sm">ID: {userDet.id ?? "N/A"}</p>
=======
              <p className="text-sm">ID: {userDet.id}</p>
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <p className="text-sm">
<<<<<<< HEAD
                Joined:{" "}
                {userDet.created_at
                  ? convertDateStr(userDet.created_at)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* 👇 Conditional Edit Form Rendering */}



=======
                Joined: {convertDateStr(userDet.created_at)}
              </p>
            </div>

            {/*   <div className="flex items-center gap-2">
                <Clock className="w-6 h-6"/>
                <p className="text-sm">Last active: 2 hours ago</p>
            </div> */}

            {/*  <div className="flex items-center gap-2">
                <Video className="w-6 h-6"/>
                <p className="text-sm">Total watch time: 142 hrs</p>
            </div> */}
          </div>
        </div>
      </div>
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
    </>
  );
}


// import Calendar from "@/components/icons/Calendar";
// import EditIcons from "@/components/icons/EditIcons";
// import IdCard from "@/components/icons/IdCard";
// import Image from "next/image";
// import Link from "next/link";
// import SuspendUser from "./SuspendUser";
// import DeleteUser from "./DeleteUser";
// import convertDateStr from "@/hooks/convertDateStr";

// export default function UserDetTop({ id, userDet }: { id: any; userDet: any }) {
//   return (
//     <>
//       {/* Header */}
//       <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
//         <h1 className="text-base font-medium">User Details</h1>

//         <div className="flex flex-wrap items-center gap-4">
//           <Link
//             href="#"
//             className="flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded"
//           >
//             <EditIcons />
//             <span className="text-sm font-normal">Edit</span>
//           </Link>

//           <SuspendUser id={id} />
//           <DeleteUser id={id} />

//           {/* <button className="cursor-pointer flex items-center gap-2 px-[14px] py-[7px] bg-[#E63946] text-white rounded">
//               <TrashBin />
//               <span className="text-sm font-normal">Delete</span>
//             </button> */}
//         </div>
//       </div>

//       {/* Profile Era */}
//       <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
//         <div>
//           <Image
//             src="/images/user-profile-2.svg"
//             height={300}
//             width={300}
//             alt="User Profile"
//             className="h-[100px] min-w-[100px] w-[100px] rounded-full"
//           />
//         </div>
//         <div>
//           <h1 className="text-base font-semibold">{userDet.name}</h1>
//           <div className="my-4 flex items-center gap-4">
//             {userDet.status === "active" ? (
//               <p className="text-[#2ECC71] text-xs">
//                 {userDet.status.charAt(0).toUpperCase() +
//                   userDet.status.slice(1)}
//               </p>
//             ) : (
//               <p className="text-[#e70d0d] text-xs">
//                 {userDet.status.charAt(0).toUpperCase() +
//                   userDet.status.slice(1)}
//               </p>
//             )}
//             <span className="text-xs px-[10px] py-[5px] bg-[#1D1A33] rounded-[2px]">
//               Premium Member
//             </span>
//           </div>
//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="flex items-center gap-2">
//               <IdCard className="w-6 h-6" />
//               <p className="text-sm">ID: {userDet.id}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Calendar className="w-6 h-6" />
//               <p className="text-sm">
//                 Joined: {convertDateStr(userDet.created_at)}
//               </p>
//             </div>

//             {/*   <div className="flex items-center gap-2">
//                 <Clock className="w-6 h-6"/>
//                 <p className="text-sm">Last active: 2 hours ago</p>
//             </div> */}

//             {/*  <div className="flex items-center gap-2">
//                 <Video className="w-6 h-6"/>
//                 <p className="text-sm">Total watch time: 142 hrs</p>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }