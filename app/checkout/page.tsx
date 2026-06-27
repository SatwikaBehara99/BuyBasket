"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {

  const router = useRouter();
  const { getTotal } = useCart();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  

  useEffect(() => { fetch("/api/addresses")
      .then((res) => res.json())
      .then((data) => {setAddresses(data);});
  }, []);

useEffect(() => {

  fetch("/api/addresses")
    .then((res) => res.json())
    .then((data) => {
      setAddresses(data);
    });

}, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6 text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8"> Select Delivery Address </h1>
        <div className="space-y-4">
          
            {addresses.length === 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 text-center">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-white"> No saved addresses yet </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2"> Please add an address to continue. </p>
                    <button
                      onClick={() => router.push("/account/addresses")}
                      className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition" >
                         + Add Address 
                    </button>
                    </div>
)}
          {addresses.map((address) => (

            <div
              key={address.id}
              className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md dark:text-white
  ${ selectedAddress === address.id ? "border-red-500 bg-red-50" : "border-gray-200 dark:border-gray-700"
}`}
              onClick={() => setSelectedAddress(address.id)}
            >

              <div className="flex gap-3">
                <input type="radio" checked={selectedAddress === address.id} readOnly />
                <div>
                  <h2 className="font-bold"> {address.name} </h2>
                  <p> {address.area}, {address.locality} </p>
                  <p> {address.city}, {address.state} - {address.pincode} </p>
                  <p> {address.phone} </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow p-6 dark:text-white">
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total Amount</span>
            <span>₹{getTotal()}</span>
          </div>

          <button
            disabled={!selectedAddress}
            onClick={() =>
              router.push(  `/payment?addressId=${selectedAddress}` )
            }
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold disabled:bg-gray-300" > Continue To Payment
          </button>

        </div>
      </div>
    </div>
  );
}