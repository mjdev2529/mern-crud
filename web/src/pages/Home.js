import React from "react";

export default function Home() {
  const data = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Doe", email: "doe@example.com" },
  ];

  return (
    <div>
      <div className="flex flex-row justify-end px-5 mt-5">
        <button type="button" className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
      </div>
      <div className="px-5">
        <div className="font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-center">Email</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {data.map((item) =>{{ 
                    const even = item.id % 2 === 0 ? true : false;
                    return (
                      // <tr key={item.id} className={even?"bg-gray-200":""}>
                      //   <td className="border px-4 py-2">{item.id}</td>
                      //   <td className="border px-4 py-2">{item.name}</td>
                      //   <td className="border px-4 py-2">{item.email}</td>
                      // </tr>
                      
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{item.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span>{item.email}</span>
                        </td>
                        {/* <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <button>Edit</button>
                            </div>
                          </div>
                        </td> */}
                      </tr>
                    )
                  }})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
