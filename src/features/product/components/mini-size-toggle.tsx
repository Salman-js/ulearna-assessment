import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function MiniSizeToggle() {
  return (
    <ToggleGroup type='single' className='bg-background' size='lg'>
      <ToggleGroupItem value='sm' aria-label='Small'>
        <span className=''>SM</span>
      </ToggleGroupItem>
      <ToggleGroupItem value='m' aria-label='Medium'>
        <span className=''>M</span>
      </ToggleGroupItem>
      <ToggleGroupItem value='lg' aria-label='Large'>
        <span className=''>LG</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
