"use client";
import { LogoutButton } from "@/modules/auth/components/logout-button";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export function User() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-8">
        <Popover __demoMode>
          <PopoverButton className="text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            <div className="h-14 w-14 rounded-full bg-slate-300 text-center p-1 flex items-center justify-center">
              <p className="text-[10px] font-bold text-blue-900 uppercase text-center">
                Campari group
              </p>
            </div>
          </PopoverButton>
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
                  {/* <LogoutButton /> */}
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Automations</p>
                  <p className="text-white/50">
                    Create your own targeted content
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Reports</p>
                  <p className="text-white/50">Keep track of your growth</p>
                </a>
              </div>
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Documentation</p>
                  <p className="text-white/50">
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}
