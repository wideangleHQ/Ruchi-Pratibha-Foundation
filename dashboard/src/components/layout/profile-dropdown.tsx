'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dashboardLogout } from '@/lib/dashboard-auth';

interface ProfileDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();
  const displayName = user?.name ?? 'Admin';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  async function handleLogout() {
    try {
      await dashboardLogout();
    } catch {
      // proceed with redirect even if API call fails
    }
    router.replace('/access');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" aria-label="User menu">
        <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80">
          <AvatarImage src={user?.avatar} alt={displayName} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="font-manrope text-sm font-medium">{displayName}</p>
            {user?.email && <p className="font-manrope text-xs text-muted-foreground">{user.email}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
