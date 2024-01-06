import { useState } from "react";
const Selectbatch = () => {
  const option = [
    {
      id: 1,
      value: "Development",
    },
    {
      id: 2,
      value: "Designing",
    },
    {
      id: 3,
      value: "Office managment",
    },
    {
      id: 4,
      value: "Compyuter course",
    },
  ];
  const [options, setOptions] = useState(option);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full ">
      <button
        className="h-[43px] w-full rounded border border-[#9CA3AF] p-[10px] text-left text-[#9CA3AF]"
        onClick={() => setOpen(open ? false : true)}
      >
        {localStorage.getItem("select-option")
          ? localStorage.getItem("select-option")
          : `Select batch`}
      </button>
      {open && (
        <div className="w-full  border p-1">
          <input
            type="text"
            className="mt-1 h-[43px] w-full rounded border border-[#9CA3AF] bg-transparent p-[10px] text-left text-[#9CA3AF]  "
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="options">
            {option
              .filter((users) => users.value.toLowerCase().includes(search))
              .map((item, index) => (
                <div key={index}>
                  <button
                    className="mb-1 mt-0 h-[43px] w-full rounded pl-1 text-left hover:bg-[#6777EF] hover:text-[#fff]"
                    onClick={() =>
                      setOptions(
                        localStorage.setItem("select-option", item.value) !==
                          setOpen(false),
                      )
                    }
                  >
                    {item.value}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Selectbatch;
