'use client'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfileButton() {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <div className='flex'>
      {session ? (
        <div className='flex gap-3 md:gap-5'>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.username}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  router.push("/");
                }}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <>
          <Link href={`/sign-in`}>
            <Button
              radius='sm'
              variant="solid"
              className='px-0 h-10 bg-card text-foreground'
            >
              Sign in
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
