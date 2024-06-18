"use client";
import { LogoutButton } from "@/modules/auth/components/logout-button";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  lastName: string;
  company: string;
  user: number;
  email: string;
}

export function User() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://dashboard-bi1.vercel.app/api/user-data"
        );

        const { data } = await response.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log("userData", userData);

  return (
    <div className="m-2">
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton className="text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <div className="h-14 w-14 rounded-full bg-slate-300 text-center p-1 flex items-center justify-center">
                <p className="text-[10px] font-bold text-blue-900 uppercase text-center text-wrap">
                  {userData?.company?.length ? (
                    userData?.company
                  ) : (
                    <>
                      {userData?.name}
                      {userData?.lastName?.length ? (
                        <>
                          <br />
                          {userData?.lastName}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </p>
              </div>
            </PopoverButton>

            {open && (
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  anchor="bottom"
                  className="mt-2 z-20 divide-y divide-white/5 rounded-xl bg-zinc-600 text-sm/6 [--anchor-gap:var(--spacing-5)]"
                >
                  <div className="p-3">
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <LogoutButton />
                    </a>
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-white/50">{userData?.email}</p>
                    </a>
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Nome</p>
                      <p className="text-white/50">
                        {userData?.name + " " + userData?.lastName}
                      </p>
                    </a>
                  </div>
                  {userData?.company?.length ? (
                    <div className="p-3">
                      <a
                        className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                        href="#"
                      >
                        <p className="font-semibold text-white">Compania</p>
                        <p className="text-white/50">{userData?.company}</p>
                      </a>
                    </div>
                  ) : null}
                </PopoverPanel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </div>
  );
}
