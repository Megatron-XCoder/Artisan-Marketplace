import {AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete} from "react-icons/ai";
import {backend_url} from "../../server.jsx";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {useState} from "react";
import styles from "../../Styles/Styles.jsx";
import { DataGrid } from '@mui/x-data-grid';
import {IconButton} from "@material-tailwind/react/dist";


const handleSubmit = async (e) => {
    e.preventDefault();

};



const ProfileContent = ({ active }) => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user?.name);
    const [email, setEmail] = useState(user && user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");


    return (
        <>
            <div className="w-full">
                {/* profile */}
                {active === 1 && (
                    <div className="flex flex-col items-center w-full p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
                        {/* Profile Image Section */}
                        <div className="relative flex justify-center mb-6">
                            <img
                                src={`${backend_url}${user?.avatar}`}
                                className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                                alt="User Avatar"
                            />
                            <label
                                htmlFor="image"
                                className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-indigo-600 transition"
                            >
                                <AiOutlineCamera className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </label>
                            <input type="file" id="image" className="hidden"/>
                        </div>

                        {/* Form Section */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-2xl mt-4 sm:mt-6 space-y-4 sm:space-y-6"
                        >
                            {/* Responsive Grid Containers */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                {/* Name & Email */}
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Full
                                        Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Email
                                        Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Phone & Zip Code */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Phone
                                        Number</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Zip
                                        Code</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Address Fields */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Address
                                        1</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Address
                                        2</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-52 h-12 bg-indigo-500 text-white text-sm sm:text-base font-medium rounded-lg shadow-md cursor-pointer hover:bg-indigo-600 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* order page */}
                {active === 2 && (
                    <div className="px-4 sm:pl-8 pt-1 w-full overflow-x-auto">
                        <AllOrders/>
                    </div>
                )}

                {/* refund page */}
                {active === 3 && (
                    <div className="px-4 sm:pl-8 pt-1 w-full overflow-x-auto">
                        <AllRefundOrders/>
                    </div>
                )}

                {/* Track order page */}
                {active === 5 && (
                    <div className="px-4 sm:pl-8 pt-1 w-full overflow-x-auto">
                        <TrackOrders/>
                    </div>
                )}

                {/* Track order page */}
                {active === 6 && (
                    <div className="px-4 sm:pl-8 pt-1 w-full overflow-x-auto">
                        <PaymentMethod/>
                    </div>
                )}

                {/* Address page */}
                {active === 7 && (
                    <div className="px-4 sm:pl-8 pt-1 w-full overflow-x-auto">
                        <Address/>
                    </div>
                )}
            </div>
        </>
    );
}



const AllOrders = () => {
    // ... existing orders data and columns definition

    const orders = [
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ]

    // Responsive columns configuration
    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 100,
            flex: 1,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 90,
            flex: 0.8,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor text-xs sm:text-sm"
                    : "redColor text-xs sm:text-sm";
            },
            headerClassName: 'sm:text-sm',
        },
        {
            field: "itemsQty",
            headerName: "Items",
            type: "number",
            minWidth: 60,
            flex: 0.5,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm',
            hide: { md: false, sm: true } // Hide on small screens
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 90,
            flex: 0.8,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: "DownloadReceipt",
            flex: 0.5,
            minWidth: 50,
            headerName: " Download Receipt ",
            sortable: false,
            cellClassName: '',
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <IconButton size="small">
                        <AiOutlineArrowRight className="text-sm sm:text-base" />
                    </IconButton>
                </Link>
            ),
            disableColumnMenu: true
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
        })
    });

    return (
        <div className=" sm:pl-8 mt-8 sm:mt-0 w-full overflow-x-auto">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: 'Rows:',
                        classes: {
                            root: 'text-xs sm:text-sm',
                            selectIcon: 'text-xs sm:text-sm'
                        }
                    }
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                        '@media (max-width: 600px)': {
                            padding: '4px'
                        }
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600',
                        '@media (max-width: 600px)': {
                            fontSize: '0.75rem'
                        }
                    }
                }}
            />
        </div>
    );
};

const AllRefundOrders = () => {
    // ... existing orders data and columns definition

    const orders = [
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ]

    // Responsive columns configuration
    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 100,
            flex: 1,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 90,
            flex: 0.8,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor text-xs sm:text-sm"
                    : "redColor text-xs sm:text-sm";
            },
            headerClassName: 'sm:text-sm',
        },
        {
            field: "itemsQty",
            headerName: "Items",
            type: "number",
            minWidth: 60,
            flex: 0.5,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm',
            hide: { md: false, sm: true } // Hide on small screens
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 90,
            flex: 0.8,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: " Download Receipt ",
            flex: 0.5,
            minWidth: 50,
            headerName: "Download Receipt",
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <IconButton size="small">
                        <AiOutlineArrowRight className="text-sm sm:text-base" />
                    </IconButton>
                </Link>
            ),
            disableColumnMenu: true
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
        })
    });

    return (
        <div className=" sm:pl-8 mt-8 sm:mt-0 w-full overflow-x-auto">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: 'Rows:',
                        classes: {
                            root: 'text-xs sm:text-sm',
                            selectIcon: 'text-xs sm:text-sm'
                        }
                    }
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                        '@media (max-width: 600px)': {
                            padding: '4px'
                        }
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600',
                        '@media (max-width: 600px)': {
                            fontSize: '0.75rem'
                        }
                    }
                }}
            />
        </div>
    );
};

const TrackOrders = () => {
    const orders = [
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },{
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ]

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 100,
            flex: 1,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 90,
            flex: 0.8,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor text-xs sm:text-sm"
                    : "redColor text-xs sm:text-sm";
            },
            headerClassName: 'sm:text-sm',
        },
        {
            field: "itemsQty",
            headerName: "Items",
            type: "number",
            minWidth: 60,
            flex: 0.5,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm',
            hide: { md: false, sm: true } // Hide on small screens
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 90,
            flex: 0.8,
            headerClassName: 'sm:text-sm',
            cellClassName: 'text-xs sm:text-sm'
        },
        {
            field: " Download Receipt ",
            flex: 0.5,
            minWidth: 50,
            headerName: "Download Receipt",
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <IconButton size="small">
                        <AiOutlineArrowRight className="text-sm sm:text-base" />
                    </IconButton>
                </Link>
            ),
            disableColumnMenu: true
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
        })
    });


    return (
        <div className=" sm:pl-8 mt-8 sm:mt-0 w-full overflow-x-auto">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: 'Rows:',
                        classes: {
                            root: 'text-xs sm:text-sm',
                            selectIcon: 'text-xs sm:text-sm'
                        }
                    }
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                        '@media (max-width: 600px)': {
                            padding: '4px'
                        }
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600',
                        '@media (max-width: 600px)': {
                            fontSize: '0.75rem'
                        }
                    }
                }}
            />
        </div>
    )
}

// const PaymentMethod = () => {
//     return (
//         <div className={"w-full px-5"}>
//             <div className={"flex w-full items-center justify-between"}>
//                 <h1 className={"text-[25px] font-[600] text-[#000000ba]"}>Payment Method</h1>
//                 <div className={"flex items-center justify-between"}>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="paypal" className={"mr-2"}/>
//                         <label htmlFor="paypal" className={"text-sm"}>Paypal</label>
//                     </div>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="stripe" className={"mr-2"}/>
//                         <label htmlFor="stripe" className={"text-sm"}>Stripe</label>
//                     </div>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="cash" className={"mr-2"}/>
//                         <label htmlFor="cash" className={"text-sm"}>Cash</label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


const PaymentMethod = () => {
    // const [open, setOpen] = useState(false);
    // const [country, setCountry] = useState("");
    // const [city, setCity] = useState("");
    // const [zipCode, setZipCode] = useState();
    // const [address1, setAddress1] = useState("");
    // const [address2, setAddress2] = useState("");
    // const [addressType, setAddressType] = useState("");
    // const { user } = useSelector((state) => state.user);
    // const dispatch = useDispatch();
    //
    // const addressTypeData = [
    //     {
    //         name: "Default",
    //     },
    //     {
    //         name: "Home",
    //     },
    //     {
    //         name: "Office",
    //     },
    // ];
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     if (addressType === "" || country === "" || city === "") {
    //         toast.error("Please fill all the fields!");
    //     } else {
    //         dispatch(
    //             updatUserAddress(
    //                 country,
    //                 city,
    //                 address1,
    //                 address2,
    //                 zipCode,
    //                 addressType
    //             )
    //         );
    //         setOpen(false);
    //         setCountry("");
    //         setCity("");
    //         setAddress1("");
    //         setAddress2("");
    //         setZipCode(null);
    //         setAddressType("");
    //     }
    // };
    //
    // const handleDelete = (item) => {
    //     const id = item._id;
    //     dispatch(deleteUserAddress(id));
    // };

    return (
        <div className="w-full px-5">
            {/*{open && (*/}
            {/*    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">*/}
            {/*        <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">*/}
            {/*            <div className="w-full flex justify-end p-3">*/}
            {/*                <RxCross1*/}
            {/*                    size={30}*/}
            {/*                    className="cursor-pointer"*/}
            {/*                    onClick={() => setOpen(false)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <h1 className="text-center text-[25px] font-Poppins">*/}
            {/*                Add New Address*/}
            {/*            </h1>*/}
            {/*            <div className="w-full">*/}
            {/*                <form aria-required onSubmit={handleSubmit} className="w-full">*/}
            {/*                    <div className="w-full block p-4">*/}
            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Country</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={country}*/}
            {/*                                onChange={(e) => setCountry(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    choose your country*/}
            {/*                                </option>*/}
            {/*                                {Country &&*/}
            {/*                                    Country.getAllCountries().map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.isoCode}*/}
            {/*                                            value={item.isoCode}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Choose your City</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={city}*/}
            {/*                                onChange={(e) => setCity(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    choose your city*/}
            {/*                                </option>*/}
            {/*                                {State &&*/}
            {/*                                    State.getStatesOfCountry(country).map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.isoCode}*/}
            {/*                                            value={item.isoCode}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address 1</label>*/}
            {/*                            <input*/}
            {/*                                type="address"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={address1}*/}
            {/*                                onChange={(e) => setAddress1(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address 2</label>*/}
            {/*                            <input*/}
            {/*                                type="address"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={address2}*/}
            {/*                                onChange={(e) => setAddress2(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Zip Code</label>*/}
            {/*                            <input*/}
            {/*                                type="number"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={zipCode}*/}
            {/*                                onChange={(e) => setZipCode(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address Type</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={addressType}*/}
            {/*                                onChange={(e) => setAddressType(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    Choose your Address Type*/}
            {/*                                </option>*/}
            {/*                                {addressTypeData &&*/}
            {/*                                    addressTypeData.map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.name}*/}
            {/*                                            value={item.name}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className=" w-full pb-2">*/}
            {/*                            <input*/}
            {/*                                type="submit"*/}
            {/*                                className={`${styles.input} mt-5 cursor-pointer`}*/}
            {/*                                required*/}
            {/*                                readOnly*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </form>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    Payment Methods
                </h1>
                <div
                    className={`${styles.button} !rounded-lg`}
                    // onClick={() => setOpen(true)}
                >
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br/>
            <div
                className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
            >
                <div className="flex items-center">
                    <img
                        src={"https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"}
                        alt=""
                        className={"w-20"}
                    />
                    <h5 className="pl-5 font-semibold text-xl">Sanjeev Kumar Das</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-lg">1234 **** **** 1234</h6>
                    <h5 className="text-md pl-8">Exp: 12/25</h5>
                </div>
                <div className="min-w- flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer"/>
                </div>
            </div>


            {/*{user &&*/}
            {/*    user.addresses.map((item, index) => (*/}
            {/*        <div*/}
            {/*            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"*/}
            {/*            key={index}*/}
            {/*        >*/}
            {/*            <div className="flex items-center">*/}
            {/*                <h5 className="pl-5 font-[600]">{item.addressType}</h5>*/}
            {/*            </div>*/}
            {/*            <div className="pl-8 flex items-center">*/}
            {/*                <h6 className="text-[12px] 800px:text-[unset]">*/}
            {/*                    {item.address1} {item.address2}*/}
            {/*                </h6>*/}
            {/*            </div>*/}
            {/*            <div className="pl-8 flex items-center">*/}
            {/*                <h6 className="text-[12px] 800px:text-[unset]">*/}
            {/*                    {user && user.phoneNumber}*/}
            {/*                </h6>*/}
            {/*            </div>*/}
            {/*            <div className="min-w-[10%] flex items-center justify-between pl-8">*/}
            {/*                <AiOutlineDelete*/}
            {/*                    size={25}*/}
            {/*                    className="cursor-pointer"*/}
            {/*                    onClick={() => handleDelete(item)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*{user && user.addresses.length === 0 && (*/}
            {/*    <h5 className="text-center pt-8 text-[18px]">*/}
            {/*        You not have any saved address!*/}
            {/*    </h5>*/}
            {/*)}*/}
        </div>
    );
};

const Address = () => {
    // const [open, setOpen] = useState(false);
    // const [country, setCountry] = useState("");
    // const [city, setCity] = useState("");
    // const [zipCode, setZipCode] = useState();
    // const [address1, setAddress1] = useState("");
    // const [address2, setAddress2] = useState("");
    // const [addressType, setAddressType] = useState("");
    // const { user } = useSelector((state) => state.user);
    // const dispatch = useDispatch();
    //
    // const addressTypeData = [
    //     {
    //         name: "Default",
    //     },
    //     {
    //         name: "Home",
    //     },
    //     {
    //         name: "Office",
    //     },
    // ];
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     if (addressType === "" || country === "" || city === "") {
    //         toast.error("Please fill all the fields!");
    //     } else {
    //         dispatch(
    //             updatUserAddress(
    //                 country,
    //                 city,
    //                 address1,
    //                 address2,
    //                 zipCode,
    //                 addressType
    //             )
    //         );
    //         setOpen(false);
    //         setCountry("");
    //         setCity("");
    //         setAddress1("");
    //         setAddress2("");
    //         setZipCode(null);
    //         setAddressType("");
    //     }
    // };
    //
    // const handleDelete = (item) => {
    //     const id = item._id;
    //     dispatch(deleteUserAddress(id));
    // };

    return (
        <div className="w-full px-5">
            {/*{open && (*/}
            {/*    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">*/}
            {/*        <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">*/}
            {/*            <div className="w-full flex justify-end p-3">*/}
            {/*                <RxCross1*/}
            {/*                    size={30}*/}
            {/*                    className="cursor-pointer"*/}
            {/*                    onClick={() => setOpen(false)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <h1 className="text-center text-[25px] font-Poppins">*/}
            {/*                Add New Address*/}
            {/*            </h1>*/}
            {/*            <div className="w-full">*/}
            {/*                <form aria-required onSubmit={handleSubmit} className="w-full">*/}
            {/*                    <div className="w-full block p-4">*/}
            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Country</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={country}*/}
            {/*                                onChange={(e) => setCountry(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    choose your country*/}
            {/*                                </option>*/}
            {/*                                {Country &&*/}
            {/*                                    Country.getAllCountries().map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.isoCode}*/}
            {/*                                            value={item.isoCode}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Choose your City</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={city}*/}
            {/*                                onChange={(e) => setCity(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    choose your city*/}
            {/*                                </option>*/}
            {/*                                {State &&*/}
            {/*                                    State.getStatesOfCountry(country).map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.isoCode}*/}
            {/*                                            value={item.isoCode}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address 1</label>*/}
            {/*                            <input*/}
            {/*                                type="address"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={address1}*/}
            {/*                                onChange={(e) => setAddress1(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address 2</label>*/}
            {/*                            <input*/}
            {/*                                type="address"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={address2}*/}
            {/*                                onChange={(e) => setAddress2(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Zip Code</label>*/}
            {/*                            <input*/}
            {/*                                type="number"*/}
            {/*                                className={`${styles.input}`}*/}
            {/*                                required*/}
            {/*                                value={zipCode}*/}
            {/*                                onChange={(e) => setZipCode(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </div>*/}

            {/*                        <div className="w-full pb-2">*/}
            {/*                            <label className="block pb-2">Address Type</label>*/}
            {/*                            <select*/}
            {/*                                name=""*/}
            {/*                                id=""*/}
            {/*                                value={addressType}*/}
            {/*                                onChange={(e) => setAddressType(e.target.value)}*/}
            {/*                                className="w-[95%] border h-[40px] rounded-[5px]"*/}
            {/*                            >*/}
            {/*                                <option value="" className="block border pb-2">*/}
            {/*                                    Choose your Address Type*/}
            {/*                                </option>*/}
            {/*                                {addressTypeData &&*/}
            {/*                                    addressTypeData.map((item) => (*/}
            {/*                                        <option*/}
            {/*                                            className="block pb-2"*/}
            {/*                                            key={item.name}*/}
            {/*                                            value={item.name}*/}
            {/*                                        >*/}
            {/*                                            {item.name}*/}
            {/*                                        </option>*/}
            {/*                                    ))}*/}
            {/*                            </select>*/}
            {/*                        </div>*/}

            {/*                        <div className=" w-full pb-2">*/}
            {/*                            <input*/}
            {/*                                type="submit"*/}
            {/*                                className={`${styles.input} mt-5 cursor-pointer`}*/}
            {/*                                required*/}
            {/*                                readOnly*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </form>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    My Addresses
                </h1>
                <div
                    className={`${styles.button} !rounded-lg`}
                    // onClick={() => setOpen(true)}
                >
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br/>
            <div
                className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
            >
                <div className="flex items-center">
                    <h5 className="pl-5 font-semibold text-xl">Default Address</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-lg">1234 shark st, Chandigarh, Chandigarh</h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-lg">(123) 456-7890</h6>
                </div>
                <div className="min-w- flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer"/>
                </div>
            </div>


            {/*{user &&*/}
            {/*    user.addresses.map((item, index) => (*/}
            {/*        <div*/}
            {/*            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"*/}
            {/*            key={index}*/}
            {/*        >*/}
            {/*            <div className="flex items-center">*/}
            {/*                <h5 className="pl-5 font-[600]">{item.addressType}</h5>*/}
            {/*            </div>*/}
            {/*            <div className="pl-8 flex items-center">*/}
            {/*                <h6 className="text-[12px] 800px:text-[unset]">*/}
            {/*                    {item.address1} {item.address2}*/}
            {/*                </h6>*/}
            {/*            </div>*/}
            {/*            <div className="pl-8 flex items-center">*/}
            {/*                <h6 className="text-[12px] 800px:text-[unset]">*/}
            {/*                    {user && user.phoneNumber}*/}
            {/*                </h6>*/}
            {/*            </div>*/}
            {/*            <div className="min-w-[10%] flex items-center justify-between pl-8">*/}
            {/*                <AiOutlineDelete*/}
            {/*                    size={25}*/}
            {/*                    className="cursor-pointer"*/}
            {/*                    onClick={() => handleDelete(item)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*{user && user.addresses.length === 0 && (*/}
            {/*    <h5 className="text-center pt-8 text-[18px]">*/}
            {/*        You not have any saved address!*/}
            {/*    </h5>*/}
            {/*)}*/}
        </div>
    );
};

export default ProfileContent;