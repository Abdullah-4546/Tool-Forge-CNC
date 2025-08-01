import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/actions/categoryAction";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

function AdminViewAllCategory() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.category);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!data || data.length === 0) {
        return <div className="text-center">No categories found.</div>;
    }

    return (
        <div>
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-semibold mb-6 mx-10">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-10">
                    {data.map((category) => (
                        <div
                            key={category?._id}
                            className="relative overflow-hidden rounded-2xl shadow-lg flex-none"
                        >
                            <img
                                src={category?.image?.url}
                                alt={category?.name}
                                className="w-full object-cover rounded-t-lg"
                                style={{ height: "200px" }} // Adjust image height for mobile screens
                            />
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{category?.name}</h3>
                                <Link to={`/admin/dashboard/edit-category/${category?._id}`} >
                                    <button className="text-white text-lg font-semibold py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminViewAllCategory;
