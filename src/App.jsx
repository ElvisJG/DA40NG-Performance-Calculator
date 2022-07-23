import React, { useState, useEffect } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import DA40NGPerfData from "./data/DA40NG-PerformanceData";
import { Form } from "./Components/Form";

function App() {
  const [planeData, setPlaneData] = useState();
  
  useEffect(() => {
    setPlaneData(DA40NGPerfData());
  }, []);

  return (
    <main className="bg-[#f8f9fa] text-[#4e6177] w-screen lg:h-screen flex flex-col justify-center items-center p-4">
      <div className="flex items-center justify-center w-screen">
        <GiAirplaneDeparture className="text-[3rem] lg:text-[6rem]" />
        <h1 className="text-[1.3rem] lg:text-[2.1rem]">DA40NG Performance Calculator</h1>
      </div>
      {planeData && <Form planeData={planeData} />}
    </main>
  );
}

export default App;
