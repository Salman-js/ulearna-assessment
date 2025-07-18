import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import HeaderTitle from './header-title';
import ThemeSwitcher from './theme-switcher';
import { DatabaseSeedActions } from '@/features/product/components/database-seed-actions';

export function SiteHeader() {
  return (
    <header
      className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'
      aria-label='site-header'
    >
      <nav
        aria-label='header-navigation'
        className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'
      >
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <HeaderTitle />
        <div className='ml-auto flex items-center gap-2'>
          <DatabaseSeedActions />
          <ThemeSwitcher />
          <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
            <a
              href='https://github.com/Salman-js/ulearna-assessment'
              rel='noopener noreferrer'
              target='_blank'
              className='dark:text-foreground'
            >
              GitHub
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
