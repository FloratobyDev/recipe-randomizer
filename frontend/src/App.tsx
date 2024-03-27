import React, { useEffect, useState } from "react";
import axios from "axios";

type PersonalInfoType = {
  name: string;
  age: number;
};

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    name: "",
    age: 0,
  });

  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <p className=" text-xl">App</p>
      <div>
        <p className="text-xl">Name: {personalInfo.name}</p>
        <p className="text-xl">Age: {personalInfo.age}</p>
      </div>
    </div>
  );
}

export default App;
