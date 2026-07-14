export function weatherImage(code:number){

    if(code <= 1)
        return "/weather/clear.jpg";


    if(code <= 3)
        return "/weather/cloudy.jpg";


    if(code <= 67)
        return "/weather/rain.jpg";


    if(code <= 77)
        return "/weather/cold.jpg";


    return "/weather/storm.jpg";

}



export function weatherName(code:number){

    if(code <= 1)
        return "Clear sky";


    if(code <= 3)
        return "Cloudy";


    if(code <= 67)
        return "Rain";


    if(code <= 77)
        return "Cold";


    return "Storm";

}