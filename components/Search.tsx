import { FC, useEffect } from "react";


const Search: FC = () => {
  useEffect(() => {
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=8c72544108909d74c';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  });

  return (
    <div className="p-1 bg-white border border-gray-100 mb-8 flex flex-col items-center justify-center">
      <h4 className="w-full pt-2 text-center px-2">
        Forum archive <em>and</em> <a href="https://www.thesamba.com/vw/">thesamba.com</a> search
      </h4>
      <div className="w-full max-w-3xl">
        <div className="gcse-search"></div>
      </div>
    </div>
  );
}

export default Search;