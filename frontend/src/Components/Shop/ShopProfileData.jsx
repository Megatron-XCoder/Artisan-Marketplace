import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import {getAllProductsShop} from "../../redux/actions/product.js";
import {getAllEventsShop} from "../../redux/Actions/event.js";

const ShopProfileData = ({isOwner}) => {
    const {products} = useSelector((state) => state.products);
    const {events} = useSelector((state) => state.events);
    const {id} = useParams();
    const dispatch = useDispatch();

    const [active, setActive] = useState(1);

    useEffect(() => {
        dispatch(getAllProductsShop(id));
        dispatch(getAllEventsShop(id));
    }, [dispatch, id]);

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row w-full items-center sm:items-center justify-around">
                <div className="w-full flex pb-2 sm:pb-0">
                    <div className="flex " onClick={() => setActive(1)}>
                        <h5 className={`font-semibold text-[18px] sm:text-[20px] ${
                            active === 1 ? "text-red-500" : "text-[#333]"
                        } cursor-pointer pr-[20px] sm:pr-[20px]`}>
                            Shop Products
                        </h5>
                    </div>
                    <div className="flex " onClick={() => setActive(2)}>
                        <h5 className={`font-semibold text-[18px] sm:text-[20px] ${
                            active === 2 ? "text-red-500" : "text-[#333]"
                        } cursor-pointer pr-[20px] sm:pr-[20px]`}>
                            Running Events
                        </h5>
                    </div>
                    <div className="flex " onClick={() => setActive(3)}>
                        <h5 className={`font-semibold text-[18px] sm:text-[20px] ${
                            active === 3 ? "text-red-500" : "text-[#333]"
                        } cursor-pointer pr-[20px] sm:pr-[20px]`}>
                            Shop Reviews
                        </h5>
                    </div>
                </div>

                <div className="w-full sm:w-auto sm:mt-0">
                    {isOwner && (
                        <div>
                            <Link to="/dashboard">
                                <div
                                    className={`${styles.button} !rounded-lg h-[36px] sm:h-[42px] text-lg sm:text-base`}>
                                    <span className="text-[#fff]">Go Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>


            {active === 1 && (
                <div
                    className="grid grid-cols-1 gap-[15px] xs:gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12 border-0">
                    {products?.map((product, index) => (
                        <ProductCard data={product} key={index} isShop={true}/>
                    ))}
                </div>
            )}

            {active === 2 && (
                <div className="w-full">
                    {/*<div*/}
                    {/*    className="grid grid-cols-1 gap-[15px] xs:gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12 border-0">*/}
                    {/*    {events?.map((event, index) => (*/}
                    {/*        <ProductCard*/}
                    {/*            data={event}*/}
                    {/*            key={index}*/}
                    {/*            isShop={true}*/}
                    {/*            isEvent={true}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*{events?.length === 0 && (*/}
                    {/*    <h5 className="w-full text-center py-5 text-[18px]">*/}
                    {/*        No Events available for this shop!*/}
                    {/*    </h5>*/}
                    {/*)}*/}
                </div>
            )}

            {active === 3 && (
                <div className="w-full">
                    {/* Commented Reviews Section remains unchanged */}
                    {/* ... */}
                </div>
            )}
        </div>
    );
};

export default ShopProfileData;