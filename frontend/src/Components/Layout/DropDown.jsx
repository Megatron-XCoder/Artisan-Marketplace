import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DropDown = ({categoriesData, setDropDown}) => {
    const navigate = useNavigate();
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload();
    };
    return (
        <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
            {categoriesData &&
                categoriesData.map((i, index) => (
                    <div
                        key={index}
                        className={`flex items-center hover:drop-shadow-md hover:bg-gray-100 hover:font-semibold`}
                        onClick={() => submitHandle(i)}
                    >
                        <img
                            src={i.image_Url}
                            className={"rounded-sm  "}
                            style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "contain",
                                marginLeft: "10px",
                                userSelect: "none",
                            }}
                            alt="Category Image"
                        />
                        <h3 className="m-3 cursor-pointer  select-none">{i.title}</h3>
                    </div>
                ))}
        </div>
    );
};

export default DropDown;