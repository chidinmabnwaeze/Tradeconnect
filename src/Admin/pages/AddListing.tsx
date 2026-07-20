import { ArrowLeftIcon } from "lucide-react";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import addImage from "../../assets/add image.png";
import React from "react";

const AddListing = () => {
  interface Farmer {
    name: string;
    code: string;
    lga: string;
    listings: number;
    status: "Active" | "Pending" | "Inactive";
  }

  const farmers: Farmer[] = [
    {
      name: "Musa Ibrahim",
      code: "FAR-01923",
      lga: "Kagarko",
      listings: 7,
      status: "Active",
    },
    {
      name: "Aisha Yusuf",
      code: "FAR-01872",
      lga: "Kajuru",
      listings: 3,
      status: "Pending",
    },
    {
      name: "Muhibba Musa",
      code: "FAR-02963",
      lga: "Kachia",
      listings: 8,
      status: "Inactive",
    },
    {
      name: "Ahmmed Bayo",
      code: "FAR-01923",
      lga: "Jemaa",
      listings: 5,
      status: "Active",
    },
    {
      name: "Musa Ibrahim",
      code: "FAR-01923",
      lga: "Kagarko",
      listings: 7,
      status: "Inactive",
    },
  ];

  const [isActive, setIsActive] = React.useState(false);

  return (

    <Layout>
      <button className="flex text-sm items-center gap-2 text-gray-600 hover:text-white">
        <ArrowLeftIcon />
        Back to Listings
      </button>
      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Produce Information</h1>
          <p
            className="text-gray-400 font-medium
          "
          >
            What's being listed for sale
          </p>
        </div>
        <form action="">
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-medium">Produce Name</label>
            <input
              type="text"
              placeholder="e.g. Apples"
              className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            />
          </div>
          <div className="flex justify-between gap-2 mb-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-medium">Category</label>
              <select className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]">
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Grains</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <label className="font-medium">Harvest/ Available Date</label>
              <input
                type="date"
                placeholder="e.g. 10"
                className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 w-2/5">
            <label className="font-medium">Produce Label</label>
            <select className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]">
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
            </select>
            <p className="text-gray-400 text-sm">Describes product quality</p>
          </div>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Farmer Assignment</h1>
          <p
            className="text-gray-400 font-medium
          "
          >
            Who this produce belongs to
          </p>
        </div>

        <input
          type="search"
          placeholder="Search farmers..."
          className=" w-full border border-[#4A7C2A]/30 bg-global-bg rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
        />

        <div className="font-medium border-t border-gray-200 py-4 mt-4">
          <p>Select Farmer</p>
        </div>
        <div className="flex gap-2 ">
          {farmers.map((farmer, idx) => (
            <div
              className="p-3 flex items-center justify-between border border-[#4A7C2A]/30 rounded-lg hover:bg-[#4A7C2A]/10 cursor-pointer"
              key={idx}
            >
              <div className="flex items-center gap-3">
                <Avatar name={farmer.name} />
                <div>
                  <p className="font-medium text-slate-900">{farmer.name}</p>
                  <p className="text-xs text-slate-400">{farmer.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Pricing & Stock</h1>
          <p
            className="text-gray-400 font-medium
          "
          >
            How much is this produce being sold for and how much is available
          </p>
        </div>
        <form action="">
          <div className="flex justify-between gap-2 mb-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-medium">Price per unit</label>
              <div className="flex items-center border border-[#4A7C2A]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]">
                <span className="p-2.5 border-r border-gray-300 bg-global-bg text-sm text-gray-400">
                  N
                </span>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A] rounded-sm"
                />
                <span className="p-2.5 border-r border-gray-300 bg-global-bg text-sm text-gray-400">
                  /kg
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <label className="font-medium">Available Stock</label>
              <input
                type="number"
                placeholder="e.g. 10"
                className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
              />
              <p className="text-gray-400 text-sm">
                In the same unit selected above
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 w-2/5">
            <label className="font-medium">Minimum Order Quantity</label>
            <input
              type="number"
              placeholder="e.g. 5"
              className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            />
          </div>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Produce Image</h1>
          <p
            className="text-gray-400 font-medium
          "
          >
            This is the image that will be displayed to buyers when they view
            this produce
          </p>
        </div>
        <form action="">
          <div className="flex flex-col justify-between gap-2 mb-4 border p-20 border-dashed border-gray-400 items-center rounded-md">
            <img src={addImage} alt="add file image" />
            <p className="font-bold text-md"> Drag and drop image here </p>
            <input
              type="file"
              placeholder="e.g. 5000"
              className="items-center flex justify-center text-center text-primary"
            />
          </div>
          <div className="flex gap-1 justify-between items-center">
            <p className="text-gray-400 text-sm">
              Supported formats: JPG, PNG, GIF
            </p>
            <p className="text-gray-400 text-sm">Max file size: 5MB</p>
          </div>

          <div className="flex flex-col gap-2 mb-4 w-2/5">
            Uploaded files
            {[].map((file, idx) => (
              <div className="flex items-center justify-between border border-[#4A7C2A]/30 rounded-lg p-2">
                {/* <span>{file.name}</span> */}
                <button className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>  
        </form>
      </section>

       <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Listing Status</h1>
          <p
            className="text-gray-400 font-medium
          "
          >
            Decide whether this listing should be published immediately.
          </p>
        </div>
       
       <div className="flex justify-between items-center">
        <button className={` font-bold py-3 px-4 rounded-md border border-[#4A7C2A] ${isActive ? "bg-[#27AE603D] " : "text-[#4A7C2A]"}`} onClick={() => setIsActive(!isActive)}>
          Publish Listing Now
          <p className="text-sm text-gray-400">Visible to buyers on the marketplace immediately</p>
        </button>
         <button className={` font-bold py-3 px-4 rounded-md border border-[#4A7C2A] ${isActive ? "text-[#4A7C2A]"  : "bg-[#27AE603D] "}`} onClick={() => setIsActive(!isActive)}>
          Save as Pending
          <p className="text-sm text-gray-400">Hold for review before it is visible to buyers</p>
        </button>
       </div>
      </section>
      <div className="flex justify-end gap-4 mt-6">
        <button className="font-semibold text-[#4A7C2A] py-3 px-4 rounded-md border border-[#4A7C2A] hover:bg-[#3e6b22]">
          Discard Changes
        </button>
        <button className="bg-[#4A7C2A] font-semibold text-white py-3 px-4 rounded-md hover:bg-[#3e6b22]">
          Save Changes
        </button>
      </div>
    </Layout>
  );
};

export default AddListing;
