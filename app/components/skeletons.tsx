// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BlogListSkeleton() {
  return <div className={`${shimmer} md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto md:mt-20 shadow-sm relative overflow-hidden`}>
    <div className="bg-gray-100 relative h-[300px] content-center"></div>
    <div className="pl-6 pr-6 md:pl-0 md:pr-0 pt-8">
      <div className="bg-gray-100 rounded-md w-48 h-8 bg-gray-100 mb-4"></div>
      <div className="flex flex-wrap justify-between">
        {/* BlogList Categories */}
        <div className="w-full h-12 md:max-w-[calc(25%-0.5rem)] lg:h-64 bg-gray-100 mb-4"></div>
        {/* BlogList Content */}
        <div className="flex flex-wrap justify-center w-full lg:w-3/4 gap-4 mt-2 lg:mt-0 lg:-mr-1">
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            {/* Blog Image */}
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="bg-gray-100 rounded-md h-48 bg-gray-100 mb-4"></div>
            <div className="flex flex-row">
              <div className="flex-grow mr-5">
                <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
              </div>
              <div className="bg-gray-100 self-center w-8 h-8 min-w-8 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>;
}

export function BlogSkeleton() {
  return <div>
    <div className={`${shimmer} relative overflow-hidden p-6 md:max-w-2xl lg:max-w-3xl pt-10 md:pt-12 mt-12 ml-auto mr-auto`}>
      <div className="flex flex-col w-full items-center">
        <div className="w-full rounded-md h-12 bg-gray-200 mb-4"></div>
        <div className="w-full rounded-md h-64 bg-gray-200 mt-2"></div>
      </div>
    </div>

    <div className={`${shimmer} flex flex-col items-center relative overflow-hidden pl-6 md:max-w-2xl lg:max-w-3xl pr-6 shadow-sm pb-10 md:pb-5 mt-6 ml-auto mr-auto`}>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>

      <div className="mt-2 mb-2"></div>

      <div className="bg-gray-100 w-full rounded-md h-48 bg-gray-100 mb-4"></div>

      <div className="mt-2 mb-2"></div>

      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>
    </div>
  </div>
}

export function ProjectListSkeleton() {
  return <div className={`${shimmer} md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto mt-12 shadow-sm relative overflow-hidden`}>
    <div className="pl-6 pr-6 md:pl-0 md:pr-0 pt-10">
      {/* Header text */}
      <div className="bg-gray-100 rounded-md w-48 h-8 bg-gray-100 mb-4"></div>
      {/* Filter by */}
      <div className="w-24 h-4 bg-gray-100 mb-2"></div>
      <div className="flex mb-8">
        <div className="w-24 h-6 bg-gray-100 mr-4"></div>
        <div className="w-24 h-6 bg-gray-100 mr-4"></div>
        <div className="w-24 h-6 bg-gray-100 mr-4"></div>
        <div className="w-24 h-6 bg-gray-100 mr-4"></div>
      </div>
      {/* Project Boxes */}
      <div>
        <div className="flex flex-wrap justify-between w-full min-h-36 rounded-xl overflow-hidden mb-4 border-gray-100 border-solid border-2">
          <div className="w-full h-40 md:w-48 md:min-w-48 bg-gray-100"></div>
          <div className="flex-grow ml-4">
            <div className="mt-4">
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-8 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-36 h-4 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="bg-gray-100 w-8 h-8 rounded-md bg-gray-100 self-center mt-2 mr-4 mb-4"></div>
        </div>
        <div className="flex flex-wrap justify-between w-full min-h-36 rounded-xl overflow-hidden mb-4 border-gray-100 border-solid border-2">
          <div className="w-full h-40 md:w-48 md:min-w-48 bg-gray-100"></div>
          <div className="flex-grow ml-4">
            <div className="mt-4">
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-8 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-36 h-4 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="bg-gray-100 w-8 h-8 rounded-md bg-gray-100 self-center mt-2 mr-4 mb-4"></div>
        </div>
        <div className="flex flex-wrap justify-between w-full min-h-36 rounded-xl overflow-hidden mb-4 border-gray-100 border-solid border-2">
          <div className="w-full h-40 md:w-48 md:min-w-48 bg-gray-100"></div>
          <div className="flex-grow ml-4">
            <div className="mt-4">
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-8 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-36 h-4 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="bg-gray-100 w-8 h-8 rounded-md bg-gray-100 self-center mt-2 mr-4 mb-4"></div>
        </div>
        <div className="flex flex-wrap justify-between w-full min-h-36 rounded-xl overflow-hidden mb-4 border-gray-100 border-solid border-2">
          <div className="w-full h-40 md:w-48 md:min-w-48 bg-gray-100"></div>
          <div className="flex-grow ml-4">
            <div className="mt-4">
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-8 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-11/12 md:w-9/12 h-4 rounded-md bg-gray-100 mb-4"></div>
              <div className="bg-gray-100 w-36 h-4 rounded-md bg-gray-100 mb-4"></div>
            </div>
          </div>
          <div className="bg-gray-100 w-8 h-8 rounded-md bg-gray-100 self-center mt-2 mr-4 mb-4"></div>
        </div>
      </div>
    </div>
  </div>;
}

export function ProjectSkeleton() {
  return <div className={`${shimmer} relative overflow-hidden md:max-w-2xl lg:max-w-3xl pt-10 md:pt-12 mt-12 ml-auto mr-auto`}>
    <div className="flex flex-col w-full items-center pl-6 pr-6">
      <div className="w-full rounded-md h-12 bg-gray-100 mb-4"></div>
    </div>

    <div className={`${shimmer} flex flex-col items-center relative overflow-hidden pl-6 pr-6 shadow-sm pb-10 md:pb-5 mt-6`}>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>

      <div className="mt-2 mb-2"></div>

      <div className="bg-gray-100 w-full rounded-md h-48 bg-gray-100 mb-4"></div>

      <div className="mt-2 mb-2"></div>

      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 h-6 rounded-md bg-gray-100 mb-4"></div>
    </div>
  </div>
}

export function CarouselSkeleton() {
  return (
    <div className={`${shimmer} relative`}>

      {/* Image and Dots */}
      <div className="relative">
        <div className="flex absolute top-52 left-1/2 -translate-x-1/2 rounded items-center justify-around bg-gray-100 bg-opacity-75 w-auto h-4">
          <div className="w-2 h-2 rounded ml-1 mr-1 bg-white"></div>
          <div className="w-2 h-2 rounded ml-1 mr-1 bg-white"></div>
          <div className="w-2 h-2 rounded ml-1 mr-1 bg-white"></div>
        </div>
        <div className="bg-gray-100 w-full rounded-md h-60 bg-gray-100 mb-4"></div>
      </div>
      {/* Text */}
      <div className="bg-gray-100 w-full rounded-md h-6 bg-gray-100 mb-4"></div>
      <div className="bg-gray-100 w-64 rounded-md h-6 bg-gray-100 mb-4"></div>

    </div>

  );
}

export function PostGridSkeleton() {
  return (
    <div className={`${shimmer} md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto shadow-sm relative overflow-hidden`}>
      <div className="pl-6 pr-6 md:pl-0 md:pr-0 pt-8">
        <div className="flex flex-wrap justify-start gap-4">

          {/* PostGrid Content */}
          <div className="flex flex-wrap justify-center w-full md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="w-full lg:p-0">
              {/* PostGrid Image */}
              <div className="bg-gray-100 rounded-md h-48 lg:h-64 bg-gray-100 mb-4"></div>
              {/* PostGrid Image */}
              <div className="flex flex-row">
                <div className="flex-grow">
                  <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* PostGrid Content */}

          {/* PostGrid Content */}
          <div className="flex flex-wrap justify-center w-full md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="w-full lg:p-0">
              {/* PostGrid Image */}
              <div className="bg-gray-100 rounded-md h-48 lg:h-64 bg-gray-100 mb-4"></div>
              {/* PostGrid Image */}
              <div className="flex flex-row">
                <div className="flex-grow">
                  <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* PostGrid Content */}

          {/* PostGrid Content */}
          <div className="flex flex-wrap justify-center w-full md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="w-full lg:p-0">
              {/* PostGrid Image */}
              <div className="bg-gray-100 rounded-md h-48 lg:h-64 bg-gray-100 mb-4"></div>
              {/* PostGrid Image */}
              <div className="flex flex-row">
                <div className="flex-grow">
                  <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* PostGrid Content */}

          {/* PostGrid Content */}
          <div className="flex flex-wrap justify-center w-full md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0">
            <div className="w-full lg:p-0">
              {/* PostGrid Image */}
              <div className="bg-gray-100 rounded-md h-48 lg:h-64 bg-gray-100 mb-4"></div>
              {/* PostGrid Image */}
              <div className="flex flex-row">
                <div className="flex-grow">
                  <div className="bg-gray-100 h-8 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 rounded-md bg-gray-100 mb-4"></div>
                  <div className="bg-gray-100 h-4 w-2/5 rounded-md bg-gray-100 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* PostGrid Content */}

        </div>
      </div>
    </div>
  );
}

export function HomeProjectListSkeleton() {
  return (
    <div className={`${shimmer} relative p-6 md:p-0 mt-6 md:mt-12 mb-6`}>
      <div className="bg-gray-100 rounded-md w-36 h-8 bg-gray-100 mb-4 md:mb-0"></div>
      <div className="block md:hidden">
        <CarouselSkeleton />
      </div>
      <div className="hidden md:block">
        <PostGridSkeleton />
      </div>
      <div className="flex w-full justify-end mt-6">
        <div className="flex h-10 w-1/2 md:w-1/4 items-center rounded bg-gray-100"></div>
      </div>
    </div>
  );
}




export function HomeBlogListSkeleton() {
  return (
    <div className={`${shimmer} relative p-6 md:p-0 mt-6 md:mt-12 mb-6`}>
      <div className="bg-gray-100 rounded-md w-36 h-8 bg-gray-100 mb-4 md:mb-0"></div>
      <div className="block md:hidden">
        <CarouselSkeleton />
      </div>
      <div className="hidden md:block">
        <PostGridSkeleton />
      </div>
      <div className="flex w-full justify-end mt-6">
        <div className="flex h-10 w-48 md:w-1/4 items-center rounded bg-gray-100"></div>
      </div>
    </div>
  );
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