import React, { useEffect, useState } from "react";
import { developerTypeOptions } from "./assents/developer";
import { useForm } from "react-hook-form";
import Developer from "./assents/DeveloperClass";

const SELECT_CHANGE_MSG_TIME = 5000;

const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showSelectMsg, setShowSelectMsg] = useState(false);
  const [developers, setDevelopers] = useState([]);

  const onSubmit = (data) => {
    const newDev = new Developer(
      data.firstName,
      data.lastName,
      data.age,
      data.type
    );
    setDevelopers((prev) => [...prev, newDev]);
  };

  const selectValue = watch("type");

  function selectChangeMsg() {
    setShowSelectMsg(true);
    setTimeout(() => {
      setShowSelectMsg(false);
    }, SELECT_CHANGE_MSG_TIME);
  }

  useEffect(() => {
    console.log("select got change");
    if (selectValue != null) selectChangeMsg();
  }, [selectValue]);

  return (
    <div>
      <h1>Enter Developer Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter First Name"
          {...register("firstName", { required: true })}
        />
        {errors?.firstName && <p>First name is required!</p>}
        <input
          type="text"
          placeholder="Enter Last Name"
          {...register("lastName")}
        />
        <input
          type="number"
          placeholder="Enter Age"
          {...register("age", { min: 5, max: 60 })}
        />
        <select placeholder="Pick Dev Type" {...register("type")}>
          <option value="null"></option>
          {developerTypeOptions.map((item, i) => {
            return (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <input type="submit" />
      </form>
      <p>{showSelectMsg && `Select got change to value ${selectValue}`}</p>
      <table border="2">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Type</th>
            <th>Formal Name</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((d, i) => {
            return (
              <tr key={i}>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.age}</td>
                <td>{d.type}</td>
                <td>{d.formalName}</td>
                <td onClick={() => alert(d.summary)}>Click</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;

// function map(arr, cb) {
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     newArr.push(cb(arr[i], i, arr));
//   }
//   return newArr;
// }

// function forMap(el, index, original) {
//   console.log(el, index, original);
//   return index;
// }
