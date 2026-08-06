import { ArrowLeftIcon, X } from "lucide-react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import addImage from "../assets/add image.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createCategory,
  getCategories,
} from "../lib/services/categories.service";
import { createProduce } from "../lib/services/produce.service";
import { getFarmers } from "../lib/services/farmers.service";
import { createFarmerListing } from "../lib/services/listings.service";
import { getErrorMessage } from "../lib/getErrorMessage";
import type { Category } from "../lib/types/category";
import type { Farmer } from "../lib/types/farmer";
import type { ListingStatus } from "../lib/types/listing";

const produceLabels = ["Vegetables", "Fruits", "Grains"];

const AddListing = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Categories: loaded from the API, plus the "create new category" mini-form
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Produce fields actually sent to POST /admin/produce
  const [produceName, setProduceName] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);

  // Cosmetic-only — not part of the produce/listing API, kept for the UI design
  const [harvestDate, setHarvestDate] = useState("");
  const [produceLabel, setProduceLabel] = useState("");
  const [minOrderQty, setMinOrderQty] = useState("");

  // Farmers: loaded from the API, filtered client-side by the search box
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [farmersLoading, setFarmersLoading] = useState(true);
  const [farmerSearch, setFarmerSearch] = useState("");
  const [selectedFarmerId, setSelectedFarmerId] = useState<number | null>(null);

  // Listing fields sent to POST /admin/farmers/{farmer_id}/listings
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState<ListingStatus>("active");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadFarmers = async () => {
      try {
        setFarmers(await getFarmers());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setFarmersLoading(false);
      }
    };
    loadFarmers();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCreatingCategory(true);
    setError("");
    try {
      const created = await createCategory(newCategoryName.trim());
      setCategories((prev) => [...prev, created]);
      setCategoryId(created.id);
      setNewCategoryName("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] ?? null);
  };

  const filteredFarmers = farmers.filter((farmer) =>
    `${farmer.name} ${farmer.state} ${farmer.lga}`
      .toLowerCase()
      .includes(farmerSearch.toLowerCase()),
  );

  const handleSaveListing = async () => {
    setError("");

    if (!produceName.trim()) return setError("Please enter a produce name");
    if (!categoryId) return setError("Please select a category");
    if (!image) return setError("Please upload a produce image");
    if (!selectedFarmerId) return setError("Please select a farmer");
    if (!price || Number(price) < 0) return setError("Please enter a valid price");
    if (!stock || Number(stock) < 0) return setError("Please enter a valid stock quantity");

    setLoading(true);
    try {
      const createdProduce = await createProduce({
        category_id: categoryId,
        name: produceName.trim(),
        image,
      });

      await createFarmerListing(selectedFarmerId, {
        produce_id: createdProduce.id,
        price: Number(price),
        stock: Number(stock),
        status,
      });
console.log("Listing created successfully");
      navigate("/listings");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Link to="/listings">
        <button className="flex text-sm items-center gap-2 text-gray-600 hover:text-white">
          <ArrowLeftIcon />
          Back to Listings
        </button>
      </Link>

      {error && (
        <div className="mt-6 rounded-md bg-red-50 p-3 text-sm text-primary">
          {error}
        </div>
      )}

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Create Category</h1>
          <p className="text-gray-400 font-medium">
            Group your produce into different categories
          </p>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Grains"
            className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCreateCategory}
            disabled={creatingCategory}
            className="bg-[#4A7C2A] font-semibold text-white py-3 px-4 rounded-md hover:bg-[#3e6b22] disabled:opacity-60"
          >
            {creatingCategory ? "Creating..." : "Create Category"}
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Produce Information</h1>
          <p className="text-gray-400 font-medium">
            What's being listed for sale
          </p>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">Produce Name</label>
          <input
            type="text"
            placeholder="e.g. Apples"
            className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            value={produceName}
            onChange={(e) => setProduceName(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Category</label>
            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : "")
              }
              className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            >
              <option value="">
                {categoriesLoading ? "Loading categories..." : "Select category"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Harvest/ Available Date</label>
            <input
              type="date"
              className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4 w-2/5">
          <label className="font-medium">Produce Label</label>
          <select
            className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
            value={produceLabel}
            onChange={(e) => setProduceLabel(e.target.value)}
          >
            <option value="">Select label</option>
            {produceLabels.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
          <p className="text-gray-400 text-sm">Describes product quality</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Farmer Assignment</h1>
          <p className="text-gray-400 font-medium">
            Who this produce belongs to
          </p>
        </div>

        <input
          type="search"
          placeholder="Search farmers..."
          value={farmerSearch}
          onChange={(e) => setFarmerSearch(e.target.value)}
          className="w-full border border-[#4A7C2A]/30 bg-global-bg rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
        />

        <div className="font-medium border-t border-gray-200 py-4 mt-4">
          <p>Select Farmer</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {farmersLoading && <p className="text-sm text-gray-400">Loading farmers...</p>}
          {!farmersLoading && filteredFarmers.length === 0 && (
            <p className="text-sm text-gray-400">No farmers found.</p>
          )}
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => setSelectedFarmerId(farmer.id)}
              className={`p-3 flex items-center justify-between border rounded-lg cursor-pointer ${
                selectedFarmerId === farmer.id
                  ? "border-[#4A7C2A] bg-[#4A7C2A]/10"
                  : "border-[#4A7C2A]/30 hover:bg-[#4A7C2A]/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar name={farmer.name} />
                <div>
                  <p className="font-medium text-slate-900">{farmer.name}</p>
                  <p className="text-xs text-slate-400">
                    {farmer.state} - {farmer.lga}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Pricing & Stock</h1>
          <p className="text-gray-400 font-medium">
            How much is this produce being sold for and how much is available
          </p>
        </div>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Price per unit</label>
            <div className="flex items-center border border-[#4A7C2A]/30 rounded-md focus-within:ring-2 focus-within:ring-[#4A7C2A]">
              <span className="p-2.5 border-r border-gray-300 bg-global-bg text-sm text-gray-400">
                N
              </span>
              <input
                type="number"
                placeholder="e.g. 5000"
                className="w-full py-2 px-3 focus:outline-none rounded-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="p-2.5 border-r border-gray-300 bg-global-bg text-sm text-gray-400">
                /kg
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Available Stock</label>
            <input
              type="number"
              placeholder="e.g. 10"
              className="border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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
            value={minOrderQty}
            onChange={(e) => setMinOrderQty(e.target.value)}
          />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Produce Image</h1>
          <p className="text-gray-400 font-medium">
            This is the image that will be displayed to buyers when they view
            this produce
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2 mb-4 border p-20 border-dashed border-gray-400 items-center rounded-md">
          <img src={addImage} alt="add file image" />
          <p className="font-bold text-md"> Drag and drop image here </p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="items-center flex justify-center text-center text-primary"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-1 justify-between items-center">
          <p className="text-gray-400 text-sm">
            Supported formats: JPG, PNG, WebP
          </p>
          <p className="text-gray-400 text-sm">Max file size: 5MB</p>
        </div>

        {image && (
          <div className="flex flex-col gap-2 mb-4 w-2/5 mt-4">
            Uploaded files
            <div className="flex items-center justify-between border border-[#4A7C2A]/30 rounded-lg p-2">
              <span>{image.name}</span>
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white p-6 rounded-lg mt-6">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold">Listing Status</h1>
          <p className="text-gray-400 font-medium">
            Decide whether this listing should be published immediately.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className={`font-bold py-3 px-4 rounded-md border border-[#4A7C2A] ${status === "active" ? "bg-[#27AE603D]" : "text-[#4A7C2A]"}`}
            onClick={() => setStatus("active")}
          >
            Publish Listing Now
            <p className="text-sm text-gray-400">
              Visible to buyers on the marketplace immediately
            </p>
          </button>
          <button
            type="button"
            className={`font-bold py-3 px-4 rounded-md border border-[#4A7C2A] ${status === "inactive" ? "bg-[#27AE603D]" : "text-[#4A7C2A]"}`}
            onClick={() => setStatus("inactive")}
          >
            Save as Inactive
            <p className="text-sm text-gray-400">
              Hidden from buyers until you activate it later
            </p>
          </button>
        </div>
      </section>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => navigate("/listings")}
          className="font-semibold text-[#4A7C2A] py-3 px-4 rounded-md border border-[#4A7C2A] hover:bg-[#3e6b22]"
        >
          Discard Changes
        </button>
        <button
          type="button"
          onClick={handleSaveListing}
          disabled={loading}
          className="bg-[#4A7C2A] font-semibold text-white py-3 px-4 rounded-md hover:bg-[#3e6b22] disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Layout>
  );
};

export default AddListing;
