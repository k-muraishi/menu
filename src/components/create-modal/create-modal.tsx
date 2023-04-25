import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      ></input>
    </>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [price, setprice] = useState(0);
  const [image, setImage] = useState("");
  const { mutate, isSuccess } = useFoodDataMutate();

  const submit = () => {
    const foodDate: FoodData = {
      title,
      price,
      image,
    };
    mutate(foodDate);
  };

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>menu um novo item no menu</h2>
        <form className="input-container">
          <Input label="title" value={title} updateValue={setTitle}></Input>
          <Input label="price" value={price} updateValue={setprice}></Input>
          <Input label="image" value={image} updateValue={setImage}></Input>
        </form>
        <button onClick={submit} className="btn-secondary">
          register
        </button>
      </div>
    </div>
  );
}
