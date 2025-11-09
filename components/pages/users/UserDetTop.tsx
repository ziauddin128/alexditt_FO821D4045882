import Calendar from "@/components/icons/Calendar";
import EditIcons from "@/components/icons/EditIcons";
import IdCard from "@/components/icons/IdCard";
import Image from "next/image";
import Link from "next/link";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import convertDateStr from "@/hooks/convertDateStr";

export default function UserDetTop({ id, userDet }: { id: any; userDet: any }) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
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
            <span className="text-xs px-[10px] py-[5px] bg-[#1D1A33] rounded-[2px]">
              Premium Member
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <IdCard className="w-6 h-6" />
              <p className="text-sm">ID: {userDet.id}</p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <p className="text-sm">
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
    </>
  );
}
