import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";


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

  };

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


        const res = await fetch(
          "http://192.168.0.102:8000/stats"
        );


        const stats = await res.json();



        setData({

          cpu: stats.cpu ?? 0,

          ram: stats.ram ?? 0,

          disk: stats.disk ?? 0,

          media: stats.media ?? 0,


          upload: stats.upload ?? 0,

          download: stats.download ?? 0,


          uptime: stats.uptime ?? 0,

          hostname: stats.hostname ?? "",



          services: stats.services ?? {

            jellyfin: false,

            immich: false,

            pihole: false,

          },

        });



      } catch (err) {

        console.error(
          "Failed to fetch dashboard stats:",
          err
        );

      }

    }



    fetchStats();



    const timer = setInterval(
      fetchStats,
      1000
    );



    return () =>
      clearInterval(timer);



  }, []);




  return (

    <DashboardContext.Provider value={data}>

      {children}

    </DashboardContext.Provider>

  );

}




export function useDashboard() {

  return useContext(DashboardContext);

}