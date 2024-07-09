// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BlogListSkeleton() {
  return <div className={`${shimmer} md:max-w-2xl lg:max-w-4xl mb-0 mt-20 ml-auto mr-auto p-6 shadow-sm relative overflow-hidden`}>
    <div className="bg-gray-100 rounded-md h-12 bg-gray-100 mb-12"></div>

    <div className="flex flex-row mb-5">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow mr-5">
        <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
        <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
      </div>
      <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
    </div>

  </div>
}

export function BlogSkeleton() {
  return <div>
    <div className={`${shimmer} relative overflow-hidden bg-gray-100 p-2 shadow-sm pt-12 pb-10 md:pt-12 md:pb-5 mt-12`}>
      <div className="flex flex-col w-full items-center mb-8">
        <div className="bg-white w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-12 bg-gray-200 mb-4"></div>
        <div className="bg-white w-64 h-12 rounded-md bg-gray-200 mb-4"></div>
      </div>
      <div className="flex flex-col w-full items-center mb-8">
        <div className="bg-white w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-5/12 h-12 h-6 bg-gray-200 pb-6 mb-4"></div>
        <div className="bg-white w-64 h-6 rounded-md bg-gray-200 mb-4"></div>
        <div className="bg-white w-48 h-6 rounded-md bg-gray-200 mb-4"></div>
      </div>
      <div className="flex flex-col w-full items-center h-12">
        <div className="bg-white w-64 md:w-4/12 h-6 rounded-md bg-gray-200"></div>
      </div>
    </div>

    <div className={`${shimmer} flex flex-col items-center relative overflow-hidden p-2 shadow-sm pt-12 pb-10 md:pt-12 md:pb-5`}>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>

      <div className="mt-12 mb-12"></div>

      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-48 bg-gray-100 mb-4"></div>

      <div className="mt-12 mb-12"></div>

      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full md:w-3/4 rounded-md lg:w-3/5 xl:w-1/2 h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>
    </div>
  </div>
}

export function CardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}