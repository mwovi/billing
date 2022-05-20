import React, { useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";

import incrementString from "../helpers/incrementString";

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");


  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: "",
      vat: "",
      price: "1.00",
      total2: "1.00"
    },
  ]);


  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: "",
        vat: "",
        price: "1.00",
        total2: "1.00"
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: "",
        vat: "",
        price: "1.00",
        total2: "1.00"
      },

    ]);
  };

  // const setVat5 = (event) => {
  //   if(curr.vat.value == prev.vat.value){
  //     window.alert("Please select a different vat rate");
  //     }
  // }
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  

  

  const vat1 = items.reduce((prev, curr) => {
    if (curr.vat.trim().length > 0) return (curr.vat ) ;
    else return prev;
  }, 0);

  const vattotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) return  (vat1 * subtotal) / 100;
    else return prev;
  }, 0);

  // const vattotal2 = items.reduce((prev, curr) => {
  //   if (curr.vat )
  // }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal  + vattotal;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2"></div>
          <div className="flex items-center space-x-2"></div>
        </div>

        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>DESCRIPTION</th>
              <th className="text-center">COST(KSHs)</th>
              <th>QUANTITY</th>
              <th>VAT(%)</th>
              <th>TOTAL</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                vat={item.vat}
                price={item.price}
                total2={item.total2}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>Kshs {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2" id="vat5">
            <span className="font-bold">VAT(%):</span>
            <span>
              {" "}
              ({vat1 || "0"}%)Kshs {vattotal.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">VAT total:</span>
            <span>
              ({vat1 || "0"}%)Kshs {vattotal.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
            Kshs {total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
