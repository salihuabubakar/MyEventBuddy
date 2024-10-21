import React from 'react'
import { Link } from 'react-router-dom'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react';
import useCurrentUser from '../../hook/getCurrentUser';
import { account } from '../../appwrite';
import { useNavigate } from 'react-router-dom';
import { setGlobalState } from '../../context/GlobalState';

const HeaderNav = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const logout = async () => {
    await account.deleteSession('current');
    navigate('/', {replace: true})
  }

  return (
    <header className="bg-white shadow-sm mb-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/app/dashboard" className="text-2xl font-bold text-blue-600">
              My Event Buddy
            </Link>
          </div>

          {/* User Info and Dropdown */}
          <div className="flex items-center">
            <span className="hidden sm:inline-block mr-4 text-sm font-medium text-gray-700">
              {currentUser?.name}
            </span>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground p-0">
                  <Avatar.Root className="h-8 w-8 rounded-full">
                    <Avatar.Image
                      className="h-full w-full rounded-full object-cover"
                      src={currentUser?.prefs?.googlePicture}
                      alt={currentUser?.name}
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium uppercase text-gray-800">
                      {currentUser?.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-56 rounded-md border z-50 bg-white p-1 shadow-md" align="end">
                  <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold text-gray-900">
                    My Account
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
                  <DropdownMenu.Item onClick={() => setGlobalState("showProfileModal", true)} className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 z-5">
                    <User className="mr-2 h-4 w-4" />
                    <button>Profile</button>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={(e) => e.preventDefault()} className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 z-5">
                    <Settings className="mr-2 h-4 w-4" />
                    <Link onClick={(e) => e.preventDefault()} to="/settings">Settings</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
                  <DropdownMenu.Item onClick={logout} className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 z-5">
                    <LogOut className="mr-2 h-4 w-4" />
                    <button>
                      Logout
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderNav