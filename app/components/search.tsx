'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.
  // Functions that are passed to this callback should be delayed.
  // It should return a function that triggers delayed execution.
  // *** MADE BY ME ***
  function useDebouncedCallback(func: any, delay: number) {

    // Keep track of timeoutId
    let timeoutId: any = undefined;

    return function (...theArgs: any) { // Take infinite args
      // Check if already in delay, if so remove the previous one.
      if (timeoutId) clearTimeout(timeoutId);
      // Execute delayed...
      timeoutId = setTimeout(() => {
        func(...theArgs);
        // Alternative to spread operator func.apply(null, theArgs);
      }, delay);
    }
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searcing..... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      // console.log(params.toString());
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

