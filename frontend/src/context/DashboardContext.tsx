import { getApiBase } from "../config/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";


export type WeatherForecast = {

  time: string;
  temp: number;
  rain: number;

};


export type WeatherData = {

  temperature: number;
  humidity: number;
  condition: number;
  message: string;
  forecast: WeatherForecast[];

};



export type CalendarData = {

  samvatsaram: string;

  ayanam: string;

  rutuvu: string;

  maasam: string;

  tithi: string;

  tithi_end: string;

  nakshatram: string;

  sunrise: string;

  sunset: string;

};



export type DashboardData = {

  cpu: number;

  ram: number;

  disk: number;

  media: number;


  upload: number;

  download: number;


  uptime: number;

  hostname: string;


  services: {

    jellyfin: boolean;

    immich: boolean;

    pihole: boolean;

    homeAssistant: boolean;

  };


  weather: WeatherData;


  calendar: CalendarData;

};



const defaultData: DashboardData = {


  cpu: 0,

  ram: 0,

  disk: 0,

  media: 0,


  upload: 0,

  download: 0,


  uptime: 0,

  hostname: "",


  services: {

    jellyfin: false,

    immich: false,

    pihole: false,

    homeAssistant: false,

  },


  weather: {

    temperature: 0,

    humidity: 0,

    condition: 0,

    message: "",

    forecast: [],

  },


  calendar: {

    samvatsaram: "",

    ayanam: "",

    rutuvu: "",

    maasam: "",

    tithi: "",

    tithi_end: "",

    nakshatram: "",

    sunrise: "",

    sunset: "",

  },


};



const DashboardContext =
  createContext<DashboardData>(defaultData);



export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [data, setData] =
    useState<DashboardData>(defaultData);



  useEffect(() => {


    async function fetchStats() {


      try {


        const API = await getApiBase();

        console.log("Using API:", API);


        const res =
          await fetch(`${API}/stats`);


        const stats =
          await res.json();


        console.log("Dashboard:", stats);



        setData({


          cpu: stats.cpu ?? 0,

          ram: stats.ram ?? 0,

          disk: stats.disk ?? 0,

          media: stats.media ?? 0,


          upload: stats.upload ?? 0,

          download: stats.download ?? 0,


          uptime: stats.uptime ?? 0,

          hostname: stats.hostname ?? "",


          services:
            stats.services ??
            defaultData.services,


          weather:
            stats.weather ??
            defaultData.weather,


          calendar:
            stats.calendar ??
            defaultData.calendar,


        });



      } catch (err) {


        console.error(
          "Dashboard error:",
          err
        );


      }


    }



    fetchStats();


    const timer =
      setInterval(
        fetchStats,
        10000
      );



    return () =>
      clearInterval(timer);



  }, []);



  return (

    <DashboardContext.Provider
      value={data}
    >

      {children}

    </DashboardContext.Provider>

  );

}



export function useDashboard() {

  return useContext(DashboardContext);

}