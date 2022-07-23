import React, { useState } from "react";
import { useForm } from "react-hook-form";
import performanceCalculation from "../helpers/PerformanceCalculation";
import { Display } from "./Display";
import { CgMathEqual } from "react-icons/cg";

export const Form = ({ planeData }) => {
  const [perfData, setPerfData] = useState();
  const { handleSubmit, register, watch } = useForm();

  const onSubmit = async (formData) => {
    const {
      pressureAltitude,
      oat,
      aircraftWeight,
      flapSetting,
      windSpeed,
      windDirection,
      runwayOfIntendedUse,
    } = formData;
    setPerfData(
      performanceCalculation(
        pressureAltitude,
        oat,
        aircraftWeight,
        flapSetting,
        windSpeed,
        windDirection,
        runwayOfIntendedUse,
        planeData
      )
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-[95%] h-[675px] lg:max-w-[900px] lg:min-w-[50%] lg:flex-shrink p-4 lg:p-12 lg:px-24 mt-4 relative"
      >
        <div className="space-y-2 flex justify-center flex-col">
          <div className="space-y-3 px-6 lg:px-8">
            <h1 className="text-center bold underline underline-offset-8">
              Performance Data
            </h1>
            <div className="flex items-center justify-between">
              <label aria-label="oat">OAT</label>
              <input
                {...register("oat", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="pressureAltitude">Pressure Altitude</label>
              <input
                {...register("pressureAltitude", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="aircraftWeight">Aircraft Weight</label>
              <input
                {...register("aircraftWeight", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Flap</label>
              <select
                {...register("flapSetting")}
                className="w-[27%] input"
              >
                <option value="true">LDG</option>
                <option value="false">T/O</option>
                <option value="false">UP</option>
              </select>
            </div>
          </div>
          <div className="space-y-3 px-6 lg:px-8">
            <h1 className="text-center bold underline underline-offset-8">
              Modifiers
            </h1>
            <div className="flex items-center justify-between">
              <label aria-label="windSpeed">Wind Speed</label>
              <input
                {...register("windSpeed", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="windDirection">Wind Direction</label>
              <input
                {...register("windDirection", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="runwayOfIntendedUse">
                Runway of Intended Use
              </label>
              <input
                {...register("runwayOfIntendedUse", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="softRunway">Is the runway soft?</label>
              <input
                {...register("softRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="wetRunway">Is the runway wet?</label>
              <input
                {...register("wetRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
              />
            </div>
            <div className="flex items-center justify-between">
              <label aria-label="grassyRunway">Is the runway grassy?</label>
              <input
                {...register("grassyRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
              />
            </div>
            {watch("grassyRunway") && (
              <div className="flex items-center justify-between">
                <label aria-label="grassLength">How long is the grass?</label>
                <input
                  {...register("grassLength", {
                    valueAsNumber: true,
                    pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                  })}
                  type="number"
                  className="w-[27%] input"
                />
              </div>
            )}
            {/* <div className="flex items-center justify-between">
            <label aria-label="uphillSlope">What is the uphill slope?</label>
            <input
              {...register("uphillSlope", {
                valueAsNumber: true,
                pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
              })}
              type="number"
              className="w-[27%] text-center input"
            />
          </div> */}
            <div className="flex items-center justify-between">
              <label aria-label="downhillSlope">
                What is the downhill slope?
              </label>
              <input
                {...register("downhillSlope", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
              />
            </div>
          </div>
          {perfData && <Display perfData={perfData} />}
          <button
            className="rounded-full w-[4rem] h-[4rem] flex justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
            onClick={() => onSubmit}
          >
            <CgMathEqual className="w-fit text-center text-[2rem]" />
          </button>
        </div>
      </form>
    </>
  );
};
