import {useEffect, useState} from "react";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {categoriesData} from "../../Static/Data.jsx";
import {toast} from "react-toastify";
import {createProduct} from "../../redux/Actions/product.js";

const CreateProduct = () => {
    const {shop} = useSelector((state) => state.shop);
    const {success, error} = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard-products");
            window.location.reload();
        }
    }, [dispatch, error, success]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 3) {
            toast.error("You can only upload up to 3 images.");
            return;
        }

        setImages((prev) => [...prev, ...files]);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image) => formData.append("images", image));
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("originalPrice", originalPrice);
        formData.append("discountPrice", discountPrice);
        formData.append("stock", stock);
        formData.append("shopId", shop._id);

        dispatch(createProduct(formData));
    };

    return (
        <div
            className="w-[95%] 800px:w-[70%] mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100 ">
            <h5 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Product
            </h5>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                        placeholder="Enter product name..."
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* Description Textarea */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 h-30"
                        placeholder="Enter product description..."
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                {/* Category Select */}
                <div className={"grid grid-cols-1 sm:grid-cols-2 gap-6"}>
                    <div className={"space-y-2"}>
                        <label className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="Choose a category" className="text-gray-400">Select category</option>
                            {categoriesData &&
                                categoriesData?.map((i) => (
                                    <option value={i.title} key={i.title} className="text-gray-700">
                                        {i.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Tags
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                            placeholder="Enter Tag..."
                            name="tags"
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                        />
                    </div>
                </div>

                {/* Price Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Original Price
                        </label>
                        <div>
                            <input
                                type="number"
                                placeholder={"$"}
                                className="w-full pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                name="originalPrice"
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                value={originalPrice}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Price (After Discount) <span className="text-red-500">*</span>
                        </label>
                        <div>
                            <input
                                type="number"
                                placeholder={"$"}
                                className="w-full pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                name="discountPrice"
                                onChange={(e) => setDiscountPrice(e.target.value)}
                                value={discountPrice}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Stock <span className="text-red-500">*</span>
                        </label>
                        <div>
                            <input
                                type="number"
                                placeholder={"Enter your product stock..."}
                                className="w-full pr-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                name="stock"
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            id="upload"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload" className="cursor-pointer">
                            <AiOutlinePlusCircle
                                className="mx-auto text-3xl text-gray-400 mb-2 hover:text-blue-500 transition-colors"/>
                            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">(Up to 3 images)</p>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 max-h-96 overflow-y-auto">
                            {images?.map((file, index) => (
                                <div key={index} className=" relative aspect-square group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        className="h-full w-full object-cover rounded-lg shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-1 right-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-md"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
