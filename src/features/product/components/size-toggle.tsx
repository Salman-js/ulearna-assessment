import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function SizeToggle() {
  return (
    <ToggleGroup type='single' size='lg' variant='outline'>
      <ToggleGroupItem value='sm' aria-label='Small' className='px-3'>
        <span className=''>SM</span>
      </ToggleGroupItem>
      <ToggleGroupItem value='m' aria-label='Medium' className='px-3'>
        <span className=''>M</span>
      </ToggleGroupItem>
      <ToggleGroupItem value='lg' aria-label='Large' className='px-3'>
        <span className=''>LG</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
