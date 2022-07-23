import React, { useState } from "react";
import { useForm } from "react-hook-form";
import performanceCalculation from "../helpers/PerformanceCalculation";
import { Display } from "./Display";
import { CgMathEqual } from "react-icons/cg";
import { HiExclamation } from "react-icons/hi";

export const Form = ({ planeData }) => {
  const [perfData, setPerfData] = useState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

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

  console.log(errors);

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
            <div className="flex items-center justify-between relative">
              <label htmlFor="oat">
                {errors && errors.oat && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                OAT
              </label>
              <input
                {...register("oat", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="outside air temperature"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label htmlFor="pressureAltitude">
                {errors && errors.pressureAltitude && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Pressure Altitude
              </label>
              <input
                {...register("pressureAltitude", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="pressure altitude"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label htmlFor="aircraftWeight">
                {errors && errors.aircraftWeight && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Aircraft Weight
              </label>
              <input
                {...register("aircraftWeight", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="aircraft weight"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label htmlFor="flapSetting">
                {errors && errors.flapSetting && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Flap Setting
              </label>
              <select
                {...register("flapSetting", {
                  required: true,
                })}
                className="w-[27%] input"
                aria-label="flap setting"
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
            <div className="flex items-center justify-between relative">
              <label htmlFor="windSpeed">
                {errors && errors.windSpeed && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Wind Speed
              </label>
              <input
                {...register("windSpeed", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="wind speed"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label htmlFor="windDirection">
                {errors && errors.windDirection && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Wind Direction
              </label>
              <input
                {...register("windDirection", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="wind direction"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label htmlFor="runwayOfIntendedUse">
                {errors && errors.runwayOfIntendedUse && (
                  <HiExclamation className="absolute -left-[8%] md:-left-[3%] lg:-left-[3%] top-1 text-red-700" />
                )}{" "}
                Runway of Intended Use
              </label>
              <input
                {...register("runwayOfIntendedUse", {
                  required: true,
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                aria-label="runway of intended use"
                className="w-[27%] input"
              />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <label htmlFor="softRunway">Is the runway soft?</label>
              <input
                {...register("softRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
                aria-label="soft runway"
                disabled={true}
              />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <label htmlFor="wetRunway">Is the runway wet?</label>
              <input
                {...register("wetRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
                aria-label="wet runway"
                disabled={true}
              />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <label htmlFor="grassyRunway">Is the runway grassy?</label>
              <input
                {...register("grassyRunway")}
                defaultValue={false}
                type="checkbox"
                className=""
                aria-label="grassy runway"
                disabled={true}
              />
            </div>
            {watch("grassyRunway") && (
              <div className="flex items-center justify-between opacity-50">
                <label htmlFor="grassLength">How long is the grass?</label>
                <input
                  {...register("grassLength", {
                    valueAsNumber: true,
                    pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                  })}
                  type="number"
                  className="w-[27%] input"
                  aria-label="grass length"
                  disabled={true}
                />
              </div>
            )}
            {/* <div className="flex items-center justify-between">
            <label htmlFor="uphillSlope">What is the uphill slope?</label>
            <input
              {...register("uphillSlope", {
                valueAsNumber: true,
                pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
              })}
              type="number"
              className="w-[27%] text-center input"
            />
          </div> */}
            <div className="flex items-center justify-between opacity-50">
              <label htmlFor="downhillSlope">What is the downhill slope?</label>
              <input
                {...register("downhillSlope", {
                  valueAsNumber: true,
                  pattern: { value: /^(0|[1-9]d*)(.d+)?$/ },
                })}
                type="number"
                className="w-[27%] input"
                aria-label="downhill slope"
                disabled={true}
              />
            </div>
          </div>
          {perfData && <Display perfData={perfData} />}
          {errors && Object.keys(errors).length > 0 && (
            <div className="flex items-center justify-center px-6 lg:px-8">
              <p className="bold text-red-800 text-center">
                Error handling calculation, please ensure all fields are valid
              </p>
            </div>
          )}
          <button
            className="rounded-full w-[4rem] h-[4rem] flex justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
            onClick={() => onSubmit}
            type="submit"
          >
            <CgMathEqual className="w-fit text-center text-[2rem]" />
          </button>
        </div>
      </form>
    </>
  );
};
