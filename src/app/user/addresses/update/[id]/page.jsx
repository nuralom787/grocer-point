"use client";

import NavigationPanel from "@/app/user/components/NavigationPanel";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

// const url = "https://grocerpoint.vercel.app";
const url = "http://localhost:3000";

const UpdateAddress = () => {
    const { id } = useParams();
    const router = useRouter();
    const session = useSession();
    const [currentAddress, setCurrentAddress] = useState({});
    const { register, handleSubmit, control, formState: { errors }, setError, resetField, reset } = useForm({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            region: "",
            city: "",
            zone: "",
            address: "",
        }
    });
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState("");
    const [cites, setCites] = useState([]);
    const [city, setCity] = useState("");
    const [zones, setZones] = useState([]);
    const [zone, setZone] = useState("");

    // reset default values of input fields.
    useEffect(() => {
        if (currentAddress?._id) {
            reset({
                fullName: currentAddress.fullName || "",
                phoneNumber: currentAddress.phoneNumber || "",
                region: currentAddress.region || "",
                city: currentAddress.city || "",
                zone: currentAddress.zone || "",
                address: currentAddress.address || "",
            });
        }
    }, [currentAddress, reset]);


    // Load User Profile for current Address.
    useEffect(() => {
        fetch(`${url}/api/myAccount?email=${session?.data?.user?.email}`)
            .then(res => res.json())
            .then(data => {
                const newAddress = data.addresses.find(address => address._id === id);
                setCurrentAddress(newAddress);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);


    useEffect(() => {
        fetch(`${url}/api/location?query=region`, { cache: "force-cache" })
            .then(res => res.json())
            .then(data => {
                setRegions(data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleCityAddress = (e) => {
        setLoading(true);
        setCites([]);
        setCity("");
        setZones([]);
        setZone("");
        setRegion(e.target.options[e.target.selectedIndex].text);
        fetch(`${url}/api/location?query=city&addressId=${e.target.value}`, { cache: "force-cache" })
            .then(res => res.json())
            .then(data => {
                setCites(data.result);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    };

    const handleZoneAddress = (e) => {
        setLoading(true);
        setZones([]);
        setZone("");
        resetField("address", { keepError: true })
        setCity(e.target.options[e.target.selectedIndex].text);
        fetch(`${url}/api/location?query=zone&addressId=${e.target.value}`, { cache: "force-cache" })
            .then(res => res.json())
            .then(data => {
                setZones(data.result);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    };


    // Update Information Function.
    const onSubmit = (data) => {
        if (region && !city && !zone) {
            return (
                setError("city"),
                setError("zone")
            )
        };
        data.region = region ? region : currentAddress.region
        data.city = city ? city : currentAddress.city
        data.zone = zone ? zone : currentAddress.zone
        data._id = currentAddress._id
        // console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update your address information?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);

                // Update Address Data in Database.
                fetch(`${url}/api/location?email=${session?.data?.user?.email}&query=update-address`, {
                    method: "PATCH",
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.result.acknowledged || data.result.modifiedCount > 0) {
                            setLoading(false);
                            Swal.fire({
                                title: "Updated!",
                                text: "Address Updated Successfully!",
                                icon: "success"
                            });
                            router.push("/user/addresses");
                            router.refresh();
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    });
            }
        });
    };


    // Delete Address Function.
    const handleDeleteAddress = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete this address information?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete It!"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);

                // Update Address Data in Database.
                fetch(`${url}/api/location?email=${session?.data?.user?.email}&query=delete-address`, {
                    method: "PATCH",
                    body: JSON.stringify({ addressId: currentAddress._id })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.result.modifiedCount > 0) {
                            setLoading(false);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Address Deleted Successfully!",
                                icon: "success"
                            });
                            router.push("/user/addresses");
                            router.refresh();
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    });
            }
        });
    };


    return (
        <div className="py-10">
            <section className="max-w-screen-2xl mx-auto px-3 lg:px-6 font-poppins">
                <section className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 text-[#151515]">
                    {/* Navigation Panel */}
                    <NavigationPanel />

                    {/* Account Info */}
                    <div className="w-full lg:w-3/4 rounded">
                        <section className="bg-white p-4 rounded font-inter">
                            <div className="flex justify-between items-center gap-5 lg:px-6">
                                <h3 className="font-semibold text-[#151515] text-lg">Edit Address</h3>
                                <button
                                    className="bg-cyan-600 hover:bg-cyan-800 duration-300 px-5 py-2.5 rounded text-xs font-semibold text-white cursor-pointer"
                                    onClick={handleDeleteAddress}>
                                    Delete
                                </button>
                            </div>
                            <div className='divider before:bg-black after:bg-black my-1.5'></div>
                            <div>
                                {loading &&
                                    <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                }
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="px-2 lg:px-6 pb-4 lg:pb-12 pt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <label>
                                            <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.fullName && "text-red-500"}`}>Full Name</p>
                                            <input
                                                {...register("fullName", { required: true })}
                                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                                placeholder="Enter your Full-name"
                                                type="text"
                                            />
                                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                        </label>
                                        <label>
                                            <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.phoneNumber && "text-red-500"}`}>Phone Number</p>
                                            <input
                                                {...register("phoneNumber", { required: true })}
                                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.phoneNumber && "border-red-500"}`}
                                                placeholder="Please enter your phone number"
                                                type="number"
                                            />
                                            {errors.phoneNumber && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                        </label>
                                        <label>
                                            <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.region && "text-red-500"}`}>Province / Region</p>
                                            <Controller
                                                name="region"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <select
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleCityAddress(e);
                                                        }}
                                                        className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm cursor-pointer ${errors.region && "border-red-500"}`}
                                                    >
                                                        <option hidden>{currentAddress?.region}</option>
                                                        {
                                                            regions.map(region => <option
                                                                key={region.id}
                                                                value={region.id}
                                                            >
                                                                {region.name}
                                                            </option>)
                                                        }
                                                    </select>
                                                )}
                                            />
                                            {errors.region && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                        </label>
                                        {cites.length ?
                                            <label>
                                                <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.city && "text-red-500"}`}>City</p>
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <select
                                                            {...field}
                                                            disabled={cites.length ? false : true}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleZoneAddress(e);
                                                            }}
                                                            className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.city && "border-red-500"} ${cites.length ? "cursor-pointer" : "cursor-not-allowed"}`}
                                                        >
                                                            <option hidden>Please Choose your city</option>
                                                            {
                                                                cites.map(city => <option
                                                                    key={city.id}
                                                                    value={city.id}
                                                                >
                                                                    {city.name}
                                                                </option>)
                                                            }
                                                        </select>
                                                    )}
                                                />
                                                {errors.city && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                            </label>
                                            :
                                            <label>
                                                <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.city && "text-red-500"}`}>City</p>
                                                <select
                                                    disabled={cites.length ? false : true}
                                                    className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.city && "border-red-500"} ${cites.length ? "cursor-pointer" : "cursor-not-allowed"}`}
                                                >
                                                    <option hidden>{currentAddress?.city}</option>
                                                </select>
                                                {errors.city && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                            </label>
                                        }
                                        {zones.length ?
                                            <label>
                                                <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.zone && "text-red-500"}`}>Zone</p>
                                                <Controller
                                                    name="zone"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <select
                                                            {...field}
                                                            disabled={!zones.length}
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                setZone(e.target.value)
                                                            }}
                                                            className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.zone && "border-red-500"} ${zones.length ? "cursor-pointer" : "cursor-not-allowed"}`}
                                                        >
                                                            <option hidden>Please Choose your zone</option>
                                                            {
                                                                zones.map(zone => <option
                                                                    key={zone.id}
                                                                    value={zone.name}
                                                                >
                                                                    {zone.name}
                                                                </option>)
                                                            }
                                                        </select>
                                                    )}
                                                />
                                                {errors.zone && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                            </label>
                                            :
                                            <label>
                                                <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.zone && "text-red-500"}`}>Zone</p>
                                                <select
                                                    disabled={!zones.length}
                                                    className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.zone && "border-red-500"} ${zones.length ? "cursor-pointer" : "cursor-not-allowed"}`}
                                                >
                                                    <option hidden>{currentAddress?.zone}</option>
                                                </select>
                                                {errors.zone && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                            </label>
                                        }
                                        <label>
                                            <p className={`text-xs font-medium text-gray-600 my-1.5 ${errors.address && "text-red-500"}`}>Address</p>
                                            <input
                                                {...register("address", { required: true })}
                                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.address && "border-red-500"}`}
                                                placeholder="Please Enter your Address Details"
                                                type="text"
                                            />
                                            {errors.address && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this field empty.</span>}
                                        </label>
                                    </div>
                                    <div className="text-end px-0 lg:px-12 py-6 space-y-4 lg:space-x-4 font-inter">
                                        <button
                                            onClick={() => window.history.back()}
                                            className="w-full lg:w-fit px-8 py-3 duration-300 bg-gray-400 hover:bg-gray-300 rounded border border-gray-400 text-gray-800 cursor-pointer text-sm font-semibold"
                                            type="button">
                                            Cancel
                                        </button>
                                        <button
                                            className="w-full lg:w-fit px-8 py-3 duration-300 bg-orange-400 hover:bg-orange-600 rounded border border-orange-400 text-white cursor-pointer text-sm font-semibold"
                                            type="submit">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default UpdateAddress;