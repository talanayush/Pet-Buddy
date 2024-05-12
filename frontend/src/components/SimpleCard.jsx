export default function SimpleCard({content,heading}) {
  return (
    <>
      <div class="relative flex flex-col mt-6 text-gray-100 bg-teal-800 shadow-md bg-clip-border rounded-xl w-96">
        <div class="pl-10 pr-10 pt-5">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-50">
            {heading}
          </h5>
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {content}
          </p>
        </div>
        <div class="p-6 pt-0">
        </div>
      </div>
    </>
  );
}
